'use client';

import { useState, FormEvent } from 'react';
import { Input } from './cards/ui/input';
import { Button } from './cards/ui/button';

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo(title.trim());
    setTitle('');
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-3">
      <form onSubmit={handleSubmit} className="flex min-w-0 flex-row gap-2">
        <Input
          type="text"
          placeholder="Tambahkan tugas baru..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        <Button
          type="submit"
          className="shrink-0 rounded-md bg-sky-300 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!title.trim()}
        >
          Tambah
        </Button>
      </form>
    </div>
  );
}
