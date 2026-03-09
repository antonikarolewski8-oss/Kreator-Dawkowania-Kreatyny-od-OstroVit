import React, { useState } from 'react';
import { Code2, Copy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function EmbedButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  const dimensions = {
    small: { w: 400, h: 400 },
    medium: { w: 600, h: 600 },
    large: { w: 800, h: 800 },
  };

  const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const embedCode = `<div style="max-width: ${dimensions[size].w}px; margin: 0 auto;">
  <iframe 
    src="${appUrl}?embed=true" 
    width="${dimensions[size].w}" 
    height="${dimensions[size].h}" 
    frameborder="0" 
    style="border: 1px solid #e5e7eb; border-radius: 16px; display: block; overflow: hidden;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
    loading="lazy">
  </iframe>
  <div style="text-align: center; margin-top: 12px; font-size: 14px;">
    <a href="https://wearecroly.com" target="_blank" rel="noopener" style="color: #6b7280; text-decoration: none;">Powered by CROly</a>
  </div>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 group"
        aria-label="Embed Code"
      >
        <Code2 className="w-6 h-6" />
        <span className="hidden group-hover:inline-block font-medium pr-2 whitespace-nowrap overflow-hidden transition-all">
          Osadź na stronie
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Osadź kalkulator</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Wybierz rozmiar:</label>
                  <div className="flex gap-3">
                    {(['small', 'medium', 'large'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${
                          size === s 
                            ? 'border-red-600 bg-red-50 text-red-700' 
                            : 'border-gray-200 text-gray-600 hover:border-red-200'
                        }`}
                      >
                        {s === 'small' ? 'Mały (400px)' : s === 'medium' ? 'Średni (600px)' : 'Duży (800px)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-800 transition-colors"
                    >
                      {copied ? <span className="text-green-400">Skopiowano!</span> : <><Copy className="w-4 h-4" /> Kopiuj kod</>}
                    </button>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-xl text-sm text-gray-800 overflow-x-auto border border-gray-200 font-mono pt-12">
                    <code>{embedCode}</code>
                  </pre>
                </div>
                
                <p className="text-xs text-gray-500">
                  Skopiuj powyższy kod HTML i wklej go na swojej stronie lub blogu. Kalkulator automatycznie dopasuje się do szerokości kontenera, zachowując proporcje kwadratu.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
