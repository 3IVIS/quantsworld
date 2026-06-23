---
title: Probability Theory
slug: probability-theory
equation: 'P(A \cup B) = P(A) + P(B) - P(A \cap B)'
intro: >
  Probability theory provides the mathematical foundation for reasoning under uncertainty.
  Measure-theoretic probability unifies discrete and continuous random variables and
  underpins statistics, ML, finance, and every quantitative field.
related_concepts:
  - gaussian-distribution
  - bayes-theorem
  - measure-theory
  - random-processes
difficulty: beginner
difficulty_level: 2
---

## Kolmogorov axioms

A probability space $(\Omega, \mathcal{F}, P)$ consists of a sample space $\Omega$, a $\sigma$-algebra $\mathcal{F}$, and a measure $P$ satisfying:

1. $P(A) \geq 0$ for all $A \in \mathcal{F}$
2. $P(\Omega) = 1$
3. $P(\bigcup_{i=1}^\infty A_i) = \sum_{i=1}^\infty P(A_i)$ for disjoint events

## Key distributions

| Distribution | PMF/PDF | Mean | Variance |
|---|---|---|---|
| Bernoulli$(p)$ | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Poisson$(\lambda)$ | $\lambda^k e^{-\lambda}/k!$ | $\lambda$ | $\lambda$ |
| Exponential$(\lambda)$ | $\lambda e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ |
| Gaussian$(\mu,\sigma^2)$ | see gaussian-distribution | $\mu$ | $\sigma^2$ |

## Expectation and variance

$$\mathbb{E}[X] = \int x\, dP(x), \qquad \text{Var}(X) = \mathbb{E}[X^2] - \mathbb{E}[X]^2$$

The law of total expectation: $\mathbb{E}[X] = \mathbb{E}[\mathbb{E}[X \mid Y]]$.
