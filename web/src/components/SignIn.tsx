import { User } from "lucide-react";
import { SIGN_IN_URL } from "@/utils/constants.ts";

export function SignIn() {
	return (
		<a className="flex items-center gap-3 text-left transition-colors hover:text-gray-50" href={SIGN_IN_URL}>
			<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
				<User className="h-5 w-5 text-gray-500" />
			</div>

			<p className="max-w-[160px] text-sm leading-snug">
				<span className="underline">Crie a sua conta</span> e guarda as suas memórias!
			</p>
		</a>
	);
}
