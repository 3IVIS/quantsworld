---
title: Gaussian Distribution
slug: gaussian-distribution
equation: 'f(x) = \dfrac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)'
intro: >
  The Gaussian (normal) distribution is the most important probability distribution in science.
  It emerges naturally from the Central Limit Theorem and appears in virtually every quantitative field
  wherever noise, measurement error, or aggregated random effects are present.
related_concepts:
  - bayes-theorem
  - hypothesis-testing
  - linear-algebra
difficulty: beginner
difficulty_level: 2
---

## Properties

The distribution $\mathcal{N}(\mu, \sigma^2)$ has:

- **Mean:** $\mathbb{E}[X] = \mu$
- **Variance:** $\text{Var}(X) = \sigma^2$
- **Moment generating function:** $M_X(t) = \exp(\mu t + \tfrac{1}{2}\sigma^2 t^2)$
- **Entropy:** $H = \tfrac{1}{2}\ln(2\pi e \sigma^2)$ — maximum entropy for fixed mean and variance

## The Central Limit Theorem

Let $X_1, X_2, \ldots$ be i.i.d. with mean $\mu$ and variance $\sigma^2 < \infty$. Then:

$$\sqrt{n}\left(\frac{\bar{X}_n - \mu}{\sigma}\right) \xrightarrow{d} \mathcal{N}(0, 1)$$

This is why the Gaussian appears everywhere: most aggregate measurements are sums of many independent contributions.

## Multivariate Gaussian

In $d$ dimensions:

$$\mathbf{x} \sim \mathcal{N}(\boldsymbol{\mu}, \Sigma) \iff p(\mathbf{x}) = \frac{1}{(2\pi)^{d/2}|\Sigma|^{1/2}} \exp\!\left(-\tfrac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^\top \Sigma^{-1}(\mathbf{x}-\boldsymbol{\mu})\right)$$

Marginals and conditionals of a joint Gaussian are themselves Gaussian — making it the only distribution closed under linear transformations, conditioning, and marginalisation.
