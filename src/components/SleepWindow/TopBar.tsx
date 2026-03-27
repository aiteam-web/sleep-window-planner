import { ReactNode } from 'react';

interface TopBarProps {
  onBack: () => void;
  pillLabel?: string;
  screen: number;
}

const TopBar = ({ onBack, pillLabel, screen }: TopBarProps) => (
  <div className="relative z-10">
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'var(--sleep-back-bg)',
          border: '1px solid var(--sleep-back-border)',
          color: 'var(--sleep-back-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 500, cursor: 'pointer',
        }}
      >
        ‹
      </button>
      {pillLabel ? (
        <span style={{
          fontSize: 11, fontWeight: 500, color: 'var(--sleep-accent-hex)',
          background: 'rgba(74,126,232,0.08)', borderRadius: 20,
          padding: '4px 14px', letterSpacing: 0.3,
        }}>
          {pillLabel}
        </span>
      ) : <span />}
      <div style={{ width: 30 }} />
    </div>
    {screen > 1 && <ProgressDots active={screen} />}
  </div>
);

const ProgressDots = ({ active }: { active: number }) => (
  <div className="flex justify-center gap-2 pb-3">
    {[1, 2, 3].map(d => (
      <div key={d} style={{
        height: 6, borderRadius: 3,
        width: d === active ? 20 : 8,
        backgroundColor: d <= active ? 'var(--sleep-accent-hex)' : 'var(--sleep-dot-inactive)',
        transition: 'width 300ms ease, background-color 300ms ease',
      }} />
    ))}
  </div>
);

export default TopBar;
