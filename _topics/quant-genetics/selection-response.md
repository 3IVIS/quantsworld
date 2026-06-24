---
title: "Response to Selection"
field: quant-genetics
description: The Breeder's equation and quantitative prediction of genetic gain per generation.
intro: >
  The response to selection $R$ is the change in trait mean between the selected parents and
  their offspring. The Breeder's equation — the simplest and most powerful result in
  quantitative genetics — links response directly to heritability and the intensity of
  selection applied to the parental generation.
math_concepts:
  - probability-theory
  - gaussian-distribution
  - optimization
difficulty: intermediate
difficulty_level: 2
read_time: 8
---

## The Breeder's Equation

$$R = h^2 S$$

where $S$ is the **selection differential** (the mean phenotype of selected parents minus
the population mean) and $h^2$ is narrow-sense heritability. Equivalently, in terms of
selection intensity $i$ (the standardised selection differential):

$$R = i\, h^2\, \sigma_P = i\, h\, \sigma_A$$

For a truncation selection scheme where the top fraction $p$ of a normal distribution is
selected, $i = \phi(t)/p$ where $t$ is the truncation point and $\phi$ is the standard
normal density.

## Selection Differential and Intensity

| Proportion selected ($p$) | Selection intensity ($i$) |
|--------------------------|--------------------------|
| 0.01 | 2.665 |
| 0.05 | 2.063 |
| 0.10 | 1.755 |
| 0.25 | 1.271 |
| 0.50 | 0.798 |

## The Selection Index

When multiple traits are measured, the optimal linear index for selection on a single goal
trait uses index coefficients $\mathbf{b}$:

$$I = \mathbf{b}^\top \mathbf{x}, \quad \mathbf{b} = \mathbf{P}^{-1}\mathbf{G}\mathbf{a}$$

where $\mathbf{P}$ is the phenotypic variance-covariance matrix, $\mathbf{G}$ is the genetic
variance-covariance matrix, and $\mathbf{a}$ is a vector of economic weights. The index
maximises the correlation between $I$ and the aggregate genotype $H = \mathbf{a}^\top \mathbf{g}$.

## Long-Term Response and Limits

Sustained directional selection erodes additive genetic variance: $V_A$ declines as
favourable alleles approach fixation. The Robertson–Hill limit estimates the total response
from drift and selection in a finite population of size $N_e$:

$$R_{\infty} \approx 2\, N_e\, R_1$$

where $R_1$ is the single-generation response. In practice, mutation-selection balance and
frequency-dependent effects sustain long-term response beyond this prediction.
