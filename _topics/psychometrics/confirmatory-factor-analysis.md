---
title: "Confirmatory Factor Analysis"
field: psychometrics
description: A theory-driven factor model in which loadings and factor correlations are constrained a priori and tested against data.
intro: >
  Confirmatory Factor Analysis (CFA) tests a researcher-specified factor
  structure rather than discovering it empirically. Fixed-zero constraints on
  cross-loadings encode theoretical assumptions, and overall model fit is
  evaluated with chi-squared tests and approximate fit indices, providing a
  formal hypothesis-testing framework for measurement models.
math_concepts:
  - linear-algebra
  - optimization
  - probability-theory
  - eigenvalues
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Fixed and Free Parameters

In CFA, each indicator $y_j$ loads on a pre-specified subset of factors. The implied covariance matrix is:

$$\boldsymbol{\Sigma}(\boldsymbol{\theta}) = \boldsymbol{\Lambda}\boldsymbol{\Phi}\boldsymbol{\Lambda}^\top + \boldsymbol{\Theta}$$

where $\boldsymbol{\Phi}$ is the factor correlation (or covariance) matrix and $\boldsymbol{\Theta} = \text{diag}(\psi_1, \ldots, \psi_p)$ contains unique variances. **Free parameters** are estimated; **fixed parameters** (usually 0 for cross-loadings) are held at their specified values.

## Identification

Each factor requires at least one scale-setting constraint: either fix one loading per factor to 1 (marker indicator) or fix each factor variance to 1. A sufficient condition for local identification is the **two-indicator rule** (each factor has $\ge 2$ indicators with no cross-loadings) combined with a positive-definite $\boldsymbol{\Phi}$.

## Model Fit and Modification

The chi-squared test statistic $\chi^2 = (N-1)F_{\min}$ has $df = p^* - q$ degrees of freedom. Because $\chi^2$ is sensitive to sample size, approximate indices are preferred:

| Index | Acceptable | Good |
|-------|-----------|------|
| CFI | $\ge 0.90$ | $\ge 0.95$ |
| RMSEA | $\le 0.08$ | $\le 0.06$ |
| SRMR | $\le 0.10$ | $\le 0.08$ |

**Modification indices** (MI) estimate the $\chi^2$ drop if a fixed parameter is freed. Freeing parameters post-hoc requires cross-validation to avoid capitalizing on chance.
