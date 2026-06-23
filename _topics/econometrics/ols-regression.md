---
title: OLS Regression
field: econometrics
description: Estimating linear relationships by minimising squared residuals. The workhorse of econometrics.
intro: >
  Ordinary Least Squares finds the linear function that best fits observed data by
  minimising the total squared distance between predictions and observations. It is the
  foundation of quantitative social science, econometrics, and much of machine learning.
math_concepts:
  - gaussian-distribution
  - linear-algebra
  - optimization
  - matrix-calculus
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The problem

Given data points $(x_i, y_i)$, we want to find coefficients $\beta$ such that $\hat{y} = X\beta$ is as close as possible to $y$. "Close" means minimising the sum of squared residuals — the $L^2$ loss.

**Objective function:**

$$\hat{L}(\beta) = \|y - X\beta\|^2 = \sum_{i=1}^n (y_i - x_i^\top \beta)^2$$

## The solution

Setting the gradient of the loss to zero gives the normal equations. Assuming $X^\top X$ is invertible, we get a closed-form solution:

$$\hat{\beta} = (X^\top X)^{-1} X^\top y$$

This is the unique minimum because the loss function is convex — the Hessian $2X^\top X$ is positive semi-definite. Under the Gauss–Markov assumptions, this estimator is **BLUE**: the Best Linear Unbiased Estimator.

{% include widgets/normal-dist.html %}

## Geometric interpretation

OLS projects the response vector $\mathbf{y}$ onto the column space of $\mathbf{X}$. The fitted values $\hat{\mathbf{y}} = X\hat{\beta}$ are the orthogonal projection, and the residual vector $\mathbf{e} = \mathbf{y} - \hat{\mathbf{y}}$ is perpendicular to every column of $X$.

**Orthogonality condition:**

$$X^\top (y - X\hat{\beta}) = 0 \quad \Leftrightarrow \quad X^\top e = 0$$

## Gauss–Markov assumptions

For $\hat{\beta}$ to be BLUE, the following must hold:

1. **Linearity:** the true relationship is $y = X\beta + \varepsilon$.
2. **Strict exogeneity:** $\mathbb{E}[\varepsilon | X] = 0$.
3. **No perfect multicollinearity:** $X$ has full column rank.
4. **Spherical errors:** $\text{Var}(\varepsilon | X) = \sigma^2 I_n$.

When assumption 4 fails — heteroskedasticity or autocorrelation — the estimator remains unbiased but is no longer efficient. Use heteroskedasticity-robust standard errors or GLS instead.
