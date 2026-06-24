---
title: "Genome-Wide Association Studies"
field: quant-genetics
description: Statistical methods for mapping SNP associations to complex traits across the genome.
intro: >
  A genome-wide association study (GWAS) tests hundreds of thousands to millions of
  single-nucleotide polymorphisms (SNPs) for association with a trait, using regression
  models that control for population structure. Robust methodology requires mixed-model
  correction, careful quality control, and principled multiple-testing thresholds.
math_concepts:
  - hypothesis-testing
  - linear-algebra
  - probability-theory
  - gaussian-distribution
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## SNP Regression Model

For each SNP with coded genotype $g \in \{0,1,2\}$ and phenotype vector $\mathbf{y}$,
the basic linear model is:

$$y_i = \mu + \beta g_i + \mathbf{x}_i^\top \boldsymbol{\gamma} + \varepsilon_i,
\quad \varepsilon_i \sim \mathcal{N}(0, \sigma^2)$$

where $\beta$ is the additive SNP effect, $\mathbf{x}_i$ contains covariates (age, sex,
principal components), and $\boldsymbol{\gamma}$ are their coefficients. The genome-wide
significance threshold is $p < 5 \times 10^{-8}$, correcting for approximately one million
independent tests.

## Mixed-Model Correction for Population Structure

Population stratification inflates test statistics. The linear mixed model (LMM) adds a
polygenic random effect:

$$\mathbf{y} = \mu + \mathbf{g}\beta + \mathbf{X}\boldsymbol{\gamma} + \mathbf{u} + \boldsymbol{\varepsilon}$$

$$\mathbf{u} \sim \mathcal{N}(\mathbf{0},\, \sigma_g^2 \mathbf{K}), \quad
\boldsymbol{\varepsilon} \sim \mathcal{N}(\mathbf{0},\, \sigma_e^2 \mathbf{I})$$

where $\mathbf{K}$ is the genomic relationship matrix (GRM). Software such as BOLT-LMM
and SAIGE implement efficient approximations for biobank-scale data.

## LD Score Regression

LD score regression disentangles genuine polygenicity from confounding. The expected
$\chi^2$ statistic for SNP $j$ is:

$$\mathbb{E}[\chi^2_j] = \frac{Nh^2}{M} \ell_j + Na + 1$$

where $\ell_j = \sum_k r^2_{jk}$ is the LD score, $h^2$ is SNP heritability, $M$ is the
number of SNPs, and $a$ captures confounding. The intercept $Na + 1$ reveals inflation
not due to polygenicity.

## Visualisation

| Plot | Purpose |
|------|---------|
| Manhattan plot | Genome-wide $-\log_{10}(p)$ by chromosomal position |
| QQ plot | Observed vs. expected $p$-values; slope (genomic $\lambda$) measures inflation |
| Regional LocusZoom | LD colouring around index SNP for fine-mapping |
