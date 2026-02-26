// Unit tests for the base API client. Verifies URL construction, Content-Type header, JSON parsing, and error handling.
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { apiClient } from '@/lib/api-client';
import { server } from '../../mocks/server';

const BASE_URL = 'http://localhost:5000';

describe('apiClient', () => {
  it('makes a request to the correct URL', async () => {
    let requestedUrl = '';
    server.use(
      http.get(`${BASE_URL}/api/test`, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json({});
      }),
    );

    await apiClient('/api/test');
    expect(requestedUrl).toBe(`${BASE_URL}/api/test`);
  });

  it('sends Content-Type: application/json by default', async () => {
    let contentType = '';
    server.use(
      http.get(`${BASE_URL}/api/test`, ({ request }) => {
        contentType = request.headers.get('content-type') ?? '';
        return HttpResponse.json({});
      }),
    );

    await apiClient('/api/test');
    expect(contentType).toBe('application/json');
  });

  it('returns parsed JSON from the response', async () => {
    server.use(
      http.get(`${BASE_URL}/api/test`, () => {
        return HttpResponse.json({ value: 42 });
      }),
    );

    const result = await apiClient<{ value: number }>('/api/test');
    expect(result).toEqual({ value: 42 });
  });

  it('throws when the response is not ok', async () => {
    server.use(
      http.get(`${BASE_URL}/api/test`, () => {
        return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
      }),
    );

    await expect(apiClient('/api/test')).rejects.toThrow('API error 404');
  });

  it('passes additional init options to fetch', async () => {
    let method = '';
    server.use(
      http.post(`${BASE_URL}/api/test`, ({ request }) => {
        method = request.method;
        return HttpResponse.json({});
      }),
    );

    await apiClient('/api/test', { method: 'POST' });
    expect(method).toBe('POST');
  });
});
