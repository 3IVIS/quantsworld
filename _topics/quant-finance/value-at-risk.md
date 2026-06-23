---
title: Value at Risk
field: quant-finance
description: The loss level not exceeded with a given probability over a given horizon. The industry-standard risk measure for regulatory capital.
intro: >
  Value at Risk (VaR) summarises portfolio risk as a single number: the loss level
  that will not be exceeded over a given horizon with a given confidence level.
  Despite its ubiquity in regulation, VaR has important limitations that motivate
  Expected Shortfall (CVaR) as a superior measure.
math_concepts:
  - probability-theory
  - gaussian-distribution
  - monte-carlo-methods
difficulty: intermediate
difficulty_level: 3
read_time: 7
---

## Definition

$$\text{VaR}_\alpha(L) = \inf\{l : P(L > l) \leq 1-\alpha\} = F_L^{-1}(\alpha)$$

The $\alpha = 99\%$ VaR is the 99th percentile of the loss distribution — losses exceed this level on 1% of days.

## Calculation methods

**Parametric (variance-covariance):** assume losses are normally distributed:

$$\text{VaR}_\alpha = \mu_L + z_\alpha\,\sigma_L$$

Fast but misses fat tails. For a portfolio: $\sigma_L^2 = \mathbf{w}^\top\Sigma\mathbf{w}$ (in return space).

**Historical simulation:** sort the last $T$ daily P&L observations; the $\alpha$-VaR is the $(1-\alpha)T$-th worst loss. Non-parametric, captures fat tails, but limited by history.

**Monte Carlo:** simulate thousands of scenarios; compute the empirical quantile. Flexible but computationally expensive.

## Limitations and Expected Shortfall

VaR fails the **subadditivity** axiom: $\text{VaR}(A+B) > \text{VaR}(A) + \text{VaR}(B)$ is possible — diversification can appear to increase risk.

**Expected Shortfall** (CVaR) at level $\alpha$:

$$\text{ES}_\alpha = \mathbb{E}[L \mid L > \text{VaR}_\alpha]$$

ES is subadditive and coherent. The Basel III framework replaced VaR with ES at $\alpha = 97.5\%$ for trading book capital requirements.
