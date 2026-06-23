---
title: Gaussian Processes
field: machine-learning
description: A non-parametric Bayesian approach that places a prior directly over functions.
intro: >
  A Gaussian process is a distribution over functions. Any finite collection of function values
  follows a joint Gaussian distribution, fully specified by a mean function and a covariance kernel.
  GPs provide principled uncertainty estimates alongside predictions.
math_concepts:
  - gaussian-distribution
  - linear-algebra
  - bayes-theorem
difficulty: advanced
difficulty_level: 4
read_time: 11
widget:
  type: include
  file: normal-dist.html
---

## Definition

A GP is characterised by a mean function $m(x) = \mathbb{E}[f(x)]$ and a kernel (covariance function) $k(x, x') = \text{Cov}(f(x), f(x'))$:

$$f(x) \sim \mathcal{GP}(m(x),\, k(x, x'))$$

## GP regression (Kriging)

Given observations $\mathbf{y} = f(X) + \varepsilon$ with $\varepsilon \sim \mathcal{N}(0, \sigma_n^2 I)$, the posterior over function values at test points $X_*$ is:

$$f(X_*) \mid X, \mathbf{y} \sim \mathcal{N}(\bar{\mathbf{f}}_*, \text{cov}(\mathbf{f}_*))$$

$$\bar{\mathbf{f}}_* = K(X_*, X)\left[K(X, X) + \sigma_n^2 I\right]^{-1} \mathbf{y}$$

$$\text{cov}(\mathbf{f}_*) = K(X_*, X_*) - K(X_*, X)\left[K(X, X) + \sigma_n^2 I\right]^{-1} K(X, X_*)$$

## Popular kernels

| Kernel | $k(x, x')$ | Property |
|---|---|---|
| **Squared exponential** | $\exp(-\|x-x'\|^2/2l^2)$ | Infinitely differentiable |
| **Matérn 5/2** | polynomial × exp | Twice differentiable |
| **Rational quadratic** | $(1 + \|x-x'\|^2/2\alpha l^2)^{-\alpha}$ | Mix of length scales |

## Computational cost

Exact GP inference requires solving a linear system with the $n \times n$ kernel matrix — $O(n^3)$ in time and $O(n^2)$ in memory. Sparse approximations (inducing points) reduce this to $O(nm^2)$ for $m \ll n$.
