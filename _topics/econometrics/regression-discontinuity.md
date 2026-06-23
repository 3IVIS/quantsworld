---
title: "Regression Discontinuity Design"
field: econometrics
description: A quasi-experimental method that identifies causal effects by exploiting sharp discontinuities in treatment assignment driven by a continuous running variable crossing a known cutoff.
intro: >
  Regression discontinuity (RD) design exploits settings where treatment status is a deterministic function of whether a continuous "running variable" crosses a known threshold, creating a natural experiment at the cutoff. Units just above and just below the cutoff are assumed to be similar in all relevant characteristics except treatment status, so the jump in the outcome at the threshold identifies the local average treatment effect for units at the margin. The design's validity rests on the continuity of potential outcomes and the absence of precise manipulation of the running variable.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - numerical-methods
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Sharp RD: Setup and the Local Average Treatment Effect

In the **sharp RD design**, treatment is a deterministic step function of the running variable $X_i$:

$$D_i = \mathbf{1}[X_i \geq c]$$

where $c$ is the known cutoff. The potential outcomes framework posits $Y_i(0)$ and $Y_i(1)$ for control and treated outcomes. The observed outcome is $Y_i = D_i Y_i(1) + (1-D_i)Y_i(0)$.

The **sharp RD estimand** is the average treatment effect at the cutoff:

$$\tau_{\text{SRD}} = \mathbb{E}[Y_i(1) - Y_i(0) \mid X_i = c] = \lim_{x \downarrow c}\mathbb{E}[Y_i \mid X_i = x] - \lim_{x \uparrow c}\mathbb{E}[Y_i \mid X_i = x]$$

This is identified under the **continuity assumption**: the conditional expectations $\mathbb{E}[Y_i(0) \mid X_i = x]$ and $\mathbb{E}[Y_i(1) \mid X_i = x]$ are continuous in $x$ at $c$. Under continuity, any jump in $\mathbb{E}[Y_i \mid X_i = x]$ at $c$ must be caused by the treatment.

The continuity assumption is weaker than full random assignment: it only requires that units' potential outcomes do not jump discontinuously at the cutoff, not that $X_i$ itself is randomly assigned. Units with the same value of $X_i$ need not be exchangeable.

**Limitation:** The sharp RD identifies a local effect — the ATE only for units at $X_i = c$. External validity (extrapolation to other units or cutoffs) requires additional assumptions.

## Continuity Assumption and Bandwidth Selection

Estimation requires choosing a bandwidth $h$ that defines a local neighborhood $[c-h, c+h]$ around the cutoff. There is a fundamental bias-variance tradeoff:

- **Small $h$:** Few observations; high variance; low bias (local linearity is a better approximation).
- **Large $h$:** Many observations; low variance; high bias (misspecification of the regression function).

The **mean squared error** of the RD estimator (for local polynomial of degree $p$) decomposes as:

$$\text{MSE}(\hat{\tau}) = \text{Bias}^2(\hat{\tau}) + \text{Var}(\hat{\tau}) \asymp h^{2(p+1)} + \frac{1}{nh}$$

Minimizing over $h$ gives the MSE-optimal bandwidth:

$$h^* \asymp n^{-1/(2p+3)}$$

For $p=1$ (local linear): $h^* \asymp n^{-1/5}$. The **Imbens-Kalyanaraman (IK)** and **Calonico-Cattaneo-Titiunik (CCT)** data-driven bandwidth selectors implement feasible versions of this formula, using pilot estimates of the bias and variance. The CCT bandwidth also accounts for the regularization needed to construct valid confidence intervals via robust bias correction.

## Local Polynomial Regression

The standard estimation approach fits separate polynomials of degree $p$ on each side of the cutoff, using only observations within bandwidth $h$:

$$\hat{\mu}_+(x) = \hat{\alpha}_0^+ + \hat{\alpha}_1^+(x-c) + \ldots + \hat{\alpha}_p^+(x-c)^p$$
$$\hat{\mu}_-(x) = \hat{\alpha}_0^- + \hat{\alpha}_1^-(x-c) + \ldots + \hat{\alpha}_p^-(x-c)^p$$

The sharp RD estimate is $\hat{\tau} = \hat{\alpha}_0^+ - \hat{\alpha}_0^-$, the difference in intercepts at $x = c$. Observations are typically weighted by a **kernel** $K((X_i - c)/h)$ that down-weights units farther from the cutoff. Common kernels:

| Kernel | $K(u)$ for $|u| \leq 1$ | Boundary efficiency |
|--------|--------------------------|---------------------|
| Uniform | $\frac{1}{2}$ | 1.000 |
| Triangular | $1 - |u|$ | 1.368 |
| Epanechnikov | $\frac{3}{4}(1-u^2)$ | 1.253 |

The triangular kernel is **MSE-optimal** at boundary points (the RD estimator is a boundary regression problem) and is the recommended default.

**Local linear vs. higher order:** Local linear ($p=1$) is generally preferred over higher-degree polynomials because higher degrees amplify noise and are sensitive to boundary effects. Gelman and Imbens (2019) specifically warn against high-degree global polynomials, which can produce spurious discontinuities.

## McCrary Density Test for Manipulation

A key threat to RD validity is **manipulation**: if units can precisely control their value of $X_i$ relative to the cutoff, then units just above and below $c$ are systematically different. For example, students who just miss a scholarship cutoff may retake a test, selectively appearing just above the cutoff.

The **McCrary density test** tests for a discontinuity in the density of $X_i$ at $c$. Under no manipulation, the density $f(x)$ of the running variable should be continuous at $c$:

$$H_0: \lim_{x \downarrow c} f(x) = \lim_{x \uparrow c} f(x)$$

The test estimates $f(x)$ on each side of the cutoff using a local linear density estimator (equivalently, a bin estimator with local linear smoothing) and tests the null using a standard $t$-test on the estimated density discontinuity. The **rddensity** package implements the improved Cattaneo-Jansson-Ma version with valid confidence intervals.

Complementary validity checks include:
- **Covariate smoothness:** Plot and formally test that pre-determined covariates $W_i$ (baseline characteristics determined before treatment) are continuous at the cutoff.
- **Placebo cutoffs:** Estimate the RD at other values $c' \neq c$; estimates should be near zero.
- **Donut RD:** Exclude observations very close to the cutoff and check robustness.

## Fuzzy RD and Connection to IV

In the **fuzzy RD design**, treatment probability jumps discontinuously at $c$ but does not go from 0 to 1:

$$\lim_{x \downarrow c} \Pr(D_i = 1 \mid X_i = x) \neq \lim_{x \uparrow c} \Pr(D_i = 1 \mid X_i = x)$$

The cutoff acts like an instrument — it affects treatment probability but (by continuity) has no direct effect on the outcome. The **fuzzy RD estimand** is:

$$\tau_{\text{FRD}} = \frac{\lim_{x \downarrow c}\mathbb{E}[Y_i \mid X_i = x] - \lim_{x \uparrow c}\mathbb{E}[Y_i \mid X_i = x]}{\lim_{x \downarrow c}\Pr(D_i=1 \mid X_i=x) - \lim_{x \uparrow c}\Pr(D_i=1 \mid X_i=x)}$$

This is a Wald-type ratio — the reduced-form jump in the outcome divided by the first-stage jump in treatment probability. Under monotonicity (the cutoff weakly increases everyone's probability of treatment), $\tau_{\text{FRD}}$ identifies the LATE for **compliers** at the cutoff — those induced to take treatment by crossing the threshold.

**Estimation:** Run two-stage local linear regressions. First stage: regress $D_i$ on $(1, X_i - c, D_i^{\text{rule}}, D_i^{\text{rule}} \cdot (X_i - c))$ within bandwidth $h$, where $D_i^{\text{rule}} = \mathbf{1}[X_i \geq c]$. Reduced form: regress $Y_i$ on the same set. The fuzzy RD estimate is the ratio of the two intercept jumps.

## Graphical Validation and Multi-Cutoff RD

**Graphical presentation** is central to RD analysis — a plot of binned means of $Y_i$ against $X_i$ near the cutoff provides an immediate visual test of the design. Best practices:

1. Use the **IMSE-optimal number of bins** (Cattaneo, Idrobo, Titiunik), which balances bias in approximating the conditional expectation against variance.
2. Overlay the local polynomial fit separately on each side of the cutoff.
3. Present a companion density plot to visualize the McCrary test.
4. Show covariate smoothness plots alongside the main outcome.

**Multi-cutoff RD** arises when different units face different cutoffs $c_i$. For example, class-size rules may vary by school district. Several aggregation strategies exist:

- **Normalized RD:** Re-center each unit's running variable as $\tilde{X}_i = X_i - c_i$ and pool all units. The pooled estimate identifies an average of unit-specific local effects.
- **Cutoff-by-cutoff analysis:** Estimate $\tau(c)$ separately at each cutoff $c$ and aggregate as a weighted average $\bar{\tau} = \sum_c w_c \hat{\tau}(c)$, where weights $w_c \propto n_c$ (number of observations near cutoff $c$).

Multi-cutoff designs also enable specification tests: the treatment effect $\tau(c)$ can be plotted against $c$ to check for systematic variation that may indicate effect heterogeneity or manipulation specific to certain cutoffs.
