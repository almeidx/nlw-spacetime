import { NextResponse, type NextRequest } from "next/server";
import { API_URL } from "@/lib/api.ts";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");

	const redirectTo = request.cookies.get("redirectTo")?.value;

	const registerResponse = await fetch(`${API_URL}/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ code }),
	});

	const { token } = await registerResponse.json();

	const redirectUrl = redirectTo ?? new URL("/", request.url);

	const cookieMaxAge = 60 * 60 * 24 * 30; // 30 days

	return NextResponse.redirect(redirectUrl, {
		headers: {
			"Set-Cookie": `token=${token}; Path=/; Max-Age=${cookieMaxAge};`,
		},
	});
}
