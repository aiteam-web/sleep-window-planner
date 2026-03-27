import { useState, useRef } from 'react';
import StarBackground from './StarBackground';
import TopBar from './TopBar';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import { calcBedtime, formatTime } from './Screen2';

interface SleepWindowProps {
  onExit?: () => void;
}

const SleepWindow = ({ onExit }: SleepWindowProps) => {
  const [screen, setScreen] = useState(1);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);
  const [displayScreen, setDisplayScreen] = useState(1);

  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMinute, setWakeMinute] = useState(0);
  const [wakeAmPm, setWakeAmPm] = useState<'AM' | 'PM'>('AM');
  const [sleepDuration, setSleepDuration] = useState(7.5);

  const navigate = (to: number) => {
    if (animating) return;
    setDirection(to > screen ? 'left' : 'right');
    setAnimating(true);
    // Start exit animation on current screen
    setTimeout(() => {
      setDisplayScreen(to);
      setScreen(to);
      // Enter animation ends
      setTimeout(() => setAnimating(false), 600);
    }, 10);
  };

  const goBack = () => {
    if (screen === 1) {
      onExit?.();
    } else {
      navigate(screen - 1);
    }
  };

  const pillLabels = ['', 'Build your window', 'Your sleep window'];

  const bed = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
  const bedStr = formatTime(bed.hour, bed.minute, bed.amPm);
  const wakeStr = formatTime(wakeHour, wakeMinute, wakeAmPm);

  const getAnimStyle = (): React.CSSProperties => {
    if (!animating) return {};
    const enterFrom = direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)';
    return {
      animation: direction === 'left'
        ? 'slide-left-enter 600ms ease-in-out forwards'
        : 'slide-right-enter 600ms ease-in-out forwards',
    };
  };

  return (
    <div style={{
      maxWidth: 390, margin: '0 auto', height: '100dvh',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <StarBackground />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <TopBar onBack={goBack} pillLabel={pillLabels[displayScreen - 1] || undefined} screen={displayScreen} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, ...getAnimStyle() }} key={displayScreen}>
          {displayScreen === 1 && <Screen1 onNext={() => navigate(2)} />}
          {displayScreen === 2 && (
            <Screen2
              wakeHour={wakeHour} wakeMinute={wakeMinute} wakeAmPm={wakeAmPm}
              sleepDuration={sleepDuration}
              onWakeHourChange={setWakeHour} onWakeMinuteChange={setWakeMinute}
              onWakeAmPmChange={setWakeAmPm} onSleepDurationChange={setSleepDuration}
              onNext={() => navigate(3)}
            />
          )}
          {displayScreen === 3 && (
            <Screen3 bedtime={bedStr} wakeTime={wakeStr} duration={sleepDuration} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepWindow;
