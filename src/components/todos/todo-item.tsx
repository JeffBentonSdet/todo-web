// Todo item component. Renders an individual todo with status toggle and action buttons.
import type { Todo } from '@/features/todos/types';
import { getTodoStatusLabel } from '@/features/todos/utils';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onStatusChange?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TodoItem({ todo, onStatusChange, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-md border p-4">
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'font-medium truncate',
            todo.status === 'done' && 'line-through text-muted-foreground',
          )}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {todo.description}
          </p>
        )}
        <span className="inline-block mt-2 text-xs text-muted-foreground">
          {getTodoStatusLabel(todo.status)}
        </span>
      </div>
      <div className="flex gap-2 shrink-0">
        {onStatusChange && (
          <button
            onClick={() => onStatusChange(todo.id)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Toggle
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(todo.id)}
            className="text-xs text-destructive hover:text-destructive/80"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
