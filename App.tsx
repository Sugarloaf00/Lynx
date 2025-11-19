import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { LinkCard } from './components/LinkCard';
import { AnalyticsChart } from './components/AnalyticsChart';
import { LinkDetailModal } from './components/LinkDetailModal';
import { SettingsModal } from './components/SettingsModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { SignupScreen } from './components/SignupScreen';
import { Button } from './components/ui/Button';
import { Plus, Search, Activity, Link as LinkIcon, Sun, Moon, Inbox, User as UserIcon, Lock } from 'lucide-react';
import { LinkItem, User, Comment, ChartDataPoint } from './types';
import { getDomainFromUrl } from './utils';

function App() {
  // User State
  const [user, setUser] = useState<User | null>(null);

  // App State
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  
  // Form State
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkTopic, setNewLinkTopic] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Filter State
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Resizable Sidebar State
  const [sidebarWidth, setSidebarWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) 
        ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Resize Logic
  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const newWidth = window.innerWidth - mouseMoveEvent.clientX;
        if (newWidth > 50 && newWidth < 600) {
          setSidebarWidth(newWidth);
        } else if (newWidth <= 50) {
          setSidebarWidth(0); // Snap to closed
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // Derived Data
  const uniqueTopics = useMemo(() => {
    const topics = links.map(link => link.topic).filter(Boolean);
    return Array.from(new Set(topics)).sort();
  }, [links]);

  const filteredLinks = useMemo(() => {
    if (!selectedTopic) return links;
    return links.filter(link => link.topic === selectedTopic);
  }, [links, selectedTopic]);

  // Statistics
  const totalVotes = useMemo(() => links.reduce((acc, link) => acc + link.votes, 0), [links]);
  const totalLinks = links.length;
  
  // Dynamic Chart Data Generation (Last 7 Days)
  const chartData: ChartDataPoint[] = useMemo(() => {
    const days: ChartDataPoint[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Filter links created on this day (ignoring time)
      const linksOnDay = links.filter(l => {
        const linkDate = new Date(l.timestamp);
        return linkDate.getDate() === d.getDate() && 
               linkDate.getMonth() === d.getMonth() && 
               linkDate.getFullYear() === d.getFullYear();
      });
      
      const votesOnDay = linksOnDay.reduce((acc, link) => acc + link.votes, 0);
      
      days.push({
        name: dayName,
        activeUsers: linksOnDay.length, 
        votes: votesOnDay
      });
    }
    return days;
  }, [links]);

  // Signup Handler
  const handleSignup = (name: string) => {
    setUser({
      id: `user-${Date.now()}`,
      name: name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      isPro: false
    });
  };

  // Update Profile Handler
  const handleUpdateUser = (name: string, avatar: string) => {
    if (user) {
      setUser({ ...user, name, avatar });
    }
  };

  const handleUpgrade = () => {
    if(user) {
        setUser({...user, isPro: true});
    }
  };

  // Actions
  const handleVote = (id: string, type: 'up' | 'down') => {
    setLinks(current => current.map(link => {
      if (link.id === id) {
        return { ...link, votes: link.votes + (type === 'up' ? 1 : -1) };
      }
      return link;
    }).sort((a, b) => b.votes - a.votes)); 
  };

  const handleDeleteLink = (id: string) => {
    setLinks(current => current.filter(link => link.id !== id));
    if (selectedLink?.id === id) {
      setIsModalOpen(false);
      setSelectedLink(null);
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkUrl || !newLinkTitle || !newLinkTopic || !user) return;

    const newItem: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newLinkTitle,
      url: newLinkUrl,
      domain: getDomainFromUrl(newLinkUrl),
      votes: 0,
      author: user,
      timestamp: new Date(),
      comments: [],
      tags: [newLinkTopic],
      topic: newLinkTopic
    };

    setLinks([newItem, ...links]);
    setNewLinkUrl('');
    setNewLinkTitle('');
    setNewLinkTopic('');
    setIsAdding(false);
    setSelectedTopic(null); // Reset filter to show new link
  };

  const addReplyToComments = (comments: Comment[], parentId: string, newComment: Comment): Comment[] => {
    return comments.map(c => {
      if (c.id === parentId) {
        return { ...c, replies: [...(c.replies || []), newComment] };
      }
      if (c.replies && c.replies.length > 0) {
        return { ...c, replies: addReplyToComments(c.replies, parentId, newComment) };
      }
      return c;
    });
  };

  const handleAddComment = (linkId: string, text: string, parentId?: string) => {
    if (!user) return;
    
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      author: user,
      timestamp: new Date(),
      replies: []
    };

    setLinks(current => current.map(link => {
      if (link.id === linkId) {
        let updatedComments;
        if (parentId) {
            updatedComments = addReplyToComments(link.comments, parentId, newComment);
        } else {
            updatedComments = [newComment, ...link.comments];
        }
        return { ...link, comments: updatedComments };
      }
      return link;
    }));
    
    if (selectedLink && selectedLink.id === linkId) {
      setSelectedLink(prev => {
        if (!prev) return null;
        let updatedComments;
        if (parentId) {
            updatedComments = addReplyToComments(prev.comments, parentId, newComment);
        } else {
            updatedComments = [newComment, ...prev.comments];
        }
        return { ...prev, comments: updatedComments };
      });
    }
  };

  const openDetail = (link: LinkItem) => {
    setSelectedLink(link);
    setIsModalOpen(true);
  };

  // If not signed in, show Signup Screen
  if (!user) {
    return <SignupScreen onSignup={handleSignup} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
      <Sidebar 
        onSettingsClick={() => setIsSettingsOpen(true)} 
        topics={uniqueTopics}
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
        isPro={user.isPro}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
      />

      {/* Main Layout Grid */}
      <main className="md:pl-64 min-h-screen flex overflow-hidden">
        
        {/* Feed Column */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <div className="p-6 lg:p-10 min-h-screen">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {selectedTopic ? `${selectedTopic} Feed` : 'Daily Feed'}
              </h1>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search links..." 
                    className="pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:text-zinc-200 w-64 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  />
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} variant="secondary" className="gap-2 shadow-violet-200 dark:shadow-none">
                  <Plus size={18} />
                  <span className="hidden sm:inline">Submit Link</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-zinc-500 dark:text-zinc-400">
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </Button>
              </div>
            </div>

            {/* Add Link Form (Collapsible) */}
            {isAdding && (
              <form onSubmit={handleAddLink} className="mb-8 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm animate-in slide-in-from-top-4 duration-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Title</label>
                    <input 
                      autoFocus
                      className="w-full p-2 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md focus:ring-2 focus:ring-violet-500 outline-none dark:text-zinc-100"
                      placeholder="What's interesting?"
                      value={newLinkTitle}
                      onChange={e => setNewLinkTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">URL</label>
                    <input 
                      className="w-full p-2 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md focus:ring-2 focus:ring-violet-500 outline-none dark:text-zinc-100"
                      placeholder="https://..."
                      value={newLinkUrl}
                      onChange={e => setNewLinkUrl(e.target.value)}
                    />
                  </div>
                   <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Topic</label>
                    <input 
                      className="w-full p-2 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md focus:ring-2 focus:ring-violet-500 outline-none dark:text-zinc-100"
                      placeholder="e.g. Technology, Science, Design"
                      value={newLinkTopic}
                      onChange={e => setNewLinkTopic(e.target.value)}
                      list="existing-topics"
                    />
                    <datalist id="existing-topics">
                      {uniqueTopics.map(t => <option key={t} value={t} />)}
                    </datalist>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                    <Button type="submit" disabled={!newLinkTitle || !newLinkUrl || !newLinkTopic}>Add Link</Button>
                  </div>
                </div>
              </form>
            )}

            {/* List */}
            <div className="space-y-4">
              {filteredLinks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-violet-200/50 dark:border-violet-900/30 rounded-xl shadow-[0_0_40px_-5px_rgba(124,58,237,0.2)]">
                  <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                    <Inbox size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">No links found</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mb-6">
                    {selectedTopic 
                      ? `No links found for topic "${selectedTopic}".` 
                      : "The feed is currently empty. Be the first to share something interesting!"}
                  </p>
                  <Button onClick={() => setIsAdding(true)} variant="outline">
                    Submit a link
                  </Button>
                </div>
              ) : (
                filteredLinks.map(link => (
                  <LinkCard 
                    key={link.id} 
                    link={link} 
                    currentUser={user}
                    onVote={handleVote} 
                    onClick={openDetail} 
                    onDelete={handleDeleteLink}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={startResizing}
          className="w-1 hover:w-1.5 bg-transparent hover:bg-violet-500/50 cursor-col-resize flex items-center justify-center transition-all z-20"
        >
          <div className="h-8 w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full opacity-50" />
        </div>

        {/* Right Analytics Column (Resizable) */}
        <div 
          style={{ width: sidebarWidth, opacity: sidebarWidth < 100 ? 0 : 1, overflow: 'hidden' }}
          className="hidden lg:block h-screen bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm border-l border-zinc-200/50 dark:border-zinc-800 transition-[opacity] duration-200"
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="space-y-6 min-w-[300px]"> {/* min-w prevents squishing */}
              
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Weekly Overview</h3>
              </div>

              {/* Chart Card - Gated for Pro */}
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                 <div className="mb-4 flex justify-between items-center">
                   <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wide">Activity (Posts Created)</span>
                   {!user.isPro && <Lock size={12} className="text-zinc-400" />}
                 </div>
                 
                 <