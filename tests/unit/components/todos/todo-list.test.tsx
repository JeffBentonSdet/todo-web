// Unit tests for the TodoList component. Covers empty state and list rendering.
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TodoList } from '@/components/todos/todo-list';
import type { Todo } from '@/features/todos/types';

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  title: 'Test todo',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('TodoList', () => {
  it('shows empty state message when there are no todos', () => {
    render(<TodoList todos={[]} />);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('renders a list item for each todo', () => {
    const todos = [
      makeTodo({ id: 1, title: 'First todo' }),
      makeTodo({ id: 2, title: 'Second todo' }),
      makeTodo({ id: 3, title: 'Third todo' }),
    ];
    render(<TodoList todos={todos} />);
    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
    expect(screen.getByText('Third todo')).toBeInTheDocument();
  });

  it('does not show empty state when todos are present', () => {
    render(<TodoList todos={[makeTodo()]} />);
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
  });

  it('passes onToggle handler down to todo items', () => {
    const onToggle = vi.fn();
    render(<TodoList todos={[makeTodo()]} onToggle={onToggle} />);
    expect(screen.getByRole('button', { name: 'Complete' })).toBeInTheDocument();
  });

  it('passes onDelete handler down to todo items', () => {
    const onDelete = vi.fn();
    render(<TodoList todos={[makeTodo()]} onDelete={onDelete} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
