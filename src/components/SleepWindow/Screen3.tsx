import { useState, useRef } from 'react';
import Confetti from './Confetti';

interface Screen3Props {
  bedtime: string;
  wakeTime: string;
  duration: number;
}

const cardStyle: React.CSSProperties = {
  background: 'var(--sleep-card-bg)',
  border: '1px solid var(--sleep-card-border)',
  borderRadius: 18,
  padding: 16,
};

const divider: React.CSSProperties = {
  height: 1, background: 'var(--sleep-divider)', margin: '10px 0',
};

const tips = [
  { emoji: '📵', text: 'Wind down 30 mins before your bedtime' },
  { emoji: '⏰', text: 'Same wake time every day — yes, weekends too' },
  { emoji: '🚫', text: 'Avoid naps longer than 20 mins after 3pm' },
];

const commitments = [
  { emoji: '📵', text: 'Put my phone away before bed' },
  { emoji: '🛁', text: 'Start a wind-down routine' },
  { emoji: '💡', text: 'Dim the lights an hour before bed' },
  { emoji: '✍️', text: 'Finish my to-do list early' },
];

const Screen3 = ({ bedtime, wakeTime, duration }: Screen3Props) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [selectedCommitment, setSelectedCommitment] = useState<number | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const commitRef = useRef<HTMLDivElement>(null!);

  const toggleAccordion = (idx: number) => {
    setOpenAccordion(prev => prev === idx ? null : idx);
  };

  const selectCommitment = (idx: number) => {
    if (selectedCommitment === idx) return;
    setSelectedCommitment(idx);
    setConfettiTrigger(t => t + 1);
  };

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 overflow-y-auto" style={{ minHeight: 0 }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--sleep-body-color)', marginBottom: 14 }}>
        Your sleep window 🌙
      </h1>

      {/* Result Card */}
      <div style={cardStyle} className="mb-3">
        <div className="flex justify-between items-center">
          <span style={{ fontSize: 13, color: 'var(--sleep-sub-color)' }}>🌙 Bedtime</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--sleep-body-color)' }}>{bedtime}</span>
        </div>
        <div style={divider} />
        <div className="flex justify-between items-center">
          <span style={{ fontSize: 13, color: 'var(--sleep-sub-color)' }}>☀️ Wake time</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--sleep-body-color)' }}>{wakeTime}</span>
        </div>
        <div style={divider} />
        <div className="flex justify-between items-center">
          <span style={{ fontSize: 13, color: 'var(--sleep-sub-color)' }}>⏱️ Duration</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--sleep-body-color)' }}>{duration} hours</span>
        </div>
      </div>

      {/* Accordion 1 */}
      <div style={{ ...cardStyle, borderRadius: 16, padding: 0, marginBottom: 8 }}>
        <button onClick={() => toggleAccordion(0)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: '#ddeeff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🛡️</span>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: 'var(--sleep-body-color)' }}>3 ways to protect it</span>
          <span style={{
            fontSize: 12, color: 'var(--sleep-sub-color)',
            transform: openAccordion === 0 ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease',
          }}>▶</span>
        </button>
        <div style={{
          maxHeight: openAccordion === 0 ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 350ms ease',
        }}>
          <div style={{ padding: '0 14px 12px' }}>
            {tips.map((tip, i) => (
              <div key={i}>
                {i > 0 && <div style={divider} />}
                <div className="flex items-center gap-2" style={{ fontSize: 12.5, color: 'var(--sleep-body-color)', padding: '4px 0' }}>
                  <span>{tip.emoji}</span><span>{tip.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion 2 */}
      <div style={{ ...cardStyle, borderRadius: 16, padding: 0, marginBottom: 12, position: 'relative' }} ref={commitRef}>
        <button onClick={() => toggleAccordion(1)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: '#e8d8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🎯</span>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: 'var(--sleep-body-color)' }}>Commit to 1 thing tonight</span>
          <span style={{
            fontSize: 12, color: 'var(--sleep-sub-color)',
            transform: openAccordion === 1 ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease',
          }}>▶</span>
        </button>
        <div style={{
          maxHeight: openAccordion === 1 ? 300 : 0,
          overflow: 'hidden',
          transition: 'max-height 350ms ease',
        }}>
          <div style={{ padding: '0 14px 12px' }} className="flex flex-col gap-2">
            {commitments.map((c, i) => (
              <button key={i} onClick={() => selectCommitment(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 13px', borderRadius: 13,
                background: selectedCommitment === i ? 'rgba(74,126,232,0.12)' : 'rgba(255,255,255,0.65)',
                border: `1.5px solid ${selectedCommitment === i ? 'var(--sleep-accent-hex)' : 'rgba(180,200,240,0.4)'}`,
                cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'all 200ms ease',
              }}>
                <span style={{ fontSize: 16 }}>{c.emoji}</span>
                <span style={{ fontSize: 12.5, color: 'var(--sleep-body-color)' }}>{c.text}</span>
              </button>
            ))}
          </div>
        </div>
        <Confetti trigger={confettiTrigger} containerRef={commitRef} />
      </div>

      {/* Takeaway */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(220,235,255,0.8), rgba(230,220,255,0.8))',
        border: '1px solid rgba(140,160,240,0.3)',
        borderRadius: 16, padding: 16, textAlign: 'center', marginBottom: 16,
      }}>
        <div style={{ fontSize: 24, color: '#a0b0d8', marginBottom: 4 }}>"</div>
        <p style={{ fontSize: 12.5, fontStyle: 'italic', color: 'var(--sleep-body-color)', lineHeight: 1.6 }}>
          Consistency is more powerful than perfection. One good night builds the next.
        </p>
      </div>

      <button onClick={() => !isSaved && setIsSaved(true)} style={{
        width: '100%', padding: 14, borderRadius: 18, border: 'none',
        background: isSaved
          ? 'linear-gradient(135deg, #28c878, #1a9a58)'
          : 'linear-gradient(135deg, var(--sleep-accent-hex), var(--sleep-purple-hex))',
        color: '#fff', fontWeight: 500, fontSize: 15,
        cursor: isSaved ? 'default' : 'pointer',
        pointerEvents: isSaved ? 'none' : 'auto',
        transition: 'background 0.3s ease',
      }}>
        {isSaved ? '✓ Sleep window saved!' : 'Save my sleep window ✓'}
      </button>
    </div>
  );
};

export default Screen3;
