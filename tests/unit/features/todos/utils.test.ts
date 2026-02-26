// Unit tests for todo utility functions. Vitest tests for filtering, sorting, and transformation helpers.
import { describe, expect, it } from 'vitest';
import { sortTodosByDate } from '@/features/todos/utils';
import type { Todo } from '@/features/todos/types';

const makeTodo = (overrides: Partial<Todo>): Todo => ({
  id: 1,
  title: 'Test todo',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('sortTodosByDate', () => {
  it('sorts todos newest first', () => {
    const todos = [
      makeTodo({ id: 1, created_at: '2024-01-01T00:00:00Z' }),
      makeTodo({ id: 2, created_at: '2024-03-01T00:00:00Z' }),
      makeTodo({ id: 3, created_at: '2024-02-01T00:00:00Z' }),
    ];

    const sorted = sortTodosByDate(todos);

    expect(sorted.map((t) => t.id)).toEqual([2, 3, 1]);
  });

  it('returns an empty array when given an empty array', () => {
    expect(sortTodosByDate([])).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const todos = [
      makeTodo({ id: 1, created_at: '2024-01-01T00:00:00Z' }),
      makeTodo({ id: 2, created_at: '2024-03-01T00:00:00Z' }),
    ];
    const original = [...todos];

    sortTodosByDate(todos);

    expect(todos).toEqual(original);
  });

  it('returns a single-element array unchanged', () => {
    const todos = [makeTodo({ id: 1 })];
    expect(sortTodosByDate(todos)).toEqual(todos);
  });
});
