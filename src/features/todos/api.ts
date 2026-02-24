// Todo REST API functions. Typed fetch functions for todo CRUD operations via REST.
import { apiClient } from '@/lib/api-client';
import type { Todo, CreateTodoDto, TodoFilter } from './types';

export async function fetchTodos(filter?: TodoFilter): Promise<Todo[]> {
  const params = new URLSearchParams();
  if (filter?.search) params.set('search', filter.search);
  const query = params.toString();
  return apiClient<Todo[]>(`/api/todos${query ? `?${query}` : ''}`);
}

export async function fetchTodo(id: number): Promise<Todo> {
  return apiClient<Todo>(`/api/todos/${id}`);
}

export async function createTodo(dto: CreateTodoDto): Promise<Todo> {
  return apiClient<Todo>('/api/todos', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function toggleTodo(id: number): Promise<Todo> {
  return apiClient<Todo>(`/api/todos/${id}`, { method: 'PATCH' });
}

export async function deleteTodo(id: number): Promise<void> {
  return apiClient<void>(`/api/todos/${id}`, { method: 'DELETE' });
}
