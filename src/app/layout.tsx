import "@uploadthing/react/styles.css";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
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
	modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html className={`${geist.variable}`} lang="en">
				<body className="flex flex-col gap-4">
					<NextSSRPlugin
						/**
						 * The `extractRouterConfig` will extract **only** the route configs
						 * from the router to prevent additional information from being
						 * leaked to the client. The data passed to the client is the same
						 * as if you were to fetch `/api/uploadthing` directly.
						 */
						routerConfig={extractRouterConfig(ourFileRouter)}
					/>
					<TopNav />
					<div id="modal-root" />
					{children}
					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
