// Home page component. Serves as the landing page and entry point of the application.
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>
      <p className="text-muted-foreground mb-8">
        A simple todo application powered by Next.js.
      </p>
      <Link
        href="/todos"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        View Todos
      </Link>
    </main>
  );
}
