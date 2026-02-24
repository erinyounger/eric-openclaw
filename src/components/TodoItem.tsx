'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-[#1a1a1a] rounded-xl border border-[#27272a] group transition-all duration-300 animate-fade-in ${
        isDeleting ? 'animate-fade-out' : ''
      } ${todo.completed ? 'opacity-60' : ''}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="cursor-pointer"
      />
      <span
        className={`flex-1 text-[15px] transition-all duration-200 ${
          todo.completed
            ? 'line-through text-[#71717a]'
            : 'text-[#fafafa]'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-[#71717a] hover:text-[#ef4444] hover:bg-[#27272a] rounded-lg transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
