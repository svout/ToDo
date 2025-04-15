import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../../../api/api';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <ul className="space-y-3">
        {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
        ))}
    </ul>
  );
};
export default TodoList;