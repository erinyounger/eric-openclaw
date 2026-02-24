'use client';

import { FilterType } from '@/types/todo';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
];

export function TodoFilter({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
}: TodoFilterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1 bg-[#27272a] p-1 rounded-lg">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-[#22d3ee] text-[#0f0f0f]'
                : 'text-[#a1a1aa] hover:text-[#fafafa]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="text-sm text-[#71717a]">
        {activeCount > 0 && (
          <span className="text-[#22d3ee]">{activeCount} 个待完成</span>
        )}
        {completedCount > 0 && activeCount === 0 && (
          <span className="text-[#4ade80]">全部完成! 🎉</span>
        )}
      </div>
    </div>
  );
}
