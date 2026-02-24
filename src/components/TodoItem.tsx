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

  const handleShare = () => {
    const text = todo.completed ? `✅ 已完成: ${todo.text}` : `📝 待办: ${todo.text}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
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
      
      {/* 转发按钮 */}
      <button
        onClick={handleShare}
        title="分享到 X"
        className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-[#71717a] hover:text-[#1d9bf0] hover:bg-[#27272a] rounded-lg transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      
      {/* 删除按钮 */}
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
