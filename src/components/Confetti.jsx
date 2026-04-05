import React, { useEffect, useState } from 'react';

const COLORS = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#f43f5e', '#0ea5e9'];

function ConfettiPiece({ delay, color }) {
  const left = Math.random() * 100;
  const size = Math.random() * 8 + 4;
  const dur = Math.random() * 2 + 2;

  return (
    <div
      className="fixed top-0 pointer-events-none animate-confetti z-50"
      style={{
        left: `${left}vw`,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        animationDelay: `${delay}s`,
        animationDuration: `${dur}s`,
      }}
    />
  );
}

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        delay: Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (pieces.length === 0) return null;

  return (
    <>
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} delay={p.delay} color={p.color} />
      ))}
    </>
  );
}
