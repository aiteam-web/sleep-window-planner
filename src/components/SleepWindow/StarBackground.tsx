const stars = [
  { top: '5%', left: '10%', delay: '0s', size: 3 },
  { top: '8%', left: '75%', delay: '0.8s', size: 2 },
  { top: '12%', left: '45%', delay: '1.6s', size: 2 },
  { top: '3%', left: '88%', delay: '2.4s', size: 3 },
  { top: '18%', left: '20%', delay: '0.4s', size: 2 },
  { top: '22%', left: '65%', delay: '1.2s', size: 3 },
  { top: '15%', left: '35%', delay: '2.0s', size: 2 },
  { top: '25%', left: '52%', delay: '0.6s', size: 2 },
];

const StarBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0"
    style={{ background: 'linear-gradient(180deg, var(--sleep-bg-start), var(--sleep-bg-mid), var(--sleep-bg-end))' }}>
    {stars.map((s, i) => (
      <div key={i} style={{
        position: 'absolute', top: s.top, left: s.left,
        width: s.size, height: s.size, borderRadius: '50%',
        backgroundColor: 'var(--sleep-star)',
        animation: `sparkle 3s ease-in-out ${s.delay} infinite`,
      }} />
    ))}
  </div>
);

export default StarBackground;
