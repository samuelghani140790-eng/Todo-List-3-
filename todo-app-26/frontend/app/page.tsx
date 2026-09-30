import React from 'react';
import TodoApp from './components/TodoApp';

export default function TodoPage() {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <header className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-dark-130 text-center">
              Daftar Tugas (Todo List)
          </h1>
        </header>
          <TodoApp />
        </div>
      </div>
    </main>
  );
}
