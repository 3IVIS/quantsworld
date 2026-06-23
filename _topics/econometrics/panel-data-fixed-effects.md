---
title: "Panel Data and Fixed Effects"
field: econometrics
description: Methods for estimating causal effects from panel data by exploiting within-unit variation to control for time-invariant unobserved heterogeneity.
intro: >
  Panel data observe the same $N$ units (individuals, firms, countries) across $T$ time periods, yielding $NT$ observations with a rich structure that cross-sectional data cannot provide. The central challenge is unobserved heterogeneity — unit-specific characteristics correlated with regressors that bias OLS. Fixed effects estimation eliminates this heterogeneity by demeaning within each unit, enabling consistent estimation under weaker assumptions than random effects.
math_concepts:
  - linear-algebra
  - hypothesis-testing
  - probability-theory
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Panel Data Structure and the Unobserved Heterogeneity Problem

A balanced panel dataset consists of observations $(y_{it}, x_{it})$ for units $i = 1, \ldots, N$ and periods $t = 1, \ldots, T$. The general linear panel model is:

$$y_{it} = x_{it}^\top \beta + \alpha_i + u_{it}$$

where $\alpha_i$ is an unobserved, unit-specific effect (fixed or random) and $u_{it}$ is an idiosyncratic error with $\mathbb{E}[u_{it} \mid x_{it}, \alpha_i] = 0$.

**The problem with pooled OLS:** If $\alpha_i$ is correlated with $x_{it}$ (i.e., $\text{Cov}(\alpha_i, x_{it}) \neq 0$), pooled OLS regressing $y_{it}$ on $x_{it}$ and a constant is inconsistent. The OLS estimator confounds the true effect $\beta$ with the spurious relationship driven by $\alpha_i$.

**Example:** Estimating the wage return to education. Firms with more productive workers (high $\alpha_i$) may also pay higher wages and hire more educated workers. OLS overstates the return to education.

The panel regression can be written in matrix form. Let $\mathbf{y}_i = (y_{i1}, \ldots, y_{iT})^\top$, $\mathbf{X}_i$ be the $T \times k$ matrix of regressors, and $\mathbf{u}_i$ the error vector. Stacking across units:

$$\mathbf{y} = \mathbf{X}\beta + \mathbf{D}\alpha + \mathbf{u}$$

where $\mathbf{D}$ is the $NT \times N$ matrix of unit dummies ($D_{it,j} = \mathbf{1}[i=j]$) and $\alpha = (\alpha_1, \ldots, \alpha_N)^\top$.

## The Within (Fixed Effects) Estimator

The within estimator eliminates $\alpha_i$ by demeaning each unit's observations. Define unit-mean deviations:

$$\tilde{y}_{it} = y_{it} - \bar{y}_i, \qquad \tilde{x}_{it} = x_{it} - \bar{x}_i$$

where $\bar{y}_i = T^{-1}\sum_t y_{it}$. Subtracting the unit mean from both sides of the model:

$$\tilde{y}_{it} = \tilde{x}_{it}^\top \beta + (u_{it} - \bar{u}_i)$$

The individual effect $\alpha_i$ drops out. The FE (within) estimator is:

$$\hat{\beta}_{\text{FE}} = \left(\sum_i \sum_t \tilde{x}_{it}\tilde{x}_{it}^\top\right)^{-1}\!\sum_i \sum_t \tilde{x}_{it}\tilde{y}_{it}$$

This is algebraically equivalent to OLS on the demeaned data, or equivalently OLS on the original data including $N-1$ unit dummy variables (the "least squares dummy variable" estimator). Both give the same slope estimates but the dummy approach is computationally expensive when $N$ is large.

**Identification:** $\hat{\beta}_{\text{FE}}$ is identified only from **within-unit variation over time**. Time-invariant regressors (gender, race, country) are perfectly collinear with the unit dummies and are absorbed — their effects cannot be estimated.

**Consistency:** Under strict exogeneity $\mathbb{E}[u_{it} \mid x_{i1}, \ldots, x_{iT}, \alpha_i] = 0$, the FE estimator is consistent as $N \to \infty$ with $T$ fixed.

## Random Effects and the Hausman Test

**Random effects (RE)** assumes $\alpha_i \perp x_{it}$, treating $\alpha_i$ as part of the composite error $v_{it} = \alpha_i + u_{it}$. Because $v_{it}$ and $v_{is}$ share $\alpha_i$, the error is equicorrelated:

$$\text{Cov}(v_{it}, v_{is}) = \sigma^2_\alpha \quad (t \neq s), \qquad \text{Var}(v_{it}) = \sigma^2_\alpha + \sigma^2_u$$

GLS exploits this structure. The RE estimator is a matrix-weighted combination of the within (FE) estimator and the between estimator (OLS on unit means):

$$\hat{\beta}_{\text{RE}} = \lambda\,\hat{\beta}_{\text{FE}} + (1-\lambda)\,\hat{\beta}_{\text{between}}, \qquad \lambda = 1 - \frac{\sigma_u}{\sqrt{T\sigma^2_\alpha + \sigma^2_u}}$$

RE is more efficient than FE when $\alpha_i \perp x_{it}$ because it uses both within and between variation. But if $\text{Cov}(\alpha_i, x_{it}) \neq 0$, RE is inconsistent.

**The Hausman test** formally tests $H_0: \text{Cov}(\alpha_i, x_{it}) = 0$ by comparing $\hat{\beta}_{\text{FE}}$ and $\hat{\beta}_{\text{RE}}$. Under $H_0$, both are consistent but RE is efficient; under $H_1$, only FE is consistent. The test statistic is:

$$H = (\hat{\beta}_{\text{FE}} - \hat{\beta}_{\text{RE}})^\top \left[\widehat{\text{Var}}(\hat{\beta}_{\text{FE}}) - \widehat{\text{Var}}(\hat{\beta}_{\text{RE}})\right]^{-1} (\hat{\beta}_{\text{FE}} - \hat{\beta}_{\text{RE}}) \xrightarrow{d} \chi^2_k$$

under $H_0$, where $k$ is the number of time-varying regressors. Rejection suggests FE is preferred; failure to reject supports RE (with the caveat that the test has low power in small samples).

## Two-Way Fixed Effects

**Two-way FE** adds time fixed effects $\lambda_t$ to control for aggregate shocks common to all units:

$$y_{it} = x_{it}^\top \beta + \alpha_i + \lambda_t + u_{it}$$

The within transformation now demeans by unit means, time means, and the grand mean:

$$\tilde{y}_{it} = y_{it} - \bar{y}_i - \bar{y}_t + \bar{y}$$

This uses only variation that is neither purely cross-sectional ($\alpha_i$ absorbed) nor purely time-series ($\lambda_t$ absorbed). Two-way FE is the standard specification in difference-in-differences designs and controls for any time-invariant unit heterogeneity and any unit-invariant time shocks simultaneously.

**Identification under two-way FE** requires variation in $x_{it}$ that is not fully explained by unit means or time means. A regressor that is purely a unit-specific trend, for instance, is not identified.

## Cluster-Robust Standard Errors

Within a unit, errors $u_{it}$ across $t$ are likely correlated (e.g., a firm that had a good year tends to have correlated residuals). OLS standard errors that assume independence across all $it$ pairs are invalid. **Cluster-robust standard errors** allow arbitrary correlation within unit $i$ across time:

$$\widehat{\text{Var}}_{\text{CR}}(\hat{\beta}) = (X^\top X)^{-1} \left(\sum_{i=1}^N \tilde{X}_i^\top \hat{u}_i \hat{u}_i^\top \tilde{X}_i\right) (X^\top X)^{-1}$$

where $\hat{u}_i = (\hat{u}_{i1}, \ldots, \hat{u}_{iT})^\top$ is the vector of within-unit residuals and $\tilde{X}_i$ is the demeaned regressor matrix for unit $i$. This is the panel analog of heteroskedasticity-robust (White) standard errors. Cluster-robust SEs are consistent as $N \to \infty$ and are nearly always preferred in panel settings. With few clusters ($N < 50$), a small-sample correction using $t_{N-1}$ or wild cluster bootstrap is recommended.

## Nickell Bias in Dynamic Panels

When lagged outcomes enter as regressors, strict exogeneity fails and the FE estimator is biased. The **dynamic panel model** is:

$$y_{it} = \rho\,y_{i,t-1} + x_{it}^\top \beta + \alpha_i + u_{it}$$

After within-demeaning, $\tilde{y}_{i,t-1}$ is correlated with the demeaned error $\tilde{u}_{it}$ because $\bar{y}_i$ contains $y_{i,t-1}$ and $\bar{u}_i$ contains $u_{i,t-1}$. The resulting **Nickell bias** is of order $O(1/T)$:

$$\text{plim}_{N\to\infty}(\hat{\rho}_{\text{FE}} - \rho) \approx -\frac{1+\rho}{T-1}$$

For small $T$ (e.g., $T = 5$), this bias can be substantial. Solutions include:

| Method | Approach |
|--------|----------|
| Anderson-Hsiao | Instrument $\Delta y_{i,t-1}$ with $y_{i,t-2}$ |
| Arellano-Bond | GMM using all available lags as instruments |
| Blundell-Bond | System GMM adding level equations |
| Bias correction | Analytical correction of order $O(1/T)$ (Kiviet) |

The Arellano-Bond estimator uses first differences to eliminate $\alpha_i$ and then instruments $\Delta y_{i,t-1}$ with levels $y_{i,t-2}, y_{i,t-3}, \ldots$, which are valid instruments under the assumption that $u_{it}$ is serially uncorrelated.
