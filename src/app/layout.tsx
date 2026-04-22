import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://randomize.one'),
  title: {
    default: 'Randomize.one — Free Online Randomize Tools',
    template: '%s | Randomize.one',
  },
  description: 'Free online randomize tools. Generate random numbers, strings, colors, flip coins, roll dice, and pick random names. All tools run in your browser — fast, private, secure.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://randomize.one',
    siteName: 'Randomize.one',
    title: 'Randomize.one — Free Online Randomize Tools',
    description: 'Free online randomize tools. Generate random numbers, strings, colors, flip coins, roll dice, and pick random names.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Randomize.one — Free Online Randomize Tools',
    description: 'Free online randomize tools. All processing happens in your browser.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://randomize.one' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-page text-text min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
