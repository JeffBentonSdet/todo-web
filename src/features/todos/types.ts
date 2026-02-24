// Todo TypeScript types. Type definitions for todo entities, DTOs, and form values.

export type TodoStatus = 'pending' | 'in_progress' | 'done';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

export interface TodoFilter {
  status?: TodoStatus;
  search?: string;
}
