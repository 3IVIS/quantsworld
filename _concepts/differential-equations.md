---
title: Differential Equations (ODEs)
slug: differential-equations
equation: '\frac{dy}{dt} = f(t, y)'
intro: >
  Ordinary differential equations describe how quantities change continuously over time.
  They govern population dynamics, electrical circuits, chemical reactions, and mechanical systems.
  Existence, uniqueness, and stability are the central theoretical concerns.
related_concepts:
  - dynamical-systems
  - numerical-methods
  - partial-differential-equations
difficulty: intermediate
difficulty_level: 3
---

## First-order linear ODEs

$$\frac{dy}{dt} + p(t)y = q(t)$$

Solved by the integrating factor $\mu(t) = e^{\int p(t)\,dt}$:

$$y = \frac{1}{\mu(t)}\left[\int \mu(t)q(t)\,dt + C\right]$$

## Second-order linear ODEs with constant coefficients

$$ay'' + by' + cy = f(t)$$

The characteristic equation $ar^2 + br + c = 0$ determines solution structure:
- Two real roots $r_1 \neq r_2$: $y_h = C_1 e^{r_1 t} + C_2 e^{r_2 t}$
- Repeated root: $y_h = (C_1 + C_2 t)e^{rt}$
- Complex roots $\alpha \pm i\beta$: $y_h = e^{\alpha t}(C_1\cos\beta t + C_2\sin\beta t)$

## Stability: Lyapunov's method

For the system $\dot{\mathbf{x}} = f(\mathbf{x})$, an equilibrium $\mathbf{x}^*$ is stable if there exists a Lyapunov function $V(\mathbf{x}) > 0$ with $\dot{V}(\mathbf{x}) \leq 0$.
