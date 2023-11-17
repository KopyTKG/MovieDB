'use client'; // Error components must be Client Components
import { Button } from '@nextui-org/react';

export default function Error({
	error,
	reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
	return (
		<div className="w-full h-[90vh] flex flex-col justify-center items-center gap-10">
			<h2 className="text-3xl font-bold">Something went wrong!</h2>
			<Button color="danger" onClick={() => reset()}>
        Try again
			</Button>
			<Button color="primary" onClick={() => window.history.back()}>
        Go Back
			</Button>
			<code>Error: {error.message}</code>
		</div>
	);
}
