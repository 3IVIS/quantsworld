---
title: "Ruin Theory"
field: actuarial-science
description: The mathematical study of when an insurer's surplus process first becomes negative, providing bounds and exact formulas for the probability of ruin under the classical Cramér-Lundberg model.
intro: >
  Ruin theory analyzes the long-run solvency of an insurance company by modeling its surplus as a stochastic process driven by premium income and random claim outflows. The classical Cramér-Lundberg model captures this in a compound Poisson framework, yielding the celebrated exponential bound on ruin probability and exact solutions for specific claim size distributions. The Gerber-Shiu expected discounted penalty function unifies ruin probability, severity of ruin, and time of ruin into a single elegant object, connecting classical ruin theory to modern risk management.
math_concepts:
  - probability-theory
  - random-processes
  - differential-equations
difficulty: expert
difficulty_level: 5
read_time: 13
---

## The Cramér-Lundberg Surplus Process

The **classical risk model** describes the insurer's surplus at time $t$ as:

$$
U(t) = u + ct - S(t), \quad t \ge 0
$$

where:
- $u \ge 0$ is the **initial surplus**
- $c > 0$ is the **premium rate** (received continuously)
- $S(t) = \sum_{i=1}^{N(t)} X_i$ is the **aggregate claims** process
- $N(t) \sim \text{Poisson}(\lambda t)$ is the claim count (Poisson process with rate $\lambda$)
- $X_i$ are i.i.d. claim severities with distribution $F_X$, mean $\mu_X = E[X]$, independent of $N$

The **net profit condition (loading condition)** ensures the surplus drifts upward on average:

$$
c > \lambda \mu_X \quad\Longleftrightarrow\quad \theta = \frac{c - \lambda\mu_X}{\lambda\mu_X} > 0
$$

where $\theta$ is the **relative security loading**. Without this condition, ruin is certain ($\psi(u) = 1$ for all $u$).

The **time of ruin** is $\tau = \inf\{t \ge 0 : U(t) < 0\}$ (with $\tau = \infty$ if ruin never occurs). The **ruin probability** starting from surplus $u$ is:

$$
\psi(u) = P(\tau < \infty \mid U(0) = u)
$$

## The Cramér-Lundberg Equation and Adjustment Coefficient

The **moment generating function (MGF)** of the claim severity is $M_X(r) = E[e^{rX}]$. The **Cramér-Lundberg equation** (also called the characteristic equation) is:

$$
\lambda + cr = \lambda M_X(r)
$$

or equivalently, seeking the Laplace exponent:

$$
\lambda M_X(r) - \lambda - cr = 0
$$

This equation has exactly two real roots: $r = 0$ (trivial) and $r = R > 0$, where $R$ is the **adjustment coefficient** (Lundberg exponent). Graphically, the convex function $\lambda M_X(r)$ starts at $\lambda$ with slope $\lambda\mu_X < c$ (by the loading condition), so it must cross the line $\lambda + cr$ at a positive point $R$.

For exponential claims $X \sim \text{Exp}(\beta)$, $M_X(r) = \beta/(\beta - r)$ for $r < \beta$, and the Cramér-Lundberg equation gives:

$$
\frac{\lambda}{\beta - R} = \frac{\lambda + cR}{\lambda} \implies R = \frac{\beta\theta}{1 + \theta} = \beta - \frac{\lambda}{c}
$$

## Ruin Probability Bounds and Exact Formulas

**Lundberg's inequality** gives an exponential upper bound:

$$
\psi(u) \le e^{-Ru}
$$

This bound is remarkably simple: the larger the adjustment coefficient $R$, the faster ruin probability decays with initial surplus. The adjustment coefficient can be maximized (over reinsurance structures) to obtain the **optimal retention** problem.

For **exponential claim sizes** $X \sim \text{Exp}(\beta)$, the exact formula is:

$$
\psi(u) = \frac{\lambda}{c\beta}\,e^{-Ru} = \frac{1}{1+\theta}\,e^{-Ru}
$$

where $R = \beta - \lambda/c$. The prefactor $1/(1+\theta)$ is the probability of ruin starting from $u = 0$.

For **mixtures of exponentials** $F_X(x) = 1 - \sum_{i=1}^n \alpha_i e^{-\beta_i x}$, the ruin probability is a sum of exponentials:

$$
\psi(u) = \sum_{i=1}^n A_i\,e^{-r_i u}
$$

where $r_1, \ldots, r_n$ are the $n$ positive roots of the Cramér-Lundberg equation (which now has $n+1$ roots in total including 0).

For **general claim sizes**, the **Pollaczek-Khinchine formula** expresses ruin probability as a geometric compound:

$$
\psi(u) = (1 - \rho)\sum_{n=1}^\infty \rho^n [1 - F_e^{*n}(u)]
$$

where $\rho = \lambda\mu_X/c$ is the **traffic intensity** and $F_e(x) = \mu_X^{-1}\int_0^x [1-F_X(t)]\,dt$ is the **equilibrium distribution** of $F_X$. The sum $\sum_{n=1}^\infty \rho^n = \rho/(1-\rho)$ when $u \to \infty$.

## Cramér-Lundberg Asymptotics

As $u \to \infty$, the ruin probability satisfies:

$$
\psi(u) \sim C\,e^{-Ru}
$$

where the constant $C$ is:

$$
C = \frac{\lambda\mu_X - c + c}{\ldots} = \frac{1 - \rho}{M_X'(R) - c/\lambda} \cdot \frac{1}{\lambda}
$$

More precisely, if $M_X(R) < \infty$ (light-tailed claims), then:

$$
\lim_{u \to \infty} e^{Ru}\,\psi(u) = \frac{c - \lambda\mu_X}{c\,R\,\text{Var}_e(X)/2 + \ldots} = \frac{\theta}{(1+\theta)\,(\lambda M_X''(R)c^{-1} - 1)}
$$

For **heavy-tailed** claims (no MGF exists, e.g., Pareto), there is no adjustment coefficient and the bound $\psi(u) \le e^{-Ru}$ breaks down. Instead:

$$
\psi(u) \sim \frac{\lambda}{c-\lambda\mu_X}\int_u^\infty [1 - F_X(x)]\,dx = \frac{1}{\theta\mu_X}\bar{F}_e(u)
$$

## The Gerber-Shiu Expected Discounted Penalty Function

The **Gerber-Shiu function** (1998) unifies many ruin-related quantities in a single expectation:

$$
\phi(u) = E\!\left[e^{-\delta\tau}\,w(U(\tau^-), |U(\tau)|)\,\mathbf{1}(\tau < \infty) \;\Big|\; U(0) = u\right]
$$

where:
- $\delta \ge 0$ is a **discounting rate** (or Laplace parameter)
- $w(x, y)$ is a **penalty function** depending on the surplus just before ruin $U(\tau^-)$ and the deficit at ruin $|U(\tau)|$
- $U(\tau^-)$ is the "last record" surplus; $|U(\tau)|$ is the "severity of ruin"

Special cases:

| Choice of $w$ and $\delta$ | $\phi(u)$ equals |
|---|---|
| $w \equiv 1$, $\delta = 0$ | $\psi(u)$ — ruin probability |
| $w \equiv 1$, $\delta > 0$ | $E[e^{-\delta\tau}\mathbf{1}(\tau<\infty)]$ — Laplace transform of ruin time |
| $w(x,y) = y$, $\delta = 0$ | $E[|U(\tau)|\mathbf{1}(\tau<\infty)]$ — expected deficit |
| $w(x,y) = \mathbf{1}(y > d)$, $\delta = 0$ | $P(\tau < \infty,\, |U(\tau)| > d)$ |

The Gerber-Shiu function satisfies an **integro-differential equation**:

$$
c\phi'(u) = (\lambda + \delta)\phi(u) - \lambda\int_0^u \phi(u-x)f_X(x)\,dx - \lambda\int_u^\infty w(u, x-u)f_X(x)\,dx
$$

This reduces to an IDE that can be solved by Laplace transforms for exponential and phase-type claim distributions, or by numerical methods for general $F_X$.

## Finite-Time Ruin Probability

The finite-horizon ruin probability $\psi(u, t) = P(\tau \le t \mid U(0) = u)$ is harder to compute. For the classical model, it satisfies the **partial integro-differential equation**:

$$
\frac{\partial}{\partial t}\psi(u,t) = c\frac{\partial}{\partial u}\psi(u,t) - \lambda\psi(u,t) + \lambda\int_0^u \psi(u-x,t)f_X(x)\,dx + \lambda[1-F_X(u)]
$$

Analytical solutions exist only for exponential claims:

$$
\psi(u, t) = 1 - (1+\theta)e^{-Ru}\Phi\!\left(\sqrt{\frac{\lambda t}{1+\theta}}\!\cdot\!\frac{u + (c-\lambda\mu_X)t}{\sqrt{\lambda\mu_X^{(2)} t / 2}}\right) + \ldots
$$

(exact formula involves a series; see Seal, 1969). In practice, finite-time ruin probabilities are computed by Monte Carlo simulation or by discretizing the PIDE on a grid.
