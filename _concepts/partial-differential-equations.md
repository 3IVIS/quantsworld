---
title: Partial Differential Equations
slug: partial-differential-equations
equation: '\frac{\partial u}{\partial t} = \kappa \nabla^2 u'
intro: >
  Partial differential equations (PDEs) describe how quantities vary across both space and time.
  The heat equation, wave equation, and Laplace equation are the three canonical types —
  parabolic, hyperbolic, and elliptic — each with distinct physics and solution methods.
related_concepts:
  - differential-equations
  - fourier-transform
  - numerical-methods
difficulty: advanced
difficulty_level: 4
---

## The three canonical PDEs

**Heat equation (parabolic):** $\partial_t u = \kappa \nabla^2 u$ — diffusion, probability densities

**Wave equation (hyperbolic):** $\partial_{tt} u = c^2 \nabla^2 u$ — acoustics, seismics, electromagnetism

**Laplace / Poisson equation (elliptic):** $\nabla^2 u = 0$ (or $= f$) — steady states, gravitation, electrostatics

## Solution via Fourier transform

For the heat equation on $\mathbb{R}$ with initial condition $u(x,0) = u_0(x)$:

$$u(x,t) = \frac{1}{\sqrt{4\pi\kappa t}} \int_{-\infty}^\infty u_0(y)\, e^{-(x-y)^2/4\kappa t}\,dy$$

The fundamental solution (Green's function) is a Gaussian that spreads over time.

## Boundary conditions

- **Dirichlet:** $u = g$ on boundary — prescribed values
- **Neumann:** $\nabla u \cdot \hat{n} = h$ — prescribed flux
- **Robin:** $\alpha u + \beta \nabla u \cdot \hat{n} = g$ — mixed
