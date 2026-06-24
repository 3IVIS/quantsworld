---
title: "Genome-Wide Association Studies"
field: bioinformatics
description: Statistical methods for linking genetic variants to traits or diseases across the entire genome.
intro: >
  A genome-wide association study (GWAS) tests millions of single nucleotide polymorphisms (SNPs) for association
  with a phenotype using linear or logistic regression. The massive number of simultaneous tests demands rigorous
  multiple testing correction, and linkage disequilibrium between nearby SNPs shapes the statistical landscape.
math_concepts:
  - hypothesis-testing
  - linear-algebra
  - probability-theory
  - gaussian-distribution
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Per-SNP Regression

For a quantitative trait $\mathbf{y} \in \mathbb{R}^n$ and SNP genotype vector $\mathbf{g} \in \{0,1,2\}^n$ (allele dosage), the additive model with covariates $\mathbf{X}$ is:

$$\mathbf{y} = \beta_0 + \beta_g \mathbf{g} + \mathbf{X}\boldsymbol{\gamma} + \boldsymbol{\varepsilon}, \qquad \boldsymbol{\varepsilon} \sim \mathcal{N}(\mathbf{0}, \sigma^2 \mathbf{I})$$

The OLS estimate $\hat{\beta}_g = (\tilde{\mathbf{G}}^\top \tilde{\mathbf{G}})^{-1}\tilde{\mathbf{G}}^\top \tilde{\mathbf{y}}$ (after projecting out covariates) has standard error $\text{se}(\hat{\beta}_g) = \sigma / \sqrt{n \cdot \text{Var}(\mathbf{g})}$. Binary traits use logistic regression with the same setup.

## Multiple Testing Correction

With $M \approx 10^6$ independent tests, controlling the family-wise error rate at level $\alpha = 0.05$ requires the Bonferroni threshold:

$$p_{\text{threshold}} = \frac{\alpha}{M} \approx 5 \times 10^{-8}$$

False discovery rate control via Benjamini-Hochberg ranks $p$-values and rejects $H_0^{(k)}$ for all $k \leq k^*$, where:

$$k^* = \max\left\{k : p_{(k)} \leq \frac{k\,\alpha}{M}\right\}$$

## Linkage Disequilibrium

Two SNPs at loci $A$ and $B$ are in linkage disequilibrium when haplotype frequencies deviate from independence. The standard measure is:

$$r^2 = \frac{D^2}{p_A(1-p_A)\,p_B(1-p_B)}, \qquad D = p_{AB} - p_A p_B$$

High $r^2$ between neighboring SNPs means a single causal variant can be detected through correlated proxies. LD blocks typically span 10–100 kb in European populations, so the effective number of independent tests is far below $M$.

| Correction | Controls | Stringency |
|------------|----------|------------|
| Bonferroni | FWER | Very high |
| Benjamini-Hochberg | FDR | Moderate |
| Permutation | FWER (empirical) | High |
