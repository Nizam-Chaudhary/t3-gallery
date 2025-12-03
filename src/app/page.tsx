import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const images = await db.query.images.findMany({
		orderBy: (model, { desc }) => desc(model.id),
	});

	return (
		<main className="">
			<div className="flex flex-wrap gap-4">
				{images.map((image) => (
					<div className="w-48" key={image.id}>
						<img alt="mock" src={image.url} />
					</div>
				))}
			</div>
		</main>
	);
}
