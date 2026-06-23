---
title: Measure Theory
slug: measure-theory
equation: '\mu\!\left(\bigcup_{i=1}^\infty A_i\right) = \sum_{i=1}^\infty \mu(A_i)'
intro: >
  Measure theory provides the rigorous foundation for integration and probability.
  The Lebesgue integral extends Riemann integration to a much wider class of functions —
  underpinning modern probability, functional analysis, and ergodic theory.
related_concepts:
  - probability-theory
  - hilbert-spaces
  - random-processes
difficulty: advanced
difficulty_level: 5
---

## $\sigma$-algebras and measures

A **$\sigma$-algebra** $\mathcal{F}$ on $\Omega$ is a collection of subsets closed under countable unions and complements. A **measure** $\mu: \mathcal{F} \to [0,\infty]$ is $\sigma$-additive:

$$\mu\left(\bigcup_{i=1}^\infty A_i\right) = \sum_{i=1}^\infty \mu(A_i) \quad \text{for disjoint } A_i$$

A probability measure additionally satisfies $\mu(\Omega) = 1$.

## The Lebesgue integral

For a non-negative measurable function $f$:

$$\int f\,d\mu = \sup\left\{\int s\,d\mu : s \text{ simple}, 0 \leq s \leq f\right\}$$

Dominated convergence: if $|f_n| \leq g$ with $\int g\,d\mu < \infty$, then $\int f_n \to \int f$.

## Radon-Nikodym and change of measure

If $\nu \ll \mu$ (absolute continuity), there exists a density $f = d\nu/d\mu$ (Radon-Nikodym derivative) such that $\nu(A) = \int_A f\,d\mu$. In probability this is the likelihood ratio — central to change of measure in finance (risk-neutral pricing).
