// Todo utility functions. Helper functions for todo-specific logic like sorting.
import type { Todo } from './types';

export function sortTodosByDate(todos: Todo[]): Todo[] {
  return [...todos].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
