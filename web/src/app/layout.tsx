import "./globals.css";

import type { Metadata } from "next";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-PT">
			<body className={`${robotoFlex.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}>
				{children}
			</body>
		</html>
	);
}
