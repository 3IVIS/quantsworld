---
title: Fourier Transform
field: signal-processing
description: Decomposing any signal into its constituent frequencies. One of the most powerful tools in all of mathematics.
intro: >
  The Fourier transform decomposes a signal into sinusoids of different frequencies.
  It is central to signal processing, quantum mechanics, number theory, and PDE analysis.
  Its discrete version (DFT), computed by the FFT, is the workhorse of digital signal processing.
math_concepts:
  - fourier-transform
  - linear-algebra
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 10
widget:
  type: include
  file: fourier-explorer.html
---

## The continuous Fourier transform

For $f \in L^1(\mathbb{R})$:

$$\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x)\, e^{-2\pi i x \xi}\, dx$$

The inverse recovers $f$:

$$f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi)\, e^{2\pi i x \xi}\, d\xi$$

Key properties: linearity, shift, convolution theorem ($\widehat{f * g} = \hat{f}\cdot\hat{g}$), Parseval's theorem.

## The Discrete Fourier Transform (DFT)

For a sequence $x[0], \ldots, x[N-1]$:

$$X[k] = \sum_{n=0}^{N-1} x[n]\, e^{-2\pi ikn/N}, \quad k = 0, \ldots, N-1$$

The DFT is a unitary linear transform — a change of basis from the time domain to the frequency domain.

## The Fast Fourier Transform (FFT)

The Cooley–Tukey FFT computes the $N$-point DFT in $O(N\log N)$ operations versus $O(N^2)$ for the naive DFT — one of the most important algorithms ever discovered. It exploits the recursive structure:

$$X[k] = X_{even}[k] + e^{-2\pi ik/N} X_{odd}[k]$$

## Cross-field connections

The Fourier transform appears in:
- **Quantum mechanics:** position and momentum eigenstates are Fourier duals
- **Econometrics:** spectral density of ARMA processes
- **Cryptography:** number-theoretic transforms for fast polynomial multiplication
- **Astrophysics:** radio telescope imaging via aperture synthesis
