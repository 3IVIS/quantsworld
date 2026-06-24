---
title: "Comparative Genomics"
field: bioinformatics
description: Measuring evolutionary divergence between genomes through synteny, substitution rates, and neutrality tests.
intro: >
  Comparative genomics quantifies evolutionary relationships by aligning genomes
  across species and measuring rates of nucleotide and amino acid substitution.
  Key statistics such as dN/dS ratios distinguish neutral evolution from positive
  or purifying selection.
math_concepts:
  - probability-theory
  - markov-chains
  - hypothesis-testing
  - information-theory
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Nucleotide Substitution Models

Substitution along a phylogenetic branch is modelled as a continuous-time Markov chain on $\{A, C, G, T\}$. The GTR model specifies an instantaneous rate matrix $Q$ with off-diagonal entries $q_{ij} = \pi_j r_{ij}$, giving transition probabilities:

$$P(t) = e^{Qt}$$

Simpler nested models (JC69, HKY85) fix some $r_{ij}$ to be equal, reducing parameter count at the cost of biological realism.

## dN/dS (Ka/Ks) Ratio

The ratio of non-synonymous to synonymous substitution rates measures selective pressure on a coding gene:

| Ratio | Interpretation |
|---|---|
| $\omega < 1$ | Purifying (negative) selection |
| $\omega = 1$ | Neutral evolution |
| $\omega > 1$ | Positive (adaptive) selection |

$$\omega = \frac{d_N / d_S^{\,\text{expected}}}{d_S / d_S^{\,\text{expected}}} = \frac{d_N}{d_S}$$

$d_N$ and $d_S$ are estimated by counting synonymous and non-synonymous differences per site, corrected for multiple hits using the Jukes-Cantor formula.

## Neutrality Tests

The McDonald-Kreitman test compares the ratio of fixed to polymorphic sites at synonymous ($S$) and non-synonymous ($N$) classes:

$$\text{Neutrality Index} = \frac{P_N / P_S}{D_N / D_S}$$

Departure from $1$ detected via a $2\times2$ Fisher's exact test signals non-neutral evolution. Under neutrality, the ratio should equal $1$.

## Synteny and Whole-Genome Alignment

Synteny blocks — conserved gene order across species — are identified by chaining pairwise alignments. The scoring of a collinear chain of anchors $(x_i, y_i)$ uses a gap penalty $\gamma$:

$$\text{Score} = \sum_i s_i - \sum_k \gamma(\Delta x_k, \Delta y_k)$$

where $s_i$ is the anchor alignment score and $\gamma$ penalizes inversions and transpositions.
