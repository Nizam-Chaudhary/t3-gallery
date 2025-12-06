"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";
import { UploadButton, useUploadThing } from "~/utils/uploadthing";

export default function UploadFile() {
	const router = useRouter();
	const posthog = usePostHog();
	return (
		<main className="flex flex-col items-center justify-between">
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={() => {
					posthog.capture("Upload Completed");
					toast.dismiss("upload-begin");
					toast.success("Upload complete");
					router.refresh();
				}}
				onUploadAborted={() => {
					posthog.capture("Upload cancelled");
					toast.dismiss("upload-begin");
					toast.info("Upload cancelled");
				}}
				onUploadBegin={() => {
					posthog.capture("upload begins");
					toast(
						<div className="flex items-center justify-between gap-x-2">
							<Spinner />
							<div>Uploading...</div>
						</div>,
						{
							duration: 100000,
							id: "upload-begin",
							dismissible: false,
						},
					);
				}}
				onUploadError={() => {
					posthog.capture("Upload failed");
					toast.dismiss("upload-begin");
					toast.error("Error uploading file");
				}}
			/>
		</main>
	);
}
