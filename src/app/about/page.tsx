import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Randomize.one',
  description: 'Learn about Randomize.one, our mission to provide free, private, and secure randomize tools that run entirely in your browser.',
  alternates: { canonical: 'https://randomize.one/about' },
  openGraph: {
    title: 'About — Randomize.one',
    description: 'Learn about Randomize.one and our mission to provide free, private randomize tools.',
    url: 'https://randomize.one/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-6">About Randomize.one</h1>

      <div className="space-y-8">
        <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text mb-3">Our Mission</h2>
          <p className="text-text-light leading-relaxed">
            Randomize.one was created with a simple mission: to provide the best free randomize tools on the internet. We believe that everyone should have access to high-quality, cryptographically secure random generation without compromising their privacy, paying subscription fees, or dealing with intrusive advertisements that slow down the experience.
          </p>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text mb-3">What We Offer</h2>
          <p className="text-text-light leading-relaxed mb-4">
            Our suite of randomize tools covers the most common randomization needs:
          </p>
          <ul className="space-y-2 text-text-light">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Random Number Generator</strong> — Generate integers or decimals within any range with options for bulk generation, no duplicates, and sorting.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Random String Generator</strong> — Create secure random strings for passwords, tokens, and identifiers with customizable character sets and strength indicators.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Coin Flip Simulator</strong> — Flip virtual coins with animated visuals and real-time statistics tracking for probability experiments and decision making.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Dice Roller</strong> — Roll polyhedral dice with custom notation support, visual animations, and comprehensive statistics for tabletop gaming.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Random Color Generator</strong> — Generate random colors in HEX, RGB, and HSL with palette creation using complementary, analogous, and triadic harmonies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Random Name Picker</strong> — Pick random winners from any list with animated selection, perfect for raffles, giveaways, and classroom activities.</span>
            </li>
          </ul>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text mb-3">Privacy First</h2>
          <p className="text-text-light leading-relaxed">
            Privacy is not just a feature — it is the foundation of everything we build. Every tool on Randomize.one runs entirely in your browser using client-side JavaScript. No data is ever sent to our servers. No results are logged. No personal information is collected. We do not use tracking cookies, fingerprinting, or any other surveillance technology. When you close your browser tab, all data is gone forever. Read our full <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for more details.
          </p>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text mb-3">Technology</h2>
          <p className="text-text-light leading-relaxed mb-4">
            Our tools are built with modern web technologies for maximum performance and reliability:
          </p>
          <ul className="space-y-2 text-text-light">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Web Crypto API</strong> — All randomization uses <code className="bg-page px-1.5 py-0.5 rounded text-sm font-mono text-text">crypto.getRandomValues()</code> for cryptographically secure random number generation, far superior to <code className="bg-page px-1.5 py-0.5 rounded text-sm font-mono text-text">Math.random()</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Next.js</strong> — Static site generation for instant page loads and optimal SEO performance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Client-Side Processing</strong> — Zero server dependencies means zero latency, zero data transmission, and zero privacy concerns.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">*</span>
              <span><strong className="text-text">Responsive Design</strong> — Every tool works perfectly on desktop, tablet, and mobile devices with an adaptive layout.</span>
            </li>
          </ul>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text mb-3">Contact</h2>
          <p className="text-text-light leading-relaxed">
            Have feedback, suggestions, or found a bug? We would love to hear from you. Reach out to us at <span className="text-primary">hello@randomize.one</span> and we will get back to you as soon as possible.
          </p>
        </section>
      </div>
    </div>
  );
}
