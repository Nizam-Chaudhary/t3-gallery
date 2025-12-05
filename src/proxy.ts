import { clerkMiddleware, createClerkClient } from "@clerk/nextjs/server";
import { env } from "./env";

export default clerkMiddleware();

// createClerkClient({
// 	secretKey: env.CLERK_SECRET_KEY,
// });

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
