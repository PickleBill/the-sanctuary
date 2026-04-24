import { useEffect, useRef, useState } from "react";

/**
 * v3.5 — Ambient Audio whisper.
 *
 * A small speaker icon pinned bottom-left. Never autoplays (browser policy
 * and good taste both forbid it). When tapped, fades in a single ambient
 * loop (a creek + distant wood-stove cracking) at low volume. Tapping again
 * fades it back out. Uses /public/ambient.mp3 if present; otherwise hides.
 */
export function AmbientAudio() {
  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  // Lazy-create the audio element on first toggle
  const ensureAudio = (): HTMLAudioElement | null => {
    if (audioRef.current) return audioRef.current;
    try {
      const a = new Audio("/ambient.mp3");
      a.loop = true;
      a.preload = "none";
      a.volume = 0;
      audioRef.current = a;
      return a;
    } catch {
      return null;
    }
  };

  // Probe whether the file exists once; if not, hide the toggle entirely.
  useEffect(() => {
    let cancelled = false;
    fetch("/ambient.mp3", { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setSupported(r.ok);
      })
      .catch(() => {
        if (!cancelled) setSupported(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const fadeTo = (target: number, durationMs: number, onDone?: () => void) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);
    const start = a.volume;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / durationMs);
      a.volume = start + (target - start) * k;
      if (k < 1) fadeRafRef.current = requestAnimationFrame(tick);
      else onDone?.();
    };
    fadeRafRef.current = requestAnimationFrame(tick);
  };

  const toggle = async () => {
    const a = ensureAudio();
    if (!a) return;
    if (!playing) {
      try {
        await a.play();
        setPlaying(true);
        fadeTo(0.18, 1200);
      } catch {
        // Browser blocked — surface as off
        setPlaying(false);
      }
    } else {
      fadeTo(0, 600, () => {
        a.pause();
        setPlaying(false);
      });
    }
  };

  useEffect(
    () => () => {
      if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);
      audioRef.current?.pause();
    },
    [],
  );

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute ambient sound — creek and woodstove" : "Play ambient sound — creek and woodstove"}
      aria-pressed={playing}
      title={playing ? "Ambient sound on — tap to mute" : "Tap to hear the estate"}
      className={`ambient-audio fixed bottom-4 left-4 lg:bottom-6 lg:left-6 z-30 inline-flex items-center gap-2 h-11 px-3.5 backdrop-blur-md transition-all duration-500 ${
        playing
          ? "bg-amber/95 text-amber-foreground border border-amber"
          : "bg-navy/75 text-ivory/80 hover:text-amber border border-ivory/15 hover:border-amber/60"
      }`}
    >
      {playing ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M22 9l-6 6M16 9l6 6" />
        </svg>
      )}
      <span className="small-caps text-[10px] tracking-[0.24em] font-semibold hidden sm:inline">
        {playing ? "Sound on" : "Sound"}
      </span>
    </button>
  );
}
