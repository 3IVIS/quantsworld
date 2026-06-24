---
title: "Sequence Alignment"
field: bioinformatics
description: Dynamic programming algorithms for aligning DNA, RNA, and protein sequences to find optimal matches.
intro: >
  Sequence alignment finds the best correspondence between two biological sequences by inserting gaps and matching characters.
  The Needleman-Wunsch algorithm solves global alignment exactly using dynamic programming, while Smith-Waterman finds
  the highest-scoring local subsequence match. Scoring matrices like BLOSUM encode empirical substitution frequencies.
math_concepts:
  - linear-programming
  - probability-theory
  - optimization
  - graph-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Dynamic Programming Recurrence

Given sequences $A = a_1 \ldots a_m$ and $B = b_1 \ldots b_n$, define $F(i,j)$ as the best alignment score up to position $(i,j)$. The Needleman-Wunsch global alignment recurrence is:

$$F(i,j) = \max \begin{cases} F(i-1,\,j-1) + s(a_i, b_j) \\ F(i-1,\,j) - d \\ F(i,\,j-1) - d \end{cases}$$

where $s(a_i, b_j)$ is the substitution score and $d$ is the linear gap penalty. Smith-Waterman adds a fourth option: $\max(\cdot, 0)$, allowing the alignment to restart for local matches.

## Affine Gap Penalties

Linear gap penalties underestimate the cost of long gaps. Affine gap penalties use open cost $g_o$ and extend cost $g_e$:

$$\text{gap of length } k = g_o + (k-1)\,g_e$$

This requires tracking three matrices — match, gap-in-$A$, gap-in-$B$ — increasing space to $O(mn)$ but remaining $O(mn)$ time.

## Substitution Scoring: BLOSUM

The BLOSUM62 matrix entry $s(a,b)$ is the log-odds score:

$$s(a,b) = \frac{1}{\lambda} \ln \frac{q_{ab}}{p_a p_b}$$

where $q_{ab}$ is the observed frequency of aligned pair $(a,b)$ in trusted alignments, and $p_a, p_b$ are background frequencies. Higher scores reflect evolutionary conservation.

| Pair | BLOSUM62 |
|------|----------|
| Trp–Trp | 11 |
| Lys–Arg | 2 |
| Ala–Glu | −1 |
| Leu–Trp | −2 |
