import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-500 bg-gray-50 border-t border-gray-200 mt-auto">
      <a 
        href="https://wearecroly.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-red-600 hover:underline transition-colors"
      >
        Powered by CROly
      </a>
    </footer>
  );
}
