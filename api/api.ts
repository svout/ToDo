import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export interface Todo {
  dueDate?: string;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  category: string;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await api.get<Todo[]>('/todos?_limit=10');
  return response.data;
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const response = await api.post<Todo>('/todos', todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
}; 