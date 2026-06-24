---
title: "Population Genetics"
field: quant-genetics
description: Evolutionary forces shaping allele frequencies: drift, mutation, selection, and migration.
intro: >
  Population genetics describes how allele frequencies change over time under the joint
  action of genetic drift, natural selection, mutation, and migration. The mathematical
  framework ranges from discrete-time Wright-Fisher models to continuous diffusion
  approximations and the coalescent, connecting genome-sequence data to demographic history.
math_concepts:
  - probability-theory
  - markov-chains
  - stochastic-calculus
  - random-processes
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The Wright-Fisher Model

In a diploid population of constant size $N$, the number of copies of allele $A$ in
generation $t+1$ follows a binomial draw:

$$X_{t+1} \mid X_t = k \;\sim\; \text{Binomial}\!\left(2N,\, \frac{k}{2N}\right)$$

Allele frequency $p_t = X_t/(2N)$ is a bounded martingale. Both 0 and 1 are absorbing
states; the probability of ultimate fixation starting at frequency $p_0$ is simply $p_0$.

## Genetic Drift and Effective Population Size

Variance in allele frequency change per generation under pure drift:

$$\text{Var}(\Delta p) = \frac{p(1-p)}{2N_e}$$

The **effective population size** $N_e$ absorbs deviations from the idealised WF model
(unequal sex ratios, variance in offspring number, population size fluctuations). For
fluctuating sizes across $g$ generations: $1/N_e = (1/g)\sum_{i=1}^g 1/N_i$ (harmonic mean).

## The Coalescent

Looking backward in time, any two gene copies coalesce (find a common ancestor) in a given
generation with probability $1/(2N_e)$. Waiting time to coalescence $T_2$ has a geometric
distribution; for large $N_e$ it is approximately:

$$T_2 \sim \text{Exponential}\!\left(\frac{1}{2N_e}\right) \quad \text{(in generations)}$$

Nucleotide diversity $\pi = 4N_e\mu$ where $\mu$ is the per-site mutation rate, linking
observable variation to demographic parameters.

## Tajima's D

Tajima's $D$ compares two estimators of $\theta = 4N_e\mu$:

$$D = \frac{\hat{\pi} - \hat{\theta}_W}{\sqrt{\text{Var}(\hat{\pi} - \hat{\theta}_W)}}$$

where $\hat{\pi}$ is the average pairwise difference and $\hat{\theta}_W = S/a_1$ (Watterson)
with $S$ segregating sites and $a_1 = \sum_{i=1}^{n-1} 1/i$.

| $D$ | Interpretation |
|-----|---------------|
| $D < 0$ | Excess rare variants — purifying selection or expansion |
| $D \approx 0$ | Neutral expectation |
| $D > 0$ | Excess intermediate variants — balancing selection or bottleneck |
