import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { categories, sections, getCompletionPercent, getCategoryPercent } from '../data/rocketRacingData';
import { ChevronLeft, Download, Upload, Copy, Check, RotateCcw } from 'lucide-react';

interface StatsPageProps {
  onBack: () => void;
}

export default function StatsPage({ onBack }: StatsPageProps) {
  const { completedIds, exportCode, importCode, resetAll } = useProgress();
  const [importInput, setImportInput] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const total = categories.reduce((s, c) => s + c.items.length, 0);
  const percent = getCompletionPercent(completedIds);
  const completed = completedIds.size;

  const handleCopy = () => {
    const code = exportCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    const ok = importCode(importInput.trim());
    setImportStatus(ok ? 'success' : 'error');
    if (ok) setImportInput('');
    setTimeout(() => setImportStatus('idle'), 3000);
  };

  const handleReset = () => {
    resetAll();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-neutral-800 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Statistics & Backup</h1>
      </div>

      {/* Overall Stats */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Overall Progress</h2>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400">{percent}%</div>
            <div className="text-xs text-neutral-500">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{completed}</div>
            <div className="text-xs text-neutral-500">Checked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-400">{total - completed}</div>
            <div className="text-xs text-neutral-500">Remaining</div>
          </div>
          <div className="flex-1">
            <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Section Breakdown</h2>
        <div className="space-y-3">
          {sections.map((section) => {
            const sectionCats = categories.filter((c) => section.categories.includes(c.id));
            const sectionItems = sectionCats.flatMap((c) => c.items);
            const sectionCompleted = sectionItems.filter((i) => completedIds.has(i.id)).length;
            const sectionPercent = sectionItems.length > 0 ? Math.round((sectionCompleted / sectionItems.length) * 100) : 0;
            return (
              <div key={section.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-300">{section.title}</span>
                  <span className="text-xs text-neutral-500">
                    {sectionCompleted}/{sectionItems.length}
                  </span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500/60 rounded-full transition-all"
                    style={{ width: `${sectionPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Category Breakdown</h2>
        <div className="space-y-3">
          {categories.map((cat) => {
            const catPercent = getCategoryPercent(cat, completedIds);
            const catCompleted = cat.items.filter((i) => completedIds.has(i.id)).length;
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-300">{cat.title}</span>
                  <span className="text-xs text-neutral-500">
                    {catCompleted}/{cat.items.length}
                  </span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${catPercent}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backup / Export */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Backup & Restore</h2>

        {/* Export */}
        <div>
          <label className="text-xs text-neutral-500 mb-2 block">Export Code (copy and save)</label>
          <div className="flex gap-2">
            <input
              readOnly
              value={exportCode()}
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-400 font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Import */}
        <div>
          <label className="text-xs text-neutral-500 mb-2 block">Import Code (paste saved code)</label>
          <div className="flex gap-2">
            <input
              value={importInput}
              onChange={(e) => setImportInput(e.target.value)}
              placeholder="Paste your RRSAVE:... code here"
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600"
            />
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
          </div>
          {importStatus === 'success' && (
            <p className="text-xs text-emerald-400 mt-1">Progress restored successfully!</p>
          )}
          {importStatus === 'error' && (
            <p className="text-xs text-red-400 mt-1">Invalid code. Make sure it starts with RRSAVE:</p>
          )}
        </div>
      </div>

      {/* Reset */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Danger Zone</h2>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Progress
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-red-400">Are you sure? This will erase ALL progress. Cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
