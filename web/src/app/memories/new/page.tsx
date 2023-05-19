import { Camera, ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MediaPicker } from "@/components/MediaPicker.tsx";
import { API_URL } from "@/lib/api.ts";

export const runtime = "edge";

async function createMemory(data: FormData) {
	"use server";

	const token = cookies().get("token")!.value;

	const fileToUpload = data.get("coverUrl")!;

	const uploadFormData = new FormData();
	uploadFormData.append("file", fileToUpload);

	const uploadResponse = await fetch(`${API_URL}/upload`, {
		body: uploadFormData,
		method: "POST",
	});

	const { fileUrl } = await uploadResponse.json();

	const body = {
		coverUrl: fileUrl,
		content: data.get("content"),
		isPublic: data.get("isPublic"),
	};

	await fetch(`${API_URL}/memories`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	return redirect("/");
}

export default function NewMemory() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-16">
			<Link className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100" href="/">
				<ChevronLeft className="h-4 w-4" />
				voltar à timeline
			</Link>

			<form action={createMemory} className="flex flex-1 flex-col gap-2">
				<div className="flex items-center gap-4">
					<label
						className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
						htmlFor="media"
					>
						<Camera className="h-4 w-4" />
						Anexar mídia
					</label>

					<label className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100" htmlFor="isPublic">
						<input
							className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
							id="isPublic"
							name="isPublic"
							required
							type="checkbox"
						/>
						Tornar memória pública
					</label>
				</div>

				<MediaPicker />

				<textarea
					className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
					name="content"
					placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
					required
					spellCheck={false}
				/>

				<button
					className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
					type="submit"
				>
					Salvar
				</button>
			</form>
		</div>
	);
}
