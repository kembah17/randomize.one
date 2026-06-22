export default function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Randomize.one',
    url: 'https://randomize.one',
    description: 'Free online randomize tools. Generate random numbers, strings, colors, flip coins, roll dice, and pick random names — all in your browser.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://randomize.one/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
