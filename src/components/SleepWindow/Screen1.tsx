interface Screen1Props {
  onNext: () => void;
}

const cardStyle: React.CSSProperties = {
  background: 'var(--sleep-card-bg)',
  border: '1px solid var(--sleep-card-border)',
  borderRadius: 16,
  padding: 16,
};

const Screen1 = ({ onNext }: Screen1Props) => (
  <div className="flex flex-col flex-1 px-5 pb-6 justify-center" style={{ minHeight: 0 }}>
    <div className="flex flex-col items-center text-center gap-4 flex-1 justify-center">
      <div style={{ fontSize: 62, lineHeight: 1 }}>🌙</div>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--sleep-body-color)', lineHeight: 1.35 }}>
        Your sleep window matters more than you think
      </h1>
      <p style={{ fontSize: 13.5, color: 'var(--sleep-sub-color)', lineHeight: 1.65 }}>
        A sleep window is the fixed time between when you go to bed and when you wake up.
        Keeping it consistent — even on weekends — is one of the most powerful things you
        can do for your sleep.
      </p>
      <p style={{ fontSize: 13.5, color: 'var(--sleep-sub-color)', lineHeight: 1.65 }}>
        This tool helps you build yours in under 2 minutes.
      </p>

      {/* Insight card */}
      <div style={{
        ...cardStyle,
        background: 'var(--sleep-insight-bg)',
        borderLeft: '3px solid var(--sleep-insight-border)',
        textAlign: 'left',
      }}>
        <div className="flex gap-2 items-start">
          <span style={{ fontSize: 18 }}>💡</span>
          <p style={{ fontSize: 12.5, fontStyle: 'italic', color: 'var(--sleep-sub-color)', lineHeight: 1.6 }}>
            Even a 1-hour difference in sleep times on weekends can disrupt how you feel all week.
          </p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 justify-center">
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--sleep-meta-color)' }} />
        <span style={{ fontSize: 12, color: 'var(--sleep-meta-color)' }}>Simple. Personal. Effective.</span>
      </div>
    </div>

    <button onClick={onNext} style={{
      width: '100%', padding: 14, borderRadius: 18, border: 'none',
      background: 'linear-gradient(135deg, var(--sleep-accent-hex), var(--sleep-purple-hex))',
      color: '#fff', fontWeight: 500, fontSize: 15, cursor: 'pointer',
      marginTop: 16,
    }}>
      Let's build mine →
    </button>
  </div>
);

export default Screen1;
