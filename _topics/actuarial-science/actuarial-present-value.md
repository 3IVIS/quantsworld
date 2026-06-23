---
title: "Actuarial Present Value"
field: actuarial-science
description: The probability-weighted present value of future insurance benefits or annuity payments, combining mortality probabilities with financial discounting.
intro: >
  Actuarial present value (APV) is the cornerstone of life insurance pricing and reserving: it combines the time value of money with the uncertainty of survival to produce a single fair value for a stream of contingent cash flows. Whether pricing a term policy, valuing a pension annuity, or calculating the net premium for an endowment, every calculation reduces to an expectation of discounted payments over a life table. Mastery of APV—and the commutation functions that speed its computation—is the foundation of classical actuarial mathematics.
math_concepts:
  - probability-theory
  - survival-analysis
difficulty: intermediate
difficulty_level: 3
read_time: 11
---

## Discount Functions and Interest Notation

Let $i$ denote the effective annual interest rate and $v = 1/(1+i)$ the annual discount factor. In continuous time, the **force of interest** $\delta$ satisfies $e^\delta = 1 + i$, so $v = e^{-\delta}$.

Key relationships:

$$
d = 1 - v = \frac{i}{1+i}, \quad \delta = \ln(1+i), \quad v = e^{-\delta}
$$

For a payment of 1 due in $k$ years: present value $= v^k = (1+i)^{-k}$.

## Whole Life Insurance

The **whole life insurance** pays 1 at the end of the year of death. If $K_x$ is the curtate future lifetime (integer years), the present value of the benefit is the random variable $v^{K_x+1}$.

The **Actuarial Present Value** (net single premium) is:

$$
A_x = E\!\left[v^{K_x+1}\right] = \sum_{k=0}^{\infty} v^{k+1} \cdot {}_k p_x \cdot q_{x+k} = \sum_{k=0}^{\infty} v^{k+1} \cdot {}_{k|}q_x
$$

The **second moment** and variance are:

$$
{}^2A_x = \sum_{k=0}^{\infty} v^{2(k+1)} \cdot {}_{k|}q_x \quad\text{(evaluated at } 2i + i^2\text{)}
$$

$$
\text{Var}\!\left(v^{K_x+1}\right) = {}^2A_x - A_x^2
$$

The **continuous** whole life APV uses the future lifetime $T_x$ and pays at the moment of death:

$$
\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^{\infty} e^{-\delta t} \cdot {}_t p_x \cdot \mu_{x+t}\,dt
$$

Under constant force of mortality $\mu$ and force of interest $\delta$:

$$
\bar{A}_x = \frac{\mu}{\mu + \delta}
$$

## Term, Endowment, and Pure Endowment

**$n$-year term insurance** pays 1 if death occurs within $n$ years:

$$
A^1_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^{k+1} \cdot {}_{k|}q_x
$$

**Pure endowment** pays 1 if the life survives $n$ years (no benefit on death):

$$
{}_n E_x = A_{x:\overline{n}|}^{\;\;1} = v^n \cdot {}_n p_x
$$

**$n$-year endowment insurance** pays 1 at death or at maturity, whichever is first:

$$
A_{x:\overline{n}|} = A^1_{x:\overline{n}|} + {}_n E_x
$$

This decomposition shows that an endowment is simply the sum of term insurance and a pure endowment. Numerically, since $A_{x:\overline{n}|} \le 1$ always, endowment premiums can be large for short terms.

## Life Annuities

A **whole life annuity-due** pays 1 at the start of each year the insured is alive:

$$
\ddot{a}_x = \sum_{k=0}^{\infty} v^k \cdot {}_k p_x = \frac{1 - A_x}{d}
$$

The identity $A_x + d\,\ddot{a}_x = 1$ — meaning the present value of premiums plus the present value of the insurance sum to the certain payment of 1 — is the fundamental equation of life insurance.

A **whole life annuity-immediate** delays each payment by one year:

$$
a_x = \ddot{a}_x - 1 = \sum_{k=1}^{\infty} v^k \cdot {}_k p_x
$$

**$n$-year temporary annuity**:

$$
\ddot{a}_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^k \cdot {}_k p_x = \frac{1 - A_{x:\overline{n}|}}{d}
$$

**Continuous annuity**:

$$
\bar{a}_x = \int_0^{\infty} e^{-\delta t} \cdot {}_t p_x\,dt = \frac{1 - \bar{A}_x}{\delta}
$$

Under constant $\mu$ and $\delta$: $\bar{a}_x = 1/(\mu + \delta)$, confirming the identity $\bar{A}_x + \delta\,\bar{a}_x = 1$.

## Commutation Functions

**Commutation functions** were developed before electronic computers to reduce repeated life table calculations to table lookups. Define:

$$
D_x = v^x \cdot l_x, \quad N_x = \sum_{k=0}^{\infty} D_{x+k}, \quad C_x = v^{x+1} \cdot d_x, \quad M_x = \sum_{k=0}^{\infty} C_{x+k}
$$

Key formulae expressed using commutation functions:

| Actuarial quantity | Commutation formula |
|---|---|
| $A_x$ | $M_x / D_x$ |
| $A^1_{x:\overline{n}|}$ | $(M_x - M_{x+n}) / D_x$ |
| ${}_n E_x$ | $D_{x+n} / D_x$ |
| $A_{x:\overline{n}|}$ | $(M_x - M_{x+n} + D_{x+n}) / D_x$ |
| $\ddot{a}_x$ | $N_x / D_x$ |
| $\ddot{a}_{x:\overline{n}|}$ | $(N_x - N_{x+n}) / D_x$ |

These identities follow directly from the definitions. For instance:

$$
A_x = \sum_{k=0}^\infty v^{k+1} d_{x+k} = \sum_{k=0}^\infty \frac{v^{x+k+1} d_{x+k}}{v^x l_x} = \frac{\sum_{k=0}^\infty C_{x+k}}{D_x} = \frac{M_x}{D_x}
$$

## Premium Calculation Principles

The **equivalence principle** sets the net annual premium $P$ so that the APV of premiums equals the APV of benefits:

$$
P \cdot \ddot{a}_{x:\overline{n}|} = A_{x:\overline{n}|}^1 \implies P = \frac{A_{x:\overline{n}|}^1}{\ddot{a}_{x:\overline{n}|}}
$$

For a whole life policy with annual premiums:

$$
P_x = \frac{A_x}{\ddot{a}_x} = \frac{A_x \cdot d}{1 - A_x}
$$

This can be rewritten as $P_x = 1/\ddot{a}_x - d$, highlighting that the premium covers both the "rental" of the death benefit and the cost of the annuity discount.

The **prospective reserve** at time $t$ is the difference between the APV of future benefits and future premiums:

$$
{}_t V_x = A_{x+t} - P_x \cdot \ddot{a}_{x+t}
$$

**Thiele's differential equation** (continuous form) governs the reserve process:

$$
\frac{d}{dt}({}_t\bar{V}) = \delta \cdot {}_t\bar{V} + P - \mu_{x+t}(b_t - {}_t\bar{V})
$$

where $b_t$ is the death benefit at time $t$. This first-order ODE, solved backward from the terminal condition ${}_n\bar{V} = 0$ (or the endowment sum), provides a continuous model of reserve accumulation.
