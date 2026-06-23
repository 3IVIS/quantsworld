---
title: Markov Decision Processes
field: operations-research
description: The mathematical framework for sequential decision-making under uncertainty. Foundation of reinforcement learning.
intro: >
  A Markov Decision Process (MDP) formalises sequential decision-making where outcomes
  are partly random and partly controlled. MDPs are the foundation of reinforcement learning,
  optimal control, and stochastic dynamic programming.
math_concepts:
  - markov-chains
  - dynamic-programming
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## MDP definition

An MDP is a tuple $(\mathcal{S}, \mathcal{A}, P, R, \gamma)$:
- $\mathcal{S}$: state space
- $\mathcal{A}$: action space
- $P(s'|s,a)$: transition probabilities
- $R(s,a)$: expected reward
- $\gamma \in [0,1)$: discount factor

A **policy** $\pi: \mathcal{S} \to \mathcal{A}$ maps states to actions. The value function:

$$V^\pi(s) = \mathbb{E}_\pi\left[\sum_{t=0}^\infty \gamma^t R(s_t, a_t) \mid s_0 = s\right]$$

## Bellman optimality equations

The optimal value $V^*(s) = \max_\pi V^\pi(s)$ satisfies:

$$V^*(s) = \max_a \left[R(s,a) + \gamma\sum_{s'}P(s'|s,a)V^*(s')\right]$$

The optimal policy: $\pi^*(s) = \arg\max_a[R(s,a) + \gamma\sum_{s'}P(s'|s,a)V^*(s')]$.

## Solution algorithms

**Value iteration:** apply the Bellman operator repeatedly until convergence. Convergence rate: $\gamma^k$ after $k$ iterations.

**Policy iteration:** alternately evaluate $V^{\pi_k}$ (solve linear system) and improve $\pi_{k+1} = \text{greedy}(V^{\pi_k})$. Converges in finitely many steps.

**Q-learning (RL):** model-free; learns Q-values $Q^*(s,a) = R(s,a) + \gamma\sum_{s'}P(s'|s,a)V^*(s')$ from samples.
