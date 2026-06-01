/* ============================================================
   Sri Lanka SVG outline path + Branch data
   Coordinates calibrated for districtPaths.js SVG viewBox: 0 -50 1500 2800
   ============================================================ */

// Simple outline for decorative watermark usage (ContactHero)
export const SRI_LANKA_PATH = `
  M 88,8
  C 85,10 80,14 78,18
  C 75,24 72,30 70,36
  C 68,42 66,48 65,54
  C 63,62 60,70 58,78
  C 56,86 54,94 53,100
  C 52,108 50,116 49,124
  C 48,132 47,140 46,148
  C 45,156 44,164 44,172
  C 44,180 44,188 45,196
  C 46,204 47,212 49,220
  C 51,228 53,236 56,244
  C 59,252 62,260 66,266
  C 70,272 74,278 78,284
  C 82,290 86,296 90,300
  C 94,304 98,308 102,312
  C 106,316 110,320 114,322
  C 118,324 122,326 126,326
  C 130,326 134,324 137,320
  C 140,316 142,312 144,306
  C 146,300 147,294 148,288
  C 149,280 149,272 148,264
  C 147,256 146,248 144,240
  C 142,232 140,224 138,216
  C 136,208 135,200 134,192
  C 133,184 132,176 132,168
  C 132,160 132,152 133,144
  C 134,136 135,128 136,120
  C 137,112 138,104 138,96
  C 138,88 137,80 136,72
  C 134,64 132,56 129,48
  C 126,40 122,34 118,28
  C 114,22 110,18 106,14
  C 102,10 98,8 94,6
  C 92,5 90,6 88,8
  Z
`;

// Live Elcardo branch network from elcardo.com/branch-network/.
export const branches = [
  {
    id: 'nawala',
    name: 'Head Office Nawala',
    shortName: 'Nawala',
    city: 'Nawala',
    region: 'Western Province',
    district: 'colombo',
    address: 'No. 42, Narahenpita Road, Nawala, Sri Lanka',
    phone: '+94 11 280 5556',
    fax: '+94 11 280 5156',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=No.+42+Narahenpita+Road+Nawala+Sri+Lanka',
    isHQ: true,
    coords: { x: 175, y: 1260 },
  },
  {
    id: 'factory-rathmalana',
    name: 'Factory - Rathmalana',
    shortName: 'Factory',
    city: 'Rathmalana',
    region: 'Western Province',
    district: 'colombo',
    address: 'No. 650/A/19, Rathmalana Industrial Estate, Galle Road, Rathmalana',
    phone: '+94 11 262 6962',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=650%2FA%2F19+Rathmalana+Industrial+Estate+Galle+Road+Rathmalana',
    isHQ: false,
    coords: { x: 145, y: 1315 },
  },
  {
    id: 'rathmalana',
    name: 'Rathmalana Branch',
    shortName: 'Rathmalana',
    city: 'Rathmalana',
    region: 'Western Province',
    district: 'colombo',
    address: 'No. 440, Galle Road, Rathmalana, Sri Lanka',
    phone: '+94 11 273 3889',
    fax: '+94 11 273 3889',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=440+Galle+Road+Rathmalana+Sri+Lanka',
    isHQ: false,
    coords: { x: 150, y: 1328 },
  },
  {
    id: 'kandy',
    name: 'Kandy Branch',
    shortName: 'Kandy',
    city: 'Kandy',
    region: 'Central Province',
    district: 'kandy',
    address: 'No. 333, William Gopallawa Mawatha, Kandy, Sri Lanka',
    phone: '+94 81 223 2933',
    fax: '+94 81 223 2933',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=333+William+Gopallawa+Mawatha+Kandy+Sri+Lanka',
    isHQ: false,
    coords: { x: 470, y: 1100 },
  },
  {
    id: 'kurunegala',
    name: 'Kurunegala Branch',
    shortName: 'Kurunegala',
    city: 'Kurunegala',
    region: 'North Western Province',
    district: 'kurunagala',
    address: 'No. 306 B, Colombo Road, Wehera, Kurunegala',
    phone: '+94 37 222 2855',
    fax: '+94 37 222 2855',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=306+B+Colombo+Road+Wehera+Kurunegala',
    isHQ: false,
    coords: { x: 310, y: 950 },
  },
  {
    id: 'matara',
    name: 'Matara Branch',
    shortName: 'Matara',
    city: 'Matara',
    region: 'Southern Province',
    district: 'matara',
    address: 'No. 350, Anagarika Dharmapala Mawatha, Nupe, Matara',
    phone: '+94 41 222 2922',
    fax: '+94 41 223 5330',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=350+Anagarika+Dharmapala+Mawatha+Nupe+Matara',
    isHQ: false,
    coords: { x: 410, y: 1720 },
  },
  {
    id: 'jaffna',
    name: 'Jaffna Branch',
    shortName: 'Jaffna',
    city: 'Jaffna',
    region: 'Northern Province',
    district: 'jaffna',
    address: 'No. 170, Palaly Road, Jaffna',
    phone: '+94 21 567 0570',
    fax: '+94 21 221 7172',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=170+Palaly+Road+Jaffna',
    isHQ: false,
    coords: { x: 260, y: 70 },
  },
  {
    id: 'negombo',
    name: 'Negombo Branch',
    shortName: 'Negombo',
    city: 'Negombo',
    region: 'Western Province',
    district: 'gampaha',
    address: 'No. 246, Chilaw Road, Negombo',
    phone: '+94 31 527 7277',
    fax: '+94 31 223 8110',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=246+Chilaw+Road+Negombo',
    isHQ: false,
    coords: { x: 115, y: 1155 },
  },
  {
    id: 'batticaloa',
    name: 'Batticaloa Branch',
    shortName: 'Batticaloa',
    city: 'Batticaloa',
    region: 'Eastern Province',
    district: 'batticaloa',
    address: 'No. 467, Main Street, Kovilkulam, Aryampathy, Batticaloa',
    phone: '+94 65 577 1010',
    fax: '+94 65 205 5141',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=467+Main+Street+Kovilkulam+Aryampathy+Batticaloa',
    isHQ: false,
    coords: { x: 720, y: 930 },
  },
  {
    id: 'ratnapura',
    name: 'Ratnapura Branch',
    shortName: 'Ratnapura',
    city: 'Ratnapura',
    region: 'Sabaragamuwa Province',
    district: 'ratnapura',
    address: 'No. 278, Moragahayata, Colombo Road, Ratnapura',
    phone: '+94 45 223 3370',
    fax: '+94 45 223 3360',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=278+Moragahayata+Colombo+Road+Ratnapura',
    isHQ: false,
    coords: { x: 330, y: 1420 },
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura Branch',
    shortName: 'Anuradhapura',
    city: 'Anuradhapura',
    region: 'North Central Province',
    district: 'anuradhapura',
    address: 'No. 562/106/A5, Industrial Place, Anuradhapura',
    phone: '+94 25 205 1075',
    fax: '+94 25 205 1075',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=562%2F106%2FA5+Industrial+Place+Anuradhapura',
    isHQ: false,
    coords: { x: 350, y: 620 },
  },
  {
    id: 'bandarawela',
    name: 'Bandarawela Branch',
    shortName: 'Bandarawela',
    city: 'Bandarawela',
    region: 'Uva Province',
    district: 'badulla',
    address: 'No. 32/1, Uduhulpotha, Badulla Road, Bandarawela',
    phone: '+94 57 205 2300',
    fax: '+94 57 205 2300',
    email: 'info@elcardo.com',
    mapUrl: 'https://maps.google.com/?q=32%2F1+Uduhulpotha+Badulla+Road+Bandarawela',
    isHQ: false,
    coords: { x: 510, y: 1390 },
  },
];
