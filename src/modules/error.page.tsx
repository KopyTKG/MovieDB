'use client';
import { Button } from '@nextui-org/react';

export default function ErrorPage(props: { error: Error }) {
	return (
		<div className="w-full h-[90vh] flex flex-col justify-center items-center gap-10">
			<h2 className="text-3xl font-bold">Something went wrong!</h2>
			<Button color="danger" onClick={() => window.location.reload()}>
        Try again
			</Button>
			<Button color="primary" onClick={() => window.history.back()}>
        Go Back
			</Button>
			<div className="flex flex-col justify-center items-center gap-1">
				<code>Name: {props.error.name}</code>
				<code>Message: {props.error.message}</code>
			</div>
		</div>
	);
}
