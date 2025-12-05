import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PhotoModal({ params }: Props) {
	const { id } = await params;
	const idAsNumber = Number(id);
	if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

	return (
		<Modal>
			<FullPageImageView imageId={idAsNumber} />
		</Modal>
	);
}
