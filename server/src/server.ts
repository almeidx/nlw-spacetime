import { URL, fileURLToPath } from "node:url";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import { authRoutes } from "./routes/auth.js";
import { memoryRoutes } from "./routes/memories.js";
import { uploadRoutes } from "./routes/upload.js";

const app = fastify();

await app.register(cors, { origin: true });
await app.register(jwt, { secret: "spacetime" });
await app.register(multipart);
await app.register(fastifyStatic, {
	root: fileURLToPath(new URL("../uploads", import.meta.url)),
	prefix: "/uploads",
	dotfiles: "ignore",
});

await app.register(authRoutes);
await app.register(memoryRoutes);
await app.register(uploadRoutes);

await app.listen({ port: 3_333 });

console.log("Server listening to http://localhost:3333");
