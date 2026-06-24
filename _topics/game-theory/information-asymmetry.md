---
title: "Information Asymmetry"
field: game-theory
description: Strategic behaviour when players hold different private information.
intro: >
  Information asymmetry arises when one party to a transaction knows more than
  another. The resulting inefficiencies — adverse selection before contracting
  and moral hazard after — are studied through signalling, screening, and
  principal-agent models. Spence's education signalling model and Mirrlees's
  optimal contract theory are the foundational contributions.
math_concepts:
  - information-theory
  - optimization
  - probability-theory
  - convex-optimization
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Adverse Selection and the Lemons Problem

When quality is private information, markets can unravel. Akerlof (1970) showed that if sellers know car quality $q \sim F[q_L, q_H]$ but buyers do not, buyers offer the expected value $\mathbb{E}[q]$. High-quality sellers exit if $\mathbb{E}[q] < q_H$, lowering the expectation further and triggering a cascade until only lemons remain. Formally, equilibrium exists at quality $q^*$ satisfying:

$$\mathbb{E}[q \mid q \leq q^*] = q^*$$

## Moral Hazard and the Principal-Agent Model

A principal offers a contract to an agent who takes unobservable effort $e \in \{e_L, e_H\}$. Output $y$ is stochastic: $y = e + \epsilon$, $\epsilon \sim \mathcal{N}(0, \sigma^2)$. With risk-averse agent (CARA utility $-e^{-r w}$) and linear contract $w(y) = \alpha + \beta y$, the optimal incentive power $\beta^*$ balances effort provision against risk-bearing:

$$\beta^* = \frac{1}{1 + r \sigma^2 c''}$$

where $c''$ is the curvature of the effort cost function. Higher agent risk aversion $r$ or output variance $\sigma^2$ reduces optimal incentives.

## Spence Signalling Equilibrium

In Spence (1973), workers have productivity $\theta \in \{\theta_L, \theta_H\}$ and choose education $e \geq 0$ at cost $c(e, \theta) = e/\theta$. A **separating equilibrium** exists at education levels $(e_L^*, e_H^*)$ satisfying the **single-crossing** incentive constraints:

$$\theta_H - e_H^*/\theta_H \geq \theta_H - e_L^*/\theta_H \quad \text{(high type prefers } e_H^*)$$
$$\theta_L - e_L^*/\theta_L \geq \theta_L - e_H^*/\theta_L \quad \text{(low type prefers } e_L^*)$$

The least-cost separating equilibrium sets $e_L^* = 0$ and $e_H^* = \theta_L$. Education conveys information purely through its differential cost — it need not raise productivity to be valuable as a signal.
