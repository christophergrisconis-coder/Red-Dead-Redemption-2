import { useProgress } from '../context/ProgressContext';
import { categories, sections, getCompletionPercent, getCategoryPercent } from '../data/rocketRacingData';
import { ICON_MAP } from '../App';
import { Trophy, Map, Zap, Star, Target, Flag, Eye, TrendingUp, Palette, Car, ChevronRight } from 'lucide-react';

const FALLBACK_ICONS: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5" />,
  Map: <Map className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Flag: <Flag className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
};

function getIcon(iconName: string) {
  return ICON_MAP[iconName] || FALLBACK_ICONS[iconName] || <Zap className="w-5 h-5" />;
}

interface HomePageProps {
  onNavigateCategory: (id: string) => void;
}

export default function HomePage({ onNavigateCategory }: HomePageProps) {
  const { completedIds } = useProgress();
  const percent = getCompletionPercent(completedIds);
  const completed = completedIds.size;

  return (
    <div className="space-y-8">
      {/* Hero / Progress */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 border border-neutral-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Rocket Racing Guide
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Complete reference for PS5 players
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-400">{percent}%</div>
            <div className="text-xs text-neutral-500">{completed} / {categories.reduce((s, c) => s + c.items.length, 0)} items</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Sectioned Categories */}
      {sections.map((section) => {
        const sectionCats = categories.filter((c) => section.categories.includes(c.id));
        return (
          <div key={section.id}>
            <h2 className="text-lg font-semibold text-neutral-300 mb-3 flex items-center gap-2">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sectionCats.map((cat) => {
                const catPercent = getCategoryPercent(cat, completedIds);
                const catCompleted = cat.items.filter((i) => completedIds.has(i.id)).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onNavigateCategory(cat.id)}
                    className="group text-left bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded-xl p-4 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: cat.color + '20', color: cat.color }}
                        >
                          {getIcon(cat.icon)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-xs text-neutral-500">{cat.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                    </div>
                    {/* Category mini progress */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${catPercent}%`, backgroundColor: cat.color }}
                        />
                      </div>
                      <span className="text-xs text-neutral-500 tabular-nums">
                        {catCompleted}/{cat.items.length}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
