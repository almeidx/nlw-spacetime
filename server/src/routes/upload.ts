import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { extname } from "node:path";
import { pipeline } from "node:stream/promises";
import { URL } from "node:url";
import type { FastifyInstance } from "fastify";

export async function uploadRoutes(app: FastifyInstance) {
	app.post("/upload", async (request, reply) => {
		const upload = await request.file({
			limits: {
				fileSize: 1_024 * 1_024 * 5, // 5 MB
			},
		});

		if (!upload) {
			return reply.status(400).send();
		}

		const mimeTypeRegex = /^(?:image|video)\/[a-z]+$/i;
		if (!mimeTypeRegex.test(upload.mimetype)) {
			return reply.status(400).send();
		}

		const fileId = randomUUID();
		const ext = extname(upload.filename);

		const filename = `${fileId}${ext}`;

		const writeStream = createWriteStream(new URL(`../../uploads/${filename}`, import.meta.url));

		await pipeline(upload.file, writeStream);

		const fileUrl = new URL("/uploads/" + filename, request.protocol + "://" + request.hostname).toString();

		return { fileUrl };
	});
}
