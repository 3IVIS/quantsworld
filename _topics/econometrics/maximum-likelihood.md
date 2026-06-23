---
title: Maximum Likelihood Estimation
field: econometrics
description: Estimating parameters by maximising the probability of observed data. Foundation of modern statistical inference.
intro: >
  Maximum Likelihood Estimation (MLE) finds the parameter values that make the observed
  data most probable. It unifies linear regression, logistic regression, survival analysis,
  and countless other models under a single principle.
math_concepts:
  - optimization
  - gaussian-distribution
  - hypothesis-testing
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The likelihood function

Given data $x_1, \ldots, x_n$ drawn i.i.d. from $f(x;\theta)$, the likelihood is:

$$\mathcal{L}(\theta) = \prod_{i=1}^n f(x_i; \theta)$$

Working in log-space is numerically stable and converts the product to a sum:

$$\ell(\theta) = \sum_{i=1}^n \log f(x_i; \theta)$$

The MLE is $\hat{\theta} = \arg\max_\theta\, \ell(\theta)$.

## OLS as MLE under Gaussian errors

If $y_i = x_i^\top \beta + \varepsilon_i$ with $\varepsilon_i \sim \mathcal{N}(0, \sigma^2)$, the log-likelihood is:

$$\ell(\beta, \sigma^2) = -\frac{n}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\|y - X\beta\|^2$$

Maximising over $\beta$ is identical to minimising $\|y - X\beta\|^2$ — exactly OLS. This is why Gaussian errors make MLE = OLS.

## Asymptotic properties

Under regularity conditions, the MLE is:
- **Consistent:** $\hat{\theta} \xrightarrow{p} \theta_0$
- **Asymptotically normal:** $\sqrt{n}(\hat{\theta} - \theta_0) \xrightarrow{d} \mathcal{N}(0, \mathcal{I}(\theta_0)^{-1})$
- **Asymptotically efficient:** achieves the Cramér–Rao lower bound

where $\mathcal{I}(\theta)$ is the Fisher information matrix.

## Hypothesis testing

Three equivalent large-sample tests flow directly from the MLE:

| Test | Statistic | Uses |
|---|---|---|
| **Wald** | $(\hat{\theta} - \theta_0)^\top \hat{\mathcal{I}}(\hat{\theta} - \theta_0)$ | Unconstrained MLE only |
| **Score (LM)** | $s(\theta_0)^\top \mathcal{I}^{-1} s(\theta_0)$ | Constrained MLE only |
| **Likelihood ratio** | $2[\ell(\hat{\theta}) - \ell(\theta_0)]$ | Both MLEs |
