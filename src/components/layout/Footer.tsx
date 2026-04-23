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
    <footer style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }} className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--color-footer-text)' }}>Randomize.one</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-footer-muted)' }}>
              Free online randomize tools. All tools run entirely in your browser &mdash; no data is ever sent to a server. Fast, private, and secure.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--color-footer-text)' }}>Tools</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--color-footer-text)' }}>Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>About</Link></li>
              <li><Link href="/privacy" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 text-center text-sm" style={{ borderTop: '1px solid var(--color-footer-border)', color: 'var(--color-footer-muted)' }}>
          &copy; {new Date().getFullYear()} Randomize.one. All rights reserved. All processing happens in your browser.
        </div>
      </div>
    </footer>
  );
}
