export default function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RandomGenerator.one',
    url: 'https://randomgenerator.one',
    description: 'Free online random generator tools. Generate random numbers, strings, colors, flip coins, roll dice, and pick random names — all in your browser.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://randomgenerator.one/?q={search_term_string}',
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
