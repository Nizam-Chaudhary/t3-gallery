import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { imageId: number }) {
	const image = await getImage(props.imageId);
	return (
		<div className="flex h-full w-full">
			<div className="flex shrink items-center justify-center">
				<img alt="dynamic" className="shrink object-contain" src={image.url} />
			</div>
			<div className="flex w-48 shrink-0 flex-col border-l">
				<div className="font-bold text-xl">{image.name}</div>
			</div>
		</div>
	);
}
