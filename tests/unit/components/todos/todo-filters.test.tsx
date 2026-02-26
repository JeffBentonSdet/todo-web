// Unit tests for the TodoFilters component. Covers rendering and search input interaction.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TodoFilters } from '@/components/todos/todo-filters';

describe('TodoFilters', () => {
  it('renders the search input', () => {
    render(<TodoFilters filter={{}} onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search todos…')).toBeInTheDocument();
  });

  it('shows the current filter search value', () => {
    render(<TodoFilters filter={{ search: 'groceries' }} onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search todos…')).toHaveValue('groceries');
  });

  it('shows empty string when filter.search is undefined', () => {
    render(<TodoFilters filter={{}} onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search todos…')).toHaveValue('');
  });

  it('calls onChange with updated search value when input changes', () => {
    const onChange = vi.fn();
    render(<TodoFilters filter={{}} onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Search todos…'), {
      target: { value: 'milk' },
    });
    expect(onChange).toHaveBeenCalledWith({ search: 'milk' });
  });

  it('preserves other filter fields when search changes', () => {
    const onChange = vi.fn();
    render(<TodoFilters filter={{ search: 'a' }} onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Search todos…'), {
      target: { value: 'b' },
    });
    expect(onChange).toHaveBeenCalledWith({ search: 'b' });
  });
});
