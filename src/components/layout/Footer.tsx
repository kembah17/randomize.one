import Link from 'next/link';

const tools = [
  { name: 'Random Number Generator', href: '/random-number-generator' },
  { name: 'Random String Generator', href: '/random-string-generator' },
  { name: 'Coin Flip Simulator', href: '/coin-flip' },
  { name: 'Dice Roller', href: '/dice-roller' },
  { name: 'Random Color Generator', href: '/random-color-generator' },
  { name: 'Random Name Picker', href: '/random-name-picker' },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg text-text mb-3">RandomGenerator.one</h3>
            <p className="text-text-light text-sm leading-relaxed">
              Free online random generator tools. All tools run entirely in your browser &mdash; no data is ever sent to a server. Fast, private, and secure.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-text mb-3">Tools</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-text-light hover:text-primary text-sm transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-text mb-3">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-text-light hover:text-primary text-sm transition-colors">About</Link></li>
              <li><Link href="/privacy" className="text-text-light hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-text-muted text-sm">
          &copy; {new Date().getFullYear()} RandomGenerator.one. All rights reserved. All processing happens in your browser.
        </div>
      </div>
    </footer>
  );
}
