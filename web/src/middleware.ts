import { NextResponse, type NextRequest } from "next/server";
import { SIGN_IN_URL } from "@/utils/constants.ts";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	if (!token) {
		return NextResponse.redirect(SIGN_IN_URL, {
			headers: {
				"Set-Cookie": `redirectTo=${request.url}; Path=/; HttpOnly; Max-Age=60;`,
			},
		});
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/memories/:path*",
};
