// Sidebar component. Renders the side navigation with route links and filters.
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r bg-background p-4">
      <nav className="flex flex-col gap-1 text-sm">
        <Link
          href="/todos"
          className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          All Todos
        </Link>
      </nav>
    </aside>
  );
}
