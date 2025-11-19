import React, { useState } from 'react';
import { Comment } from '../types';
import { Button } from './ui/Button';
import { formatRelativeTime } from '../utils';
import { MessageCircle, CornerDownRight } from 'lucide-react';

interface CommentProps {
  comment: Comment;
  onReply: (text: string, parentId: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(replyText, comment.id);
      setReplyText('');
      setIsReplying(false);
    }
  };

  return (
    <div className="group">
      <div className="flex gap-3">
        <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full border border-zinc-100 dark:border-zinc-800 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{comment.author.name}</span>
            <span className="text-xs text-zinc-400">{formatRelativeTime(comment.timestamp)}</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{comment.text}</p>
          
          {/* Reply Button */}
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="text-xs font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 mt-1 transition-colors"
          >
            <MessageCircle size={12} />
            Reply
          </button>

          {/* Reply Input */}
          {isReplying && (
            <form onSubmit={handleSubmitReply} className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="relative flex-1">
                <CornerDownRight className="absolute left-3 top-2.5 text-zinc-400" size={14} />
                <input
                  type="text"
                  autoFocus
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.author.name}...`}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>
              <Button type="submit" size="sm" disabled={!replyText.trim()}>Reply</Button>
            </form>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-4 pl-4 border-l-2 border-zinc-100 dark:border-zinc-800 space-y-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string, parentId?: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text);
      setText('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">Discussion ({comments.length})</h3>
      
      {/* Main Input */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
        <Button type="submit" size="sm" disabled={!text.trim()}>
          Post
        </Button>
      </form>

      {/* Comment List */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-sm text-zinc-400 italic">No comments yet. Be the first to share your thoughts.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              onReply={(text, parentId) => onAddComment(text, parentId)} 
            />
          ))
        )}
      </div>
    </div>
  );
};