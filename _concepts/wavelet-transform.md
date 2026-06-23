---
title: Wavelet Transform
slug: wavelet-transform
equation: 'W_f(a,b) = \frac{1}{\sqrt{|a|}}\int f(t)\,\overline{\psi\!\left(\tfrac{t-b}{a}\right)}\,dt'
intro: >
  Wavelets decompose signals into components localised in both time and frequency —
  overcoming the Fourier transform's time-frequency uncertainty. They underpin
  JPEG 2000 compression, EEG analysis, geophysical imaging, and gravitational-wave detection.
related_concepts:
  - fourier-transform
  - spectral-analysis
  - linear-algebra
difficulty: advanced
difficulty_level: 4
---

## Continuous Wavelet Transform (CWT)

The CWT of $f$ with mother wavelet $\psi$ at scale $a$ and position $b$:

$$W_f(a,b) = \frac{1}{\sqrt{|a|}}\int_{-\infty}^\infty f(t)\,\overline{\psi\!\left(\frac{t-b}{a}\right)}\,dt$$

Scale $a$ controls frequency (small $a$ = high frequency), $b$ controls position. Unlike the STFT, the time-frequency resolution adapts with frequency.

## Discrete Wavelet Transform (DWT)

Samples the CWT at dyadic points $(a,b) = (2^j, k2^j)$. Implemented via filter banks:

- **Low-pass filter** (scaling function $\phi$): captures coarse structure
- **High-pass filter** (wavelet $\psi$): captures detail at each scale

The Mallat algorithm computes the DWT in $O(N)$ — faster than the FFT for many applications.

## Wavelet bases

| Wavelet | Properties | Applications |
|---|---|---|
| Haar | Discontinuous, simplest | Change-point detection |
| Daubechies $D_N$ | $N$ vanishing moments | General-purpose compression |
| Morlet | Gaussian × sinusoid | Time-frequency analysis |
| Mexican hat | Second derivative of Gaussian | Edge detection |
