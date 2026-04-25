'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdSlot from '../components/ui/AdSlot';
import WebSiteSchema from '../components/seo/WebSiteSchema';

const tools = [
  {
    name: 'Random Number Generator',
    href: '/random-number-generator',
    description: 'Generate cryptographically secure random numbers within any range. Supports integers, decimals, and bulk generation.',
    icon: '🎲',
  },
  {
    name: 'Random String Generator',
    href: '/random-string-generator',
    description: 'Create random strings with custom character sets. Perfect for passwords, tokens, and unique identifiers.',
    icon: '🔤',
  },
  {
    name: 'Coin Flip Simulator',
    href: '/coin-flip',
    description: 'Flip virtual coins with animated visuals and real-time statistics tracking for heads and tails.',
    icon: '🪙',
  },
  {
    name: 'Dice Roller',
    href: '/dice-roller',
    description: 'Roll dice with multiple sides and custom notation. Supports d4, d6, d8, d10, d12, d20 and modifiers.',
    icon: '🎯',
  },
  {
    name: 'Random Color Generator',
    href: '/random-color-generator',
    description: 'Generate random colors in HEX, RGB, and HSL. Create complementary, analogous, and triadic palettes.',
    icon: '🎨',
  },
  {
    name: 'Random Name Picker',
    href: '/random-name-picker',
    description: 'Pick random winners from a list of names with animated selection. Great for raffles and giveaways.',
    icon: '👤',
  },
];

export default function HomePage() {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WebSiteSchema />
      <AdSlot slot="leaderboard" />

      <section className="text-center py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>
          Free Randomize Tools
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          Generate random numbers, strings, colors, flip coins, roll dice, and pick random names.
          All tools run entirely in your browser — fast, private, and secure.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/random-number-generator"
            className="px-6 py-3 font-semibold rounded-lg transition-all duration-200"
            style={{ backgroundColor: 'var(--color-brand)', color: '#FFFFFF' }}
          >
            Get Started
          </Link>
          <a
            href="#tools"
            className="px-6 py-3 font-semibold rounded-lg transition-all duration-200"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-brand)', border: '2px solid var(--color-brand)' }}
          >
            Browse Tools
          </a>
        </div>
      </section>

      <section id="tools" className="py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-text-heading)' }}>All Randomize Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block rounded-xl p-6 transition-all duration-200 no-underline"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: hoveredHref === tool.href ? '2px solid var(--color-brand)' : '2px solid var(--color-border)',
                boxShadow: hoveredHref === tool.href ? 'var(--shadow-lg)' : 'var(--shadow-card)',
                transform: hoveredHref === tool.href ? 'translateY(-2px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredHref(tool.href)}
              onMouseLeave={() => setHoveredHref(null)}
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold mb-2 transition-colors" style={{ color: hoveredHref === tool.href ? 'var(--color-brand)' : 'var(--color-text-heading)' }}>
                {tool.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="mid-content" />

      <section className="py-12">
        <div className="rounded-xl p-8" style={{ backgroundColor: 'var(--color-bg-card)', border: '2px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>About Our Randomize Tools</h2>
          <div className="space-y-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            <p>
              Randomize.one provides a comprehensive suite of free online randomize tools designed for everyday use. Whether you need to generate random numbers for statistical sampling, create secure random strings for passwords, flip a coin to make a quick decision, roll dice for your tabletop game, generate random colors for your design project, or pick a random name for a raffle — we have you covered.
            </p>
            <p>
              All of our tools use the Web Crypto API (<code style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontFamily: 'monospace' }}>crypto.getRandomValues()</code>) to generate cryptographically secure random values. Unlike many randomize websites that rely on <code style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontFamily: 'monospace' }}>Math.random()</code>, which produces pseudo-random numbers that can be predicted, our tools leverage the operating system&apos;s entropy source to produce truly unpredictable results. This makes our generators suitable for security-sensitive applications like password generation and token creation.
            </p>
            <p>
              Privacy is at the core of everything we build. Every tool on Randomize.one runs entirely in your browser. No data is ever sent to our servers, no results are logged, and no personal information is collected. Your generated numbers, strings, colors, and names stay on your device. We believe that random generation tools should be fast, free, and completely private.
            </p>
            <p>
              Our tools are designed to be intuitive and powerful. Each generator offers customizable options so you can tailor the output to your exact needs. Generate bulk results, copy them with a single click, track your history, and reset whenever you want. Whether you are a developer testing edge cases, a teacher running a classroom activity, a game master rolling for initiative, or a designer exploring color palettes, Randomize.one is your go-to resource for all things random.
            </p>
          </div>
        </div>
      </section>

      <AdSlot slot="footer" />
    </div>
  );
}
