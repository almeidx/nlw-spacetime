import "./globals.css";

import type { Metadata } from "next";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import { Footer } from "@/components/Footer.tsx";
import { Hero } from "@/components/Hero.tsx";
import { Profile } from "@/components/Profile.tsx";
import { SignIn } from "@/components/SignIn.tsx";

const robotoFlex = Roboto_Flex({
	subsets: ["latin"],
	variable: "--font-roboto",
});

const baiJamjuree = Bai_Jamjuree({
	subsets: ["latin"],
	variable: "--font-bai-jamjuree",
	weight: "700",
});

export const metadata: Metadata = {
	title: "NLW Spacetime",
	description: "Uma cápsula do tempo",
};

export default function RootLayout({ children }: PropsWithChildren) {
	const isAuthenticated = cookies().has("token");

	return (
		<html lang="pt-PT">
			<body className={`${robotoFlex.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}>
				<main className="grid min-h-screen grid-cols-2">
					<div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
						<div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

						<div className="absolute inset-y-0 right-2 w-2 bg-stripes" />

						{isAuthenticated ? <Profile /> : <SignIn />}

						<Hero />

						<Footer />
					</div>

					<div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">{children}</div>
				</main>
			</body>
		</html>
	);
}
