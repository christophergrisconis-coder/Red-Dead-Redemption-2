import { useState, useMemo } from 'react';
import { categories, getItemById } from '../data/rocketRacingData';
import { useProgress } from '../context/ProgressContext';
import { ChevronLeft, Search, Check, Circle } from 'lucide-react';

interface SearchPageProps {
  onNavigateCategory: (id: string) => void;
  onBack: () => void;
}

export default function SearchPage({ onNavigateCategory, onBack }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const { completedIds, toggleItem } = useProgress();

  const allItems = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.items.map((item) => ({ ...item, categoryTitle: cat.title, categoryId: cat.id }))
    );
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryTitle.toLowerCase().includes(q) ||
        (item.tip && item.tip.toLowerCase().includes(q))
    );
  }, [query, allItems]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-neutral-800 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Search</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vehicles, tracks, achievements, tips..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
        />
      </div>

      {query.trim() && (
        <p className="text-xs text-neutral-500">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      )}

      <div className="space-y-2">
        {results.map((item) => {
          const isDone = completedIds.has(item.id);
          return (
            <div
              key={item.id}
              className={`bg-neutral-900 border rounded-xl p-4 transition-all ${
                isDone ? 'border-neutral-700 opacity-60' : 'border-neutral-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    isDone
                      ? 'bg-amber-500 border-amber-500 text-neutral-950'
                      : 'border-neutral-600 hover:border-amber-500'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3 text-neutral-600" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${isDone ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                      {item.title}
                    </h3>
                    <button
                      onClick={() => onNavigateCategory(item.categoryId)}
                      className="text-xs text-amber-500/60 hover:text-amber-400 transition-colors"
                    >
                      {item.categoryTitle}
                    </button>
                  </div>
                  <p className={`text-sm mt-1 ${isDone ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {item.description}
                  </p>
                  {item.tip && (
                    <p className="text-xs text-amber-500/70 mt-1 italic">
                      Tip: {item.tip}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {query.trim() && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No results found for "{query}"</p>
          <p className="text-xs text-neutral-600 mt-1">Try searching for vehicles, tracks, or achievements</p>
        </div>
      )}
    </div>
  );
}
