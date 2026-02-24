// Todo TypeScript types. Type definitions for todo entities, DTOs, and form values.

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoDto {
  title: string;
}

export interface TodoFilter {
  search?: string;
}
