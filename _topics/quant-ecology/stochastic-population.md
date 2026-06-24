---
title: "Stochastic Population Dynamics"
field: quant-ecology
description: Demographic and environmental stochasticity drive population fluctuations and extinction risk in ways that deterministic models cannot capture.
intro: >
  Real populations are subject to two fundamental sources of randomness: demographic stochasticity (chance variation in individual births and deaths) and environmental stochasticity (temporal variation in the vital rates themselves). Both erode the stability promised by deterministic models and generate non-trivial extinction risks even for populations at their deterministic equilibrium. Diffusion approximations provide elegant analytical tools connecting these random processes to extinction probabilities and times.
math_concepts:
  - stochastic-calculus
  - probability-theory
  - differential-equations
  - measure-theory
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Demographic vs Environmental Stochasticity

Consider a population of size $N$ with per capita birth rate $b$ and death rate $d$. The **intrinsic rate** is $r = b - d$.

**Demographic stochasticity** arises because each individual's fate is random, even if $b$ and $d$ are fixed. For a birth-death process, the variance in population change over a short interval $\Delta t$ is:

$$\text{Var}(\Delta N) = (b + d)\,N\,\Delta t$$

The coefficient of variation of $\Delta N/N$ scales as $N^{-1/2}$, so demographic stochasticity matters most when $N$ is small.

**Environmental stochasticity** is variation in the vital rates themselves across years due to weather, food availability, disease, etc. If $r$ is random with mean $\bar{r}$ and variance $\sigma_e^2$, then even large populations feel this noise. The variance in $\Delta N/N$ scales as $N^0$ (independent of $N$), meaning environmental stochasticity is the dominant source of variance for large populations.

## Diffusion Approximation

For large $N$, the integer-valued birth-death process can be approximated by a continuous-time stochastic differential equation (SDE). For a population with mean growth rate $\mu(N)$ and variance rate $v(N)$, the **Itô SDE** is:

$$dN = \mu(N)\,dt + \sqrt{v(N)}\,dW_t$$

where $W_t$ is standard Brownian motion. For logistic growth with environmental stochasticity:

$$\mu(N) = rN\!\left(1 - \frac{N}{K}\right), \qquad v(N) = \sigma_e^2 N^2 + \sigma_d^2 N$$

The $N^2$ term is environmental stochasticity; the $N$ term is demographic stochasticity.

The **stochastic logistic** in the diffusion limit has a stationary distribution (when it exists). Working with $X = \ln N$ via Itô's lemma transforms the equation to:

$$dX = \left[\bar{r} - \frac{\sigma_e^2}{2} - \frac{e^X}{K}\left(r + \frac{\sigma_d^2}{2}\right)\right]dt + \sqrt{\sigma_e^2 + \sigma_d^2 e^{-X}}\,dW_t$$

The $-\sigma_e^2/2$ correction is the **Itô correction**: stochastic growth requires $\bar{r} > \sigma_e^2/2$ for long-run persistence, not merely $\bar{r} > 0$.

## Extinction Probability and Time

For a population on the interval $(0, K)$ with absorbing barrier at $0$ (extinction), the **mean time to extinction** from initial size $N_0$ is given by the solution to:

$$\mu(N)\frac{dT}{dN} + \frac{v(N)}{2}\frac{d^2 T}{dN^2} = -1$$

with boundary conditions $T(0) = 0$ and $T'(K) = 0$. For the simple case $\mu(N) = rN$ and $v(N) = \sigma_e^2 N^2$ (pure environmental stochasticity in log-space), the mean extinction time scales as:

$$\mathbb{E}[T_\text{ext}] \approx \frac{K^{2r/\sigma_e^2}}{r} \cdot C$$

This **super-exponential** scaling in $K$ means that modest increases in carrying capacity can dramatically reduce extinction risk, a result with direct implications for minimum viable population (MVP) analysis.

## Quasi-Stationary Distributions

Before extinction, a stochastically fluctuating population tends to hover near a **quasi-stationary distribution (QSD)** — the conditional distribution of population size given non-extinction. For the birth-death chain with states $\{0, 1, \ldots, N_\text{max}\}$ where $0$ is absorbing, the QSD $\mathbf{q}$ satisfies:

$$\mathbf{q} \mathbf{Q} = -\theta \mathbf{q}$$

where $\mathbf{Q}$ is the generator of the chain restricted to transient states and $\theta$ is the rate of absorption (extinction). From the QSD, the mean time to extinction is $\mathbb{E}[T_\text{ext}] = 1/\theta$.

| Population metric | Demographic stochasticity | Environmental stochasticity |
|---|---|---|
| Variance in $\Delta N$ | $\propto N$ | $\propto N^2$ |
| Dominant for | Small populations | Large populations |
| Persistence condition | $r > 0$ | $r > \sigma_e^2/2$ |
| $T_\text{ext}$ scaling | $\propto e^N$ | $\propto K^{2r/\sigma_e^2}$ |

## Moran Effect and Spatial Synchrony

Environmental stochasticity is often spatially correlated: all populations in a region experience similar weather. The **Moran effect** states that spatially separated populations with the same density dependence but correlated environmental noise will have abundance time series with cross-correlation equal to the environmental correlation. For two populations with correlated noise $\rho_\epsilon$:

$$\text{Corr}(N_1(t), N_2(t)) \approx \rho_\epsilon \cdot \frac{\sigma_e^2}{\sigma_e^2 + \sigma_d^2/\bar{N}}$$

Spatial synchrony amplifies regional extinction risk: if all subpopulations crash simultaneously, there are no sources for recolonization.
