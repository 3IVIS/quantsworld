---
title: Linear Mixed Models
field: biostatistics
description: Regression with random effects for correlated and hierarchical data. Used throughout clinical research.
intro: >
  Linear mixed models (LMMs) extend OLS to handle correlated data — repeated measurements,
  clustered subjects, and multi-site studies. They partition variance into fixed effects
  (population-level) and random effects (subject- or group-specific).
math_concepts:
  - gaussian-distribution
  - linear-algebra
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The model

$$\mathbf{y} = X\boldsymbol{\beta} + Z\mathbf{b} + \boldsymbol{\varepsilon}$$

where:
- $X\boldsymbol{\beta}$ — fixed effects (population means)
- $Z\mathbf{b}$ — random effects, $\mathbf{b} \sim \mathcal{N}(\mathbf{0}, G)$
- $\boldsymbol{\varepsilon}$ — residuals, $\boldsymbol{\varepsilon} \sim \mathcal{N}(\mathbf{0}, R)$

The marginal distribution is $\mathbf{y} \sim \mathcal{N}(X\boldsymbol{\beta},\; ZGZ^\top + R)$.

## REML estimation

Restricted Maximum Likelihood (REML) estimates variance components with less bias than full ML by marginalising out fixed effects first. It maximises:

$$\ell_{REML}(G, R) = \log \int \mathcal{L}(\boldsymbol{\beta}, G, R;\, \mathbf{y})\, d\boldsymbol{\beta}$$

## Clinical trial applications

- **Repeated measures:** each patient measured at multiple time points — the correlation within patients is modelled by random intercepts and slopes.
- **Multi-site trials:** random site effects absorb between-centre variability.
- **Missing data:** LMMs are valid under Missing At Random (MAR) without imputation.
