import Link from "next/link";

export function EmptyMemories() {
	return (
		<div className="flex flex-1 items-center justify-center p-16">
			<p className="w-[360px] text-center leading-relaxed">
				Ainda não registou nenhuma lembrança. Comece a{" "}
				<Link className="underline hover:text-gray-50" href="/memories/new">
					criar agora
				</Link>
				!
			</p>
		</div>
	);
}
