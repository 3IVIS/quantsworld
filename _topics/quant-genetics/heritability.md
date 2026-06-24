---
title: "Heritability"
field: quant-genetics
description: Partitioning phenotypic variance into genetic and environmental components.
intro: >
  Heritability quantifies the proportion of phenotypic variance in a population that is
  attributable to genetic differences between individuals. Narrow-sense heritability
  ($h^2$) is the cornerstone of selective breeding and human complex-trait genetics,
  while its estimation has evolved from twin studies to genome-wide SNP-based methods.
math_concepts:
  - probability-theory
  - linear-algebra
  - gaussian-distribution
  - measure-theory
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Variance Components

Total phenotypic variance $V_P$ is decomposed as:

$$V_P = V_A + V_D + V_I + V_E$$

where $V_A$ is additive genetic variance, $V_D$ dominance variance, $V_I$ epistatic
(interaction) variance, and $V_E$ environmental variance. The two main heritability
measures are:

$$h^2 = \frac{V_A}{V_P} \quad \text{(narrow-sense)}, \qquad
H^2 = \frac{V_G}{V_P} = \frac{V_A + V_D + V_I}{V_P} \quad \text{(broad-sense)}$$

Only $h^2$ predicts response to selection; $H^2$ is relevant for clonal propagation.

## Parent–Offspring Regression

The simplest estimator regresses offspring phenotype on mid-parent value:

$$y_{\text{offspring}} = \alpha + h^2 \bar{y}_{\text{parents}} + e$$

The slope equals $h^2$ because the parent-offspring phenotypic covariance equals $V_A/2$
per parent, and $V_A$ for the mid-parent.

## GREML / REML Estimation

Genomic REML (GREML) fits the mixed model:

$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{g} + \boldsymbol{\varepsilon},
\quad \mathbf{g} \sim \mathcal{N}(\mathbf{0}, h^2 \mathbf{G}),
\quad \boldsymbol{\varepsilon} \sim \mathcal{N}(\mathbf{0}, (1-h^2)\mathbf{I})$$

where $\mathbf{G}$ is the GRM constructed from SNP data. REML maximises the restricted
log-likelihood, removing fixed-effect bias. SNP-based $h^2$ estimates the proportion of
variance tagged by common SNPs, typically lower than twin-based estimates ("missing
heritability").

## Common Estimates

| Trait | $h^2_{\text{SNP}}$ | $h^2_{\text{twin}}$ |
|-------|--------------------|---------------------|
| Height | 0.50 | 0.80 |
| BMI | 0.27 | 0.75 |
| Educational attainment | 0.11 | 0.40 |
| Schizophrenia | 0.23 | 0.80 |
