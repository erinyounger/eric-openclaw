'use client';

import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { TodoFilter } from '@/components/TodoFilter';
import { WeatherWidget } from '@/components/WeatherWidget';
import { useTodo } from '@/hooks/useTodo';

export default function Home() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    activeCount,
    completedCount,
  } = useTodo();

  return (
    <main className="min-h-screen bg-[#0f0f0f] py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#22d3ee] to-[#a78bfa] rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-[#0f0f0f]"
            >
              <path
                fillRule="evenodd"
                d="M7.502 6h.118V5.25A2.25 2.25 0 005.75 3h-1.5a2.25 2.25 0 00-2.25 2.25v.567h5.25a2.25 2.25 0 002.25-2.25v-.567A2.25 2.25 0 008.378 3h-1.5a2.25 2.25 0 00-2.25 2.25v.75a2.25 2.25 0 002.25 2.25h.25zm2.06 2.25h3.618a2.25 2.25 0 012.193 1.244l.574 1.787a2.25 2.25 0 01-.84 2.853l-1.216.547a2.25 2.25 0 01-2.245 0l-1.216-.547a2.25 2.25 0 01-.84-2.853l.574-1.787A2.25 2.25 0 019.56 8.25h-3.618a2.25 2.25 0 00-2.25 2.25v.75a2.25 2.25 0 002.25 2.25h3.618a2.25 2.25 0 002.193-1.244l.574-1.787a2.25 2.25 0 01.84-2.853l1.216-.547a2.25 2.25 0 012.245 0l1.216.547a2.25 2.25 0 01.84 2.853l-.574 1.787A2.25 2.25 0 0012.378 11.25H9.56z"
                clipRule="evenodd"
              />
              <path d="M11.578 16.75a.75.75 0 00-1.448 0l-.192.481a.75.75 0 01-1.448.072l-.574-1.783a.75.75 0 00-1.395-.072l-.574 1.783a.75.75 0 01-1.448-.072l-.192-.481a.75.75 0 00-1.448 0l-.192.481a.75.75 0 01-1.448.072l.574-1.783a.75.75 0 00-1.395-.072l-.574 1.783a.75.75 0 01-1.448.072l-.192-.481a.75.75 0 00-1.448 0l-.192.481a.75.75 0 01-1.448.072l-.574-1.783a.75.75 0 00-1.395-.072l-.574 1.783a.75.75 0 01-1.448.072l-.192-.481a.75.75 0 00-1.448 0l-.192.481a.75.75 0 01-1.448.072l.574-1.783a.75.75 0 00-1.395-.072l-.574 1.783a.75.75 0 01-1.448.072L3.75 14.25l-.192.481a.75.75 0 00.072 1.448l1.783-.574a.75.75 0 00.072-1.448l-.481-.192a.75.75 0 010-1.448l.481-.192a.75.75 0 00-.072-1.448l-1.783.574a.75.75 0 01.072-1.448l.192-.481a.75.75 0 00-1.448-.072l.574 1.783a.75.75 0 01-.072 1.448l-.481.192a.75.75 0 000 1.448l.481.192a.75.75 0 00.072-1.448l-1.783-.574a.75.75 0 01-.072-1.448l.192-.481a.75.75 0 001.448-.072l-.574-1.783a.75.75 0 01.072-1.448l1.783.574a.75.75 0 001.448-.072l-.192-.481a.75.75 0 011.448-.072l.574 1.783a.75.75 0 01-.072 1.448l.481.192a.75.75 0 000 1.448l-.481.192a.75.75 0 00-.072 1.448l1.783-.574a.75.75 0 01.072 1.448l-.192.481a.75.75 0 001.448.072l-.574-1.783a.75.75 0 01.072-1.448l1.783.574a.75.75 0 001.448-.072l-.192-.481a.75.75 0 011.448-.072l.574 1.783a.75.75 0 01-.072 1.448l.192.481a.75.75 0 000 1.448l-.192.481a.75.75 0 01-1.448.072l.574-1.783a.75.75 0 00.072-1.448l-.481-.192a.75.75 0 010-1.448l.481-.192a.75.75 0 00-.072-1.448l-1.783.574a.75.75 0 01-.072-1.448l.192-.481a.75.75 0 00-1.448-.072l.574 1.783a.75.75 0 01-.072 1.448l.481.192a.75.75 0 000-1.448l-.481-.192a.75.75 0 00.072-1.448l-1.783-.574a.75.75 0 01.072-1.448l.192.481zM12 17.75a.75.75 0 00.75-.75v-1.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 00.75.75h1.5z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#fafafa]">EricTodo</h1>
          <p className="text-[#71717a] mt-1">简洁优雅的待办事项</p>
        </header>

        {/* Card */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg shadow-black/30">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Input */}
          <div className="mb-6">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filter */}
          <div className="mb-4">
            <TodoFilter
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </div>

          {/* List */}
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-sm text-[#52525b]">
          <p>数据已自动保存至本地</p>
        </footer>
      </div>
    </main>
  );
}
