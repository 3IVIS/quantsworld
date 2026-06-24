---
title: "Hardy-Weinberg Equilibrium"
field: quant-genetics
description: Allele and genotype frequency equilibrium under idealized random mating.
intro: >
  Hardy-Weinberg equilibrium (HWE) describes the expected genotype frequencies in an
  infinitely large, randomly mating population with no selection, mutation, or migration.
  It provides the null baseline against which real population data are compared and
  underpins virtually all of population and quantitative genetics.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - gaussian-distribution
difficulty: beginner
difficulty_level: 1
read_time: 8
---

## The Equilibrium Equation

For a biallelic locus with alleles $A$ (frequency $p$) and $a$ (frequency $q = 1 - p$),
one generation of random mating produces genotype frequencies:

$$p^2 \;(AA) \quad+\quad 2pq \;(Aa) \quad+\quad q^2 \;(aa) \;=\; 1$$

These proportions are reached in exactly **one** generation and remain constant thereafter,
provided the five HWE assumptions hold: infinite population size, random mating, no
mutation, no migration, and no natural selection.

## Allele Frequency Estimation

From observed genotype counts $n_{AA}$, $n_{Aa}$, $n_{aa}$ (total $N$):

$$\hat{p} = \frac{2n_{AA} + n_{Aa}}{2N}, \qquad \hat{q} = 1 - \hat{p}$$

Expected counts under HWE are then $E_{AA} = N\hat{p}^2$, $E_{Aa} = 2N\hat{p}\hat{q}$,
$E_{aa} = N\hat{q}^2$.

## Chi-Squared Test for Departure

Departure from HWE is assessed with a goodness-of-fit statistic with 1 degree of freedom:

$$\chi^2 = \sum_{i} \frac{(O_i - E_i)^2}{E_i}$$

| Genotype | Observed | Expected |
|----------|----------|----------|
| $AA$ | $n_{AA}$ | $N\hat{p}^2$ |
| $Aa$ | $n_{Aa}$ | $2N\hat{p}\hat{q}$ |
| $aa$ | $n_{aa}$ | $N\hat{q}^2$ |

Significant deviation ($p < 0.05$) can signal genotyping error, population stratification,
or genuine selection — making HWE testing a standard quality-control step in GWAS.

## Why It Matters

HWE is the genetic analogue of a fair-coin baseline: deviations are informative. Inbreeding
increases homozygosity ($F > 0$), shifting genotype frequencies to
$p^2 + Fpq$, $2pq(1-F)$, $q^2 + Fpq$, where $F$ is the inbreeding coefficient.
