// Todos error boundary. Handles and displays errors that occur in the todos route.
'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TodosError({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <p className="text-destructive font-medium">Something went wrong.</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
