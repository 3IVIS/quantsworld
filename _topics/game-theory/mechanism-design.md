---
title: "Mechanism Design"
field: game-theory
description: Engineering game rules to achieve desired outcomes despite private information.
intro: >
  Mechanism design — sometimes called reverse game theory — takes the desired
  social outcome as given and asks what rules of the game would induce rational
  agents to produce it. The central challenge is eliciting truthful private
  information from self-interested agents, formalised through incentive
  compatibility and individual rationality constraints.
math_concepts:
  - optimization
  - probability-theory
  - convex-optimization
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## The Mechanism Design Problem

A mechanism $\mathcal{M} = (A, g)$ specifies a message space $A = \prod_i A_i$ and an outcome function $g: A \to X$. Each agent $i$ has private type $\theta_i \in \Theta_i$ and utility $u_i(g(a), \theta_i)$. A mechanism implements social choice function $f: \Theta \to X$ if the equilibrium outcome coincides with $f(\theta)$ for all type profiles $\theta$.

## Revelation Principle

The **revelation principle** states that any outcome implementable by an arbitrary mechanism is also implementable by a **direct revelation mechanism** in which agents report their types truthfully. Formally, if $(A, g)$ implements $f$ with equilibrium strategy $s^*$, the direct mechanism $(\Theta, f \circ s^*)$ implements $f$ with truth-telling as an equilibrium.

This reduces mechanism design to finding allocations and transfers satisfying:

- **Incentive Compatibility (IC):** $u_i(g(\theta_i, \theta_{-i}), \theta_i) \geq u_i(g(\theta_i', \theta_{-i}), \theta_i)$ for all $\theta_i, \theta_i'$.
- **Individual Rationality (IR):** $u_i(g(\theta), \theta_i) \geq \bar{u}_i$ for all $\theta$.

## Vickrey-Clarke-Groves Mechanism

The VCG mechanism achieves allocative efficiency in quasi-linear environments. Given valuations $v_i(\cdot, \theta_i)$, the efficient allocation maximises $\sum_i v_i(x, \theta_i)$, and transfers are set as:

$$t_i(\theta) = \sum_{j \neq i} v_j(x^*(\theta), \theta_j) - h_i(\theta_{-i})$$

where $h_i$ depends only on other agents' reports. Agent $i$'s net utility equals total social surplus minus a term independent of $\theta_i$, making truth-telling a dominant strategy. VCG satisfies IC and IR but may fail budget balance — a fundamental tension captured by the Green-Laffont impossibility result.
