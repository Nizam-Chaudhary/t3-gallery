const mockUrls = [
	"https://ml6px9ca3v.ufs.sh/f/PSOmenvMmGUjU7Oy66MJuEHOLZWeS6DhA7VMgYa5RXwTq2xB",
	"https://ml6px9ca3v.ufs.sh/f/PSOmenvMmGUjvKIJFu7jhkBQNJfbZnGzLDmCudTe9FOY4251",
	"https://ml6px9ca3v.ufs.sh/f/PSOmenvMmGUjqCu8hCwbgZXbDiBUTAtsnv1j5y8Qe37MJp4I",
	"https://ml6px9ca3v.ufs.sh/f/PSOmenvMmGUjA74vKMJ6KsZpc4voW7gQOJPN1eU8Tu9LBMRq",
];

const mockImages = mockUrls.map((url, index) => ({
	id: index + 1,
	url,
}));

export default function HomePage() {
	return (
		<main className="">
			<div className="flex flex-wrap gap-4">
				{[...mockImages, ...mockImages, ...mockImages].map((image) => (
					<div className="w-48" key={image.id}>
						<img alt={"mock"} src={image.url} />
					</div>
				))}
			</div>
		</main>
	);
}
