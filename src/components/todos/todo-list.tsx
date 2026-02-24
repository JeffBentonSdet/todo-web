// Todo list component. Renders a list of todo items.
import type { Todo } from '@/features/todos/types';
import { TodoItem } from './todo-item';

interface TodoListProps {
  todos: Todo[];
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
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
          <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
