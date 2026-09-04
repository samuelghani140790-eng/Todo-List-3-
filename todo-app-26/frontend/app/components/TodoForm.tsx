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
    <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="text"
          placeholder="Tambahkan tugas baru..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <Button
          type="submit"
          className="rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!title.trim()}
        >
          Tambah
        </Button>
      </form>
    </div>
  );
}
