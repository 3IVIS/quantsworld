---
title: "Stochastic Optimization"
field: operations-research
description: Optimization under uncertainty using probability distributions over parameters, covering two-stage programs and stochastic gradient methods.
intro: >
  Stochastic optimization addresses decisions made under uncertainty, where problem parameters follow probability distributions rather than taking fixed values. Two-stage stochastic programs separate here-and-now decisions from recourse actions taken after uncertainty resolves, balancing expected cost against feasibility guarantees.
math_concepts:
  - probability-theory
  - convex-optimization
  - monte-carlo-methods
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Expected Value Formulations

A **stochastic program** replaces fixed parameters with random variables $\xi$ drawn from distribution $P$:

$$\min_{x \in X} \; \mathbb{E}_\xi[f(x, \xi)]$$

The **expected value of perfect information (EVPI)** measures the value of knowing $\xi$ before deciding:

$$\text{EVPI} = \mathbb{E}_\xi[\min_x f(x,\xi)] - \min_x \mathbb{E}_\xi[f(x,\xi)] \ge 0$$

## Two-Stage Stochastic Programs

The canonical formulation separates first-stage (here-and-now) variables $x$ from second-stage (wait-and-see) recourse variables $y(\xi)$:

$$\min_x \; c^\top x + \mathbb{E}_\xi[Q(x,\xi)]$$

$$Q(x,\xi) = \min_y \; q(\xi)^\top y \quad \text{s.t.} \quad T(\xi) x + W y = h(\xi), \; y \ge 0$$

The recourse function $Q(x,\xi)$ is convex in $x$ under mild conditions. **Complete recourse** means $Q(x,\xi) < \infty$ for all $x$ and $\xi$ — the second-stage problem is always feasible.

## Scenario Approximation

When $\xi$ takes finitely many values (scenarios $\xi^1, \ldots, \xi^S$ with probabilities $p_s$), the extensive form is a large deterministic LP:

$$\min_{x, y^1, \ldots, y^S} \; c^\top x + \sum_s p_s q_s^\top y^s$$

$$\text{s.t.} \quad T_s x + W y^s = h_s \; \forall s, \quad x \in X, \; y^s \ge 0$$

The number of variables grows linearly with $S$. The **sample average approximation (SAA)** draws $S$ scenarios by Monte Carlo and solves the resulting deterministic problem, with convergence guarantees as $S \to \infty$.

## Stochastic Gradient Descent

For unconstrained stochastic problems, **SGD** uses noisy gradient estimates:

$$x_{t+1} = x_t - \alpha_t \nabla_x f(x_t, \xi_t)$$

where $\xi_t$ is a random sample. With decreasing step sizes $\sum \alpha_t = \infty$, $\sum \alpha_t^2 < \infty$ (e.g., $\alpha_t = c/t$), SGD converges to a stationary point. For convex $f$, convergence rate is $O(1/\sqrt{T})$.

**Mini-batch SGD** averages gradients over $B$ samples, reducing variance by factor $B$:

$$g_t = \frac{1}{B} \sum_{i=1}^B \nabla_x f(x_t, \xi_t^{(i)})$$

## Robust Optimization

An alternative to expectation: optimize for the **worst case** over an uncertainty set $\mathcal{U}$:

$$\min_x \; \max_{\xi \in \mathcal{U}} \; f(x, \xi)$$

For ellipsoidal uncertainty sets, robust counterparts are often second-order cone programs. The **price of robustness** trades expected performance for worst-case guarantees.

Common uncertainty sets:

| Type | Definition | Tractability |
|---|---|---|
| Box | $\xi_i \in [\mu_i - \delta_i, \mu_i + \delta_i]$ | LP |
| Ellipsoidal | $\|\Sigma^{-1/2}(\xi - \mu)\|_2 \le \kappa$ | SOCP |
| Budget | $\sum_i \|\xi_i - \mu_i\|/\delta_i \le \Gamma$ | LP |

## Chance Constraints

Require constraints to hold with probability at least $1-\varepsilon$:

$$\mathbb{P}[g(x, \xi) \le 0] \ge 1-\varepsilon$$

For Gaussian $\xi$, chance constraints reduce to deterministic second-order cone constraints. In general, chance constraints are non-convex, but **Conditional Value-at-Risk (CVaR)** convex approximations are often used:

$$\text{CVaR}_\varepsilon[Z] = \inf_\eta \left\{ \eta + \frac{1}{\varepsilon} \mathbb{E}[\max(Z - \eta, 0)] \right\}$$

## Benders Decomposition

For large two-stage programs, **Benders decomposition** iterates between a master problem and subproblems. At iteration $k$, the master has an approximation $\theta$ of recourse:

$$\min_x \; c^\top x + \theta \quad \text{s.t.} \quad \text{Benders cuts}$$

Each subproblem generates an **optimality cut** $\theta \ge \alpha_k^\top x + \beta_k$ or **feasibility cut** $0 \ge \gamma_k^\top x + \delta_k$. The algorithm converges finitely for linear two-stage programs.
