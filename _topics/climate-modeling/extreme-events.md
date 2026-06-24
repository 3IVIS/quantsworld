---
title: "Extreme Events and Climate Attribution"
field: climate-modeling
description: Extreme value theory provides the statistical framework for quantifying rare weather events, their return periods, and their changing likelihood under climate change.
intro: >
  Extreme weather events—heatwaves, floods, droughts, intense cyclones—cause most of the human and economic damage from weather and climate. Analyzing their frequency requires statistics designed for tails of distributions rather than means, and attributing changes in their probability to climate change demands a careful probabilistic framing. Extreme value theory (EVT), together with large-ensemble climate model experiments, has made event attribution a quantitative science.
math_concepts:
  - probability-theory
  - maximum-entropy
  - bayesian-theorem
  - monte-carlo-methods
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Extreme Value Theory: The GEV Distribution

The **Fisher-Tippett-Gnedenko theorem** is the EVT counterpart of the Central Limit Theorem: the limiting distribution of block maxima (e.g., annual maximum temperature) belongs to the **Generalized Extreme Value (GEV)** family regardless of the underlying distribution:

$$G(x;\mu,\sigma,\xi) = \exp\!\left\{-\left[1 + \xi\!\left(\frac{x-\mu}{\sigma}\right)\right]^{-1/\xi}\right\}$$

for $1 + \xi(x-\mu)/\sigma > 0$, where $\mu$ is the location, $\sigma > 0$ the scale, and $\xi$ the **shape parameter** (tail index).

| Shape $\xi$ | Type | Tail | Example variable |
|---|---|---|---|
| $\xi \to 0$ | Gumbel | Light (exponential) | Temperature maxima |
| $\xi > 0$ | Fréchet | Heavy (power law) | Precipitation, wind |
| $\xi < 0$ | Weibull | Bounded above | Relative humidity |

For precipitation extremes, $\xi \approx 0.1$–$0.3$ is typical, indicating a heavier tail than the Gumbel.

## Return Periods and Return Levels

The **return period** (or recurrence interval) $T$ of an event exceeding level $z$ is:

$$T = \frac{1}{1 - G(z)} \approx \frac{1}{P(X > z)}$$

The **$T$-year return level** $z_T$ (exceeded with probability $1/T$ in any year) is obtained by inverting the GEV:

$$z_T = \mu - \frac{\sigma}{\xi}\!\left[1 - (-\ln(1 - 1/T))^{-\xi}\right]$$

For the Gumbel case ($\xi \to 0$): $z_T = \mu - \sigma \ln(-\ln(1-1/T))$.

Return levels are estimated by fitting GEV parameters to a record of annual maxima via maximum likelihood or L-moments. The $95\%$ confidence interval on $z_{100}$ (the 1-in-100-year level) is typically wide—often $\pm 30$–$50\%$—because long-return-period events are inherently data-scarce.

## Peaks-Over-Threshold and the GPD

An alternative to block maxima uses **all exceedances** above a high threshold $u$. By the Pickands-Balkema-de Haan theorem, threshold excesses $(X - u \mid X > u)$ converge to the **Generalized Pareto Distribution (GPD)**:

$$H(y;\sigma_u,\xi) = 1 - \left(1 + \frac{\xi y}{\sigma_u}\right)^{-1/\xi}, \quad y > 0$$

This **peaks-over-threshold (POT)** approach uses more data than annual maxima but requires careful threshold selection: too low introduces bias (non-asymptotic behavior), too high increases variance. The mean excess plot $E[X-u \mid X>u]$ vs $u$ is used diagnostically — a linearly increasing relationship confirms the GPD family.

The POT return level for a rate-$\lambda$ Poisson process of exceedances is:

$$z_T = u + \frac{\sigma_u}{\xi}\!\left[(\lambda T)^\xi - 1\right]$$

## Climate Change Attribution

**Event attribution** asks: how has climate change altered the probability of an observed extreme? The standard framework compares two counterfactual worlds using large climate model ensembles:

- **Factual world** ($\mathcal{F}$): current climate with observed forcing
- **Counterfactual world** ($\mathcal{CF}$): pre-industrial climate (no anthropogenic forcing)

The **probability ratio** (PR) and **fraction attributable risk** (FAR) are:

$$\text{PR} = \frac{P(X > x \mid \mathcal{F})}{P(X > x \mid \mathcal{CF})}, \qquad \text{FAR} = 1 - \frac{1}{\text{PR}}$$

A $\text{PR} = 5$ means the event is five times more likely in the current climate; $\text{FAR} = 0.8$ means $80\%$ of the risk is attributable to climate change.

Non-stationary GEV models allow direct estimation by making $\mu$ (and sometimes $\sigma$) a function of a climate covariate (e.g., global mean temperature $T_g$):

$$\mu(t) = \mu_0 + \alpha\, T_g(t)$$

This covariate approach can be fitted to observations alone, without needing large model ensembles, though it assumes a linear relationship between the location parameter and forcing.

## Clausius-Clapeyron Scaling

A key physical anchor for precipitation extremes is **Clausius-Clapeyron (CC) scaling**: the saturation vapor pressure increases at $\approx 7\%\ \text{K}^{-1}$:

$$\frac{d\ln e_s}{dT} = \frac{L_v}{R_v T^2} \approx 7\%\ \text{K}^{-1}$$

where $L_v$ is the latent heat of vaporization and $R_v$ the gas constant for water vapor. If atmospheric moisture content controls extreme precipitation intensity, extreme rainfall should also intensify at $\sim 7\%$ per degree of warming. Observational analyses find scaling rates of $6$–$8\%\ \text{K}^{-1}$ for short-duration convective extremes, broadly consistent with CC, though dynamical changes can produce super-CC or sub-CC scaling regionally.
