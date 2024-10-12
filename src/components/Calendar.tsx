import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Todo } from '../types';

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  todos: Todo[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate, todos }) => {
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-14"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const hasTodos = todos.some(todo => todo.date === date.toISOString().split('T')[0]);
      const hasUncompletedTodos = todos.some(todo => todo.date === date.toISOString().split('T')[0] && !todo.completed);
      days.push(
        <div
          key={day}
          className={`h-14 flex items-center justify-center cursor-pointer rounded-full transition-all duration-200 ease-in-out
            ${isSelected ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'hover:bg-indigo-100'}
            ${hasTodos ? 'font-bold' : ''}
            ${hasTodos && !isSelected ? 'text-indigo-600' : ''}`}
          onClick={() => onSelectDate(date)}
        >
          <span className={`${hasTodos && !isSelected ? 'relative' : ''}`}>
            {day}
            {hasUncompletedTodos && !isSelected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </span>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200">
          <ChevronLeft className="text-indigo-600" size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-indigo-800">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200">
          <ChevronRight className="text-indigo-600" size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-indigo-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;