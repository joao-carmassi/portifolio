"""Ambient score + sound design for the two "sobre mim" videos.

One piece per video: a pad in D major that changes chord with the scenes, a
sub, a bed of air, and effects tuned to the same key, all sent into the same
reverb so they sit in one room. Cue times mirror the GSAP timelines in
../{pessoal,profissional}/composition/index.html.

usage: python score.py pessoal|profissional out.wav
"""

import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, fftconvolve, sosfilt

SR = 48000
DUR = 26.0
N = int(SR * DUR)
rng = np.random.default_rng(7)


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def t_axis(n):
    return np.arange(n, dtype=np.float64) / SR


def lowpass(x, fc, order=2):
    return sosfilt(butter(order, fc, 'low', fs=SR, output='sos'), x, axis=-1)


def highpass(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x, axis=-1)


def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x, axis=-1)


def pan(mono, p):
    # constant power, p in [-1, 1]
    a = (p + 1) * np.pi / 4
    return np.stack([mono * np.cos(a), mono * np.sin(a)])


class Bus:
    def __init__(self):
        self.x = np.zeros((2, N))

    def add(self, t, stereo):
        i = int(round(t * SR))
        if i >= N:
            return
        j = min(N, i + stereo.shape[1])
        if i < 0:
            stereo = stereo[:, -i:]
            i = 0
        self.x[:, i:j] += stereo[:, : j - i]


# ---------- instruments ----------

def pad_section(notes, t0, t1, bright, attack, release=1.8):
    """Detuned soft saws, one chord, faded in and out so sections overlap."""
    length = t1 - t0 + release
    n = int(length * SR)
    t = t_axis(n)
    out = np.zeros((2, n))
    for idx, m in enumerate(notes):
        f = hz(m)
        amp = 0.42 if m < 48 else 0.5 if m < 60 else 0.4
        for side, cents in ((-1, -7), (1, 6)):
            fv = f * 2 ** (cents / 1200)
            vib = 1 + 0.0018 * np.sin(2 * np.pi * (0.17 + 0.03 * idx) * t + idx)
            phase = 2 * np.pi * fv * np.cumsum(vib) / SR
            h_max = max(1, int(5200 / fv))
            wave = np.zeros(n)
            for k in range(1, min(h_max, 18) + 1):
                wave += np.sin(k * phase + 0.37 * k * idx) / k ** 1.4
            out += pan(wave * amp, side * (0.35 + 0.08 * (idx % 3)))
    env = np.ones(n)
    a = int(attack * SR)
    env[:a] = np.sin(np.linspace(0, np.pi / 2, a)) ** 2
    r0 = int((t1 - t0) * SR)
    env[r0:] *= np.cos(np.linspace(0, np.pi / 2, n - r0)) ** 2
    out *= env
    out = highpass(lowpass(out, 3400 if bright else 1600, order=2), 110)
    # scoop the low mids, where six detuned saws pile into mud
    return out - 0.4 * bandpass(out, 220, 480)


def sub(m, t0, t1, attack=0.8, release=1.6):
    n = int((t1 - t0 + release) * SR)
    t = t_axis(n)
    w = np.sin(2 * np.pi * hz(m) * t)
    env = np.ones(n)
    a = int(attack * SR)
    env[:a] = np.linspace(0, 1, a) ** 2
    r0 = int((t1 - t0) * SR)
    env[r0:] *= np.linspace(1, 0, n - r0) ** 2
    return pan(lowpass(w * env, 90), 0)


def bell(m, vel=1.0, decay=2.4, ratio=3.5, index=2.2, p=0.0):
    n = int((decay * 3) * SR)
    t = t_axis(n)
    fc = hz(m)
    i_t = index * np.exp(-t / 0.22) + 0.25
    w = np.sin(2 * np.pi * fc * t + i_t * np.sin(2 * np.pi * fc * ratio * t))
    w += 0.35 * np.sin(2 * np.pi * fc * 2 * t) * np.exp(-t / (decay * 0.4))
    env = np.exp(-t / decay) * np.minimum(1, t / 0.004)
    return pan(w * env * vel * 0.12, p)


def pluck(m, vel=1.0, p=0.0):
    n = int(1.6 * SR)
    t = t_axis(n)
    f = hz(m)
    w = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t) * np.exp(-t / 0.12)
    env = np.exp(-t / 0.45) * np.minimum(1, t / 0.003)
    return pan(w * env * vel * 0.14, p)


def hit(vel=1.0):
    n = int(1.8 * SR)
    t = t_axis(n)
    f = 42 + 30 * np.exp(-t / 0.09)
    w = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.5)
    thump = lowpass(rng.standard_normal(n), 140) * np.exp(-t / 0.03) * 0.6
    return pan((w + thump) * vel * 0.2, 0)


def tick(m=93, vel=1.0, p=0.0):
    n = int(0.18 * SR)
    t = t_axis(n)
    w = np.sin(2 * np.pi * hz(m) * t) * np.exp(-t / 0.035)
    click = highpass(rng.standard_normal(n), 2500) * np.exp(-t / 0.004) * 0.25
    return pan((w + click) * vel * 0.35, p)


def keyclick(vel=1.0, p=0.0):
    n = int(0.06 * SR)
    t = t_axis(n)
    w = bandpass(rng.standard_normal(n), 1800, 5200) * np.exp(-t / 0.008)
    return pan(w * vel * 0.9, p)


def swell(dur, vel=1.0, rising=True, p=0.0, lo=(250, 1400), hi=(1600, 7000)):
    """Air moving: low band to high band, peaking at the end (rising) or the
    start (falling)."""
    tail = 0.25
    n = int((dur + tail) * SR)
    noise = rng.standard_normal(n)
    low = bandpass(noise, *lo)
    high = bandpass(rng.standard_normal(n), *hi)
    x = np.linspace(0, 1, n)
    k = int(dur * SR)
    env = np.zeros(n)
    if rising:
        env[:k] = np.linspace(0, 1, k) ** 2.4
        env[k:] = np.exp(-np.linspace(0, 1, n - k) * 12)
        mixhi = np.clip(x * (dur + tail) / dur, 0, 1)
    else:
        a = int(0.05 * SR)
        env[:a] = np.linspace(0, 1, a)
        env[a:] = np.exp(-np.linspace(0, 1, n - a) * 4.5)
        mixhi = 1 - np.clip(x * (dur + tail) / dur, 0, 1)
    w = (low * (1 - mixhi) + high * mixhi * 0.7) * env
    return pan(w * vel * 0.9, p)


def glide(dur, m0, m1, vel=1.0, p=0.0):
    n = int((dur + 0.4) * SR)
    t = t_axis(n)
    m = m0 + (m1 - m0) * np.clip(t / dur, 0, 1) ** 0.7
    w = np.sin(2 * np.pi * np.cumsum(hz(m)) / SR)
    env = np.minimum(1, t / 0.05) * np.where(t < dur, 1, np.exp(-(t - dur) / 0.12))
    return pan(w * env * vel * 0.06, p)


def air_bed(sections):
    """Barely there high noise that breathes; brighter in the light chapter."""
    noise = bandpass(rng.standard_normal(N), 2200, 7500)
    t = t_axis(N)
    level = np.full(N, 0.03)
    for t0, t1, bright in sections:
        if bright:
            i, j = int(t0 * SR), int(t1 * SR)
            level[i:j] = 0.06
    level = lowpass(level, 2.0, order=1)
    breath = 0.6 + 0.4 * np.sin(2 * np.pi * 0.11 * t)
    return pan(noise * level * breath, 0) + pan(np.roll(noise, 4800) * level * breath * 0.6, 0.6)


def reverb_ir(rt60=2.6, pre=0.02):
    n = int(rt60 * 1.2 * SR)
    t = t_axis(n)
    decay = np.exp(-6.9 * t / rt60)
    ir = np.stack([rng.standard_normal(n) * decay, rng.standard_normal(n) * decay])
    ir = lowpass(ir, 5500)
    ir[:, : int(pre * SR)] = 0
    return ir / np.sqrt(np.sum(ir ** 2) / 2)


# ---------- chords (MIDI) ----------
I = [38, 45, 50, 54, 57, 64]    # Dmaj9
VI = [35, 42, 47, 50, 57, 61]   # Bm9
IV = [43, 50, 55, 59, 62, 69]   # Gmaj9 (light chapter)
II = [40, 47, 52, 55, 59, 66]   # Em9
V = [45, 52, 57, 59, 61, 64]    # A(add9)

# D major pentatonic for melodic effects
D5, E5, Fs5, A5, B5, D6, E6, Fs6, A6, B6, D7 = 74, 76, 78, 81, 83, 86, 88, 90, 93, 95, 98
G5 = 79


def intro(e):
    # the mark's strokes cross the frame while the camera pulls back
    e.append((0.05, swell(1.6, 0.5, True, -0.3)))
    e.append((0.3, swell(1.35, 0.35, True, 0.4)))
    # the mark lands, light behind it
    e.append((1.58, hit(0.65)))
    e.append((1.6, bell(D5, 0.75, p=-0.15)))
    e.append((1.7, bell(A5, 0.6, p=0.15)))
    # the name arrives
    for i, m in enumerate((D6, Fs6, A6, E6)):
        e.append((1.72 + i * 0.09, bell(m, 0.16, decay=1.6, ratio=2.0, index=1.0, p=-0.3 + i * 0.2)))
    # dissolve into the film
    e.append((2.3, swell(0.35, 0.45, True, 0)))


def outro(e):
    e.append((23.3, swell(0.4, 0.4, True, 0)))
    e.append((24.0, hit(0.5)))
    for i, m in enumerate((D5, Fs5, A5, E6)):
        e.append((24.02 + i * 0.07, bell(m, 0.5, decay=3.2, p=-0.3 + i * 0.2)))


def cues_pessoal():
    e = []
    intro(e)
    # S1 press start, the ring, the name, the card through it
    for i in range(11):
        e.append((2.9 + i * 0.045, keyclick(0.3, p=-0.4 + i * 0.08)))
    e.append((2.85, swell(1.0, 0.3, False, 0.3)))
    e.append((4.1, tick(A6, 0.6)))
    e.append((4.12, bell(D6, 0.45, decay=2.0)))
    e.append((4.2, hit(0.5)))
    e.append((4.22, bell(D5, 0.5)))
    e.append((5.3, swell(0.75, 0.45, True, 0)))
    e.append((6.05, hit(0.55)))
    # S2 the camera pulls back into a character select
    e.append((6.05, swell(0.9, 0.35, False, 0)))
    e.append((6.3, swell(0.5, 0.18, False, -0.6)))
    e.append((6.3, swell(0.5, 0.18, False, 0.6)))
    e.append((6.75, glide(0.6, 81, 88, 0.35, 0.3)))
    e.append((7.0, tick(D6, 0.75, -0.4)))
    e.append((7.4, tick(Fs6, 0.75, 0.4)))
    # the card turns over and the camera goes into it
    e.append((9.2, swell(0.6, 0.5, True, 0)))
    # S3 the base, the iris, the world
    e.append((9.8, hit(0.6)))
    e.append((9.82, bell(A5, 0.4, decay=2.4)))
    e.append((10.4, tick(D6, 0.5, 0.2)))
    e.append((10.45, tick(A5, 0.8, -0.1)))
    e.append((10.55, bell(A5, 0.22, decay=1.6, p=-0.1)))
    e.append((10.95, bell(A5, 0.16, decay=1.6, p=-0.1)))
    e.append((11.3, swell(0.8, 0.35, False, 0)))
    e.append((11.3, glide(0.7, 74, 62, 0.4, 0)))
    e.append((12.0, bell(Fs5, 0.45, decay=2.6)))
    for i, m in enumerate((D6, E6, Fs6, A6, B6, D7, E6)):
        e.append((12.1 + i * 0.09, pluck(m, 0.35, -0.6 + i * 0.2)))
    e.append((12.75, tick(D6, 0.6, 0.2)))
    # into the light
    e.append((13.4, swell(0.55, 0.7, True, 0)))
    e.append((13.95, hit(0.45)))
    for i, m in enumerate((G5, B5, D6)):
        e.append((13.95 + i * 0.06, bell(m, 0.45, decay=3.0, p=-0.3 + i * 0.3)))
    for i in range(3):
        e.append((14.32 + i * 0.2, tick(A5, 0.45, -0.4 + i * 0.4)))
        e.append((14.56 + i * 0.2, tick(D6, 0.35, -0.4 + i * 0.4)))
    for i, m in enumerate((D6, Fs6, A6)):
        e.append((15.05 + i * 0.24, pluck(m, 0.8, -0.4 + i * 0.4)))
    # the whip pan
    e.append((16.8, swell(0.3, 0.45, True, 0.4)))
    e.append((17.1, swell(0.45, 0.35, False, -0.4)))
    # S5 the cubes land in a row
    for i, m in enumerate((D5, E5, Fs5, A5, B5, D6)):
        e.append((18.05 + i * 0.26, pluck(m, 0.9 if i < 5 else 1.1, -0.6 + i * 0.24)))
    e.append((19.95, tick(A6, 0.65, 0.6)))
    e.append((19.97, bell(D6, 0.35, decay=2.0, p=0.5)))
    # a dark shape crosses the lens
    e.append((20.55, swell(0.6, 0.45, True, -0.5, lo=(120, 700), hi=(700, 2500))))
    # S6 save, signature
    e.append((21.1, hit(0.35)))
    e.append((21.3, glide(0.7, 69, 74, 0.6, 0)))
    e.append((22.0, bell(D6, 0.55, decay=2.2)))
    e.append((22.4, swell(0.25, 0.3, True, 0)))
    e.append((22.62, hit(0.5)))
    e.append((22.64, bell(D5, 0.5, decay=3.0, p=-0.2)))
    e.append((22.66, bell(A5, 0.35, decay=3.0, p=0.2)))
    outro(e)
    sections = [(0, 6.0, I, False), (6.0, 9.8, I, False), (9.8, 13.95, VI, False),
                (13.95, 17.3, IV, True), (17.3, 21.0, II, False), (21.0, 23.7, V, False), (23.7, 25.2, I, False)]
    return e, sections


def cues_profissional():
    e = []
    intro(e)
    # S1 a pencil sketches the site, then the real one wipes in
    for i in range(10):
        t = 2.85 + (0 if i == 0 else 0.32 + i * 0.09)
        e.append((t, swell(0.28 if i else 0.5, 0.16, False, -0.4 + i * 0.08, lo=(700, 2600), hi=(2600, 8000))))
    e.append((4.2, swell(0.55, 0.4, True, 0.3)))
    e.append((4.5, bell(D5, 0.55, decay=2.6)))
    e.append((4.62, tick(D6, 0.6)))
    e.append((5.8, swell(0.35, 0.45, True, 0)))
    e.append((6.1, hit(0.5)))
    # S2 the code types itself, the stack pops up
    for i in range(9):
        for k in range(3):
            e.append((6.25 + i * 0.14 + k * 0.04, keyclick(0.45 - k * 0.1, p=-0.2 + 0.05 * i)))
    e.append((7.7, swell(0.6, 0.3, False, 0.4)))
    for i, m in enumerate((D5, E5, Fs5, A5, B5, D6, E6, Fs6, A6)):
        e.append((7.9 + i * 0.06, pluck(m, 0.5, -0.6 + i * 0.15)))
    e.append((8.95, swell(0.3, 0.45, True, 0)))
    # S3 the camera flies through the work
    e.append((9.25, hit(0.45)))
    e.append((9.3, swell(0.6, 0.3, False, 0)))
    e.append((9.85, tick(A5, 0.7, -0.3)))
    for i, (t, m) in enumerate(((10.7, B5), (12.15, D6), (13.6, E6))):
        e.append((t, swell(0.55, 0.35, True, 0.3 if i % 2 else -0.3)))
        e.append((t + 0.55, tick(m, 0.7, 0.3)))
    e.append((11.15, pluck(Fs6, 0.6, 0.5)))
    e.append((12.6, pluck(A6, 0.5, -0.5)))
    e.append((12.78, pluck(D7, 0.4, 0.5)))
    for i, m in enumerate((D6, Fs6, A6)):
        e.append((14.0 + i * 0.09, pluck(m, 0.6, -0.4 + i * 0.4)))
    e.append((14.6, swell(0.4, 0.5, True, 0)))
    # S4 the curve, the dot, the bars, the button
    e.append((15.0, hit(0.4)))
    e.append((15.05, glide(0.6, 62, 74, 0.4, -0.2)))
    e.append((15.15, glide(0.8, 69, 81, 0.45, 0.2)))
    for i in range(9):
        e.append((15.4 + i * 0.045, pluck(D6 + (i % 3) * 2, 0.25, -0.4 + i * 0.1)))
    for i in range(9):
        e.append((16.05 + i * 0.03, pluck(A5 + (i % 3) * 2, 0.2, -0.4 + i * 0.1)))
    e.append((16.05, swell(0.6, 0.3, False, 0)))
    e.append((16.45, swell(0.7, 0.18, False, 0.5, lo=(1500, 3500), hi=(3500, 9000))))
    e.append((16.92, tick(D6, 0.8, 0.2)))
    e.append((16.93, keyclick(0.6, 0.2)))
    # into the light
    e.append((16.8, swell(0.55, 0.7, True, 0)))
    e.append((17.35, hit(0.45)))
    for i, m in enumerate((G5, B5, D6)):
        e.append((17.35 + i * 0.06, bell(m, 0.45, decay=3.0, p=-0.3 + i * 0.3)))
    # S5 SEO: the query, the climb, the scores
    for i in range(16):
        e.append((17.75 + i * 0.038, keyclick(0.4, p=-0.2)))
    for i in range(4):
        e.append((18.3 + i * 0.07, tick(A6, 0.3, -0.3 + i * 0.2)))
    e.append((18.75, swell(0.7, 0.3, True, -0.2)))
    e.append((19.45, tick(D6, 0.8, -0.3)))
    for i, m in enumerate((D6, Fs6, A6, D7)):
        e.append((20.27 + i * 0.1, pluck(m, 0.75, 0.2 + i * 0.12)))
    # a diagonal wipe into the poster
    e.append((20.6, swell(0.5, 0.5, True, 0.3)))
    # S6 the poster
    e.append((21.2, hit(0.55)))
    e.append((21.22, bell(D5, 0.55, decay=3.0, p=-0.2)))
    e.append((22.15, swell(0.9, 0.16, False, 0.4, lo=(2000, 4000), hi=(4000, 9500))))
    e.append((22.98, tick(A5, 0.85)))
    e.append((22.99, hit(0.22)))
    outro(e)
    sections = [(0, 6.1, I, False), (6.1, 9.25, VI, False), (9.25, 15.0, I, False),
                (15.0, 17.35, II, False), (17.35, 20.9, IV, True), (20.9, 23.7, V, False), (23.7, 25.2, I, False)]
    return e, sections


def render(name):
    events, sections = cues_pessoal() if name == 'pessoal' else cues_profissional()
    dry_pad, sfx = Bus(), Bus()
    for i, (t0, t1, chord, bright) in enumerate(sections):
        attack = 2.4 if i == 0 else 1.1
        dry_pad.add(t0, pad_section(chord, t0, t1, bright, attack) * 0.06)
        root = chord[0] if chord[0] < 45 else chord[0] - 12
        dry_pad.add(t0, sub(root, t0, t1) * 0.03)
    dry_pad.x += air_bed([(a, b, br) for a, b, _, br in sections])
    for t, s in events:
        sfx.add(t, s)

    ir = reverb_ir()
    # the reverb send skips the lows: a reverberated sub only adds mud
    send = highpass(dry_pad.x * 0.3 + sfx.x * 0.5, 180)
    wet = np.stack([fftconvolve(send[0], ir[0])[:N], fftconvolve(send[1], ir[1])[:N]])
    mix = dry_pad.x + sfx.x * 0.9 + wet * 0.55
    mix = highpass(mix, 28)
    # the film ends in silence, so the loop starts where it ended
    fade = np.ones(N)
    k = int(0.5 * SR)
    fade[-k:] = np.cos(np.linspace(0, np.pi / 2, k)) ** 2
    mix *= fade
    # peak at -3 dBFS; loudness is set later by ffmpeg loudnorm
    return mix / np.max(np.abs(mix)) * 0.708


if __name__ == '__main__':
    name, out = sys.argv[1], sys.argv[2]
    mix = render(name)
    wavfile.write(out, SR, (mix.T * 32767).astype(np.int16))
    print(f'{name}: {DUR}s -> {out}')
