'use client'
import { useEffect, useState } from 'react';
import { fetchTodos, addTodo, deleteTodo, Todo } from '../../api/api';
import { gsap } from 'gsap';
import { FiPlus } from 'react-icons/fi';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import Loading from './components/Loading';
import Error from './components/Error';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
        gsap.from('.todo-item', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.3,
          delay: 0.2
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo || !dueDate || !category) {
        console.log("Please fill in all fields.");
        return;
    }

    const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
        userId: 1,
        category,
        dueDate: dueDate || undefined
    };

    setTodos(prevTodos => [newTodoItem, ...prevTodos]);
    setNewTodo('');
    setDueDate('');
    setCategory('');
    setIsModalOpen(false);

    try {
        const addedTodo = await addTodo(newTodoItem);
        setTodos(prevTodos => [addedTodo, ...prevTodos.filter(todo => todo.id !== newTodoItem.id)]);
        console.log("Todo added:", addedTodo);
    } catch (err) {
        console.error("Error adding todo:", (err as Error).message);
        setError((err as Error).message);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== newTodoItem.id));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      gsap.fromTo('.modal', 
        { opacity: 0, y: 20, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.3 }
      );
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <span className="mr-2">📝</span> Todo App
            </h1>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">My Tasks</h2>
              <button 
                onClick={toggleModal}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <FiPlus className="mr-2" />
                Add Task
              </button>
            </div>

            {todos.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-gray-400 mb-4">📭</div>
                <p className="text-gray-500">No tasks yet. Add your first task!</p>
              </div>
            ) : (
              <TodoList todos={todos} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        toggleModal={toggleModal} 
        newTodo={newTodo} 
        setNewTodo={setNewTodo} 
        dueDate={dueDate} 
        setDueDate={setDueDate} 
        category={category} 
        setCategory={setCategory} 
        handleAddTodo={handleAddTodo} 
      />
    </div>
  );
};

export default TodoApp;