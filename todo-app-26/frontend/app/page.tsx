import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getTodos } from "@/lib/todo";

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        <header className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-center text-3xl font-bold text-gray-800">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </main>
  );
}