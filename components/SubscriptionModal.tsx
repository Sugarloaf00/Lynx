import React from 'react';
import { X, Check, Zap, Shield, BarChart3 } from 'lucide-react';
import { Button } from './ui/Button';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ 
  isOpen, 
  onClose,
  onUpgrade
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-violet-500/30 shadow-[0_0_50px_-10px_rgba(124,58,237,0.3)]">
        
        {/* Header */}
        <div className="relative bg-zinc-900 p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-700 opacity-90" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1 text-white/70 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl backdrop-blur-md mb-4 shadow-lg border border-white/20">
               <Zap className="text-white" size={32} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Lynx Pro</h2>
            <p className="text-violet-100 text-sm">Unlock the full power of aggregation.</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">$9</span>
              <span className="text-zinc-500 dark:text-zinc-400">/month</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Cancel anytime. No hidden fees.</p>
          </div>

          <div className="space-y-4">
            {[
              { icon: BarChart3, text: "Advanced Analytics Dashboard" },
              { icon: Shield, text: "Verified Profile Badge" },
              { icon: Zap, text: "Unlimited Link History" },
              { icon: Check, text: "Priority Support" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <div className="p-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                  <item.icon size={14} />
                </div>
                {item.text}
              </div>
            ))}
          </div>

          <Button 
            onClick={() => {
              onUpgrade();
              onClose();
            }} 
            className="w-full h-12 text-base shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-shadow"
            variant="secondary"
          >
            Upgrade Now
          </Button>
          
          <p className="text-center text-[10px] text-zinc-400 uppercase tracking-wider">
            Secure payment simulation
          </p>
        </div>
      </div>
    </div>
  );
};