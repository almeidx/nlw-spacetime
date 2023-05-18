import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastify from "fastify";
import { authRoutes } from "./routes/auth.js";
import { memoryRoutes } from "./routes/memories.js";

const app = fastify();

await app.register(cors, { origin: true });
await app.register(jwt, { secret: "spacetime" });

await app.register(authRoutes);
await app.register(memoryRoutes);

await app.listen({ port: 3_333 });

console.log("Server listening to http://localhost:3333");
