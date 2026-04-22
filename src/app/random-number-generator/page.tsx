import type { Metadata } from 'next';
import RandomNumberGenerator from '../../components/tools/RandomNumberGenerator';
import AdSlot from '../../components/ui/AdSlot';
import FAQ from '../../components/ui/FAQ';
import FaqSchema from '../../components/seo/FaqSchema';
import RelatedTools from '../../components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Random Number Generator — Free Online Number Randomizer',
  description: 'Generate cryptographically secure random numbers within any range. Supports integers, decimals, bulk generation, no duplicates, and sorting. Free and private.',
  alternates: { canonical: 'https://randomgenerator.one/random-number-generator' },
  openGraph: {
    title: 'Random Number Generator — Free Online Number Randomizer',
    description: 'Generate cryptographically secure random numbers within any range. Supports integers, decimals, and bulk generation.',
    url: 'https://randomgenerator.one/random-number-generator',
  },
};

const faqs = [
  {
    question: 'Are the random numbers truly random?',
    answer: 'Yes. Our generator uses the Web Crypto API (crypto.getRandomValues()) which draws from your operating system\'s cryptographic entropy source. This produces cryptographically secure random numbers that are unpredictable and suitable for security-sensitive applications like lottery draws, statistical sampling, and password generation.',
  },
  {
    question: 'Can I generate random numbers without duplicates?',
    answer: 'Yes. Enable the "No Duplicates" checkbox to ensure every generated number is unique. This is useful for lottery number generation, random sampling without replacement, and creating unique identifier sets. Note that the quantity cannot exceed the range of possible values when this option is enabled.',
  },
  {
    question: 'What is the maximum range I can use?',
    answer: 'You can generate numbers in any range from -999999999 to 999999999. For integers, the range is inclusive of both the minimum and maximum values. For decimals, the generator produces values with up to 6 decimal places within your specified range.',
  },
  {
    question: 'Is my data private?',
    answer: 'Absolutely. All number generation happens entirely in your browser using JavaScript. No data is sent to any server, no results are stored, and no cookies are used for tracking. Your generated numbers remain completely private on your device.',
  },
  {
    question: 'How many numbers can I generate at once?',
    answer: 'You can generate up to 1,000 random numbers in a single batch. Each result can be individually copied, or you can copy all results at once. The generator also maintains a history of your last 10 generations for easy reference.',
  },
];

export default function RandomNumberGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdSlot slot="leaderboard" />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">Random Number Generator</h1>
      <p className="text-text-light mb-8">Generate cryptographically secure random numbers within any range. Fast, free, and completely private.</p>

      <RandomNumberGenerator />

      <AdSlot slot="below-results" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-4">How to Use the Random Number Generator</h2>
        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            Our Random Number Generator is a powerful, easy-to-use tool that creates cryptographically secure random numbers for any purpose. Whether you need a single random number for a quick decision or thousands of numbers for statistical analysis, this tool delivers instant results with complete privacy.
          </p>

          <h3 className="text-xl font-semibold text-text">Setting Your Range</h3>
          <p>
            Start by entering your minimum and maximum values in the input fields. The default range is 1 to 100, but you can set any range you need. For example, set 1 to 6 to simulate a die roll, 1 to 52 for a card draw, or 0 to 1 for a binary choice. The generator supports both positive and negative numbers, so you can use ranges like -100 to 100 for centered distributions.
          </p>

          <h3 className="text-xl font-semibold text-text">Choosing Number Type</h3>
          <p>
            Toggle between integer and decimal modes depending on your needs. Integer mode generates whole numbers only, perfect for lottery numbers, dice rolls, and counting applications. Decimal mode produces numbers with up to six decimal places, ideal for scientific simulations, probability experiments, and statistical sampling where continuous values are needed.
          </p>

          <h3 className="text-xl font-semibold text-text">Generating Multiple Numbers</h3>
          <p>
            Use the quantity field to generate up to 1,000 numbers at once. This is invaluable for bulk operations like creating test datasets, running Monte Carlo simulations, or generating multiple lottery picks. Each number is generated independently using the cryptographic random number generator, ensuring true randomness across the entire set.
          </p>

          <h3 className="text-xl font-semibold text-text">Removing Duplicates and Sorting</h3>
          <p>
            Enable the "No Duplicates" option when you need unique numbers — essential for lottery draws, random sampling without replacement, and tournament seeding. You can also sort your results in ascending or descending order for easier analysis. When no duplicates is enabled, the tool automatically ensures your requested quantity does not exceed the available range.
          </p>

          <h3 className="text-xl font-semibold text-text">Copying and Using Results</h3>
          <p>
            Every generated number has its own copy button for quick individual copying. Use the "Copy All" button to copy the entire set to your clipboard, formatted for easy pasting into spreadsheets, documents, or code editors. The generator maintains a history of your last 10 generations, so you can reference previous results without regenerating them. Click "Clear" at any time to reset the tool and start fresh.
          </p>

          <h3 className="text-xl font-semibold text-text">Security and Privacy</h3>
          <p>
            Unlike many online random number generators that use Math.random(), our tool uses the Web Crypto API which provides cryptographically secure randomness. This means the numbers cannot be predicted or reproduced, making them suitable for security applications. All processing happens in your browser — no data is ever transmitted to our servers.
          </p>
        </div>
      </section>

      <AdSlot slot="in-content" />

      <FAQ items={faqs} />
      <FaqSchema faqs={faqs} />
      <RelatedTools currentTool="/random-number-generator" />

      <AdSlot slot="footer" />
    </div>
  );
}
