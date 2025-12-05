import Image from "next/image";
import { getImage } from "~/server/queries";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PhotoModal({ params }: Props) {
	const { id } = await params;
	const idAsNumber = Number(id);
	if (Number.isNaN(isNaN)) throw new Error("Invalid image id");
	const image = await getImage(idAsNumber);
	return (
		<div>
			<Image alt="Image" height={240} src={image.url} width={240} />
		</div>
	);
}
