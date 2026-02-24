// Todos list page. Displays the main todo list with filtering and sorting options.
import { PageHeader } from '@/components/layout/page-header';

export default function TodosPage() {
  return (
    <div>
      <PageHeader
        title="Todos"
        description="Manage your tasks"
      />
      <p className="text-muted-foreground">
        Todo list will appear here once data fetching is wired up.
      </p>
    </div>
  );
}
