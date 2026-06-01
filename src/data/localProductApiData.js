import { PRODUCTS, DIVISIONS } from './productsData';
import { PRODUCT_PAGE_DATA } from './productPageData';

const FALLBACK_IMAGES = [
  'images/doors/rd_residential.png',
  'images/doors/rd_commercial.png',
  'images/doors/rd_industrial.png',
  'images/doors/slatted_roller.png',
  'images/doors/solid_roller.png',
];


const LIVE_CONFIRMED_PAGE_IDS = new Set([
  'roller-shutters',
  'gates',
  'pipes-tubes',
  'purlins',
  'roofing',
  'ss-fabrication',
  'pantry',
  'solar-power-systems',
  'automobile-accessories',
  'wpc',
]);

/* Maps product IDs to their keys in PRODUCT_PAGE_DATA where they differ */
const PAGE_DATA_KEY_MAP = {
  'wpc': 'wpc-decking',
  'pantry': 'pantry-systems',
  'solar-power-systems': 'solar-systems',
};

function divisionName(id) {
  return DIVISIONS.find((division) => division.id === id)?.name || id;
}

function titleFromFeature(title = '') {
  return title || 'Feature.';
}

function overviewFromProduct(product) {
  return (product.useCases || []).slice(0, 3).map((useCase, index) => ({
    title: useCase,
    desc: `${product.title} solutions for ${useCase.toLowerCase()} applications, specified to match site requirements.`,
    img: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    stat: ['Custom', 'Quality', 'Service'][index % 3],
    statLbl: ['Specification', 'Materials', 'Support'][index % 3],
  }));
}

function variantsFromProduct(product) {
  return (product.types || []).map((type, index) => ({
    title: type,
    desc: `${type} supplied within the ${product.title} range.`,
    tag: divisionName(product.division),
    img: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
  }));
}

function featuresFromProduct(product) {
  return (product.features || []).slice(0, 4).map((feature, index) => ({
    label: ['Performance', 'Durability', 'Materials', 'Service'][index % 4],
    title: `${feature.split(' ').slice(0, 2).join('\n')}.`,
    desc: feature,
    img: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    stat1: ['ISO', 'Custom', 'Strong'][index % 3],
    stat1Label: ['Quality', 'Build', 'Material'][index % 3],
    stat2: ['Local', 'Site', 'After'][index % 3],
    stat2Label: ['Support', 'Specified', 'Sales'][index % 3],
  }));
}

function buildProductPage(product) {
  const pageKey = PAGE_DATA_KEY_MAP[product.id] || product.id;
  const page = LIVE_CONFIRMED_PAGE_IDS.has(product.id) ? (PRODUCT_PAGE_DATA[pageKey] || {}) : {};
  const overviewCards = page.overviewCards || overviewFromProduct(product);
  const variants = page.variants || variantsFromProduct(product);
  const features = page.features || featuresFromProduct(product);
  const keyTechItems = page.keyTech?.items || [];

  return {
    name: product.title,
    slug: product.id,
    category: divisionName(product.division),
    animation_type: product.id,
    hero_title: (page.heroPrimary || product.title).replace(/\.$/, ''),
    hero_subtitle: page.heroSecondary || divisionName(product.division),
    hero_description: page.heroBody || product.description,
    hero_badges: [
      { num: variants.length || product.types?.length || 1, label: 'Types' },
      { num: features.length || product.features?.length || 1, label: 'Features' },
      { num: product.useCases?.length || 1, label: 'Applications' },
    ],
    overview: overviewCards.map((card, index) => ({
      title: card.title,
      desc: card.desc,
      img: card.img || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
      stat: card.stat,
      statLbl: card.statLbl,
    })),
    variants: variants.map((variant, index) => ({
      title: variant.title,
      tag: variant.badge || variant.tag || divisionName(product.division),
      desc: variant.desc,
      img: variant.img || overviewCards[index % overviewCards.length]?.img || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    })),
    features: features.map((feature, index) => ({
      label: feature.label,
      title: titleFromFeature(feature.title),
      desc: feature.desc,
      img: feature.img || overviewCards[index % overviewCards.length]?.img || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
      stat1: feature.stat1,
      stat1Label: feature.stat1Label,
      stat2: feature.stat2,
      stat2Label: feature.stat2Label,
    })),
    colors: product.colors || page.colors || null,
    components: page.components || keyTechItems.map((item, index) => ({
      num: String(index + 1).padStart(2, '0'),
      name: item.title,
      desc: item.body,
    })),
    performance: page.performance || {
      title: page.keyTech?.title || 'Performance built around the application.',
      desc: page.keyTech?.body || product.description,
      features: keyTechItems.map((item) => ({ title: item.title, desc: item.body })),
    },
    stats: page.stats || [
      { num: product.types?.length || variants.length || 1, label: 'Product types' },
      { num: product.features?.length || features.length || 1, label: 'Key features' },
      { num: product.useCases?.length || 1, label: 'Applications' },
      { num: 'Quote', label: 'Custom specification' },
    ],
    specs: page.specsTabs || {
      overview: [
        ['Product', product.title],
        ['Category', divisionName(product.division)],
        ['Applications', (product.useCases || []).join(', ')],
        ['Types', (product.types || []).join(', ')],
      ],
    },
    unique_sections: {},
  };
}

export const LOCAL_PRODUCTS = PRODUCTS.map(buildProductPage);

export function mergeProductsWithLocal(apiProducts = []) {
  const merged = new Map(LOCAL_PRODUCTS.map((product) => [product.slug, product]));
  apiProducts.forEach((product) => {
    if (product?.slug) merged.set(product.slug, product);
  });
  return Array.from(merged.values());
}

export function getLocalProductBySlug(slug) {
  return LOCAL_PRODUCTS.find((product) => product.slug === slug)
    || LOCAL_PRODUCTS.find((product) => product.slug === `${slug}s`)
    || LOCAL_PRODUCTS.find((product) => product.slug === slug.replace(/s$/, ''))
    || null;
}
