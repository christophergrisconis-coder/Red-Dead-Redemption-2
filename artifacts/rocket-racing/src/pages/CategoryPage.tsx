import { useProgress } from '../context/ProgressContext';
import { getCategoryById, getCategoryPercent } from '../data/rocketRacingData';
import { ChevronLeft, Check, Circle } from 'lucide-react';

interface CategoryPageProps {
  categoryId: string;
  onBack: () => void;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'bg-emerald-500/20 text-emerald-400',
  Medium: 'bg-amber-500/20 text-amber-400',
  Hard: 'bg-orange-500/20 text-orange-400',
  Expert: 'bg-red-500/20 text-red-400',
};

export default function CategoryPage({ categoryId, onBack }: CategoryPageProps) {
  const { completedIds, toggleItem } = useProgress();
  const category = getCategoryById(categoryId);

  if (!category) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-500">Category not found</p>
        <button onClick={onBack} className="mt-4 text-amber-400 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const percent = getCategoryPercent(category, completedIds);
  const completedCount = category.items.filter((i) => completedIds.has(i.id)).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{category.title}</h1>
          <p className="text-sm text-neutral-400">{category.subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold" style={{ color: category.color }}>{percent}%</div>
          <div className="text-xs text-neutral-500">{completedCount}/{category.items.length}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: category.color }}
        />
      </div>

      {/* Items */}
      <div className="space-y-2">
        {category.items.map((item) => {
          const isDone = completedIds.has(item.id);
          return (
            <div
              key={item.id}
              className={`bg-neutral-900 border rounded-xl p-4 transition-all duration-200 ${
                isDone ? 'border-neutral-700 opacity-60' : 'border-neutral-800 hover:border-neutral-600'
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-semibold ${isDone ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                      {item.title}
                    </h3>
                    {item.difficulty && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[item.difficulty]}`}>
                        {item.difficulty}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${isDone ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {item.description}
                  </p>
                  {item.tip && (
                    <p className="text-xs text-amber-500/70 mt-2 italic">
                      Tip: {item.tip}
                    </p>
                  )}
                  {item.reward && (
                    <p className="text-xs text-emerald-500/70 mt-1">
                      Reward: {item.reward}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
