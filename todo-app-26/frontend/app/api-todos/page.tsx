import { getTasks } from '@/lib/tasks';
import ApiTodoList from './components/ApiTodoList';

export default async function ApiTodosPage() {
  const todos = await getTasks();

  return <ApiTodoList initialTodos={todos} />;
}
