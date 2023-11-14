
'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
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
            <code>Name: {error.name}</code>
            <code>Message: {error.message}</code>
          </div>
        </div>
      );
}