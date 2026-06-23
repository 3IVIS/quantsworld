---
title: Difference-in-Differences
field: econometrics
description: Estimating treatment effects using panel data. The go-to design for policy evaluation.
intro: >
  Difference-in-Differences (DiD) is a quasi-experimental method for estimating causal effects
  when random assignment is not possible. By comparing trends between a treated and a control group,
  it removes time-invariant confounders and common time trends.
math_concepts:
  - hypothesis-testing
  - linear-algebra
difficulty: intermediate
difficulty_level: 3
read_time: 7
---

## The canonical two-period design

Consider two groups (treated $T$, control $C$) and two periods (pre $t=0$, post $t=1$).
The DiD estimator is:

$$\hat{\tau}_{DiD} = \underbrace{(\bar{y}_{T,1} - \bar{y}_{T,0})}_{\text{change in treated}} - \underbrace{(\bar{y}_{C,1} - \bar{y}_{C,0})}_{\text{change in control}}$$

Equivalently, run the OLS regression:

$$y_{it} = \alpha + \gamma T_i + \lambda \text{Post}_t + \tau\, (T_i \times \text{Post}_t) + \varepsilon_{it}$$

The coefficient $\tau$ is the Average Treatment Effect on the Treated (ATT).

## The parallel trends assumption

DiD identifies $\tau$ under the **parallel trends assumption**: in the absence of treatment, the treated group would have followed the same trend as the control group.

$$\mathbb{E}[Y_{it}(0) - Y_{i,t-1}(0) \mid T_i = 1] = \mathbb{E}[Y_{it}(0) - Y_{i,t-1}(0) \mid T_i = 0]$$

This is **not testable** in the post period but can be assessed with pre-treatment placebo tests.

## Staggered adoption

In modern DiD settings, units receive treatment at different times. The "two-way fixed effects" (TWFE) estimator is biased in this case — it implicitly uses already-treated units as controls. Use Callaway–Sant'Anna or Sun–Abraham estimators instead.
