import { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import StatsPage from './pages/StatsPage';
import SearchPage from './pages/SearchPage';
import { Trophy, Map, Zap, Star, Target, Flag, Eye, TrendingUp, Palette, LayoutGrid, Search, BarChart3 } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5" />,
  Map: <Map className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Flag: <Flag className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Car: <Zap className="w-5 h-5" />,
};

export { ICON_MAP };

export default function App() {
  const [page, setPage] = useState<'home' | 'category' | 'stats' | 'search'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigateToCategory = (id: string) => {
    setSelectedCategory(id);
    setPage('category');
  };

  const navigateHome = () => {
    setPage('home');
    setSelectedCategory(null);
  };

  const navigateStats = () => setPage('stats');
  const navigateSearch = () => setPage('search');

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        {/* Navigation Header */}
        <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <button
              onClick={navigateHome}
              className="flex items-center gap-2 font-bold text-lg tracking-tight"
            >
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Rocket Racing Guide
              </span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={navigateSearch}
                className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={navigateStats}
                className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                title="Stats"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          {page === 'home' && (
            <HomePage onNavigateCategory={navigateToCategory} />
          )}
          {page === 'category' && selectedCategory && (
            <CategoryPage
              categoryId={selectedCategory}
              onBack={navigateHome}
            />
          )}
          {page === 'stats' && (
            <StatsPage onBack={navigateHome} />
          )}
          {page === 'search' && (
            <SearchPage
              onNavigateCategory={navigateToCategory}
              onBack={navigateHome}
            />
          )}
        </main>
      </div>
    </ProgressProvider>
  );
}
