import { useEffect, useState } from "react";

const HEARTS = ["💖", "💕", "💗", "💓", "❤️", "💘", "💝", "🌹", "✨"];

interface FloatingHeart {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const initialHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      left: Math.random() * 100,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 16 + Math.random() * 24,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            "--duration": `${heart.duration}s`,
            "--delay": `${heart.delay}s`,
            animationDelay: `${heart.delay}s`,
          } as React.CSSProperties}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
