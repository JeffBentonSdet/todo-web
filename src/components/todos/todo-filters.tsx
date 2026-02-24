// Todo filters component. Renders filter controls for status, priority, and search.
'use client';

import type { TodoFilter, TodoStatus } from '@/features/todos/types';

interface TodoFiltersProps {
  filter: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

const STATUS_OPTIONS: { label: string; value: TodoStatus | '' }[] = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

export function TodoFilters({ filter, onChange }: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="search"
        value={filter.search ?? ''}
        onChange={(e) => onChange({ ...filter, search: e.target.value })}
        placeholder="Search todos…"
        className="rounded-md border border-input bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <select
        value={filter.status ?? ''}
        onChange={(e) =>
          onChange({ ...filter, status: (e.target.value as TodoStatus) || undefined })
        }
        className="rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
