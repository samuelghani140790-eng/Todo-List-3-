'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/types/todo';
import { ApiTodoListResponse } from '@/types/api-todo';
import { Button } from '../../components/cards/ui/button';

type ApiTodoListProps = {
  initialTodos: Todo[];
};

export default function ApiTodoList({ initialTodos }: ApiTodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(() => initialTodos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/todos');
      const json = (await res.json()) as ApiTodoListResponse;
      if (json.success) {
        setTodos(
          json.data.tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: '',
            completed: task.completed,
            createdAt: new Date().toISOString().split('T')[0],
            userId: task.userId,
            source: task.source,
          }))
        );
      } else {
        setError(json.message);
      }
    } catch {
      setError('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchTodos();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchTodos]);

  const handleToggle = useCallback(async (id: number) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !current.completed }),
      });
    } catch {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: current.completed } : t
        )
      );
    }
  }, [todos]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6" suppressHydrationWarning>
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 shadow-[0_10px_25px_rgba(15,23,42,0.12)] sm:p-7">
        <header className="mb-5 border-b-2 border-slate-300 pb-4">
          <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {todos.length === 0 && !loading && (
          <div className="text-center p-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-md">
            <p className="text-lg">Belum ada tugas.</p>
            <p className="text-sm mt-1">Data diambil dari DummyJSON API.</p>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Daftar Tugas</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            {todos.length} item
          </span>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${
                todo.completed
                  ? 'border-emerald-100 bg-emerald-50/60'
                  : 'border-slate-300 bg-white'
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="h-5 w-5 shrink-0 cursor-pointer rounded text-blue-500"
                  suppressHydrationWarning
                />
                <span
                  className={`min-w-0 flex-1 text-sm ${
                    todo.completed
                      ? 'text-slate-300 line-through'
                      : 'text-slate-800'
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold">
                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-purple-600">ID: #{todo.id}</span>
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-600">User: {todo.userId ?? '-'}</span>
                <span className={`rounded-full px-2.5 py-1 ${todo.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-600'}`}>
                  {todo.completed ? 'Selesai' : 'Pending'}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {loading && (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">Mengambil data...</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Button onClick={fetchTodos} variant="outline">
            Refresh Data
          </Button>
        </div>
      </div>
    </main>
  );
}
