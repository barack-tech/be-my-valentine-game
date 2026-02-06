const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration);
}

/** Happy ascending chime for "Yes" */
export function playYesSound() {
  const c = getCtx();
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, "sine", 0.12), i * 100);
  });
  // Add a sparkle
  setTimeout(() => playTone(1568, 0.5, "sine", 0.08), 400);
}

/** Sad descending boop for "No" */
export function playNoSound() {
  playTone(440, 0.15, "triangle", 0.1);
  setTimeout(() => playTone(330, 0.2, "triangle", 0.08), 120);
}

/** Cute pop sound for hover / general interaction */
export function playPopSound() {
  playTone(880, 0.08, "sine", 0.06);
}
