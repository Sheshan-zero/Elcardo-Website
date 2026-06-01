/* ============================================================
   PRODUCT PAGE DATA — Rich page content for all 15 product pages
   ============================================================ */

/* ─── Access & Automation ─── */
import imgRollerDoors from '../assets/prod_roller_doors.png';
import imgShutterProd from '../assets/prod_roller_shutters.png';
import imgShutterSec  from '../assets/rg_security.png';
import imgShutterWh   from '../assets/rg_warehouse.png';

import imgGatesProd   from '../assets/prod_gates.png';
import imgGatesRes    from '../assets/project_residential_gate.png';
import imgGatesCom    from '../assets/project_commercial_gate.png';
import imgRGHero      from '../assets/rg_hero.png';

import imgSectional   from '../assets/prod_sectional_doors.png';
import imgHighSpeed   from '../assets/prod_highspeed_doors.png';

/* ─── Steel & Construction ─── */
import imgPipes       from '../assets/prod_pipes_tubes.png';
import imgSteelProd   from '../assets/product_steel.png';
import imgSteelCine   from '../assets/about_cinematic_steel.png';

import imgPurlins     from '../assets/prod_purlins.png';
import imgBuilding    from '../assets/sketch_building.png';

import imgRoofing     from '../assets/product_roofing.png';

/* ─── Fabrication & Interiors ─── */
import imgSSFab       from '../assets/prod_ss_fabrication.png';
import imgSSProject   from '../assets/project_steel_fabrication.png';
import imgHotel       from '../assets/company_hotel.png';

import imgPantry      from '../assets/prod_pantry_systems.png';
import imgPantryCtx   from '../assets/company_pantry.png';

/* ─── Energy ─── */
import imgSolar       from '../assets/product_solar.png';
import imgSolarRoof   from '../assets/project_solar_roof.png';
import imgSolarFarm   from '../assets/story_solar_farm.png';
import imgSolarInst   from '../assets/project_solar_install.png';
import imgSolarField  from '../assets/hero_solar_field.png';

/* ─── Lifestyle ─── */
import imgAuto        from '../assets/prod_auto_accessories.png';
import imgAutoCtx     from '../assets/company_automotive.png';
import imgAutoInno    from '../assets/innovation_automotive.png';

import imgWPC         from '../assets/prod_wpc_decking.png';
import imgWPCDeck     from '../assets/project_luxury_decking.png';
import imgWood        from '../assets/product_wood.png';

/* ============================================================
   DATA MAP — keyed by product id
   ============================================================ */
export const PRODUCT_PAGE_DATA = {

  /* ══════════════════════════════════════════════════════════
     ACCESS & AUTOMATION
  ══════════════════════════════════════════════════════════ */

  'roller-shutters': {
    heroBg: imgShutterWh,
    heroPrimary: 'Roller Shutters.',
    heroSecondary: 'Security, built in.',
    heroBody: 'From retail storefronts to industrial bays — Elcardo roller shutters are engineered for heavy daily use and maximum overnight protection.',
    overviewCards: [
      { title: 'Retail', desc: 'Reliable overnight closure for storefronts, pharmacies, and banks. Visible, compact, and easy to operate every day.', stat: '0.8mm', statLbl: 'Steel Thickness', img: imgShutterSec },
      { title: 'Commercial', desc: 'Consistent protection for office buildings, showrooms, and business premises with demanding daily opening cycles.', stat: '10yr', statLbl: 'Panel Warranty', img: imgShutterProd },
      { title: 'Industrial', desc: 'Heavy-gauge shutters for warehouses and factories built to withstand rough operational environments and large spans.', stat: '100mm', statLbl: 'Max Slat Width', img: imgShutterWh },
    ],
    variants: [
      { title: 'Zinc Coated', desc: 'Galvanized steel slats with flat curve profile and anti-corrosion coating. The standard for commercial security closures.', badge: 'GALVANIZED · STANDARD', objPos: 'left center' },
      { title: 'Polycarbonate', desc: 'Translucent panels that allow natural light and visibility during closed periods. Popular for showrooms and retail.', badge: 'POLYCARBONATE · TRANSPARENT', objPos: 'center center' },
      { title: 'SS Grill', desc: 'Stainless steel grill format offering ventilation and security simultaneously. Ideal for pharmacies and boutiques.', badge: 'STAINLESS · GRILL', objPos: 'right center' },
    ],
    features: [
      { label: 'Security', title: 'Built\nto resist.', desc: 'Interlocked steel slats with reinforced bottom rail and side channels are designed to resist forced entry and casual intrusion across commercial premises.', stat1: 'Class 3', stat1Label: 'Burglar Resistance', stat2: '0.8mm', stat2Label: 'Slat Thickness', img: imgShutterSec },
      { label: 'Automation', title: 'Motor\ndriven.', desc: 'Electric motor with automatic stop and reverse on obstruction. Hard rubber beading in side channels reduces rough movement and noise on every cycle.', stat1: '240V', stat1Label: 'Motor Supply', stat2: 'Auto', stat2Label: 'Obstacle Reverse', img: imgShutterProd },
      { label: 'Finish', title: 'Colour\nbonded.', desc: 'Zinc coated, colour bonded, and polycarbonate options allow the shutter to match any commercial aesthetic while maintaining full protection.', stat1: '75–100mm', stat1Label: 'Slat Widths', stat2: '4+', stat2Label: 'Finish Types', img: imgShutterWh },
    ],
    stats: [
      { num: '0.8mm', label: 'Slat Thickness' },
      { num: '10yr', label: 'Panel Warranty' },
      { num: '2yr', label: 'Motor Warranty' },
      { num: '4+', label: 'Slat Finishes' },
    ],
    keyTech: {
      title: 'Engineered for daily commercial demands.',
      body: 'Elcardo roller shutters combine anti-corrosion coatings, motor-driven automation, and premium slat profiles to deliver consistent performance across high-cycle commercial installations.',
      items: [
        { title: 'Anti-Corrosion Coating', body: 'Zinc-coated galvanized slats resist rust and chemical exposure in both coastal and industrial environments.' },
        { title: 'Auto-Stop Safety', body: 'Motorized systems include automatic stop and reverse when the shutter detects any obstruction during travel.' },
        { title: 'Rubber Bead Side Channels', body: 'Imported hard rubber beading in side channels significantly reduces noise and rough movement during daily operation.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Slat material', 'Zinc-coated steel / Polycarbonate / SS Grill'],
        ['Slat width', '75 mm and 100 mm options'],
        ['Slat thickness', '0.70 mm and 0.80 mm'],
        ['Slat profile', 'Flat curve'],
        ['Operation', 'Electric motorized or manual'],
        ['Warranty (panels)', '10 years'],
        ['Warranty (motor)', '2 years'],
      ],
      'Automation': [
        ['Motor type', 'Electric roller shutter motor'],
        ['Power supply', '240V AC'],
        ['Safety', 'Auto stop and reverse on obstruction'],
        ['Manual override', 'Available during power failure'],
        ['Side channel', 'Imported hard rubber beading'],
      ],
      'Construction': [
        ['Bottom rail', 'Reinforced steel'],
        ['Side channels', 'Galvanized steel'],
        ['Hood casing', 'Galvanized / powder coated'],
        ['Fixing', 'Wall or lintel mount'],
        ['Max dimensions', 'Available on enquiry'],
      ],
    },
    ctaHeadline: 'Secure your\nspace.',
    ctaSub: 'Tell us your opening size, application, and preferred finish. Our team will design the right shutter for your site.',
  },

  'gates': {
    heroBg: imgGatesRes,
    heroPrimary: 'Gates.',
    heroSecondary: 'Access, controlled.',
    heroBody: 'Sliding gates, swing gates, retractable barriers, and automated systems — crafted to manage access at homes, offices, and industrial compounds.',
    overviewCards: [
      { title: 'Residential', desc: 'Custom sliding and swing gates for homes and gated communities. Automated for daily convenience and perimeter security.', stat: 'Remote', statLbl: 'Control Ready', img: imgGatesRes },
      { title: 'Commercial', desc: 'Heavy-duty gates for showrooms, offices, and corporate compounds. Designed for smooth, high-cycle operation and controlled access.', stat: '100ft', statLbl: 'Remote Range', img: imgGatesCom },
      { title: 'Industrial', desc: 'Retractable and barrier gates for factories and large facilities requiring controlled vehicle access at perimeter entry points.', stat: 'Custom', statLbl: 'Size & Pattern', img: imgGatesProd },
    ],
    variants: [
      { title: 'Sliding Gates', desc: 'Track-guided sliding gates for narrow driveways and tight spaces. Available in automation-ready configurations.', badge: 'SLIDING · TRACK GUIDED', objPos: 'left center' },
      { title: 'Swing Gates', desc: 'Hinged swing gates for residential and commercial entrances. Single and double leaf configurations available.', badge: 'SWING · SINGLE/DOUBLE', objPos: 'center center' },
      { title: 'Retractable Gates', desc: 'Large opening gates for stadiums, factory compounds, and industrial sites. Tracked or trackless with drive units.', badge: 'RETRACTABLE · HEAVY DUTY', objPos: 'center right' },
      { title: 'Barrier Gates', desc: 'Motorized boom barriers for parking areas, fuel stations, and controlled public access points.', badge: 'BARRIER · VEHICLE CONTROL', objPos: 'right center' },
    ],
    features: [
      { label: 'Automation', title: 'Smart\naccess.', desc: 'Remote control operation, motion sensors, and access control integration allow seamless daily use for homes and businesses alike.', stat1: '100ft', stat1Label: 'Remote Range', stat2: 'Smart', stat2Label: 'Control Options', img: imgGatesRes },
      { label: 'Construction', title: 'Built\nto last.', desc: 'Stainless steel, galvanized steel, or aluminum construction options ensure the gate suits the environmental and aesthetic requirements.', stat1: 'SS / GI', stat1Label: 'Material Options', stat2: 'Custom', stat2Label: 'Design Patterns', img: imgGatesCom },
      { label: 'Custom Design', title: 'Made\nfor your site.', desc: 'Gate patterns, dimensions, and construction standards can all be customized to meet the specific requirements of the project.', stat1: 'Custom', stat1Label: 'Opening Width', stat2: 'Any', stat2Label: 'Finish Available', img: imgRGHero },
    ],
    stats: [
      { num: '4+', label: 'Gate Types' },
      { num: 'Remote', label: 'Automation Ready' },
      { num: 'Custom', label: 'Pattern Options' },
      { num: '100ft', label: 'Control Range' },
    ],
    keyTech: {
      title: 'Automation meets custom craftsmanship.',
      body: 'Elcardo gate systems combine smart automation with site-specific construction — delivering gates that perform reliably at every scale, from residential to industrial.',
      items: [
        { title: 'Remote Control Systems', body: 'Multi-channel RF remote systems allow operation from inside the vehicle, with intercom and access control options available.' },
        { title: 'Safety Sensors', body: 'Loop detectors, photocells, and safety edges prevent accidental gate closure against vehicles or pedestrians.' },
        { title: 'Heavy Gate Drive', body: 'Precision motor drive systems manage large and heavy gates smoothly, with controlled travel speed and soft-start/stop.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Gate types', 'Sliding, Swing, Retractable, Barrier'],
        ['Materials', 'Stainless steel, galvanized steel, aluminium'],
        ['Automation', 'Remote control, motorized, access control'],
        ['Remote range', 'Approximately 100 ft'],
        ['Custom patterns', 'Available on request'],
        ['Applications', 'Residential, commercial, industrial'],
      ],
      'Automation': [
        ['Drive system', 'Motor body with control unit'],
        ['Remote', 'RF multi-channel remote control'],
        ['Safety', 'Photocell and safety edge options'],
        ['Access control', 'Intercom and card reader options'],
        ['Manual override', 'Manual release in power failure'],
      ],
      'Construction': [
        ['Frame', 'Stainless steel or galvanized steel'],
        ['Infill', 'Steel bar, flat plate, or custom pattern'],
        ['Finish', 'Powder coated or polished stainless'],
        ['Track (sliding)', 'Embedded or surface rail options'],
        ['Customization', 'Sizes, patterns, and materials bespoke'],
      ],
    },
    ctaHeadline: 'Design your\ngate.',
    ctaSub: 'Share your site requirements, dimensions, and preferred style. We\'ll engineer the right access solution.',
  },

  'sectional-doors': {
    heroBg: imgSectional,
    heroPrimary: 'Sectional / Overhead Doors.',
    heroSecondary: 'Overhead access, refined.',
    heroBody: 'Insulated overhead sectional doors for showrooms, garages, cold storage, and fire stations — full opening width with clean overhead movement.',
    overviewCards: [
      { title: 'Showrooms', desc: 'Glazed and flush sectional doors creating a premium front face for automotive dealerships and commercial showrooms.', stat: 'Glazed', statLbl: 'Visibility Option', img: imgSectional },
      { title: 'Cold Storage', desc: 'Insulated sandwich panel doors maintaining temperature integrity in cold rooms and food-processing facilities.', stat: '40mm', statLbl: 'Insulation Panel', img: imgSectional },
      { title: 'Residential Garages', desc: 'Smooth overhead movement for attached garages. Spring-balanced for light manual operation and automation compatibility.', stat: 'Spring', statLbl: 'Balanced System', img: imgSectional },
    ],
    variants: [
      { title: 'Insulated Sandwich', desc: 'Double-skin steel panel with foam core for thermal and acoustic insulation in temperature-sensitive openings.', badge: 'INSULATED · THERMAL', objPos: 'left center' },
      { title: 'Glazed', desc: 'Framed sections with glass or polycarbonate inserts providing natural light and transparency for commercial fronts.', badge: 'GLAZED · COMMERCIAL', objPos: 'center center' },
      { title: 'Flush Panel', desc: 'Smooth-face steel sections giving a clean contemporary appearance for residential and commercial garage doors.', badge: 'FLUSH · RESIDENTIAL', objPos: 'center right' },
      { title: 'Ribbed Panel', desc: 'Horizontal ribbed steel sections providing rigidity and a distinctive industrial aesthetic with high cycle rating.', badge: 'RIBBED · INDUSTRIAL', objPos: 'right center' },
    ],
    features: [
      { label: 'Insulation', title: 'Thermal\nperformance.', desc: 'Foam-filled sandwich panels deliver measurable thermal efficiency, reducing energy costs in temperature-controlled and climate-sensitive spaces.', stat1: '40mm', stat1Label: 'Panel Thickness', stat2: 'Low', stat2Label: 'Heat Transfer', img: imgSectional },
      { label: 'Safety', title: 'Finger-trap\nprotection.', desc: 'Sectional panel jointing is designed with pinch-safe profiles, preventing finger entrapment as panels fold into the overhead track during operation.', stat1: 'Pinch', stat1Label: 'Safe Design', stat2: 'Spring', stat2Label: 'Balanced Travel', img: imgSectional },
      { label: 'Design', title: 'Made\nto fit.', desc: 'Custom panel finishes, section heights, and opening widths allow the door to be tailored precisely to the architectural requirements of any space.', stat1: 'Custom', stat1Label: 'Sizes', stat2: '4+', stat2Label: 'Panel Types', img: imgSectional },
    ],
    stats: [
      { num: '40mm', label: 'Insulation Depth' },
      { num: 'Spring', label: 'Balanced System' },
      { num: '4+', label: 'Panel Formats' },
      { num: 'Custom', label: 'Opening Sizes' },
    ],
    keyTech: {
      title: 'Overhead access engineered for efficiency.',
      body: 'Sectional doors deliver full opening width without swing clearance, combining insulation, safety, and design flexibility for demanding commercial and industrial openings.',
      items: [
        { title: 'Overhead Track System', body: 'Sections travel vertically then horizontally into the ceiling space, giving the full opening width and zero floor clearance requirement.' },
        { title: 'Thermal Insulation', body: 'Foam-core sandwich panels reduce heat transfer, making sectional doors practical for cold rooms and energy-efficient buildings.' },
        { title: 'Automation Ready', body: 'Motorization packages include remote control, safety reversal, and optional access control for automated daily operation.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Panel formats', 'Insulated sandwich, glazed, flush, ribbed'],
        ['Operation', 'Manual spring-balanced or motorized'],
        ['Panel thickness', '40mm insulated sandwich option'],
        ['Safety', 'Finger-trap protection on panel joints'],
        ['Custom sizes', 'Available on request'],
        ['Applications', 'Showrooms, garages, cold storage, fire stations'],
      ],
      'Automation': [
        ['Motor', 'Overhead sectional door motor'],
        ['Control', 'Remote control and wall switch'],
        ['Safety', 'Obstacle auto-reverse'],
        ['Manual override', 'Emergency manual release'],
      ],
      'Dimensions': [
        ['Panel formats', 'Single, double, and custom configurations'],
        ['Headroom required', 'Dependent on track configuration'],
        ['Custom sizes', 'Available on request'],
        ['Side room required', 'Minimal, track-dependent'],
      ],
    },
    ctaHeadline: 'Lift your\naccess.',
    ctaSub: 'Share your opening dimensions, thermal requirements, and aesthetic preference — our team will specify the right sectional door.',
  },

  'high-speed-doors': {
    heroBg: imgHighSpeed,
    heroPrimary: 'High-Speed Doors.',
    heroSecondary: 'Fast cycles, zero delays.',
    heroBody: 'Rapid roll-up doors engineered for pharmaceutical, food processing, logistics, and automotive facilities where fast cycle times and environmental separation are critical.',
    overviewCards: [
      { title: 'Pharmaceutical', desc: 'Clean room and environmental separation formats complying with pharmaceutical facility requirements for GMP manufacturing.', stat: '3m/s', statLbl: 'Opening Speed', img: imgHighSpeed },
      { title: 'Food Processing', desc: 'High-cycle rapid doors maintaining pest control and temperature zones in food production and cold chain facilities.', stat: 'Self', statLbl: 'Repairing Curtain', img: imgHighSpeed },
      { title: 'Logistics', desc: 'Fast traffic flow in loading dock and cross-dock environments reduces idle time and improves throughput efficiency.', stat: 'Motion', statLbl: 'Sensor Activation', img: imgHighSpeed },
    ],
    variants: [
      { title: 'PVC Fabric', desc: 'Flexible PVC roll-up curtain with high cycle capability and self-repairing bottom beam for impact recovery.', badge: 'PVC · FLEXIBLE CURTAIN', objPos: 'left center' },
      { title: 'Insulated Spiral', desc: 'Rigid aluminium spiral section design for exterior use or high-performance temperature separation applications.', badge: 'SPIRAL · INSULATED', objPos: 'center center' },
      { title: 'Clean Room', desc: 'Specially designed for pharmaceutical and electronic manufacturing with controlled particulate and environment separation.', badge: 'CLEAN ROOM · CONTROLLED', objPos: 'center right' },
      { title: 'Exterior', desc: 'Wind-rated high-speed door for outdoor dock positions and facility perimeters with exposure to weather loading.', badge: 'EXTERIOR · WIND RATED', objPos: 'right center' },
    ],
    features: [
      { label: 'Speed', title: 'Ultra-fast\ncycles.', desc: 'Opening speeds of up to 3 metres per second reduce the time each cycle takes, directly improving workflow throughput and traffic flow in busy facilities.', stat1: '3m/s', stat1Label: 'Opening Speed', stat2: 'High', stat2Label: 'Cycle Frequency', img: imgHighSpeed },
      { label: 'Durability', title: 'Self-repairing\ndesign.', desc: 'Self-repairing bottom beam technology allows the door curtain to reset automatically after a minor vehicle impact, reducing unplanned maintenance downtime.', stat1: 'Auto', stat1Label: 'Impact Reset', stat2: 'Low', stat2Label: 'Maintenance Demand', img: imgHighSpeed },
      { label: 'Control', title: 'Intelligent\nactivation.', desc: 'Frequency inverter drives and motion sensor activation enable fully automated door operation with precise speed and position control across all conditions.', stat1: 'Inverter', stat1Label: 'Drive Control', stat2: 'Motion', stat2Label: 'Sensor Activation', img: imgHighSpeed },
    ],
    stats: [
      { num: '3m/s', label: 'Opening Speed' },
      { num: 'Self', label: 'Repairing Curtain' },
      { num: '4+', label: 'Door Formats' },
      { num: 'Motion', label: 'Sensor Activation' },
    ],
    keyTech: {
      title: 'Engineered for uninterrupted production.',
      body: 'High-speed doors support high-traffic industrial environments by reducing cycle time, separating environments, and minimizing unplanned maintenance through self-repairing construction.',
      items: [
        { title: 'Frequency Inverter Drive', body: 'Variable-speed inverter control allows precise curtain travel with soft start/stop and programmable speed profiles for different applications.' },
        { title: 'Auto-Repair on Impact', body: 'Self-repairing designs allow the curtain to separate on minor impact and re-engage on the next cycle, eliminating most service calls.' },
        { title: 'Environmental Separation', body: 'High-speed doors maintain meaningful temperature, humidity, and particulate separation even during high-frequency opening cycles.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Door types', 'PVC fabric, insulated spiral, clean room, exterior'],
        ['Opening speed', 'Up to 3 m/s'],
        ['Activation', 'Motion sensor, loop detector, push button'],
        ['Drive', 'Frequency inverter motor'],
        ['Self-repairing', 'Available on PVC fabric formats'],
        ['Applications', 'Pharma, food, logistics, automotive'],
      ],
      'Performance': [
        ['Opening speed', 'Up to 3 m/s (application dependent)'],
        ['Cycle frequency', 'High cycle, continuous use rated'],
        ['Temperature separation', 'Effective on closed position'],
        ['Wind loading', 'Wind-rated on exterior spiral formats'],
        ['Noise level', 'Low operational noise profile'],
      ],
      'Controls': [
        ['Drive', 'Frequency inverter'],
        ['Activation', 'Motion sensor, push button, loop detector'],
        ['Safety', 'Optical safety edge and auto-reverse'],
        ['Emergency', 'Manual override available'],
        ['Integration', 'PLC and BMS interface options'],
      ],
    },
    ctaHeadline: 'Speed up\nyour facility.',
    ctaSub: 'Describe your opening, cycle demand, and environment. We\'ll recommend the right high-speed door configuration.',
  },

  /* ══════════════════════════════════════════════════════════
     STEEL & CONSTRUCTION
  ══════════════════════════════════════════════════════════ */

  'pipes-tubes': {
    heroBg: imgSteelCine,
    heroPrimary: 'GI Pipes & Box Bars.',
    heroSecondary: 'Structural strength, precision rolled.',
    heroBody: 'Pre-galvanized square tubes, rectangular tubes, and round tubes for construction, fabrication, fencing, and structural applications across Sri Lanka.',
    overviewCards: [
      { title: 'Construction', desc: 'GI tubes and box bars for building frames, scaffolding systems, and structural steel applications in modern construction.', stat: 'Pre-Gal', statLbl: 'Galvanized Finish', img: imgSteelProd },
      { title: 'Fabrication', desc: 'Square and rectangular box bars supplied for fabrication workshops, furniture manufacture, and custom metalwork.', stat: 'Bulk', statLbl: 'Supply Available', img: imgPipes },
      { title: 'Fencing', desc: 'Galvanized round and square tubes for perimeter fencing, boundary walls, and security barriers requiring corrosion resistance.', stat: 'IS', statLbl: 'Standard Compliant', img: imgSteelCine },
    ],
    variants: [
      { title: 'Square Tubes', desc: 'Pre-galvanized square hollow sections for structural and fabrication work. Available in a range of sizes for different load requirements.', badge: 'SQUARE · STRUCTURAL', objPos: 'left center' },
      { title: 'Rectangular Tubes', desc: 'Rectangular box bars for beams, frames, and fabrication. Also referred to as rectangular hollow sections (RHS).', badge: 'RECTANGULAR · BOX BAR', objPos: 'center center' },
      { title: 'Round Tubes', desc: 'Round hollow sections for pipes, structural columns, and circular fabrication elements. Galvanized finish standard.', badge: 'ROUND · PIPE PROFILE', objPos: 'right center' },
    ],
    features: [
      { label: 'Protection', title: 'Pre-galvanized\nfor life.', desc: 'Zinc coating applied during manufacturing protects the tube from rust and corrosion throughout its service life — in exposed, humid, or coastal environments.', stat1: 'Zinc', stat1Label: 'Anti-Rust Coat', stat2: 'IS', stat2Label: 'Standard', img: imgSteelProd },
      { label: 'Production', title: 'Modern\nmachinery.', desc: 'Elcardo manufactures stainless steel tubes and pipes using modern machinery, with product sizes supplied to match customer requirements.', stat1: 'Modern', stat1Label: 'Machinery', stat2: 'Range', stat2Label: 'Sizes Available', img: imgPipes },
      { label: 'Supply', title: 'Bulk\nready.', desc: 'Stock is maintained for common sizes and lengths, with custom cut lengths and large-volume supply available for major construction programs.', stat1: 'Stock', stat1Label: 'Standard Sizes', stat2: 'Bulk', stat2Label: 'Volume Orders', img: imgSteelCine },
    ],
    stats: [
      { num: 'IS', label: 'Standard Compliant' },
      { num: '3+', label: 'Profile Types' },
      { num: 'Pre-Gal', label: 'Galvanized Finish' },
      { num: 'Bulk', label: 'Supply Ready' },
    ],
    keyTech: {
      title: 'Galvanized steel for lasting structural performance.',
      body: 'Elcardo pre-galvanized tubes and box bars meet structural and fabrication demands across construction, manufacturing, and infrastructure applications.',
      items: [
        { title: 'Hot-Dip Galvanization', body: 'The zinc coating process creates a metallurgical bond with the base steel, providing superior corrosion protection compared to paint or surface coatings.' },
        { title: 'IS Standard Compliance', body: 'Products are manufactured and tested to applicable Indian Standard specifications for dimensional accuracy and mechanical performance.' },
        { title: 'Precision Roll Forming', body: 'Modern continuous roll-forming lines produce consistent tube profiles with controlled wall thickness, straightness, and surface quality.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Profile types', 'Square tubes, rectangular tubes, round tubes'],
        ['Material', 'Pre-galvanized steel'],
        ['Standard', 'IS-standard compliant'],
        ['Lengths', 'Standard and custom cut lengths'],
        ['Supply', 'Stock and bulk supply'],
        ['Applications', 'Construction, fabrication, fencing, plumbing'],
      ],
      'Technical': [
        ['Coating', 'Pre-galvanized zinc coating'],
        ['Section types', 'SHS (square), RHS (rectangular), CHS (round)'],
        ['Wall thickness', 'Range available on enquiry'],
        ['Length', 'Standard 6m and cut to length'],
        ['Surface', 'Galvanized finish, painted available'],
      ],
    },
    ctaHeadline: 'Structural steel,\ndelivered.',
    ctaSub: 'Share your tube sizes, quantities, and project details. We\'ll supply the right profiles from stock or production.',
  },

  'stainless-steel-pipes': {
    heroBg: imgSSFab,
    heroPrimary: 'Stainless Steel Pipes.',
    heroSecondary: 'Polished precision, every profile.',
    heroBody: 'SUS 202 and SUS 304 stainless steel tubes and pipes in grit 600 polished finish — manufactured for architectural railings, hotel interiors, and commercial installations.',
    overviewCards: [
      { title: 'Railings', desc: 'Round and square SS tubes for architectural balustrades, stair railings, and barrier systems in commercial and residential buildings.', stat: 'Grit 600', statLbl: 'Polished Finish', img: imgSSFab },
      { title: 'Hotel & Hospitality', desc: 'Polished stainless pipes for handrails, decorative structures, and service areas in hotel lobbies, restaurants, and public spaces.', stat: 'SUS 304', statLbl: 'Grade Available', img: imgHotel },
      { title: 'Medical & Industrial', desc: 'Corrosion-resistant SS pipe for hospitals, pharmaceutical cleanrooms, and industrial process piping applications.', stat: 'SUS 202', statLbl: 'Grade Available', img: imgSteelProd },
    ],
    variants: [
      { title: 'SUS 202 Round Pipes', desc: 'Stainless steel round pipe in 202 grade with grit 600 polished finish. Suited for architectural railings and decorative work.', badge: 'SUS 202 · ROUND PIPE', objPos: 'left center' },
      { title: 'SUS 304 Round Pipes', desc: 'Higher corrosion resistance grade 304 round pipe for food service, medical, and coastal environments.', badge: 'SUS 304 · ROUND PIPE', objPos: 'center center' },
      { title: 'SUS Box Bars', desc: 'Square and rectangular stainless steel hollow sections for structural, architectural, and framing applications.', badge: 'SUS 202/304 · BOX BAR', objPos: 'right center' },
    ],
    features: [
      { label: 'Finish', title: 'Grit 600\npolished.', desc: 'The grit 600 polished surface gives stainless steel pipes a reflective, smooth finish suited for architectural work, hospitality fit-outs, and interior railing applications.', stat1: 'Grit 600', stat1Label: 'Polish Standard', stat2: 'Mirror', stat2Label: 'Quality Option', img: imgSSFab },
      { label: 'Grade', title: 'SUS 202\n& SUS 304.', desc: 'Two stainless steel grades cover the range from general architectural use (SUS 202) to demanding corrosion applications and food-grade requirements (SUS 304).', stat1: '202 / 304', stat1Label: 'Steel Grades', stat2: 'Low', stat2Label: 'Maintenance', img: imgSteelProd },
      { label: 'Production', title: 'Manufactured\nlocally.', desc: 'Elcardo manufactures stainless steel tubes and pipes using modern machinery at its local factory, ensuring consistent quality and reliable supply to the market.', stat1: 'Local', stat1Label: 'Manufacture', stat2: 'Modern', stat2Label: 'Machinery', img: imgHotel },
    ],
    stats: [
      { num: 'Grit 600', label: 'Polish Standard' },
      { num: '2', label: 'Grades Available' },
      { num: 'Local', label: 'Manufacturing' },
      { num: 'Multi', label: 'Size Range' },
    ],
    keyTech: {
      title: 'Polished stainless steel for demanding applications.',
      body: 'Modern tube manufacturing and precision polishing delivers architectural-quality stainless steel pipe in the grades and sizes needed for Sri Lanka\'s construction and hospitality sectors.',
      items: [
        { title: 'Modern Tube Manufacturing', body: 'Modern factory machinery supports consistent stainless steel tube and pipe production across the size range required by customers.' },
        { title: 'Grit 600 Polish Process', body: 'Multi-stage polishing to grit 600 standard gives a smooth, reflective finish meeting the aesthetic requirements of architectural and interior fit-out work.' },
        { title: 'Grade Selection', body: 'SUS 202 and SUS 304 grades cover general decorative applications through to food service, pharmaceutical, and coastal environments.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Steel grades', 'SUS 202 and SUS 304'],
        ['Finish', 'Grit 600 polished'],
        ['Profiles', 'Round pipe, square box bar, rectangular box bar'],
        ['Manufacturing', 'Local factory production'],
        ['Applications', 'Railings, hotel fit-outs, hospitals, interiors'],
      ],
      'Technical': [
        ['Grade 202', 'General architectural and decorative applications'],
        ['Grade 304', 'Food grade, coastal, and industrial applications'],
        ['Finish', 'Grit 600 polished (mirror on request)'],
        ['Tolerance', 'Precision dimensional control'],
        ['Length', 'Standard and cut to length'],
      ],
    },
    ctaHeadline: 'Polish your\nproject.',
    ctaSub: 'Tell us the profile, grade, size, and quantity you need. We\'ll supply from our manufacturing stock.',
  },

  'purlins': {
    heroBg: imgBuilding,
    heroPrimary: 'C-Purlins.',
    heroSecondary: 'Long spans. Zero compromise.',
    heroBody: 'Cee-Hi-Ten cold-formed steel purlins for roofing and wall cladding support. Roll formed to custom lengths, pre-punched for on-site assembly, built to JIS standard.',
    overviewCards: [
      { title: 'Warehouses', desc: 'Long-span C-purlins supporting wide-bay warehouse roofing systems with minimal interior column interference.', stat: 'Custom', statLbl: 'Lengths Available', img: imgPurlins },
      { title: 'Factory Buildings', desc: 'High-tensile purlins for factory roof and wall cladding structures exposed to heavy wind and imposed loading.', stat: '450', statLbl: 'N/mm² Yield', img: imgBuilding },
      { title: 'Agricultural Sheds', desc: 'Cost-effective purlin supply for agricultural sheds, poultry houses, and rural building structures requiring durability.', stat: 'Galv', statLbl: 'Coating Available', img: imgPurlins },
    ],
    variants: [
      { title: 'C-Purlins', desc: 'Standard C-section purlins for rafter-to-rafter span in roof and wall cladding. The most commonly used purlin profile.', badge: 'C SECTION · STANDARD', objPos: 'left center' },
      { title: 'Z-Purlins', desc: 'Zed-section purlins allowing overlapping at joints for extra continuity over multiple spans in large roof structures.', badge: 'Z SECTION · LAPPED SPAN', objPos: 'center center' },
      { title: 'Sigma Purlins', desc: 'High-performance sigma section for demanding long-span applications requiring greater section depth and stiffness.', badge: 'SIGMA · HIGH PERFORMANCE', objPos: 'right center' },
    ],
    features: [
      { label: 'Strength', title: 'High-tensile\nsteel.', desc: 'Cold-formed from hot-dipped zinc-coated high-strength steel strip to a yield stress of 450 N/mm², matching the load demands of modern industrial buildings.', stat1: '450', stat1Label: 'N/mm² Yield', stat2: 'JIS', stat2Label: 'Standard', img: imgPurlins },
      { label: 'Precision', title: 'Roll formed\nto length.', desc: 'Purlins are roll formed to project-specific lengths with pre-punched holes positioned to match the structural drawings, reducing site cutting and drilling.', stat1: 'Custom', stat1Label: 'Lengths', stat2: 'Pre-Punch', stat2Label: 'Holes Matched', img: imgBuilding },
      { label: 'Protection', title: 'Galvanized\nfinish.', desc: 'Hot-dipped galvanized coating weight of 290 g/m² total provides excellent corrosion protection for long-term structural performance in outdoor applications.', stat1: '290', stat1Label: 'g/m² Coating', stat2: 'Long', stat2Label: 'Service Life', img: imgPurlins },
    ],
    stats: [
      { num: '450', label: 'N/mm² Yield Strength' },
      { num: '290', label: 'g/m² Galvanized Coat' },
      { num: 'JIS', label: 'Standard Grade' },
      { num: 'Custom', label: 'Length Rolling' },
    ],
    keyTech: {
      title: 'Engineered for long-span roofing performance.',
      body: 'Elcardo C-purlins are cold roll formed from high-strength steel strip to project specifications, delivering the strength, precision, and coating quality required for commercial and industrial roofing structures.',
      items: [
        { title: 'High-Tensile Steel Strip', body: 'The base material meets 450 N/mm² yield stress for the structural performance required in long-span commercial and industrial roof systems.' },
        { title: 'Custom Roll-Forming', body: 'Roll forming to the exact project length eliminates on-site cutting waste and ensures dimensional accuracy for every structural connection.' },
        { title: 'Pre-Punched Holes', body: 'Holes are pre-punched to match the design drawing\'s fixing layout, significantly reducing site labour for structural assembly.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Section types', 'C-purlin, Z-purlin, Sigma purlin'],
        ['Material', 'Black steel and galvanized steel'],
        ['Yield stress', '450 N/mm²'],
        ['Standard', 'JIS63302 56C440'],
        ['Galvanized coating', '290.4 g/m² total coating weight'],
        ['Applications', 'Factories, warehouses, sheds, extensions'],
      ],
      'Technical': [
        ['Tensile strength', '450 N/mm²'],
        ['Forming process', 'Cold roll formed'],
        ['Holes', 'Pre-punched to project specification'],
        ['Length', 'Rolled to custom project length'],
        ['Steel strip', 'Hot-dipped zinc-coated high-strength'],
      ],
    },
    ctaHeadline: 'Span further,\nbuild smarter.',
    ctaSub: 'Send us your roof span, spacing, and loading requirements. We\'ll produce the right purlin specification to match.',
  },

  'roofing': {
    heroBg: imgRoofing,
    heroPrimary: 'Roofing Sheets & Tiles.',
    heroSecondary: 'Weather-proof. Beautifully finished.',
    heroBody: 'Colour bonded steel roofing sheets, roofing tiles, and gutters for residential, commercial, and industrial roofing. UV-resistant, thermally efficient, and available in multiple profiles.',
    overviewCards: [
      { title: 'Residential', desc: 'Lightweight colour bonded roofing tiles and sheets for modern homes. UV-resistant and available in a range of architectural colours.', stat: 'UV', statLbl: 'Resistant Coating', img: imgRoofing },
      { title: 'Industrial', desc: 'High-tensile AZ150-coated roofing sheets for factory and warehouse roofs exposed to heavy loads and Sri Lankan climate conditions.', stat: '550', statLbl: 'N/mm² Tensile', img: imgRoofing },
      { title: 'Commercial', desc: 'Colour bonded cladding sheets and matching gutter systems for commercial buildings, retail complexes, and stadium canopies.', stat: 'AZ150', statLbl: 'Coating Grade', img: imgRoofing },
    ],
    variants: [
      { title: 'Roofing Sheets', desc: 'Profiled steel roofing sheets in colour bonded or plain galvanized finish for industrial and commercial roof decks.', badge: 'SHEET · PROFILED STEEL', objPos: 'left center' },
      { title: 'Roofing Tiles', desc: 'Steel roofing tiles with embossed profiles for residential applications requiring a traditional tile appearance with steel durability.', badge: 'TILE · RESIDENTIAL', objPos: 'center center' },
      { title: 'Gutters', desc: 'Custom-length roof gutters in colour and non-colour bonded steel to match the roofing system and handle heavy rainfall.', badge: 'GUTTER · DRAINAGE SYSTEM', objPos: 'center right' },
      { title: 'Accessories', desc: 'Ridge caps, flashings, trims, and roofing fasteners to complete the weatherproof envelope with matching finishes.', badge: 'ACCESSORIES · COMPLETE SYSTEM', objPos: 'right center' },
    ],
    features: [
      { label: 'Durability', title: 'Alloy-coated\nfor the tropics.', desc: 'The 55% aluminium, 43.5% zinc, and 1.5% silicon alloy steel base provides exceptional corrosion resistance suited to tropical and coastal environments.', stat1: 'AZ150', stat1Label: 'Alloy Coating', stat2: '550', stat2Label: 'N/mm² Tensile', img: imgRoofing },
      { label: 'Finish', title: 'Colour bonded\nprecision.', desc: 'Colour bonded steel applies UV-resistant colour coating at manufacture for a consistent, durable finish that maintains appearance and prevents fading over time.', stat1: 'UV', stat1Label: 'Resistant Coating', stat2: 'Matt/Gloss', stat2Label: 'Surface Options', img: imgRoofing },
      { label: 'Performance', title: 'Thermally\nefficient.', desc: 'The alloy steel composition and coating system provide effective thermal performance, helping reduce heat transfer into the building interior through the roof.', stat1: 'Thermal', stat1Label: 'Efficiency', stat2: 'Anti-Drip', stat2Label: 'Membrane Option', img: imgRoofing },
    ],
    stats: [
      { num: 'AZ150', label: 'Alloy Coating' },
      { num: '550', label: 'N/mm² Tensile' },
      { num: 'UV', label: 'Fade Resistant' },
      { num: '4+', label: 'Roofing Profiles' },
    ],
    keyTech: {
      title: 'Roofing engineered for long-term performance.',
      body: 'Elcardo roofing products combine alloy-coated high-tensile steel with UV-stable colour bonding to deliver roofing that performs across Sri Lanka\'s diverse climate conditions.',
      items: [
        { title: 'Aluminium-Zinc Alloy Steel', body: 'The AZ150-coated steel base outperforms standard galvanized steel in corrosion resistance, particularly in coastal and tropical conditions.' },
        { title: 'Colour Bonded Coating', body: 'Colour is applied as a factory-bonded coating at high temperature, providing far better adhesion, UV resistance, and colour consistency than site-applied paint.' },
        { title: 'Complete Drainage System', body: 'Matching gutters and downpipes form a complete drainage system engineered to handle the high rainfall volumes typical in Sri Lankan weather.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Base material', '55% Al, 43.5% Zn, 1.5% Si alloy-coated high-tensile steel'],
        ['Coating', 'AZ150'],
        ['Tensile strength', 'More than 550 N/mm², Grade 550'],
        ['Surface', 'Matt and gloss finish options'],
        ['Profiles', 'Roofing sheets, tiles, gutters, accessories'],
      ],
      'Products': [
        ['Roofing sheets', 'Profiled colour bonded steel sheets'],
        ['Roofing tiles', 'Embossed steel tile profile for residential'],
        ['Gutters', 'Custom length, colour and non-colour bonded'],
        ['Accessories', 'Ridge caps, flashings, fasteners'],
        ['Anti-drip membrane', 'Available as add-on option'],
      ],
    },
    ctaHeadline: 'Roof it\nright.',
    ctaSub: 'Share your project area, roof profile, and colour preference. We\'ll supply the complete roofing system.',
  },

  'pre-engineered-buildings': {
    heroBg: imgSteelCine,
    heroPrimary: 'Pre-Engineered Buildings.',
    heroSecondary: 'Steel structures, faster built.',
    heroBody: 'Complete design, fabrication, and installation of pre-engineered steel building systems for warehouses, factories, workshops, and commercial structures built to BS standards.',
    overviewCards: [
      { title: 'Warehouses', desc: 'Wide-clear-span pre-engineered buildings for logistics and storage — delivering large floor areas with minimal internal columns.', stat: 'Clear', statLbl: 'Span Design', img: imgRoofing },
      { title: 'Factory Buildings', desc: 'Industrial buildings with crane beam provisions, ventilation clearances, and process-specific layouts for manufacturing.', stat: 'BS5950', statLbl: 'Design Standard', img: imgBuilding },
      { title: 'Commercial Structures', desc: 'Steel framing for retail parks, workshops, service stations, showrooms, and agricultural structures.', stat: 'D+F+I', statLbl: 'Design+Fabricate+Install', img: imgSteelCine },
    ],
    variants: [
      { title: 'Pre-Engineered Buildings', desc: 'Computer-designed steel portal frame buildings fabricated to precise project specifications and erected on site by experienced teams.', badge: 'PORTAL FRAME · PEB', objPos: 'left center' },
      { title: 'Pre-Fabricated Buildings', desc: 'Modular steel panel buildings with rapid on-site assembly for temporary or permanent industrial and commercial use.', badge: 'MODULAR · PRE-FAB', objPos: 'center center' },
      { title: 'H-Iron Structures', desc: 'Heavy structural steel frames using universal beams and columns for multi-storey or high-load industrial applications.', badge: 'H-IRON · STRUCTURAL STEEL', objPos: 'right center' },
    ],
    features: [
      { label: 'Design', title: 'Engineered\nto BS standard.', desc: 'Building designs follow BS 5950 and BS 6399 structural standards, ensuring the steel framing meets engineering safety and performance requirements.', stat1: 'BS5950', stat1Label: 'Structural Standard', stat2: 'BS6399', stat2Label: 'Loading Standard', img: imgBuilding },
      { label: 'Fabrication', title: 'Factory\nprecision.', desc: 'Steel members are fabricated in a controlled factory environment to precise dimensions, enabling fast and accurate on-site erection with minimal rework.', stat1: 'Factory', stat1Label: 'Fabrication', stat2: 'Precision', stat2Label: 'Connections', img: imgSteelCine },
      { label: 'Execution', title: 'Design to\ninstallation.', desc: 'Elcardo covers the complete project lifecycle — structural design, steel fabrication, and site installation — providing a single point of accountability.', stat1: 'D', stat1Label: 'Design', stat2: 'F+I', stat2Label: 'Fabricate & Install', img: imgRoofing },
    ],
    stats: [
      { num: 'BS5950', label: 'Design Standard' },
      { num: 'D+F+I', label: 'Full Service' },
      { num: 'Clear', label: 'Span Structures' },
      { num: 'Custom', label: 'Project Layouts' },
    ],
    keyTech: {
      title: 'Steel buildings from design to handover.',
      body: 'Elcardo pre-engineered buildings deliver economic, fast-construction steel structures that meet international design standards and are supported by local fabrication and installation expertise.',
      items: [
        { title: 'Computer-Aided Structural Design', body: 'All steel building frames are designed using structural engineering software to BS 5950 and BS 6399, ensuring safe, economic, and code-compliant structures.' },
        { title: 'Factory-Fabricated Precision', body: 'Factory fabrication ensures dimensional accuracy, consistent weld quality, and controlled surface preparation before site delivery.' },
        { title: 'Fast Site Erection', body: 'Pre-engineered connections and pre-cut steel members enable rapid site assembly, shortening the construction programme significantly.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Services', 'Design, fabrication, and installation'],
        ['Design standards', 'BS 5950 and BS 6399'],
        ['Structures', 'Warehouses, factories, workshops, commercial'],
        ['Span', 'Wide clear span available'],
        ['Applications', 'Industrial and commercial buildings'],
      ],
      'Technical': [
        ['Frame type', 'Portal frame, multi-bay, single span'],
        ['Steel section', 'H-section, universal beam, column, angle'],
        ['Connections', 'Bolted moment connections at ridge and eaves'],
        ['Roofing', 'Purlins and roofing sheets system'],
        ['Cladding', 'Profiled steel wall cladding panels'],
      ],
    },
    ctaHeadline: 'Build your\nfacility.',
    ctaSub: 'Send us your building dimensions, use requirements, and site location. We\'ll develop a design and cost plan.',
  },

  /* ══════════════════════════════════════════════════════════
     FABRICATION & INTERIORS
  ══════════════════════════════════════════════════════════ */

  'ss-fabrication': {
    heroBg: imgSSProject,
    heroPrimary: 'SS Fabrication.',
    heroSecondary: 'Precision crafted. Immaculately finished.',
    heroBody: 'Custom stainless steel fabrication for architectural railings, canopies, display fixtures, and commercial fit-outs — engineered for premium interior and exterior environments.',
    overviewCards: [
      { title: 'Hotels & Hospitality', desc: 'Decorative SS railings, canopies, and reception fixtures for five-star hotels, restaurant fit-outs, and luxury hospitality projects.', stat: 'Grade 304', statLbl: 'Steel Grade', img: imgHotel },
      { title: 'Shopping Malls', desc: 'Display racks, signage frames, balustrading, and structural canopy elements for high-traffic commercial retail environments.', stat: 'TIG', statLbl: 'Weld Process', img: imgSSProject },
      { title: 'Corporate Offices', desc: 'Boardroom fixtures, lobby features, and precision interior metalwork for premium corporate office environments.', stat: 'Mirror', statLbl: 'Finish Available', img: imgSSFab },
    ],
    variants: [
      { title: 'Railings & Balustrades', desc: 'Precision-fabricated stainless steel handrail and balustrade systems for stairs, mezzanines, and balcony edges.', badge: 'RAILINGS · ARCHITECTURAL', objPos: 'left center' },
      { title: 'Canopies & Structures', desc: 'Structural stainless steel canopies, entrance covers, and overhead features fabricated for exterior and interior applications.', badge: 'CANOPIES · STRUCTURAL', objPos: 'center center' },
      { title: 'Display Racks & Fixtures', desc: 'Custom retail display systems, shelving units, and merchandise fixtures in polished or satin stainless steel.', badge: 'FIXTURES · COMMERCIAL', objPos: 'center right' },
      { title: 'Custom Items', desc: 'Bespoke stainless steel fabrications including catering equipment, architectural details, and commercial kitchen items.', badge: 'CUSTOM · BESPOKE', objPos: 'right center' },
    ],
    features: [
      { label: 'Grade', title: 'SS 304/316,\nfor demanding use.', desc: 'Grade 304 and 316 stainless steel is selected based on the application — grade 316 providing higher corrosion resistance for coastal and chemical environments.', stat1: '304/316', stat1Label: 'Steel Grade', stat2: 'Corrosion', stat2Label: 'Resistant', img: imgHotel },
      { label: 'Welding', title: 'TIG welded\nfor precision.', desc: 'TIG welding delivers high-quality, clean weld beads that can be ground and polished to a seamless finish on architectural stainless steel work.', stat1: 'TIG', stat1Label: 'Weld Process', stat2: 'Seamless', stat2Label: 'Finish Quality', img: imgSSProject },
      { label: 'Finish', title: 'Mirror, satin,\nor hairline.', desc: 'Three primary finish options — mirror polish, satin (brushed), and hairline — each suited to different aesthetic requirements and maintenance levels.', stat1: '3+', stat1Label: 'Finish Options', stat2: 'Custom', stat2Label: 'Design Scope', img: imgSSFab },
    ],
    stats: [
      { num: '304/316', label: 'Steel Grades' },
      { num: 'TIG', label: 'Weld Process' },
      { num: '3+', label: 'Polish Finishes' },
      { num: 'Custom', label: 'Design Scope' },
    ],
    keyTech: {
      title: 'Stainless steel fabrication for premium environments.',
      body: 'Elcardo SS fabrication combines precision TIG welding, high-grade stainless steel, and multi-stage polishing to deliver architectural metalwork that performs in demanding commercial and hospitality settings.',
      items: [
        { title: 'TIG Welding Process', body: 'Tungsten inert gas (TIG) welding delivers a clean, consistent weld bead that minimises heat distortion and allows for fine grinding and polishing to an invisible join.' },
        { title: 'Grade 304 and 316 Steel', body: 'Material grade is selected based on end-use environment — grade 316 is specified for coastal installations and chemical environments.' },
        { title: 'Multi-Stage Polishing', body: 'Progressive polishing from coarse grinding to fine grit delivers mirror, hairline, or satin finishes to specification with consistent appearance.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Steel grades', 'Grade 304 and 316'],
        ['Welding', 'TIG (tungsten inert gas) welding'],
        ['Finishes', 'Mirror, hairline, satin'],
        ['Products', 'Railings, canopies, fixtures, custom items'],
        ['Design', 'CAD-designed and fabricated to specification'],
        ['Applications', 'Hotels, malls, offices, residences'],
      ],
      'Capability': [
        ['Fabrication scope', 'Custom design, fabrication, installation'],
        ['Material', 'Stainless steel grade 304 / 316'],
        ['Profiles used', 'Tube, flat bar, angle, plate, sheet'],
        ['Surface finishes', 'Mirror, satin, hairline, brushed'],
        ['Welding', 'TIG welding for clean architectural finish'],
      ],
    },
    ctaHeadline: 'Fabricate\nthe detail.',
    ctaSub: 'Share your design requirements, application, and preferred finish. We\'ll produce a fabrication proposal.',
  },

  'pantry-systems': {
    heroBg: imgPantryCtx,
    heroPrimary: 'Stainless Steel Pantry Systems.',
    heroSecondary: 'Hygienic kitchens. Precision built.',
    heroBody: 'Custom stainless steel and ECO board pantry cupboards, kitchen appliances, exhaust canopies, and commercial kitchen fixtures designed for hotel, hospital, and corporate settings.',
    overviewCards: [
      { title: 'Hotel Kitchens', desc: 'Full commercial kitchen fit-outs with SS-304 grade work surfaces, exhaust systems, and custom configuration for hotel F&B operations.', stat: 'SS-304', statLbl: 'Grade Steel', img: imgHotel },
      { title: 'Corporate Pantries', desc: 'Modular stainless steel and ECO board pantry cupboards for corporate offices providing hygienic and durable staff pantry facilities.', stat: 'Modular', statLbl: 'Assembly', img: imgPantry },
      { title: 'Hospital & Institutional', desc: 'Hygienic, non-porous stainless steel pantry systems for hospital canteens, institutional kitchens, and healthcare catering environments.', stat: 'Hygienic', statLbl: 'Grade Finish', img: imgPantryCtx },
    ],
    variants: [
      { title: 'Stainless Steel Pantry', desc: 'Full SS-304 stainless steel pantry cupboards with rust-proof, stain-resistant surfaces for demanding kitchen environments.', badge: 'SS-304 · HYGIENIC', objPos: 'left center' },
      { title: 'ECO Board Pantry', desc: 'Water-resistant, termite-proof ECO board pantry cupboards with smooth surfaces and anti-crack performance.', badge: 'ECO BOARD · WATER RESISTANT', objPos: 'center center' },
      { title: 'Exhaust Canopies', desc: 'Custom stainless steel exhaust canopy hoods for cooking stations, fryers, and commercial kitchen ventilation.', badge: 'CANOPY · VENTILATION', objPos: 'center right' },
      { title: 'Kitchen Tables & Fixtures', desc: 'Work tables, food trolleys, chafing dishes, and custom stainless steel kitchen fixtures for commercial catering.', badge: 'FIXTURES · CATERING', objPos: 'right center' },
    ],
    features: [
      { label: 'Hygiene', title: 'Non-porous\nSS-304 grade.', desc: 'Stainless steel grade 304 provides a non-porous, stain-resistant, and easy-clean surface meeting hygiene standards required in commercial food preparation environments.', stat1: 'SS-304', stat1Label: 'Steel Grade', stat2: 'Non-Porous', stat2Label: 'Hygienic Surface', img: imgPantryCtx },
      { label: 'ECO Board', title: 'Water resistant.\nTermite proof.', desc: 'ECO board construction offers water resistance, termite protection, smooth surfaces, and anti-crack performance at a competitive cost versus solid wood or MDF.', stat1: 'Water', stat1Label: 'Resistant', stat2: 'Termite', stat2Label: 'Proof', img: imgPantry },
      { label: 'Customisation', title: 'Configured\nfor your space.', desc: 'Pantry layouts, worktop materials (granite, glass, SS), and appliance specifications are all customisable to fit the exact dimensions and workflow of the project.', stat1: 'Custom', stat1Label: 'Layouts', stat2: 'Granite', stat2Label: 'Worktop Option', img: imgHotel },
    ],
    stats: [
      { num: 'SS-304', label: 'Hygienic Grade' },
      { num: 'ECO', label: 'Board Option' },
      { num: 'Custom', label: 'Configuration' },
      { num: '5+', label: 'Product Types' },
    ],
    keyTech: {
      title: 'Kitchen systems engineered for professional environments.',
      body: 'Elcardo pantry and kitchen systems are designed for the hygiene, durability, and workflow requirements of hotels, hospitals, and corporate food service operations.',
      items: [
        { title: 'SS-304 Grade Compliance', body: 'Grade 304 stainless steel provides the non-porous, corrosion-resistant surface required in commercial food preparation and healthcare catering.' },
        { title: 'ECO Board Technology', body: 'ECO board panels are engineered for water resistance, termite protection, and crack resistance — a sustainable alternative to natural timber.' },
        { title: 'Custom Kitchen Design', body: 'Elcardo designs kitchens to the specific space, workflow, and appliance requirements of each project, integrating granite, glass, or wood as required.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['SS pantry', 'Low maintenance, rust-proof, stain resistant, hygienic'],
        ['ECO board pantry', 'Water resistant, termite resistant, easy to maintain'],
        ['Worktop options', 'Granite, glass, stainless steel'],
        ['Appliances', 'Exhaust canopies, food trolleys, tables, cupboards'],
        ['Applications', 'Hotels, hospitals, corporates, catering, homes'],
      ],
      'Materials': [
        ['Stainless steel', 'Grade 304 for all food-contact surfaces'],
        ['ECO board', 'Water resistant, termite proof panel'],
        ['Worktops', 'Granite, glass, or stainless options'],
        ['Finish', 'Satin or brushed SS, ECO board in colour options'],
        ['Frames', 'Steel frame construction'],
      ],
    },
    ctaHeadline: 'Design your\nkitchen.',
    ctaSub: 'Share your space dimensions, application, and material preference. We\'ll produce a custom pantry design proposal.',
  },

  'granite-countertops': {
    heroBg: imgHotel,
    heroPrimary: 'Granite Countertops.',
    heroSecondary: 'Premium stone. Custom crafted.',
    heroBody: 'Over 100 stone colours in granite, marble, travertine, quartz, and NeuStone — cut and finished for kitchen counters, pantry tops, and commercial surfaces.',
    overviewCards: [
      { title: 'Kitchens', desc: 'Premium granite and quartz worktops for residential kitchens. Non-porous surfaces that resist heat, stains, and daily kitchen wear.', stat: '100+', statLbl: 'Stone Colours', img: imgPantry },
      { title: 'Hotels & Restaurants', desc: 'Commercial-grade stone countertops for hotel check-in desks, restaurant prep areas, and hospitality bar tops.', stat: 'Custom', statLbl: 'Slab Sizing', img: imgHotel },
      { title: 'Bathrooms', desc: 'Vanity tops and bathroom counters in marble, granite, and NeuStone for luxury residential and hotel bathroom fit-outs.', stat: 'Stain', statLbl: 'Resistant', img: imgPantryCtx },
    ],
    variants: [
      { title: 'Granite', desc: 'Natural granite slabs with unique mineral patterns and exceptional durability. Heat resistant and suitable for heavy kitchen use.', badge: 'GRANITE · NATURAL STONE', objPos: 'left center' },
      { title: 'Marble', desc: 'Classic marble with distinctive veining for premium kitchen and bathroom surfaces where aesthetic is the priority.', badge: 'MARBLE · PREMIUM', objPos: 'center center' },
      { title: 'Quartz', desc: 'Q Premium Natural Quartz with consistent patterning, high hardness, and excellent stain resistance for demanding applications.', badge: 'QUARTZ · ENGINEERED STONE', objPos: 'center right' },
      { title: 'NeuStone', desc: 'Prefabricated stone substitute with non-porous, easy-care properties. A practical, lower-maintenance alternative to natural stone.', badge: 'NEUSTONE · PREFABRICATED', objPos: 'right center' },
    ],
    features: [
      { label: 'Selection', title: 'Over 100\nstone colours.', desc: 'The premium stone selection covers granite, marble, travertine, limestone, slate, quartz, and NeuStone — with over 100 colour options to match any interior palette.', stat1: '100+', stat1Label: 'Colour Options', stat2: '7+', stat2Label: 'Stone Types', img: imgPantry },
      { label: 'Performance', title: 'Non-porous.\nEasy to care for.', desc: 'Natural granite and quartz surfaces are non-toxic, stain resistant, chemical resistant, and easy to clean — properties that make them ideal for commercial and residential use.', stat1: 'Non-Porous', stat1Label: 'Surface Type', stat2: 'Stain', stat2Label: 'Resistant', img: imgPantryCtx },
      { label: 'Custom', title: 'Cut to\nyour size.', desc: 'Stone slabs are cut and finished to the precise dimensions of the project — including cut-outs for sinks, hobs, and basin fixtures — ensuring a perfect fit on installation.', stat1: 'Custom', stat1Label: 'Cut to Size', stat2: 'Site', stat2Label: 'Fit Measured', img: imgHotel },
    ],
    stats: [
      { num: '100+', label: 'Stone Colours' },
      { num: '7+', label: 'Material Types' },
      { num: 'Custom', label: 'Cut to Size' },
      { num: 'Non-Porous', label: 'Surface Type' },
    ],
    keyTech: {
      title: 'Natural stone for every interior.',
      body: 'Elcardo\'s premium stone range brings together granite, marble, quartz, and NeuStone alternatives to provide kitchen, bathroom, and commercial countertop solutions for every budget and aesthetic.',
      items: [
        { title: 'Natural Stone Sourcing', body: 'Premium granite, marble, and travertine are sourced to provide consistent slab quality, natural mineral patterning, and durability for long-term use.' },
        { title: 'Precision Stone Cutting', body: 'Slabs are cut to project specifications using precision equipment, including sink and hob cut-outs, to ensure accurate installation with tight joints.' },
        { title: 'NeuStone Technology', body: 'NeuStone offers a practical alternative to natural stone with non-porous surfaces, consistent appearance, easy maintenance, and competitive pricing.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Materials', 'Granite, marble, travertine, limestone, slate, quartz, NeuStone'],
        ['Colour range', 'Over 100 stone colour options'],
        ['Performance', 'Non-toxic, stain resistant, chemical resistant'],
        ['Customisation', 'Cut to length and project requirements'],
        ['Applications', 'Kitchens, bathrooms, pantries, hotels, restaurants'],
      ],
      'Products': [
        ['Granite', 'Natural granite slabs in range of colours'],
        ['Marble', 'Classic and premium marble selections'],
        ['Quartz', 'Q Premium Natural Quartz engineered stone'],
        ['NeuStone', 'Prefabricated stone substitute, non-porous'],
        ['Finish', 'Polished, honed, or leathered options available'],
      ],
    },
    ctaHeadline: 'Choose your\nstone.',
    ctaSub: 'Tell us your countertop dimensions, material preference, and application. We\'ll show you the best options from our range.',
  },

  /* ══════════════════════════════════════════════════════════
     ENERGY
  ══════════════════════════════════════════════════════════ */

  'solar-systems': {
    heroBg: imgSolarField,
    heroPrimary: 'Solar Systems.',
    heroSecondary: 'Clean energy. Long-term savings.',
    heroBody: 'Residential and commercial solar power systems from Elcardo Elsolar, focused on reducing electricity costs and helping customers evaluate savings and return on investment.',
    overviewCards: [
      { title: 'Residential', desc: 'Solar consultation and installation support for homes looking to reduce or offset monthly electricity bills.', stat: 'Home', statLbl: 'Solar Planning', img: imgSolarRoof },
      { title: 'Commercial', desc: 'Solar power systems for offices, factories, and retail businesses seeking lower operating energy costs.', stat: 'ROI', statLbl: 'Savings Review', img: imgSolarFarm },
      { title: 'Industrial', desc: 'Project-specific solar planning for industrial facilities where energy use and payback need careful evaluation.', stat: 'Site', statLbl: 'Assessment', img: imgSolarInst },
    ],
    variants: [
      { title: 'Residential Solar', desc: 'Home solar systems reviewed against roof area, energy use, and expected electricity-bill savings.', badge: 'RESIDENTIAL SOLAR', objPos: 'left center' },
      { title: 'Commercial Solar', desc: 'Solar power planning for offices, factories, and commercial rooftops with return-on-investment guidance.', badge: 'COMMERCIAL SOLAR', objPos: 'center center' },
      { title: 'Solar Consultation', desc: 'Consultant-led advice on system sizing, savings potential, and project suitability before installation.', badge: 'CONSULTATION', objPos: 'center right' },
    ],
    features: [
      { label: 'Savings', title: 'Lower\nenergy costs.', desc: 'Elcardo Elsolar positions solar as a way to reduce residential and commercial electricity costs through project-specific assessment.', stat1: 'ROI', stat1Label: 'Reviewed', stat2: 'Cost', stat2Label: 'Reduction', img: imgSolarRoof },
      { label: 'Consultation', title: 'Project\nspecific advice.', desc: 'Solar consultants advise customers on likely savings, payback, and the system approach that fits the site conditions.', stat1: 'Site', stat1Label: 'Assessment', stat2: 'Plan', stat2Label: 'Sizing', img: imgSolarFarm },
      { label: 'Applications', title: 'Homes and\nbusinesses.', desc: 'The service supports residential and commercial installations, from home rooftops to larger business energy-saving projects.', stat1: 'Home', stat1Label: 'Systems', stat2: 'Business', stat2Label: 'Systems', img: imgSolarInst },
    ],
    stats: [
      { num: 'Home', label: 'Residential Systems' },
      { num: 'Business', label: 'Commercial Systems' },
      { num: 'ROI', label: 'Savings Review' },
      { num: 'Site', label: 'Project Assessment' },
    ],
    keyTech: {
      title: 'Solar planning focused on measurable savings.',
      body: 'Elcardo Elsolar supports residential and commercial customers with solar project advice built around energy savings, system suitability, and return on investment.',
      items: [
        { title: 'Savings-Led Consultation', body: 'Consultants review energy use and likely financial return before recommending a solar system.' },
        { title: 'Residential and Commercial Coverage', body: 'Solar solutions are positioned for homes, commercial properties, and larger business facilities.' },
        { title: 'Site-Specific Design', body: 'System design depends on roof area, consumption pattern, project conditions, and customer objectives.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['System focus', 'Residential and commercial solar power'],
        ['Consultation', 'Savings and return-on-investment advice'],
        ['Design basis', 'Roof area, energy use, and project conditions'],
        ['Applications', 'Homes, offices, factories, commercial rooftops'],
      ],
      'Performance': [
        ['Savings', 'Assessed against customer electricity consumption'],
        ['ROI period', 'Consultant-assessed based on site conditions'],
        ['Project sizing', 'Specified after site and usage review'],
      ],
    },
    ctaHeadline: 'Power your\nfuture.',
    ctaSub: 'Tell us your electricity consumption and roof area. We\'ll design a system and calculate your savings and return on investment.',
  },

  /* ══════════════════════════════════════════════════════════
     LIFESTYLE
  ══════════════════════════════════════════════════════════ */

  'automobile-accessories': {
    heroBg: imgAutoInno,
    heroPrimary: 'Automobile Accessories.',
    heroSecondary: 'Upgrade your drive.',
    heroBody: 'Premium vehicle accessories for SUVs and off-road vehicles — from roof racks and bull bars to side steps and cargo carriers. Heavy-duty construction, OEM-quality fitment.',
    overviewCards: [
      { title: 'SUV Customization', desc: 'Precision-fit accessories that complement the lines of modern SUVs while adding genuine functional capability for everyday use.', stat: 'OEM', statLbl: 'Fitment Precision', img: imgAutoCtx },
      { title: 'Off-Road', desc: 'Heavy-duty components for off-road and overland vehicles — rated for recovery loads, impact resistance, and challenging terrain.', stat: 'Heavy', statLbl: 'Duty Rated', img: imgAutoInno },
      { title: 'Fleet Vehicles', desc: 'Cost-effective, standardised accessories for fleet operators looking to upgrade multiple vehicles with consistent specification.', stat: 'Fleet', statLbl: 'Pricing Available', img: imgAuto },
    ],
    variants: [
      { title: 'Roof Racks', desc: 'Load-rated roof rack systems for carrying cargo, kayaks, bicycles, and additional baggage on any SUV or 4WD platform.', badge: 'ROOF RACK · LOAD RATED', objPos: 'left center' },
      { title: 'Side Steps', desc: 'Powder-coated side step bars providing safe and convenient access to high-clearance SUV and truck cab entrances.', badge: 'SIDE STEPS · RUNNING BOARDS', objPos: 'center center' },
      { title: 'Bull Bars', desc: 'Heavy-gauge front bull bars and bumper protection for SUVs operating in areas with animal strike or off-road collision risk.', badge: 'BULL BAR · FRONT PROTECTION', objPos: 'center right' },
      { title: 'Cargo Carriers', desc: 'Rear-mounted cargo carriers and tow-hitch platforms expanding the luggage capacity of family and commercial SUVs.', badge: 'CARGO · HITCH MOUNT', objPos: 'right center' },
    ],
    features: [
      { label: 'Construction', title: 'Heavy-duty\nbuilt to last.', desc: 'All accessories are fabricated from heavy-gauge steel with powder-coated finish, rated for the loads and impacts typical in Sri Lankan road and off-road conditions.', stat1: 'Heavy', stat1Label: 'Gauge Steel', stat2: 'Powder', stat2Label: 'Coated Finish', img: imgAutoCtx },
      { label: 'Fitment', title: 'OEM-style\nprecision.', desc: 'Vehicle-specific mounting brackets and fitment kits ensure each accessory installs cleanly without drilling or modification to the original vehicle body.', stat1: 'OEM', stat1Label: 'Spec Fitment', stat2: 'Clean', stat2Label: 'Installation', img: imgAutoInno },
      { label: 'Finish', title: 'Powder coated\nfor outdoor life.', desc: 'Multi-stage powder coat application delivers a durable, weather-resistant finish that resists UV fading, chipping, and corrosion in outdoor and off-road environments.', stat1: 'UV', stat1Label: 'Fade Resistant', stat2: 'Weather', stat2Label: 'Proof Finish', img: imgAuto },
    ],
    stats: [
      { num: 'OEM', label: 'Fitment Quality' },
      { num: '4+', label: 'Accessory Types' },
      { num: 'Heavy', label: 'Gauge Steel' },
      { num: 'Powder', label: 'Coated Finish' },
    ],
    keyTech: {
      title: 'Precision-built accessories for serious vehicles.',
      body: 'Elcardo automobile accessories are selected and fitted for maximum compatibility with Sri Lankan vehicles, road conditions, and customer requirements — from daily drivers to full off-road setups.',
      items: [
        { title: 'Heavy-Gauge Construction', body: 'All load-bearing accessories use heavy-gauge steel sections that meet or exceed the structural requirements for their rated loads, including dynamic road loads.' },
        { title: 'OEM Precision Fitment', body: 'Vehicle-specific mounting kits designed to original equipment manufacturer mounting points ensure secure installation without modification or adaptation.' },
        { title: 'Powder-Coat Protection', body: 'Multi-stage powder coating provides a hard, UV-stable finish that outperforms wet paint in outdoor durability, chip resistance, and corrosion protection.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Products', 'Roof racks, side steps, bull bars, cargo carriers'],
        ['Construction', 'Heavy-gauge steel'],
        ['Finish', 'Powder-coated'],
        ['Fitment', 'Vehicle-specific mounting kits'],
        ['Application', 'SUVs, off-road, fleet vehicles'],
      ],
      'Features': [
        ['Roof rack', 'Load-rated, crossbar and foot system'],
        ['Side steps', 'Running board style, step pad included'],
        ['Bull bar', 'Heavy-gauge front protection with mounting'],
        ['Cargo carrier', 'Rear hitch-mount platform, rated capacity'],
        ['Finish', 'Gloss or satin powder coat'],
      ],
    },
    ctaHeadline: 'Upgrade\nyour vehicle.',
    ctaSub: 'Tell us your vehicle make and model and the accessories you need. We\'ll confirm fitment and pricing.',
  },

  'wpc-decking': {
    heroBg: imgWPCDeck,
    heroPrimary: 'WPC Decking.',
    heroSecondary: 'Natural look. Engineered for life.',
    heroBody: 'Elcardo Elwood WPC decking — wood-plastic composite panels that deliver the warmth of timber with the durability, termite resistance, and low maintenance of modern composites.',
    overviewCards: [
      { title: 'Pool Decks', desc: 'Slip-resistant WPC decking panels for pool surrounds and wet areas — maintaining a warm timber aesthetic with no maintenance or risk of rot.', stat: 'Slip', statLbl: 'Resistant Surface', img: imgWPCDeck },
      { title: 'Balconies', desc: 'Lightweight WPC flooring for apartment balconies, terraces, and elevated platforms with UV-stabilized colour retention.', stat: 'UV', statLbl: 'Stabilized Colour', img: imgWPC },
      { title: 'Commercial Terraces', desc: 'Premium WPC decking for restaurant terraces, garden cafes, and outdoor hospitality areas requiring natural aesthetics and low upkeep.', stat: 'Low', statLbl: 'Maintenance', img: imgWood },
    ],
    variants: [
      { title: 'Solid Core', desc: 'Dense, fully solid WPC boards for high-traffic decking areas where maximum durability and rigidity are needed.', badge: 'SOLID CORE · HIGH TRAFFIC', objPos: 'left center' },
      { title: 'Hollow Core', desc: 'Lighter hollow section WPC boards for standard residential decking — offering timber aesthetics with reduced weight and cost.', badge: 'HOLLOW CORE · RESIDENTIAL', objPos: 'center center' },
      { title: 'Co-Extruded', desc: 'Advanced WPC with an outer protective polymer shell co-extruded over the core for superior surface hardness and scratch resistance.', badge: 'CO-EXTRUDED · PROTECTED', objPos: 'center right' },
      { title: 'Capped Composite', desc: 'Full-cap WPC boards with a four-sided protective polymer layer offering maximum resistance to moisture, staining, and colour fade.', badge: 'CAPPED · MAX PROTECTION', objPos: 'right center' },
    ],
    features: [
      { label: 'Durability', title: 'Termite-proof.\nLong life.', desc: 'WPC composite construction is inherently termite-proof, fungus resistant, and impervious to wood-boring insects — issues that affect natural timber in Sri Lanka\'s tropical climate.', stat1: 'Termite', stat1Label: 'Proof', stat2: 'Fungus', stat2Label: 'Resistant', img: imgWPCDeck },
      { label: 'Aesthetic', title: 'Natural timber\nlook and feel.', desc: 'Wood grain texture pressing and natural colour pigmentation replicate the visual warmth of real timber — without the seasonal variation, splintering, or maintenance that natural wood requires.', stat1: 'Timber', stat1Label: 'Look & Feel', stat2: 'Multi', stat2Label: 'Wood Grain Options', img: imgWPC },
      { label: 'Sustainability', title: 'Recycled\nmaterial base.', desc: 'WPC uses recycled wood fibre or bamboo fibre combined with recycled plastic, reducing virgin material consumption and reducing pressure on natural forest resources.', stat1: 'Recycled', stat1Label: 'Material Base', stat2: 'Eco', stat2Label: 'Responsible', img: imgWood },
    ],
    stats: [
      { num: 'Termite', label: 'Proof Guarantee' },
      { num: 'UV', label: 'Stabilized Colour' },
      { num: 'Slip', label: 'Resistant Surface' },
      { num: 'Recycled', label: 'Material Base' },
    ],
    keyTech: {
      title: 'Composite decking engineered for tropical climates.',
      body: 'Elcardo Elwood WPC products are built for Sri Lanka\'s tropical conditions — delivering the timber aesthetic that architects and homeowners want with the durability that the climate demands.',
      items: [
        { title: 'Recycled Composite Core', body: 'WPC boards are produced from recycled wood or bamboo fibre, recycled plastic, and stabilising additives — reducing material waste and forest consumption.' },
        { title: 'UV Stabilisation Technology', body: 'UV stabilisers incorporated into the board formulation prevent colour fading and surface degradation in direct sunlight, maintaining appearance over many years.' },
        { title: 'Slip-Resistant Texturing', body: 'Deep wood-grain profiles and textured surfaces provide measured anti-slip performance for pool decks, ramps, and outdoor staircase applications.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Material', 'Recycled wood/bamboo fibre + plastic + additives'],
        ['Core types', 'Solid core, hollow core, co-extruded, capped composite'],
        ['Surface', 'Natural wood-grain texture, slip-resistant'],
        ['UV stability', 'UV stabilised formulation'],
        ['Applications', 'Pool decks, balconies, paths, terraces, staircases'],
        ['Maintenance', 'Low — no painting, sealing, or treating'],
      ],
      'Performance': [
        ['Pest resistance', 'Termite proof and insect resistant'],
        ['Moisture', 'Water resistant, dimensionally stable'],
        ['UV stability', 'Colour stabilised for outdoor exposure'],
        ['Slip resistance', 'Anti-slip texture profile'],
        ['Sustainability', 'Recycled base material'],
      ],
    },
    ctaHeadline: 'Deck your\nspace.',
    ctaSub: 'Share your deck area, application, and preferred colour. We\'ll supply the right WPC profile and quantity.',
  },

  /* ══════════════════════════════════════════════════════════
     ACCESS — NEW PRODUCTS
  ══════════════════════════════════════════════════════════ */

  'polycarbonate-doors': {
    heroBg: imgSectional,
    heroPrimary: 'Polycarbonate Doors.',
    heroSecondary: 'Light in. Secured.',
    heroBody: 'Transparent polycarbonate panel doors that bring natural light into workshops, showrooms, and commercial spaces without compromising security or weather resistance.',
    overviewCards: [
      { title: 'Showrooms', desc: 'Let customers see in and light flood through while maintaining a secure, weather-tight closure for display-focused retail and automotive showrooms.', stat: 'High', statLbl: 'Light Transmission', img: imgSectional },
      { title: 'Workshops', desc: 'Transparent closures for workshops and light industrial spaces where natural light improves working conditions during closed periods.', stat: 'Impact', statLbl: 'Resistant Panels', img: imgHighSpeed },
      { title: 'Agricultural', desc: 'Lightweight polycarbonate doors for greenhouse, poultry, and agricultural buildings requiring natural daylight and ventilated closures.', stat: 'UV', statLbl: 'Protected', img: imgSectional },
    ],
    variants: [
      { title: 'Single-Wall', desc: 'Single-layer polycarbonate panels providing maximum clarity and light transmission for showrooms and display areas.', badge: 'SINGLE WALL · MAX LIGHT', objPos: 'center center' },
      { title: 'Multi-Wall', desc: 'Multi-layer polycarbonate panels offering improved thermal insulation and structural rigidity for larger openings.', badge: 'MULTI WALL · INSULATED', objPos: 'center center' },
      { title: 'Tinted', desc: 'Lightly tinted polycarbonate reducing glare and heat gain while maintaining adequate interior light levels.', badge: 'TINTED · SOLAR CONTROL', objPos: 'center center' },
    ],
    features: [
      { label: 'Light', title: 'Natural light\ntransferred.', desc: 'High light transmission polycarbonate panels allow daylight to penetrate deep into interior spaces, reducing artificial lighting requirements throughout the day.', stat1: 'High', stat1Label: 'Light Transmission', stat2: 'UV', stat2Label: 'Protective Coating', img: imgSectional },
      { label: 'Strength', title: 'Impact\nresistant.', desc: 'Polycarbonate panels deliver significantly higher impact resistance than glass — maintaining structural integrity under contact, wind load, and operational wear.', stat1: 'Impact', stat1Label: 'Resistant', stat2: 'Shatter', stat2Label: 'Resistant', img: imgHighSpeed },
      { label: 'Protection', title: 'UV protected\npanels.', desc: 'UV-protective coating on all panel surfaces prevents yellowing, hazing, and surface degradation from prolonged tropical sun exposure.', stat1: 'UV', stat1Label: 'Coat Standard', stat2: 'Long', stat2Label: 'Service Life', img: imgSectional },
    ],
    stats: [
      { num: 'High', label: 'Light Transmission' },
      { num: 'UV', label: 'Protective Coating' },
      { num: 'Impact', label: 'Resistant Panels' },
      { num: 'Lightweight', label: 'Construction' },
    ],
    keyTech: {
      title: 'Transparent strength for commercial openings.',
      body: 'Polycarbonate panel door systems deliver natural light, security, and weather resistance to showrooms, workshops, and agricultural buildings.',
      items: [
        { title: 'High Light Transmission', body: 'Polycarbonate allows high levels of natural light to enter closed spaces, reducing dependence on artificial lighting during daylight hours.' },
        { title: 'Impact Resistance', body: 'Polycarbonate is many times stronger than glass of equivalent thickness, resisting impact without shattering.' },
        { title: 'UV Protective Coating', body: 'UV-resistant coatings are applied to panel surfaces to prevent yellowing and maintain optical clarity over the product life.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Panel material', 'Polycarbonate — single or multi-wall'],
        ['Light transmission', 'High natural light transmission'],
        ['UV protection', 'UV protective surface coating'],
        ['Frame', 'Aluminum or galvanized steel frame'],
        ['Operation', 'Manual or motorized options'],
      ],
    },
    ctaHeadline: 'Let the\nlight in.',
    ctaSub: 'Tell us your opening dimensions and application. We\'ll specify the right polycarbonate panel configuration.',
  },

  'fire-doors': {
    heroBg: imgSectional,
    heroPrimary: 'Fire Doors.',
    heroSecondary: 'Certified. Compliant. Critical.',
    heroBody: 'Fire-rated door systems tested to withstand fire penetration for specified durations — protecting life, property, and compliance requirements in commercial and industrial facilities.',
    overviewCards: [
      { title: 'Industrial', desc: 'Fire-rated closures for industrial plant compartmentalization — protecting production areas, fuel stores, and high-risk zones from fire spread.', stat: '2 Hour', statLbl: 'Fire Rating Available', img: imgSectional },
      { title: 'Commercial', desc: 'Compliant fire door sets for office buildings, retail centers, and commercial properties meeting building code fire safety requirements.', stat: 'Certified', statLbl: 'Fire Rating', img: imgHighSpeed },
      { title: 'Institutional', desc: 'Fire door systems for hospitals, schools, and government buildings where life safety and egress route protection are mandatory.', stat: 'Intumescent', statLbl: 'Sealed', img: imgSectional },
    ],
    variants: [
      { title: '1-Hour Rated', desc: 'Fire door systems rated to resist fire penetration for a minimum of 60 minutes — suitable for most commercial and residential applications.', badge: '60 MIN · FIRE RATED', objPos: 'center center' },
      { title: '2-Hour Rated', desc: 'Heavy-duty fire door systems rated to resist fire penetration for a minimum of 120 minutes for high-risk industrial and institutional applications.', badge: '120 MIN · FIRE RATED', objPos: 'center center' },
      { title: 'Fire Roller Shutters', desc: 'Motorized fire-rated roller shutter systems for wide-span openings that drop automatically on fire detection system activation.', badge: 'AUTO DROP · SHUTTER', objPos: 'center center' },
    ],
    features: [
      { label: 'Protection', title: 'Rated to\nresist fire.', desc: 'Fire doors are tested and certified to resist fire penetration for their rated duration, providing critical time for evacuation and fire suppression in the event of a fire.', stat1: '1-2 Hour', stat1Label: 'Fire Ratings', stat2: 'Certified', stat2Label: 'Test Standard', img: imgSectional },
      { label: 'Sealing', title: 'Intumescent\nseals.', desc: 'Intumescent seals expand under heat to fill gaps around the door frame, preventing the passage of hot gases and smoke that could compromise adjacent compartments.', stat1: 'Intumescent', stat1Label: 'Activated Seal', stat2: 'Smoke', stat2Label: 'Containment', img: imgHighSpeed },
      { label: 'Egress', title: 'Emergency\nrelease.', desc: 'Emergency release and fail-safe mechanisms ensure fire doors can be opened for egress during emergencies, or drop automatically when connected to fire detection systems.', stat1: 'Fail-Safe', stat1Label: 'Drop Mechanism', stat2: 'Emergency', stat2Label: 'Release Ready', img: imgSectional },
    ],
    stats: [
      { num: '1-2 Hr', label: 'Fire Ratings' },
      { num: 'Certified', label: 'Test Standard' },
      { num: 'Intumescent', label: 'Sealed' },
      { num: 'Fail-Safe', label: 'Drop Mechanism' },
    ],
    keyTech: {
      title: 'Life safety performance when it matters most.',
      body: 'Elcardo fire doors are specified for certified fire resistance, intumescent sealing, and fail-safe operation — meeting building code requirements for compartmentalization and egress protection.',
      items: [
        { title: 'Tested Fire Resistance', body: 'Fire door systems are tested to certify their resistance duration against fire penetration, heat transmission, and structural integrity under fire conditions.' },
        { title: 'Intumescent Sealing Technology', body: 'Intumescent strips expand rapidly when exposed to heat, filling perimeter gaps to prevent the passage of flame, hot gas, and smoke.' },
        { title: 'Fail-Safe Drop Systems', body: 'Fire roller shutters are integrated with fire detection systems to drop automatically and close openings when a fire alarm is triggered.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Fire ratings', '1-hour (60 min) and 2-hour (120 min) options'],
        ['Seal type', 'Intumescent seals — heat activated'],
        ['Smoke control', 'Smoke seal options at door perimeter'],
        ['Emergency release', 'Manual release and automatic drop mechanisms'],
        ['Applications', 'Industrial, commercial, institutional buildings'],
      ],
    },
    ctaHeadline: 'Protect your\nbuilding.',
    ctaSub: 'Tell us your opening dimensions, required fire rating, and building type. We\'ll specify the right fire door system.',
  },

  /* ══════════════════════════════════════════════════════════
     ARCHITECTURAL EXTERIOR — NEW PRODUCTS
  ══════════════════════════════════════════════════════════ */

  'wpc-cladding': {
    heroBg: imgWPCDeck,
    heroPrimary: 'WPC Wall Cladding.',
    heroSecondary: 'Timber look. Zero maintenance.',
    heroBody: 'Wood-plastic composite wall cladding panels delivering a natural timber aesthetic to exterior facades and interior feature walls — without painting, sealing, or ongoing upkeep.',
    overviewCards: [
      { title: 'Commercial Facades', desc: 'Distinctive timber-look facade cladding for offices, retail buildings, and commercial developments that stands out while requiring no maintenance.', stat: 'No Paint', statLbl: 'Required', img: imgWPCDeck },
      { title: 'Residential Exteriors', desc: 'Beautiful timber-effect exterior cladding for homes — resistant to tropical weather, termites, and UV without the cost of natural timber maintenance.', stat: 'UV', statLbl: 'Stabilized', img: imgWPC },
      { title: 'Interior Feature Walls', desc: 'Warm timber-grain panels for interior accent walls in hotel lobbies, restaurants, and corporate spaces.', stat: 'Termite', statLbl: 'Proof', img: imgWood },
    ],
    variants: [
      { title: 'Horizontal Cladding', desc: 'Traditional horizontal board installation for classic linear facades and weatherboard-style residential exteriors.', badge: 'HORIZONTAL · BOARD PROFILE', objPos: 'center center' },
      { title: 'Vertical Cladding', desc: 'Contemporary vertical board or batten installation for modern commercial and residential facades.', badge: 'VERTICAL · CONTEMPORARY', objPos: 'center center' },
      { title: 'Decorative Panels', desc: 'Pre-designed decorative panel systems with pattern profiles for feature walls and accent facade sections.', badge: 'DECORATIVE · FEATURE PANEL', objPos: 'center center' },
    ],
    features: [
      { label: 'Durability', title: 'Built for tropical\nclimates.', desc: 'WPC cladding resists moisture penetration, tropical heat, UV radiation, and the insects that degrade natural timber, making it ideal for Sri Lanka\'s climate conditions.', stat1: 'Weather', stat1Label: 'Resistant', stat2: 'Termite', stat2Label: 'Proof', img: imgWPCDeck },
      { label: 'Aesthetics', title: 'Natural timber\nlook.', desc: 'Deep wood-grain texturing and natural colour pigmentation create a timber appearance indistinguishable from natural wood at normal viewing distances.', stat1: 'Timber', stat1Label: 'Look & Feel', stat2: 'Multi', stat2Label: 'Grain Options', img: imgWPC },
      { label: 'Maintenance', title: 'Zero\nmaintenance.', desc: 'No painting, sealing, staining, or retreating — ever. WPC cladding retains its appearance without any surface treatment throughout its service life.', stat1: 'No Paint', stat1Label: 'Required', stat2: 'No Seal', stat2Label: 'Required', img: imgWood },
    ],
    stats: [
      { num: 'No Paint', label: 'Ever Required' },
      { num: 'UV', label: 'Stabilized Colour' },
      { num: 'Termite', label: 'Proof' },
      { num: 'Timber', label: 'Look & Feel' },
    ],
    keyTech: {
      title: 'Composite cladding for tropical durability.',
      body: 'Elcardo WPC cladding combines a composite wood-plastic core with surface texturing that replicates natural timber — delivering exterior performance that natural timber cannot match in tropical conditions.',
      items: [
        { title: 'Composite Material Core', body: 'The WPC core resists moisture absorption, termite attack, and fungal growth that cause natural timber cladding to degrade in tropical conditions.' },
        { title: 'UV Colour Stabilisation', body: 'UV stabilisers in the board formulation prevent colour fading from tropical sun exposure, maintaining timber-look appearance over many years.' },
        { title: 'Zero Maintenance Surface', body: 'The sealed composite surface requires no ongoing painting, staining, or sealing — reducing the total cost of ownership versus natural timber cladding.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Material', 'Wood-plastic composite'],
        ['Installation', 'Horizontal and vertical board options'],
        ['Maintenance', 'None — no paint, seal, or stain required'],
        ['UV stability', 'UV-stabilised colour formulation'],
        ['Applications', 'Exterior facades, interior feature walls'],
        ['Pest resistance', 'Termite and insect proof'],
      ],
    },
    ctaHeadline: 'Clad your\nfacade.',
    ctaSub: 'Tell us your wall area, orientation, and colour preference. We\'ll specify the right WPC cladding profile.',
  },

  'wpc-fencing': {
    heroBg: imgWPCDeck,
    heroPrimary: 'WPC Fencing.',
    heroSecondary: 'Privacy. No maintenance.',
    heroBody: 'Wood-plastic composite fencing panels for residential and commercial privacy boundaries — delivering the look of timber without rot, warping, or painting.',
    overviewCards: [
      { title: 'Residential', desc: 'Privacy fencing for homes and garden boundaries — combining natural timber aesthetics with the durability of composite materials.', stat: 'No Paint', statLbl: 'Required', img: imgWPCDeck },
      { title: 'Commercial', desc: 'Perimeter and boundary fencing for commercial sites, resorts, and hospitality properties where appearance matters alongside performance.', stat: 'UV', statLbl: 'Stabilized', img: imgWPC },
      { title: 'Pool Surrounds', desc: 'WPC pool fencing designed to resist constant moisture exposure in pool and waterfront environments without deteriorating.', stat: 'Termite', statLbl: 'Proof', img: imgWood },
    ],
    variants: [
      { title: 'Privacy Panels', desc: 'Full-height privacy fence panels providing complete screening for residential gardens, pools, and outdoor living areas.', badge: 'PRIVACY · FULL HEIGHT', objPos: 'center center' },
      { title: 'Decorative Fencing', desc: 'Lower-profile decorative fence panels for garden borders, pathway definition, and aesthetic perimeter marking.', badge: 'DECORATIVE · GARDEN STYLE', objPos: 'center center' },
      { title: 'Louvre Fence', desc: 'Adjustable louvre-profile fencing panels that provide privacy while allowing airflow through the fence panel.', badge: 'LOUVRE · VENTILATED', objPos: 'center center' },
    ],
    features: [
      { label: 'Durability', title: 'Rot-proof\nfor life.', desc: 'WPC composite material does not rot, warp, or split in moisture-rich environments — eliminating the primary failure mode of natural timber fencing in tropical climates.', stat1: 'Rot', stat1Label: 'Proof', stat2: 'Warp', stat2Label: 'Resistant', img: imgWPCDeck },
      { label: 'Aesthetics', title: 'Natural timber\nappearance.', desc: 'Wood-grain texture panels deliver a warm, natural appearance that complements gardens, pools, and outdoor living areas without the maintenance of natural timber.', stat1: 'Timber', stat1Label: 'Look', stat2: 'Multiple', stat2Label: 'Colours', img: imgWPC },
      { label: 'Maintenance', title: 'Zero ongoing\nmaintenance.', desc: 'WPC fence panels need no painting, staining, or treating — ever. An occasional wash is all that is needed to maintain appearance throughout the product\'s service life.', stat1: 'No Paint', stat1Label: 'Required', stat2: 'No Seal', stat2Label: 'Required', img: imgWood },
    ],
    stats: [
      { num: 'Rot', label: 'Proof Material' },
      { num: 'No Paint', label: 'Ever Required' },
      { num: 'UV', label: 'Stabilized' },
      { num: 'Termite', label: 'Proof' },
    ],
    keyTech: {
      title: 'Composite fencing for outdoor performance.',
      body: 'Elcardo WPC fencing eliminates the maintenance and deterioration challenges of natural timber fencing while delivering the same natural timber appearance in outdoor environments.',
      items: [
        { title: 'Rot and Moisture Resistance', body: 'The WPC composite core does not absorb moisture and will not rot, split, or warp under prolonged exposure to rain, irrigation, and high humidity.' },
        { title: 'UV Colour Stability', body: 'UV-stabilised colour formulation maintains the timber-look appearance of fence panels across many years of direct sunlight exposure.' },
        { title: 'Zero Maintenance', body: 'WPC fence panels require no painting, staining, treating, or sealing — saving significant time and cost over the product service life compared to natural timber.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Material', 'Wood-plastic composite'],
        ['Pest resistance', 'Termite and insect proof'],
        ['Moisture', 'Rot and warp resistant'],
        ['Maintenance', 'No paint, stain, or seal required'],
        ['UV stability', 'UV-stabilised colour'],
        ['Applications', 'Residential, commercial, pool surrounds, gardens'],
      ],
    },
    ctaHeadline: 'Define your\nboundary.',
    ctaSub: 'Tell us your fence run length, height, and colour preference. We\'ll specify the right WPC fencing system.',
  },

  'wpc-architectural': {
    heroBg: imgWPCDeck,
    heroPrimary: 'WPC Architectural Elements.',
    heroSecondary: 'Design detail. No upkeep.',
    heroBody: 'WPC louvers, fins, railings, skirting, and landscape panels — architectural timber-look elements that bring design consistency and material longevity to every project.',
    overviewCards: [
      { title: 'Facade Screens', desc: 'WPC louvers and fins for architectural facade screening — creating shadow, rhythm, and privacy on building exteriors without ongoing maintenance.', stat: 'No Paint', statLbl: 'Required', img: imgWPCDeck },
      { title: 'Railings', desc: 'Structural WPC railing systems for balconies, staircases, and elevated walkways — delivering timber aesthetics with composite durability.', stat: 'Structural', statLbl: 'Core', img: imgWPC },
      { title: 'Landscape Elements', desc: 'WPC landscape panels, garden borders, and outdoor structures that extend the timber-look design language from the building to the garden.', stat: 'UV', statLbl: 'Stabilized', img: imgWood },
    ],
    variants: [
      { title: 'WPC Louvers', desc: 'Horizontal or vertical louvre elements for facade screens, privacy screening, and decorative architectural grilles.', badge: 'LOUVERS · FACADE SCREEN', objPos: 'center center' },
      { title: 'WPC Fins', desc: 'Vertical fin elements mounted to facades or interior walls for shadow pattern, visual rhythm, and architectural depth.', badge: 'FINS · VERTICAL ELEMENTS', objPos: 'center center' },
      { title: 'WPC Railings', desc: 'Balcony and staircase railing systems using WPC top rails with aluminum or steel post and sub-frame systems.', badge: 'RAILINGS · BALCONY & STAIR', objPos: 'center center' },
      { title: 'Skirting & Landscape', desc: 'WPC skirting boards for interior base detailing and landscape panels for garden edging and outdoor structures.', badge: 'SKIRTING · LANDSCAPE', objPos: 'center center' },
    ],
    features: [
      { label: 'Facade', title: 'Architectural\nscreen elements.', desc: 'WPC louver and fin systems are designed for architectural specification, providing facade depth, shadow interest, and sun control without the degradation of natural timber screen systems.', stat1: 'Timber', stat1Label: 'Look', stat2: 'No Seal', stat2Label: 'Required', img: imgWPCDeck },
      { label: 'Railings', title: 'Composite\nrailing systems.', desc: 'WPC top rail on aluminum or steel sub-frame systems provides a premium timber-look railing solution for balconies, staircases, and walkways with structural confidence.', stat1: 'Structural', stat1Label: 'Sub-Frame', stat2: 'Composite', stat2Label: 'Top Rail', img: imgWPC },
      { label: 'Landscape', title: 'Garden to\nfacade.', desc: 'WPC landscape panels and skirting extend the timber-look material language from the building facade to the surrounding garden and landscape — creating a coherent design result.', stat1: 'Consistent', stat1Label: 'Design Language', stat2: 'UV', stat2Label: 'Stabilized', img: imgWood },
    ],
    stats: [
      { num: 'Custom', label: 'Lengths Available' },
      { num: 'No Paint', label: 'Required' },
      { num: 'Structural', label: 'Core Options' },
      { num: 'UV', label: 'Stabilized' },
    ],
    keyTech: {
      title: 'WPC architectural detailing from facade to garden.',
      body: 'Elcardo WPC architectural elements deliver the full vocabulary of timber-look detailing — louvers, fins, railings, skirting, and landscape panels — in a material that requires no maintenance.',
      items: [
        { title: 'Louvre and Fin Systems', body: 'WPC louvre and fin elements are produced in structural composite profiles that can be mounted to aluminum or steel sub-frames for architectural facade applications.' },
        { title: 'Railing Sub-Frame Integration', body: 'WPC top rails are designed to pair with aluminum or steel post-and-rail sub-frames, combining timber aesthetics with the structural confidence of metal framing.' },
        { title: 'Full Project Range', body: 'The complete range of louvers, fins, railings, skirting, and landscape panels allows architects and designers to specify a consistent timber-look material language across the full project.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Products', 'Louvers, fins, railings, skirting, landscape panels'],
        ['Material', 'Structural wood-plastic composite'],
        ['Lengths', 'Custom lengths to project specification'],
        ['Sub-frame', 'Aluminum or steel sub-frame systems'],
        ['Maintenance', 'No paint, seal, or treat required'],
        ['UV stability', 'UV-stabilised colour formulation'],
      ],
    },
    ctaHeadline: 'Specify your\nelements.',
    ctaSub: 'Tell us which WPC architectural elements your project needs and the dimensions. We\'ll prepare a specification and quantity schedule.',
  },

  'exterior-cladding': {
    heroBg: imgRoofing,
    heroPrimary: 'Exterior Cladding.',
    heroSecondary: 'Durable. Designed. Installed.',
    heroBody: 'Architectural facade and exterior wall cladding systems providing durable, weather-resistant finishes and contemporary aesthetics for commercial and industrial buildings.',
    overviewCards: [
      { title: 'Commercial', desc: 'Contemporary cladding facades for offices, retail centers, and mixed-use commercial developments requiring modern exterior finishes.', stat: 'Weather', statLbl: 'Resistant', img: imgRoofing },
      { title: 'Industrial', desc: 'Durable cladding systems for factory buildings and warehouses providing weather protection and improved building aesthetics.', stat: 'Lightweight', statLbl: 'Panel System', img: imgPipes },
      { title: 'Institutional', desc: 'Long-life cladding solutions for schools, hospitals, and government buildings requiring durable, easy-clean exterior finishes.', stat: 'Custom', statLbl: 'Colour Options', img: imgRoofing },
    ],
    variants: [
      { title: 'Metal Cladding', desc: 'Colour-bonded steel and aluminum cladding panels for industrial and commercial building envelope applications.', badge: 'METAL · COLOUR BONDED', objPos: 'center center' },
      { title: 'Composite Panels', desc: 'Aluminum composite panels for modern commercial facades requiring a flat, contemporary finish with multiple colour options.', badge: 'COMPOSITE · FLAT PANEL', objPos: 'center center' },
      { title: 'Facade Cladding Sheets', desc: 'Cladding profile sheets for quick-install industrial and commercial facade applications with weather-resistant coating.', badge: 'PROFILE SHEET · COMMERCIAL', objPos: 'center center' },
    ],
    features: [
      { label: 'Weather', title: 'Built for\ntropical climates.', desc: 'Exterior cladding systems are specified and installed to resist Sri Lanka\'s tropical weather conditions — managing rain, UV exposure, and thermal expansion over long service lives.', stat1: 'Weather', stat1Label: 'Resistant', stat2: 'UV', stat2Label: 'Protective', img: imgRoofing },
      { label: 'Aesthetics', title: 'Contemporary\nfacades.', desc: 'Cladding systems transform the appearance of commercial and industrial buildings, creating contemporary architectural facades with custom colour and profile options.', stat1: 'Custom', stat1Label: 'Colour Options', stat2: 'Modern', stat2Label: 'Aesthetic', img: imgPipes },
      { label: 'Installation', title: 'Panel system\ninstallation.', desc: 'Lightweight panel and rail installation systems allow cladding to be installed efficiently over existing or new building structures without heavy plant.', stat1: 'Lightweight', stat1Label: 'Panel System', stat2: 'Efficient', stat2Label: 'Installation', img: imgRoofing },
    ],
    stats: [
      { num: 'Weather', label: 'Resistant' },
      { num: 'Custom', label: 'Colour Options' },
      { num: 'Lightweight', label: 'Panel System' },
      { num: 'Long', label: 'Service Life' },
    ],
    keyTech: {
      title: 'Facade systems for commercial performance.',
      body: 'Elcardo exterior cladding systems deliver weather resistance, contemporary aesthetics, and installation efficiency for commercial and industrial building envelopes.',
      items: [
        { title: 'Weather-Resistant Materials', body: 'Cladding materials are specified for resistance to tropical weather conditions — UV radiation, heavy rain, humidity, and thermal cycling.' },
        { title: 'Custom Colour Options', body: 'Colour-bonded and powder-coated finishes allow cladding panels to be supplied in custom colours to meet architectural and brand specifications.' },
        { title: 'Lightweight Panel Systems', body: 'Lightweight panel and rail fixing systems reduce structural load on the building envelope and allow efficient site installation.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Materials', 'Metal, composite, and cladding sheet options'],
        ['Weather resistance', 'Tropical climate specification'],
        ['Colour options', 'Custom colour and powder-coat options'],
        ['Installation', 'Panel and rail fixing system'],
        ['Applications', 'Commercial, industrial, institutional buildings'],
      ],
    },
    ctaHeadline: 'Transform your\nfacade.',
    ctaSub: 'Tell us your building type, wall area, and preferred aesthetic. We\'ll specify the right cladding system.',
  },

  'fencing-systems': {
    heroBg: imgGatesProd,
    heroPrimary: 'Fencing Systems.',
    heroSecondary: 'Boundary. Security. Defined.',
    heroBody: 'Comprehensive fencing solutions across metal, wire, and composite materials — for residential garden privacy through to heavy industrial perimeter security.',
    overviewCards: [
      { title: 'Residential', desc: 'Decorative and privacy fencing for homes, gardens, and gated residential communities in metal, wire, and composite options.', stat: 'Multiple', statLbl: 'Material Options', img: imgGatesProd },
      { title: 'Industrial', desc: 'Heavy-duty perimeter security fencing for factory compounds, warehouses, and industrial sites requiring reliable access control.', stat: 'Anti-Climb', statLbl: 'Profiles', img: imgGatesRes },
      { title: 'Commercial', desc: 'Commercial boundary fencing for offices, retail centers, and commercial parks — balancing security with aesthetic presentation.', stat: 'Corrosion', statLbl: 'Resistant', img: imgGatesCom },
    ],
    variants: [
      { title: 'Metal Fencing', desc: 'Galvanized and powder-coated steel fence panels and rails for durable residential and commercial perimeter applications.', badge: 'METAL · GALVANIZED', objPos: 'center center' },
      { title: 'Security Fencing', desc: 'Heavy-gauge security fence panels with anti-climb profiles and reinforced fixings for industrial and institutional security perimeters.', badge: 'SECURITY · ANTI-CLIMB', objPos: 'center center' },
      { title: 'Wire Fencing', desc: 'Chain link and wire fence systems for cost-effective perimeter definition on agricultural, industrial, and large boundary applications.', badge: 'WIRE · CHAIN LINK', objPos: 'center center' },
    ],
    features: [
      { label: 'Security', title: 'Industrial\nperimeter protection.', desc: 'Heavy-gauge security fencing with anti-climb profiles and reinforced panel construction provides a robust physical deterrent for industrial and institutional perimeter security.', stat1: 'Anti-Climb', stat1Label: 'Profile', stat2: 'Heavy', stat2Label: 'Gauge Steel', img: imgGatesProd },
      { label: 'Durability', title: 'Corrosion-resistant\nfinishes.', desc: 'Galvanized and powder-coated finishes protect fencing from rust and corrosion in outdoor environments — extending service life without ongoing maintenance.', stat1: 'Galvanized', stat1Label: 'Finish', stat2: 'Powder', stat2Label: 'Coated Options', img: imgGatesRes },
      { label: 'Flexibility', title: 'Range of\nmaterials.', desc: 'The fencing range spans decorative residential styles, commercial boundary panels, wire chain link, WPC composite, and heavy industrial security fencing for every application.', stat1: 'Multiple', stat1Label: 'Materials', stat2: 'Modular', stat2Label: 'Panel System', img: imgGatesCom },
    ],
    stats: [
      { num: 'Anti-Climb', label: 'Security Options' },
      { num: 'Galvanized', label: 'Finish Standard' },
      { num: 'Multiple', label: 'Material Types' },
      { num: 'Modular', label: 'Panel System' },
    ],
    keyTech: {
      title: 'Fencing for every perimeter requirement.',
      body: 'Elcardo fencing systems span residential, commercial, and industrial applications — providing corrosion-resistant, security-rated, and modular fencing solutions for any boundary requirement.',
      items: [
        { title: 'Anti-Climb Security Design', body: 'Industrial security fencing incorporates anti-climb panel profiles that reduce the ability to scale the fence — meeting security requirements for factories, government sites, and institutions.' },
        { title: 'Corrosion-Resistant Coatings', body: 'Galvanized and powder-coated finishes protect steel fencing from corrosion in outdoor environments, extending service life without repainting.' },
        { title: 'Modular Panel Systems', body: 'Fencing panels are designed in modular widths with standardised post spacings, allowing efficient installation and adaptation to irregular boundary lines.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Materials', 'Metal, wire, galvanized steel, composite'],
        ['Security', 'Anti-climb profiles for industrial applications'],
        ['Finish', 'Galvanized and powder-coated options'],
        ['System', 'Modular panel with post system'],
        ['Applications', 'Residential, commercial, industrial, government'],
      ],
    },
    ctaHeadline: 'Define your\nboundary.',
    ctaSub: 'Tell us your fence run, height, security requirement, and preferred material. We\'ll specify the right fencing system.',
  },

  /* ══════════════════════════════════════════════════════════
     FABRICATION — NEW PRODUCTS
  ══════════════════════════════════════════════════════════ */

  'nuestone-surfaces': {
    heroBg: imgPantryCtx,
    heroPrimary: 'NueStone Pantry Tops.',
    heroSecondary: 'Stone look. Superior performance.',
    heroBody: 'NueStone is Elcardo\'s prefabricated artificial stone surface — engineered to replicate premium granite with superior colour uniformity, non-porous performance, and effortless maintenance.',
    overviewCards: [
      { title: 'Kitchens', desc: 'Non-porous, stain-resistant NueStone surfaces for kitchen countertops and pantry tops — consistent colour without the variability of natural stone.', stat: 'Non-Porous', statLbl: 'Surface', img: imgPantry },
      { title: 'Bathrooms', desc: 'Premium NueStone vanity tops for hotel and residential bathrooms requiring hygienic, easy-clean surfaces with luxury stone aesthetics.', stat: 'Stain', statLbl: 'Resistant', img: imgPantryCtx },
      { title: 'Commercial', desc: 'NueStone countertops for hotel check-in desks, restaurant bars, and commercial hospitality surfaces requiring consistent, durable finishes.', stat: 'Chem.', statLbl: 'Resistant', img: imgHotel },
    ],
    variants: [
      { title: 'Pantry Tops', desc: 'Custom-cut NueStone pantry top surfaces for kitchen and pantry cabinets — precise dimensions with sink and hob cut-outs.', badge: 'PANTRY TOP · CUSTOM CUT', objPos: 'center center' },
      { title: 'Kitchen Countertops', desc: 'Full kitchen countertop installations in NueStone with seamless joins and edge profiles to suit any kitchen design.', badge: 'KITCHEN · COUNTERTOP', objPos: 'center center' },
      { title: 'Quartz Style', desc: 'NueStone in quartz-style colours and patterns — delivering the premium appearance of engineered quartz at a competitive price point.', badge: 'QUARTZ STYLE · PREMIUM LOOK', objPos: 'center center' },
    ],
    features: [
      { label: 'Performance', title: 'Non-porous.\nEasy to clean.', desc: 'NueStone\'s non-porous surface prevents liquids, oils, and bacteria from penetrating the surface — making it inherently hygienic and resistant to staining without any sealing.', stat1: 'Non-Porous', stat1Label: 'No Sealing', stat2: 'Bacteria', stat2Label: 'Resistant', img: imgPantry },
      { label: 'Consistency', title: 'Consistent colour\nevery time.', desc: 'Unlike natural stone, NueStone delivers consistent colour and pattern across every slab — allowing designers and specifiers to plan surfaces with predictable results on large projects.', stat1: 'Consistent', stat1Label: 'Colour', stat2: 'Uniform', stat2Label: 'Pattern', img: imgPantryCtx },
      { label: 'Chemical', title: 'Chemical\nresistant.', desc: 'NueStone surfaces resist the household acids, cleaning chemicals, and food-contact substances that can damage or etch natural stone over time.', stat1: 'Acid', stat1Label: 'Resistant', stat2: 'Chem.', stat2Label: 'Resistant', img: imgHotel },
    ],
    stats: [
      { num: 'Non-Porous', label: 'Surface' },
      { num: 'Stain', label: 'Resistant' },
      { num: 'Consistent', label: 'Colour' },
      { num: 'Chem.', label: 'Resistant' },
    ],
    keyTech: {
      title: 'Artificial stone engineered for superior performance.',
      body: 'NueStone is formulated to deliver the premium stone aesthetic with performance properties that natural granite cannot match — non-porous, chemically resistant, and consistently coloured.',
      items: [
        { title: 'Non-Porous Composition', body: 'NueStone\'s dense, non-porous composition prevents any liquid or bacterial penetration — eliminating the need for periodic sealing required by natural granite.' },
        { title: 'Colour Uniformity', body: 'Unlike natural stone, NueStone delivers consistent colour and pattern across all produced slabs, enabling predictable specification across large multi-slab projects.' },
        { title: 'Chemical Resistance', body: 'Resistance to household acids, cleaning agents, and food-contact substances protects the surface from the etching and staining that can affect natural stone in kitchen use.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Surface type', 'Prefabricated artificial stone'],
        ['Porosity', 'Non-porous — no sealing required'],
        ['Chemical resistance', 'Resistant to household chemicals and acids'],
        ['Stain resistance', 'High — inherent to non-porous composition'],
        ['Colour consistency', 'Uniform across all slabs'],
        ['Applications', 'Pantry tops, kitchen counters, vanity tops, commercial'],
      ],
    },
    ctaHeadline: 'Surface your\nspace.',
    ctaSub: 'Tell us your countertop dimensions and colour preference. We\'ll prepare a NueStone specification and quote.',
  },

  /* ══════════════════════════════════════════════════════════
     INDUSTRIAL — NEW PRODUCTS
  ══════════════════════════════════════════════════════════ */

  'wire-mesh': {
    heroBg: imgSteelCine,
    heroPrimary: 'Wire & Mesh Products.',
    heroSecondary: 'Secure. Durable. Supplied.',
    heroBody: 'PVC mesh, barbed wire, security mesh, and wire fencing products for perimeter security, agricultural, and industrial separation applications — supplied in bulk for trade and project use.',
    overviewCards: [
      { title: 'Security', desc: 'Security mesh and high-tensile wire fencing for perimeter security applications in industrial, commercial, and institutional sites.', stat: 'High', statLbl: 'Tensile Wire', img: imgSteelProd },
      { title: 'Agricultural', desc: 'Barbed wire and galvanized wire fencing products for agricultural boundary definition, animal control, and paddock fencing.', stat: 'Galvanized', statLbl: 'Coating', img: imgSteelCine },
      { title: 'Industrial', desc: 'PVC mesh and security mesh for industrial separation, safety screening, and perimeter enclosure applications.', stat: 'PVC', statLbl: 'Coated Options', img: imgSteelProd },
    ],
    variants: [
      { title: 'PVC Mesh', desc: 'PVC-coated wire mesh in multiple aperture sizes for perimeter fencing, garden enclosures, and animal management applications.', badge: 'PVC MESH · COATED', objPos: 'center center' },
      { title: 'Barbed Wire', desc: 'Galvanized barbed wire for agricultural boundary and security perimeter top-wire applications.', badge: 'BARBED WIRE · GALVANIZED', objPos: 'center center' },
      { title: 'Security Mesh', desc: 'Heavy-gauge welded security mesh panels for high-security perimeter fencing applications requiring anti-cut and anti-climb properties.', badge: 'SECURITY MESH · WELDED', objPos: 'center center' },
    ],
    features: [
      { label: 'Security', title: 'High-tensile\nwire security.', desc: 'High-tensile wire mesh and security panels provide a robust physical barrier for perimeter security applications — resisting cutting, climbing, and deformation under attack.', stat1: 'High', stat1Label: 'Tensile Wire', stat2: 'Anti-Cut', stat2Label: 'Properties', img: imgSteelProd },
      { label: 'Durability', title: 'Corrosion-resistant\ncoatings.', desc: 'Galvanized and PVC-coated wire products resist rust and corrosion in outdoor environments, extending the operational life of fencing and mesh installations.', stat1: 'Galvanized', stat1Label: 'Coating', stat2: 'PVC', stat2Label: 'Coating Option', img: imgSteelCine },
      { label: 'Supply', title: 'Bulk roll\nsupply.', desc: 'Wire and mesh products are supplied in standard bulk roll formats for project and trade use, with volume pricing available for large fencing programs.', stat1: 'Bulk', stat1Label: 'Roll Supply', stat2: 'Trade', stat2Label: 'Pricing', img: imgSteelProd },
    ],
    stats: [
      { num: 'High', label: 'Tensile Wire' },
      { num: 'Galvanized', label: 'Coating' },
      { num: 'PVC', label: 'Coated Options' },
      { num: 'Bulk', label: 'Roll Supply' },
    ],
    keyTech: {
      title: 'Wire and mesh for every perimeter application.',
      body: 'Elcardo wire and mesh products span PVC mesh, barbed wire, and security mesh panels — supplied in bulk for agricultural, industrial, and commercial perimeter fencing applications.',
      items: [
        { title: 'PVC Coating Technology', body: 'PVC coating applied over the wire core provides corrosion resistance and a coloured finish that extends service life in outdoor and coastal environments.' },
        { title: 'High-Tensile Wire', body: 'High-tensile wire formulations provide greater breaking load in smaller wire gauges, reducing material cost while maintaining fence strength for security applications.' },
        { title: 'Welded Security Mesh', body: 'Welded panel construction creates a rigid mesh that resists cutting and deformation better than woven wire alternatives, providing a more secure perimeter barrier.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Products', 'PVC mesh, barbed wire, security mesh, wire fencing'],
        ['Wire gauges', 'Multiple gauges to application requirement'],
        ['Apertures', 'Multiple mesh aperture sizes available'],
        ['Coating', 'PVC-coated and galvanized options'],
        ['Supply format', 'Bulk rolls for trade and project supply'],
        ['Applications', 'Security, agricultural, industrial, construction'],
      ],
    },
    ctaHeadline: 'Secure your\nperimeter.',
    ctaSub: 'Tell us your required wire type, mesh aperture, and quantity. We\'ll prepare a trade supply quote.',
  },

  'aluminum-products': {
    heroBg: imgSteelCine,
    heroPrimary: 'Aluminum Products.',
    heroSecondary: 'Lightweight. Architectural. Precision.',
    heroBody: 'Aluminum slats, profiles, and powder-coated architectural components for decorative facades, louvre screens, and interior and exterior cladding applications.',
    overviewCards: [
      { title: 'Facade Screens', desc: 'Aluminum slat and louvre systems for architectural facade screens providing sun control, privacy, and visual interest on commercial buildings.', stat: 'Powder', statLbl: 'Coated Finish', img: imgSteelProd },
      { title: 'Interior Fit-Outs', desc: 'Precision aluminum profiles and components for interior feature walls, partition systems, and architectural interior fit-out applications.', stat: 'Custom', statLbl: 'Profiles', img: imgSSProject },
      { title: 'Cladding', desc: 'Aluminum cladding profiles and decorative panels for commercial and residential exterior wall cladding applications.', stat: 'Lightweight', statLbl: 'Construction', img: imgSteelCine },
    ],
    variants: [
      { title: 'Aluminum Slats', desc: 'Flat aluminum slat profiles for louvre screens, facade screens, and decorative wall cladding in custom widths and lengths.', badge: 'SLATS · FLAT PROFILE', objPos: 'center center' },
      { title: 'Aluminum Profiles', desc: 'Extruded aluminum structural and decorative profiles for architectural applications including frames, trims, and functional sections.', badge: 'PROFILES · EXTRUDED', objPos: 'center center' },
      { title: 'Powder Coated Components', desc: 'Aluminum components powder coated in custom colours to project specification for consistent architectural facade applications.', badge: 'POWDER COAT · CUSTOM COLOUR', objPos: 'center center' },
    ],
    features: [
      { label: 'Lightweight', title: 'Lightweight and\nstructurally strong.', desc: 'Aluminum\'s high strength-to-weight ratio makes it ideal for architectural facade applications where structural performance is needed without the weight penalty of steel.', stat1: 'Lightweight', stat1Label: 'Low Dead Load', stat2: 'High', stat2Label: 'Strength Ratio', img: imgSteelProd },
      { label: 'Finish', title: 'Powder coated\nin any colour.', desc: 'Custom powder coat colours allow aluminum components to be specified in any project colour, integrating seamlessly with the architectural palette of any building design.', stat1: 'Custom', stat1Label: 'Colour', stat2: 'Powder', stat2Label: 'Coated', img: imgSSProject },
      { label: 'Durability', title: 'Inherently\ncorrosion resistant.', desc: 'Aluminum forms a natural oxide layer that protects the base metal from corrosion — making it a long-life material choice for exterior architectural applications in tropical climates.', stat1: 'Corrosion', stat1Label: 'Resistant', stat2: 'Long', stat2Label: 'Service Life', img: imgSteelCine },
    ],
    stats: [
      { num: 'Lightweight', label: 'Construction' },
      { num: 'Custom', label: 'Colour Options' },
      { num: 'Corrosion', label: 'Resistant' },
      { num: 'Precision', label: 'Extruded Profiles' },
    ],
    keyTech: {
      title: 'Architectural aluminum for modern projects.',
      body: 'Elcardo aluminum slats, profiles, and powder-coated components deliver lightweight architectural performance for facade screens, cladding, and interior fit-out applications.',
      items: [
        { title: 'Extruded Profile Accuracy', body: 'Precision extrusion processes deliver aluminum profiles with consistent cross-section dimensions, ensuring accurate fit in architectural sub-frame and fixing systems.' },
        { title: 'Custom Powder Coating', body: 'Powder coat finishing in custom colours allows aluminum components to match any project architectural palette with durable, UV-stable colour.' },
        { title: 'Corrosion Resistance', body: 'Natural aluminum oxide formation and powder-coat protection combine to provide long-service corrosion resistance in outdoor and coastal environments.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Products', 'Aluminum slats, profiles, powder-coated components'],
        ['Material', 'Extruded aluminum alloy'],
        ['Finish', 'Powder-coated in custom colours'],
        ['Corrosion', 'Inherently corrosion resistant'],
        ['Applications', 'Facades, louvres, cladding, interior fit-outs'],
      ],
    },
    ctaHeadline: 'Specify your\naluminum.',
    ctaSub: 'Tell us your profile type, dimensions, and colour. We\'ll supply precision-cut aluminum components to your project specification.',
  },

  'roller-door-components': {
    heroBg: imgRollerDoors,
    heroPrimary: 'Roller Door Components.',
    heroSecondary: 'Every part. Trade supply.',
    heroBody: 'Complete range of roller door hardware, spare parts, and control systems — torsion springs, guide rails, drum wheels, bottom bars, weather seals, and automation components for trade and contractor supply.',
    overviewCards: [
      { title: 'Service & Repair', desc: 'Genuine replacement components for roller door servicing and emergency repair — springs, guides, wheels, and seals stocked for rapid contractor supply.', stat: 'Full', statLbl: 'Parts Range', img: imgRollerDoors },
      { title: 'New Installations', desc: 'Complete component sets for new roller door installations — all mechanical and automation parts from a single trade supplier.', stat: 'Complete', statLbl: 'System Parts', img: imgShutterProd },
      { title: 'Automation Parts', desc: 'Control boxes, remote systems, and motor accessories for roller door automation installations and upgrades.', stat: 'Smart', statLbl: 'Control Options', img: imgRollerDoors },
    ],
    variants: [
      { title: 'Mechanical Parts', desc: 'Torsion springs, drum wheels, guide rails, bottom bars, nylon wheels, pipe holders, spring clamps, and weather seals for all roller door systems.', badge: 'MECHANICAL · FULL RANGE', objPos: 'center center' },
      { title: 'Control Systems', desc: 'Control boxes and remote systems for motorized roller door automation — compatible with residential and commercial systems.', badge: 'CONTROL BOX · REMOTE SYSTEM', objPos: 'center center' },
      { title: 'Weather Seals', desc: 'Perimeter weather seals and draught seals for roller doors — reducing dust, water, and insect ingress around door openings.', badge: 'WEATHER SEAL · PERIMETER', objPos: 'center center' },
    ],
    features: [
      { label: 'Range', title: 'Complete\ncomponent range.', desc: 'Elcardo stocks torsion springs, drum wheels, guide rails, bottom bars, nylon wheels, pipe holders, spring clamps, weather seals, control boxes, and remote systems — covering the full component set for roller door systems.', stat1: 'Full', stat1Label: 'Parts Range', stat2: 'All', stat2Label: 'System Types', img: imgRollerDoors },
      { label: 'Automation', title: 'Control and\nautomation parts.', desc: 'Control boxes, remote systems, and motor accessories are stocked to support new automation installations, system upgrades, and replacement of failed automation components.', stat1: 'Smart', stat1Label: 'Control', stat2: 'Remote', stat2Label: 'Systems', img: imgShutterProd },
      { label: 'Supply', title: 'Trade and\nbulk supply.', desc: 'Trade accounts and volume pricing are available for service contractors, installers, and building companies requiring regular roller door component supply.', stat1: 'Trade', stat1Label: 'Accounts', stat2: 'Bulk', stat2Label: 'Pricing', img: imgRollerDoors },
    ],
    stats: [
      { num: 'Full', label: 'Parts Range Stocked' },
      { num: 'All', label: 'System Types' },
      { num: 'Trade', label: 'Supply Available' },
      { num: 'Rapid', label: 'Parts Availability' },
    ],
    keyTech: {
      title: 'One source for all roller door parts.',
      body: 'Elcardo supplies the complete range of roller door mechanical and automation components from a single trade source, supporting service contractors and installation teams across Sri Lanka.',
      items: [
        { title: 'Torsion Spring Systems', body: 'Torsion springs are the core counterbalancing mechanism in roller door systems — correctly specified springs matched to the door weight ensure balanced, smooth operation.' },
        { title: 'Drive and Guide Systems', body: 'Guide rails, drum wheels, and nylon guide wheels ensure the door travels smoothly and quietly within its track — critical components for reliable daily operation.' },
        { title: 'Remote and Control Technology', body: 'Control boxes and remote systems are specified to match the motor and door system for reliable automated operation with obstacle detection and manual override capability.' },
      ],
    },
    specsTabs: {
      'Overview': [
        ['Mechanical parts', 'Torsion springs, drum wheels, guide rails, bottom bars, nylon wheels'],
        ['Fixings', 'Pipe holders, spring clamps, weather seals'],
        ['Automation', 'Control boxes, remote systems, motor accessories'],
        ['Supply', 'Trade and bulk project supply'],
        ['Compatibility', 'Matched to system type and opening size'],
        ['Applications', 'Service, repair, new installation, trade supply'],
      ],
    },
    ctaHeadline: 'Get the\nparts you need.',
    ctaSub: 'Tell us the component, door system, and quantity. We\'ll supply the right parts for your installation or service job.',
  },
};
