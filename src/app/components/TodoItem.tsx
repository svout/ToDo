import React from 'react';
import { FiTrash2, FiCalendar, FiTag } from 'react-icons/fi';
import { Todo } from '../../../api/api';
import { gsap } from 'gsap';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <li id={`todo-${todo.id}`} className="todo-item bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          <div className="flex items-center mt-2 space-x-4 text-sm">
            {todo.dueDate && (
              <span className="flex items-center text-gray-500">
                <FiCalendar className="mr-1" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
            <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              todo.category === 'high' 
                ? 'bg-red-100 text-red-800' 
                : todo.category === 'medium' 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
            }`}>
              <FiTag className="mr-1" />
              {todo.category}
            </span>
          </div>
        </div>
        <button 
          onClick={() => gsap.to(`#todo-${todo.id}`, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
              onDelete(todo.id);
            }
          })}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Delete task"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
