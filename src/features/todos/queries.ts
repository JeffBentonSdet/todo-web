// Todo TanStack Query hooks. Custom hooks wrapping todo API calls with caching and state management.
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, fetchTodo, createTodo, toggleTodo, deleteTodo } from './api';
import type { CreateTodoDto, TodoFilter } from './types';

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filter?: TodoFilter) => [...todoKeys.lists(), filter] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};

export function useTodos(filter?: TodoFilter) {
  return useQuery({
    queryKey: todoKeys.list(filter),
    queryFn: () => fetchTodos(filter),
  });
}

export function useTodo(id: number) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => fetchTodo(id),
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTodoDto) => createTodo(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => toggleTodo(id),
    onSuccess: (updated) => {
      queryClient.setQueryData(todoKeys.detail(updated.id), updated);
      void queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}
