'use client';

import React from 'react';
import Link from 'next/link';
import { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-lg border p-3.5 transition-colors ${
        todo.completed ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 shrink-0 cursor-pointer rounded text-blue-500"
          suppressHydrationWarning
        />
        <span
          className={`truncate text-base ${
            todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <Link
          href={`/task/${todo.id}`}
          className="rounded-md bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-200"
        >
          Detail →
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-md bg-red-400 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-500"
        >
          Hapus
        </button>
      </div>
    </li>
  );
}
