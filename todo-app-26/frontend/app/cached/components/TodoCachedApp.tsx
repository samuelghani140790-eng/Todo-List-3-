'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
import { Todo } from '@/types/todo';

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

export default function TodoCachedApp({ initialTodos }: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>('TODO_LIST_CACHE', initialTodos);

  const [nextId, setNextId] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    const maxId = initialTodos.reduce((max, t) => Math.max(max, t.id), 0);
    return maxId > 0 ? maxId + 1 : 1;
  });

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: nextId,
      title,
      description: '',
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setNextId(nextId + 1);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleResetData = () => {
    setTodos(initialTodos);
  };

  return (
    <div suppressHydrationWarning>
      <TodoForm onAddTodo={handleAddTodo} />
      <div className="mb-4 flex items-center justify-between gap-3 text-xs text-slate-500">
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
          Cache aktif (localStorage: TODO_LIST_CACHE)
        </span>
        <button
          onClick={handleResetData}
          className="shrink-0 underline transition-colors hover:text-red-600"
        >
          Reset ke Data Awal
        </button>
      </div>
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}
