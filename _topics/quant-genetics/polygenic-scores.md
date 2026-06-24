---
title: "Polygenic Scores"
field: quant-genetics
description: Aggregating genome-wide SNP effects into individual-level genetic prediction scores.
intro: >
  A polygenic score (PRS) summarises an individual's genetic liability for a trait by
  weighting their genotype at each SNP by an estimated effect size from a GWAS. PRS
  construction must handle linkage disequilibrium between SNPs, the precision of effect
  estimates, and the portability of scores across ancestry groups.
math_concepts:
  - linear-algebra
  - bayes-theorem
  - optimization
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Basic PRS Construction

Given GWAS summary statistics $\hat{\boldsymbol{\beta}}$ and an individual's genotype
vector $\mathbf{g} \in \{0,1,2\}^M$, the raw PRS is:

$$\text{PRS} = \sum_{i=1}^{M} \hat{\beta}_i\, g_i = \hat{\boldsymbol{\beta}}^\top \mathbf{g}$$

Because LD inflates the sum (correlated SNPs contribute redundant signal), raw summation
overestimates variance explained. Two families of solutions are standard:
**clumping + thresholding (C+T)** and **Bayesian re-weighting (LDpred)**.

## Clumping and Thresholding (C+T)

1. **Clump**: Starting from the most-significant SNP, assign all SNPs within distance $d$
   (e.g., 250 kb) with $r^2 > r^2_{\text{thresh}}$ (e.g., 0.1) to that index SNP and remove them.
2. **Threshold**: Retain only index SNPs with $p < p_T$ (optimised by cross-validation).

C+T is simple and robust but discards information from removed SNPs.

## LDpred2

LDpred2 places a spike-and-slab prior on effect sizes:

$$\beta_j \sim \pi\,\mathcal{N}(0,\,\sigma_\beta^2) + (1-\pi)\,\delta_0$$

and estimates the posterior mean $\mathbb{E}[\boldsymbol{\beta} \mid \hat{\boldsymbol{\beta}}, \mathbf{R}]$
using Gibbs sampling over the LD matrix $\mathbf{R}$, the heritability $h^2$, and the
polygenicity $\pi$. The LDpred2-auto variant jointly infers $h^2$ and $\pi$ from summary
statistics alone.

## Cross-Ancestry Portability

PRS built on European GWAS cohorts show systematically lower predictive accuracy in
non-European populations:

| Ancestry | Relative PRS $R^2$ (vs. European) |
|----------|----------------------------------|
| East Asian | 0.75 |
| South Asian | 0.65 |
| African | 0.35 |

Causes include differences in LD patterns, allele frequencies, and causal variant sets.
Multi-ancestry GWAS meta-analyses and ancestry-specific LD reference panels (e.g., SDPRX,
PRS-CSx) improve portability by jointly modelling effect sizes across populations.
