import { Fragment } from 'react';
import type { ReactNode } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, title, children, className = '' }: DialogProps) {
  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Overlay com blur */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div 
            className={`relative transform overflow-hidden rounded-2xl bg-white/95 backdrop-blur-lg text-left shadow-2xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg border border-white/20 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="border-b border-gray-100/50 px-6 py-5">
                <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
                  {title}
                </h3>
              </div>
            )}
            
            <div className="px-6 py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}