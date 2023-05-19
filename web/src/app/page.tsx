import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { EmptyMemories } from "@/components/EmptyMemories.tsx";
import { API_URL } from "@/lib/api.ts";

export const runtime = "edge";

export default async function Home() {
	const token = cookies().get("token")?.value;
	if (!token) {
		return <EmptyMemories />;
	}

	const memories = await getMemories(token);
	if (!memories.length) {
		return <EmptyMemories />;
	}

	const formatter = new Intl.DateTimeFormat("pt-PT", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<div className="flex flex-col gap-10 p-8">
			{memories.map((memory) => (
				<div className="space-y-4" key={memory.id}>
					<time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
						{formatter.format(new Date(memory.createdAt))}
					</time>

					<Image
						alt=""
						className="aspect-video w-full rounded-lg object-cover"
						height={280}
						src={memory.coverUrl}
						width={592}
					/>

					<p className="text-lg leading-relaxed text-gray-100">{memory.excerpt}</p>

					<Link
						className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
						href={`/memories/${memory.id}`}
					>
						Ler mais
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			))}
		</div>
	);
}

async function getMemories(token: string) {
	const response = await fetch(`${API_URL}/memories`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.json() as Promise<Memory[]>;
}

interface Memory {
	coverUrl: string;
	createdAt: string;
	excerpt: string;
	id: string;
}
