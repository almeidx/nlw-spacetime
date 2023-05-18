import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
	return (
		<div className="flex flex-1 flex-col gap-4">
			<Link className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100" href="/">
				<ChevronLeft className="h-4 w-4" />
				voltar à timeline
			</Link>

			<form className="flex flex-1 flex-col gap-2">
				<div className="flex items-center gap-4">
					<label
						className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
						htmlFor="media"
					>
						<Camera className="h-4 w-4" />
						Anexar mídia
					</label>

					<input className="sr-only" id="media" type="file" />

					<label className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100" htmlFor="isPublic">
						<input
							className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
							id="isPublic"
							name="isPublic"
							type="checkbox"
							value="true"
						/>
						Tornar memória pública
					</label>
				</div>

				<textarea
					className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
					name="content"
					placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
					spellCheck={false}
				/>
			</form>
		</div>
	);
}
