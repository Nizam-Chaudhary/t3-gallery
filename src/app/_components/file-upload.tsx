"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function UploadFile() {
	const router = useRouter();
	return (
		<main className="flex flex-col items-center justify-between">
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={() => {
					router.refresh();
				}}
			/>
		</main>
	);
}
