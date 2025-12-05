import "server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getMyImages() {
	const user = await auth();

	if (!user.userId) throw Error("Unauthorized");

	const images = await db.query.images.findMany({
		where: (model, { eq }) => eq(model.userId, user.userId),
		orderBy: (model, { desc }) => desc(model.id),
	});

	return images;
}

export async function getImage(id: number) {
	const user = await auth();

	if (!user.userId) throw Error("Unauthorized");

	const image = await db.query.images.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});

	if (!image) throw Error("Image not found");

	if (image.userId !== user.userId) throw Error("Unauthorizer");

	return image;
}
