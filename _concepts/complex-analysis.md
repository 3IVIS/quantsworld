---
title: Complex Analysis
slug: complex-analysis
equation: '\oint_C f(z)\,dz = 2\pi i \sum_k \text{Res}(f, z_k)'
intro: >
  Complex analysis studies functions of a complex variable $z = x + iy$, where
  differentiability imposes the strong Cauchy-Riemann equations and forces analytic
  functions to be infinitely differentiable. The residue theorem reduces contour
  integrals to a sum over singularities, enabling evaluation of real integrals
  that resist elementary methods.
related_concepts:
  - fourier-transform
  - laplace-transform
  - differential-equations
  - hilbert-spaces
difficulty: advanced
difficulty_level: 3
---

## Analytic functions and Cauchy-Riemann equations

A function $f(z) = u(x,y) + iv(x,y)$ is analytic at $z_0$ if it is complex-differentiable in a neighborhood of $z_0$. This requires the Cauchy-Riemann equations:

$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

Analytic functions are conformal (angle-preserving) maps and satisfy Laplace's equation, making them valuable in fluid dynamics and electrostatics.

## Residue theorem

For a meromorphic function $f$ with isolated singularities inside a simple closed contour $C$:

$$\oint_C f(z)\,dz = 2\pi i \sum_k \operatorname{Res}(f, z_k)$$

The residue at a simple pole $z_k$ is $\operatorname{Res}(f, z_k) = \lim_{z \to z_k}(z - z_k)f(z)$. Laurent series generalize Taylor series to functions with poles.

## Applications

Contour integration evaluates Fourier and Laplace transform inversions, computes definite integrals such as $\int_{-\infty}^\infty e^{-x^2}\cos(ax)\,dx$, and analyzes the stability of control systems via poles of transfer functions. The Riemann mapping theorem guarantees conformal equivalence of simply connected domains, with applications in aerodynamics and potential theory.
