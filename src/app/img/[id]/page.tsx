import FullPageImageView from "~/components/full-image-page";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PhotoPage({ params }: Props) {
	const { id } = await params;
	const idAsNumber = Number(id);
	if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

	return <FullPageImageView imageId={idAsNumber} />;
}
