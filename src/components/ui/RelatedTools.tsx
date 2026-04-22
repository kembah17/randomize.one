import Link from 'next/link';

interface Tool {
  name: string;
  href: string;
  description: string;
}

const allTools: Tool[] = [
  { name: 'Random Number Generator', href: '/random-number-generator', description: 'Generate random numbers within any range' },
  { name: 'Random String Generator', href: '/random-string-generator', description: 'Create random strings with custom character sets' },
  { name: 'Coin Flip Simulator', href: '/coin-flip', description: 'Flip coins with animated visuals and statistics' },
  { name: 'Dice Roller', href: '/dice-roller', description: 'Roll dice with multiple sides and custom notation' },
  { name: 'Random Color Generator', href: '/random-color-generator', description: 'Generate random colors in HEX, RGB, and HSL' },
  { name: 'Random Name Picker', href: '/random-name-picker', description: 'Pick random winners from a list of names' },
];

export default function RelatedTools({ currentTool }: { currentTool: string }) {
  const related = allTools.filter((t) => t.href !== currentTool);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-text mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block bg-surface border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all shadow-sm"
          >
            <h3 className="font-semibold text-text mb-1">{tool.name}</h3>
            <p className="text-sm text-text-light">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
