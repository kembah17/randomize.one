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
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="var(--color-primary)"/>
              <circle cx="12" cy="12" r="2.5" fill="white"/>
              <circle cx="24" cy="12" r="2.5" fill="white"/>
              <circle cx="18" cy="18" r="2.5" fill="white"/>
              <circle cx="12" cy="24" r="2.5" fill="white"/>
              <circle cx="24" cy="24" r="2.5" fill="white"/>
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>randomize<span style={{ color: 'var(--color-text-heading)' }}>.one</span></span>
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
