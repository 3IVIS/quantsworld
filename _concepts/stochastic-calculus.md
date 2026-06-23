---
title: Stochastic Calculus
slug: stochastic-calculus
equation: 'dX_t = \mu\,dt + \sigma\,dW_t'
intro: >
  Stochastic calculus extends ordinary calculus to functions of random processes.
  Itô's lemma — the stochastic chain rule — is its central result and the foundation
  of mathematical finance, statistical physics, and filtering theory.
related_concepts:
  - gaussian-distribution
  - optimization
difficulty: advanced
difficulty_level: 5
---

## Brownian motion

A Wiener process $W_t$ satisfies:
- $W_0 = 0$
- Independent increments: $W_t - W_s \perp \mathcal{F}_s$ for $t > s$
- Gaussian increments: $W_t - W_s \sim \mathcal{N}(0, t-s)$
- Continuous paths (a.s.)

## Itô's lemma

For an Itô process $dX_t = \mu_t\,dt + \sigma_t\,dW_t$ and smooth $f(t, x)$:

$$df(t, X_t) = \left(\frac{\partial f}{\partial t} + \mu_t \frac{\partial f}{\partial x} + \frac{1}{2}\sigma_t^2 \frac{\partial^2 f}{\partial x^2}\right)dt + \sigma_t\frac{\partial f}{\partial x}\,dW_t$$

The extra $\frac{1}{2}\sigma^2 f''$ term (the Itô correction) arises because $(dW_t)^2 = dt$ — quadratic variation is non-zero.
