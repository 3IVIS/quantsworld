---
title: "Meta-Analysis"
field: biostatistics
description: Quantitative synthesis of results across multiple studies, combining effect estimates to increase precision and assess heterogeneity.
intro: >
  Meta-analysis pools effect estimates from multiple independent studies to obtain a
  more precise overall estimate and to characterize the variability of effects across
  study contexts. The central challenge is heterogeneity: studies differ in populations,
  interventions, and outcome definitions, and ignoring this variability produces
  overconfident conclusions. The choice between fixed-effects and random-effects models
  determines whether inference applies to the studies at hand or to a broader population
  of possible studies.
math_concepts:
  - hypothesis-testing
  - bayes-theorem
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Fixed-effects model: inverse-variance weighting

The fixed-effects model assumes all studies estimate the **same true effect** $\theta$. Each study $i$ reports an estimate $\hat{\theta}_i$ with known variance $\sigma_i^2$:

$$\hat{\theta}_i = \theta + \epsilon_i, \quad \epsilon_i \sim N(0, \sigma_i^2)$$

The **inverse-variance weighted estimator** is the minimum-variance unbiased estimator:

$$\hat{\theta}_{\text{FE}} = \frac{\sum_i w_i \hat{\theta}_i}{\sum_i w_i}, \quad w_i = \frac{1}{\sigma_i^2}$$

Variance and 95% CI:

$$\text{Var}(\hat{\theta}_{\text{FE}}) = \frac{1}{\sum_i w_i}, \quad \text{CI} = \hat{\theta}_{\text{FE}} \pm 1.96 / \sqrt{\sum_i w_i}$$

The fixed-effects model is appropriate only when there is no reason to believe true effects differ across studies. In practice, this is rarely defensible.

## Random-effects model: DerSimonian-Laird

The **random-effects model** treats each study's true effect as a draw from a distribution:

$$\hat{\theta}_i = \mu + u_i + \epsilon_i, \quad u_i \sim N(0, \tau^2), \quad \epsilon_i \sim N(0, \sigma_i^2)$$

where $\mu$ is the mean effect and $\tau^2$ is **between-study variance** (heterogeneity). The marginal model is:

$$\hat{\theta}_i \sim N(\mu, \tau^2 + \sigma_i^2)$$

**DerSimonian-Laird (DL) estimator** of $\tau^2$: moments-based, using Cochran's $Q$ statistic:

$$Q = \sum_i w_i(\hat{\theta}_i - \hat{\theta}_{\text{FE}})^2$$

Under the null $\tau^2 = 0$, $Q \sim \chi^2_{k-1}$ where $k$ is the number of studies. The DL estimator:

$$\hat{\tau}^2_{\text{DL}} = \max\left(0,\; \frac{Q - (k-1)}{c}\right), \quad c = \sum_i w_i - \frac{\sum_i w_i^2}{\sum_i w_i}$$

The random-effects pooled estimate uses updated weights $w_i^* = 1/(\sigma_i^2 + \hat{\tau}^2)$:

$$\hat{\mu}_{\text{RE}} = \frac{\sum_i w_i^* \hat{\theta}_i}{\sum_i w_i^*}$$

**Limitations of DL**: $\hat{\tau}^2$ is biased downward; alternative estimators include REML, Paule-Mandel (iterative moments), and Hedges. With few studies ($k < 10$), all estimators of $\tau^2$ are imprecise.

## Quantifying heterogeneity: $I^2$ and $H^2$

The **$I^2$ statistic** (Higgins & Thompson, 2002) quantifies the proportion of total variation attributable to heterogeneity:

$$I^2 = \max\left(0,\; \frac{Q - (k-1)}{Q}\right) \times 100\%$$

Approximate benchmarks (not thresholds):
- $I^2 < 25\%$: low heterogeneity
- $25\% \le I^2 < 50\%$: moderate
- $50\% \le I^2 < 75\%$: substantial
- $I^2 \ge 75\%$: considerable

**Important caveat**: $I^2$ depends on the number of studies and their precision. With many large studies, even small $\tau^2$ yields high $I^2$. The **prediction interval**:

$$\hat{\mu} \pm t_{k-2, 0.975} \sqrt{\hat{\tau}^2 + \text{Var}(\hat{\mu})}$$

captures the range of true effects in 95% of settings — often more informative than $I^2$ alone.

The **$H^2 = Q/(k-1)$ statistic** is the ratio of observed to expected $Q$; $H = 1$ means no heterogeneity.

## Forest plot

A **forest plot** displays each study's estimate and CI as a horizontal line with a central square (sized proportional to weight), plus a pooled estimate diamond at the bottom.

Standard elements:
1. Study identifier and year
2. Point estimate and 95% CI (horizontal line)
3. Weight (square area)
4. Pooled estimate and CI (diamond)
5. Heterogeneity statistics ($I^2$, $Q$ test $p$-value, $\tau^2$)

The forest plot immediately reveals outlier studies (those whose CIs do not overlap the diamond) and influential studies (large squares).

## Funnel plot and publication bias

A **funnel plot** plots each study's effect estimate (x-axis) against a measure of precision — standard error (y-axis, inverted), sample size, or 1/SE. Under no publication bias and homogeneity, the plot should be symmetric around the pooled estimate, forming an inverted funnel.

**Asymmetry** can indicate:
- Publication bias (small studies with null/negative results unpublished)
- True small-study effects (e.g., smaller trials run in higher-risk populations)
- Reporting bias, clinical heterogeneity

**Egger's test**: regress the standardized effect $\hat{\theta}_i / \text{SE}_i$ on precision $1/\text{SE}_i$:

$$\frac{\hat{\theta}_i}{\text{SE}_i} = a + b \cdot \frac{1}{\text{SE}_i} + \epsilon_i$$

Under symmetry, the intercept $a = 0$. A t-test of $H_0: a = 0$ is the Egger test. Begg's rank test is an alternative based on Kendall's $\tau$ between standardized effect and precision.

**Trim-and-fill method** (Duval & Tweedie): iteratively trims asymmetric studies and imputes their mirror images around the adjusted pooled estimate. The imputed studies provide a bias-corrected estimate. This is exploratory — it assumes a specific publication bias mechanism and can adjust in the wrong direction.

## Meta-regression

When heterogeneity can be explained by study-level characteristics (moderators), **meta-regression** extends the random-effects model:

$$\hat{\theta}_i = \beta_0 + \beta_1 z_{i1} + \cdots + \beta_p z_{ip} + u_i + \epsilon_i$$

where $z_{ij}$ are study-level covariates (mean age, year of publication, risk of bias score, dose level). The residual heterogeneity $\tau^2_{\text{residual}}$ measures unexplained between-study variance.

**R$^2$ analog**: the proportion of between-study variance explained by the moderator:

$$R^2 = 1 - \frac{\hat{\tau}^2_{\text{with moderator}}}{\hat{\tau}^2_{\text{without moderator}}}$$

Caution: meta-regression has low power with few studies and is susceptible to ecological fallacy (study-level associations may not reflect individual-level effects).

## Network meta-analysis

When treatments A, B, C have not all been compared head-to-head, **network meta-analysis** (NMA) combines direct and indirect evidence. If trials A vs. B and B vs. C exist, the indirect estimate of A vs. C is:

$$\hat{\theta}_{AC}^{\text{indirect}} = \hat{\theta}_{AB} + \hat{\theta}_{BC}$$

The consistency assumption requires that direct and indirect estimates agree. The **node-splitting method** tests consistency by comparing direct vs. indirect evidence for each comparison.

NMA simultaneously estimates all pairwise treatment effects within a network using a hierarchical model. Treatments can be ranked by their posterior probability of being best, producing **SUCRA** (surface under the cumulative ranking) scores.
