---
title: "Quantitative Trait Loci"
field: quant-genetics
description: Statistical mapping of genomic regions that contribute to variation in quantitative traits.
intro: >
  Quantitative trait locus (QTL) mapping identifies chromosomal regions that harbour
  genetic variants affecting a measurable trait. Unlike GWAS which tests individual SNPs,
  QTL methods leverage linkage information from structured crosses or pedigrees, using
  interval mapping and LOD score statistics to localise causal regions.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - linear-algebra
  - monte-carlo-methods
difficulty: advanced
difficulty_level: 4
read_time: 8
---

## Interval Mapping and the LOD Score

Lander and Botstein (1989) introduced interval mapping, which evaluates QTL presence at
each position $\lambda$ along a chromosome using a likelihood ratio:

$$\text{LOD}(\lambda) = \log_{10}\!\left(\frac{L(\text{QTL at }\lambda)}{L(\text{no QTL})}\right)$$

Under the QTL model, phenotype $y_i$ given flanking marker genotypes has a mixture
distribution. A LOD $> 3$ (corresponding roughly to $p < 0.001$ genome-wide) is the
traditional threshold.

## Marker Regression at a Single Marker

The simplest form regresses phenotype on marker genotype class. For an $F_2$ intercross
with QTL genotypes $QQ$, $Qq$, $qq$:

| Genotype | Frequency | Mean |
|----------|-----------|------|
| $QQ$ | $\tfrac{1}{4}$ | $\mu + a$ |
| $Qq$ | $\tfrac{1}{2}$ | $\mu + d$ |
| $qq$ | $\tfrac{1}{4}$ | $\mu - a$ |

where $a$ is the additive effect and $d$ the dominance deviation. The $F$-test on the
regression recovers the marker–trait association.

## Composite Interval Mapping

Composite interval mapping (CIM) conditions on flanking markers to reduce residual variance
and control for linked QTL:

$$y_i = \mu + \beta^* x^*_i + \sum_{k \in \mathcal{C}} b_k m_{ik} + \varepsilon_i$$

where $x^*_i$ is the QTL genotype probability at position $\lambda$ (computed from flanking
markers via recombination fractions), and the cofactor markers $\mathcal{C}$ absorb variance
from elsewhere in the genome.

## Permutation Thresholds

Because the LOD profile is correlated across positions, analytical $p$-value thresholds are
conservative or anti-conservative. Churchill and Doerge (1994) proposed genome-wide
thresholds from permutation:

1. Permute phenotype–genotype labels (breaks QTL signal, preserves marker correlation).
2. Record maximum LOD across the genome for each permutation.
3. Use the 95th percentile of the empirical maximum-LOD distribution as the significance threshold.

Typically $B = 1000$ permutations suffice; this is the gold standard for single-QTL tests.
