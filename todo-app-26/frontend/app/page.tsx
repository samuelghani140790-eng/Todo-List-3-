import React from 'react';
import TodoStateOnlyApp from './components/TodoStateOnlyApp';
import { getTodos } from '@/lib/todos';

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-[0_10px_25px_rgba(15,23,42,0.12)] sm:p-7">
        <header className="mb-5 border-b border-slate-300 pb-4">
          <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        <TodoStateOnlyApp initialTodos={todos} />
      </div>
    </main>
  );
}
