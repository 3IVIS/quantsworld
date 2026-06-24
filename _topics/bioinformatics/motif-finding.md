---
title: "Motif Finding"
field: bioinformatics
description: Statistical and probabilistic methods for discovering recurring sequence patterns in DNA and protein data.
intro: >
  Motif finding identifies over-represented patterns in biological sequences that
  correspond to functional elements such as transcription factor binding sites.
  Key algorithms include expectation-maximisation for position weight matrices and
  Gibbs sampling for stochastic motif discovery.
math_concepts:
  - probability-theory
  - information-theory
  - bayes-theorem
  - monte-carlo-methods
difficulty: advanced
difficulty_level: 4
read_time: 9
---

## Position Weight Matrix

A motif of width $W$ over alphabet $\Sigma = \{A,C,G,T\}$ is encoded as a position weight matrix (PWM) with entries:

$$M_{b,j} = \log_2 \frac{f_{b,j}}{p_b}, \quad b \in \Sigma,\; j = 1,\ldots,W$$

where $f_{b,j}$ is the observed frequency of base $b$ at position $j$ and $p_b$ is the background probability. The score of a sequence segment $s$ is $\sum_{j=1}^W M_{s_j, j}$.

## Information Content

The total information content of the PWM quantifies the specificity of the motif:

$$IC = \sum_{j=1}^{W} \sum_{b \in \Sigma} f_{b,j} \log_2 \frac{f_{b,j}}{p_b}$$

A perfectly specific position contributes $\log_2 4 = 2$ bits; a uniform position contributes $0$ bits.

## EM for Motif Discovery (MEME)

MEME treats motif positions as latent variables. Let $z_{ij} = 1$ if sequence $i$ contains the motif at position $j$. The EM updates are:

**E-step:**
$$\gamma_{ij} = \frac{\pi \prod_{k=1}^W M_{s_{i,j+k},k}}{\pi \prod_{k=1}^W M_{s_{i,j+k},k} + (1-\pi)\,p(s_i)}$$

**M-step:**
$$f_{b,k} = \frac{\sum_i \sum_j \gamma_{ij}\,\mathbf{1}[s_{i,j+k}=b]}{\sum_i \sum_j \gamma_{ij}}$$

## Gibbs Sampling

Gibbs sampling takes a Bayesian approach: cycle through sequences, remove one, sample a new motif position for it given the PWM estimated from the rest:

$$P(a_i = j \mid \mathbf{a}_{-i}, \mathbf{S}) \propto \prod_{k=1}^W \frac{f_{s_{i,j+k},k}^{(-i)} + \alpha_{s_{i,j+k}}}{\sum_b (f_{b,k}^{(-i)} + \alpha_b)}$$

where $\alpha_b$ are Dirichlet pseudocounts. The chain mixes over motif starts, yielding a posterior distribution over PWMs.
