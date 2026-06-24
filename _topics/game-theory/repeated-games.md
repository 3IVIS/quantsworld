---
title: "Repeated Games"
field: game-theory
description: How cooperation can emerge when players interact across multiple rounds.
intro: >
  When a stage game is played repeatedly, the threat of future punishment can
  sustain cooperative outcomes that are impossible in the one-shot game. The folk
  theorem characterises the full set of payoffs achievable in subgame perfect
  equilibrium as the discount factor approaches one, providing a rigorous basis
  for understanding long-run cooperation.
math_concepts:
  - dynamical-systems
  - probability-theory
  - optimization
  - markov-chains
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Discounted Payoffs

In an infinitely repeated game, player $i$'s total payoff is the discounted sum of stage payoffs:

$$U_i = (1 - \delta) \sum_{t=0}^{\infty} \delta^t u_i(a^t)$$

where $\delta \in (0,1)$ is the common discount factor. The $(1-\delta)$ normalisation keeps $U_i$ in the same units as stage payoffs. Higher $\delta$ reflects greater patience and makes future punishments more credible.

## Grim Trigger Strategy

The simplest trigger strategy sustains cooperation in the prisoner's dilemma. Define:

- **Cooperate** in period 0.
- **Cooperate** in period $t$ if no player has ever defected; otherwise **Defect** forever.

Cooperation is a subgame perfect equilibrium if the gain from one-shot defection does not exceed the discounted loss from permanent punishment:

$$T - R \leq \frac{\delta}{1-\delta}(R - P)$$

$$\Longleftrightarrow \quad \delta \geq \frac{T - R}{T - P}$$

For the standard parameterisation $T=5, R=3, P=1$, cooperation requires $\delta \geq 1/2$.

## Folk Theorem

Let $V^* = \{v \in \mathbb{R}^n : v = \sum_a \alpha(a) u(a),\, \alpha \in \Delta(A)\}$ be the set of feasible payoffs, and let $\underline{v}_i = \min_{\sigma_{-i}} \max_{\sigma_i} u_i(\sigma)$ be the minimax payoff. The **folk theorem** (Fudenberg-Maskin 1986) states that for any $v \in V^*$ with $v_i > \underline{v}_i$ for all $i$, there exists $\bar{\delta} < 1$ such that for all $\delta \geq \bar{\delta}$, $v$ is a subgame perfect equilibrium payoff vector. Cooperation is therefore generically sustainable with sufficiently patient players.
