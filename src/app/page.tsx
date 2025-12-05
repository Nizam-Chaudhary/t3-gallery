import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";
import UploadFile from "./_components/file-upload";

export const dynamic = "force-dynamic";

async function Images() {
	const images = await getMyImages();

	return (
		<div className="flex flex-wrap justify-center gap-4 p-4">
			{images.map((image) => (
				<div className="h-48 w-48" key={image.id}>
					<Link href={`/img/${image.id}`}>
						<Image
							alt={image.name}
							height={192}
							src={image.url}
							style={{ objectFit: "contain" }}
							width={192}
						/>
					</Link>
					{image.name}
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
