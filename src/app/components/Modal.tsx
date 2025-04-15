import React from 'react';
import { FiX, FiCalendar } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  newTodo: string;
  setNewTodo: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  handleAddTodo: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, newTodo, setNewTodo, dueDate, setDueDate, category, setCategory, handleAddTodo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-4 z-50">
      <div className="modal bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New Task</h2>
          <button 
            onClick={toggleModal}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Task Title*</label>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Due Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-black" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Priority</label>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setCategory('high')}
                className={`py-2 rounded-lg transition-all ${
                  category === 'high' 
                    ? 'bg-red-500 text-white shadow-md' 
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                High
              </button>
              <button 
                onClick={() => setCategory('medium')}
                className={`py-2 rounded-lg transition-all ${
                  category === 'medium' 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                Medium
              </button>
              <button 
                onClick={() => setCategory('low')}
                className={`py-2 rounded-lg transition-all ${
                  category === 'low' 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                Low
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={toggleModal}
              className="px-4 py-2 border text-gray-800 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddTodo}
              disabled={!newTodo.trim()}
              className={`px-4 py-2 rounded-lg text-white transition-all ${
                !newTodo.trim() 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
