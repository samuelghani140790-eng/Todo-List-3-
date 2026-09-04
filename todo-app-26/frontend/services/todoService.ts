import { BASE_URL, ApiError } from './api';
import { TodoApi, TodoApiResponse } from '@/types/api-todo';

const ENDPOINT_TODOS = `${BASE_URL}/todos`;

async function apiClient<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new ApiError(res.status, `Gagal: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchTodos(): Promise<TodoApi[]> {
  const data = await fetchTodosWithMeta();
  return data.todos;
}

export async function fetchTodosWithMeta(): Promise<{ todos: TodoApi[]; total: number }> {
  const data = await apiClient<{ todos: TodoApi[]; total: number }>(ENDPOINT_TODOS);
  return data;
}

export async function fetchTodoById(id: number): Promise<TodoApi> {
  const data = await apiClient<TodoApiResponse>(`${ENDPOINT_TODOS}/${id}`);
  return data.todo;
}

export async function createTodo(title: string): Promise<TodoApi> {
  const data = await apiClient<TodoApiResponse>(ENDPOINT_TODOS, {
    method: 'POST',
    body: JSON.stringify({ todo: title, completed: false }),
  });
  return data.todo;
}

export async function updateTodo(id: number, todo: Partial<TodoApi>): Promise<TodoApi> {
  const data = await apiClient<TodoApiResponse>(`${ENDPOINT_TODOS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
  });
  return data.todo;
}

export async function deleteTodo(id: number): Promise<void> {
  await apiClient<void>(`${ENDPOINT_TODOS}/${id}`, {
    method: 'DELETE',
  });
}
