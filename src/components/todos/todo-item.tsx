// Todo item component. Renders an individual todo with status toggle and action buttons.
import type { Todo } from '@/features/todos/types';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-md border p-4">
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'font-medium truncate',
            todo.completed && 'line-through text-muted-foreground',
          )}
        >
          {todo.title}
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        {onToggle && (
          <button
            onClick={() => onToggle(todo.id)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {todo.completed ? 'Undo' : 'Complete'}
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
