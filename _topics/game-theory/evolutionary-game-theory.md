---
title: "Evolutionary Game Theory"
field: game-theory
description: Population dynamics where strategies spread by fitness rather than rational choice.
intro: >
  Evolutionary game theory replaces rational deliberation with selection pressure:
  strategies that yield higher payoffs spread through a population over time.
  The replicator equation governs this dynamics and connects Nash equilibria to
  evolutionary stable states, with applications ranging from animal behaviour to
  the spread of norms in human societies.
math_concepts:
  - dynamical-systems
  - differential-equations
  - probability-theory
  - markov-chains
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Replicator Dynamics

Let $x_i(t)$ be the population share playing strategy $i$, with $x \in \Delta^{n-1}$ (the simplex). Fitness of strategy $i$ against the population is $f_i(x) = (Ax)_i$ for payoff matrix $A$. Mean fitness is $\bar{f}(x) = x^\top A x$. The **replicator equation** is:

$$\dot{x}_i = x_i\bigl[f_i(x) - \bar{f}(x)\bigr]$$

Strategies with above-average fitness grow; below-average fitness shrinks. The simplex $\Delta^{n-1}$ is forward-invariant and all interior equilibria are Nash equilibria of the underlying game.

## Evolutionarily Stable Strategy

A strategy $\sigma^*$ is an **evolutionarily stable strategy (ESS)** if it can resist invasion by any rare mutant $\sigma \neq \sigma^*$:

$$u(\sigma^*, \sigma^*) > u(\sigma, \sigma^*) \quad \text{or} \quad \bigl[u(\sigma^*, \sigma^*) = u(\sigma, \sigma^*) \text{ and } u(\sigma^*, \sigma) > u(\sigma, \sigma)\bigr]$$

Every ESS corresponds to a Nash equilibrium, but not every Nash equilibrium is an ESS. ESS are asymptotically stable fixed points of the replicator dynamics under mild conditions.

## Hawk-Dove Example

With resource value $V$ and injury cost $C > V$, the payoff matrix is:

|          | Hawk               | Dove    |
|----------|--------------------|---------|
| **Hawk** | $(V-C)/2$          | $V$     |
| **Dove** | $0$                | $V/2$   |

The unique interior Nash equilibrium is the mixed strategy $p^* = V/C$ (probability of Hawk). This mixed equilibrium is the unique ESS, and the replicator dynamics converge to it from any interior initial condition.
