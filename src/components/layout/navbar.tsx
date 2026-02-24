// Navigation bar component. Renders the top navigation with user menu and app branding.
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-14 items-center gap-4">
        <Link href="/" className="font-semibold">
          Todo App
        </Link>
        <nav className="flex items-center gap-4 ml-auto text-sm">
          <Link
            href="/todos"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Todos
          </Link>
        </nav>
      </div>
    </header>
  );
}
