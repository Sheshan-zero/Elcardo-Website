import imgRollerGates from '../assets/company_roller_gates.png';
import imgSolar from '../assets/company_solar.png';
import imgSteel from '../assets/company_battery.png';
import imgHotel from '../assets/company_hotel.png';
import imgPantry from '../assets/company_pantry.png';
import imgAutomotive from '../assets/company_automotive.png';

/* ============================================================
   COMPANIES DATA - Corporate Brand Theme
   ============================================================ */

export const companies = [
  {
    id: 'industries',
    index: '01',
    name: 'Elcardo Industries',
    sector: 'Engineering & Access Systems',
    description:
      'The ISO-recognized pioneer in Sri Lankan roller doors and roller shutters, manufacturing access systems with Australian technology and state-of-the-art machinery.',
    image: imgRollerGates,
    ctaLink: '/roller-gates',
    stats: {
      metric1: 'ISO',
      label1: '9001:2015',
      metric2: '1985',
      label2: 'Registered',
    },
    theme: {
      accent: 'var(--primary-navy)',
    },
  },
  {
    id: 'elsolar',
    index: '02',
    name: 'Elcardo Elsolar',
    sector: 'Renewable Energy',
    description:
      'Residential and commercial solar power solutions that help customers reduce electricity costs, improve property value, and lock in long-term energy savings.',
    image: imgSolar,
    ctaLink: '#',
    stats: {
      metric1: 'Solar',
      label1: 'Systems',
      metric2: 'ROI',
      label2: 'Focused',
    },
    theme: {
      accent: 'var(--accent-red)',
    },
  },
  {
    id: 'elwood',
    index: '03',
    name: 'Elcardo Elwood',
    sector: 'Wood Plastic & Flooring',
    description:
      'Manufacturing wood-plastic and architectural flooring products for durable, low-maintenance residential and commercial finishes.',
    image: imgSteel,
    ctaLink: '#',
    stats: {
      metric1: 'WPC',
      label1: 'Products',
      metric2: 'Custom',
      label2: 'Finishes',
    },
    theme: {
      accent: 'var(--mid-blue)',
    },
  },
  {
    id: 'steel',
    index: '04',
    name: 'Elcardo Steel',
    sector: 'Steel Products',
    description:
      'Producing high-quality SUS 202 and 304 grit 600 polished stainless steel tubes, pipes, and steel products for construction and fabrication.',
    image: imgSteel,
    ctaLink: '#',
    stats: {
      metric1: 'SUS',
      label1: '202 / 304',
      metric2: 'Grit 600',
      label2: 'Polish',
    },
    theme: {
      accent: 'var(--mid-blue)',
    },
  },
  {
    id: 'trading',
    index: '05',
    name: 'Elcardo Trading',
    sector: 'Automobile Accessories',
    description:
      'Importing and supplying exclusive automobile accessories that upgrade the value, function, and appearance of luxury vehicles.',
    image: imgAutomotive,
    ctaLink: '#',
    stats: {
      metric1: 'Auto',
      label1: 'Accessories',
      metric2: 'Premium',
      label2: 'Imports',
    },
    theme: {
      accent: 'var(--accent-red)',
    },
  },
  {
    id: 'pantry',
    index: '06',
    name: 'Elcardo Kitchen & Pantry Cupboards',
    sector: 'Interiors & Functional Spaces',
    description:
      'Designing and fabricating customized kitchen appliances, pantry cupboards, exhaust canopies, food trolleys, kitchen tables, and stainless steel fixtures.',
    image: imgPantry,
    ctaLink: '#',
    stats: {
      metric1: 'Custom',
      label1: 'Pantries',
      metric2: 'SS',
      label2: 'Fabrication',
    },
    theme: {
      accent: 'var(--mid-gray)',
    },
  },
  {
    id: 'hotels',
    index: '07',
    name: 'Anilad Kandy',
    sector: 'Hospitality',
    description:
      'A hotel in picturesque Kandy, offering comfortable accommodation for travellers exploring the city.',
    image: imgHotel,
    ctaLink: '#',
    stats: {
      metric1: 'Kandy',
      label1: 'Location',
      metric2: 'Hotel',
      label2: 'Stay',
    },
    theme: {
      accent: 'var(--primary-navy)',
    },
  },
];

export const featuredProjects = [
  {
    id: 'proj-1',
    company: 'Elcardo Industries',
    title: 'Industrial Roller Door & Access Infrastructure',
    category: 'Industrial Automation',
    location: 'Sri Lanka',
    image: imgRollerGates,
    featured: true,
  },
  {
    id: 'proj-2',
    company: 'Elcardo Elsolar',
    title: 'Residential and Commercial Solar Installations',
    category: 'Renewable Energy',
    location: 'Sri Lanka',
    image: imgSolar,
    featured: false,
  },
  {
    id: 'proj-3',
    company: 'Elcardo Steel',
    title: 'Stainless Steel Tubes, Pipes, and Construction Products',
    category: 'Steel Products',
    location: 'Sri Lanka',
    image: imgSteel,
    featured: false,
  },
  {
    id: 'proj-4',
    company: 'Anilad Kandy',
    title: 'Comfort Accommodation in Kandy',
    category: 'Hospitality',
    location: 'Kandy, Sri Lanka',
    image: imgHotel,
    featured: false,
  },
];
