import decode from "jwt-decode";
import { cookies } from "next/headers";

export function getUser() {
	const token = cookies().get("token")?.value;

	if (!token) {
		throw new Error("Unauthenticated");
	}

	return decode<User>(token);
}

interface User {
	avatarUrl: string;
	name: string;
	sub: string;
}
