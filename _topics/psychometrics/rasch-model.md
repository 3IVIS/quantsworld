---
title: "Rasch Model"
field: psychometrics
description: A one-parameter IRT model placing persons and items on a common logit scale via the log-odds of success.
intro: >
  The Rasch model is a one-parameter logistic model in which the log-odds of a
  correct response depends solely on the difference between person ability and
  item difficulty. Its elegant mathematical structure yields specific objectivity:
  person and item parameter estimates are separable, making comparisons
  independent of the particular sample or item set used.
math_concepts:
  - probability-theory
  - optimization
  - information-theory
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The Rasch Equation

For person $n$ with ability $\theta_n$ on item $i$ with difficulty $b_i$, the log-odds (logit) of success is:

$$\log\frac{P_{ni}}{1 - P_{ni}} = \theta_n - b_i$$

Solving for the probability:

$$P_{ni} = \frac{e^{\theta_n - b_i}}{1 + e^{\theta_n - b_i}}$$

When $\theta_n = b_i$, $P_{ni} = 0.5$. Both $\theta$ and $b$ are measured in logits on an unbounded scale, typically centred by setting $\bar{b} = 0$.

## Parameter Separation

A key property of the Rasch model is that the raw score $r_n = \sum_i u_{ni}$ is a **sufficient statistic** for $\theta_n$, and the item total $s_i = \sum_n u_{ni}$ is sufficient for $b_i$. This allows conditional maximum likelihood (CML) estimation of item difficulties free of person parameters.

## Fit Statistics

| Statistic | Formula | Expectation |
|-----------|---------|-------------|
| Outfit MSQ | $\sum_n z_{ni}^2 / N$ weighted by extreme persons | $\approx 1.0$ |
| Infit MSQ | Variance-weighted residuals | $\approx 1.0$ |

Values between 0.7 and 1.3 are generally acceptable. Outfit is sensitive to unexpected responses far from the item difficulty; infit is more sensitive to unexpected responses near the item difficulty.
