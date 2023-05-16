import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function memoryRoutes(app: FastifyInstance) {
	app.get("/memories", async () => {
		const memories = await prisma.memory.findMany({
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

	app.get("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		});

		return memory;
	});

	app.post("/memories", async (request) => {
		const bodySchema = z.object({
			content: z.string(),
			coverUrl: z.string().url(),
			isPublic: z.coerce.boolean().default(false),
		});

		const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

		const memory = await prisma.memory.create({
			data: {
				coverUrl,
				content,
				isPublic,
				userId: "3d0661c9-0b36-4009-956a-e4a473cdb4e3",
			},
		});

		return memory;
	});

	app.put("/memories/:id", async (request) => {
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

		const memory = await prisma.memory.update({
			data: {
				coverUrl,
				content,
				isPublic,
			},
			where: {
				id,
			},
		});

		return memory;
	});

	app.delete("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		await prisma.memory.delete({
			where: {
				id,
			},
		});
	});
}
