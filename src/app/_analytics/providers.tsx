"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { env } from "~/env";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
			person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
			defaults: "2025-11-30",
			api_host: "/ph",
			ui_host: "https://us.posthog.com",
		});
	}, []);

	return (
		<PHProvider client={posthog}>
			<PostHogAuthWrapper>{children}</PostHogAuthWrapper>
		</PHProvider>
	);
}

export function PostHogAuthWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const auth = useAuth();
	const userInfo = useUser();

	useEffect(() => {
		if (userInfo.user) {
			posthog.identify(userInfo.user.id, {
				email: userInfo.user.emailAddresses[0]?.emailAddress,
			});
		} else if (!auth.isSignedIn) {
			posthog.reset();
		}
	}, [userInfo.user, auth.isSignedIn]);

	return children;
}
