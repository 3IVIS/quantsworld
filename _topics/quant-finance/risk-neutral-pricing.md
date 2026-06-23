---
title: Risk-Neutral Pricing
field: quant-finance
description: The no-arbitrage framework for pricing derivatives. Any derivative price equals the discounted expectation under the risk-neutral measure.
intro: >
  Risk-neutral pricing is the theoretical foundation of modern derivatives pricing.
  By changing probability measure — from the real-world $\mathbb{P}$ to the risk-neutral $\mathbb{Q}$ —
  we price any derivative as a discounted expected payoff, regardless of investor risk preferences.
math_concepts:
  - stochastic-calculus
  - measure-theory
  - probability-theory
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## The fundamental theorem of asset pricing

**FTAP (Harrison & Pliska, 1981):** A market is **arbitrage-free** if and only if there exists an equivalent martingale measure $\mathbb{Q}$ (risk-neutral measure) such that discounted asset prices $S_t/B_t$ are $\mathbb{Q}$-martingales.

## Change of measure: the Radon-Nikodym derivative

Moving from $\mathbb{P}$ to $\mathbb{Q}$ via the **Girsanov theorem**: if $W_t^\mathbb{P}$ is a $\mathbb{P}$-Brownian motion, then:

$$W_t^\mathbb{Q} = W_t^\mathbb{P} + \int_0^t \theta_s\,ds$$

is a $\mathbb{Q}$-Brownian motion, where $\theta_t = (\mu - r)/\sigma$ is the **market price of risk**.

Under $\mathbb{Q}$, all assets grow at the risk-free rate $r$:

$$dS_t = r S_t\,dt + \sigma S_t\,dW_t^\mathbb{Q}$$

## The pricing formula

Any derivative with payoff $H_T$ at time $T$ is priced at:

$$V_t = e^{-r(T-t)}\mathbb{E}^\mathbb{Q}[H_T \mid \mathcal{F}_t]$$

**Black-Scholes as a special case:** for a European call $H_T = (S_T - K)^+$, this integral evaluates to the Black-Scholes formula.

## Incomplete markets

When the market has more risk sources than traded assets (e.g. stochastic volatility), the risk-neutral measure is not unique — there is a **range** of arbitrage-free prices. Additional assumptions or market instruments are needed to pin down a unique price.
