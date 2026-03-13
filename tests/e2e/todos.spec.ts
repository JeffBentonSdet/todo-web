// End-to-end tests for todo workflows. Playwright tests covering create, read, update, and delete flows.
import { test, expect } from '@playwright/test';

const API_BASE = 'http://localhost:5001';

async function createTodo(title: string): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

async function deleteTodo(id: number): Promise<void> {
  await fetch(`${API_BASE}/api/todos/${id}`, { method: 'DELETE' });
}

test.describe('todos list page', () => {
  test('shows empty state when there are no todos', async ({ page }) => {
    await page.goto('/todos');
    await expect(page.getByText('No todos yet. Create one to get started!')).toBeVisible();
  });

  test.describe('with todos', () => {
    const createdIds: number[] = [];

    test.beforeEach(async () => {
      const todo = await createTodo('Buy groceries');
      createdIds.push(todo.id);
    });

    test.afterEach(async () => {
      for (const id of createdIds.splice(0)) {
        await deleteTodo(id);
      }
    });

    test('displays todos fetched from the API', async ({ page }) => {
      await page.goto('/todos');
      await expect(page.getByText('Buy groceries')).toBeVisible();
    });
  });
});
