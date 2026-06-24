---
title: Regularization
slug: regularization
equation: '\hat\beta = \arg\min \|y-X\beta\|^2 + \lambda\|\beta\|^2'
intro: >
  Regularization adds a penalty term to a loss function to discourage overfitting
  and improve generalization. It corresponds to placing a prior on model parameters
  in the Bayesian view, and navigates the bias-variance tradeoff by shrinking or
  selecting parameters according to the penalty structure.
related_concepts:
  - optimization
  - convex-optimization
  - bayes-theorem
  - linear-algebra
difficulty: intermediate
difficulty_level: 2
---

## Ridge and Lasso regression

Ridge regression (Tikhonov regularization) adds an $\ell_2$ penalty:

$$\hat{\beta}_{\text{ridge}} = \arg\min_\beta \|y - X\beta\|^2 + \lambda\|\beta\|^2$$

yielding the closed-form solution $\hat{\beta} = (X^T X + \lambda I)^{-1} X^T y$. Lasso regression replaces the $\ell_2$ norm with $\ell_1$:

$$\hat{\beta}_{\text{lasso}} = \arg\min_\beta \|y - X\beta\|^2 + \lambda\|\beta\|_1$$

The $\ell_1$ penalty promotes sparsity by driving many coefficients exactly to zero, performing implicit variable selection.

## Bias-variance tradeoff

Regularization increases bias while reducing variance. As $\lambda \to 0$, the estimator approaches OLS (low bias, high variance); as $\lambda \to \infty$, coefficients shrink toward zero (high bias, low variance). Cross-validation selects $\lambda$ to minimize expected test error. The elastic net combines $\ell_1$ and $\ell_2$ penalties, inheriting sparsity from Lasso and stability from Ridge.

## Applications

Regularization is ubiquitous in machine learning: weight decay in neural networks, dropout as implicit regularization, and $\ell_1$ penalization in compressed sensing for signal recovery from undersampled measurements.
