---
title: "Prisoner's Dilemma"
field: game-theory
description: The canonical social dilemma where individual rationality leads to collective loss.
intro: >
  The prisoner's dilemma is a two-player game in which mutual defection is the
  unique Nash equilibrium, yet both players would be better off cooperating. It
  captures the tension between individual incentives and social optimality and
  appears in arms races, climate agreements, and pricing competition.
math_concepts:
  - probability-theory
  - optimization
difficulty: beginner
difficulty_level: 1
read_time: 8
---

## Normal-Form Payoff Matrix

The game is typically written with payoffs $(u_R, u_C)$ for row and column players:

|               | **Cooperate** | **Defect**  |
|---------------|---------------|-------------|
| **Cooperate** | $(R, R)$      | $(S, T)$    |
| **Defect**    | $(T, S)$      | $(P, P)$    |

The dilemma requires $T > R > P > S$ (temptation, reward, punishment, sucker) and typically $2R > T + S$ so mutual cooperation exceeds the average of exploitation outcomes.

## Dominant Strategy and Nash Equilibrium

Defection strictly dominates cooperation for each player: regardless of the opponent's choice, $T > R$ and $P > S$. Iterated elimination of strictly dominated strategies leaves (Defect, Defect) as the unique survivor. This profile is the unique Nash equilibrium, yielding payoffs $(P, P)$.

The Pareto-optimal outcome $(R, R)$ is unreachable through rational self-interest in the one-shot game, illustrating **Pareto inefficiency** of equilibrium — a defining feature of social dilemmas.

## Quantitative Example

A standard parameterisation sets $T=5, R=3, P=1, S=0$. The payoff matrix becomes:

|               | **C**   | **D**   |
|---------------|---------|---------|
| **C**         | (3, 3)  | (0, 5)  |
| **D**         | (5, 0)  | (1, 1)  |

Social surplus under mutual cooperation is $6$; under mutual defection it is $2$. The efficiency loss ratio is $1 - 2/6 \approx 67\%$.

## Mixed-Strategy Equilibrium

Although (Defect, Defect) is the unique pure-strategy Nash equilibrium, one can verify no profitable mixed deviation exists. If the column player cooperates with probability $p$, the row player's expected gain from defecting over cooperating is $(T-R)p + (P-S)(1-p) > 0$ for all $p \in [0,1]$ under the dilemma constraints, confirming that defection is always a strict best response.
