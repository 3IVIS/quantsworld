---
title: Interest Rate Models
field: quant-finance
description: Stochastic models for the yield curve. Used to price bonds, swaps, caps, and swaptions.
intro: >
  Interest rate models describe the stochastic evolution of the term structure of interest rates.
  Short-rate models (Vasicek, CIR), HJM, and LIBOR market models form the main families —
  each balancing tractability against realism for pricing and hedging fixed-income derivatives.
math_concepts:
  - stochastic-calculus
  - differential-equations
  - gaussian-distribution
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Vasicek model

The short rate $r_t$ follows an Ornstein-Uhlenbeck process:

$$dr_t = \kappa(\theta - r_t)\,dt + \sigma\,dW_t$$

- $\kappa$: mean-reversion speed
- $\theta$: long-run mean
- $\sigma$: volatility

Bond price: $P(t,T) = e^{A(t,T) - B(t,T)r_t}$ — affine in $r_t$.

Allows negative rates (a flaw). Analytical bond and option prices exist.

## Cox-Ingersoll-Ross (CIR)

$$dr_t = \kappa(\theta - r_t)\,dt + \sigma\sqrt{r_t}\,dW_t$$

The $\sqrt{r_t}$ diffusion term ensures $r_t \geq 0$ (Feller condition: $2\kappa\theta > \sigma^2$). Bond prices remain affine. The distribution of $r_t$ is non-central chi-squared.

## Heath-Jarrow-Morton (HJM) framework

Models the **entire forward rate curve** $f(t,T)$ directly:

$$df(t,T) = \alpha(t,T)\,dt + \sigma(t,T)^\top dW_t$$

No-arbitrage imposes the **HJM drift condition**: $\alpha(t,T) = \sigma(t,T)^\top\int_t^T\sigma(t,s)\,ds$.

The Vasicek and CIR models are special cases of HJM.
