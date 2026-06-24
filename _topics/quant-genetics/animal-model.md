---
title: "The Animal Model"
field: quant-genetics
description: BLUP breeding value estimation using pedigree relationships and mixed model equations.
intro: >
  The animal model is a linear mixed model that simultaneously estimates fixed environmental
  effects and predicts random breeding values for every individual in a pedigree. It is the
  standard tool in livestock and plant breeding programs and increasingly used in evolutionary
  quantitative genetics to dissect genetic from environmental sources of variation.
math_concepts:
  - linear-algebra
  - matrix-calculus
  - eigenvalues
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 8
---

## Model Specification

$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{a} + \boldsymbol{\varepsilon}$$

- $\mathbf{y}$: $n \times 1$ vector of phenotypic observations  
- $\boldsymbol{\beta}$: fixed effects (contemporary group, sex, age)  
- $\mathbf{a}$: breeding values, $\mathbf{a} \sim \mathcal{N}(\mathbf{0},\, \mathbf{A}\sigma_a^2)$  
- $\boldsymbol{\varepsilon} \sim \mathcal{N}(\mathbf{0},\, \mathbf{I}\sigma_e^2)$

$\mathbf{A}$ is the **numerator relationship matrix** (NRM), where $A_{ij} = 2\Theta_{ij}$
and $\Theta_{ij}$ is the coefficient of kinship between animals $i$ and $j$.

## Henderson's Mixed Model Equations

The joint system that simultaneously yields GLS estimates of $\boldsymbol{\beta}$ and BLUP
of $\mathbf{a}$ is:

$$\begin{bmatrix} \mathbf{X}^\top\mathbf{X} & \mathbf{X}^\top\mathbf{Z} \\ \mathbf{Z}^\top\mathbf{X} & \mathbf{Z}^\top\mathbf{Z} + \mathbf{A}^{-1}\lambda \end{bmatrix} \begin{bmatrix} \hat{\boldsymbol{\beta}} \\ \hat{\mathbf{a}} \end{bmatrix} = \begin{bmatrix} \mathbf{X}^\top\mathbf{y} \\ \mathbf{Z}^\top\mathbf{y} \end{bmatrix}$$

where $\lambda = \sigma_e^2 / \sigma_a^2 = (1 - h^2)/h^2$. BLUP solutions for $\mathbf{a}$
maximise accuracy $r_{a,\hat{a}}$ under the assumed variance structure.

## Constructing $\mathbf{A}$ and $\mathbf{A}^{-1}$

$\mathbf{A}$ is built recursively from the pedigree. Henderson (1976) showed that
$\mathbf{A}^{-1}$ can be constructed directly without inverting $\mathbf{A}$, making
the approach feasible for millions of animals. With genomic data, $\mathbf{A}$ is
replaced by the GRM $\mathbf{G}$ (the ssGBLUP or $\mathbf{H}$-matrix approach blends both).

## Accuracy of Breeding Values

The prediction error variance (PEV) of $\hat{\mathbf{a}}$ is:

$$\text{PEV} = \text{Var}(\mathbf{a} - \hat{\mathbf{a}}) = \mathbf{C}^{aa}\sigma_e^2$$

where $\mathbf{C}^{aa}$ is the lower-right block of the inverse of the coefficient matrix.
Accuracy is $r = \sqrt{1 - \text{PEV}/\sigma_a^2}$ and drives genetic gain in breeding
programs.
