import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { imageId: number }) {
	const image = await getImage(props.imageId);
	return <img alt="dynamic" className="w-96" src={image.url} />;
}
