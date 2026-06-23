---
title: Random Processes
slug: random-processes
equation: 'X_t \sim F_{t_1,\ldots,t_n}(x_1,\ldots,x_n)'
intro: >
  A random process (stochastic process) is a collection of random variables indexed by time or space.
  Stationarity, ergodicity, and autocorrelation are its key properties —
  the foundation of time series, signal processing, and financial modelling.
related_concepts:
  - probability-theory
  - markov-chains
  - stochastic-calculus
difficulty: intermediate
difficulty_level: 3
---

## Key classes

**Stationary processes:** statistics invariant under time shift — $F_{t_1+\tau,\ldots}(·) = F_{t_1,\ldots}(·)$.

**Wide-sense stationary (WSS):** $\mathbb{E}[X_t] = \mu$ and $\text{Cov}(X_t, X_{t+\tau}) = R(\tau)$ depend only on lag $\tau$.

**Ergodic:** time averages equal ensemble averages almost surely.

## Autocorrelation and power spectrum

For a WSS process: $R(\tau) = \mathbb{E}[X_t X_{t+\tau}]$.

By the **Wiener–Khinchin theorem**, the power spectral density is the Fourier transform of $R$:

$$S(\omega) = \int_{-\infty}^\infty R(\tau)\,e^{-i\omega\tau}\,d\tau$$

## White noise and filtered processes

White noise: $R(\tau) = \sigma^2\delta(\tau)$, $S(\omega) = \sigma^2$ (flat spectrum).

Passing white noise through an LTI filter $H(\omega)$ gives output PSD $S_Y(\omega) = |H(\omega)|^2 S_X(\omega)$ — the basis of ARMA spectral representations.
