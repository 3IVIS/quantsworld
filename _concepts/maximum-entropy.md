---
title: Maximum Entropy Principle
slug: maximum-entropy
equation: 'p^* = \arg\max_{p} H(p) \;\text{s.t.}\; \mathbb{E}_p[f_i] = \mu_i'
intro: >
  The maximum entropy principle selects the least-informative distribution consistent
  with known constraints. It derives the exponential family and underpins statistical
  mechanics, Bayesian inference, natural language models, and feature-based ML classifiers.
related_concepts:
  - information-theory
  - probability-theory
  - optimization
difficulty: advanced
difficulty_level: 4
---

## The MaxEnt distribution

Given constraints $\mathbb{E}[f_i(X)] = \mu_i$, the max-entropy distribution is:

$$p^*(x) = \frac{1}{Z(\lambda)}\exp\!\left(\sum_i \lambda_i f_i(x)\right)$$

where $Z(\lambda) = \int \exp(\sum_i\lambda_i f_i)\,dx$ is the partition function and $\lambda_i$ are Lagrange multipliers.

## Connection to exponential families

Every exponential family distribution is a MaxEnt distribution for particular sufficient statistics $f_i$:

| Constraint | MaxEnt distribution |
|---|---|
| $\mathbb{E}[X] = \mu$ (non-negative) | Exponential |
| $\mathbb{E}[X]$, $\mathbb{E}[X^2]$ fixed | Gaussian |
| Support $\{1,\ldots,n\}$, no constraint | Uniform |

## Physical interpretation

In statistical mechanics, maximising entropy at fixed energy gives the Boltzmann distribution — the foundation of thermodynamics. The Lagrange multiplier $\lambda$ associated with energy is $-1/kT$.
