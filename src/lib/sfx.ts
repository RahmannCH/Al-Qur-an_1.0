"use client";

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      this.enabled = localStorage.getItem("sfx_enabled") !== "false";
    }
  }

  private initCtx() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public toggleSfx() {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sfx_enabled", String(this.enabled));
    }
    return this.enabled;
  }
  
  public isEnabled() {
    return this.enabled;
  }

  // Suara 'Pop' pelan untuk ketukan Tasbih / Tombol biasa
  public playTap() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    // Pitch drop effect
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    
    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Suara 'Chime/Tada' ajaib untuk target tercapai / Naik Level
  public playSuccess() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    // Chime menggunakan 2 oscillator (Harmonics)
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, index) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + index * 0.08); // Arpeggio delay

      gain.gain.setValueAtTime(0, t + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, t + index * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + index * 0.08 + 1.5);

      osc.connect(gain);
      gain.connect(this.audioCtx!.destination);
      
      osc.start(t + index * 0.08);
      osc.stop(t + index * 0.08 + 1.5);
    });
  }

  // Suara 'Woosh' lembut untuk pindah halaman atau buka menu
  public playWoosh() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    const dur = 0.3;
    const bufferSize = this.audioCtx.sampleRate * dur;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // White noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, t);
    filter.frequency.linearRampToValueAtTime(100, t + dur);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.1, t + dur / 3);
    gain.gain.linearRampToValueAtTime(0, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);
    
    noise.start(t);
  }
}

export const sfx = new SoundManager();
