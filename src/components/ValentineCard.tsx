import { useState, useCallback } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import { playYesSound, playNoSound } from "@/lib/sounds";

const NO_MESSAGES = [
  "Will you be my Valentine, Lavender? 💘",
  "Are you sure, Lavender? 🥺",
  "Really really sure? 😢",
  "Don't break my heart... 💔",
  "I'll be so sad 😭",
  "Please reconsider! 🙏",
  "Think about it again 💭",
  "Last chance, Lavender... 😢",
  "You're really gonna say no? 🥀",
  "Fine... just kidding, please? 💕",
];

const POEM_LINES = [
  "Lavender, like your name, you soften the air,",
  "A quiet kind of magic that's simply just there.",
  "",
  "In small, ordinary moments you somehow make bright,",
  "You turn simple days into something that feels right.",
  "",
  "The way that you laugh, the way that you care,",
  "The warmth in your words, the patience you share—",
  "",
  "It's in all the little things you probably don't see",
  "That make every moment better for me.",
  "",
  "So before all the roses and chocolate begin,",
  "I just want to ask with a hopeful grin:",
  "",
  "This February 14th, and all days that follow too,",
  "Will you be my Valentine, Lavender—you?",
];

const ValentineCard = () => {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  

  const yesScale = 1 + noCount * 0.25;
  const noScale = Math.max(0.5, 1 - noCount * 0.08);
  const noOpacity = Math.max(0.4, 1 - noCount * 0.06);

  const currentMessage = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];

  const handleNo = useCallback(() => {
    setNoCount((prev) => prev + 1);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
    playNoSound();

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  const handleYes = useCallback(() => {
    setAccepted(true);
    setShowConfetti(true);
    playYesSound();

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAccepted(false);
    setShowConfetti(false);
    setNoCount(0);
    
  }, []);

  if (accepted) {
    return (
      <>
        <Confetti active={showConfetti} />
        <div className="valentine-card max-w-sm w-full mx-4 text-center animate-bounce-in">
          <div className="rounded-2xl overflow-hidden mb-4">
            <iframe
              src="https://tenor.com/embed/25854132"
              width="100%"
              style={{ aspectRatio: "2.22222", border: "none" }}
              allowFullScreen
              title="Minions Celebration GIF"
            />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-primary mb-4 leading-relaxed">
            Yaaay, Lavender!
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-body mb-2">
            I knew you'd say yes! 🥰
          </p>
          <p className="text-4xl my-6">💘🎉💐</p>
          <p className="text-muted-foreground text-sm mb-8 font-body">
            You just made someone very happy ✨
          </p>
          <button
            onClick={handleReset}
            className="text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-4 font-body"
          >
            Play again? 🔄
          </button>
        </div>
      </>
    );
  }

  return (
    <div className={`valentine-card max-w-sm w-full mx-4 text-center ${isWiggling ? "animate-wiggle" : ""}`}>
      <p
        className="text-xs font-body tracking-widest uppercase mb-4"
        style={{ color: "hsl(var(--valentine-lavender))" }}
      >
        ✦ For Lavender ✦
      </p>

      {/* Poem section */}
      <div
        className="text-left rounded-2xl p-5 mb-6 animate-fade-in"
        style={{
          background: "hsl(var(--valentine-lavender) / 0.08)",
          border: "1px solid hsl(var(--valentine-lavender) / 0.2)",
        }}
      >
          {POEM_LINES.map((line, i) =>
            line === "" ? (
              <div key={i} className="h-3" />
            ) : (
              <p
                key={i}
                className="text-sm font-body leading-relaxed text-foreground/80"
                style={{
                  animation: `fadeInUp 0.4s ease-out ${i * 0.07}s both`,
                }}
              >
                {line.includes("Lavender") ? (
                  <>
                    {line.split("Lavender").map((part, j, arr) => (
                      <span key={j}>
                        {part}
                        {j < arr.length - 1 && (
                          <span
                            className="font-bold"
                            style={{ color: "hsl(var(--valentine-lavender))" }}
                          >
                            Lavender
                          </span>
                        )}
                      </span>
                    ))}
                  </>
                ) : (
                  line
                )}
              </p>
            )
          )}
      </div>

      <div className="rounded-2xl overflow-hidden mb-4">
        <iframe
          src="https://tenor.com/embed/10586631440146974859"
          width="100%"
          style={{ aspectRatio: "0.935743", border: "none" }}
          allowFullScreen
          title="Minion Love GIF"
        />
      </div>

      <h1 className="font-display text-2xl md:text-3xl text-foreground mb-8 leading-relaxed transition-all duration-300">
        {currentMessage}
      </h1>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleYes}
          className="btn-yes transition-all duration-300"
          style={{
            transform: `scale(${yesScale})`,
            fontSize: `${Math.min(1 + noCount * 0.1, 1.8)}rem`,
            padding: `${1 + noCount * 0.15}rem ${2 + noCount * 0.3}rem`,
          }}
        >
          Yes 💖
        </button>

        <button
          onClick={handleNo}
          className="btn-no transition-all duration-500"
          style={{
            transform: `scale(${noScale})`,
            opacity: noOpacity,
            marginLeft: noCount > 0 ? `${(noCount % 2 === 0 ? -1 : 1) * Math.min(noCount * 15, 60)}px` : "0px",
          }}
        >
          No 🙃
        </button>
      </div>

      {noCount > 0 && (
        <p className="text-xs text-muted-foreground/50 mt-6 animate-fade-in font-body">
          {noCount >= 7
            ? "The Yes button is right there... 👆"
            : noCount >= 4
              ? "Come onnnn 🥺"
              : "Just click Yes already! 💕"}
        </p>
      )}
    </div>
  );
};

export default ValentineCard;
