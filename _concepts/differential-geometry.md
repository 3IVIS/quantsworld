---
title: Differential Geometry
slug: differential-geometry
equation: 'R_{\mu\nu} - \tfrac{1}{2}Rg_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}'
intro: >
  Differential geometry studies smooth manifolds — spaces that locally look like $\mathbb{R}^n$
  but have global curvature. It is the language of general relativity, geometric deep learning,
  robotics (configuration spaces), and information geometry.
related_concepts:
  - linear-algebra
  - differential-equations
  - optimization
difficulty: advanced
difficulty_level: 5
---

## Manifolds and tangent spaces

An $n$-dimensional manifold is a space locally homeomorphic to $\mathbb{R}^n$. At each point $p$, the **tangent space** $T_p M$ is the space of velocity vectors of curves through $p$.

A Riemannian metric $g$ assigns an inner product to each tangent space, defining distances and angles on the manifold.

## Geodesics and curvature

**Geodesics** are locally length-minimising curves — the manifold analogue of straight lines. They satisfy:

$$\frac{d^2 x^\mu}{d\tau^2} + \Gamma^\mu_{\nu\rho}\frac{dx^\nu}{d\tau}\frac{dx^\rho}{d\tau} = 0$$

where $\Gamma^\mu_{\nu\rho}$ are the Christoffel symbols encoding how the metric varies.

**Curvature** (Riemann tensor) measures how geodesics deviate. Einstein's field equations set curvature proportional to energy-momentum — gravity is geometry.
