// Todos list page. Displays the main todo list with filtering and sorting options.
import { PageHeader } from '@/components/layout/page-header';
import { TodoList } from '@/components/todos/todo-list';
import { fetchTodos } from '@/features/todos/api';

export default async function TodosPage() {
  const todos = await fetchTodos();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Todos" description="Manage your tasks" />
      <TodoList todos={todos} />
    </div>
  );
}
