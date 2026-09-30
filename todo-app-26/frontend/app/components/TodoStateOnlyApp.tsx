'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { authService } from '@/services/authService';
import { ApiError } from '@/services/api';
import { todoService } from '@/services/todoService';
import { Todo } from '@/types/todo';

type TodoStateOnlyAppProps = {
  initialTodos: Todo[];
};

export default function TodoStateOnlyApp({ initialTodos }: TodoStateOnlyAppProps) {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authService.getToken()) {
      router.replace('/login');
      return;
    }

    let active = true;

    todoService
      .getTodos()
      .then((data) => {
        if (active) {
          setTodos(
            data.map((todo) => ({
              id: todo.id,
              title: todo.todo,
              completed: Boolean(todo.completed),
              createdAt: new Date().toISOString().split('T')[0],
            }))
          );
        }
      })
      .catch((err: unknown) => {
        if (!active) return;
        if (err instanceof ApiError && err.status === 401) {
          router.replace('/login');
          return;
        }
        setError(err instanceof Error ? err.message : 'Gagal mengambil daftar tugas.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  const handleAddTodo = async (title: string) => {
    setError('');
    try {
      const created = await todoService.createTodo(title);
      setTodos((current) => [
        ...current,
        {
          id: created.id,
          title: created.todo,
          completed: Boolean(created.completed),
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menambahkan tugas.');
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    setError('');
    try {
      await todoService.updateTodo(id, { is_completed: !todo.completed });
      setTodos((current) =>
        current.map((item) =>
          item.id === id ? { ...item, completed: !todo.completed } : item
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memperbarui tugas.');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setError('');
    try {
      await todoService.deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus tugas.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.replace('/login');
  };

  return (
    <>
      <TodoForm onAddTodo={handleAddTodo} />
      {error && (
        <p role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {loading ? (
        <p className="py-6 text-center text-sm text-gray-500">Memuat tugas...</p>
      ) : (
        <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
      )}
      <footer className="mt-6 flex justify-end border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-600"
        >
          Logout ↪
        </button>
      </footer>
    </>
  );
}
