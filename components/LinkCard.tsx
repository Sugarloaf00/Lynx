import React from 'react';
import { ArrowUp, MessageSquare, ExternalLink, Clock, Trash2 } from 'lucide-react';
import { LinkItem, User } from '../types';
import { cn, formatRelativeTime } from '../utils';

interface LinkCardProps {
  link: LinkItem;
  currentUser: User | null;
  onVote: (id: string, type: 'up' | 'down') => void;
  onClick: (link: LinkItem) => void;
  onDelete: (id: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, currentUser, onVote, onClick, onDelete }) => {
  const isAuthor = currentUser?.id === link.author.id;

  return (
    <div className="group relative flex gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
      {/* Vote Column */}
      <div className="flex flex-col items-center gap-1 min-w-[40px]">
        <button 
          onClick={(e) => { e.stopPropagation(); onVote(link.id, 'up'); }}
          className="p-1 rounded-full text-zinc-400 dark:text-zinc-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{link.votes}</span>
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onClick(link)}>
        <div className="flex items-baseline justify-between mb-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{link.domain}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <Clock size={12} />
              {formatRelativeTime(link.timestamp)}
            </div>
          </div>
          
          {/* Delete Button (Only visible to author) */}
          {isAuthor && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if(window.confirm('Are you sure you want to delete this post?')) onDelete(link.id); 
              }}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
              title="Delete post"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight mb-2 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
          {link.title}
        </h3>

        {link.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
            {link.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-2">
            <img src={link.author.avatar} alt={link.author.name} className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 object-cover" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{link.author.name}</span>
          </div>

          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors text-xs font-medium px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <MessageSquare size={14} />
            {link.comments.length} comments
          </div>
          
          {link.tags.map(tag => (
            <span key={tag} className="hidden sm:inline-block text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full font-medium border border-zinc-200 dark:border-zinc-700">
              {tag}
            </span>
          ))}

           <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-auto text-zinc-400 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};