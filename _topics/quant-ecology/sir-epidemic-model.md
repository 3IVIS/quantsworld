---
title: "SIR Epidemic Model"
field: quant-ecology
description: The SIR compartmental model partitions a population into Susceptible, Infected, and Recovered classes to describe epidemic spread through a basic system of ODEs.
intro: >
  The SIR model, formulated by Kermack and McKendrick in 1927, divides a population of fixed size $N$ into three compartments: Susceptible ($S$), Infected ($I$), and Recovered ($R$). Flow between compartments is governed by two parameters — the transmission rate $\beta$ and the recovery rate $\gamma$ — whose ratio defines the basic reproduction number $R_0$, the single most important quantity in epidemiology. Extensions to SEIR (adding an Exposed class), stochastic formulations, and age-structured networks have made the SIR framework central to public health decision-making.
math_concepts:
  - differential-equations
  - dynamical-systems
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## Compartment Structure and ODEs

The SIR model assumes a closed population of constant size $N = S + I + R$ with homogeneous mixing (every individual equally likely to contact every other). The governing ODEs are:

$$\dot{S} = -\frac{\beta S I}{N}$$

$$\dot{I} = \frac{\beta S I}{N} - \gamma I$$

$$\dot{R} = \gamma I$$

The term $\beta SI/N$ is the **mass action** incidence: $\beta$ is the transmission rate (contacts per unit time times probability of transmission per contact), and $I/N$ is the probability that a random contact is infectious. An alternative **standard incidence** formulation uses $\beta SI$ (density-dependent transmission, appropriate for non-mixing populations).

The parameter $\gamma$ is the recovery rate; the mean infectious period is $1/\gamma$. For COVID-19, $1/\gamma \approx 5$–10 days; for measles, $\approx 8$ days.

Since $\dot{S} + \dot{I} + \dot{R} = 0$, the total population is conserved. The system reduces to two independent equations (the equation for $R$ is redundant).

## Basic Reproduction Number $R_0$

The **basic reproduction number** $R_0$ is the expected number of secondary infections caused by a single infectious individual introduced into a fully susceptible population:

$$R_0 = \frac{\beta}{\gamma}$$

Epidemic growth or decline is governed by whether $R_0$ exceeds 1:

- $R_0 < 1$: $I(t)$ decreases monotonically; no epidemic.
- $R_0 = 1$: threshold case; epidemic stalls.
- $R_0 > 1$: epidemic grows initially (while $S/N \approx 1$).

The early exponential growth rate (Malthusian parameter) is:

$$r_0 = \beta - \gamma = \gamma(R_0 - 1)$$

so $I(t) \approx I_0 e^{r_0 t}$ initially, with doubling time $T_d = \ln 2 / r_0$.

| Disease | $R_0$ | $1/\gamma$ (days) |
|---------|-------|-------------------|
| Measles | 12–18 | 8 |
| Smallpox | 5–7 | 14 |
| Influenza (1918) | 2–3 | 4 |
| COVID-19 (original) | 2–3 | 5–10 |
| COVID-19 (Omicron) | 8–15 | 3–5 |

## Herd Immunity and Final Size

An epidemic subsides not because the pathogen disappears, but because susceptibles become depleted. As $S$ declines, the **effective reproduction number** falls:

$$R_\text{eff}(t) = R_0 \cdot \frac{S(t)}{N}$$

The epidemic peaks when $R_\text{eff} = 1$, i.e., when $S = N/R_0$. The fraction of the population that must be immune (either through infection or vaccination) to prevent epidemic spread is the **herd immunity threshold**:

$$p_c = 1 - \frac{1}{R_0}$$

For measles with $R_0 = 15$, $p_c \approx 0.93$; vaccination coverage must exceed 93% to prevent outbreaks.

The **final size** of the epidemic (total fraction ever infected, $R_\infty/N$) satisfies the implicit equation obtained by integrating $\dot{R}/\dot{S} = -\gamma/\beta = -1/R_0$:

$$\ln\!\frac{S(0)}{S(\infty)} = R_0\!\left(1 - \frac{S(\infty)}{N}\right)$$

For a fully susceptible initial population ($S(0) = N$), with $z = 1 - S(\infty)/N$ (final attack rate):

$$z = 1 - e^{-R_0 z}$$

This transcendental equation has a non-trivial solution for $R_0 > 1$. For $R_0 = 2$, numerically $z \approx 0.797$, meaning ~80% of the population is eventually infected.

## SEIR Extension: Latency Period

Many infections have a latent period $1/\sigma$ during which individuals are infected but not yet infectious. The SEIR model adds an Exposed compartment:

$$\dot{S} = -\frac{\beta SI}{N}$$

$$\dot{E} = \frac{\beta SI}{N} - \sigma E$$

$$\dot{I} = \sigma E - \gamma I$$

$$\dot{R} = \gamma I$$

The basic reproduction number remains $R_0 = \beta/\gamma$ (the latent period delays but does not alter ultimate spread). The initial growth rate satisfies the quadratic:

$$r_0^2 + (\sigma + \gamma)r_0 - \sigma\gamma(R_0 - 1) = 0$$

giving $r_0 = \frac{1}{2}\left[-(\sigma+\gamma) + \sqrt{(\sigma+\gamma)^2 + 4\sigma\gamma(R_0-1)}\right]$, which is smaller than the SIR growth rate for the same $R_0$, consistent with the flattening effect of latency.

For COVID-19, $1/\sigma \approx 4$–5 days (incubation) and $1/\gamma \approx 5$–8 days (infectious period).

## Stochastic SIR and Branching Process Approximation

The deterministic SIR ignores demographic randomness. In the **stochastic SIR** (continuous-time Markov chain), events are:

- Infection: $S \to S-1, I \to I+1$ at rate $\beta SI/N$
- Recovery: $I \to I-1, R \to R+1$ at rate $\gamma I$

For large $N$, the stochastic model approximates the ODE. But for small $I$ (near outbreak start or end), stochasticity matters crucially: the probability of **extinction before takeoff** is significant even when $R_0 > 1$.

When $I \ll N$ (early outbreak), $S \approx N$ and infections approximately follow a **Galton-Watson branching process**. Each infectious individual gives rise to a Poisson($R_0$) new cases. The probability of extinction $q$ satisfies:

$$q = G(q) = e^{R_0(q-1)}$$

For $R_0 \leq 1$, $q = 1$ (certain extinction). For $R_0 > 1$, extinction probability is $q < 1$, the smaller root of $q = e^{R_0(q-1)}$. For $R_0 = 2$, $q \approx 0.203$: about 20% of introductions self-extinguish stochastically.

The **critical slowing down** near $R_0 = 1$ makes the effective $R_0$ hard to estimate from early case counts. Confidence intervals around $R_0$ estimates are typically estimated via maximum likelihood from the exponential growth phase or via Bayesian inference using generation interval distributions.

## COVID-19 Application

During the COVID-19 pandemic, the SEIR framework was extended to include:

- Asymptomatic infectious compartments ($I_A$) with reduced $\beta$
- Hospitalization and ICU compartments for healthcare capacity planning
- Age-stratified contact matrices $\{c_{ij}\}$ from POLYMOD surveys
- Vaccination compartments with waning immunity

The effective reproduction number was estimated in near-real-time using the renewal equation:

$$R_t = \frac{I_t}{\sum_s I_{t-s} w_s}$$

where $w_s$ is the generation interval distribution (discretized). Methods such as EpiEstim (Cori et al. 2013) use a Bayesian gamma prior on $R_t$ and update with Poisson-distributed incidence data.

SEIR fits to UK data (March–April 2020) estimated $R_0 \approx 2.4$–3.1, falling to $R_t < 1$ within 2 weeks of the national lockdown (Ferguson et al. 2020, Imperial Report 9).
