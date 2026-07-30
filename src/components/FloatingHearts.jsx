/**
 * FloatingHearts — Background floating heart particles
 * Continuously generates hearts that float upward
 */
import { useMemo } from 'react';

const hearts = ['💕', '💗', '💖', '✨', '🌸', '💜'];

const FloatingHearts = ({ count = 15 }) => {
  const heartElements = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 0.8 + Math.random() * 0.6,
    }));
  }, [count]);

  return (
    <div className="floating-hearts">
      {heartElements.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}rem`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
