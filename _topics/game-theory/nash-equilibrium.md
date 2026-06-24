---
title: "Nash Equilibrium"
field: game-theory
description: A strategy profile where no player can benefit by unilaterally deviating.
intro: >
  A Nash equilibrium is a set of strategies, one per player, such that each
  player's strategy is a best response to the strategies of all others. Nash
  proved in 1950 that every finite game has at least one equilibrium in mixed
  strategies, a cornerstone result of modern economics.
math_concepts:
  - probability-theory
  - linear-programming
  - convex-optimization
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Best Response and Equilibrium Conditions

Let $G = (N, \{S_i\}, \{u_i\})$ be a finite normal-form game with players $N = \{1,\ldots,n\}$, strategy sets $S_i$, and payoff functions $u_i$. A mixed strategy $\sigma_i \in \Delta(S_i)$ assigns probabilities over pure strategies. The best response correspondence is:

$$BR_i(\sigma_{-i}) = \arg\max_{\sigma_i \in \Delta(S_i)} u_i(\sigma_i, \sigma_{-i})$$

A **Nash equilibrium** is a profile $\sigma^* = (\sigma_1^*, \ldots, \sigma_n^*)$ satisfying $\sigma_i^* \in BR_i(\sigma_{-i}^*)$ for all $i$.

## Nash's Existence Theorem

Nash (1950) proved existence using Kakutani's fixed-point theorem. Because $\Delta(S_i)$ is compact and convex and $BR_i$ is upper hemicontinuous with convex values, the joint correspondence $BR = \prod_i BR_i$ on $\prod_i \Delta(S_i)$ has a fixed point. This guarantees at least one mixed-strategy Nash equilibrium in any finite game.

## Computing Equilibria in Zero-Sum Games

For two-player zero-sum games, equilibrium computation reduces to a linear program. If the row player maximizes $u$ and the column player minimizes, the row player solves:

$$\max_{p \in \Delta(S_1)} \min_{j \in S_2} \sum_{i} p_i A_{ij}$$

By the minimax theorem $\max_p \min_q p^\top A q = \min_q \max_p p^\top A q$, both players' LP optima coincide. For general-sum games, the Lemke-Howson algorithm finds an equilibrium in finite time, though the problem is PPAD-complete in the worst case.

## Indifference Principle

In any Nash equilibrium, a player mixing over multiple pure strategies must be **indifferent** among them — each pure strategy in the support yields the same expected payoff. This indifference condition, together with the probability simplex constraint, yields a system of equations that can be solved algebraically in small games.
