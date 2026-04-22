import type { Metadata } from 'next';
import RandomColorGenerator from '../../components/tools/RandomColorGenerator';
import AdSlot from '../../components/ui/AdSlot';
import FAQ from '../../components/ui/FAQ';
import FaqSchema from '../../components/seo/FaqSchema';
import RelatedTools from '../../components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Random Color Generator — Free Online Color Palette Tool',
  description: 'Generate random colors in HEX, RGB, and HSL formats. Create complementary, analogous, and triadic color palettes. Copy color codes instantly. Free and private.',
  alternates: { canonical: 'https://randomgenerator.one/random-color-generator' },
  openGraph: {
    title: 'Random Color Generator — Free Online Color Palette Tool',
    description: 'Generate random colors in HEX, RGB, and HSL. Create complementary, analogous, and triadic palettes instantly.',
    url: 'https://randomgenerator.one/random-color-generator',
  },
};

const faqs = [
  {
    question: 'What color formats are supported?',
    answer: 'Our color generator displays every color in three standard formats: HEX (e.g., #E11D48), RGB (e.g., rgb(225, 29, 72)), and HSL (e.g., hsl(350, 80%, 50%)). Each format has its own copy button so you can quickly grab the value you need for your CSS, design tool, or application.',
  },
  {
    question: 'What are complementary, analogous, and triadic palettes?',
    answer: 'These are color harmony schemes based on color theory. Complementary colors sit opposite each other on the color wheel (180 degrees apart) and create high contrast. Analogous colors are neighbors on the wheel (within 30 degrees) and create harmonious, cohesive palettes. Triadic colors are evenly spaced at 120 degrees apart and offer vibrant, balanced combinations.',
  },
  {
    question: 'How are the random colors generated?',
    answer: 'Each color is generated using the Web Crypto API (crypto.getRandomValues()) which produces three cryptographically secure random bytes for the red, green, and blue channels. This ensures truly random, unpredictable colors with uniform distribution across the entire color spectrum. The HEX and HSL values are mathematically derived from the RGB values.',
  },
  {
    question: 'Can I save colors I like?',
    answer: 'The color history panel automatically saves your last 20 generated colors. You can click on any color in the history to re-select it and view its values again. For permanent storage, use the copy buttons to save color codes to your clipboard and paste them into your design tool, code editor, or notes application.',
  },
  {
    question: 'Is this tool useful for web design?',
    answer: 'Absolutely. Designers use random color generators for inspiration, exploring unexpected color combinations, and breaking out of creative ruts. The palette generation features (complementary, analogous, triadic) produce professionally harmonious color schemes that follow established color theory principles. Copy the HEX or RGB values directly into your CSS or design software.',
  },
];

export default function RandomColorGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdSlot slot="leaderboard" />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">Random Color Generator</h1>
      <p className="text-text-light mb-8">Generate random colors in HEX, RGB, and HSL formats. Create beautiful palettes with complementary, analogous, and triadic harmonies.</p>

      <RandomColorGenerator />

      <AdSlot slot="below-results" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-4">How to Use the Random Color Generator</h2>
        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            The Random Color Generator is a versatile design tool that creates random colors and professionally harmonious color palettes. Whether you are a web developer choosing a color scheme, a designer seeking inspiration, or an artist exploring new combinations, this tool provides instant results with precise color values in every major format.
          </p>

          <h3 className="text-xl font-semibold text-text">Generating a Single Random Color</h3>
          <p>
            Click the "Generate Color" button to create a single random color. The color is displayed as a large preview swatch so you can see exactly how it looks. Below the swatch, you will find the color expressed in three formats: HEX for web development and design tools, RGB for CSS and programming, and HSL for intuitive hue-saturation-lightness adjustments. Each format has a dedicated copy button for instant clipboard access.
          </p>

          <h3 className="text-xl font-semibold text-text">Creating Color Palettes</h3>
          <p>
            The palette generation buttons create sets of harmonious colors based on color theory principles. The "Random Palette" button generates five completely random colors for maximum variety. The "Complementary" button creates a pair of colors that sit opposite each other on the color wheel, producing high-contrast combinations ideal for call-to-action elements and visual emphasis. The "Analogous" button generates five colors that are neighbors on the color wheel, creating smooth, cohesive palettes perfect for backgrounds and gradients. The "Triadic" button produces three colors evenly spaced around the wheel for vibrant, balanced designs.
          </p>

          <h3 className="text-xl font-semibold text-text">Understanding Color Formats</h3>
          <p>
            HEX codes like #E11D48 are the most common format in web development and design tools. They represent red, green, and blue channels as two-digit hexadecimal values. RGB format like rgb(225, 29, 72) expresses the same channels as decimal values from 0 to 255, commonly used in CSS and programming. HSL format like hsl(350, 80%, 50%) describes colors by hue (0-360 degrees on the color wheel), saturation (0-100% intensity), and lightness (0-100% brightness), making it intuitive for manual color adjustments.
          </p>

          <h3 className="text-xl font-semibold text-text">Using the Color History</h3>
          <p>
            Every generated color is automatically saved to the history panel, which stores your last 20 colors as clickable swatches. Click any swatch to re-select that color and view its values again. This is invaluable when you generate a color you like but want to continue exploring before committing. The history provides a visual timeline of your color exploration session, making it easy to compare and revisit favorites.
          </p>

          <h3 className="text-xl font-semibold text-text">Tips for Designers</h3>
          <p>
            Use the random generator to break out of creative ruts and discover unexpected color combinations. Generate multiple palettes and compare them side by side using the history feature. For web projects, start with a complementary palette for your primary and accent colors, then use analogous generation to fill in supporting tones. Remember that the HSL format is particularly useful for creating variations of a color by adjusting just the lightness or saturation values while keeping the hue constant.
          </p>

          <h3 className="text-xl font-semibold text-text">Privacy and Performance</h3>
          <p>
            All color generation happens entirely in your browser using the Web Crypto API. No color data is sent to any server, and no browsing information is tracked. The tool loads instantly with zero external dependencies, making it the fastest way to generate random colors online. Use the clear button to reset the generator and history at any time.
          </p>
        </div>
      </section>

      <AdSlot slot="in-content" />

      <FAQ items={faqs} />
      <FaqSchema faqs={faqs} />
      <RelatedTools currentTool="/random-color-generator" />

      <AdSlot slot="footer" />
    </div>
  );
}
