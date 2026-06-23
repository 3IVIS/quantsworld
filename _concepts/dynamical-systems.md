---
title: Dynamical Systems
slug: dynamical-systems
equation: '\dot{\mathbf{x}} = f(\mathbf{x}), \quad \mathbf{x} \in \mathbb{R}^n'
intro: >
  Dynamical systems theory studies how systems evolve over time.
  Fixed points, limit cycles, bifurcations, and chaos are its core phenomena —
  connecting ecology, economics, neuroscience, climate, and physics.
related_concepts:
  - differential-equations
  - linear-algebra
  - chaos-theory
difficulty: intermediate
difficulty_level: 3
---

## Linear stability analysis

At an equilibrium $\mathbf{x}^*$, linearise: $\dot{\boldsymbol{\xi}} = J\boldsymbol{\xi}$ where $J = Df(\mathbf{x}^*)$.

Stability is determined by the eigenvalues of $J$:
- All eigenvalues have negative real part → **stable node/focus**
- Any eigenvalue with positive real part → **unstable**
- Purely imaginary eigenvalues → **centre** (non-linear analysis needed)

## Bifurcations

A **bifurcation** occurs when a small parameter change qualitatively alters the system's long-run behaviour.

| Type | Description |
|---|---|
| Saddle-node | Two fixed points collide and annihilate |
| Pitchfork | One fixed point splits into three |
| Hopf | Fixed point loses stability, limit cycle born |
| Period-doubling | Route to chaos |

## Chaos

A system is **chaotic** if it is deterministic yet sensitive to initial conditions (positive Lyapunov exponent):

$$\|\delta\mathbf{x}(t)\| \approx e^{\lambda t}\|\delta\mathbf{x}(0)\|, \quad \lambda > 0$$
