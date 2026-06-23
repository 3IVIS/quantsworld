---
title: "Logistic Regression"
field: biostatistics
description: Regression model for binary and polytomous outcomes using the logit link, yielding odds ratio estimates directly interpretable in clinical and epidemiological research.
intro: >
  Logistic regression is the standard method for analyzing binary outcomes in medicine and
  epidemiology — disease presence, treatment response, mortality within 30 days. It models
  the log-odds of the outcome as a linear function of covariates, produces odds ratios with
  confidence intervals, and connects naturally to case-control study design. Extensions to
  ordered and unordered multinomial outcomes are straightforward.
math_concepts:
  - probability-theory
  - optimization
  - hypothesis-testing
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The logit link and the model

For a binary outcome $Y \in \{0,1\}$ with $p = P(Y=1 \mid \mathbf{x})$, the **logistic regression model** is:

$$\log\frac{p}{1-p} = \mathbf{x}^\top \boldsymbol{\beta}, \quad \text{i.e.} \quad p = \frac{e^{\mathbf{x}^\top\boldsymbol{\beta}}}{1 + e^{\mathbf{x}^\top\boldsymbol{\beta}}} = \sigma(\mathbf{x}^\top\boldsymbol{\beta})$$

where $\sigma(\cdot)$ is the **logistic sigmoid**. The left-hand side is the **log-odds** or **logit**. Key properties:
- $p \in (0,1)$ for all $\mathbf{x}^\top\boldsymbol{\beta} \in \mathbb{R}$ — no predicted probability outside $[0,1]$
- The relationship between $\mathbf{x}$ and $p$ is sigmoidal, not linear
- The relationship between $\mathbf{x}$ and the log-odds *is* linear

The **odds ratio** for a one-unit increase in $x_j$:

$$\text{OR}_j = e^{\beta_j}$$

ORs are multiplicative: $\text{OR} > 1$ means the outcome is more likely; $\text{OR} < 1$ means less likely. The OR approximates the relative risk (RR) when outcome prevalence is low, but diverges when prevalence is high — an important epidemiological caveat.

## Maximum likelihood and Newton-Raphson

The log-likelihood for $n$ independent observations:

$$\ell(\boldsymbol{\beta}) = \sum_{i=1}^n \left[y_i \log p_i + (1-y_i)\log(1-p_i)\right] = \sum_i \left[y_i \mathbf{x}_i^\top\boldsymbol{\beta} - \log(1 + e^{\mathbf{x}_i^\top\boldsymbol{\beta}})\right]$$

This is **strictly concave** in $\boldsymbol{\beta}$ (when $X$ has full column rank), guaranteeing a unique global maximum.

**Score vector**:

$$\mathbf{U}(\boldsymbol{\beta}) = \frac{\partial \ell}{\partial \boldsymbol{\beta}} = X^\top(\mathbf{y} - \hat{\mathbf{p}})$$

where $\hat{p}_i = \sigma(\mathbf{x}_i^\top\boldsymbol{\beta})$. The score is zero at the MLE: the sum of observed outcomes equals the sum of fitted probabilities within each covariate pattern.

**Fisher information**:

$$\mathcal{I}(\boldsymbol{\beta}) = X^\top W X, \quad W = \text{diag}(\hat{p}_i(1-\hat{p}_i))$$

**Newton-Raphson / IRLS** (iteratively reweighted least squares):

$$\boldsymbol{\beta}^{(t+1)} = \boldsymbol{\beta}^{(t)} + (X^\top W^{(t)} X)^{-1} X^\top (\mathbf{y} - \hat{\mathbf{p}}^{(t)})$$

This is equivalent to solving a weighted least squares problem at each step. Convergence is typically rapid (5-10 iterations).

## Inference: Wald and likelihood ratio tests

**Wald test** for $H_0: \beta_j = 0$:

$$z = \frac{\hat{\beta}_j}{\text{SE}(\hat{\beta}_j)} \sim N(0,1), \quad \text{or} \quad \chi^2 = z^2 \sim \chi^2_1$$

where $\text{SE}(\hat{\beta}_j) = \sqrt{[\mathcal{I}(\hat{\boldsymbol{\beta}})^{-1}]_{jj}}$.

**95% CI for OR**: $\exp(\hat{\beta}_j \pm 1.96 \cdot \text{SE}(\hat{\beta}_j))$.

**Likelihood ratio test** (preferred for small samples):

$$G^2 = 2[\ell(\hat{\boldsymbol{\beta}}) - \ell(\hat{\boldsymbol{\beta}}_0)] \sim \chi^2_q$$

where $q$ is the number of restricted parameters. The LRT is more reliable than the Wald test when parameters are near boundaries or sample sizes are moderate.

**Score (Rao) test**: evaluates the gradient at the null value — useful when the full model is hard to fit.

| Test | Statistic | Requires full fit | Small-sample reliability |
|---|---|---|---|
| Wald | $(\hat{\beta}/\text{SE})^2$ | Yes | Moderate |
| LRT | $2\Delta\ell$ | Yes | Good |
| Score | $\mathbf{U}_0^\top \mathcal{I}_0^{-1} \mathbf{U}_0$ | No | Good |

## Goodness of fit and the AUC-ROC

**Hosmer-Lemeshow test**: divide subjects into $g$ (typically 10) deciles of predicted probability. Compare observed vs. expected counts by chi-squared with $g-2$ degrees of freedom. A non-significant result does not prove good fit, only absence of *detectable* lack of fit.

**Deviance**: $D = -2\ell(\hat{\boldsymbol{\beta}})$. The **null deviance** $D_0 = -2\ell(\hat{\boldsymbol{\beta}}_0)$ uses only an intercept. McFadden's pseudo-$R^2 = 1 - D/D_0$.

**AUC-ROC** (Area Under the Receiver Operating Characteristic curve): the probability that a randomly chosen event has a higher predicted probability than a randomly chosen non-event. Equivalent to the Wilcoxon-Mann-Whitney statistic:

$$\text{AUC} = P(\hat{p}_{Y=1} > \hat{p}_{Y=0})$$

AUC interpretation:
- $0.5$: no discrimination (coin flip)
- $0.7$–$0.8$: acceptable
- $0.8$–$0.9$: excellent
- $> 0.9$: outstanding (rare in medicine)

**Calibration** (separate from discrimination): a model can discriminate perfectly but be miscalibrated. **Calibration plots** bin subjects by predicted probability and plot against observed event rates; the ideal is the diagonal. **Brier score** $= n^{-1}\sum(\hat{p}_i - y_i)^2$ combines calibration and discrimination.

## Separation and Firth's correction

**Complete separation** occurs when a linear combination of covariates perfectly predicts the outcome. The MLE does not exist — the log-likelihood has no finite maximum and $\hat{\beta}_j \to \pm\infty$.

**Quasi-complete separation**: the covariate perfectly predicts *some* of the outcomes.

Detection: iterative algorithm fails to converge, very large standard errors, extreme coefficient estimates.

**Firth's penalized likelihood** adds a penalty $\frac{1}{2}\log|\mathcal{I}(\boldsymbol{\beta})|$ (the Jeffreys prior log-density) to the log-likelihood:

$$\ell^*(\boldsymbol{\beta}) = \ell(\boldsymbol{\beta}) + \frac{1}{2}\log|X^\top W X|$$

This shrinks estimates toward zero, yielding finite estimates and profile likelihood confidence intervals even under separation. It is the recommended approach for small samples and rare events.

## Multinomial and ordered logistic regression

**Multinomial logistic regression** for unordered outcome with $K$ categories (reference category $K$):

$$\log\frac{P(Y=k \mid \mathbf{x})}{P(Y=K \mid \mathbf{x})} = \mathbf{x}^\top \boldsymbol{\beta}_k, \quad k = 1, \ldots, K-1$$

Probabilities sum to one by construction. This is equivalent to fitting $K-1$ simultaneous binary logistic regressions against the reference category.

**Ordered (proportional odds) logistic regression** for ordinal outcomes $Y \in \{1, \ldots, K\}$:

$$\log\frac{P(Y \le k \mid \mathbf{x})}{P(Y > k \mid \mathbf{x})} = \alpha_k - \mathbf{x}^\top \boldsymbol{\beta}, \quad k = 1, \ldots, K-1$$

The $K-1$ intercepts $\alpha_1 < \alpha_2 < \cdots < \alpha_{K-1}$ define thresholds on a latent continuous scale. The **proportional odds assumption** requires that $\boldsymbol{\beta}$ is the same for all cut points — testable via the Brant test. When violated, **partial proportional odds** or **continuation ratio** models are alternatives.
