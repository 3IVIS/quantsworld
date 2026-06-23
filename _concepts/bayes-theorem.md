---
title: Bayes' Theorem
slug: bayes-theorem
equation: 'P(A \mid B) = \dfrac{P(B \mid A)\,P(A)}{P(B)}'
intro: >
  Bayes' theorem describes how to update beliefs in the light of new evidence.
  It is the foundation of Bayesian statistics, machine learning inference,
  medical diagnosis, and any system that reasons under uncertainty.
related_concepts:
  - gaussian-distribution
  - hypothesis-testing
  - optimization
difficulty: beginner
difficulty_level: 2
---

## The continuous form

For probability density functions:

$$p(\theta \mid \mathbf{x}) = \frac{p(\mathbf{x} \mid \theta)\, p(\theta)}{p(\mathbf{x})} \propto p(\mathbf{x} \mid \theta)\, p(\theta)$$

- $p(\theta)$ — **prior:** beliefs before seeing data
- $p(\mathbf{x} \mid \theta)$ — **likelihood:** how probable the data is under $\theta$
- $p(\theta \mid \mathbf{x})$ — **posterior:** updated beliefs after seeing data

## Gaussian conjugate update

If $x \mid \theta \sim \mathcal{N}(\theta, \sigma^2)$ and $\theta \sim \mathcal{N}(\mu_0, \tau^2)$, the posterior is:

$$\theta \mid x \sim \mathcal{N}\!\left(\frac{\tau^2 x + \sigma^2 \mu_0}{\sigma^2 + \tau^2},\; \frac{\sigma^2 \tau^2}{\sigma^2 + \tau^2}\right)$$

The posterior mean is a **precision-weighted average** of the prior mean and the data.
