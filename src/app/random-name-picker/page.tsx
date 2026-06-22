import type { Metadata } from 'next';
import RandomNamePicker from '../../components/tools/RandomNamePicker';
import AdSlot from '../../components/ui/AdSlot';
import FAQ from '../../components/ui/FAQ';
import FaqSchema from '../../components/seo/FaqSchema';
import RelatedTools from '../../components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Random Name Picker — Free Online Raffle & Winner Selector',
  description: 'Pick random names from a list with animated selection. Perfect for raffles, giveaways, classroom activities, and team assignments. Free, fair, and private.',
  alternates: { canonical: 'https://randomize.one/random-name-picker' },
  openGraph: {
    title: 'Random Name Picker — Free Online Raffle & Winner Selector',
    description: 'Pick random names from a list with animated selection. Perfect for raffles, giveaways, and classroom activities.',
    url: 'https://randomize.one/random-name-picker',
  },
};

const faqs = [
  {
    question: 'Is the name selection truly random and fair?',
    answer: 'Yes. Our name picker uses the Web Crypto API (crypto.getRandomValues()) to select winners. This provides cryptographically secure randomness, meaning every name in your list has an exactly equal probability of being selected. The selection cannot be predicted or manipulated, making it fair for raffles, giveaways, and any situation requiring impartial random selection.',
  },
  {
    question: 'Can I pick multiple winners at once?',
    answer: 'Yes. Set the number of winners field to any value from 1 up to the total number of names in your list. Each winner is selected independently using the cryptographic random number generator. When multiple winners are selected, no name is picked twice in the same draw, ensuring every winner is unique.',
  },
  {
    question: 'What happens when I enable "Remove picked names"?',
    answer: 'When this option is enabled, each selected winner is automatically removed from the list after being picked. This is useful for sequential draws where you want to ensure the same person cannot win twice across multiple rounds. The removed names are reflected in the updated list, and you can see the remaining names decrease with each pick.',
  },
  {
    question: 'How do I enter names into the list?',
    answer: 'You can enter names in two ways: type or paste one name per line in the text area, or separate names with commas. The tool automatically handles both formats and trims whitespace. You can paste a list directly from a spreadsheet, email, or document. Empty lines and duplicate entries are automatically handled.',
  },
  {
    question: 'Is my name list kept private?',
    answer: 'Absolutely. All processing happens entirely in your browser. Your name list is never sent to any server, never stored in any database, and never logged anywhere. When you close the tab or click reset, all data is permanently gone. This makes our tool safe for sensitive selections like employee raffles, student assignments, and confidential draws.',
  },
];

export default function RandomNamePickerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdSlot slot="leaderboard" />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">Random Name Picker</h1>
      <p className="text-text-light mb-8">Pick random winners from a list of names with animated selection. Fair, fast, and completely private.</p>

      <RandomNamePicker />

      <AdSlot slot="below-results" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-4">How to Use the Random Name Picker</h2>
        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            The Random Name Picker is a fair, transparent tool for selecting random winners from any list of names. Whether you are running a classroom raffle, organizing a company giveaway, assigning teams, or choosing who goes first, this tool provides cryptographically secure random selection with an engaging animated experience.
          </p>

          <h3 className="text-xl font-semibold text-text">Entering Your Name List</h3>
          <p>
            Start by entering names into the text area. You can type names one per line, or separate them with commas. The tool accepts any text format and automatically parses individual names. You can paste directly from spreadsheets, email lists, or documents. Leading and trailing whitespace is automatically trimmed, and empty lines are ignored. There is no limit to the number of names you can enter, making the tool suitable for everything from small classroom groups to large event raffles.
          </p>

          <h3 className="text-xl font-semibold text-text">Setting the Number of Winners</h3>
          <p>
            Use the winners input field to specify how many names you want to pick. The default is 1, but you can increase it up to the total number of names in your list. When picking multiple winners, each selection is independent and guaranteed to be unique within the same draw. This is perfect for selecting multiple prize winners, forming teams of a specific size, or creating random groups from a larger pool.
          </p>

          <h3 className="text-xl font-semibold text-text">The Animated Selection Process</h3>
          <p>
            When you click the "Pick" button, the tool runs an animated selection sequence. Names are rapidly highlighted in succession, creating a visual spinning effect similar to a raffle wheel. The animation gradually slows down before landing on the final winner. This visual feedback adds excitement and transparency to the selection process, making it engaging for live events, classroom activities, and group settings where participants are watching.
          </p>

          <h3 className="text-xl font-semibold text-text">Using the Remove Picked Option</h3>
          <p>
            Enable the "Remove picked names" checkbox when you want to run multiple rounds without repeating winners. Each time a name is selected, it is automatically removed from the list. This is essential for multi-prize raffles where each person can only win once, or for creating sequential assignments where every person must be assigned exactly once. The remaining name count updates in real-time so you can track how many names are left.
          </p>

          <h3 className="text-xl font-semibold text-text">Reviewing Pick History</h3>
          <p>
            Every selection is recorded in the history panel with a timestamp and the selected name or names. This provides a transparent audit trail for your random selections. You can reference previous picks to verify results, announce winners in order, or keep a record of all selections made during a session. The history is maintained until you click the reset button or close the browser tab.
          </p>

          <h3 className="text-xl font-semibold text-text">Common Use Cases</h3>
          <p>
            Teachers use the name picker for calling on students, forming random groups, and assigning presentation orders. Event organizers use it for raffle drawings and door prize selections. Managers use it for assigning tasks, choosing meeting facilitators, and selecting team leads. Friends use it for deciding who pays for dinner, choosing movie night picks, and settling friendly debates. The cryptographic randomness ensures every selection is completely fair and unbiased, regardless of the use case.
          </p>
        </div>
      </section>

      <AdSlot slot="in-content" />

      <FAQ items={faqs} />
      <FaqSchema faqs={faqs} />
      <RelatedTools currentTool="/random-name-picker" />

      <AdSlot slot="footer" />
    </div>
  );
}
