---
title: "RNA-Seq Differential Expression"
field: bioinformatics
description: Statistical modelling of read counts to identify genes that change expression between conditions.
intro: >
  RNA-seq measures gene expression by counting sequencing reads mapped to each transcript.
  Because read counts are overdispersed relative to the Poisson model, tools like DESeq2 and edgeR
  fit a negative binomial distribution per gene and test for differential expression using
  shrinkage-stabilized log-fold changes and Wald or likelihood-ratio statistics.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - optimization
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## The Negative Binomial Count Model

Let $K_{ij}$ be the read count for gene $i$ in sample $j$. The negative binomial model is:

$$K_{ij} \sim \text{NB}(\mu_{ij},\, \alpha_i)$$

with mean $\mu_{ij} = s_j q_{ij}$ and variance $\text{Var}(K_{ij}) = \mu_{ij} + \alpha_i \mu_{ij}^2$. The dispersion parameter $\alpha_i > 0$ captures biological variability beyond Poisson noise. The log-linear model for the mean is:

$$\ln \mu_{ij} = \ln s_j + \mathbf{x}_j^\top \boldsymbol{\beta}_i$$

where $s_j$ is a size factor and $\mathbf{x}_j$ is a design vector encoding condition.

## Normalization: Size Factors

DESeq2 estimates size factors by the median-of-ratios method. For sample $j$:

$$\hat{s}_j = \text{median}_{i} \frac{K_{ij}}{\left(\prod_{j'} K_{ij'}\right)^{1/n}}$$

The geometric mean in the denominator serves as a pseudo-reference sample. TMM (edgeR) instead trims extreme log-fold changes and log-expression values before computing a weighted mean ratio.

## Dispersion Shrinkage and Testing

With few replicates, per-gene dispersion estimates are noisy. DESeq2 fits a trend $\hat{\alpha}_i = f(\bar{\mu}_i)$ and shrinks gene-level estimates toward the trend using an empirical Bayes log-normal prior:

$$\log \hat{\alpha}_i^{\text{shrunk}} \leftarrow \mathbb{E}\!\left[\log \alpha_i \mid K_{i\cdot}\right]$$

The Wald statistic for the log-fold change $\beta_i$ is:

$$W_i = \frac{\hat{\beta}_i}{\text{se}(\hat{\beta}_i)} \xrightarrow{H_0} \mathcal{N}(0,1)$$

Adjusted $p$-values use Benjamini-Hochberg FDR control. Genes with $|\hat{\beta}_i^{\text{LFC}}| > 1$ and $p_{\text{adj}} < 0.05$ are typically called differentially expressed.

| Tool | Count model | Dispersion | LFC shrinkage |
|------|-------------|------------|---------------|
| DESeq2 | NB | Empirical Bayes | apeglm / ashr |
| edgeR | NB | Quantile-adjusted | None (classic) |
| limma-voom | Normal (on log-CPM) | voom weights | eBayes |
