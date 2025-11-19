import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface SignupScreenProps {
  onSignup: (name: string) => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ onSignup }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSignup(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center mb-8">
            <div className="h-12 w-12 bg-zinc-900 dark:bg-zinc-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-zinc-200 dark:shadow-none">
              <span className="text-white dark:text-zinc-900 font-bold text-2xl">L</span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Welcome to Lynx</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              A minimalist space to collect, discuss, and track the links that matter.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Display Name
              </label>
              <input
                id="name"
                type="text"
                autoFocus
                placeholder="e.g. Jordan Lee"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base gap-2" 
              disabled={!name.trim()}
            >
              Get Started
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              By joining, you agree to share your curated links with the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};