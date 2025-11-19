import React from 'react';
import { Home, TrendingUp, Zap, Settings, Hash, BookMarked, Sparkles } from 'lucide-react';
import { cn } from '../utils';
import { Button } from './ui/Button';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', active: true },
  { icon: TrendingUp, label: 'Popular' },
  { icon: Zap, label: 'Newest' },
  { icon: BookMarked, label: 'Saved' },
];

interface SidebarProps {
  onSettingsClick: () => void;
  topics: string[];
  selectedTopic: string | null;
  onSelectTopic: (topic: string | null) => void;
  isPro: boolean;
  onOpenSubscription: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onSettingsClick, 
  topics, 
  selectedTopic, 
  onSelectTopic,
  isPro,
  onOpenSubscription
}) => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-screen fixed left-0 top-0 z-30 transition-colors duration-300">
      <div className="p-6 flex items-center gap-2">
        <div className="h-8 w-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center relative overflow-hidden">
            <span className="text-white dark:text-zinc-900 font-bold text-lg relative z-10">L</span>
            {isPro && <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 opacity-80" />}
        </div>
        <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">Lynx</span>
        {isPro && <span className="px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/30 text-[10px] font-bold text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-700">PRO</span>}
      </div>

      <div className="px-4 space-y-1">
        <div className="px-2 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Feeds</div>
        
        <button
          onClick={() => onSelectTopic(null)}
          className={cn(
            "flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
            !selectedTopic
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" 
              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          <Home size={18} strokeWidth={2} />
          Home
        </button>
        
        {/* Static Nav Items placeholder (logic can be expanded later) */}
        {NAV_ITEMS.slice(1).map((item) => (
          <button
            key={item.label}
            className="flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            <item.icon size={18} strokeWidth={2} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 px-4 space-y-1 overflow-y-auto">
        <div className="px-2 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Topics</div>
        {topics.length === 0 ? (
          <div className="px-3 py-2 text-sm text-zinc-400 italic">No topics yet</div>
        ) : (
          topics.map((topic) => (
            <button
              key={topic}
              onClick={() => onSelectTopic(topic)}
              className={cn(
                "flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                selectedTopic === topic
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-medium"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <Hash size={16} className={selectedTopic === topic ? "text-violet-500" : "text-zinc-400 dark:text-zinc-500"} />
              {topic}
            </button>
          ))
        )}
      </div>

      <div className="mt-auto p-4 space-y-2">
        {!isPro && (
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-800/50 p-4 rounded-xl border border-violet-100 dark:border-zinc-700 mb-2">
            <div className="flex items-center gap-2 mb-2 text-violet-700 dark:text-violet-400 font-bold text-sm">
              <Sparkles size={14} />
              Upgrade to Pro
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Unlock analytics and unlimited history.</p>
            <Button size="sm" variant="secondary" className="w-full h-8 text-xs" onClick={onOpenSubscription}>
              Upgrade
            </Button>
          </div>
        )}
        
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-2">
            <button 
            onClick={onSettingsClick}
            className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
            <Settings size={18} />
            Settings
            </button>
        </div>
      </div>
    </aside>
  );
};