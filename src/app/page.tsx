import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import { UploadButton } from "~/utils/uploadthing";
import UploadFile from "./_components/file-upload";

export const dynamic = "force-dynamic";

async function Images() {
	const images = await db.query.images.findMany({
		orderBy: (model, { desc }) => desc(model.id),
	});

	return (
		<div className="flex flex-wrap gap-4">
			{images.map((image) => (
				<div className="w-48" key={image.id}>
					<img alt="mock" src={image.url} />
				</div>
			))}
		</div>
	);
}

export default async function HomePage() {
	return (
		<main>
			<SignedOut>
				<div className="h-full w-full text-center text-2xl">
					Please sign in above
				</div>
			</SignedOut>
			<SignedIn>
				<UploadFile />
				<Images />
			</SignedIn>
		</main>
	);
}
