// Unit tests for the TodoItem component. Covers rendering, completion styling, and button interactions.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoItem } from '@/components/todos/todo-item';
import type { Todo } from '@/features/todos/types';

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  title: 'Buy groceries',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('TodoItem', () => {
  it('renders the todo title', () => {
    render(<TodoItem todo={makeTodo({ title: 'Buy groceries' })} />);
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('applies line-through style for completed todos', () => {
    render(<TodoItem todo={makeTodo({ completed: true })} />);
    expect(screen.getByText('Buy groceries')).toHaveClass('line-through');
  });

  it('does not apply line-through style for incomplete todos', () => {
    render(<TodoItem todo={makeTodo({ completed: false })} />);
    expect(screen.getByText('Buy groceries')).not.toHaveClass('line-through');
  });

  it('shows "Complete" button for incomplete todos when onToggle provided', () => {
    render(<TodoItem todo={makeTodo({ completed: false })} onToggle={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Complete' })).toBeInTheDocument();
  });

  it('shows "Undo" button for completed todos when onToggle provided', () => {
    render(<TodoItem todo={makeTodo({ completed: true })} onToggle={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });

  it('does not show toggle button when onToggle is not provided', () => {
    render(<TodoItem todo={makeTodo()} />);
    expect(screen.queryByRole('button', { name: /complete|undo/i })).not.toBeInTheDocument();
  });

  it('calls onToggle with the todo id when toggle button is clicked', async () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={makeTodo({ id: 42 })} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button', { name: 'Complete' }));
    expect(onToggle).toHaveBeenCalledWith(42);
  });

  it('shows delete button when onDelete is provided', () => {
    render(<TodoItem todo={makeTodo()} onDelete={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('does not show delete button when onDelete is not provided', () => {
    render(<TodoItem todo={makeTodo()} />);
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
  });

  it('calls onDelete with the todo id when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(<TodoItem todo={makeTodo({ id: 7 })} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledWith(7);
  });
});
