import cors from "@fastify/cors";
import fastify from "fastify";
import { memoryRoutes } from "./routes/memories.js";

const app = fastify();

app.register(cors, {
	origin: true,
});

app.register(memoryRoutes);

await app.listen({ port: 3_333 });

console.log("Server listening to http://localhost:3333");
