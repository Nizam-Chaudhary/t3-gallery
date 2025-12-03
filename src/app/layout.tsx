import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Geist } from "next/font/google";

import "~/styles/globals.css";
import TopNav from "./_components/topnav";

export const metadata: Metadata = {
	title: "T3 Gallery",
	description: "T3 Gallery",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html className={`${geist.variable}`} lang="en">
				<body className="flex flex-col gap-4">
					<TopNav />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
