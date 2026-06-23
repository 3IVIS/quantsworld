---
title: "Loss Models"
field: actuarial-science
description: Mathematical models for insurance claim frequency and severity, culminating in aggregate loss distributions used for pricing, reserving, and capital modeling.
intro: >
  Loss modeling sits at the heart of non-life (property and casualty) insurance mathematics. Actuaries model claim counts with frequency distributions and individual claim sizes with severity distributions, then combine them into an aggregate loss distribution for the portfolio. Techniques range from the elegant Panjer recursion for exact computation to stop-loss premiums and risk measures for capital adequacy. Understanding these tools is essential for pricing, reserving, and Solvency II internal model work.
math_concepts:
  - probability-theory
  - random-processes
  - numerical-methods
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Severity Distributions

The **severity** (individual loss size) $X$ is modeled by heavy-tailed distributions that capture the possibility of large claims.

**Lognormal**: If $\ln X \sim N(\mu, \sigma^2)$ then:

$$
f_X(x) = \frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x - \mu)^2}{2\sigma^2}\right), \quad x > 0
$$

$$
E[X] = e^{\mu + \sigma^2/2}, \quad \text{Var}(X) = e^{2\mu+\sigma^2}(e^{\sigma^2}-1)
$$

**Pareto (single-parameter)**: $F(x) = 1 - (\theta/(\theta+x))^\alpha$. The mean excess loss $e(d) = E[X-d \mid X>d]$ is linear in $d$:

$$
e(d) = \frac{\theta + d}{\alpha - 1}, \quad \alpha > 1
$$

making the Pareto the canonical heavy-tailed severity model.

**Gamma**: Shape $\alpha$, rate $\beta$. Closed under convolution for equal-rate gammas: sum of $n$ independent $\text{Gamma}(\alpha_i, \beta)$ is $\text{Gamma}(\sum \alpha_i, \beta)$.

**Weibull**: $F(x) = 1 - e^{-(x/\theta)^\tau}$. For $\tau < 1$ the hazard decreases (light-tailed); for $\tau > 1$ it increases. At $\tau = 1$, exponential.

| Distribution | Tail behavior | Mean excess | Typical use |
|---|---|---|---|
| Lognormal | Moderate heavy | Increasing | General property |
| Pareto | Heavy (power) | Linear in $d$ | Large liability |
| Gamma | Light-medium | Decreasing | Workers' comp |
| Weibull | Flexible | Varies | Reliability, WC |

## Frequency Distributions and the (a, b, 0) Class

The **frequency** $N$ (number of claims) follows a counting distribution. The **$(a, b, 0)$ class** satisfies the recursion:

$$
\frac{p_k}{p_{k-1}} = a + \frac{b}{k}, \quad k = 1, 2, 3, \ldots
$$

This single recursion generates three canonical distributions:

| Distribution | $a$ | $b$ | $p_0$ |
|---|---|---|---|
| Poisson($\lambda$) | $0$ | $\lambda$ | $e^{-\lambda}$ |
| Negative Binomial($r, p$) | $1-p$ | $(r-1)(1-p)$ | $p^r$ |
| Binomial($m, q$) | $-q/(1-q)$ | $(m+1)q/(1-q)$ | $(1-q)^m$ |

The **Poisson** is the default model ($\text{Var}(N) = E[N]$). The **Negative Binomial** handles **overdispersion** ($\text{Var}(N) > E[N]$), while the **Binomial** handles underdispersion. Zero-modified and zero-truncated variants extend coverage to portfolios with excess zeros.

## Compound Distributions and the Panjer Recursion

The **aggregate loss** for a portfolio is:

$$
S = X_1 + X_2 + \cdots + X_N = \sum_{i=1}^{N} X_i
$$

where $N$ is the claim count (frequency) and $X_i$ are i.i.d. severities independent of $N$. The mean and variance are:

$$
E[S] = E[N]\,E[X], \quad \text{Var}(S) = E[N]\,\text{Var}(X) + \text{Var}(N)\,(E[X])^2
$$

For discrete severities (or after discretization), the **Panjer recursion** computes the aggregate distribution exactly:

$$
f_S(s) = \frac{1}{1 - a\,f_X(0)} \sum_{x=1}^{s} \left(a + \frac{bx}{s}\right) f_X(x)\, f_S(s-x), \quad s = 1, 2, \ldots
$$

with $f_S(0) = p_N(0)$ if $f_X(0) = 0$, or more generally:

$$
f_S(0) = P_N(f_X(0))
$$

where $P_N$ is the probability generating function of $N$. The Panjer recursion is $O(n^2)$ in the number of discretization points — far more efficient than direct convolution or Fast Fourier Transform for moderate-sized loss ranges, though FFT wins for very large grids.

## Stop-Loss Premiums and the Limited Expected Value

The **stop-loss premium** with retention $d$ (also called the **net stop-loss premium**) is the pure premium for excess-of-loss reinsurance:

$$
\pi(d) = E[\max(S - d, 0)] = E[(S-d)_+] = \int_d^{\infty} (s-d)\,f_S(s)\,ds
$$

It can be rewritten as:

$$
\pi(d) = E[S] - d + \int_0^d F_S(s)\,ds = E[S] - d + \int_0^d F_S(s)\,ds
$$

or equivalently $\pi(d) = E[S] - E[\min(S, d)]$ where $E[\min(S,d)]$ is the **limited expected value**:

$$
E[X \wedge d] = \int_0^d [1 - F_X(x)]\,dx = E[X] - \pi(d)
$$

For the Pareto($\alpha$, $\theta$) severity:

$$
E[X \wedge d] = \frac{\theta}{\alpha-1}\left[1 - \left(\frac{\theta}{\theta+d}\right)^{\alpha-1}\right], \quad \alpha > 1
$$

The **excess loss variable** (residual life) given the loss exceeds $d$ is:

$$
Y = X - d \mid X > d, \quad E[Y] = \frac{E[(X-d)_+]}{1 - F_X(d)} = e(d)
$$

For exponential $X \sim \text{Exp}(\theta)$, $e(d) = \theta$ for all $d$ (memoryless property); for Pareto, $e(d) = (\theta+d)/(\alpha-1)$, linear and increasing.

## Risk Measures for Insurance

The **Value-at-Risk** at confidence level $p$ is the $p$-quantile of aggregate losses:

$$
\text{VaR}_p(S) = F_S^{-1}(p) = \inf\{s : F_S(s) \ge p\}
$$

For Solvency II, $p = 99.5\%$ over a one-year horizon defines the **Solvency Capital Requirement (SCR)**.

The **Conditional Value-at-Risk** (CVaR, also called TVaR or ES) averages losses above VaR:

$$
\text{CVaR}_p(S) = E[S \mid S > \text{VaR}_p(S)] = \frac{1}{1-p}\int_p^1 \text{VaR}_u(S)\,du
$$

For a continuous distribution:

$$
\text{CVaR}_p(S) = \text{VaR}_p(S) + \frac{\pi(\text{VaR}_p(S))}{1-p}
$$

where $\pi(\cdot)$ is the stop-loss premium. CVaR is **coherent** (satisfies subadditivity, monotonicity, translation invariance, positive homogeneity) while VaR is not in general.

| Risk measure | Formula | Coherent? | Solvency II use |
|---|---|---|---|
| VaR$_{99.5\%}$ | $F_S^{-1}(0.995)$ | No | SCR standard formula |
| CVaR$_{99\%}$ | $E[S\mid S > \text{VaR}_{99\%}]$ | Yes | Internal models |
| Standard deviation | $E[S] + \lambda\,\text{SD}(S)$ | No | Simple pricing loads |
