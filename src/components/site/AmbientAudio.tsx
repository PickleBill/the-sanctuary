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
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      aria-pressed={playing}
      className="ambient-audio fixed bottom-4 left-4 lg:bottom-6 lg:left-6 z-30 w-11 h-11 flex items-center justify-center bg-navy/70 text-ivory/80 hover:text-amber backdrop-blur-md border border-ivory/15 hover:border-amber/60 transition-colors duration-500"
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 010 7.07" />
          <path d="M19.07 4.93a10 10 0 010 14.14" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M22 9l-6 6M16 9l6 6" />
        </svg>
      )}
    </button>
  );
}
