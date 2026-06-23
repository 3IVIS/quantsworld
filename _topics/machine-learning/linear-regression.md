---
title: Linear Regression
field: machine-learning
description: The simplest supervised learning model — mathematically identical to econometric OLS.
intro: >
  Linear regression fits a hyperplane to data by minimising a loss function.
  In ML the same mathematics as OLS appears under a different framing — with emphasis on
  generalisation, regularisation, and the bias-variance tradeoff rather than statistical inference.
math_concepts:
  - linear-algebra
  - gaussian-distribution
  - optimization
difficulty: beginner
difficulty_level: 2
read_time: 6
---

## The model

Predict $\hat{y} = \mathbf{w}^\top \mathbf{x} + b$ by minimising mean squared error:

$$\mathcal{L}(\mathbf{w}, b) = \frac{1}{n}\sum_{i=1}^n (y_i - \mathbf{w}^\top \mathbf{x}_i - b)^2$$

The closed-form solution is identical to OLS: $\hat{\mathbf{w}} = (X^\top X)^{-1} X^\top \mathbf{y}$.

## Regularisation

In high dimensions ($p \approx n$ or $p > n$), OLS overfits. Two regularisers solve this:

**Ridge (L2):** adds $\lambda\|\mathbf{w}\|_2^2$, solution $\hat{\mathbf{w}}_{ridge} = (X^\top X + \lambda I)^{-1} X^\top \mathbf{y}$

**Lasso (L1):** adds $\lambda\|\mathbf{w}\|_1$, produces sparse solutions via proximal gradient descent

## Bias-variance tradeoff

The expected test error decomposes as:

$$\mathbb{E}[(y - \hat{f}(x))^2] = \text{Bias}[\hat{f}]^2 + \text{Var}[\hat{f}] + \sigma^2$$

OLS has zero bias but high variance in high dimensions. Regularisation trades bias for variance reduction — this is why ridge regression often generalises better than OLS despite being "wrong."
