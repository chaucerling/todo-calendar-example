import React, { useState } from 'react';
import { Todo } from '../types';
import { Trash2, Edit, Save, Plus, Check, X } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (content: string) => void;
  onUpdateTodo: (id: number, content: string) => void;
  onDeleteTodo: (id: number) => void;
  onToggleTodo: (id: number) => void;
  selectedDate: Date;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onAddTodo, onUpdateTodo, onDeleteTodo, onToggleTodo, selectedDate }) => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo);
      setNewTodo('');
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      onUpdateTodo(editingId, editContent);
      setEditingId(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl">
      <h2 className="text-4xl font-bold mb-8 text-indigo-800 border-b-2 border-indigo-200 pb-4">
        Todos for {selectedDate.toLocaleDateString()}
      </h2>
      <div className="mb-8">
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-grow p-4 bg-transparent focus:outline-none"
          />
          <button
            onClick={handleAddTodo}
            className="bg-indigo-600 text-white px-6 py-4 hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center rounded-full"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {todos.map(todo => (
          <div key={todo.id} className={`${todo.completed ? 'bg-green-50' : 'bg-white'} p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group`}>
            <button
              onClick={() => onToggleTodo(todo.id)}
              className={`mr-4 p-2 rounded-full transition-all duration-300 ${todo.completed ? 'bg-green-500 text-white' : 'border-2 border-indigo-300 hover:bg-indigo-100'}`}
            >
              {todo.completed ? <Check size={20} /> : <span className="w-5 h-5 block"></span>}
            </button>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-grow p-2 bg-white border-b-2 border-indigo-300 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                />
                <button
                  onClick={saveEdit}
                  className="ml-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <Save size={20} />
                </button>
              </>
            ) : (
              <>
                <p className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{todo.content}</p>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => startEditing(todo)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors duration-200 flex items-center"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;