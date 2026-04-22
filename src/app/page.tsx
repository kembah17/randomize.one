import Link from 'next/link';
import AdSlot from '../components/ui/AdSlot';
import WebSiteSchema from '../components/seo/WebSiteSchema';

const tools = [
  {
    name: 'Random Number Generator',
    href: '/random-number-generator',
    description: 'Generate cryptographically secure random numbers within any range. Supports integers, decimals, and bulk generation.',
    icon: '#',
  },
  {
    name: 'Random String Generator',
    href: '/random-string-generator',
    description: 'Create random strings with custom character sets. Perfect for passwords, tokens, and unique identifiers.',
    icon: 'Aa',
  },
  {
    name: 'Coin Flip Simulator',
    href: '/coin-flip',
    description: 'Flip virtual coins with animated visuals and real-time statistics tracking for heads and tails.',
    icon: '⚡',
  },
  {
    name: 'Dice Roller',
    href: '/dice-roller',
    description: 'Roll dice with multiple sides and custom notation. Supports d4, d6, d8, d10, d12, d20 and modifiers.',
    icon: '⬡',
  },
  {
    name: 'Random Color Generator',
    href: '/random-color-generator',
    description: 'Generate random colors in HEX, RGB, and HSL. Create complementary, analogous, and triadic palettes.',
    icon: '◉',
  },
  {
    name: 'Random Name Picker',
    href: '/random-name-picker',
    description: 'Pick random winners from a list of names with animated selection. Great for raffles and giveaways.',
    icon: '★',
  },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WebSiteSchema />
      <AdSlot slot="leaderboard" />

      <section className="text-center py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-4">
          Free Randomize Tools
        </h1>
        <p className="text-lg sm:text-xl text-text-light max-w-3xl mx-auto mb-8">
          Generate random numbers, strings, colors, flip coins, roll dice, and pick random names.
          All tools run entirely in your browser — fast, private, and secure.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/random-number-generator"
            className="px-6 py-3 bg-primary text-primary-text font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
          >
            Get Started
          </Link>
          <a
            href="#tools"
            className="px-6 py-3 bg-surface border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors"
          >
            Browse Tools
          </a>
        </div>
      </section>

      <section id="tools" className="py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-text text-center mb-8">All Randomize Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block bg-surface border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary text-xl font-bold mb-4 group-hover:bg-primary group-hover:text-primary-text transition-colors">
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-text-light leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="mid-content" />

      <section className="py-12">
        <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text mb-4">About Our Randomize Tools</h2>
          <div className="space-y-4 text-text-light leading-relaxed">
            <p>
              Randomize.one provides a comprehensive suite of free online randomize tools designed for everyday use. Whether you need to generate random numbers for statistical sampling, create secure random strings for passwords, flip a coin to make a quick decision, roll dice for your tabletop game, generate random colors for your design project, or pick a random name for a raffle — we have you covered.
            </p>
            <p>
              All of our tools use the Web Crypto API (<code className="bg-page px-1.5 py-0.5 rounded text-sm font-mono text-text">crypto.getRandomValues()</code>) to generate cryptographically secure random values. Unlike many randomize websites that rely on <code className="bg-page px-1.5 py-0.5 rounded text-sm font-mono text-text">Math.random()</code>, which produces pseudo-random numbers that can be predicted, our tools leverage the operating system's entropy source to produce truly unpredictable results. This makes our generators suitable for security-sensitive applications like password generation and token creation.
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
