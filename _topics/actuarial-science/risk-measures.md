---
title: "Risk Measures in Actuarial Science"
field: actuarial-science
description: Quantitative tools for summarizing the risk profile of a loss distribution, including VaR, TVaR, coherent measures, and distortion risk measures used in insurance regulation.
intro: >
  Risk measures map random loss variables to real numbers, providing a basis for capital allocation, pricing risk loads, and regulatory reporting. The axiomatic approach of Artzner et al. (1999) established coherence as the gold standard, exposing the theoretical deficiency of Value-at-Risk while motivating Tail Value-at-Risk as its coherent replacement. Insurance regulators—from the Swiss Solvency Test to Solvency II—have embedded these ideas into capital frameworks, making risk measure theory as practically important as it is mathematically elegant.
math_concepts:
  - probability-theory
  - optimization
  - measure-theory
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Value-at-Risk

**Value-at-Risk** at confidence level $p \in (0,1)$ is the $p$-quantile of the loss distribution $F_L$:

$$
\text{VaR}_p(L) = F_L^{-1}(p) = \inf\{l : F_L(l) \ge p\}
$$

For continuous distributions, this is the unique value satisfying $P(L \le \text{VaR}_p) = p$.

**Properties:**
- Easy to compute and explain
- Widely used: Solvency II SCR at $p = 99.5\%$, Basel III at $p = 99\%$ (10-day)
- **Not subadditive** in general: $\text{VaR}_p(L_1 + L_2)$ can exceed $\text{VaR}_p(L_1) + \text{VaR}_p(L_2)$

**Counterexample to subadditivity**: Let $L_1, L_2$ be independent Pareto($\alpha = 1.1$, $\theta = 1$). Each has $\text{VaR}_{99\%}(L_i) \approx 99$. But $\text{VaR}_{99\%}(L_1 + L_2) > 198$ for heavy enough tails because the joint tail is concentrated.

For a Normal loss, VaR is coherent (Normal is subadditive), which is why VaR is adequate for market risk models dominated by Gaussian assumptions but fails for fat-tailed insurance losses.

## Tail Value-at-Risk (TVaR / CVaR / ES)

The **Tail Value-at-Risk** averages all VaR values above the threshold:

$$
\text{TVaR}_p(L) = \frac{1}{1-p}\int_p^1 \text{VaR}_u(L)\,du
$$

For continuous distributions, this equals the **Conditional Value-at-Risk**:

$$
\text{CVaR}_p(L) = E[L \mid L > \text{VaR}_p(L)]
$$

but for discrete/mixed distributions the two can differ. The more general **Expected Shortfall** (ES) uses the TVaR integral definition.

The TVaR can be expressed in terms of the stop-loss premium $\pi(d) = E[(L-d)_+]$:

$$
\text{TVaR}_p(L) = \text{VaR}_p(L) + \frac{\pi(\text{VaR}_p(L))}{1 - p}
$$

For common distributions:

| Distribution | $\text{TVaR}_p$ |
|---|---|
| Normal($\mu, \sigma^2$) | $\mu + \sigma\,\phi(z_p)/(1-p)$ |
| Lognormal($\mu, \sigma^2$) | $e^{\mu + \sigma^2/2}\Phi(\sigma - z_p)/(1-p)$ |
| Exponential($\theta$) | $\text{VaR}_p + \theta$ |
| Pareto($\alpha, \theta$) | $\text{VaR}_p \cdot \alpha/(\alpha - 1)$ |

where $\phi$ and $\Phi$ are the standard Normal pdf and cdf, and $z_p = \Phi^{-1}(p)$.

## Coherent Risk Measures: Artzner Axioms

A risk measure $\rho: \mathcal{L} \to \mathbb{R}$ is **coherent** if it satisfies four axioms for all losses $L, L_1, L_2 \in \mathcal{L}$ and constant $c$:

1. **Translation invariance**: $\rho(L + c) = \rho(L) + c$. Adding a certain loss increases required capital by exactly that amount.

2. **Monotonicity**: If $L_1 \le L_2$ a.s., then $\rho(L_1) \le \rho(L_2)$. Larger losses require more capital.

3. **Positive homogeneity**: $\rho(\lambda L) = \lambda\,\rho(L)$ for $\lambda > 0$. Scaling the portfolio scales the risk.

4. **Subadditivity**: $\rho(L_1 + L_2) \le \rho(L_1) + \rho(L_2)$. Merging risks cannot increase total capital — diversification is rewarded.

**Artzner et al.'s representation theorem**: $\rho$ is coherent if and only if there exists a set $\mathcal{Q}$ of probability measures (the **generalized scenarios**) such that:

$$
\rho(L) = \sup_{Q \in \mathcal{Q}} E_Q[L]
$$

TVaR is coherent; VaR is not. The standard deviation premium $\rho(L) = E[L] + \lambda\,\text{SD}(L)$ is coherent only for $\lambda \ge 0$ when losses are bounded below.

## Distortion Risk Measures

A **distortion risk measure** with distortion function $g: [0,1] \to [0,1]$ (increasing, $g(0)=0$, $g(1)=1$) is:

$$
\rho_g(L) = -\int_{-\infty}^0 g(1 - F_L(l))\,dl + \int_0^{\infty} [1 - g(F_L(l))]\,dl
$$

Equivalently, $\rho_g(L) = \int_0^1 \text{VaR}_u(L)\,dg(u)$, a **Choquet integral** with respect to the distorted probability.

**Wang transform**: The distortion $g(u) = \Phi(\Phi^{-1}(u) + \lambda)$ for Sharpe ratio parameter $\lambda$ yields:

$$
\rho_\lambda(L) = E_Q[L], \quad \text{where } Q \text{ shifts the quantile by } \lambda
$$

For Normal $L \sim N(\mu, \sigma^2)$: $\rho_\lambda(L) = \mu + \lambda\sigma$, recovering the standard deviation premium.

| Distortion $g(u)$ | Resulting $\rho$ |
|---|---|
| $g(u) = \mathbf{1}[u = 1]$ | $\text{ess}\sup L$ |
| $g(u) = \mathbf{1}[u > 1-p]/(1-p)$ (truncated) | $\text{TVaR}_p(L)$ |
| $g(u) = u^{1/\rho}$ (power) | Proportional hazards transform |
| $g(u) = \Phi(\Phi^{-1}(u)+\lambda)$ | Wang transform |

A distortion risk measure is coherent if and only if $g$ is concave.

## Regulatory Capital: Solvency II

Under **Solvency II** (EU), the **Solvency Capital Requirement** (SCR) is calibrated so that:

$$
\text{SCR} = \text{VaR}_{99.5\%}(L_{\text{net}}) - \text{Best Estimate Liabilities}
$$

where $L_{\text{net}}$ is the net asset value shock over a one-year horizon.

**Risk aggregation**: The standard formula uses a correlation matrix $\rho_{ij}$ to aggregate module-level SCRs:

$$
\text{SCR} = \sqrt{\sum_{i,j} \rho_{ij}\,\text{SCR}_i\,\text{SCR}_j}
$$

This is equivalent to assuming multivariate Normal risks — a linear correlation aggregation that ignores tail dependence. Internal models may use copulas or historical simulation.

**Swiss Solvency Test (SST)**: Uses TVaR at 99% rather than VaR at 99.5%, reflecting the coherence advantage and providing more stability across model choices.

The choice between VaR and TVaR for regulation involves a trade-off: TVaR is more sensitive to extreme tail assumptions (model risk), while VaR ignores the shape of the tail above the threshold. For well-diversified portfolios the two are numerically close; for concentrated catastrophe books they diverge substantially.
