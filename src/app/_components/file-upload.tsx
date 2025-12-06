"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";
import { UploadButton, useUploadThing } from "~/utils/uploadthing";

export default function UploadFile() {
	const router = useRouter();
	return (
		<main className="flex flex-col items-center justify-between">
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={() => {
					toast.dismiss("upload-begin");
					toast.success("Upload complete");
					router.refresh();
				}}
				onUploadAborted={() => {
					toast.dismiss("upload-begin");
					toast.info("Upload cancelled");
				}}
				onUploadBegin={() => {
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
					toast.dismiss("upload-begin");
					toast.error("Error uploading file");
				}}
			/>
		</main>
	);
}
