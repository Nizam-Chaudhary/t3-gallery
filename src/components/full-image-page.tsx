import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";

export default async function FullPageImageView(props: { imageId: number }) {
	const image = await getImage(props.imageId);

	const client = await clerkClient();
	const uploaderInfo = await client.users.getUser(image.userId);

	return (
		<div className="flex h-full w-full">
			<div className="flex shrink items-center justify-center">
				<img alt="dynamic" className="shrink object-contain" src={image.url} />
			</div>
			<div className="flex w-48 shrink-0 flex-col gap-2 border-l">
				<div className="border-b p-2 text-center text-lg">{image.name}</div>

				<div className="flex flex-col p-2">
					<span>Uploaded By:</span>
					<span>{uploaderInfo.fullName}</span>
				</div>

				<div className="flex flex-col p-2">
					<span>Uploaded On:</span>
					<span>{image.createdAt.toLocaleDateString()}</span>
				</div>

				<div className="flex flex-col p-2">
					<form
						action={async () => {
							"use server";
							await deleteImage(props.imageId);
							redirect("/");
						}}
					>
						<Button
							className="cursor-pointer"
							type="submit"
							variant={"destructive"}
						>
							Delete
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
