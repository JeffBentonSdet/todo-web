// Unit tests for todo REST API functions. Verifies correct URL, HTTP method, request body, and response shape for each operation.
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { createTodo, deleteTodo, fetchTodo, fetchTodos, toggleTodo } from '@/features/todos/api';
import { server } from '../../../mocks/server';

const BASE_URL = 'http://localhost:5000';

const TODO_FIXTURE = {
  id: 1,
  title: 'Test todo',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('fetchTodos', () => {
  it('fetches all todos', async () => {
    const todos = await fetchTodos();
    expect(todos).toEqual([TODO_FIXTURE]);
  });

  it('appends search query param when filter.search is provided', async () => {
    let requestedUrl = '';
    server.use(
      http.get(`${BASE_URL}/api/todos`, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json([]);
      }),
    );

    await fetchTodos({ search: 'groceries' });
    expect(requestedUrl).toBe(`${BASE_URL}/api/todos?search=groceries`);
  });

  it('omits query string when filter has no search', async () => {
    let requestedUrl = '';
    server.use(
      http.get(`${BASE_URL}/api/todos`, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json([]);
      }),
    );

    await fetchTodos({});
    expect(requestedUrl).toBe(`${BASE_URL}/api/todos`);
  });
});

describe('fetchTodo', () => {
  it('fetches a single todo by id', async () => {
    const todo = await fetchTodo(1);
    expect(todo).toMatchObject({ id: 1 });
  });

  it('requests the correct URL for the given id', async () => {
    let requestedUrl = '';
    server.use(
      http.get(`${BASE_URL}/api/todos/:id`, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json({ ...TODO_FIXTURE, id: 99 });
      }),
    );

    await fetchTodo(99);
    expect(requestedUrl).toBe(`${BASE_URL}/api/todos/99`);
  });
});

describe('createTodo', () => {
  it('sends a POST request with the title in the body', async () => {
    let body: unknown;
    server.use(
      http.post(`${BASE_URL}/api/todos`, async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({ ...TODO_FIXTURE, title: 'Buy milk' }, { status: 201 });
      }),
    );

    await createTodo({ title: 'Buy milk' });
    expect(body).toEqual({ title: 'Buy milk' });
  });

  it('returns the created todo', async () => {
    const todo = await createTodo({ title: 'Test todo' });
    expect(todo).toMatchObject({ title: 'Test todo' });
  });
});

describe('toggleTodo', () => {
  it('sends a PATCH request to the correct URL', async () => {
    let method = '';
    let requestedUrl = '';
    server.use(
      http.patch(`${BASE_URL}/api/todos/:id`, ({ request }) => {
        method = request.method;
        requestedUrl = request.url;
        return HttpResponse.json({ ...TODO_FIXTURE, completed: true });
      }),
    );

    await toggleTodo(1);
    expect(method).toBe('PATCH');
    expect(requestedUrl).toBe(`${BASE_URL}/api/todos/1`);
  });

  it('returns the updated todo', async () => {
    const todo = await toggleTodo(1);
    expect(todo).toMatchObject({ completed: true });
  });
});

describe('deleteTodo', () => {
  it('sends a DELETE request to the correct URL', async () => {
    let method = '';
    let requestedUrl = '';
    server.use(
      http.delete(`${BASE_URL}/api/todos/:id`, ({ request }) => {
        method = request.method;
        requestedUrl = request.url;
        return new HttpResponse(null, { status: 204 });
      }),
    );

    await deleteTodo(1);
    expect(method).toBe('DELETE');
    expect(requestedUrl).toBe(`${BASE_URL}/api/todos/1`);
  });
});
