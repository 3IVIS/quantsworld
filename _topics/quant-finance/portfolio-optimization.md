---
title: Portfolio Optimization
field: quant-finance
description: Finding the allocation of capital across assets that maximises return for a given risk level. Markowitz's mean-variance framework is the foundation.
intro: >
  Portfolio optimization finds the allocation of capital across assets that maximises
  expected return for a given risk level. Markowitz's 1952 mean-variance framework showed
  that diversification is free — you can reduce risk without sacrificing expected return.
math_concepts:
  - linear-algebra
  - convex-optimization
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Mean-variance optimization

Given $n$ assets with expected returns $\boldsymbol{\mu}$ and covariance matrix $\Sigma$, a portfolio $\mathbf{w}$ (with $\mathbf{1}^\top\mathbf{w} = 1$) has:
- Expected return: $\mu_p = \mathbf{w}^\top\boldsymbol{\mu}$
- Variance: $\sigma_p^2 = \mathbf{w}^\top\Sigma\mathbf{w}$

The **minimum variance frontier** solves:

$$\min_{\mathbf{w}} \mathbf{w}^\top\Sigma\mathbf{w} \quad \text{s.t.} \quad \mathbf{w}^\top\boldsymbol{\mu} = \mu^*, \quad \mathbf{1}^\top\mathbf{w} = 1$$

This is a quadratic program with a closed-form solution via Lagrange multipliers.

## The efficient frontier and Sharpe ratio

The **efficient frontier** is the upper half of the minimum-variance frontier — portfolios with maximum return for each risk level. The **tangency portfolio** (market portfolio under CAPM) maximises the Sharpe ratio:

$$SR = \frac{\mu_p - r_f}{\sigma_p}$$

## Practical challenges

Mean-variance optimization is notoriously **error-amplifying** — small errors in $\boldsymbol{\mu}$ lead to extreme, unstable allocations. Remedies:
- **Shrinkage estimators:** blend sample $\hat\Sigma$ toward a structured prior (Ledoit–Wolf)
- **Robust optimization:** optimise worst-case over an uncertainty set for $\boldsymbol{\mu}$
- **Risk parity:** weight inversely to risk contribution rather than optimising returns
- **Black-Litterman:** blend market equilibrium with investor views
