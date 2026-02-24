// Todo filters component. Renders filter controls for searching todos.
'use client';

import type { TodoFilter } from '@/features/todos/types';

interface TodoFiltersProps {
  filter: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

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
    </div>
  );
}
