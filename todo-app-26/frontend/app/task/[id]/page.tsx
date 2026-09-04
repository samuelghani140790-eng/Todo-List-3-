import React from 'react';
import { getTodoDetail } from '@/lib/todos';
import TaskNotFound from './components/TaskNotFound';
import TaskDetailCard from './components/TaskDetailCard';

interface TodoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TodoDetailPage({
  params,
}: TodoDetailPageProps) {
  const { id } = await params;

  const todo = await getTodoDetail(id);

  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  return <TaskDetailCard todo={todo} />;
}