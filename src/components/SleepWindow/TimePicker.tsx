interface TimePickerProps {
  hour: number;
  minute: number;
  amPm: 'AM' | 'PM';
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onAmPmChange: (v: 'AM' | 'PM') => void;
}

const TimePicker = ({ hour, minute, amPm, onHourChange, onMinuteChange, onAmPmChange }: TimePickerProps) => {
  const cycleHour = (dir: 1 | -1) => {
    let next = hour + dir;
    if (next > 12) next = 1;
    if (next < 1) next = 12;
    onHourChange(next);
  };

  const cycleMinute = (dir: 1 | -1) => {
    const steps = [0, 15, 30, 45];
    const idx = steps.indexOf(minute);
    const next = (idx + dir + 4) % 4;
    onMinuteChange(steps[next]);
  };

  const arrowBtn: React.CSSProperties = {
    width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, color: 'var(--sleep-sub-color)', cursor: 'pointer',
    background: 'transparent', border: 'none',
  };

  const numStyle: React.CSSProperties = {
    fontSize: 28, fontWeight: 500, color: 'var(--sleep-body-color)',
    textAlign: 'center', width: 44, lineHeight: '36px',
  };

  return (
    <div className="flex items-center justify-center gap-1 py-2">
      {/* Hour */}
      <div className="flex flex-col items-center">
        <button style={arrowBtn} onClick={() => cycleHour(1)}>▲</button>
        <div style={numStyle}>{hour}</div>
        <button style={arrowBtn} onClick={() => cycleHour(-1)}>▼</button>
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--sleep-body-color)', padding: '0 2px' }}>:</div>
      {/* Minute */}
      <div className="flex flex-col items-center">
        <button style={arrowBtn} onClick={() => cycleMinute(1)}>▲</button>
        <div style={numStyle}>{String(minute).padStart(2, '0')}</div>
        <button style={arrowBtn} onClick={() => cycleMinute(-1)}>▼</button>
      </div>
      {/* AM/PM */}
      <div className="flex flex-col gap-1 ml-3">
        {(['AM', 'PM'] as const).map(v => (
          <button key={v} onClick={() => onAmPmChange(v)} style={{
            width: 44, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 500,
            cursor: 'pointer', border: '1.5px solid',
            background: amPm === v ? 'var(--sleep-accent-hex)' : 'transparent',
            color: amPm === v ? '#fff' : 'var(--sleep-accent-hex)',
            borderColor: amPm === v ? 'var(--sleep-accent-hex)' : 'var(--sleep-card-border)',
            transition: 'all 200ms ease',
          }}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
