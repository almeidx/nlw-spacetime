import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();

app.get("/users", async () => {
	return prisma.user.findMany();
});

await app.listen({ port: 3_333 });

console.log("Server listening to http://localhost:3333");
