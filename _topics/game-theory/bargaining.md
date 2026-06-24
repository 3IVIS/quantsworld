---
title: "Bargaining"
field: game-theory
description: Strategic models of how two parties split a surplus through negotiation.
intro: >
  Bargaining theory models how two parties divide a jointly created surplus.
  Nash's axiomatic approach characterises the unique split satisfying four
  fairness axioms, while Rubinstein's alternating-offers model provides
  strategic foundations through subgame perfect equilibrium, showing that
  patience and outside options determine bargaining power.
math_concepts:
  - optimization
  - convex-optimization
  - probability-theory
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Nash Bargaining Solution

Let $U \subseteq \mathbb{R}^2$ be the feasible utility set and $(d_1, d_2)$ the disagreement point. The **Nash bargaining solution** is the unique outcome satisfying efficiency, symmetry, invariance to affine transformations, and independence of irrelevant alternatives:

$$(\phi_1^*, \phi_2^*) = \arg\max_{(u_1, u_2) \in U,\; u_i \geq d_i} (u_1 - d_1)(u_2 - d_2)$$

The maximiser is found where the Pareto frontier is tangent to a hyperbola. With $U$ defined by $u_1 + u_2 \leq S$ and $d = (0,0)$, the solution is the equal split $\phi^* = (S/2, S/2)$.

## Rubinstein Alternating-Offers Model

In Rubinstein (1982), two players alternate making offers $(x, 1-x)$ over a pie of size 1. Both discount at rate $\delta \in (0,1)$ per period. The unique subgame perfect equilibrium involves immediate agreement in the first period. The proposer (player 1) receives:

$$x_1^* = \frac{1 - \delta}{1 - \delta^2} = \frac{1}{1 + \delta}$$

As $\delta \to 1$ (infinite patience), $x_1^* \to 1/2$ and the outcome converges to the Nash bargaining solution. First-mover advantage vanishes with patience.

## Outside Options and Asymmetric Power

With outside options $(d_1, d_2)$, the Nash bargaining solution generalises to the **asymmetric Nash bargaining solution**:

$$\max_{u \in U} (u_1 - d_1)^\alpha (u_2 - d_2)^{1-\alpha}$$

where $\alpha \in (0,1)$ reflects player 1's relative bargaining power. Player 1 receives $d_1 + \alpha(S - d_1 - d_2)$, so better outside options and higher $\alpha$ both raise one's share. This links axiomatic and strategic approaches when $\alpha$ is identified with $1/(1+\delta)$ in the Rubinstein model.
