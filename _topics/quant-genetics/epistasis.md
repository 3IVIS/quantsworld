---
title: "Epistasis"
field: quant-genetics
description: Gene-gene interactions and their contribution to phenotypic variance and GWAS inflation.
intro: >
  Epistasis refers to the interaction between alleles at different loci such that the effect
  of one locus depends on the genotype at another. Distinguishing statistical epistasis
  (departure from additive models in a population) from biological epistasis (biochemical
  pathway interaction) is critical for correct interpretation of GWAS results and variance
  partitioning.
math_concepts:
  - linear-algebra
  - hypothesis-testing
  - probability-theory
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 8
---

## Variance Decomposition

Fisher's partition of genetic variance decomposes the genotypic value $G_{ij}$ at two loci
into orthogonal components:

$$G_{ij} = \mu + \alpha_i + \alpha_j + \delta_{ij} + (\alpha\alpha)_{ij} + (\alpha\delta)_{ij} + (\delta\delta)_{ij}$$

where $\alpha$ are additive effects, $\delta$ dominance deviations, and the interaction
terms constitute **epistatic variance** $V_I$:

$$V_G = V_A + V_D + V_{AA} + V_{AD} + V_{DD} + \cdots$$

In large outbred populations, $V_{AA}$ (additive-by-additive epistasis) dominates because
allele frequencies weight interaction terms differently.

## Statistical Epistasis in Linear Models

A two-SNP interaction test adds a product term:

$$y_i = \mu + \beta_1 g_{i1} + \beta_2 g_{i2} + \beta_{12}\,(g_{i1} \cdot g_{i2}) + \varepsilon_i$$

Significance of $\hat{\beta}_{12}$ indicates statistical epistasis. The multiple testing
burden is severe: with $M = 10^6$ SNPs, all pairwise tests number $\binom{M}{2} \approx 5
\times 10^{11}$, requiring thresholds of order $p < 10^{-13}$ for FWER control.

## Biological vs. Statistical Epistasis

| Aspect | Biological epistasis | Statistical epistasis |
|--------|--------------------|-----------------------|
| Definition | Physical interaction in a pathway | Non-additive term in a statistical model |
| Allele-frequency dependence | No | Yes |
| Detectable by GWAS interaction test | Not necessarily | By definition |
| Contributes to $V_I$ | Partly | Depends on model |

A biological interaction can appear additive at the population level if interacting alleles
are rare or at extreme frequencies.

## FWER Inflation and Power

Exhaustive epistasis searches inflate type-I error dramatically. Common strategies include:

- Restricting search to cis-pairs within LD blocks
- Testing known pathway gene pairs (biologically informed)
- Using LASSO-penalised regression to select interaction candidates
- Bayesian approaches (BSLMM) that shrink interaction effects genome-wide
