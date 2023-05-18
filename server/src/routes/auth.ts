import { env } from "node:process";
import { URLSearchParams } from "node:url";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function authRoutes(app: FastifyInstance) {
	app.post("/register", async (request) => {
		const bodySchema = z.object({
			code: z.string(),
		});

		const { code } = bodySchema.parse(request.body);

		const accessTokenQuery = new URLSearchParams({
			client_id: env.GITHUB_CLIENT_ID!,
			client_secret: env.GITHUB_CLIENT_SECRET!,
			code,
		});

		const accessTokenResponse = await fetch(
			`https://github.com/login/oauth/access_token?${accessTokenQuery.toString()}`,
			{
				method: "POST",
				headers: { Accept: "application/json" },
			},
		);

		const accessTokenSchema = z.object({
			access_token: z.string(),
		});

		const accessToken = accessTokenSchema.parse(await accessTokenResponse.json()).access_token;

		const userResponse = await fetch("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		const userSchema = z.object({
			id: z.number(),
			login: z.string(),
			name: z.string(),
			avatar_url: z.string().url(),
		});

		const userInfo = userSchema.parse(await userResponse.json());

		let user = await prisma.user.findUnique({
			where: { githubId: userInfo.id },
		});

		user ??= await prisma.user.create({
			data: {
				githubId: userInfo.id,
				login: userInfo.login,
				name: userInfo.name,
				avatarUrl: userInfo.avatar_url,
			},
		});

		const token = app.jwt.sign(
			{
				name: user.name,
				avatarUrl: user.avatarUrl,
			},
			{
				sub: user.id,
				expiresIn: "30d",
			},
		);

		return { token };
	});
}
