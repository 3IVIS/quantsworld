---
title: "Factor Analysis"
field: psychometrics
description: Dimensionality-reduction technique decomposing observed variables into latent common factors and unique error terms.
intro: >
  Exploratory Factor Analysis (EFA) models a $p$-vector of observed variables as
  a linear combination of $m$ latent common factors plus unique variance. The
  goal is to identify a parsimonious structure that explains the correlations
  among observed measures without a priori constraints on which items load which
  factors.
math_concepts:
  - linear-algebra
  - eigenvalues
  - probability-theory
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## The Factor Model

The fundamental equation is:

$$\mathbf{X} = \boldsymbol{\Lambda}\mathbf{F} + \boldsymbol{\varepsilon}$$

where $\mathbf{X}$ is $p \times 1$, $\boldsymbol{\Lambda}$ is the $p \times m$ matrix of factor loadings, $\mathbf{F} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$ are the latent factors, and $\boldsymbol{\varepsilon} \sim \mathcal{N}(\mathbf{0}, \boldsymbol{\Psi})$ is unique variance with diagonal $\boldsymbol{\Psi}$.

The implied covariance matrix is:

$$\boldsymbol{\Sigma} = \boldsymbol{\Lambda}\boldsymbol{\Lambda}^\top + \boldsymbol{\Psi}$$

The **communality** of variable $j$ is $h_j^2 = \sum_{k=1}^{m} \lambda_{jk}^2$, the proportion of variance explained by the common factors.

## Extraction and the Scree Plot

Principal axis factoring extracts factors by iteratively replacing diagonal elements of $\mathbf{R}$ with communality estimates. The number of factors $m$ is chosen by retaining eigenvalues $> 1$ (Kaiser criterion) or locating the elbow in a scree plot of ordered eigenvalues $\lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_p$.

## Rotation

An orthogonal rotation matrix $\mathbf{T}$ (where $\mathbf{T}\mathbf{T}^\top = \mathbf{I}$) yields $\boldsymbol{\Lambda}^* = \boldsymbol{\Lambda}\mathbf{T}$ without changing communalities. **Varimax** maximizes the variance of squared loadings within each factor, promoting simple structure. **Promax** allows correlated factors by raising Varimax loadings to a power, producing an oblique solution with factor correlation matrix $\boldsymbol{\Phi} \ne \mathbf{I}$.
