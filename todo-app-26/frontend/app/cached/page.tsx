import { getTodos } from '@/lib/todos';
import TodoCachedApp from './components/TodoCachedApp';

export default async function CachedPage() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-xl rounded-xl border border-slate-300 bg-white p-5 shadow-[0_10px_25px_rgba(15,23,42,0.12)] sm:p-6">
        <header className="mb-5 border-b-2 border-slate-300 pb-4">
          <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Daftar Tugas (Todo List)
          </h1>
        </header>
        <TodoCachedApp initialTodos={todos} />
      </div>
    </main>
  );
}
