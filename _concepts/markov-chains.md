---
title: Markov Chains
slug: markov-chains
equation: 'P(X_{n+1}=j \mid X_0,\ldots,X_n) = P(X_{n+1}=j \mid X_n)'
intro: >
  A Markov chain is a stochastic process where the future depends only on the present, not the past.
  This "memoryless" property makes them mathematically tractable and widely applicable — from
  finance to biology to machine learning and computational physics.
related_concepts:
  - linear-algebra
  - optimization
  - stochastic-calculus
difficulty: intermediate
difficulty_level: 3
---

## Transition matrix

For a finite state space $\{1,\ldots,n\}$, the chain is characterised by a **transition matrix** $P$ where $P_{ij} = P(X_{t+1}=j \mid X_t=i)$. Each row sums to 1 (stochastic matrix).

The $n$-step transition probabilities are given by $P^n$ — matrix powers.

## Stationary distribution

A distribution $\pi$ is stationary if $\pi = \pi P$, i.e., it is a left eigenvector of $P$ with eigenvalue 1. For irreducible, aperiodic chains, $\pi$ is unique and the chain converges to it:

$$P^n_{ij} \to \pi_j \text{ as } n\to\infty$$

## Cross-field connections

Markov chains connect: ML (hidden Markov models), finance (credit ratings, interest rate models), ecology (population dynamics), bioinformatics (sequence alignment), and physics (Monte Carlo simulation).
