---
title: Monte Carlo Methods
slug: monte-carlo-methods
equation: '\hat\mu = \frac{1}{N}\sum_{i=1}^N f(X_i), \quad X_i \sim p'
intro: >
  Monte Carlo methods use random sampling to compute numerical results —
  integrals, expectations, rare event probabilities, and optimisation.
  They are indispensable in finance, physics, chemistry, and ML where
  exact computation is intractable.
related_concepts:
  - probability-theory
  - markov-chains
  - optimization
difficulty: intermediate
difficulty_level: 3
---

## Basic Monte Carlo integration

To estimate $\mu = \int f(x)p(x)\,dx$, draw $X_1,\ldots,X_N \sim p$ and average:

$$\hat\mu = \frac{1}{N}\sum_{i=1}^N f(X_i) \xrightarrow{a.s.} \mu$$

Error falls as $O(1/\sqrt{N})$ regardless of dimension — Monte Carlo's key advantage over quadrature in high dimensions.

## Markov Chain Monte Carlo (MCMC)

When $p$ is known only up to a normalising constant (Bayesian posterior), use MCMC:

**Metropolis–Hastings:** propose $x' \sim q(x'|x)$, accept with probability $\min\!\left(1, \frac{p(x')q(x|x')}{p(x)q(x'|x)}\right)$.

The chain converges to $p$ under mild conditions.

## Variance reduction

- **Importance sampling:** draw from $q$, reweight: $\hat\mu = \frac{1}{N}\sum \frac{f(X_i)p(X_i)}{q(X_i)}$
- **Control variates:** subtract a correlated known-mean quantity
- **Antithetic variates:** use $(U_i, 1-U_i)$ pairs for uniform samples
