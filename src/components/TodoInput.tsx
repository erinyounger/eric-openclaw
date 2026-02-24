'use client';

import { useState, KeyboardEvent } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="添加新任务..."
        className="flex-1 h-12 px-4 bg-[#27272a] border border-[#27272a] rounded-xl text-[#fafafa] placeholder-[#71717a] focus:outline-none focus:border-[#22d3ee] transition-colors"
      />
      <button
        onClick={handleAdd}
        disabled={!text.trim()}
        className="w-12 h-12 flex items-center justify-center bg-[#22d3ee] hover:bg-[#06b6d4] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-[#0f0f0f]"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
