---
title: "Survival Models in Actuarial Science"
field: actuarial-science
description: Probabilistic models for the future lifetime of individuals and groups, including joint life, multiple decrement, and copula-based dependent mortality models used in pension and life insurance valuation.
intro: >
  Survival models generalize the life table into a continuous probabilistic framework, allowing actuaries to work with the future lifetime random variable and its associated hazard structure. Beyond the individual life, actuarial practice demands models for joint lives (couples in pension funds), competing risks (disability, death, lapse), and the correlation structure between lifetimes. The mathematics draws on survival analysis, differential equations, and copula theory to produce tractable models for pension valuation, longevity risk, and dependent benefit structures.
math_concepts:
  - probability-theory
  - survival-analysis
  - differential-equations
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Future Lifetime Random Variable

For a life aged exactly $x$, the **future lifetime** $T_x$ is a non-negative random variable. Its distribution is characterized by the **survival function**:

$$
{}_t p_x = P(T_x > t) = S_x(t) = \frac{l_{x+t}}{l_x}
$$

The **probability density function** of $T_x$ is:

$$
f_{T_x}(t) = -\frac{d}{dt}\,S_x(t) = {}_t p_x \cdot \mu_{x+t}
$$

The **hazard rate** (force of mortality) is:

$$
\mu_{x+t} = -\frac{d}{dt}\ln S_x(t) = \frac{f_{T_x}(t)}{S_x(t)}
$$

The **moments** of future lifetime:

$$
E[T_x] = \int_0^\infty {}_t p_x\,dt = \mathring{e}_x
$$

$$
E[T_x^2] = 2\int_0^\infty t\cdot{}_t p_x\,dt
$$

$$
\text{Var}(T_x) = E[T_x^2] - (\mathring{e}_x)^2
$$

The **curtate future lifetime** $K_x = \lfloor T_x \rfloor$ (complete years before death) has:

$$
P(K_x = k) = {}_k p_x \cdot q_{x+k}, \quad k = 0, 1, 2, \ldots
$$

## Gompertz-Makeham and Parametric Laws

The **Gompertz law** $\mu_x = Bc^x$ gives survival function:

$$
{}_t p_x = \exp\!\left(-\frac{Bc^x(c^t - 1)}{\ln c}\right) = s^{(c^x(c^t - 1))}
$$

where $s = e^{-B/\ln c}$.

The **Makeham law** $\mu_x = A + Bc^x$ adds a constant hazard:

$$
{}_t p_x = e^{-At} \cdot s^{c^x(c^t-1)}
$$

The **Perks law** $\mu_x = (A + Bc^x)/(1 + Dc^x)$ allows for a leveling-off at very old ages (mortality plateau), consistent with observed supercentenarian data.

**Weibull hazard**: $\mu_x = k x^{n-1}$ gives Weibull survival, useful for disability onset modeling.

| Law | $\mu_x$ | Behavior | Use |
|---|---|---|---|
| Gompertz | $Bc^x$ | Exponential increase | Adult mortality |
| Makeham | $A + Bc^x$ | Constant + exponential | Standard tables |
| Perks | $(A+Bc^x)/(1+Dc^x)$ | Plateau at high ages | Oldest-old |
| Weibull | $kx^{n-1}$ | Power-law | Disability |

## Select-and-Ultimate Mortality

**Select mortality** arises because underwriting selects healthier lives. The **select period** $s$ is the number of years after selection during which mortality remains lower than the population average.

The two-dimensional hazard $\mu_{[x]+t}$ satisfies:

$$
\mu_{[x]+t} \le \mu_{x+t}^{\text{ult}} \quad \text{for } t < s
$$
$$
\mu_{[x]+t} = \mu_{x+t}^{\text{ult}} \quad \text{for } t \ge s
$$

The survival function for a life selected at age $x$:

$$
{}_t p_{[x]} = \exp\!\left(-\int_0^t \mu_{[x]+r}\,dr\right)
$$

In pension valuation, select tables matter when new entrants receive enhanced mortality assumptions that grade into standard mortality over a select period of 5-10 years.

## Joint Life and Last Survivor

For two lives aged $x$ and $y$, define joint lifetimes $T_x$ and $T_y$ (possibly dependent). The **joint-life status** fails at the first death; the **last-survivor status** fails at the second death.

Under independence:

$$
{}_t p_{xy} = P(T_x > t, T_y > t) = {}_t p_x \cdot {}_t p_y
$$

$$
{}_t p_{\overline{xy}} = P(\max(T_x, T_y) > t) = {}_t p_x + {}_t p_y - {}_t p_{xy}
$$

Actuarial present values for joint lives:

$$
A_{xy} = \sum_{k=0}^\infty v^{k+1}\,{}_k p_{xy}\,q_{x+k:y+k} \quad \text{(joint-life)}
$$

$$
A_{\overline{xy}} = A_x + A_y - A_{xy} \quad \text{(last-survivor)}
$$

The **reversionary annuity** pays while $y$ is alive but $x$ is dead:

$$
a_{y|x} = a_y - a_{xy}
$$

This is essential for spouse's pension benefits in defined benefit pension schemes.

## Dependent Lives via Copulas

Independence between spouses' lifetimes is unrealistic due to **common shock** (simultaneous death, e.g., accident) and **broken heart syndrome** (grief-induced mortality increase). The **copula approach** models the joint survival function:

$$
{}_t p_{xy}^{\text{joint}} = C({}_t p_x, {}_t p_y; \alpha)
$$

where $C: [0,1]^2 \to [0,1]$ is a copula with dependence parameter $\alpha$.

**Common copula families for joint lifetimes:**

| Copula | $C(u,v)$ | Dependence |
|---|---|---|
| Frank | $-\frac{1}{\alpha}\ln\!\left(1+\frac{(e^{-\alpha u}-1)(e^{-\alpha v}-1)}{e^{-\alpha}-1}\right)$ | Symmetric |
| Clayton | $(\max(u^{-\alpha}+v^{-\alpha}-1,0))^{-1/\alpha}$ | Lower tail |
| Gumbel | $\exp(-[(-\ln u)^\alpha+(-\ln v)^\alpha]^{1/\alpha})$ | Upper tail |

Kendall's $\tau$ (rank correlation) measures dependence; for Clayton: $\tau = \alpha/(\alpha+2)$.

Studies of married couples (Frees et al., 1996) found $\tau \approx 0.21$ for joint mortality, with Clayton copulas fitting better than Gaussian copulas (evidence of lower-tail dependence — simultaneous early death).

## Multiple Decrement Tables

A **multiple decrement model** tracks a life subject to several competing causes of exit (decrements). For decrements $j = 1, \ldots, m$:

$$
\mu_x^{(j)} = \text{cause-}j\text{ hazard (force of decrement)}
$$

$$
\mu_x^{(\tau)} = \sum_{j=1}^m \mu_x^{(j)} \quad\text{(total force)}
$$

$$
{}_t p_x^{(\tau)} = \exp\!\left(-\int_0^t \mu_{x+s}^{(\tau)}\,ds\right) \quad\text{(probability of remaining)}
$$

The probability of exiting by cause $j$ between ages $x$ and $x+t$:

$$
{}_t q_x^{(j)} = \int_0^t {}_s p_x^{(\tau)}\,\mu_{x+s}^{(j)}\,ds
$$

**Example — pension fund decrements**: Death ($j=1$), ill-health retirement ($j=2$), withdrawal ($j=3$), normal retirement ($j=4$). The actuary must value the benefit payable under each decrement separately:

$$
\text{APV} = \sum_{j=1}^4 \int_0^{n} v^t\,{}_t p_x^{(\tau)}\,\mu_{x+t}^{(j)}\,b_j(t)\,dt
$$

where $b_j(t)$ is the benefit payable on exit by cause $j$ at time $t$.

**Associated single-decrement tables**: Under the assumption of independence between decrements (i.e., each cause operates as if it were the only one), the single-decrement probability $q_x^{\prime(j)}$ (in the absence of other decrements) relates to the multiple decrement table by:

$$
q_x^{(j)} \approx q_x^{\prime(j)}\left(1 - \tfrac{1}{2}\sum_{k \ne j}q_x^{\prime(k)} + \tfrac{1}{3}\sum_{k\ne j}\sum_{l\ne j,l\ne k}q_x^{\prime(k)}q_x^{\prime(l)} - \ldots\right)
$$

Under UDD in the associated single-decrement tables, this simplifies to:

$$
q_x^{(j)} \approx q_x^{\prime(j)}\left(1 - \tfrac{1}{2}\sum_{k\ne j}q_x^{\prime(k)}\right)
$$
