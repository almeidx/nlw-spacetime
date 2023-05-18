import { User } from "lucide-react";
import Image from "next/image";
import { getUser } from "@/lib/auth.ts";

export function Profile() {
	const { avatarUrl, name } = getUser();

	return (
		<div className="flex items-center gap-3 text-left">
			<Image alt="" className="h-10 w-10 rounded-full" height={40} src={avatarUrl} width={40} />

			<p className="max-w-[160px] text-sm leading-snug">
				{name}
				<a className="block text-red-400 hover:text-red-300" href="">
					Terminar sessão
				</a>
			</p>
		</div>
	);
}
