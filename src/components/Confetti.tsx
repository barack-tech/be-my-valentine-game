import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "circle" | "square" | "heart";
}

const COLORS = [
  "hsl(346, 84%, 60%)",
  "hsl(340, 90%, 65%)",
  "hsl(350, 100%, 80%)",
  "hsl(40, 90%, 65%)",
  "hsl(0, 0%, 100%)",
  "hsl(340, 70%, 40%)",
  "hsl(350, 80%, 70%)",
];

const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    const newPieces: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 10,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 1.5,
      shape: (["circle", "square", "heart"] as const)[Math.floor(Math.random() * 3)],
    }));
    setPieces(newPieces);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-0 animate-confetti"
          style={{
            left: `${piece.left}%`,
            "--duration": `${piece.duration}s`,
            "--delay": `${piece.delay}s`,
            animationDelay: `${piece.delay}s`,
            color: piece.color,
            fontSize: `${piece.size}px`,
          } as React.CSSProperties}
        >
          {piece.shape === "heart" ? "💖" : piece.shape === "circle" ? "●" : "■"}
        </span>
      ))}
    </div>
  );
};

export default Confetti;
