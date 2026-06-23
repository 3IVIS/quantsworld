---
title: Hilbert Spaces
slug: hilbert-spaces
equation: '\langle f, g \rangle = \int f(x)\overline{g(x)}\,dx'
intro: >
  A Hilbert space is a complete inner product space — the infinite-dimensional
  generalisation of Euclidean space. It is the natural setting for quantum mechanics,
  functional data analysis, kernel methods, and Fourier analysis.
related_concepts:
  - linear-algebra
  - quantum-mechanics
  - fourier-transform
  - kernel-methods
difficulty: advanced
difficulty_level: 4
---

## Inner product and norm

An inner product space has a map $\langle \cdot, \cdot \rangle: \mathcal{H}\times\mathcal{H} \to \mathbb{C}$ that is:
- Conjugate symmetric: $\langle f,g\rangle = \overline{\langle g,f\rangle}$
- Linear in first argument
- Positive definite: $\langle f,f\rangle > 0$ for $f \neq 0$

The induced norm $\|f\| = \sqrt{\langle f,f\rangle}$.

A Hilbert space is a complete inner product space (every Cauchy sequence converges).

## Orthonormal bases

A set $\{e_n\}$ is orthonormal if $\langle e_m, e_n\rangle = \delta_{mn}$. Any $f \in \mathcal{H}$ can be written:

$$f = \sum_n \langle f, e_n\rangle e_n \quad \text{(Fourier series in } L^2)$$

## The Riesz representation theorem

Every bounded linear functional $\ell: \mathcal{H} \to \mathbb{C}$ can be written as $\ell(f) = \langle f, g\rangle$ for a unique $g \in \mathcal{H}$. This underpins the reproducing kernel Hilbert space (RKHS) framework used in kernel methods and Gaussian processes.
