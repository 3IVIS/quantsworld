---
title: Copulas
field: quant-finance
description: Functions that model the dependence structure between random variables independently of their marginal distributions.
intro: >
  Copulas separate the dependence structure of a joint distribution from its marginals.
  In finance, they model correlated defaults (CDO pricing), tail dependence between assets,
  and co-movement in stress scenarios — where correlation alone is an inadequate summary.
math_concepts:
  - probability-theory
  - gaussian-distribution
  - linear-algebra
difficulty: advanced
difficulty_level: 4
read_time: 9
---

## Sklar's theorem

For any joint CDF $F(x_1,\ldots,x_n)$ with marginals $F_1,\ldots,F_n$, there exists a **copula** $C: [0,1]^n \to [0,1]$ such that:

$$F(x_1,\ldots,x_n) = C(F_1(x_1),\ldots,F_n(x_n))$$

Conversely, any copula combined with any marginals gives a valid joint distribution. The copula is unique if all marginals are continuous.

## Common copulas

**Gaussian copula:** $C(u_1,\ldots,u_n) = \Phi_R(\Phi^{-1}(u_1),\ldots,\Phi^{-1}(u_n))$ where $\Phi_R$ is the multivariate normal CDF with correlation matrix $R$.

**Student-$t$ copula:** heavier tails and stronger tail dependence than Gaussian.

**Clayton copula:** strong lower-tail dependence — assets co-crash but don't co-boom.

**Gumbel copula:** strong upper-tail dependence.

## Tail dependence

The **upper tail dependence coefficient**:

$$\lambda_U = \lim_{u\to1^-} P(U_2 > u \mid U_1 > u)$$

Gaussian copula: $\lambda_U = 0$ (tail independence) regardless of $\rho$ — a dangerous feature for modelling joint crashes. The $t$-copula has $\lambda_U > 0$.

The 2008 crisis exposed over-reliance on the Gaussian copula for CDO tranching, which drastically understated joint default probabilities.
