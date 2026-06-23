---
title: Dynamic Programming
field: operations-research
description: Solving complex optimisation problems by breaking them into overlapping subproblems. Bellman's principle of optimality is the key insight.
intro: >
  Dynamic programming (DP) solves optimisation problems by recursively decomposing them
  into subproblems, storing solutions to avoid recomputation. Bellman's principle —
  that every sub-path of an optimal path is itself optimal — is the key insight.
math_concepts:
  - optimization
  - markov-decision-processes
  - linear-algebra
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Bellman's principle of optimality

**"An optimal policy has the property that, whatever the initial state and decision, the remaining decisions must constitute an optimal policy with regard to the resulting state."**

This gives the Bellman equation for deterministic problems:

$$V(s) = \min_{a}\left[c(s,a) + V(f(s,a))\right]$$

## Stochastic DP and MDPs

In a Markov Decision Process (MDP) with state $s$, action $a$, transition $P(s'|s,a)$, and reward $r(s,a)$:

$$V^\pi(s) = \sum_{a}\pi(a|s)\left[r(s,a) + \gamma\sum_{s'}P(s'|s,a)V^\pi(s')\right]$$

**Value iteration** repeatedly applies the Bellman operator until convergence (contraction mapping, rate $\gamma$).

## Classic DP problems

| Problem | Subproblem | State | Recurrence |
|---|---|---|---|
| Shortest path | Min cost from $i$ | Node $i$ | $d[v] = \min_u(d[u] + w_{uv})$ |
| Knapsack | Max value ≤ capacity | (item, capacity) | $V[i,c] = \max(V[i-1,c], v_i + V[i-1,c-w_i])$ |
| Sequence alignment | Edit distance | $(i,j)$ | $d[i,j] = \min(d[i-1,j]+1, d[i,j-1]+1, d[i-1,j-1]+\delta)$ |
| Matrix chain | Min multiplications | $(i,j)$ | $m[i,j] = \min_k(m[i,k]+m[k+1,j]+p_ip_kp_j)$ |
