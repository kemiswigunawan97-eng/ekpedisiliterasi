/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BgmTrackId = 'trendy_pop' | 'lofi_chill' | 'adventure';

export interface BgmTrackInfo {
  id: BgmTrackId;
  title: string;
  genre: string;
  bpm: number;
}

export const BGM_TRACKS: BgmTrackInfo[] = [
  { id: 'trendy_pop', title: 'Beat Pop Trendy SMP', genre: 'Upbeat Pop & Viral Dance', bpm: 116 },
  { id: 'lofi_chill', title: 'Lo-Fi Chill Belajar', genre: 'Chillhop & Warm Piano', bpm: 84 },
  { id: 'adventure', title: 'Petualangan Lereng Anjung', genre: 'Groovy Nature Synth', bpm: 104 }
];

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  // BGM Engine
  private bgmGain: GainNode | null = null;
  private bgmIntervalId: number | null = null;
  private currentTrack: BgmTrackId = 'trendy_pop';
  private isBgmPlaying: boolean = false;
  private bgmVolume: number = 0.22;
  private stepIndex: number = 0;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.value = muted ? 0 : 0.05;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(muted ? 0 : this.bgmVolume, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // --- Sound Effects (UI) ---
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  public playSelect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // Audio fallback silent
    }
  }

  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } catch {
      // Audio fallback silent
    }
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.25);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio fallback silent
    }
  }

  public playPosCleared() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chords = [
        { freq: 440, delay: 0 },
        { freq: 554.37, delay: 0.08 },
        { freq: 659.25, delay: 0.16 },
        { freq: 880, delay: 0.24 },
        { freq: 1108.73, delay: 0.36 }
      ];

      chords.forEach(({ freq, delay }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.1, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.5);
      });
    } catch {
      // Audio fallback silent
    }
  }

  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const sequence = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.15 },
        { f: 783.99, d: 0.15, t: 0.3 },
        { f: 1046.5, d: 0.45, t: 0.45 }
      ];

      sequence.forEach(({ f, d, t }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.12, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d + 0.05);
      });
    } catch {
      // Audio fallback silent
    }
  }

  public toggleAmbientWind() {
    try {
      this.initContext();
      if (!this.ctx) return;

      if (this.isAmbientPlaying) {
        if (this.ambientGain) {
          this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
        }
        this.isAmbientPlaying = false;
        return;
      }

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.1) * 0.11;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.035, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      whiteNoise.start();
      this.isAmbientPlaying = true;
    } catch {
      // Audio fallback silent
    }
  }

  // ==========================================
  // MUSIK MASA KINI YANG TREN DISUKAI ANAK SMP
  // Upbeat Lo-Fi Hip Hop & Catchy Pop Groove
  // ==========================================

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public getCurrentTrack(): BgmTrackId {
    return this.currentTrack;
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public setBgmVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx && !this.isMuted) {
      this.bgmGain.gain.setTargetAtTime(this.bgmVolume, this.ctx.currentTime, 0.1);
    }
  }

  public setTrack(trackId: BgmTrackId) {
    this.currentTrack = trackId;
    this.stepIndex = 0;
    if (this.isBgmPlaying) {
      this.stopBgm();
      this.startBgm();
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public startBgm() {
    try {
      this.initContext();
      if (!this.ctx) return;

      if (this.bgmIntervalId) {
        clearInterval(this.bgmIntervalId);
        this.bgmIntervalId = null;
      }

      if (!this.bgmGain) {
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.connect(this.ctx.destination);
      }

      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
      this.isBgmPlaying = true;
      this.stepIndex = 0;

      // Track configuration
      const track = BGM_TRACKS.find((t) => t.id === this.currentTrack) || BGM_TRACKS[0];
      const stepDurationMs = (60 / track.bpm / 4) * 1000; // 16th note steps

      this.bgmIntervalId = window.setInterval(() => {
        this.scheduleStep(this.stepIndex % 32);
        this.stepIndex++;
      }, stepDurationMs);
    } catch {
      // Audio fallback
    }
  }

  public stopBgm() {
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
    }
    this.isBgmPlaying = false;
  }

  // Procedural Drum & Synth Generator for Trending Gen-Z / SMP Beats
  private scheduleStep(step: number) {
    if (!this.ctx || !this.bgmGain || this.isMuted) return;
    const now = this.ctx.currentTime + 0.02;

    // --- 1. DRUMS SECTION ---
    // Kick drum: on steps 0, 6, 10, 16, 22, 26 (Trendy bouncy reggaeton/pop groove)
    const kickPattern = this.currentTrack === 'lofi_chill'
      ? [0, 8, 14, 20]
      : [0, 6, 10, 16, 22, 26];

    if (kickPattern.includes(step)) {
      this.triggerKick(now);
    }

    // Snare / Rimshot: on steps 4, 12, 20, 28 (Punchy 2 and 4 backbeat)
    const snarePattern = [4, 12, 20, 28];
    if (snarePattern.includes(step)) {
      this.triggerSnare(now);
    }

    // Hi-hat: on even steps, with soft swing
    if (step % 2 === 0) {
      const isAccent = step % 4 === 2;
      this.triggerHiHat(now, isAccent ? 0.05 : 0.025);
    }

    // --- 2. HARMONY & BASS SECTION ---
    // 4-Chord Progression (Cmaj7 - Am7 - Fmaj7 - G):
    // Bar 1 (0-7): C (C4, E4, G4, B4) + C2 bass
    // Bar 2 (8-15): Am (A3, C4, E4, G4) + A1 bass
    // Bar 3 (16-23): F (F3, A3, C4, E4) + F1 bass
    // Bar 4 (24-31): G (G3, B3, D4, F4) + G1 bass
    const bar = Math.floor(step / 8);

    if (step % 8 === 0) {
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23]  // G7
      ];
      this.triggerChord(now, chords[bar]);
    }

    // Funky / Bouncy 808 Bassline
    const bassSteps = [0, 3, 6, 10, 14];
    if (bassSteps.includes(step % 16)) {
      const bassNotes = [65.41, 55.00, 43.65, 49.00]; // C2, A1, F1, G1
      this.triggerBass(now, bassNotes[bar]);
    }

    // --- 3. CATCHY TRENDING LEAD MELODY ---
    // Infectious melodic notes that SMP kids recognize from viral shorts & lofi gaming
    const melodyMapTrendy: Record<number, number> = {
      0: 523.25, // C5
      2: 587.33, // D5
      4: 659.25, // E5
      7: 783.99, // G5
      8: 880.00, // A5
      10: 783.99, // G5
      12: 659.25, // E5
      14: 587.33, // D5
      16: 659.25, // E5
      18: 783.99, // G5
      20: 880.00, // A5
      22: 1046.50, // C6
      24: 987.77, // B5
      26: 783.99, // G5
      28: 659.25, // E5
      30: 587.33  // D5
    };

    if (melodyMapTrendy[step] && this.currentTrack !== 'lofi_chill') {
      this.triggerLead(now, melodyMapTrendy[step]);
    } else if (this.currentTrack === 'lofi_chill' && step % 4 === 0) {
      // Softer lofi vibraphone lead
      const lofiNotes = [523.25, 659.25, 783.99, 880.00];
      this.triggerLofiLead(now, lofiNotes[bar]);
    }
  }

  // Instrument: Punchy Kick
  private triggerKick(time: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + 0.16);
  }

  // Instrument: Snappy Snare / Clap
  private triggerSnare(time: number) {
    if (!this.ctx || !this.bgmGain) return;
    const bufferSize = this.ctx.sampleRate * 0.1;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(900, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    noise.start(time);
    noise.stop(time + 0.11);
  }

  // Instrument: Closed Hi-Hat
  private triggerHiHat(time: number, vol: number) {
    if (!this.ctx || !this.bgmGain) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  // Instrument: Warm Electric Piano / Pad Chord
  private triggerChord(time: number, freqs: number[]) {
    if (!this.ctx || !this.bgmGain) return;
    freqs.forEach((freq) => {
      if (!this.ctx || !this.bgmGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.035, time);
      gain.gain.exponentialRampToValueAtTime(0.005, time + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.5);

      osc.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(time);
      osc.stop(time + 1.55);
    });
  }

  // Instrument: Deep Bouncy Bass
  private triggerBass(time: number, freq: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, time);
    filter.frequency.exponentialRampToValueAtTime(110, time + 0.35);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + 0.4);
  }

  // Instrument: Bright Pop Lead Synth
  private triggerLead(time: number, freq: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.07, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + 0.24);
  }

  // Instrument: Lo-fi Soft Rhodes Bell
  private triggerLofiLead(time: number, freq: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.045, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + 0.45);
  }
}

export const sound = new SoundSystem();
