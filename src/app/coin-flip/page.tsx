import type { Metadata } from 'next';
import CoinFlipSimulator from '../../components/tools/CoinFlipSimulator';
import AdSlot from '../../components/ui/AdSlot';
import FAQ from '../../components/ui/FAQ';
import FaqSchema from '../../components/seo/FaqSchema';
import RelatedTools from '../../components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Coin Flip Simulator — Free Online Coin Toss Tool',
  description: 'Flip a virtual coin with animated visuals and real-time statistics. Track heads vs tails percentages, flip multiple coins, and view history. Free and private.',
  alternates: { canonical: 'https://randomgenerator.one/coin-flip' },
  openGraph: {
    title: 'Coin Flip Simulator — Free Online Coin Toss Tool',
    description: 'Flip a virtual coin with animated visuals and real-time statistics. Track heads vs tails percentages and flip multiple coins.',
    url: 'https://randomgenerator.one/coin-flip',
  },
};

const faqs = [
  {
    question: 'Is the coin flip fair and unbiased?',
    answer: 'Yes. Our coin flip simulator uses the Web Crypto API (crypto.getRandomValues()) to generate each flip result. This provides a true 50/50 probability for heads and tails, unlike physical coins which can have slight biases due to weight distribution. Over many flips, you will see the results converge toward an even 50/50 split.',
  },
  {
    question: 'Can I flip multiple coins at once?',
    answer: 'Yes. You can flip anywhere from 1 to 100 coins simultaneously. Each coin is independently determined using the cryptographic random number generator. The results show each individual coin outcome along with a summary of total heads and tails counts.',
  },
  {
    question: 'How are the statistics calculated?',
    answer: 'The statistics tracker accumulates results across all your flips in the current session. It shows total flips, heads count, tails count, and the percentage split between heads and tails. The visual bar chart updates in real-time. Use the Reset button to clear all statistics and start fresh.',
  },
  {
    question: 'Can I use this for making decisions?',
    answer: 'Absolutely. A coin flip is a classic method for making binary decisions when you are torn between two options. Our simulator provides a fair, unbiased result every time. Many people use coin flips for settling disputes, choosing between options, or even as a psychological tool — your reaction to the result often reveals your true preference.',
  },
];

export default function CoinFlipPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdSlot slot="leaderboard" />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">Coin Flip Simulator</h1>
      <p className="text-text-light mb-8">Flip a virtual coin with animated visuals and real-time statistics tracking. Fair, fast, and completely private.</p>

      <CoinFlipSimulator />

      <AdSlot slot="below-results" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-4">How to Use the Coin Flip Simulator</h2>
        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            The Coin Flip Simulator is a simple yet powerful tool for generating random binary outcomes. Whether you need to make a quick decision, settle a friendly dispute, or run probability experiments, this simulator provides fair, cryptographically secure results with engaging visual feedback.
          </p>

          <h3 className="text-xl font-semibold text-text">Flipping a Single Coin</h3>
          <p>
            The simplest use case is flipping a single coin. Leave the number of coins set to 1 and click the "Flip Coin" button. The coin will animate with a spinning effect, then reveal the result as either Heads or Tails. Each flip uses the Web Crypto API to ensure a perfectly fair 50/50 probability. The result is displayed with a visual coin icon and a clear label.
          </p>

          <h3 className="text-xl font-semibold text-text">Flipping Multiple Coins</h3>
          <p>
            For probability experiments or games that require multiple simultaneous flips, increase the number of coins up to 100. Each coin is independently determined, and all results are displayed in a visual grid. Below the individual results, you will see a summary showing how many landed on heads and how many on tails. This is perfect for demonstrating the law of large numbers or running binomial distribution experiments.
          </p>

          <h3 className="text-xl font-semibold text-text">Tracking Statistics</h3>
          <p>
            The statistics panel automatically tracks your cumulative results across all flips in the current session. It displays four key metrics: total number of flips, heads count, tails count, and the percentage of heads. A visual progress bar shows the heads-to-tails ratio at a glance. As you perform more flips, you will observe the percentages gradually converging toward 50/50, demonstrating the fundamental principle of probability.
          </p>

          <h3 className="text-xl font-semibold text-text">Viewing Flip History</h3>
          <p>
            Every flip is recorded in the history panel, which stores your last 20 flip sessions. Each entry shows the timestamp and the individual results using H for heads and T for tails. This history is useful for reviewing past results, verifying fairness, or keeping a record of decision outcomes. The history is color-coded for easy scanning, with heads highlighted in the primary color.
          </p>

          <h3 className="text-xl font-semibold text-text">Resetting and Starting Fresh</h3>
          <p>
            Click the "Reset" button at any time to clear all results, statistics, and history. This gives you a clean slate for a new session. Since all data is stored only in your browser memory, closing the tab also clears everything. No data is ever saved to any server or persistent storage, ensuring complete privacy for every flip session.
          </p>

          <h3 className="text-xl font-semibold text-text">Common Use Cases</h3>
          <p>
            People use coin flips for a wide variety of purposes. Decision making is the most common — when you cannot choose between two options, let the coin decide. Teachers use multiple coin flips to teach probability concepts in the classroom. Game players use them for turn order or random events. Researchers use them for randomization in experiments. Whatever your reason, our simulator ensures every flip is fair, fast, and private.
          </p>
        </div>
      </section>

      <AdSlot slot="in-content" />

      <FAQ items={faqs} />
      <FaqSchema faqs={faqs} />
      <RelatedTools currentTool="/coin-flip" />

      <AdSlot slot="footer" />
    </div>
  );
}
