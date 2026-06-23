---
title: "Kaplan-Meier Estimator"
field: biostatistics
description: The product-limit non-parametric estimator of the survival function, the universal starting point for time-to-event analysis.
intro: >
  The Kaplan-Meier estimator is the cornerstone of survival analysis: a non-parametric,
  step-function estimate of the survival curve that accounts for censored observations
  without any distributional assumptions. It forms the basis for comparing survival
  between groups and for checking parametric model assumptions.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - survival-analysis
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The product-limit estimator

Let $t_1 < t_2 < \cdots < t_k$ be the ordered distinct event times (not censoring times). At each $t_i$, define:
- $d_i$ = number of events at $t_i$
- $n_i$ = number at risk just before $t_i$ (those who have neither experienced the event nor been censored)

The **Kaplan-Meier estimator** is:

$$\hat{S}(t) = \prod_{t_i \le t} \left(1 - \frac{d_i}{n_i}\right)$$

This is a **maximum likelihood estimator** of $S(t)$ in the class of all right-continuous step functions — it places probability mass only at observed event times.

**Example calculation** with $n = 10$ subjects:

| Time | Events $d_i$ | Censored | At risk $n_i$ | $1 - d_i/n_i$ | $\hat{S}(t)$ |
|---|---|---|---|---|---|
| 2 | 1 | 0 | 10 | 0.900 | 0.900 |
| 5 | 1 | 1 | 9 | 0.889 | 0.800 |
| 8 | 2 | 0 | 7 | 0.714 | 0.571 |
| 12 | 1 | 2 | 5 | 0.800 | 0.457 |
| 20 | 1 | 1 | 2 | 0.500 | 0.229 |

The estimate drops only at event times; censored observations reduce $n_i$ for subsequent intervals.

## Handling ties and censoring conventions

**Ties between event and censoring times**: the standard convention places censored observations *after* events at the same time (so censored subjects are included in $n_i$ at their censoring time). Some software uses the opposite convention; results differ slightly.

**Ties between event times** ($d_i > 1$): the product-limit formula handles multiple simultaneous events naturally. Alternative: the **Breslow estimator** computes $\hat{H}(t) = \sum d_i / n_i$ and exponentiates, yielding slightly different estimates with many ties.

The KM estimate is **undefined** beyond the largest observation if that observation is censored — the curve stops at the last event time. If the largest observation is an event, $\hat{S}(t_{\max}) = 0$.

## Greenwood's formula for variance

The asymptotic variance of $\hat{S}(t)$ is given by **Greenwood's formula**:

$$\widehat{\text{Var}}[\hat{S}(t)] = \hat{S}(t)^2 \sum_{t_i \le t} \frac{d_i}{n_i(n_i - d_i)}$$

This follows from the delta method applied to $\log \hat{S}(t) = \sum \log(1 - d_i/n_i)$ and treating each factor as independent (valid asymptotically).

**Pointwise confidence intervals** using the **log-log transform** (recommended over the plain log or linear scale because it respects the $[0,1]$ constraint):

$$\text{CI for } \log(-\log \hat{S}(t)): \quad \log(-\log \hat{S}(t)) \pm z_{\alpha/2} \cdot \hat{\sigma}$$

where $\hat{\sigma}^2 = \widehat{\text{Var}}[\log(-\log \hat{S}(t))]$ derived via the delta method:

$$\hat{\sigma}^2 = \frac{1}{(\log \hat{S}(t))^2} \sum_{t_i \le t} \frac{d_i}{n_i(n_i-d_i)}$$

Back-transform gives: $\exp(-\exp(\text{CI bounds}))$.

Other transforms used: **log** ($\log \hat{S}(t)$ on the $(-\infty,0]$ scale), **complementary log-log**, **arcsin-square-root**. The log-log is best for small samples or survival probabilities near 0 or 1.

## Log-rank test

To compare two or more survival curves, the **log-rank test** (Mantel-Haenszel) constructs a statistic based on observed vs. expected events at each event time.

For two groups (A, B) with events $d_{iA}, d_{iB}$ and at-risk counts $n_{iA}, n_{iB}$ at time $t_i$:

**Expected events in group A** under the null $H_0: S_A = S_B$:

$$e_{iA} = \frac{n_{iA}}{n_i} d_i, \quad n_i = n_{iA} + n_{iB}, \quad d_i = d_{iA} + d_{iB}$$

**Test statistic**:

$$\chi^2 = \frac{\left(\sum_i (d_{iA} - e_{iA})\right)^2}{\sum_i V_i} \xrightarrow{d} \chi^2_1$$

where the variance of $(d_{iA} - e_{iA})$ under the hypergeometric null:

$$V_i = \frac{n_{iA} n_{iB} d_i (n_i - d_i)}{n_i^2(n_i - 1)}$$

For $K > 2$ groups, the test has $K-1$ degrees of freedom.

The log-rank test is **most powerful against proportional hazards alternatives** (when one group consistently has a higher hazard rate by a constant factor). It has low power when hazard ratios cross over time.

## Stratified and weighted log-rank tests

**Stratified log-rank**: compute observed and expected counts within each stratum $s$, then sum:

$$\chi^2_{\text{strat}} = \frac{\left(\sum_s \sum_i (d_{isA} - e_{isA})\right)^2}{\sum_s \sum_i V_{is}}$$

Stratification removes confounding by the stratification variable (e.g., center in a multi-site trial) while testing the covariate of interest.

**Fleming-Harrington weighted log-rank** $G(\rho, \gamma)$: weight each time point by $w_i = \hat{S}(t_i^-)^\rho (1-\hat{S}(t_i^-))^\gamma$:

| $(\rho, \gamma)$ | Weights emphasize |
|---|---|
| $(0, 0)$ | All time points equally (standard log-rank) |
| $(1, 0)$ | Early differences (proportional to $\hat{S}$) |
| $(0, 1)$ | Late differences |
| $(1, 1)$ | Middle time points |

When the hazard ratio is not constant — e.g., delayed treatment effect in immunotherapy — the $(0,1)$ or $(1,1)$ weights have higher power. The "MaxCombo" test uses the maximum of multiple weighted statistics with a joint null distribution estimated by permutation.

## Median and quantile estimation

The **median survival time** is estimated by:

$$\hat{t}_{0.5} = \inf\{t : \hat{S}(t) \le 0.5\}$$

Confidence intervals for quantiles invert the pointwise CI for $S(t)$: find the set of $t$ values for which the CI for $S(t)$ includes 0.5.

The **restricted mean survival time** (RMST) up to horizon $\tau$:

$$\hat{\mu}(\tau) = \int_0^\tau \hat{S}(t)\,dt = \sum_i \hat{S}(t_{i-1})(t_i - t_{i-1})$$

(area under the KM step function). RMST is increasingly used as the primary endpoint in trials where the proportional hazards assumption is questionable, because it is interpretable (expected event-free days) and assumption-free.
