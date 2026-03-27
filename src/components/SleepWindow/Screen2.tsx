import TimePicker from './TimePicker';

interface Screen2Props {
  wakeHour: number;
  wakeMinute: number;
  wakeAmPm: 'AM' | 'PM';
  sleepDuration: number;
  onWakeHourChange: (h: number) => void;
  onWakeMinuteChange: (m: number) => void;
  onWakeAmPmChange: (v: 'AM' | 'PM') => void;
  onSleepDurationChange: (d: number) => void;
  onNext: () => void;
}

const cardStyle: React.CSSProperties = {
  background: 'var(--sleep-card-bg)',
  border: '1px solid var(--sleep-card-border)',
  borderRadius: 16,
  padding: 14,
};

function formatTime(hour: number, minute: number, amPm: 'AM' | 'PM') {
  return `${hour}:${String(minute).padStart(2, '0')} ${amPm}`;
}

function calcBedtime(wakeHour: number, wakeMinute: number, wakeAmPm: 'AM' | 'PM', duration: number) {
  let wake24 = wakeHour % 12 + (wakeAmPm === 'PM' ? 12 : 0);
  let totalWakeMins = wake24 * 60 + wakeMinute;
  let bedMins = totalWakeMins - duration * 60;
  if (bedMins < 0) bedMins += 24 * 60;

  let bedHour24 = Math.floor(bedMins / 60) % 24;
  let bedMin = Math.round(bedMins % 60);
  let bedAmPm: 'AM' | 'PM' = bedHour24 >= 12 ? 'PM' : 'AM';
  let bedHour12 = bedHour24 % 12 || 12;

  return { hour: bedHour12, minute: bedMin, amPm: bedAmPm };
}

const Screen2 = (props: Screen2Props) => {
  const { wakeHour, wakeMinute, wakeAmPm, sleepDuration } = props;
  const bedtime = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
  const wakeStr = formatTime(wakeHour, wakeMinute, wakeAmPm);
  const bedStr = formatTime(bedtime.hour, bedtime.minute, bedtime.amPm);

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 overflow-y-auto" style={{ minHeight: 0 }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--sleep-body-color)', marginBottom: 14 }}>
        Let's set your sleep window
      </h1>

      {/* Step 1 */}
      <div style={cardStyle} className="mb-3">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sleep-accent-hex)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
          STEP 1 — WAKE-UP TIME
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--sleep-body-color)', marginBottom: 4 }}>
          What time do you need to wake up most days?
        </p>
        <TimePicker
          hour={wakeHour} minute={wakeMinute} amPm={wakeAmPm}
          onHourChange={props.onWakeHourChange}
          onMinuteChange={props.onWakeMinuteChange}
          onAmPmChange={props.onWakeAmPmChange}
        />
      </div>

      {/* Step 2 */}
      <div style={cardStyle} className="mb-3">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sleep-accent-hex)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
          STEP 2 — SLEEP DURATION
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--sleep-body-color)', marginBottom: 10 }}>
          How many hours of sleep do you want?
        </p>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 11, color: 'var(--sleep-sub-color)' }}>6h</span>
          <input
            type="range" min={6} max={9} step={0.5} value={sleepDuration}
            onChange={e => props.onSleepDurationChange(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--sleep-accent-hex)' }}
          />
          <span style={{ fontSize: 11, color: 'var(--sleep-sub-color)' }}>9h</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sleep-accent-hex)', minWidth: 32 }}>
            {sleepDuration}h
          </span>
        </div>
      </div>

      {/* Live Window Bar */}
      <div style={{
        background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(140,180,240,0.4)',
        borderRadius: 14, padding: 14, marginBottom: 12,
      }}>
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--sleep-body-color)' }}>🌙 {bedStr}</span>
          <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--sleep-body-color)' }}>☀️ {wakeStr}</span>
        </div>
        <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'linear-gradient(90deg, #a0c0ff, #c0a0ff)', marginBottom: 8 }}>
          <div style={{
            position: 'absolute', left: -5, top: -3,
            width: 16, height: 16, borderRadius: '50%',
            background: '#8090c0', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8,
          }}>🌙</div>
          <div style={{
            position: 'absolute', right: -5, top: -3,
            width: 16, height: 16, borderRadius: '50%',
            background: '#f0c060', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8,
          }}>☀️</div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--sleep-sub-color)' }}>
          {sleepDuration} hours of sleep
        </p>
      </div>

      <p style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--sleep-sub-color)', textAlign: 'center', marginBottom: 16 }}>
        Most adults need 7–9 hours. Choose what feels right.
      </p>

      <div style={{ marginTop: 'auto' }}>
        <button onClick={props.onNext} style={{
          width: '100%', padding: 14, borderRadius: 18, border: 'none',
          background: 'linear-gradient(135deg, var(--sleep-accent-hex), var(--sleep-purple-hex))',
          color: '#fff', fontWeight: 500, fontSize: 15, cursor: 'pointer',
        }}>
          See my sleep window →
        </button>
      </div>
    </div>
  );
};

export { calcBedtime, formatTime };
export default Screen2;
