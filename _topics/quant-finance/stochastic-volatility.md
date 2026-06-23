---
title: Stochastic Volatility
field: quant-finance
description: Models where volatility itself is random. The Heston model gives closed-form option prices and captures the implied volatility smile.
intro: >
  Stochastic volatility models extend Black-Scholes by allowing volatility to vary randomly.
  They explain the implied volatility smile observed in option markets — a pattern
  Black-Scholes cannot reproduce. The Heston model is the most widely used.
math_concepts:
  - stochastic-calculus
  - differential-equations
  - fourier-transform
difficulty: advanced
difficulty_level: 4
read_time: 9
---

## The Heston model

Asset price and variance $(S_t, v_t)$ follow coupled SDEs:

$$dS_t = \mu S_t\,dt + \sqrt{v_t}\,S_t\,dW_t^S$$
$$dv_t = \kappa(\theta - v_t)\,dt + \xi\sqrt{v_t}\,dW_t^v$$

where $\text{Corr}(dW^S, dW^v) = \rho\,dt$ (typically $\rho < 0$: falling prices → rising vol).

## Pricing via characteristic functions

The Heston model is affine in $(S, v)$, so the characteristic function of $\log S_T$ has a closed form:

$$\varphi(u) = \mathbb{E}^\mathbb{Q}[e^{iu\log S_T}] = e^{C(T,u) + D(T,u)v_0 + iu\log S_0}$$

where $C, D$ satisfy Riccati ODEs. Option prices follow by Fourier inversion.

## The volatility smile

Black-Scholes implies a flat implied-volatility surface. In practice, implied vol is:
- **Higher for OTM puts** (skew/smirk): investors pay for crash protection
- **Higher for short maturities at extreme strikes** (smile)

The Heston model reproduces the skew via correlation $\rho$ and the smile curvature via vol-of-vol $\xi$.
