import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function memoryRoutes(app: FastifyInstance) {
	app.addHook("preHandler", async (request) => {
		await request.jwtVerify();
	});

	app.get("/memories", async (request) => {
		const memories = await prisma.memory.findMany({
			where: {
				userId: request.user.sub,
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		return memories.map((memory) => ({
			id: memory.id,
			coverUrl: memory.coverUrl,
			excerpt: memory.content.length > 188 ? memory.content.slice(0, 118) + "..." : memory.content,
		}));
	});

	app.get("/memories/:id", async (request, reply) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		});

		if (!memory.isPublic && memory.userId !== request.user.sub) {
			return reply.status(401).send();
		}

		return memory;
	});

	app.post("/memories", async (request) => {
		const bodySchema = z.object({
			content: z.string(),
			coverUrl: z.string().url(),
			isPublic: z.coerce.boolean().default(false),
		});

		const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

		return prisma.memory.create({
			data: {
				coverUrl,
				content,
				isPublic,
				userId: request.user.sub,
			},
		});
	});

	app.put("/memories/:id", async (request, reply) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const bodySchema = z.object({
			content: z.string(),
			coverUrl: z.string().url(),
			isPublic: z.coerce.boolean().default(false),
		});

		const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
			select: {
				userId: true,
			},
		});

		if (memory.userId !== request.user.sub) {
			return reply.status(401).send();
		}

		return prisma.memory.update({
			data: {
				coverUrl,
				content,
				isPublic,
			},
			where: {
				id,
			},
		});
	});

	app.delete("/memories/:id", async (request, reply) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
			select: {
				userId: true,
			},
		});

		if (memory.userId !== request.user.sub) {
			return reply.status(401).send();
		}

		await prisma.memory.delete({
			where: {
				id,
			},
		});
	});
}
