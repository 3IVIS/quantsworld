---
title: "Credibility Theory"
field: actuarial-science
description: A Bayesian framework for blending an insured's own loss experience with population-level data to produce more accurate premium estimates.
intro: >
  Credibility theory provides actuaries with a principled way to weight individual policyholder experience against prior collective data. When a single risk unit has limited history, its own observed losses are statistically noisy; when the history is long, the data become highly informative. The Bühlmann model—a linear approximation to full Bayesian updating—delivers a computationally tractable credibility factor that optimally blends the two sources of information. Extensions to the Bühlmann-Straub model handle varying exposure weights, making credibility the workhorse of commercial lines ratemaking.
math_concepts:
  - bayes-theorem
  - probability-theory
  - hypothesis-testing
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Limited Fluctuation Credibility

**Limited fluctuation credibility** (also called classical or American credibility) assigns **full credibility** to an insured's observed data when the observed claim count $n$ is large enough that the estimated pure premium lies within $\pm k\%$ of the true value with probability $p$.

If claims are Poisson-distributed, the full credibility standard for claim **frequency** is:

$$
n \ge n_0 = \left(\frac{z_{(1+p)/2}}{k}\right)^2
$$

For $p = 90\%$, $k = 5\%$: $z_{0.95} = 1.645$, so $n_0 = (1.645/0.05)^2 = 1082$.

When $n < n_0$, **partial credibility** uses:

$$
Z = \sqrt{n / n_0}, \quad Z \in [0, 1]
$$

The **credibility estimate** is a blend of observed mean $\bar{X}$ and prior mean $\mu_0$:

$$
\hat{\mu} = Z\bar{X} + (1-Z)\mu_0
$$

This approach lacks a firm theoretical basis (the square-root rule is ad hoc), which motivates the Bühlmann approach.

## Bühlmann Credibility Model

Let $\theta$ be a risk parameter drawn from a prior distribution $\pi(\theta)$. Given $\theta$, the annual losses $X_1, X_2, \ldots, X_n$ are i.i.d. with:

$$
\mu(\theta) = E[X_i \mid \theta] \quad\text{(hypothetical mean)}
$$
$$
\sigma^2(\theta) = \text{Var}(X_i \mid \theta) \quad\text{(process variance)}
$$

The three **structural parameters** are:

$$
\mu = E[\mu(\theta)], \quad v = E[\sigma^2(\theta)], \quad a = \text{Var}(\mu(\theta))
$$

Here $v$ is the **expected process variance** (within-risk variability) and $a$ is the **variance of hypothetical means** (between-risk variability).

The Bühlmann premium is the **best linear estimator** of $\mu(\theta)$ given $X_1, \ldots, X_n$, minimizing the expected squared error among all linear functions of the data:

$$
\hat{\mu} = Z\bar{X} + (1-Z)\mu
$$

where the **credibility factor** is:

$$
Z = \frac{n}{n + k}, \quad k = \frac{v}{a}
$$

The ratio $k = v/a$ is the **Bühlmann $k$**: high process variance or low between-risk variance makes $k$ large, reducing the weight given to own experience.

Key properties:
- $Z \to 1$ as $n \to \infty$ (full credibility with infinite data)
- $Z \to 0$ as $a \to 0$ (all risks are homogeneous; prior always dominates)
- $Z \to 1$ as $v \to 0$ (observation is noise-free; one year suffices)

## Bühlmann–Straub Model

The **Bühlmann–Straub** extension handles **varying exposure**. Let $m_i$ be the exposure (e.g., premium, earned units) in year $i$, and let $\bar{X}_i = X_i / m_i$ be the loss ratio. Assume:

$$
E\!\left[\bar{X}_i \mid \theta\right] = \mu(\theta), \quad \text{Var}\!\left[\bar{X}_i \mid \theta\right] = \frac{\sigma^2(\theta)}{m_i}
$$

The credibility estimate remains:

$$
\hat{\mu} = Z\bar{X}_w + (1-Z)\mu
$$

where $\bar{X}_w = \sum m_i \bar{X}_i / m$ is the exposure-weighted average, $m = \sum m_i$, and:

$$
Z = \frac{m}{m + k}
$$

This is formally identical to Bühlmann but with total exposure $m$ replacing count $n$.

**Estimation of structural parameters** uses the within-group and between-group sum of squares:

$$
\hat{v} = \frac{1}{n-r} \sum_{i=1}^r \sum_{j=1}^{n_i} m_{ij}\!\left(\bar{X}_{ij} - \bar{X}_{i\cdot}\right)^2
$$

$$
\hat{a} = \frac{1}{c}\left[\sum_{i=1}^r m_i(\bar{X}_{i\cdot} - \bar{X})^2 - (r-1)\hat{v}\right]
$$

where $c$ is a correction factor. This empirical Bayes approach avoids specifying the full prior.

## Bayesian Interpretation

The Bühlmann premium is exactly **Bayesian** when $(X_i \mid \theta)$ is from the **exponential family** with a **conjugate prior**. In those cases, the posterior mean is linear in the data.

**Example — Poisson-Gamma model**: Suppose $(X \mid \lambda) \sim \text{Poisson}(\lambda)$ and $\lambda \sim \text{Gamma}(\alpha, \beta)$ (prior). After observing $n$ years with total claims $s$:

$$
(\lambda \mid X_1, \ldots, X_n) \sim \text{Gamma}(\alpha + s, \; \beta + n)
$$

The posterior mean is:

$$
E[\lambda \mid \text{data}] = \frac{\alpha + s}{\beta + n} = \frac{n}{n + \beta}\cdot \frac{s}{n} + \frac{\beta}{n+\beta}\cdot \frac{\alpha}{\beta} = Z\bar{X} + (1-Z)\mu
$$

with $Z = n/(n+\beta)$ and $k = \beta = v/a$. The Bühlmann formula is exact.

Other conjugate pairs used in credibility:

| Likelihood | Prior | $k$ |
|---|---|---|
| Poisson($\lambda$) | Gamma($\alpha, \beta$) | $\beta$ |
| Normal($\mu, \sigma^2$) | Normal($\mu_0, \tau^2$) | $\sigma^2/\tau^2$ |
| Binomial($m, q$) | Beta($a, b$) | $(a+b+1)/m$ |

## Credibility in Practice

Commercial lines insurers apply the Bühlmann-Straub framework to **experience rating** and **schedule rating**:

**Experience modification factor** for workers' compensation:

$$
\text{Mod} = Z \cdot \frac{\text{Actual losses}}{\text{Expected losses}} + (1-Z)
$$

The credibility factor $Z$ for small accounts uses a simplified formula based on expected losses:

$$
Z = \frac{E}{E + K}, \quad K = \frac{v}{a}
$$

where $K$ is the **ballast** (NCCI terminology), calibrated periodically from industry data.

**Hierarchical credibility** (Jewell, 1975) extends the model to multiple levels — e.g., state, industry, individual risk — each with its own credibility weight:

$$
\hat{\mu}_{ij} = Z_{ij}\bar{X}_{ij} + (1-Z_{ij})\hat{\mu}_i
$$
$$
\hat{\mu}_i = Z_i \bar{X}_i + (1-Z_i)\mu
$$

This recursive structure mirrors empirical Bayes shrinkage estimation and is directly connected to linear mixed models in statistics, where the credibility weights correspond to the optimal BLUP weights.
