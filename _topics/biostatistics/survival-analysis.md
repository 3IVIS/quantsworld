---
title: "Survival Analysis"
field: biostatistics
description: Statistical methods for time-to-event data, accounting for censoring and the hazard of an event occurring over time.
intro: >
  Survival analysis studies the time until an event of interest occurs — death, relapse,
  equipment failure, or customer churn. What distinguishes it from ordinary regression
  is censoring: for many subjects we know only that the event had not yet occurred by the
  end of follow-up. Ignoring censored observations biases estimates; survival methods
  handle them correctly through the likelihood.
math_concepts:
  - probability-theory
  - survival-analysis
  - random-processes
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Survival and hazard functions

Let $T \ge 0$ be a non-negative random variable representing the time to event. The fundamental quantities are:

**Survival function**

$$S(t) = P(T > t) = 1 - F(t)$$

$S(t)$ is monotone non-increasing, $S(0) = 1$, and $S(\infty) = 0$.

**Hazard function** (instantaneous failure rate)

$$h(t) = \lim_{\Delta t \to 0} \frac{P(t \le T < t+\Delta t \mid T \ge t)}{\Delta t} = \frac{f(t)}{S(t)}$$

**Cumulative hazard function**

$$H(t) = \int_0^t h(u)\,du = -\log S(t)$$

This gives the key identity $S(t) = e^{-H(t)}$, linking all three representations.

| Quantity | Formula | Range |
|---|---|---|
| Survival $S(t)$ | $P(T > t)$ | $[0,1]$, decreasing |
| Density $f(t)$ | $-dS/dt$ | $\ge 0$ |
| Hazard $h(t)$ | $f(t)/S(t)$ | $\ge 0$, unbounded |
| Cum. hazard $H(t)$ | $-\log S(t)$ | $[0,\infty)$, increasing |

Given any one of these, the others follow uniquely, so the choice is a matter of modeling convenience.

## Types of censoring

Censoring occurs when we have incomplete information about the event time.

**Right censoring** (most common): we know $T > c$ for a censoring time $c$. The subject was event-free at their last contact. Causes: study end, loss to follow-up, competing event.

**Left censoring**: the event occurred before the first observation time. We know $T < c$.

**Interval censoring**: the event occurred in $(L, R]$. Common in periodic assessments (clinic visits, mammography screening).

**Type I censoring**: censoring time fixed in advance (all subjects followed for 2 years).

**Type II censoring**: study stops after a fixed number of events.

The likelihood for a right-censored observation $(t_i, \delta_i)$ where $\delta_i = 1$ if event, $0$ if censored:

$$L_i = f(t_i)^{\delta_i} S(t_i)^{1-\delta_i} = h(t_i)^{\delta_i} S(t_i)$$

The full likelihood is $L = \prod_i L_i$, and **independent non-informative censoring** (the censoring mechanism carries no information about $T$) is required for valid inference.

## Nelson-Aalen estimator

The Nelson-Aalen estimator provides a non-parametric estimate of the cumulative hazard:

$$\hat{H}(t) = \sum_{t_i \le t} \frac{d_i}{n_i}$$

where at each observed event time $t_i$: $d_i$ = number of events, $n_i$ = number at risk just before $t_i$.

The estimated survival function follows as $\hat{S}(t) = e^{-\hat{H}(t)}$.

**Variance of the Nelson-Aalen estimator** (asymptotic):

$$\widehat{\text{Var}}[\hat{H}(t)] = \sum_{t_i \le t} \frac{d_i}{n_i^2}$$

The Nelson-Aalen estimator is preferred over the Kaplan-Meier when interest lies in the hazard, or when sample sizes are small (it has better small-sample properties in some settings).

## Parametric survival models

Parametric models specify a distribution for $T$ directly.

**Exponential model**: constant hazard $h(t) = \lambda$, so $S(t) = e^{-\lambda t}$. Implies the *memoryless property*: $P(T > s+t \mid T > s) = P(T > t)$.

**Weibull model**: $h(t) = \lambda \kappa t^{\kappa-1}$, $S(t) = e^{-\lambda t^\kappa}$. Shape parameter $\kappa$:
- $\kappa < 1$: decreasing hazard (early failures dominate)
- $\kappa = 1$: constant hazard (exponential)
- $\kappa > 1$: increasing hazard (wear-out failures)

Log-likelihood for Weibull with right-censored data:

$$\ell(\lambda, \kappa) = \sum_i \left[\delta_i \log(\lambda \kappa t_i^{\kappa-1}) - \lambda t_i^\kappa\right]$$

**Log-normal model**: $\log T \sim N(\mu, \sigma^2)$. Hazard is non-monotone — rises then falls — useful for chronic diseases where mortality initially increases then survivors become robust.

| Model | Hazard shape | Log $S(t)$ |
|---|---|---|
| Exponential | Constant | $-\lambda t$ |
| Weibull | Monotone | $-\lambda t^\kappa$ |
| Log-normal | Up then down | No closed form |
| Log-logistic | Up then down | $-\log(1 + (\lambda t)^\kappa)$ |
| Gompertz | Exponentially increasing | $-\lambda(e^{\gamma t}-1)/\gamma$ |

## Accelerated failure time models

Accelerated failure time (AFT) models relate covariates $\mathbf{x}$ to the **log of survival time**:

$$\log T = \mathbf{x}^\top \boldsymbol{\beta} + \sigma \epsilon$$

where $\epsilon$ has a specified distribution. The key insight: covariates *accelerate* (or decelerate) time, so $S(t \mid \mathbf{x}) = S_0(t \cdot e^{-\mathbf{x}^\top\boldsymbol{\beta}})$.

The **acceleration factor** for a one-unit change in $x_j$ is $e^{\beta_j}$. If $\beta_j < 0$, the event happens faster; if $\beta_j > 0$, survival is prolonged.

AFT vs. proportional hazards (PH):
- Weibull satisfies *both* AFT and PH — it is the only distribution with this dual property
- Log-normal and log-logistic are AFT but not PH
- PH models are more common clinically; AFT models have more direct interpretation

Parameter estimation uses maximum likelihood. For the Weibull AFT model with design matrix $X$:

$$\log t_i = \mathbf{x}_i^\top\boldsymbol{\beta} + \sigma \epsilon_i, \quad \epsilon_i \sim \text{Gumbel}$$

which corresponds to the Weibull PH model with $\lambda_i = \exp(-\mathbf{x}_i^\top\boldsymbol{\beta}/\sigma)$ and shape $1/\sigma$.

## Mean and median survival

The **median survival time** $t_{0.5}$ satisfies $S(t_{0.5}) = 0.5$ — it exists only if more than half the subjects experience the event.

The **mean survival time**:

$$E[T] = \int_0^\infty S(t)\,dt$$

For censored data, the mean is often restricted to a time horizon $\tau$ (restricted mean survival time, RMST):

$$\mu(\tau) = \int_0^\tau S(t)\,dt$$

RMST has gained popularity as a model-free summary that remains valid even when the proportional hazards assumption fails, and corresponds to the area under the Kaplan-Meier curve up to $\tau$.
