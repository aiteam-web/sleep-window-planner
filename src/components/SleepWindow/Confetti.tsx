import { useState, useRef, useEffect, useCallback } from 'react';

interface ConfettiProps {
  trigger: number; // increment to trigger
  containerRef: React.RefObject<HTMLDivElement>;
}

const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff', '#ff9a3c'];

const Confetti = ({ trigger, containerRef }: ConfettiProps) => {
  const [pieces, setPieces] = useState<{ id: number; x: number; y: number; color: string; round: boolean; delay: number }[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newPieces = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (rect.width - 12),
      y: rect.height / 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      round: Math.random() > 0.5,
      delay: Math.random() * 0.3,
    }));
    setPieces(newPieces);
    const timeout = setTimeout(() => setPieces([]), 1200);
    return () => clearTimeout(timeout);
  }, [trigger]);

  return (
    <>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: p.x, top: p.y,
          width: 6, height: 6, borderRadius: p.round ? '50%' : 1,
          backgroundColor: p.color, pointerEvents: 'none',
          animation: `confetti-burst 0.8s ease-out ${p.delay}s forwards`,
        }} />
      ))}
    </>
  );
};

export default Confetti;
