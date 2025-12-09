import "server-only";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { images } from "./db/schema";

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

export async function deleteImage(id: number) {
	const user = await auth();

	if (!user.userId) throw Error("Unauthorized");

	const image = await db.query.images.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});

	if (!image) throw Error("Image not found");

	await db
		.delete(images)
		.where(and(eq(images.userId, user.userId), eq(images.id, id)));
}
