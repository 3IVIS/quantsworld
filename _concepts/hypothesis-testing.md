---
title: Hypothesis Testing
slug: hypothesis-testing
equation: 'p = P(T \geq t_{\text{obs}} \mid H_0)'
intro: >
  Hypothesis testing provides a formal framework for deciding whether data support
  a claim. It is the backbone of clinical trials, scientific experiments, and policy
  evaluation — and connects to information theory, decision theory, and Bayesian inference.
related_concepts:
  - gaussian-distribution
  - bayes-theorem
  - optimization
difficulty: beginner
difficulty_level: 2
---

## Framework

1. State $H_0$ (null) and $H_1$ (alternative)
2. Choose a test statistic $T$ whose distribution is known under $H_0$
3. Compute $p = P(T \geq t_{\text{obs}} \mid H_0)$
4. Reject $H_0$ if $p < \alpha$ (significance level, typically 0.05)

## Type I and Type II errors

|  | $H_0$ true | $H_0$ false |
|---|---|---|
| **Reject $H_0$** | Type I error (rate $\alpha$) | Correct (power $1-\beta$) |
| **Fail to reject** | Correct | Type II error (rate $\beta$) |

Power $= 1 - \beta$ increases with sample size $n$, effect size, and $\alpha$.

## The $p$-value misconception

A $p$-value is **not** the probability that $H_0$ is true given the data. It is $P(\text{data} \mid H_0)$, not $P(H_0 \mid \text{data})$. Confusing the two is a common error. Bayesian testing avoids it by computing the posterior directly.
