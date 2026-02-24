// Todo utility functions. Helper functions for todo-specific logic like filtering and sorting.
import type { Todo, TodoStatus } from './types';

export function getTodoStatusLabel(status: TodoStatus): string {
  const labels: Record<TodoStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    done: 'Done',
  };
  return labels[status];
}

export function sortTodosByDate(todos: Todo[]): Todo[] {
  return [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
