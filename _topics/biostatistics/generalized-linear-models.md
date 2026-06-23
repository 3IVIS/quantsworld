---
title: "Generalized Linear Models"
field: biostatistics
description: A unified regression framework extending linear models to non-normal outcomes via exponential family distributions and link functions.
intro: >
  Generalized linear models (GLMs) extend ordinary linear regression to outcomes that
  follow any distribution in the exponential family — binary, count, positive continuous,
  or proportions. Three components define a GLM: the random component (distribution),
  the systematic component (linear predictor), and the link function connecting them.
  A single estimation theory via iteratively reweighted least squares handles the entire
  family, making GLMs the most versatile tool in applied biostatistics.
math_concepts:
  - probability-theory
  - optimization
  - hypothesis-testing
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## The exponential family

A distribution belongs to the **exponential family** if its density can be written as:

$$f(y; \theta, \phi) = \exp\left\{\frac{y\theta - b(\theta)}{a(\phi)} + c(y, \phi)\right\}$$

where $\theta$ is the **natural (canonical) parameter**, $\phi$ is the **dispersion parameter**, $b(\theta)$ is the **cumulant generating function**, and $a(\phi)$ is a dispersion function (often $\phi/w$ for weight $w$).

Key identities (differentiating the log-partition function):

$$E[Y] = \mu = b'(\theta), \quad \text{Var}(Y) = b''(\theta) \cdot a(\phi) = V(\mu) \cdot \phi$$

where $V(\mu) = b''(\theta)$ is the **variance function**, which encodes how variance changes with the mean.

| Distribution | $\theta$ | $b(\theta)$ | $V(\mu)$ | Canonical link |
|---|---|---|---|---|
| Normal | $\mu$ | $\theta^2/2$ | $1$ | Identity |
| Binomial | $\log[\mu/(1-\mu)]$ | $\log(1+e^\theta)$ | $\mu(1-\mu)$ | Logit |
| Poisson | $\log\mu$ | $e^\theta$ | $\mu$ | Log |
| Gamma | $-1/\mu$ | $-\log(-\theta)$ | $\mu^2$ | Inverse |
| Inverse Gaussian | $-1/(2\mu^2)$ | $-\sqrt{-2\theta}$ | $\mu^3$ | $1/\mu^2$ |
| Neg. Binomial | $\log[\mu/(\mu+r)]$ | $-r\log(1-e^\theta)$ | $\mu + \mu^2/r$ | Log |

## Link functions: canonical and non-canonical

A **GLM** has three components:
1. **Random**: $Y_i \sim$ exponential family with mean $\mu_i$
2. **Linear predictor**: $\eta_i = \mathbf{x}_i^\top\boldsymbol{\beta}$
3. **Link function**: $g(\mu_i) = \eta_i$, i.e., $\mu_i = g^{-1}(\eta_i)$

The **canonical link** sets $\theta = \eta$, yielding the simplest score equations. Non-canonical links are valid and sometimes preferable:

| Response | Canonical link | Alternative links |
|---|---|---|
| Binary | Logit | Probit, complementary log-log |
| Count (Poisson) | Log | Identity, square root |
| Positive continuous (Gamma) | Inverse | Log, identity |
| Proportions | Logit | Probit, log-log |

The **complementary log-log** link $g(\mu) = \log(-\log(1-\mu))$ is natural when the binary outcome arises from an underlying Poisson process — it corresponds to a Weibull survival model and is asymmetric (unlike probit/logit).

## IRLS estimation

Maximizing the log-likelihood for a GLM leads to the score equations:

$$\frac{\partial \ell}{\partial \boldsymbol{\beta}} = \sum_i \frac{(y_i - \mu_i)}{\text{Var}(Y_i)} \cdot \frac{1}{g'(\mu_i)} \cdot \mathbf{x}_i = 0$$

These cannot be solved analytically in general. **Iteratively Reweighted Least Squares (IRLS)** solves them by Newton-Raphson steps equivalent to weighted least squares at each iteration.

Define the **working response** and **working weights** at iteration $t$:

$$z_i^{(t)} = \hat{\eta}_i^{(t)} + (y_i - \hat{\mu}_i^{(t)}) \cdot g'(\hat{\mu}_i^{(t)}), \quad w_i^{(t)} = \frac{1}{[g'(\hat{\mu}_i^{(t)})]^2 \cdot V(\hat{\mu}_i^{(t)})}$$

Update:

$$\boldsymbol{\beta}^{(t+1)} = (X^\top W^{(t)} X)^{-1} X^\top W^{(t)} \mathbf{z}^{(t)}$$

This is exactly weighted least squares of $\mathbf{z}$ on $X$ with weights $W$. At convergence, the Fisher information is $\mathcal{I}(\hat{\boldsymbol{\beta}}) = X^\top \hat{W} X / \phi$, and $\hat{\boldsymbol{\beta}} \sim N(\boldsymbol{\beta}, (X^\top \hat{W} X)^{-1} \phi)$ asymptotically.

## Deviance and AIC

**Deviance** measures goodness of fit relative to the saturated model (one parameter per observation):

$$D(y; \hat{\mu}) = 2\phi[\ell(\text{saturated}) - \ell(\hat{\mu})] = 2\sum_i d_i$$

For common distributions:
- **Poisson**: $D = 2\sum_i [y_i \log(y_i/\hat{\mu}_i) - (y_i - \hat{\mu}_i)]$
- **Binomial** ($m_i$ trials): $D = 2\sum_i [y_i \log(y_i/\hat{\mu}_i) + (m_i-y_i)\log((m_i-y_i)/(m_i-\hat{\mu}_i))]$
- **Normal**: $D = \sum_i (y_i - \hat{\mu}_i)^2 / \sigma^2 = \text{RSS}/\sigma^2$

**Scaled deviance** $D^* = D/\phi \sim \chi^2_{n-p}$ asymptotically (for known $\phi$ and Poisson/binomial with large $m_i$).

**AIC** for model selection: $\text{AIC} = -2\hat{\ell} + 2p$ where $p$ is the number of parameters. Prefers the model with lower AIC.

**Pearson chi-squared** is an alternative goodness-of-fit statistic:

$$X^2 = \sum_i \frac{(y_i - \hat{\mu}_i)^2}{V(\hat{\mu}_i)/w_i}$$

## Poisson regression and overdispersion

**Poisson regression** models count outcomes $Y_i \sim \text{Poisson}(\mu_i)$ with $\log \mu_i = \mathbf{x}_i^\top\boldsymbol{\beta}$. Coefficients exponentiate to **incidence rate ratios** (IRR).

For rate data with known exposure $t_i$ (person-years), use an **offset**: $\log(\mu_i/t_i) = \mathbf{x}_i^\top\boldsymbol{\beta}$, so $\log\mu_i = \mathbf{x}_i^\top\boldsymbol{\beta} + \log t_i$.

**Overdispersion** occurs when $\text{Var}(Y) > \mu$ (more variability than Poisson allows). Causes: unobserved heterogeneity, clustering, excess zeros.

**Quasi-Poisson**: retain the Poisson log-likelihood estimating equations but estimate the dispersion $\hat{\phi} = X^2 / (n-p)$. Standard errors are multiplied by $\sqrt{\hat{\phi}}$. Coefficient estimates unchanged; inference corrected.

**Negative binomial**: explicitly model $Y \mid Z \sim \text{Poisson}(\mu Z)$, $Z \sim \text{Gamma}(1/\alpha, 1/\alpha)$, yielding $Y \sim \text{NB}(\mu, \alpha)$ with:

$$P(Y=y) = \binom{y+1/\alpha-1}{y}\left(\frac{1/\alpha}{1/\alpha+\mu}\right)^{1/\alpha}\left(\frac{\mu}{1/\alpha+\mu}\right)^y$$

$$E[Y] = \mu, \quad \text{Var}(Y) = \mu + \alpha\mu^2$$

The dispersion parameter $\alpha > 0$; $\alpha \to 0$ recovers Poisson. Estimation by MLE, not IRLS (requires profile likelihood over $\alpha$).

## Gamma regression and quasi-likelihood

**Gamma regression** models positive continuous outcomes (costs, durations, concentrations) with $\text{Var}(Y) \propto \mu^2$ (constant coefficient of variation). Canonical link is $1/\mu$, but the **log link** is more common:

$$\log\mu_i = \mathbf{x}_i^\top\boldsymbol{\beta} \quad \Rightarrow \quad e^{\beta_j} = \text{multiplicative effect on mean}$$

**Quasi-likelihood** (Wedderburn 1974) requires only the specification of $E[Y]$ and $\text{Var}(Y) = \phi V(\mu)$ — not the full distribution. The quasi-score:

$$Q(\boldsymbol{\beta}) = \sum_i \frac{(y_i - \mu_i) \mathbf{x}_i}{V(\mu_i) g'(\mu_i)}$$

has the same properties as a true score, so IRLS applies and standard errors are valid (robust to distributional misspecification). This is particularly useful for **binary proportions** $y_i \in [0,1]$ modeled with the binomial variance function but known to be non-integer.

## Diagnostics

**Pearson residuals**: $(y_i - \hat{\mu}_i) / \sqrt{V(\hat{\mu}_i)}$ — should be approximately $N(0,1)$ for large samples.

**Deviance residuals**: $\text{sign}(y_i - \hat{\mu}_i) \sqrt{d_i}$ — more symmetric for Poisson.

**Leverage**: $h_{ii} = [X(X^\top \hat{W} X)^{-1}X^\top \hat{W}]_{ii}$, analogous to OLS but with working weights.

**Cook's distance**: $D_i = r_i^2 h_{ii} / [p(1-h_{ii})]$ measures influence on $\hat{\boldsymbol{\beta}}$.

**Link test**: add $\hat{\eta}^2$ to the model; if significant, the link function may be misspecified or important predictors omitted.
