---
title: Markov Decision Processes
slug: markov-decision-processes
equation: 'V^*(s) = \max_a \sum_{s\prime} P(s\prime|s,a)[r + \gamma V^*(s\prime)]'
intro: >
  A Markov decision process (MDP) formalizes sequential decision-making under
  uncertainty, specifying states, actions, transition probabilities, and rewards.
  The Bellman equations characterize optimal policies through dynamic programming,
  and form the theoretical foundation of reinforcement learning algorithms
  including Q-learning and policy gradient methods.
related_concepts:
  - markov-chains
  - probability-theory
  - optimization
  - dynamical-systems
  - monte-carlo-methods
difficulty: advanced
difficulty_level: 3
---

## MDP components and Bellman equations

An MDP is a tuple $(S, A, P, R, \gamma)$ of states, actions, transition probabilities $P(s'|s,a)$, reward function $R(s,a)$, and discount factor $\gamma \in [0,1)$. The value function under policy $\pi$ satisfies the Bellman expectation equation:

$$V^\pi(s) = \sum_a \pi(a|s)\sum_{s'} P(s'|s,a)\bigl[R(s,a) + \gamma V^\pi(s')\bigr]$$

The optimal value function $V^*$ satisfies the Bellman optimality equation, solved by value iteration.

## Q-functions and temporal-difference learning

The action-value function $Q^\pi(s,a) = \mathbb{E}^\pi\!\left[\sum_{t=0}^\infty \gamma^t R_t \mid s_0=s, a_0=a\right]$ captures expected return starting from state-action pair $(s,a)$. Q-learning updates:

$$Q(s,a) \leftarrow Q(s,a) + \alpha\bigl[r + \gamma \max_{a'} Q(s',a') - Q(s,a)\bigr]$$

converge to $Q^*$ under mild conditions, without requiring a model of $P$.

## Applications

MDPs underlie robot motion planning, inventory management, clinical trial design, and game-playing AI. Deep Q-networks (DQN) approximate $Q^*$ with neural networks, achieving superhuman performance in Atari games. Policy gradient methods such as PPO optimize $\pi$ directly by ascending the gradient of expected return.
