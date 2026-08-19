/**
 * Nostalgic Music Player for Graduation & Friendship Greeting Card.
 * Synthesizes the melodic, uplifting "Wonder" melody (Ab - Bb - Cm - Eb) using Web Audio API,
 * with layered acoustic chime, soft bass, and warm chord arpeggios.
 * Also supports custom audio playback via HTML5 Audio element.
 */

class NostalgicMusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private volume = 0.4;
  private gainNode: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private useCustomAudio = false;

  // Progression & Melody for "Wonder / Hey Yeah You're a Wonder" (Eb Major key)
  // Eb4=311.13, F4=349.23, G4=392.00, Ab4=415.30, Bb4=466.16, C5=523.25, D5=587.33, Eb5=622.25
  private chords = [
    {
      root: 155.56, // Eb3 bass
      notes: [311.13, 392.00, 466.16, 622.25], // Eb (Eb4, G4, Bb4, Eb5)
      melody: [392.00, 466.16, 622.25, 466.16, 392.00, 349.23, 311.13, 349.23], // "I've been painting..."
    },
    {
      root: 146.83, // Bb/D bass (D3=146.83)
      notes: [293.66, 349.23, 466.16, 587.33], // Bb/D (D4, F4, Bb4, D5)
      melody: [349.23, 392.00, 466.16, 587.33, 466.16, 392.00, 349.23, 392.00],
    },
    {
      root: 130.81, // C3 bass (Cm)
      notes: [261.63, 311.13, 392.00, 523.25], // Cm (C4, Eb4, G4, C5)
      melody: [523.25, 466.16, 392.00, 311.13, 349.23, 392.00, 466.16, 523.25], // "You're a wonder..."
    },
    {
      root: 103.83, // Ab2 bass
      notes: [207.65, 261.63, 311.13, 415.30], // Ab (Ab3, C4, Eb4, Ab4)
      melody: [415.30, 466.16, 523.25, 466.16, 415.30, 392.00, 349.23, 311.13], // "Hey yeah, hey yeah..."
    },
  ];

  private currentChordIdx = 0;
  private stepIdx = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(
    freq: number,
    type: OscillatorType = 'sine',
    duration = 0.8,
    vol = 0.3,
    filterFreq = 1800
  ) {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, now);

    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(vol, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration);
  }

  private step() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.currentChordIdx];

    // Bass on downbeat
    if (this.stepIdx === 0) {
      this.playTone(chord.root, 'triangle', 1.8, 0.45, 600);
      this.playTone(chord.root * 2, 'sine', 1.2, 0.25, 800);
    }

    // Arpeggio chord note (warm acoustic music box)
    const arpFreq = chord.notes[this.stepIdx % chord.notes.length];
    this.playTone(arpFreq, 'sine', 1.2, 0.28, 2200);

    // Lead melodic sparkle note (Wonder melody)
    const melodyFreq = chord.melody[this.stepIdx % chord.melody.length];
    if (melodyFreq) {
      this.playTone(melodyFreq, 'triangle', 0.9, 0.32, 2800);
      // Gentle harmonic overtone
      this.playTone(melodyFreq * 2, 'sine', 0.5, 0.08, 3500);
    }

    this.stepIdx++;
    if (this.stepIdx >= 8) {
      this.stepIdx = 0;
      this.currentChordIdx = (this.currentChordIdx + 1) % this.chords.length;
    }

    // Tempo ~ 240ms per 8th note
    this.timer = window.setTimeout(() => this.step(), 250);
  }

  public setCustomAudio(urlOrBlob: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    this.customAudio = new Audio(urlOrBlob);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.useCustomAudio = true;

    if (this.isPlaying) {
      this.customAudio.play().catch(() => {
        // Fallback to synth if autoplay blocked
        this.useCustomAudio = false;
        this.step();
      });
    }
  }

  public play() {
    if (this.useCustomAudio && this.customAudio) {
      this.isPlaying = true;
      this.customAudio.play().catch(() => {
        this.useCustomAudio = false;
        this.initContext();
        this.step();
      });
      return;
    }

    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step();
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicPlayer = new NostalgicMusicPlayer();

