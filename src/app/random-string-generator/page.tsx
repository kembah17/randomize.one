import type { Metadata } from 'next';
import RandomStringGenerator from '../../components/tools/RandomStringGenerator';
import AdSlot from '../../components/ui/AdSlot';
import FAQ from '../../components/ui/FAQ';
import FaqSchema from '../../components/seo/FaqSchema';
import RelatedTools from '../../components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Random String Generator — Free Online Password & Token Generator',
  description: 'Generate cryptographically secure random strings with custom character sets. Create passwords, tokens, and unique identifiers. Free, private, browser-based.',
  alternates: { canonical: 'https://randomize.one/random-string-generator' },
  openGraph: {
    title: 'Random String Generator — Free Online Password & Token Generator',
    description: 'Generate cryptographically secure random strings with custom character sets. Create passwords, tokens, and unique identifiers.',
    url: 'https://randomize.one/random-string-generator',
  },
};

const faqs = [
  {
    question: 'How secure are the generated strings?',
    answer: 'Our generator uses the Web Crypto API (crypto.getRandomValues()) which provides cryptographically secure randomness. The generated strings are unpredictable and cannot be reproduced, making them suitable for passwords, API keys, session tokens, and other security-sensitive applications.',
  },
  {
    question: 'What does the strength indicator mean?',
    answer: 'The strength indicator evaluates your string based on two factors: length and character set diversity. A string using all four character sets (uppercase, lowercase, numbers, special) at 16+ characters is rated "Very Strong." Shorter strings or fewer character sets reduce the strength rating. For passwords, aim for at least "Strong" rating.',
  },
  {
    question: 'Can I use this for generating passwords?',
    answer: 'Absolutely. This tool is ideal for password generation. For maximum security, enable all character sets (uppercase, lowercase, numbers, special characters) and set the length to at least 16 characters. Each generated string uses cryptographic randomness, ensuring your passwords are truly unpredictable.',
  },
  {
    question: 'What is the maximum string length?',
    answer: 'You can generate strings up to 128 characters long. For most password applications, 16-32 characters with all character sets enabled provides excellent security. For API tokens or unique identifiers, longer strings of 32-64 characters are common.',
  },
  {
    question: 'Can I generate multiple strings at once?',
    answer: 'Yes, you can generate up to 50 strings in a single batch. Each string is independently generated using the cryptographic random number generator. You can copy individual strings or use the "Copy All" button to copy the entire set at once.',
  },
];

export default function RandomStringGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdSlot slot="leaderboard" />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">Random String Generator</h1>
      <p className="text-text-light mb-8">Create cryptographically secure random strings for passwords, tokens, and unique identifiers. Fully customizable and private.</p>

      <RandomStringGenerator />

      <AdSlot slot="below-results" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-4">How to Use the Random String Generator</h2>
        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            The Random String Generator is a versatile tool for creating cryptographically secure random strings tailored to your exact specifications. Whether you need strong passwords, unique API tokens, session identifiers, or test data, this generator provides instant results with complete control over the output format.
          </p>

          <h3 className="text-xl font-semibold text-text">Setting the String Length</h3>
          <p>
            Use the length slider to set your desired string length from 1 to 128 characters. The slider provides quick adjustment, and the current length is displayed above it. For passwords, security experts recommend a minimum of 12 characters, with 16 or more being ideal. For API tokens and unique identifiers, 32 to 64 characters is standard practice. The longer your string, the more entropy it contains, making it exponentially harder to crack through brute force.
          </p>

          <h3 className="text-xl font-semibold text-text">Choosing Character Sets</h3>
          <p>
            Customize your string composition by toggling four character set options. Uppercase letters (A-Z) add 26 possible characters per position. Lowercase letters (a-z) add another 26. Numbers (0-9) contribute 10 characters. Special characters (!@#$%^&*...) add over 25 symbols. Each additional character set dramatically increases the total possible combinations, making your strings more secure. For maximum security, enable all four sets.
          </p>

          <h3 className="text-xl font-semibold text-text">Understanding the Strength Indicator</h3>
          <p>
            The strength indicator provides real-time feedback on your configuration. It evaluates the combination of string length and character set diversity to rate your output as Weak, Fair, Strong, or Very Strong. This helps you make informed decisions about your security requirements. A 16-character string with all character sets enabled achieves a "Very Strong" rating, while a short string with only one character set may be rated "Weak."
          </p>

          <h3 className="text-xl font-semibold text-text">Generating Multiple Strings</h3>
          <p>
            Set the quantity field to generate up to 50 strings simultaneously. This is perfect for creating batches of passwords for team onboarding, generating multiple API keys, or producing test data sets. Each string is independently generated using the cryptographic random number generator, ensuring no patterns or correlations between strings in the same batch.
          </p>

          <h3 className="text-xl font-semibold text-text">Copying and Managing Results</h3>
          <p>
            Each generated string has its own copy button for quick individual copying. The "Copy All" button copies every string in the batch, separated by newlines, for easy pasting into spreadsheets or configuration files. Use the "Clear" button to reset the generator and remove all results from the screen. Since all processing happens in your browser, no generated strings are ever stored on any server.
          </p>

          <h3 className="text-xl font-semibold text-text">Common Use Cases</h3>
          <p>
            This tool serves a wide range of applications. Developers use it for generating API keys, database seeds, and test fixtures. System administrators create secure passwords for service accounts. Designers generate random placeholder text identifiers. Security professionals produce tokens for authentication systems. Whatever your need, the cryptographic foundation ensures every string is truly random and unpredictable.
          </p>
        </div>
      </section>

      <AdSlot slot="in-content" />

      <FAQ items={faqs} />
      <FaqSchema faqs={faqs} />
      <RelatedTools currentTool="/random-string-generator" />

      <AdSlot slot="footer" />
    </div>
  );
}
