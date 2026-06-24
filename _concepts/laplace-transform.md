---
title: Laplace Transform
slug: laplace-transform
equation: 'F(s) = \int_0^\infty f(t)\,e^{-st}\,dt'
intro: >
  The Laplace transform converts a continuous-time function into a function of a
  complex frequency variable $s$, turning differential equations into algebraic ones.
  It is the primary tool for analyzing linear time-invariant systems, characterizing
  stability through pole locations, and computing transfer functions in control theory.
related_concepts:
  - fourier-transform
  - complex-analysis
  - differential-equations
  - control-theory
  - z-transform
difficulty: intermediate
difficulty_level: 2
---

## Definition and key properties

The one-sided Laplace transform is:

$$F(s) = \mathcal{L}\{f(t)\}(s) = \int_0^\infty f(t)\,e^{-st}\,dt, \quad s \in \mathbb{C}$$

Key properties include linearity, the differentiation rule $\mathcal{L}\{f'\}(s) = sF(s) - f(0)$, and the convolution theorem $\mathcal{L}\{f * g\} = F(s)G(s)$. Common pairs: $\mathcal{L}\{e^{at}\} = 1/(s-a)$, $\mathcal{L}\{\sin(\omega t)\} = \omega/(s^2+\omega^2)$.

## Transfer functions and stability

For an LTI system governed by an ODE, taking the Laplace transform yields the transfer function $H(s) = Y(s)/U(s)$ as a ratio of polynomials in $s$. A system is bounded-input bounded-output stable if and only if all poles of $H(s)$ lie strictly in the left half-plane $\operatorname{Re}(s) < 0$. The inverse Laplace transform is recovered via the Bromwich contour integral or partial fraction decomposition.

## Applications

The Laplace transform appears in electrical circuit analysis (impedance $Z(s) = V(s)/I(s)$), mechanical systems, PID controller design, and solving initial value problems. The Fourier transform is the special case $s = i\omega$ evaluated on the imaginary axis, valid when the ROC contains it.
