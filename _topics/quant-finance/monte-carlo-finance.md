---
title: Monte Carlo Methods in Finance
field: quant-finance
description: Simulating asset paths to price exotic derivatives and compute risk measures. The workhorse of quantitative trading desks.
intro: >
  Monte Carlo simulation is indispensable in quantitative finance for pricing path-dependent
  derivatives, computing risk measures, and stress-testing portfolios. For exotic options
  with no closed form, it is often the only practical pricing method.
math_concepts:
  - monte-carlo-methods
  - stochastic-calculus
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Pricing by simulation

To price a derivative with payoff $H = g(S_{t_1},\ldots,S_{t_m})$:

1. Simulate $N$ paths of the asset under $\mathbb{Q}$
2. Compute $H^{(k)}$ for each path $k$
3. Estimate: $\hat{V}_0 = e^{-rT}\frac{1}{N}\sum_{k=1}^N H^{(k)}$

Standard error $\sim \sigma_H / \sqrt{N}$ — $10\times$ accuracy improvement requires $100\times$ more paths.

## Discretising GBM

The Euler-Maruyama scheme for $dS = \mu S\,dt + \sigma S\,dW$:

$$S_{t+\Delta t} = S_t \exp\!\left[\left(\mu - \tfrac{\sigma^2}{2}\right)\Delta t + \sigma\sqrt{\Delta t}\,Z\right], \quad Z\sim\mathcal{N}(0,1)$$

The log-Euler scheme is exact for GBM (no discretisation error).

## Variance reduction techniques

| Technique | Idea | Typical speed-up |
|---|---|---|
| **Antithetic variates** | Use $(-Z_i)$ paired with $Z_i$ | $2\times$ |
| **Control variates** | Subtract correlated known-price instrument | $5$–$50\times$ |
| **Importance sampling** | Sample more tail scenarios | High for rare events |
| **Quasi-Monte Carlo** | Replace random with low-discrepancy sequences (Sobol) | $10\times$+ |

## American options: Longstaff-Schwartz

American options allow early exercise — solved by **least-squares Monte Carlo**: regress continuation value on basis functions of the state at each time step, working backwards.
