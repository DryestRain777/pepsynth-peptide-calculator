/* Pepsynth Labs — Structured Data (JSON-LD)
 * Injected client-side because GitHub Pages cannot serve custom headers
 * and our strict CSP (`script-src 'self'`) forbids inline <script> blocks.
 * Google/Bing render this page and reliably ingest JSON-LD injected via
 * same-origin JavaScript.
 *
 * Emits a single @graph containing:
 *   - Organization (Pepsynth Labs)
 *   - WebSite (with SearchAction)
 *   - WebApplication + SoftwareApplication (the calculator itself)
 *   - BreadcrumbList
 *   - HowTo (peptide reconstitution)
 *   - FAQPage (mirrors the visible FAQ)
 *   - ItemList of every peptide in the library (deep-link anchors)
 */
(function () {
  'use strict';
  var SITE = 'https://calculator.pepsynthlabs.com/';
  var PARENT = 'https://pepsynthlabs.com/';
  var LOGO = SITE + 'assets/logo-wordmark.png';
  var OG = SITE + 'assets/og-card-2026a.png';

  function slug(n) {
    return String(n).toLowerCase()
      .replace(/[()\/+.,]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  var faqs = [
    ['Does adding more bacteriostatic water make the peptide dose weaker?',
      'No. The total quantity of peptide in the vial never changes. More diluent simply spreads that same mass over a larger volume, so each unit on the syringe carries less peptide — which makes small doses far easier to measure accurately. You draw a larger volume to deliver the identical dose.'],
    ['How much bacteriostatic water should I use to reconstitute a peptide?',
      'Choose the volume that puts your target dose between 10 and 50 units on a U-100 insulin syringe. Below 5 units, measurement error becomes significant; above 50 units, injection volume becomes uncomfortable. For most 5–10 mg vials, 2 mL of bacteriostatic water is the practical default.'],
    ['If the vial says 10 mg, is that one dose?',
      'No. The label states the total mass of lyophilized peptide in the vial. A 10 mg vial dosed at 250 mcg contains 40 separate research doses.'],
    ['How do I convert peptide mcg to mg?',
      '1 mg equals 1,000 mcg. To convert mcg to mg divide by 1,000 (e.g. 250 mcg = 0.25 mg). To convert mg to mcg multiply by 1,000 (e.g. 2.5 mg = 2,500 mcg). The calculator does this automatically.'],
    ['How do I convert Oxytocin IU to mg or mcg?',
      'Synthetic oxytocin is standardized to 600 IU per 1 mg (USP). So 1 IU ≈ 1.667 mcg, and a typical 20 IU intranasal dose ≈ 33.3 mcg (0.0333 mg). The calculator applies this conversion automatically when Oxytocin is selected.'],
    ['My peptide did not fully dissolve. What now?',
      'Let it sit at room temperature and swirl gently every few minutes — some compounds take up to 15 minutes to fully dissolve. Persistent particulate after 30 minutes suggests degradation or an incompatible diluent; do not use.'],
    ['Can I mix two peptides in one syringe?',
      'Physically possible for many compounds and common in research protocols, but stability data for arbitrary combinations is generally absent. Reconstitute and store separately; combine in the syringe only immediately before use.'],
    ['Are Pepsynth Labs peptides shipped as liquid?',
      'No. Compounds are supplied as lyophilized (freeze-dried) powder and require reconstitution with a suitable diluent such as bacteriostatic water. Bacteriostatic water and syringes are sold separately.'],
    ['How should I store peptides before reconstitution?',
      'Sealed lyophilized vials are stable refrigerated at 2–8 °C for a year or more, and at −20 °C for two years or more. Keep them dry, sealed and away from light.']
  ];

  var org = {
    '@type': 'Organization',
    '@id': PARENT + '#org',
    name: 'Pepsynth Labs',
    url: PARENT,
    logo: LOGO,
    image: LOGO,
    description: 'Pepsynth Labs is a U.S. research-peptide supplier offering 99% purity, third-party HPLC/MS tested lyophilized peptides for laboratory research.',
    email: 'sales@pepsynthlabs.com',
    telephone: '+1-707-969-0777',
    areaServed: 'US',
    sameAs: [PARENT]
  };

  var site = {
    '@type': 'WebSite',
    '@id': SITE + '#website',
    url: SITE,
    name: 'Pepsynth Peptide Calculator',
    description: 'Free peptide reconstitution calculator and reference library for 50+ research peptides.',
    inLanguage: 'en-US',
    publisher: { '@id': PARENT + '#org' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: SITE + '?q={search_term_string}' },
      'query-input': 'required name=search_term_string'
    }
  };

  var app = {
    '@type': ['WebApplication', 'SoftwareApplication'],
    '@id': SITE + '#calculator',
    name: 'Peptide Reconstitution Calculator',
    alternateName: ['BAC Water Calculator', 'Peptide Dose Calculator', 'Insulin Syringe Unit Calculator'],
    url: SITE,
    applicationCategory: 'UtilitiesApplication',
    applicationSubCategory: 'Scientific Calculator',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    image: OG,
    description: 'Calculate bacteriostatic water volume, peptide concentration (mg/mL), insulin-syringe unit marks and per-vial dose count for Semaglutide, Tirzepatide, Retatrutide, BPC-157, TB-500, GHK-Cu, Ipamorelin, CJC-1295, Tesamorelin, Oxytocin and 40+ other research peptides.',
    featureList: [
      'Bacteriostatic water volume calculation',
      'Concentration in mg/mL',
      'Insulin syringe (U-100) unit conversion',
      'mcg ↔ mg dose conversion',
      'IU to mg conversion (Oxytocin)',
      'Capsule-count mode for oral compounds',
      'Peptide blend total vs per-component breakdown',
      'Per-vial dose count and vial-longevity calculation',
      'Reference library for 50+ peptides'
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@id': PARENT + '#org' },
    publisher: { '@id': PARENT + '#org' }
  };

  var breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pepsynth Labs', item: PARENT },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: PARENT + 'shop/' },
      { '@type': 'ListItem', position: 3, name: 'Peptide Calculator', item: SITE }
    ]
  };

  var howto = {
    '@type': 'HowTo',
    '@id': SITE + '#howto-reconstitute',
    name: 'How to Reconstitute a Research Peptide',
    description: 'Step-by-step laboratory procedure to reconstitute a lyophilized research peptide with bacteriostatic water.',
    totalTime: 'PT10M',
    supply: [
      { '@type': 'HowToSupply', name: 'Lyophilized peptide vial' },
      { '@type': 'HowToSupply', name: 'Bacteriostatic water (0.9% benzyl alcohol)' },
      { '@type': 'HowToSupply', name: 'Alcohol swabs' },
      { '@type': 'HowToSupply', name: 'U-100 insulin syringe' }
    ],
    step: [
      { '@type': 'HowToStep', name: 'Warm the vial', text: 'Let the lyophilized vial reach room temperature for 15–20 minutes before starting.' },
      { '@type': 'HowToStep', name: 'Sanitize stoppers', text: 'Wipe the peptide vial and bacteriostatic water vial stoppers with fresh alcohol swabs and let them air dry.' },
      { '@type': 'HowToStep', name: 'Draw diluent', text: 'Draw the exact volume of bacteriostatic water the calculator recommends into the syringe.' },
      { '@type': 'HowToStep', name: 'Inject against the wall', text: 'Angle the needle against the glass wall of the peptide vial and let the water run slowly down the side. Never spray directly onto the powder.' },
      { '@type': 'HowToStep', name: 'Swirl, do not shake', text: 'Roll the vial gently between your palms until the solution is clear. Shaking causes foaming and denatures the peptide.' },
      { '@type': 'HowToStep', name: 'Inspect', text: 'Confirm the solution is clear and free of particulate. GHK-Cu is an expected deep blue; any other compound should not be discolored.' },
      { '@type': 'HowToStep', name: 'Label and refrigerate', text: 'Write the reconstitution date, vial strength and final concentration on the vial. Store at 2–8 °C.' }
    ]
  };

  var faqNode = {
    '@type': 'FAQPage',
    '@id': SITE + '#faq',
    mainEntity: faqs.map(function (q) {
      return {
        '@type': 'Question',
        name: q[0],
        acceptedAnswer: { '@type': 'Answer', text: q[1] }
      };
    })
  };

  var itemList = null;
  if (typeof PEPTIDES !== 'undefined' && Array.isArray(PEPTIDES)) {
    itemList = {
      '@type': 'ItemList',
      '@id': SITE + '#peptide-list',
      name: 'Research Peptide Reference Library',
      numberOfItems: PEPTIDES.length,
      itemListElement: PEPTIDES.map(function (p, i) {
        return {
          '@type': 'ListItem',
          position: i + 1,
          url: SITE + '#peptide-' + slug(p.n),
          name: p.n
        };
      })
    };
  }

  var graph = [org, site, app, breadcrumb, howto, faqNode];
  if (itemList) graph.push(itemList);

  var payload = { '@context': 'https://schema.org', '@graph': graph };
  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.text = JSON.stringify(payload);
  document.head.appendChild(s);
})();
