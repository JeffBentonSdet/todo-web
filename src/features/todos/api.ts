// Todo REST API functions. Typed fetch functions for todo CRUD operations via REST.
import { apiClient } from '@/lib/api-client';
import type { Todo, CreateTodoDto, UpdateTodoDto, TodoFilter } from './types';
import type { PaginatedResponse } from '@/types';

export async function fetchTodos(
  filter?: TodoFilter,
): Promise<PaginatedResponse<Todo>> {
  const params = new URLSearchParams();
  if (filter?.status) params.set('status', filter.status);
  if (filter?.search) params.set('search', filter.search);
  const query = params.toString();
  return apiClient<PaginatedResponse<Todo>>(
    `/todos${query ? `?${query}` : ''}`,
  );
}

export async function fetchTodo(id: string): Promise<Todo> {
  return apiClient<Todo>(`/todos/${id}`);
}

export async function createTodo(dto: CreateTodoDto): Promise<Todo> {
  return apiClient<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function updateTodo(
  id: string,
  dto: UpdateTodoDto,
): Promise<Todo> {
  return apiClient<Todo>(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function deleteTodo(id: string): Promise<void> {
  return apiClient<void>(`/todos/${id}`, { method: 'DELETE' });
}
