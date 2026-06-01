import { PRODUCTS, DIVISIONS } from './productsData';

const DEFAULT_HIGHLIGHTS = [
  'Ensure high performance',
  'Durable, strong, and resistant',
  'Finest quality materials',
  'Best after-sales service',
];

const DETAIL_OVERRIDES = {
  'roller-doors': {
    sourceUrl: 'https://elcardo.com/portfolio/roller-door-3/',
    eyebrow: 'Australian technology roller doors',
    intro: 'Elcardo is the first roller door company in Sri Lanka to be awarded ISO status and manufactures roller doors and shutters with imported state-of-the-art machinery. The roller door range is built with Australian technology and designed for domestic and industrial use.',
    summary: [
      'Powder-coated zinc alum roller doors are designed for safety, speed, silent operation, strength, ventilation, and serviceability.',
      'The system supports remote control operation from approximately 100 ft and can be operated manually during power failures.',
    ],
    specs: [
      { label: 'Safety', value: 'Automatically stops and reverses when obstructed.' },
      { label: 'Speed', value: 'Door travel speed of 20 cm per second.' },
      { label: 'Warranty', value: '10 years for panels and 2 years for the motor, subject to terms.' },
      { label: 'Panel strength', value: 'High-tensile powder-coated zinc alum panels with 0.60 mm thickness.' },
      { label: 'Colours', value: 'Yellow, White, Teak, Silver, Natural Yellow, Marble Finish, Mahogany, Lazurite Blue, Green, Dark Green, Dark Brown, Brown, Black, and Grey.' },
    ],
    applications: ['Homes', 'Factories', 'Warehouses', 'Showrooms', 'Commercial openings'],
    highlights: ['Auto stop and reverse safety', 'Silent nylon belt edge operation', 'Manual mode during power failure', 'Ventilation hole options'],
  },
  'roller-shutters': {
    sourceUrl: 'https://elcardo.com/portfolio/roller-shutter/',
    eyebrow: 'Commercial and industrial shutters',
    intro: 'Elcardo supplies roller shutter doors for industrialists, commercial premises, and security-focused openings, with accessory manufacturing support and competitive supply for the shutter industry.',
    summary: [
      'The shutter range includes zinc-coated, polycarbonate, stainless steel grill, and colour bonded options.',
      'Side channels can use imported hard rubber beading to reduce rough shutter movement.',
    ],
    specs: [
      { label: 'Slats', value: 'Zinc-coated slats in 0.70 mm and 0.80 mm thickness.' },
      { label: 'Widths', value: '75 mm (3 inch) and 100 mm (4 inch) options.' },
      { label: 'Profile', value: 'Flat curve profile.' },
      { label: 'Safety', value: 'Automatic stop and reverse when obstructed on motorized systems.' },
      { label: 'Warranty', value: '10 years for panels and 2 years for the motor.' },
    ],
    applications: ['Retail shops', 'Banks', 'Pharmacies', 'Office buildings', 'Industrial entrances'],
    highlights: ['Security closure', 'Electric or manual operation', 'Colour bonded options', 'After-sales service'],
  },
  gates: {
    sourceUrl: 'https://elcardo.com/portfolio/sliding-gates/',
    eyebrow: 'Sliding, swing, retractable, and barrier gates',
    intro: 'Elcardo gate systems are customized for homes, offices, showrooms, industrial compounds, parking areas, and large public entrances. The range includes sliding gates, swing gates, retractable gates, and barrier gates.',
    summary: [
      'Sliding and swing gates can be built from stainless steel, galvanized steel, or other customer-specified materials.',
      'Retractable gates serve larger corporate, factory, shopping center, stadium, and industrial entries, while barrier gates control vehicle transit in parking and public access points.',
    ],
    specs: [
      { label: 'Automation', value: 'Remote control operation and motorized access control options.' },
      { label: 'Construction', value: 'Stainless steel, galvanized steel, aluminum, or custom material options.' },
      { label: 'Customization', value: 'Gate patterns, sizes, and standards can be customized for the site.' },
      { label: 'Retractable gates', value: 'Tracked or trackless designs with integrated drive and control units.' },
      { label: 'Barrier gates', value: 'Motor body and control unit in protected housings for frequent vehicle transit.' },
    ],
    applications: ['Residences', 'Gated communities', 'Factories', 'Car parks', 'Shopping centers'],
    highlights: ['Highly moderate remote systems', 'Custom design patterns', 'Automation accessories', 'Smooth heavy-gate movement'],
  },
  'sectional-doors': {
    eyebrow: 'Overhead sectional access',
    intro: 'Sectional doors extend the access automation range for openings that need overhead movement, clean interior clearance, and a more insulated closure format.',
    summary: [
      'Use sectional doors where energy efficiency, quiet operation, and a composed architectural finish matter.',
      'The product can be positioned for showrooms, garages, cold rooms, service bays, and commercial entrances.',
    ],
    specs: [
      { label: 'Formats', value: 'Insulated sandwich panel, glazed, flush panel, and ribbed panel options.' },
      { label: 'Operation', value: 'Balanced overhead movement with manual or automated control options.' },
      { label: 'Safety', value: 'Finger-trap protection and controlled travel can be specified.' },
      { label: 'Sizing', value: 'Custom opening sizes based on site requirements.' },
    ],
    applications: ['Fire stations', 'Showrooms', 'Cold storage', 'Residential garages'],
    highlights: ['Thermal insulation', 'Clean overhead movement', 'Custom panel finishes', 'Automation ready'],
  },
  'high-speed-doors': {
    eyebrow: 'Rapid industrial closures',
    intro: 'High-speed doors support high-traffic industrial spaces where fast opening cycles, environmental separation, and workflow efficiency are important.',
    summary: [
      'The range is suited to logistics, food processing, pharmaceutical, and automotive facilities.',
      'Motion sensors, inverter control, and self-repairing curtain options can support continuous industrial use.',
    ],
    specs: [
      { label: 'Door formats', value: 'PVC fabric, insulated spiral, clean room, and exterior types.' },
      { label: 'Speed', value: 'Rapid opening configurations for high-traffic environments.' },
      { label: 'Controls', value: 'Frequency inverter and sensor-based activation options.' },
      { label: 'Maintenance', value: 'Self-repairing formats can reduce downtime after impact.' },
    ],
    applications: ['Pharmaceutical plants', 'Food processing', 'Logistics centers', 'Automotive factories'],
    highlights: ['Fast cycle operation', 'Traffic flow control', 'Environmental separation', 'Industrial automation'],
  },
  'pipes-tubes': {
    sourceUrl: 'https://elcardo.com/portfolio/gi-pipe-box-bar/',
    eyebrow: 'Pre-galvanized tubes and box bars',
    intro: 'Elcardo pre-galvanized products include square tubes, rectangular tubes, and round tubes. Square and rectangular tubes are commonly referred to as box bars.',
    summary: [
      'The range is built for construction, fabrication, fencing, and general structural applications.',
      'Elcardo distinguishes tubes from pipes because they are manufactured and used differently.',
    ],
    specs: [
      { label: 'Tube formats', value: 'Square tubes, rectangular tubes, and round tubes.' },
      { label: 'Material', value: 'Pre-galvanized steel product range.' },
      { label: 'Use', value: 'Structural, fabrication, and construction applications.' },
    ],
    applications: ['Building frames', 'Scaffolding', 'Fencing', 'Plumbing infrastructure'],
    highlights: ['Pre-galvanized finish', 'Box bar range', 'Round tube options', 'Bulk supply'],
  },
  'stainless-steel-pipes': {
    sourceUrl: 'https://elcardo.com/portfolio/stainless-steel-pipes-tubes/',
    eyebrow: 'Polished stainless steel tubes',
    intro: 'Elcardo manufactures high-quality SUS 202 grit 600 polished stainless steel tubes and pipes using modern machinery at its factory.',
    summary: [
      'The stainless steel tube and pipe range is available in multiple sizes to meet customer requirements.',
      'The polished finish supports architectural, interior, railing, and commercial applications.',
    ],
    specs: [
      { label: 'Steel grade', value: 'SUS 202 and SUS 304 options in the catalog range.' },
      { label: 'Finish', value: 'Grit 600 polished finish.' },
      { label: 'Formats', value: 'Round pipes, tubes, and box bars.' },
      { label: 'Production', value: 'Manufactured using modern machinery.' },
    ],
    applications: ['Railings', 'Hotel fit-outs', 'Hospitals', 'Commercial interiors'],
    highlights: ['Polished finish', 'Corrosion resistance', 'Architectural grade', 'Size range availability'],
  },
  purlins: {
    sourceUrl: 'https://elcardo.com/portfolio/c-purlin/',
    eyebrow: 'Cee-Hi-Ten steel purlins',
    intro: 'Elcardo C purlins provide long spans between portal frames for commercial buildings and are roll formed to length with punched holes to match project specifications.',
    summary: [
      'The purlins are cold roll formed from hot-dipped zinc-coated high-strength steel strip and low-carbon black steel strip.',
      'They are suited to factories, warehouses, workshops, repair houses, showrooms, sports complexes, houses, sheds, service stations, rooftop extensions, and markets.',
    ],
    specs: [
      { label: 'Material', value: 'Black steel and galvanized steel.' },
      { label: 'Yield stress', value: '450 N/mm2.' },
      { label: 'Standard', value: 'JIS63302 56C440.' },
      { label: 'Tensile strength', value: '450 N/mm2.' },
      { label: 'Galvanized coating', value: '290.4 g/m2 total coating weight.' },
    ],
    applications: ['Factories', 'Warehouses', 'Workshops', 'Showrooms', 'Rooftop extensions'],
    highlights: ['Custom lengths', 'Pre-punched holes', 'Guaranteed performance', 'Long-span roof support'],
  },
  roofing: {
    sourceUrl: 'https://elcardo.com/portfolio/roofing-sheet/',
    eyebrow: 'Roofing sheets, tiles, gutters, and accessories',
    intro: 'Elcardo roofing sheets, cladding sheets, and gutters are manufactured from colour bonded steel in attractive colours. They are durable, strong, and thermally efficient.',
    summary: [
      'Roofing sheets are positioned for residential, industrial, and commercial roofing applications.',
      'The roofing solution range also includes roofing tiles, gutters, and roof gutter accessories.',
    ],
    specs: [
      { label: 'Material', value: '55% aluminium, 43.5% zinc, and 1.5% silicon alloy-coated high-tensile steel.' },
      { label: 'Coating', value: 'AZ150 coating.' },
      { label: 'Tensile strength', value: 'More than 550 N/mm2, Grade 550.' },
      { label: 'Surface finish', value: 'Matt and gloss finish options.' },
      { label: 'Gutters', value: 'Custom lengths with colour and non-colour bonded steel options.' },
    ],
    applications: ['Industrial roofing', 'Commercial complexes', 'Residential homes', 'Stadium canopies'],
    highlights: ['Weather-resistant coverage', 'Colour options', 'Thermally efficient steel', 'Roofing accessories available'],
  },
  'pre-engineered-buildings': {
    sourceUrl: 'https://elcardo.com/portfolio/pre-fabricated-buildings/',
    eyebrow: 'Design, fabrication, and installation',
    intro: 'Elcardo pre-engineered steel buildings cover design, fabrication, and installation of steel building systems, with project-specific layouts and economic design support.',
    summary: [
      'The steel building design is based on industrial standards BS 5950 and BS 6399.',
      'Applications include steel warehouses, workshops, factory buildings, hangars, poultry houses, and commercial steel buildings.',
    ],
    specs: [
      { label: 'Services', value: 'Design, fabrication, and installation.' },
      { label: 'Standards', value: 'BS 5950 and BS 6399 design references.' },
      { label: 'Structures', value: 'Warehouses, workshops, factories, hangars, poultry houses, and commercial buildings.' },
      { label: 'Execution', value: 'Built to customer specifications and requirements.' },
    ],
    applications: ['Factories', 'Warehouses', 'Workshops', 'Commercial buildings', 'Hangars'],
    highlights: ['Custom steel structures', 'Fast installation', 'Industrial-grade materials', 'Professional execution'],
  },
  'ss-fabrication': {
    eyebrow: 'Custom stainless steel fabrication',
    intro: 'Elcardo fabricates stainless steel architectural and commercial items for practical use, durability, and clean presentation in demanding environments.',
    summary: [
      'The fabrication capability supports canopies, tables, cupboards, chafing dishes, kitchen tables, display fixtures, and custom commercial items.',
      'Mirror, satin, and polished finishes can be selected depending on the final application.',
    ],
    specs: [
      { label: 'Materials', value: 'Stainless steel grades and finishes selected by requirement.' },
      { label: 'Work scope', value: 'Design, fabrication, and custom fit-out items.' },
      { label: 'Finishes', value: 'Mirror, hairline, satin, and polished finish options.' },
    ],
    applications: ['Hotel lobbies', 'Shopping malls', 'Residential villas', 'Corporate offices'],
    highlights: ['Custom fixtures', 'Commercial-grade durability', 'Precision fabrication', 'Premium stainless finish'],
  },
  'pantry-systems': {
    sourceUrl: 'https://elcardo.com/portfolio/stainless-steel-pantry-cupboards/',
    eyebrow: 'Stainless steel and ECO board pantry systems',
    intro: 'Elcardo designs and fabricates customized kitchens, pantry cupboards, and kitchen appliances such as exhaust canopies, food trolleys, tables, cupboards, chafing dishes, and kitchen tables.',
    summary: [
      'Stainless steel pantry systems are low-maintenance, rust-proof, stain resistant, non-porous, and suitable for hygienic kitchen environments.',
      'ECO board pantry cupboards offer water resistance, termite protection, easy cleaning, smooth surfaces, and anti-crack performance.',
    ],
    specs: [
      { label: 'Stainless pantry', value: 'Low maintenance, rust-proof, stain resistant, and hygienic.' },
      { label: 'ECO board', value: 'Water resistant, termite resistant, easy to maintain, and anti-crack.' },
      { label: 'Customization', value: 'Can mix granite, glass, or wood where required.' },
      { label: 'Appliances', value: 'Exhaust canopies, food trolleys, tables, cupboards, and chafing dishes.' },
    ],
    applications: ['Hotel kitchens', 'Hospital canteens', 'Corporate pantries', 'Catering units', 'Homes'],
    highlights: ['Custom pantry design', 'Hygienic materials', 'Granite and glass options', 'Commercial kitchen fixtures'],
  },
  'granite-countertops': {
    sourceUrl: 'https://elcardo.com/portfolio/granite-countertops/',
    eyebrow: 'Granite, stone, and quartz worktops',
    intro: 'Elcardo premium stone selection offers over 100 colours for kitchen, bathroom, pantry, and commercial countertop requirements.',
    summary: [
      'The range includes granite, marble, travertine, limestone, slate, Q Premium Natural Quartz, and NeuStone options based on customer requirements.',
      'NeuStone is positioned as a prefabricated stone substitute for granite with non-porous and easy-care properties.',
    ],
    specs: [
      { label: 'Colour range', value: 'Over 100 stone colour options.' },
      { label: 'Materials', value: 'Granite, marble, travertine, limestone, slate, quartz, and NeuStone.' },
      { label: 'Performance', value: 'Non-toxic, stain resistant, chemical resistant, and easy to clean.' },
      { label: 'Customization', value: 'Slabs can be customized for length and project use.' },
    ],
    applications: ['Homes', 'Hotels', 'Restaurants', 'Showrooms', 'Bathrooms'],
    highlights: ['Premium stone selection', 'Custom sizing', 'Non-porous surfaces', 'Large colour range'],
  },
  'solar-systems': {
    sourceUrl: 'https://elcardo.com/',
    eyebrow: 'Residential and commercial solar power',
    intro: 'Elcardo Elsolar supports residential and commercial solar power systems designed to reduce utility costs, improve property value, and support long-term energy savings.',
    summary: [
      'Solar consultants can advise customers on savings and return on investment for home or commercial installations.',
      'Residential systems can reduce or zero out electricity bills depending on project conditions and energy use.',
    ],
    specs: [
      { label: 'System types', value: 'On-grid, off-grid, hybrid, and solar water heater options.' },
      { label: 'Monitoring', value: 'Remote monitoring can be included in the solution.' },
      { label: 'Equipment', value: 'Panel and inverter choices depend on final project design.' },
    ],
    applications: ['Commercial rooftops', 'Residential homes', 'Industrial plants', 'Agricultural farms'],
    highlights: ['Energy cost reduction', 'Long-term savings', 'Residential and commercial options', 'Consultation-led design'],
  },
  'automobile-accessories': {
    sourceUrl: 'https://elcardo.com/',
    eyebrow: 'Exclusive automobile accessories',
    intro: 'Elcardo Trading supplies automobile accessories that upgrade the value and appearance of luxury vehicles.',
    summary: [
      'The product range supports SUV customization, off-road setups, fleet vehicles, and adventure touring.',
      'Heavy-duty construction and fitment-focused selection keep the range practical for local vehicle needs.',
    ],
    specs: [
      { label: 'Product types', value: 'Roof racks, side steps, bull bars, and cargo carriers.' },
      { label: 'Finish', value: 'Powder-coated and heavy-duty options.' },
      { label: 'Fitment', value: 'Vehicle-specific selection based on customer requirement.' },
    ],
    applications: ['SUV customization', 'Off-road setups', 'Fleet vehicles', 'Adventure touring'],
    highlights: ['Vehicle value upgrade', 'Heavy-duty construction', 'OEM-style fitment', 'Premium accessories'],
  },
  'wpc-decking': {
    sourceUrl: 'https://elcardo.com/portfolio/wooden-flooring/',
    eyebrow: 'Wood plastic composite decking',
    intro: 'Elcardo WPC decking products are wood-plastic composite panels designed to replace natural wood while saving forest resources through recycled wood or bamboo fiber, plastic, and additives.',
    summary: [
      'The product looks and feels like natural timber and supports pool decks, balconies, garden pathways, and outdoor entertaining areas.',
      'WPC decking is positioned as a maintenance-free, termite-proof alternative to natural timber in outdoor applications.',
    ],
    specs: [
      { label: 'Material', value: 'Recycled wood or bamboo fiber, plastic, and chemical additives.' },
      { label: 'Core type', value: 'Solid core and hollow core options available.' },
      { label: 'Sustainability', value: 'Designed to reduce natural wood usage.' },
      { label: 'Finish', value: 'Natural timber look and feel with slip-resistant surface.' },
    ],
    applications: ['Pool decks', 'Balcony flooring', 'Garden pathways', 'Restaurant terraces', 'Outdoor entertainment areas'],
    highlights: ['Termite-proof', 'Natural timber appearance', 'UV-stabilized colour', 'Slip-resistant surface'],
  },

  'polycarbonate-doors': {
    eyebrow: 'Transparent panel door systems',
    intro: 'Elcardo polycarbonate doors combine security with natural light transmission, offering transparent closures for showrooms, workshops, agricultural buildings, and commercial spaces.',
    summary: [
      'Clear or tinted polycarbonate panels allow natural light to penetrate while maintaining a secure and weather-resistant closure.',
      'Available in single-wall and multi-wall polycarbonate formats to suit different insulation and impact requirements.',
    ],
    specs: [
      { label: 'Panel material', value: 'Polycarbonate — single-wall and multi-wall options.' },
      { label: 'Light transmission', value: 'High natural light transmission through transparent panels.' },
      { label: 'UV protection', value: 'UV-protective coating on panel surface.' },
      { label: 'Frame material', value: 'Aluminum or galvanized steel frame options.' },
      { label: 'Operation', value: 'Manual or motorized options available.' },
    ],
    applications: ['Showrooms', 'Workshops', 'Agricultural buildings', 'Commercial entrances', 'Greenhouses'],
    highlights: ['High light transmission', 'Impact resistant', 'UV protective coating', 'Lightweight construction'],
  },

  'fire-doors': {
    eyebrow: 'Fire-rated access and egress systems',
    intro: 'Elcardo fire doors are tested and certified to withstand fire penetration for specified durations, protecting life and property in commercial and industrial facilities.',
    summary: [
      'Fire-rated roller shutters and door sets are available to specified fire resistance durations for compartmentalizing buildings and protecting egress routes.',
      'Intumescent seals and smoke containment features ensure the system performs under emergency conditions.',
    ],
    specs: [
      { label: 'Fire ratings', value: '1-hour and 2-hour fire resistance options.' },
      { label: 'Seal type', value: 'Intumescent seals activated by heat.' },
      { label: 'Smoke control', value: 'Smoke containment at door perimeter.' },
      { label: 'Emergency release', value: 'Manual release and fail-safe drop mechanisms.' },
      { label: 'Standards', value: 'Tested to applicable fire door standards.' },
    ],
    applications: ['Industrial plants', 'High-rise buildings', 'Hospitals', 'Data centers', 'Stairwells and corridors'],
    highlights: ['Certified fire ratings', 'Intumescent seals', 'Smoke containment', 'Emergency release systems'],
  },

  'wpc-cladding': {
    eyebrow: 'Wood plastic composite wall cladding',
    intro: 'Elcardo WPC wall cladding delivers the natural beauty of timber with the durability of composite materials for exterior facades and interior feature wall applications.',
    summary: [
      'WPC cladding boards install horizontally or vertically to create contemporary timber-look facades without painting, sealing, or ongoing maintenance.',
      'The composite core resists moisture, insects, and UV degradation, making it suitable for Sri Lanka\'s tropical climate.',
    ],
    specs: [
      { label: 'Material', value: 'Wood-plastic composite — moisture and termite resistant.' },
      { label: 'Finish', value: 'Natural wood-grain texture in multiple colour options.' },
      { label: 'Installation', value: 'Horizontal and vertical panel orientation options.' },
      { label: 'Maintenance', value: 'No painting, sealing, or staining required.' },
      { label: 'Options', value: 'Fire-retardant grades available on request.' },
    ],
    applications: ['Commercial building facades', 'Residential exterior walls', 'Retail shopfronts', 'Hotel feature walls', 'Interior accent walls'],
    highlights: ['Weather and moisture resistant', 'No painting required', 'UV-stabilized colour', 'Wide wood-grain finish range'],
  },

  'wpc-fencing': {
    eyebrow: 'WPC privacy and decorative fencing',
    intro: 'Elcardo WPC fencing systems deliver lasting privacy and decorative boundary definition without the rot, warp, or paint demands of natural timber fencing.',
    summary: [
      'WPC fence panels install on steel or aluminum posts with simple clip systems and require no ongoing surface treatment.',
      'The composite material is termite-proof, UV-stabilized, and designed for the humidity and heat of tropical environments.',
    ],
    specs: [
      { label: 'Material', value: 'Wood-plastic composite — rot, termite, and moisture resistant.' },
      { label: 'Post system', value: 'Steel or aluminum post and rail options.' },
      { label: 'Panel heights', value: 'Available in multiple panel heights to suit privacy requirements.' },
      { label: 'Maintenance', value: 'No painting, staining, or sealing required.' },
      { label: 'UV stability', value: 'UV-stabilized colour maintained over service life.' },
    ],
    applications: ['Residential gardens', 'Commercial boundaries', 'Pool surrounds', 'Public recreational spaces', 'Hotel and resort perimeters'],
    highlights: ['Rot and termite proof', 'Low maintenance', 'UV-stabilized colour', 'Easy panel installation'],
  },

  'wpc-architectural': {
    eyebrow: 'WPC louvers, fins, railings, and elements',
    intro: 'Elcardo architectural WPC elements — louvers, fins, railings, skirting, and landscape panels — bring cohesive timber-look detailing to facades, interiors, and outdoor environments.',
    summary: [
      'WPC louvers and fins are used on building facades to create shadow, privacy screening, and visual rhythm while the composite resists weather and requires no maintenance.',
      'WPC railings and skirting complete interior and exterior applications with a consistent timber aesthetic across the full design language.',
    ],
    specs: [
      { label: 'Products', value: 'Louvers, fins, railings, skirting boards, and landscape panels.' },
      { label: 'Material', value: 'Structural wood-plastic composite core.' },
      { label: 'Lengths', value: 'Custom lengths available to suit project requirements.' },
      { label: 'Profiles', value: 'Flat, ribbed, and custom profiles available.' },
      { label: 'Finish', value: 'Natural wood-grain texture, multiple colour options.' },
    ],
    applications: ['Building facade screens', 'Interior feature elements', 'Balcony railings', 'Garden structures', 'Landscape design'],
    highlights: ['Consistent timber appearance', 'Structural composite core', 'Custom lengths and profiles', 'Low-maintenance finish'],
  },

  'exterior-cladding': {
    eyebrow: 'Exterior wall cladding and facade systems',
    intro: 'Elcardo exterior cladding systems provide durable, weather-resistant wall finishes and contemporary architectural aesthetics for commercial and industrial building envelopes.',
    summary: [
      'Architectural facade cladding systems are available in metal, composite, and sheet formats to suit different design and performance requirements.',
      'Cladding systems protect the building structure from moisture, UV, and thermal cycling while contributing to the visual identity of the building.',
    ],
    specs: [
      { label: 'Materials', value: 'Metal, composite, and cladding sheet options.' },
      { label: 'Weather resistance', value: 'Designed for tropical climate exposure.' },
      { label: 'Thermal performance', value: 'Insulated cladding options available.' },
      { label: 'Colour', value: 'Custom colour options for project specification.' },
      { label: 'Installation', value: 'Panel and rail fixing system.' },
    ],
    applications: ['Commercial buildings', 'Industrial facades', 'Retail complexes', 'Institutional buildings', 'Mixed-use developments'],
    highlights: ['Weather-resistant materials', 'Custom colour options', 'Lightweight panel systems', 'Thermal performance'],
  },

  'fencing-systems': {
    eyebrow: 'Residential and industrial fencing',
    intro: 'Elcardo fencing systems provide boundary definition and perimeter security for residential, commercial, and industrial properties across metal, wire, and composite material options.',
    summary: [
      'The fencing range spans residential decorative styles through to heavy industrial security fencing with anti-climb profiles and reinforced panels.',
      'All systems are available in corrosion-resistant finishes to support long service life in outdoor environments.',
    ],
    specs: [
      { label: 'Materials', value: 'Metal, galvanized steel, wire, and security mesh.' },
      { label: 'Applications', value: 'Residential, commercial, industrial, and government sites.' },
      { label: 'Heights', value: 'Multiple fence heights available to project requirement.' },
      { label: 'Anti-climb', value: 'Anti-climb profiles available for security applications.' },
      { label: 'Finish', value: 'Powder coated and galvanized options.' },
    ],
    applications: ['Residential properties', 'Factory compounds', 'Government and institutional sites', 'Commercial premises', 'Schools and parks'],
    highlights: ['Multiple material options', 'Anti-climb security designs', 'Corrosion-resistant finishes', 'Modular panel systems'],
  },

  'nuestone-surfaces': {
    eyebrow: 'NueStone artificial stone surfaces',
    intro: 'NueStone is Elcardo\'s prefabricated artificial stone surface — engineered to replicate premium granite with superior colour uniformity, non-porous performance, and effortless maintenance.',
    summary: [
      'NueStone is positioned as a prefabricated stone substitute for granite offering non-porous, easy-care properties across kitchen, bathroom, pantry, and commercial countertop applications.',
      'The consistent colour and texture uniformity of NueStone allows specifiers to plan surfaces with predictable results across large projects.',
    ],
    specs: [
      { label: 'Surface type', value: 'Prefabricated artificial stone.' },
      { label: 'Porosity', value: 'Non-porous — no sealing required.' },
      { label: 'Chemical resistance', value: 'Resistant to common household and commercial chemicals.' },
      { label: 'Stain resistance', value: 'High stain resistance for kitchen and pantry environments.' },
      { label: 'Applications', value: 'Kitchen tops, pantry tops, bathroom vanities, commercial counters.' },
    ],
    applications: ['Pantry and kitchen surfaces', 'Bathroom vanity tops', 'Commercial countertops', 'Hospitality interiors', 'Office fit-outs'],
    highlights: ['Non-porous surface', 'Stain and chemical resistant', 'Consistent colour uniformity', 'Hygienic easy-care finish'],
  },

  'wire-mesh': {
    eyebrow: 'Industrial wire and mesh products',
    intro: 'Elcardo wire and mesh products serve perimeter security, agricultural, construction, and industrial separation applications with a range of wire gauges and mesh apertures.',
    summary: [
      'The range includes PVC-coated wire mesh, barbed wire, security mesh, and galvanized wire fencing products in bulk roll supply.',
      'Corrosion-resistant coatings extend product service life in outdoor and coastal environments.',
    ],
    specs: [
      { label: 'Products', value: 'PVC mesh, barbed wire, security mesh, wire fencing, galvanized wire.' },
      { label: 'Wire gauges', value: 'Multiple wire gauges to suit application load and security requirements.' },
      { label: 'Apertures', value: 'Range of mesh aperture sizes available.' },
      { label: 'Coating', value: 'PVC-coated and galvanized options.' },
      { label: 'Supply format', value: 'Bulk rolls — volume orders for trade and project supply.' },
    ],
    applications: ['Security perimeters', 'Agricultural fencing', 'Industrial separation', 'Construction site enclosures', 'Garden fencing'],
    highlights: ['Corrosion-resistant coatings', 'Multiple mesh apertures', 'High-tensile wire options', 'Bulk roll supply'],
  },

  'aluminum-products': {
    eyebrow: 'Aluminium profiles and architectural components',
    intro: 'Elcardo aluminium slats, profiles, and powder-coated architectural components serve decorative facades, louvre screens, interior fit-outs, and architectural cladding applications.',
    summary: [
      'The aluminum product range spans extruded profiles and flat slats for louvre screens, facade cladding, and decorative architectural panel systems.',
      'Powder-coated finishes in custom colours allow aluminum components to integrate seamlessly with any project palette.',
    ],
    specs: [
      { label: 'Products', value: 'Aluminum slats, profiles, and powder-coated components.' },
      { label: 'Material', value: 'Extruded aluminum alloy.' },
      { label: 'Finish', value: 'Powder-coated in custom colour options.' },
      { label: 'Corrosion resistance', value: 'Inherently corrosion-resistant aluminum alloy.' },
      { label: 'Applications', value: 'Facades, louvre screens, interior fit-outs, decorative cladding.' },
    ],
    applications: ['Architectural facades', 'Louvre privacy screens', 'Interior fit-outs', 'Decorative cladding', 'Commercial interiors'],
    highlights: ['Lightweight and strong', 'Powder-coated finish', 'Corrosion resistant', 'Custom profile extrusions'],
  },

  'roller-door-components': {
    eyebrow: 'Roller door hardware and spare parts',
    intro: 'Elcardo supplies a complete range of roller door components — torsion springs, guide rails, drum wheels, bottom bars, nylon wheels, pipe holders, weather seals, control boxes, and remote systems — for new installations and service work.',
    summary: [
      'Trade and contractor supply of genuine roller door components supports the full service lifecycle from new installation through scheduled maintenance and emergency repair.',
      'Control boxes, remote systems, and spring clamps are stocked for rapid-response service on residential and commercial roller door systems.',
    ],
    specs: [
      { label: 'Mechanical parts', value: 'Torsion springs, drum wheels, bottom bars, guide rails, nylon wheels.' },
      { label: 'Fixings', value: 'Pipe holders, spring clamps, weather seals, and fasteners.' },
      { label: 'Automation parts', value: 'Control boxes, remote systems, and motor accessories.' },
      { label: 'Supply', value: 'Trade, contractor, and bulk project supply.' },
      { label: 'Compatibility', value: 'Components selected to match system type and opening size.' },
    ],
    applications: ['Roller door service and repair', 'New system installations', 'Trade and contractor supply', 'Industrial service programs'],
    highlights: ['Complete component range', 'Automation parts stocked', 'Trade and bulk supply', 'Wide system compatibility'],
  },
};

export const PRODUCT_DETAILS = PRODUCTS.map((product) => {
  const division = DIVISIONS.find((item) => item.id === product.division);
  const override = DETAIL_OVERRIDES[product.id] || {};

  return {
    ...product,
    divisionName: division?.name || product.division,
    eyebrow: override.eyebrow || product.title,
    intro: override.intro || product.description,
    summary: override.summary || [product.description],
    specs: override.specs || product.features.map((feature) => ({ label: feature, value: feature })),
    applications: override.applications || product.useCases,
    highlights: override.highlights || product.features || DEFAULT_HIGHLIGHTS,
    sourceUrl: override.sourceUrl || '',
  };
});

export function getProductDetail(productId) {
  return PRODUCT_DETAILS.find((product) => product.id === productId);
}

export function getRelatedProducts(productId, limit = 3) {
  const product = getProductDetail(productId);
  if (!product) return [];

  return PRODUCT_DETAILS
    .filter((item) => item.id !== productId && item.division === product.division)
    .slice(0, limit);
}
