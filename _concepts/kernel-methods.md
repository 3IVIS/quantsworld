---
title: Kernel Methods
slug: kernel-methods
equation: 'k(x,x\prime) = \langle \phi(x), \phi(x\prime) \rangle_\mathcal{H}'
intro: >
  Kernel methods implicitly map data into high-dimensional feature spaces via a
  kernel function, enabling linear algorithms to learn non-linear patterns.
  SVMs, kernel PCA, Gaussian processes, and Gaussian process regression all rely on this trick.
related_concepts:
  - linear-algebra
  - optimization
  - gaussian-distribution
difficulty: advanced
difficulty_level: 4
---

## The kernel trick

A function $k: \mathcal{X} \times \mathcal{X} \to \mathbb{R}$ is a valid kernel (Mercer kernel) if the Gram matrix $K_{ij} = k(x_i, x_j)$ is positive semi-definite for all finite datasets. By Mercer's theorem, this is equivalent to the existence of a feature map $\phi$ such that $k(x,x') = \langle\phi(x),\phi(x')\rangle$.

## Common kernels

| Kernel | $k(x,x')$ | Properties |
|---|---|---|
| Linear | $x^\top x'$ | Equivalent to linear model |
| Polynomial | $(x^\top x' + c)^d$ | Degree-$d$ features |
| RBF / Gaussian | $\exp(-\|x-x'\|^2/2l^2)$ | Infinite-dimensional, universal |
| Matérn | — | Controls smoothness |

## Representer theorem

For any regularised risk minimisation over a RKHS, the optimal solution has the form:

$$f^*(x) = \sum_{i=1}^n \alpha_i k(x_i, x)$$

This collapses an infinite-dimensional search to $n$ coefficients.
