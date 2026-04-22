import type { Metadata } from 'next';
import DiceRoller from '../../components/tools/DiceRoller';
import AdSlot from '../../components/ui/AdSlot';
import FAQ from '../../components/ui/FAQ';
import FaqSchema from '../../components/seo/FaqSchema';
import RelatedTools from '../../components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Dice Roller — Free Online Dice Rolling Simulator',
  description: 'Roll virtual dice with multiple sides (d4, d6, d8, d10, d12, d20). Supports custom dice notation, modifiers, statistics tracking, and roll history. Free and private.',
  alternates: { canonical: 'https://randomgenerator.one/dice-roller' },
  openGraph: {
    title: 'Dice Roller — Free Online Dice Rolling Simulator',
    description: 'Roll virtual dice with multiple sides and custom notation. Supports d4, d6, d8, d10, d12, d20 with modifiers and statistics.',
    url: 'https://randomgenerator.one/dice-roller',
  },
};

const faqs = [
  {
    question: 'What dice types are supported?',
    answer: 'Our dice roller supports all standard polyhedral dice used in tabletop gaming: d4 (tetrahedron), d6 (cube), d8 (octahedron), d10 (pentagonal trapezohedron), d12 (dodecahedron), and d20 (icosahedron). You can also use the dice notation input to roll any custom die size, such as d100 or d3.',
  },
  {
    question: 'How does dice notation work?',
    answer: 'Dice notation follows the standard format NdS+M, where N is the number of dice, S is the number of sides, and M is an optional modifier. For example, 2d6 rolls two six-sided dice, 1d20+5 rolls one twenty-sided die and adds 5, and 3d8-2 rolls three eight-sided dice and subtracts 2. The modifier can be positive (+) or negative (-).',
  },
  {
    question: 'Are the dice rolls truly random?',
    answer: 'Yes. Each die roll uses the Web Crypto API (crypto.getRandomValues()) to generate cryptographically secure random numbers. This ensures every face of the die has an exactly equal probability of being rolled, with no patterns or biases. The results are more random than physical dice, which can have manufacturing imperfections.',
  },
  {
    question: 'Can I roll multiple dice at once?',
    answer: 'Yes, you can roll up to 10 dice simultaneously using either the number input or dice notation. Each die is rolled independently, and the individual results are displayed along with the total sum. For d6 dice, the results are shown with traditional dot faces for a visual experience.',
  },
  {
    question: 'What statistics are tracked?',
    answer: 'The statistics panel tracks the average value, minimum value, and maximum value across all individual dice rolls in your session. This is useful for analyzing probability distributions, verifying fairness, or tracking performance in tabletop RPG sessions. The roll history stores your last 20 roll sessions with timestamps.',
  },
];

export default function DiceRollerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdSlot slot="leaderboard" />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">Dice Roller</h1>
      <p className="text-text-light mb-8">Roll virtual dice with multiple sides, custom notation, and real-time statistics. Perfect for tabletop games and probability experiments.</p>

      <DiceRoller />

      <AdSlot slot="below-results" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-4">How to Use the Dice Roller</h2>
        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            The Dice Roller is a feature-rich tool for rolling virtual dice of any type. Whether you are playing Dungeons and Dragons, running a board game night, teaching probability, or just need random numbers with specific ranges, this roller provides accurate, fair results with an engaging visual experience.
          </p>

          <h3 className="text-xl font-semibold text-text">Basic Dice Rolling</h3>
          <p>
            To roll dice, simply select the number of dice (1 to 10) and choose the die type from the available options: d4, d6, d8, d10, d12, or d20. Click the "Roll" button to see your results. Each die animates briefly before revealing its value. For six-sided dice, the results are displayed using traditional dot-face symbols for an authentic feel. All other dice types show their numeric values.
          </p>

          <h3 className="text-xl font-semibold text-text">Using Dice Notation</h3>
          <p>
            For more advanced rolling, use the dice notation input field. Standard dice notation follows the format NdS+M where N is the number of dice, d is the separator, S is the number of sides, and +M or -M is an optional modifier. For example, type "2d6+3" to roll two six-sided dice and add 3 to the total. Type "1d20" for a standard D20 roll, or "4d6" to roll four six-sided dice for character stat generation. Press Enter or click "Roll Notation" to execute.
          </p>

          <h3 className="text-xl font-semibold text-text">Understanding Results</h3>
          <p>
            After each roll, the individual die results are displayed as visual tiles. Below them, the total sum is prominently shown. If you used a modifier, the breakdown shows the raw dice total and the modifier separately. You can copy the complete result with a single click using the "Copy Result" button, which formats the output as a comma-separated list of values followed by the total.
          </p>

          <h3 className="text-xl font-semibold text-text">Tracking Statistics</h3>
          <p>
            The statistics panel provides running calculations across all your dice rolls in the current session. It tracks the average value per die, the lowest single die result, and the highest single die result. These statistics are useful for verifying that the roller is fair, analyzing probability distributions, or keeping track of your luck during a gaming session. The statistics update automatically after each roll.
          </p>

          <h3 className="text-xl font-semibold text-text">Roll History</h3>
          <p>
            Every roll is recorded in the history panel, which stores your last 20 roll sessions. Each entry shows the timestamp, individual die values, any modifier applied, and the total result. You can copy any historical result with its dedicated copy button. This is invaluable for tabletop RPG sessions where you need to reference previous rolls or verify contested results.
          </p>

          <h3 className="text-xl font-semibold text-text">Tips for Tabletop Gaming</h3>
          <p>
            For D&D ability scores, roll 4d6 and manually drop the lowest. For advantage rolls, roll 1d20 twice and take the higher result. For damage rolls, use the notation input for quick calculations like 2d6+4 for a greatsword attack with a strength modifier. The clear button resets everything for a fresh session, and since all rolls happen in your browser, there is zero latency and complete privacy.
          </p>
        </div>
      </section>

      <AdSlot slot="in-content" />

      <FAQ items={faqs} />
      <FaqSchema faqs={faqs} />
      <RelatedTools currentTool="/dice-roller" />

      <AdSlot slot="footer" />
    </div>
  );
}
