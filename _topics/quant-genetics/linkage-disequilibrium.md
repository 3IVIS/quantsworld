---
title: "Linkage Disequilibrium"
field: quant-genetics
description: Non-random allelic associations between loci and their decay with recombination.
intro: >
  Linkage disequilibrium (LD) is the non-random association of alleles at two or more loci
  in a population. It is fundamental to GWAS fine-mapping, haplotype analysis, and polygenic
  score construction. LD decays with recombination over generations, creating a characteristic
  block structure across the genome.
math_concepts:
  - probability-theory
  - information-theory
  - hypothesis-testing
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The $D$ Statistic

For two biallelic loci with alleles $A/a$ (frequencies $p_A, p_a$) and $B/b$
(frequencies $p_B, p_b$), the disequilibrium coefficient is:

$$D = p_{AB} - p_A p_B$$

where $p_{AB}$ is the observed haplotype frequency. Under linkage equilibrium $D = 0$.
$D$ ranges between $D_{\min}$ and $D_{\max}$, which depend on allele frequencies.

## Normalised Measures

Two standardised measures dominate the literature:

$$D' = \frac{D}{D_{\max}} \quad \text{if } D > 0, \qquad D' = \frac{D}{D_{\min}} \quad \text{if } D < 0$$

$$r^2 = \frac{D^2}{p_A\, p_a\, p_B\, p_b}$$

$|D'| = 1$ indicates no recombination has been observed between the haplotypes;
$r^2 = 1$ indicates complete allelic correlation (perfect proxies). $r^2$ is the more
useful metric for GWAS power because it directly determines the loss of power when using a
proxy SNP: effective sample size scales as $N \cdot r^2$.

## Decay with Recombination

LD decays geometrically each generation under random mating:

$$D_t = D_0\,(1 - c)^t$$

where $c$ is the recombination fraction between loci and $t$ is the number of generations.
At $c = 0.5$ (unlinked loci), LD halves each generation. In humans, substantial LD
typically extends 10–100 kb.

## Haplotype Blocks and LD Pruning

| Operation | Definition |
|-----------|-----------|
| Haplotype block | Genomic region with limited historical recombination and high internal $|D'|$ |
| LD pruning | Remove SNPs within a window until no pair exceeds an $r^2$ threshold (e.g., $r^2 > 0.1$) |
| LD clumping | Keep the most-significant SNP per locus; assign nearby SNPs at $r^2 > $ threshold to it |

LD-independent SNP sets from pruning are used for PCA, heritability estimation, and
relatedness calculation.
