---
title: "Latent Class Analysis"
field: psychometrics
description: A model-based clustering technique that identifies unobserved subgroups from patterns of categorical observed indicators.
intro: >
  Latent Class Analysis (LCA) assumes that a sample is composed of a finite
  number of unobserved subpopulations (latent classes). Within each class,
  observed categorical indicators are mutually independent — the local
  independence assumption — so all associations among indicators are explained
  by class membership alone.
math_concepts:
  - probability-theory
  - information-theory
  - optimization
  - numerical-methods
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Model Specification

For $K$ latent classes and $J$ binary indicators, the marginal probability of response pattern $\mathbf{y} = (y_1, \ldots, y_J)$ is:

$$P(\mathbf{y}) = \sum_{k=1}^{K} \pi_k \prod_{j=1}^{J} \rho_{jk}^{y_j}(1 - \rho_{jk})^{1 - y_j}$$

where $\pi_k$ is the class prevalence ($\sum_k \pi_k = 1$) and $\rho_{jk}$ is the conditional probability of a positive response on item $j$ given class $k$.

## EM Algorithm

Parameters are estimated by Expectation-Maximization:

**E-step** — compute posterior class probabilities for each person $n$:

$$\hat{P}(k \mid \mathbf{y}_n) = \frac{\pi_k \prod_j \rho_{jk}^{y_{nj}}(1-\rho_{jk})^{1-y_{nj}}}{\sum_{k'} \pi_{k'} \prod_j \rho_{jk'}^{y_{nj}}(1-\rho_{jk'})^{1-y_{nj}}}$$

**M-step** — update $\pi_k = N^{-1}\sum_n \hat{P}(k \mid \mathbf{y}_n)$ and $\rho_{jk} = \sum_n \hat{P}(k \mid \mathbf{y}_n)y_{nj} / \sum_n \hat{P}(k \mid \mathbf{y}_n)$.

## Model Selection

The number of classes $K$ is selected using information criteria:

| Criterion | Formula |
|-----------|---------|
| BIC | $-2\ell + q\ln N$ |
| AIC | $-2\ell + 2q$ |
| Entropy $R^2$ | $1 - H(\hat{P})/\ln N$ |

BIC is preferred for class enumeration. **Entropy** $R^2$ near 1 indicates clean separation among posterior class assignments. Multiple random starts are required to avoid local maxima in the log-likelihood.
