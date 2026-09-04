export type TodoApi = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodoApiResponse = {
  todo: TodoApi;
};

export type ApiTask = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  source: string;
};

export type ApiTodoListResponse = {
  success: true;
  message: string;
  count: number;
  total: number;
  data: {
    tasks: ApiTask[];
  };
};

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; message: string };
