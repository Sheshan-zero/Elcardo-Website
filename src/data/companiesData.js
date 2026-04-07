import imgRollerGates from '../assets/company_roller_gates.png';
import imgSolar from '../assets/company_solar.png';
import imgBattery from '../assets/company_battery.png';
import imgHotel from '../assets/company_hotel.png';
import imgPantry from '../assets/company_pantry.png';
import imgAutomotive from '../assets/company_automotive.png';

/* ============================================================
   COMPANIES DATA — Corporate Brand Theme
   ============================================================ */

export const companies = [
  {
    id: 'roller-gates',
    index: '01',
    name: 'Elcardo Roller Gates',
    sector: 'Engineering & Access Systems',
    description:
      'We manufacture industrial-grade automated gate systems, roller shutters, and advanced entry automation solutions engineered for commercial and industrial-scale facilities.',
    image: imgRollerGates,
    ctaLink: '/roller-gates',
    stats: {
      metric1: '500+',
      label1: 'Installations',
      metric2: '24/7',
      label2: 'Support',
    },
    theme: {
      accent: 'var(--primary-navy)',
    },
  },
  {
    id: 'solar',
    index: '02',
    name: 'Elcardo Solar',
    sector: 'Renewable Energy',
    description:
      'Delivering end-to-end solar energy solutions—from residential rooftop systems to utility-scale commercial solar installations driving Sri Lanka toward a sustainable future.',
    image: imgSolar,
    ctaLink: '#',
    stats: {
      metric1: '50MW+',
      label1: 'Generated',
      metric2: '10 Yrs',
      label2: 'Warranty',
    },
    theme: {
      accent: 'var(--accent-red)',
    },
  },
  {
    id: 'battery',
    index: '03',
    name: 'Elme Battery',
    sector: 'Clean Technology',
    description:
      'Developing advanced energy storage systems engineered for reliability, longevity, and sustainable performance in both residential and industrial applications.',
    image: imgBattery,
    ctaLink: '#',
    stats: {
      metric1: '98%',
      label1: 'Efficiency',
      metric2: '5 Yrs',
      label2: 'Lifespan',
    },
    theme: {
      accent: 'var(--mid-blue)',
    },
  },
  {
    id: 'hotels',
    index: '04',
    name: 'Anilad Hotels',
    sector: 'Hospitality',
    description:
      'A curated portfolio of luxury and boutique hotels delivering world-class hospitality, blending modern elegance with authentic Sri Lankan warmth.',
    image: imgHotel,
    ctaLink: '#',
    stats: {
      metric1: '3',
      label1: 'Properties',
      metric2: '5-Star',
      label2: 'Service',
    },
    theme: {
      accent: 'var(--primary-navy)',
    },
  },
  {
    id: 'pantry',
    index: '05',
    name: 'Elcardo Pantry',
    sector: 'Interiors & Functional Spaces',
    description:
      'Designing and manufacturing premium functional interior solutions, specializing in modern pantry systems crafted for sophisticated residential and commercial environments.',
    image: imgPantry,
    ctaLink: '#',
    stats: {
      metric1: 'Premium',
      label1: 'Finishes',
      metric2: 'Custom',
      label2: 'Design',
    },
    theme: {
      accent: 'var(--mid-gray)',
    },
  },
  {
    id: 'automotive',
    index: '06',
    name: 'Vehicle Modification',
    sector: 'Automotive Performance',
    description:
      'Providing bespoke vehicle customization, advanced performance engineering, and robust commercial fleet solutions tailored strictly to client specifications.',
    image: imgAutomotive,
    ctaLink: '#',
    stats: {
      metric1: '1000+',
      label1: 'Vehicles',
      metric2: 'ISO',
      label2: 'Certified',
    },
    theme: {
      accent: 'var(--accent-red)',
    },
  },
];

export const featuredProjects = [
  {
    id: 'proj-1',
    company: 'Elcardo Roller Gates',
    title: 'Colombo Port City — Secure Access Infrastructure',
    category: 'Industrial Automation',
    location: 'Colombo, Sri Lanka',
    image: imgRollerGates,
    featured: true,
  },
  {
    id: 'proj-2',
    company: 'Elcardo Solar',
    title: '2.5MW Commercial Solar Farm',
    category: 'Renewable Energy',
    location: 'Hambantota, Sri Lanka',
    image: imgSolar,
    featured: false,
  },
  {
    id: 'proj-3',
    company: 'Elme Battery',
    title: 'Industrial Grid Storage System',
    category: 'Energy Storage',
    location: 'Kandy, Sri Lanka',
    image: imgBattery,
    featured: false,
  },
  {
    id: 'proj-4',
    company: 'Anilad Hotels',
    title: 'Boutique Resort — Southern Coast',
    category: 'Luxury Hospitality',
    location: 'Galle, Sri Lanka',
    image: imgHotel,
    featured: false,
  },
];
