// Unit tests for the TodoForm component. Covers rendering, validation, submission, and loading state.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoForm } from '@/components/todos/todo-form';

describe('TodoForm', () => {
  it('renders the input and submit button', () => {
    render(<TodoForm onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText('New todo…')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('disables the submit button when input is empty', () => {
    render(<TodoForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  it('enables the submit button when input has text', async () => {
    render(<TodoForm onSubmit={vi.fn()} />);
    await userEvent.type(screen.getByPlaceholderText('New todo…'), 'Buy milk');
    expect(screen.getByRole('button', { name: 'Add' })).toBeEnabled();
  });

  it('calls onSubmit with the trimmed title when submitted', async () => {
    const onSubmit = vi.fn();
    render(<TodoForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByPlaceholderText('New todo…'), '  Buy milk  ');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Buy milk' });
  });

  it('clears the input after submission', async () => {
    render(<TodoForm onSubmit={vi.fn()} />);
    const input = screen.getByPlaceholderText('New todo…');
    await userEvent.type(input, 'Buy milk');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(input).toHaveValue('');
  });

  it('does not call onSubmit when input is only whitespace', async () => {
    const onSubmit = vi.fn();
    render(<TodoForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByPlaceholderText('New todo…'), '   ');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows loading text and disables button when isLoading is true', () => {
    render(<TodoForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByRole('button', { name: 'Adding…' })).toBeDisabled();
  });
});
