---
title: Black–Scholes Model
field: quant-finance
description: The foundational option pricing model. Derives a fair price from stochastic calculus and no-arbitrage.
intro: >
  The Black–Scholes model gives a closed-form formula for pricing European options.
  It assumes the underlying asset follows geometric Brownian motion and uses Itô's calculus
  and no-arbitrage arguments to derive a PDE whose solution is the option price.
math_concepts:
  - stochastic-calculus
  - optimization
  - gaussian-distribution
  - linear-algebra
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## The asset price model

The underlying asset follows Geometric Brownian Motion (GBM):

$$dS_t = \mu S_t\, dt + \sigma S_t\, dW_t$$

where $W_t$ is a Wiener process, $\mu$ is the drift, and $\sigma$ is the volatility.

## The Black–Scholes PDE

By forming a delta-hedged portfolio $\Pi = V - \Delta S$ and applying Itô's lemma, all Brownian terms cancel under the right hedge ratio $\Delta = \partial V/\partial S$. No-arbitrage then gives:

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + rS\frac{\partial V}{\partial S} - rV = 0$$

## The closed-form formula

For a European call with strike $K$ and expiry $T$:

$$C = S_0 \Phi(d_1) - K e^{-rT} \Phi(d_2)$$

$$d_1 = \frac{\ln(S_0/K) + (r + \tfrac{1}{2}\sigma^2)T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T}$$

where $\Phi$ is the standard normal CDF.

## The Greeks

| Greek | Definition | Meaning |
|---|---|---|
| **Delta** $\Delta$ | $\partial C/\partial S$ | Sensitivity to spot price |
| **Gamma** $\Gamma$ | $\partial^2 C/\partial S^2$ | Rate of change of delta |
| **Vega** $\mathcal{V}$ | $\partial C/\partial \sigma$ | Sensitivity to volatility |
| **Theta** $\Theta$ | $\partial C/\partial t$ | Time decay |
