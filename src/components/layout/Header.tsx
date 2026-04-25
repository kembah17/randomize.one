'use client';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';

const tools = [
  { name: 'Number Generator', href: '/random-number-generator' },
  { name: 'String Generator', href: '/random-string-generator' },
  { name: 'Coin Flip', href: '/coin-flip' },
  { name: 'Dice Roller', href: '/dice-roller' },
  { name: 'Color Generator', href: '/random-color-generator' },
  { name: 'Name Picker', href: '/random-name-picker' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">?</text>
            </svg>
            RandomGen
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-3 py-2 text-sm font-semibold text-text-light hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-light hover:text-primary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border mt-2 pt-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-text-light hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
