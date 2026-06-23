---
title: Instrumental Variables
field: econometrics
description: Causal inference when OLS is biased by endogeneity. Uses a third variable to isolate exogenous variation.
intro: >
  Instrumental Variables (IV) estimation recovers causal effects when ordinary OLS is biased
  because of endogeneity — situations where the regressor is correlated with the error term.
  An instrument provides exogenous variation in the treatment that is unrelated to the outcome
  except through the treatment itself.
math_concepts:
  - linear-algebra
  - probability
  - hypothesis-testing
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Why OLS fails under endogeneity

Consider $y = X\beta + \varepsilon$. OLS requires $\mathbb{E}[X^\top \varepsilon] = 0$. Endogeneity — omitted variable bias, simultaneity, or measurement error — violates this, making $\hat{\beta}_{OLS}$ inconsistent.

## The IV estimator

An instrument $Z$ must satisfy two conditions:

1. **Relevance:** $\text{Cov}(Z, X) \neq 0$ — the instrument is correlated with the endogenous regressor.
2. **Exclusion restriction:** $\text{Cov}(Z, \varepsilon) = 0$ — the instrument affects $y$ only through $X$.

The IV estimator (just-identified case):

$$\hat{\beta}_{IV} = (Z^\top X)^{-1} Z^\top y$$

## Two-Stage Least Squares (2SLS)

In practice, 2SLS is used for over-identified systems ($\dim Z > \dim X$):

**Stage 1:** Regress $X$ on $Z$: $\hat{X} = Z(Z^\top Z)^{-1} Z^\top X$

**Stage 2:** Regress $y$ on $\hat{X}$: $\hat{\beta}_{2SLS} = (\hat{X}^\top X)^{-1} \hat{X}^\top y$

This is numerically equivalent to the GMM estimator with moment conditions $\mathbb{E}[Z^\top \varepsilon] = 0$.

## Weak instruments

When the first-stage $F$-statistic is below 10–16 (rule of thumb), weak instrument bias becomes severe. Use **Anderson–Rubin confidence sets** for inference that is robust to weak instruments.
