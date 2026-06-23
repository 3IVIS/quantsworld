---
title: Fourier Transform
slug: fourier-transform
equation: '\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x)\,e^{-2\pi ix\xi}\,dx'
intro: >
  The Fourier transform decomposes functions into sinusoidal components.
  It is one of the most widely applicable mathematical tools ever invented —
  appearing in signal processing, physics, number theory, cryptography, and statistics.
related_concepts:
  - linear-algebra
  - eigenvalues
difficulty: intermediate
difficulty_level: 3
---

## Intuition

Any "reasonable" function can be written as a superposition of pure sinusoids. The Fourier transform is the recipe — it tells you the amplitude and phase of each frequency component needed to reconstruct $f$.

## Key properties

| Property | Formula |
|---|---|
| Linearity | $\widehat{af+bg} = a\hat{f} + b\hat{g}$ |
| Shift | $\widehat{f(x-a)}(\xi) = e^{-2\pi ia\xi}\hat{f}(\xi)$ |
| Convolution | $\widehat{f * g} = \hat{f}\cdot\hat{g}$ |
| Parseval | $\int|f|^2 = \int|\hat{f}|^2$ |
| Uncertainty | $\Delta x \cdot \Delta\xi \geq \frac{1}{4\pi}$ |

## Uncertainty principle

Time–frequency localisation is fundamentally limited: a signal that is narrow in time must be broad in frequency, and vice versa. This connects to Heisenberg's uncertainty principle in quantum mechanics (where the Fourier pair is position/momentum).
