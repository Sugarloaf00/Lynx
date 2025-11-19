import React, { useState, useRef, useEffect } from 'react';
import { X, Moon, Sun, Camera, User as UserIcon, CreditCard, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { User } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  onUpdateUser: (name: string, avatar: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  theme, 
  toggleTheme,
  user,
  onUpdateUser
}) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens or user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatar(user.avatar);
    }
  }, [user, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (name.trim()) {
      onUpdateUser(name.trim(), avatar);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/20 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-violet-500/60 shadow-[0_0_40px_-5px_rgba(124,58,237,0.5)]">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Settings</h2>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Appearance Section */}
          <section>
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Appearance</h3>
            <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-zinc-800 rounded-md shadow-sm text-zinc-700 dark:text-zinc-300">
                  {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Dark Mode</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Adjust the interface theme</div>
                </div>
              </div>
              <button 
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${theme === 'dark' ? 'bg-violet-600' : 'bg-zinc-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </section>

          {/* Profile Section */}
          <section>
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Profile Settings</h3>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <img 
                  src={avatar} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-zinc-100 dark:border-zinc-700 group-hover:border-violet-500 transition-colors"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none dark:text-zinc-100"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            </div>
          </section>

           {/* Subscription Section */}
          <section>
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Subscription</h3>
            <div className="p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${user?.isPro ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}`}>
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-zinc-900 dark:text-zinc-100">{user?.isPro ? 'Lynx Pro Plan' : 'Free Plan'}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{user?.isPro ? 'Active' : 'Basic features'}</div>
                        </div>
                    </div>
                    {user?.isPro && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                            <Check size={12} /> Paid
                        </span>
                    )}
                </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <Button onClick={handleSave}>Done</Button>
        </div>
      </div>
    </div>
  );
};