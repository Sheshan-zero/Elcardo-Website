/* ============================================================
   PRODUCTS DATA — Multi-Division Product Catalog
   ============================================================ */

// Division images
import divAccess from '../assets/div_access_automation.png';
import divSteel from '../assets/div_steel_construction.png';
import divInteriors from '../assets/div_fabrication_interiors.png';
import divEnergy from '../assets/div_energy.png';
import divLifestyle from '../assets/div_lifestyle.png';

// Product images
import imgRollerDoors from '../assets/prod_roller_doors.png';
import imgRollerShutters from '../assets/prod_roller_shutters.png';
import imgGates from '../assets/prod_gates.png';
import imgSectionalDoors from '../assets/prod_sectional_doors.png';
import imgHighSpeedDoors from '../assets/prod_highspeed_doors.png';
import imgPipesTubes from '../assets/prod_pipes_tubes.png';
import imgPurlins from '../assets/prod_purlins.png';
import imgRoofing from '../assets/product_roofing.png';
import imgSSFabrication from '../assets/prod_ss_fabrication.png';
import imgPantrySystems from '../assets/prod_pantry_systems.png';
import imgSolar from '../assets/product_solar.png';
import imgAutoAccessories from '../assets/prod_auto_accessories.png';
import imgWPCDecking from '../assets/prod_wpc_decking.png';

/* ─── Division Definitions ─── */
export const DIVISIONS = [
  {
    id: 'access',
    name: 'Access & Automation',
    shortName: 'Access',
    descriptor: 'Automated entry systems engineered for security, speed, and architectural precision.',
    image: divAccess,
    icon: '⛩',
    productCount: 5,
  },
  {
    id: 'steel',
    name: 'Steel & Construction',
    shortName: 'Steel',
    descriptor: 'Structural steel products built to support modern infrastructure at scale.',
    image: divSteel,
    icon: '🏗',
    productCount: 3,
  },
  {
    id: 'interiors',
    name: 'Fabrication & Interiors',
    shortName: 'Interiors',
    descriptor: 'Precision stainless steel fabrication and modular systems for premium spaces.',
    image: divInteriors,
    icon: '✦',
    productCount: 2,
  },
  {
    id: 'energy',
    name: 'Energy',
    shortName: 'Energy',
    descriptor: 'Clean energy solutions designed for commercial and residential integration.',
    image: divEnergy,
    icon: '⚡',
    productCount: 1,
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    shortName: 'Lifestyle',
    descriptor: 'Premium lifestyle products that blend function with modern aesthetic appeal.',
    image: divLifestyle,
    icon: '◆',
    productCount: 2,
  },
];

/* ─── Product Catalog ─── */
export const PRODUCTS = [
  /* ── Access & Automation ── */
  {
    id: 'roller-doors',
    division: 'access',
    title: 'Roller Doors',
    description: 'Heavy-duty motorized roller doors for industrial and commercial applications.',
    image: imgRollerDoors,
    types: ['Galvanized Steel', 'Aluminum', 'Insulated', 'Perforated'],
    features: ['Motor-operated', 'Wind-lock system', 'Anti-lift protection', 'Remote access'],
    useCases: ['Warehouses', 'Factories', 'Loading docks', 'Commercial garages'],
    brochureLink: '#',
  },
  {
    id: 'roller-shutters',
    division: 'access',
    title: 'Roller Shutters',
    description: 'Security-rated roller shutters for storefronts and commercial properties.',
    image: imgRollerShutters,
    types: ['Solid', 'Perforated', 'Transparent Polycarbonate', 'Aluminum'],
    features: ['Electric or manual', 'Anti-corrosion coating', 'Burglar-resistant', 'Powder-coated finishes'],
    useCases: ['Retail shops', 'Banks', 'Pharmacies', 'Office buildings'],
    brochureLink: '#',
  },
  {
    id: 'gates',
    division: 'access',
    title: 'Gates',
    description: 'Automated sliding and swing gates for residential and commercial entries.',
    image: imgGates,
    types: ['Sliding', 'Swing', 'Cantilever', 'Telescopic'],
    features: ['Smart automation', 'Safety sensors', 'Access control integration', 'Heavy-duty tracks'],
    useCases: ['Residences', 'Gated communities', 'Industrial compounds', 'Government facilities'],
    brochureLink: '#',
  },
  {
    id: 'sectional-doors',
    division: 'access',
    title: 'Sectional Doors',
    description: 'Insulated sectional overhead doors for energy-efficient closures.',
    image: imgSectionalDoors,
    types: ['Insulated Sandwich Panel', 'Glazed', 'Flush Panel', 'Ribbed Panel'],
    features: ['Thermal insulation', 'Spring balance system', 'Finger-trap protection', 'Custom sizes'],
    useCases: ['Fire stations', 'Showrooms', 'Cold storage', 'Residential garages'],
    brochureLink: '#',
  },
  {
    id: 'high-speed-doors',
    division: 'access',
    title: 'High-Speed Doors',
    description: 'Rapid roll-up doors engineered for high-traffic industrial environments.',
    image: imgHighSpeedDoors,
    types: ['PVC Fabric', 'Insulated Spiral', 'Clean Room', 'Exterior'],
    features: ['Opening speed up to 3m/s', 'Self-repairing', 'Frequency inverter', 'Motion sensors'],
    useCases: ['Pharmaceutical plants', 'Food processing', 'Logistics centers', 'Automotive factories'],
    brochureLink: '#',
  },

  /* ── Steel & Construction ── */
  {
    id: 'pipes-tubes',
    division: 'steel',
    title: 'Pipes & Tubes',
    description: 'Precision steel pipes and tubes for structural and industrial applications.',
    image: imgPipesTubes,
    types: ['MS Round Pipes', 'Square Tubes', 'Rectangular Tubes', 'GI Pipes'],
    features: ['IS-standard compliant', 'Hot-dip galvanized options', 'Precision-cut lengths', 'Bulk supply'],
    useCases: ['Building frames', 'Scaffolding', 'Fencing', 'Plumbing infrastructure'],
    brochureLink: '#',
  },
  {
    id: 'purlins',
    division: 'steel',
    title: 'Purlins',
    description: 'Structural purlins for roofing and wall cladding support systems.',
    image: imgPurlins,
    types: ['C-Purlins', 'Z-Purlins', 'Sigma Purlins'],
    features: ['Light-weight high-strength', 'Custom lengths', 'Pre-punched holes', 'Corrosion-resistant coating'],
    useCases: ['Warehouse roofs', 'Factory buildings', 'Pre-engineered buildings', 'Agricultural sheds'],
    brochureLink: '#',
  },
  {
    id: 'roofing',
    division: 'steel',
    title: 'Roofing',
    description: 'Metal roofing sheets and systems for durable, weather-resistant coverage.',
    image: imgRoofing,
    types: ['Trapezoidal Sheets', 'Standing Seam', 'Corrugated', 'Insulated Panels'],
    features: ['UV-resistant coating', 'Color options', 'Anti-drip membrane', 'Leak-proof joints'],
    useCases: ['Industrial roofing', 'Commercial complexes', 'Residential homes', 'Stadium canopies'],
    brochureLink: '#',
  },

  /* ── Fabrication & Interiors ── */
  {
    id: 'ss-fabrication',
    division: 'interiors',
    title: 'SS Fabrication',
    description: 'Custom stainless steel fabrication for architectural and commercial interiors.',
    image: imgSSFabrication,
    types: ['Railings & Balustrades', 'Canopies', 'Cladding', 'Custom Fixtures'],
    features: ['Mirror / satin finishes', 'TIG welding', 'CAD-precision design', 'Grade 304/316 steel'],
    useCases: ['Hotel lobbies', 'Shopping malls', 'Residential villas', 'Corporate offices'],
    brochureLink: '#',
  },
  {
    id: 'pantry-systems',
    division: 'interiors',
    title: 'Pantry Systems',
    description: 'Modular stainless steel pantry and kitchen systems for commercial use.',
    image: imgPantrySystems,
    types: ['Work Tables', 'Storage Racks', 'Exhaust Hoods', 'Sink Units'],
    features: ['Hygienic SS-304 grade', 'Modular assembly', 'Easy maintenance', 'Custom configurations'],
    useCases: ['Hotel kitchens', 'Hospital canteens', 'Corporate pantries', 'Catering units'],
    brochureLink: '#',
  },

  /* ── Energy ── */
  {
    id: 'solar-systems',
    division: 'energy',
    title: 'Solar Systems',
    description: 'Integrated solar energy systems for sustainable power generation.',
    image: imgSolar,
    types: ['On-Grid', 'Off-Grid', 'Hybrid', 'Solar Water Heaters'],
    features: ['Tier-1 panels', 'MPPT inverters', 'Remote monitoring', '25-year warranty'],
    useCases: ['Commercial rooftops', 'Residential homes', 'Industrial plants', 'Agricultural farms'],
    brochureLink: '#',
  },

  /* ── Lifestyle ── */
  {
    id: 'automobile-accessories',
    division: 'lifestyle',
    title: 'Automobile Accessories',
    description: 'Premium vehicle accessories for SUVs and off-road vehicles.',
    image: imgAutoAccessories,
    types: ['Roof Racks', 'Side Steps', 'Bull Bars', 'Cargo Carriers'],
    features: ['Heavy-duty construction', 'OEM-spec fitment', 'Powder-coated finish', 'Easy installation'],
    useCases: ['SUV customization', 'Off-road setups', 'Fleet vehicles', 'Adventure touring'],
    brochureLink: '#',
  },
  {
    id: 'wpc-decking',
    division: 'lifestyle',
    title: 'WPC Decking',
    description: 'Wood-plastic composite decking for durable, low-maintenance outdoor spaces.',
    image: imgWPCDecking,
    types: ['Solid Core', 'Hollow Core', 'Co-extruded', 'Capped Composite'],
    features: ['Termite-proof', 'UV-stabilized', 'Slip-resistant surface', 'Multiple wood-grain finishes'],
    useCases: ['Pool decks', 'Balcony flooring', 'Garden pathways', 'Restaurant terraces'],
    brochureLink: '#',
  },
];

/* ─── Filter Tabs ─── */
export const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'access', label: 'Access' },
  { id: 'steel', label: 'Steel' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'energy', label: 'Energy' },
  { id: 'lifestyle', label: 'Lifestyle' },
];
