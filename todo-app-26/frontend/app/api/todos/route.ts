import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/services/api';
import { createTodo } from '@/services/todoService';
import type { ApiTask, ApiResponse } from '@/types/api-todo';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const skip = searchParams.get('skip');

    const requestedLimit = limit ? Number.parseInt(limit, 10) : 15;
    const requestedSkip = skip ? Number.parseInt(skip, 10) : 0;
    const upstreamUrl = new URL(`${BASE_URL}/todos`);
    upstreamUrl.searchParams.set('limit', String(Number.isFinite(requestedLimit) ? requestedLimit : 15));
    upstreamUrl.searchParams.set('skip', String(Number.isFinite(requestedSkip) ? requestedSkip : 0));
    const upstreamResponse = await fetch(upstreamUrl, { cache: 'no-store' });

    if (!upstreamResponse.ok) {
      throw new Error('DummyJSON API request failed');
    }

    const upstreamData = (await upstreamResponse.json()) as {
      todos: Array<{ id: number; todo: string; completed: boolean; userId: number }>;
      total: number;
    };
    const tasks: ApiTask[] = upstreamData.todos.map((todo) => ({
      id: todo.id,
      title: todo.todo,
      completed: todo.completed,
      userId: todo.userId,
      source: 'dummyjson-api',
    }));

    const response = {
      success: true,
      message: 'Koneksi ke DummyJSON API berhasil! Data berhasil diambil.',
      count: tasks.length,
      total: upstreamData.total,
      data: { tasks },
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: ApiResponse<null> = {
      success: false,
      message: 'Gagal mengambil data tugas',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body as { title?: string };

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Judul tugas wajib diisi',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const newTodo = await createTodo(title.trim());

    const response: ApiResponse<{ id: number; title: string; completed: boolean }> = {
      success: true,
      data: {
        id: newTodo.id,
        title: newTodo.todo,
        completed: newTodo.completed,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    const response: ApiResponse<null> = {
      success: false,
      message: 'Gagal membuat tugas',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
