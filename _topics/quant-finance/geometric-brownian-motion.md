---
title: Geometric Brownian Motion
field: quant-finance
description: The stochastic process driving the Black-Scholes model. Ensures prices stay positive and returns are log-normally distributed.
intro: >
  Geometric Brownian Motion (GBM) is the standard model for asset price dynamics in continuous time.
  It captures two empirical regularities: prices cannot go negative, and log-returns are approximately
  normally distributed over short horizons.
math_concepts:
  - stochastic-calculus
  - gaussian-distribution
  - differential-equations
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The SDE

A GBM satisfies the stochastic differential equation:

$$dS_t = \mu S_t\,dt + \sigma S_t\,dW_t$$

where $\mu$ is the drift (expected return), $\sigma$ is volatility, and $W_t$ is a standard Wiener process.

## Solving via Itô's lemma

Apply Itô's lemma to $X_t = \log S_t$. Since $f(S) = \log S$, $f' = 1/S$, $f'' = -1/S^2$:

$$dX_t = \left(\mu - \frac{\sigma^2}{2}\right)dt + \sigma\,dW_t$$

This is an arithmetic Brownian motion. Integrating:

$$S_t = S_0\exp\!\left[\left(\mu - \frac{\sigma^2}{2}\right)t + \sigma W_t\right]$$

The $-\sigma^2/2$ **Itô correction** is crucial — it accounts for the convexity of the exponential.

## Distribution of returns

Log-returns over horizon $T$:

$$\log\frac{S_T}{S_0} \sim \mathcal{N}\!\left(\left(\mu - \frac{\sigma^2}{2}\right)T,\; \sigma^2 T\right)$$

So $S_T$ is **log-normally distributed**. The expected price $\mathbb{E}[S_T] = S_0 e^{\mu T}$ grows at the drift rate, not the median $S_0 e^{(\mu-\sigma^2/2)T}$.

## Limitations

GBM assumes constant volatility and normally distributed log-returns. Empirical asset returns exhibit:
- **Fat tails:** extreme moves occur far more often than the normal predicts
- **Volatility clustering:** periods of high volatility tend to persist
- **Leverage effect:** volatility rises when prices fall

These motivate extensions: stochastic volatility models (Heston), jump-diffusion (Merton), and rough volatility.
