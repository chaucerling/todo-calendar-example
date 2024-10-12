import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import { Todo } from './types';
import { CalendarDays } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (content: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      content,
      date: selectedDate.toISOString().split('T')[0],
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number, content: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, content } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-indigo-800 flex items-center justify-center">
          <CalendarDays className="mr-4 text-indigo-600" size={48} />
          Todo Calendar
        </h1>
      </header>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="transform hover:scale-105 transition-transform duration-300">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            todos={todos}
          />
        </div>
        <div className="transform hover:scale-105 transition-transform duration-300">
          <TodoList
            todos={todos.filter(todo => todo.date === selectedDate.toISOString().split('T')[0])}
            onAddTodo={addTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodo}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;