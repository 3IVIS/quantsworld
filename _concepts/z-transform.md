---
title: Z-Transform
slug: z-transform
equation: 'X(z) = \sum_{n} x[n]\,z^{-n}'
intro: >
  The Z-transform converts a discrete-time sequence into a function of a complex
  variable $z$, playing the role for discrete systems that the Laplace transform
  plays for continuous ones. It enables analysis of linear time-invariant (LTI)
  systems through algebraic manipulation of transfer functions and characterization
  of stability via pole locations.
related_concepts:
  - fourier-transform
  - laplace-transform
  - complex-analysis
  - spectral-analysis
  - control-theory
difficulty: intermediate
difficulty_level: 2
---

## Definition and region of convergence

The bilateral Z-transform of a sequence $x[n]$ is:

$$X(z) = \sum_{n=-\infty}^{\infty} x[n]\,z^{-n}$$

where $z \in \mathbb{C}$. The region of convergence (ROC) is the annulus $r_1 < |z| < r_2$ where the sum converges absolutely. Causality and stability impose constraints: a causal system's ROC is the exterior of a disk, and stability requires the ROC to include the unit circle $|z| = 1$.

## Poles, zeros, and transfer functions

For an LTI system with impulse response $h[n]$, the transfer function $H(z) = \mathcal{Z}\{h[n]\}$ is a rational function of $z$. Poles determine stability: all poles inside the unit circle guarantee bounded-input bounded-output (BIBO) stability. The inverse Z-transform recovers $x[n]$ via partial fractions or contour integration:

$$x[n] = \frac{1}{2\pi i} \oint X(z)\,z^{n-1}\,dz$$

## Applications

The Z-transform is fundamental to digital filter design, difference equation analysis, and digital control systems. IIR and FIR filters are specified by their pole-zero patterns, and the discrete Fourier transform (DFT) evaluates $X(z)$ on the unit circle at $N$ equally spaced points.
