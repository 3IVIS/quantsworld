---
title: "Classical Test Theory"
field: psychometrics
description: The foundational framework decomposing an observed score into a true score and random measurement error.
intro: >
  Classical Test Theory (CTT) provides the oldest formal basis for psychological
  measurement. It decomposes every observed score into an unobservable true
  score and random error, then derives practical formulas for reliability and
  the standard error of measurement that require only summary statistics from a
  single test administration.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - gaussian-distribution
difficulty: beginner
difficulty_level: 2
read_time: 8
---

## The True Score Model

Every observed score $X$ is modeled as:

$$X = T + E$$

where $T$ is the true score (expected value over hypothetical repeated testings) and $E$ is random error. Three fundamental assumptions follow: $\mathbb{E}[E] = 0$, errors are uncorrelated with true scores ($\rho_{TE} = 0$), and errors on parallel forms are uncorrelated.

The variance decomposition is then:

$$\sigma^2_X = \sigma^2_T + \sigma^2_E$$

## Reliability

Reliability $\rho_{XX'}$ is the ratio of true-score variance to observed-score variance:

$$\rho_{XX'} = \frac{\sigma^2_T}{\sigma^2_X} = 1 - \frac{\sigma^2_E}{\sigma^2_X}$$

**Cronbach's $\alpha$** estimates internal-consistency reliability from a single administration of $k$ items:

$$\alpha = \frac{k}{k-1}\left(1 - \frac{\sum_{i=1}^k \sigma^2_i}{\sigma^2_X}\right)$$

Values $\ge 0.70$ are conventionally acceptable for research purposes.

## Standard Error of Measurement

The SEM quantifies the spread of observed scores around an individual's true score:

$$\text{SEM} = \sigma_X\sqrt{1 - \rho_{XX'}}$$

A 95% confidence interval for $T$ given $X$ is approximately $X \pm 1.96 \cdot \text{SEM}$. Note that SEM is constant across the score range—a key limitation compared to IRT, where measurement precision varies with ability level.
