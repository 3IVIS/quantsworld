---
title: "Life Tables"
field: actuarial-science
description: A systematic tabulation of mortality experience showing the probability of death and survival at each age, forming the foundation of actuarial calculations.
intro: >
  Life tables encode the mortality experience of a population into a compact set of age-indexed functions, enabling actuaries to price insurance, value annuities, and project pension liabilities. Starting from a radix cohort, successive decrements track how many lives survive to each age and the rates at which they die. Understanding both period and cohort tables, along with select-and-ultimate structures, is essential for any quantitative work in life insurance or pension mathematics.
math_concepts:
  - probability-theory
  - survival-analysis
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Core Life Table Functions

A life table begins with a **radix** $l_0$, conventionally set to 100,000, representing the initial cohort. All subsequent columns derive from this starting value together with the mortality rates.

The fundamental columns are:

| Symbol | Name | Definition |
|--------|------|-----------|
| $l_x$ | Lives at age $x$ | Number surviving to exact age $x$ |
| $d_x$ | Deaths in year | $d_x = l_x - l_{x+1}$ |
| $q_x$ | Annual mortality rate | $q_x = d_x / l_x$ |
| $p_x$ | Annual survival probability | $p_x = 1 - q_x = l_{x+1}/l_x$ |
| $L_x$ | Person-years lived | $L_x = \int_0^1 l_{x+t}\,dt \approx \tfrac{1}{2}(l_x + l_{x+1})$ |
| $T_x$ | Total person-years above $x$ | $T_x = \sum_{k=0}^{\infty} L_{x+k}$ |
| $e_x$ | Complete expectation of life | $e_x = T_x / l_x$ |

Multi-year survival probabilities extend naturally:

$$
{}_k p_x = \frac{l_{x+k}}{l_x} = p_x \cdot p_{x+1} \cdots p_{x+k-1}
$$

$$
{}_k q_x = 1 - {}_k p_x = \frac{l_x - l_{x+k}}{l_x}
$$

The deferred mortality probability — dying in year $[x+k, x+k+1)$ given alive at $x$ — is:

$$
{}_{k|} q_x = {}_k p_x \cdot q_{x+k} = \frac{d_{x+k}}{l_x}
$$

## Force of Mortality

The **force of mortality** $\mu_x$ is the instantaneous hazard rate of death, analogous to the hazard function in survival analysis. It is defined as:

$$
\mu_x = \lim_{h \to 0^+} \frac{{}_h q_x}{h} = -\frac{d}{dx} \ln l_x
$$

The connection between $\mu_x$ and the discrete functions is:

$$
{}_t p_x = \exp\!\left(-\int_0^t \mu_{x+s}\,ds\right)
$$

$$
q_x = 1 - \exp\!\left(-\int_0^1 \mu_{x+t}\,dt\right)
$$

Under the **constant force of mortality** assumption within each year of age, $\mu_{x+t} = \mu_x$ for $t \in [0,1)$, which gives:

$$
{}_t p_x = p_x^t, \quad t \in [0,1)
$$

Under the **uniform distribution of deaths (UDD)** assumption:

$$
{}_t q_x = t \cdot q_x, \quad {}_t p_x = 1 - t\,q_x
$$

which implies $\mu_{x+t} = q_x / (1 - t\,q_x)$, a force that increases over the year.

## Cohort vs Period Life Tables

A **cohort (generation) life table** follows an actual birth cohort through time, recording deaths as they occur year by year. Because it spans many decades, it captures the mortality improvements experienced by the cohort but requires long observation periods.

A **period life table** is constructed from the mortality rates observed across all ages in a single calendar year (or short interval). It answers the hypothetical question: "What would the lifetime distribution of a newborn be if today's age-specific mortality rates persisted forever?" Most published national life tables are period tables.

Key distinctions:

| Feature | Cohort Table | Period Table |
|---------|-------------|-------------|
| Data source | Single birth cohort over time | Cross-section of all ages |
| Reflects past improvements | Yes | No |
| Useful for projections | Directly | Requires trend adjustment |
| Example | England & Wales 1900 cohort | ONS 2018–2020 National Life Table |

**Projected (generational) life tables** blend period data with mortality improvement scales $AI_{x,t}$ to build future rates:

$$
q_x(t + s) = q_x(t) \cdot \prod_{j=0}^{s-1}(1 - AI_{x,t+j})
$$

## Gompertz–Makeham Mortality Law

The **Gompertz law** (1825) posits that the force of mortality increases geometrically with age:

$$
\mu_x = B\,c^x, \quad B > 0,\; c > 1
$$

The **Makeham extension** adds a constant background hazard $A$ representing accident risk:

$$
\mu_x = A + B\,c^x
$$

Integration gives the survival function:

$$
{}_t p_x = \exp\!\left(-At - \frac{Bc^x}{\ln c}(c^t - 1)\right)
$$

Typical parameter values for human mortality (English Life Table 15, males): $A = 0.0007$, $B = 5.88 \times 10^{-5}$, $c = 1.096$.

The log of $\mu_x - A$ is linear in $x$, providing a convenient diagnostic plot:

$$
\ln(\mu_x - A) = \ln B + x \ln c
$$

## Select and Ultimate Tables

**Select mortality** recognizes that recently underwritten lives have lower mortality than the general insured population — they have just passed a medical examination. A select-and-ultimate table has a two-dimensional structure $q_{[x]+t}$ where $[x]$ denotes the age at selection and $t$ is the time since selection.

After a **select period** of $s$ years, mortality reverts to the **ultimate** table:

$$
q_{[x]+s} = q_{x+s}^{\text{ult}}
$$

Example excerpt (select period = 2):

| Age at entry $[x]$ | $q_{[x]}$ | $q_{[x]+1}$ | $q_{[x]+2} = q_{x+2}^{\text{ult}}$ |
|---|---|---|---|
| 30 | 0.000362 | 0.000396 | 0.000430 |
| 31 | 0.000396 | 0.000434 | 0.000470 |
| 32 | 0.000432 | 0.000475 | 0.000512 |

Select tables are essential for pricing individual life insurance, where underwriting selection bias is significant. Group life and pension valuations typically use ultimate tables.

## Complete Expectation of Life

The **complete expectation of life** $\mathring{e}_x$ (continuous) is the expected future lifetime $T_x$ of a life aged $x$:

$$
\mathring{e}_x = E[T_x] = \int_0^{\infty} {}_t p_x\,dt = \frac{T_x^{\text{LT}}}{l_x}
$$

where $T_x^{\text{LT}} = \sum_{k=0}^{\infty} L_{x+k}$ is the total person-years column.

The **curtate expectation** $e_x$ counts only complete years:

$$
e_x = E[K_x] = \sum_{k=1}^{\infty} {}_k p_x = \sum_{k=0}^{\infty} \frac{l_{x+k+1}}{l_x}
$$

The relationship between them (under UDD) is:

$$
\mathring{e}_x \approx e_x + \tfrac{1}{2}
$$

The **variance of future lifetime** is:

$$
\text{Var}(T_x) = 2\int_0^{\infty} t \cdot {}_t p_x\,dt - (\mathring{e}_x)^2
$$

Recursive relations simplify computation:

$$
e_x = p_x(1 + e_{x+1}), \quad \mathring{e}_x = p_x\!\left(\tfrac{1}{2}\,q_x/(p_x) \cdot h + \mathring{e}_{x+1}\right) + \int_0^1 {}_t p_x\,dt
$$

with the simpler approximation $\mathring{e}_x \approx p_x(1 + \mathring{e}_{x+1}) + \frac{1}{2}q_x$.
