---
title: Spectral Analysis
slug: spectral-analysis
equation: 'S(\omega) = \int_{-\infty}^\infty R(\tau)\,e^{-i\omega\tau}\,d\tau'
intro: >
  Spectral analysis decomposes signals and random processes into their frequency components.
  The power spectral density, periodogram, and Welch's method are its main tools —
  connecting signal processing, time series, and quantum mechanics.
related_concepts:
  - fourier-transform
  - random-processes
  - linear-algebra
difficulty: intermediate
difficulty_level: 3
---

## Power spectral density (PSD)

For a WSS process, the PSD is the Fourier transform of the autocorrelation:

$$S(\omega) = \mathcal{F}\{R(\tau)\}(\omega)$$

Parseval's theorem: $\int S(\omega)\,d\omega = R(0) = \mathbb{E}[X_t^2]$ (total power).

## Periodogram estimation

Given $N$ samples, the periodogram estimates the PSD:

$$\hat{S}(\omega) = \frac{1}{N}\left|\sum_{n=0}^{N-1} x[n]e^{-i\omega n}\right|^2$$

The periodogram is asymptotically unbiased but **not consistent** — variance does not decrease with $N$.

## Welch's method

Average periodograms of overlapping windowed segments to reduce variance:

1. Divide signal into $K$ overlapping segments of length $M$
2. Apply a window function (Hann, Hamming) to each
3. Average the $K$ periodograms

Reduces variance by $\approx K$ at the cost of frequency resolution.
