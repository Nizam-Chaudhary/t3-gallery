"use client";

import type React from "react";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
	const $ut = useUploadThing(...args);

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const selectedFiles = Array.from(e.target.files);
		const result = await $ut.startUpload(selectedFiles);

		console.log("uploaded files", result);
		// TODO: persist result in state maybe?
	};

	return {
		inputProps: {
			onChange,
			accept: "image/*",
		},
		isUploading: $ut.isUploading,
	};
};

export function SimpleUploadButton() {
	const { inputProps } = useUploadThingInputProps("imageUploader");
	return (
		<div>
			<label htmlFor="upload-button">Upload</label>
			<input
				className="sr-only"
				id="upload-button"
				type="file"
				{...inputProps}
			/>
		</div>
	);
}
