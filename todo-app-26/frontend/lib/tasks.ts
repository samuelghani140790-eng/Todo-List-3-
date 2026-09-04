import { fetchTodos, fetchTodoById } from '@/services/todoService';
import { TodoApi } from '@/types/api-todo';
import { Todo } from '@/types/todo';

// Formatter: Dashboard Todo -> Format lokal
function formatTodoFromApi(apiTodo: TodoApi): Todo {
  return {
    id: apiTodo.id,
    title: apiTodo.todo,
    description: '',
    completed: apiTodo.completed,
    createdAt: new Date().toISOString().split('T')[0],
    userId: apiTodo.userId,
    source: 'dummyjson-api',
  };
}

export async function getTasks(): Promise<Todo[]> {
  try {
    const apiTodos = await fetchTodos();
    return apiTodos.map(formatTodoFromApi);
  } catch (error) {
    console.error('Gagal mengambil tugas:', error);
    return [];
  }
}

export async function getTaskById(id: number): Promise<Todo | null> {
  try {
    const apiTodo = await fetchTodoById(id);
    return formatTodoFromApi(apiTodo);
  } catch (error) {
    console.error(`Gagal mengambil tugas #${id}:`, error);
    return null;
  }
}

export async function getTaskStats(todos: Todo[]): Promise<{ total: number; completed: number; pending: number }> {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  return { total, completed, pending };
}
