---
title: "Structural Equation Modeling"
field: psychometrics
description: A framework combining a measurement model and a structural model to test hypothesized relationships among latent variables.
intro: >
  Structural Equation Modeling (SEM) unifies confirmatory factor analysis with
  path analysis. It simultaneously estimates relationships among latent variables
  (the structural model) and the links between latent variables and their
  observed indicators (the measurement model), all within a single likelihood
  framework.
math_concepts:
  - linear-algebra
  - optimization
  - probability-theory
  - eigenvalues
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Model Components

A standard SEM has two parts. The **measurement model** maps observed indicators $\mathbf{y}$ to latent variables $\boldsymbol{\eta}$:

$$\mathbf{y} = \boldsymbol{\Lambda}\boldsymbol{\eta} + \boldsymbol{\varepsilon}$$

The **structural model** specifies directional paths among the latent variables:

$$\boldsymbol{\eta} = \mathbf{B}\boldsymbol{\eta} + \boldsymbol{\Gamma}\boldsymbol{\xi} + \boldsymbol{\zeta}$$

where $\mathbf{B}$ contains endogenous-to-endogenous paths, $\boldsymbol{\Gamma}$ contains exogenous effects, and $\boldsymbol{\zeta}$ is the structural disturbance.

## Model Identification

A model is identified if every free parameter has a unique solution given $\boldsymbol{\Sigma}$. The necessary (but not sufficient) condition is $df = p^* - q \ge 0$, where $p^* = p(p+1)/2$ unique covariance elements and $q$ is the number of free parameters. Each latent variable requires a scale-setting constraint (fixed loading or fixed variance).

## Fit Indices

| Index | Formula / Benchmark |
|-------|---------------------|
| $\chi^2$ | $\chi^2 = (N-1)F_{\min}$; non-significant desirable |
| CFI | $\ge 0.95$ indicates good fit |
| RMSEA | $\le 0.06$ good; $\le 0.08$ acceptable |
| SRMR | $\le 0.08$ acceptable |

Estimation proceeds by minimizing the maximum likelihood discrepancy function:

$$F_{\text{ML}} = \log|\boldsymbol{\Sigma}(\boldsymbol{\theta})| + \text{tr}[\mathbf{S}\boldsymbol{\Sigma}^{-1}(\boldsymbol{\theta})] - \log|\mathbf{S}| - p$$

Modification indices indicate the expected drop in $\chi^2$ per freed parameter, guiding model respecification.
