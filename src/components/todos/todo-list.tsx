// Todo list component. Renders a list of todo items with virtualization support.
import type { Todo } from '@/features/todos/types';
import { TodoItem } from './todo-item';

interface TodoListProps {
  todos: Todo[];
  onStatusChange?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TodoList({ todos, onStatusChange, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No todos yet. Create one to get started!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
