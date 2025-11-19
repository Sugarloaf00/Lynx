import React from 'react';
import { X, ExternalLink, ArrowUp, Clock, Tag } from 'lucide-react';
import { LinkItem } from '../types';
import { CommentSection } from './CommentSection';
import { Button } from './ui/Button';
import { formatRelativeTime } from '../utils';

interface LinkDetailModalProps {
  link: LinkItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (linkId: string, text: string, parentId?: string) => void;
  onVote: (linkId: string, type: 'up' | 'down') => void;
}

export const LinkDetailModal: React.FC<LinkDetailModalProps> = ({ 
  link, 
  isOpen, 
  onClose, 
  onAddComment,
  onVote 
}) => {
  if (!isOpen || !link) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-900/20 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="pr-8">
             <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium">
                {link.domain}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Clock size={12} />
                {formatRelativeTime(link.timestamp)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{link.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-zinc-600 dark:text-zinc-300 mb-6 text-lg leading-relaxed">
            {link.description || "No description provided for this link."}
          </p>
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100 dark:border-zinc-800">
             <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => window.open(link.url, '_blank')}
             >
                <ExternalLink size={16} />
                Read Full Article
             </Button>
             
             <div className="flex items-center gap-1 px-3 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <button 
                    onClick={() => onVote(link.id, 'up')}
                    className="text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                    <ArrowUp size={18} />
                </button>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 min-w-[20px] text-center">{link.votes}</span>
             </div>
          </div>

          <CommentSection 
            comments={link.comments} 
            onAddComment={(text, parentId) => onAddComment(link.id, text, parentId)} 
          />
        </div>
      </div>
    </div>
  );
};