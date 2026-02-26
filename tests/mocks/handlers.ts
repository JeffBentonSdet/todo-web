// MSW request handlers. Shared mock handlers for all todo REST endpoints.
import { http, HttpResponse } from 'msw';

const BASE_URL = 'http://localhost:5000';

const TODO_FIXTURE = {
  id: 1,
  title: 'Test todo',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

export const handlers = [
  http.get(`${BASE_URL}/api/todos`, () => {
    return HttpResponse.json([TODO_FIXTURE]);
  }),

  http.get(`${BASE_URL}/api/todos/:id`, ({ params }) => {
    return HttpResponse.json({ ...TODO_FIXTURE, id: Number(params.id) });
  }),

  http.post(`${BASE_URL}/api/todos`, async ({ request }) => {
    const body = await request.json() as { title: string };
    return HttpResponse.json({ ...TODO_FIXTURE, title: body.title }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/api/todos/:id`, ({ params }) => {
    return HttpResponse.json({ ...TODO_FIXTURE, id: Number(params.id), completed: true });
  }),

  http.delete(`${BASE_URL}/api/todos/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
