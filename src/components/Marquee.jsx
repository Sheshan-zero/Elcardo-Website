import './Marquee.css';

const items = [
  'Engineering Excellence',
  'Renewable Innovation',
  'Roller Doors & Shutters',
  'Steel & Roofing Products',
  'Anilad Kandy',
  'Automobile Accessories',
  'Built in Sri Lanka',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <div className="marquee-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
