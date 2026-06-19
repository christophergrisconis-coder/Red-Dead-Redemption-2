import { Platform } from 'react-native';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (Platform.OS !== 'web') return null;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function playWebTone(freq: number, startTime: number, duration: number, gain: number, ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.type = 'triangle';
  osc.frequency.value = freq;
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function playCompletionSound() {
  const ctx = getAudioContext();
  if (ctx) {
    const t = ctx.currentTime;
    playWebTone(523.25, t, 0.3, 0.18, ctx);
    playWebTone(659.25, t + 0.12, 0.3, 0.15, ctx);
    playWebTone(783.99, t + 0.24, 0.5, 0.20, ctx);
  }
}

export function playUncompleteSound() {
  const ctx = getAudioContext();
  if (ctx) {
    const t = ctx.currentTime;
    playWebTone(440, t, 0.15, 0.12, ctx);
    playWebTone(392, t + 0.08, 0.2, 0.10, ctx);
  }
}
