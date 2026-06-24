---
title: "Social Choice Theory"
field: game-theory
description: How individual preferences can — and cannot — be aggregated into collective decisions.
intro: >
  Social choice theory examines procedures for combining individual preference
  orderings into a collective ranking or decision. Arrow's impossibility theorem
  shows that no voting rule satisfies a minimal set of fairness axioms
  simultaneously, while the Gibbard-Satterthwaite theorem extends this
  impossibility to strategy-proofness.
math_concepts:
  - probability-theory
  - information-theory
  - optimization
  - graph-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Preference Aggregation and Arrow's Axioms

A **social welfare function** maps a profile of strict preference orders $(\succ_1, \ldots, \succ_n)$ to a social order $\succ^*$. Arrow's four axioms are:

1. **Unrestricted domain:** defined for all preference profiles.
2. **Pareto efficiency:** if $a \succ_i b$ for all $i$, then $a \succ^* b$.
3. **Independence of irrelevant alternatives (IIA):** the social ranking of $a$ vs.\ $b$ depends only on individual rankings of $a$ vs.\ $b$.
4. **Non-dictatorship:** no single agent's preference always determines the social order.

**Arrow's impossibility theorem** (1951): for three or more alternatives and two or more agents, no social welfare function satisfies all four axioms.

## Voting Rules

| Rule       | Winner determined by                         | Condorcet consistent? |
|------------|---------------------------------------------|-----------------------|
| Plurality  | Most first-place votes                      | No                    |
| Borda count| Weighted sum of rank positions              | No                    |
| Majority runoff | Second round between top two          | No                    |
| Condorcet  | Beats every other alternative pairwise      | Yes (when it exists)  |

A **Condorcet winner** $a^*$ satisfies $|\{i : a^* \succ_i b\}| > n/2$ for all $b \neq a^*$. Such a winner need not exist — cyclic majorities ($a \succ^* b \succ^* c \succ^* a$) are the **Condorcet paradox**.

## Strategy-Proofness and Gibbard-Satterthwaite

A social choice function $f$ is **strategy-proof** if truthful reporting is a dominant strategy for every agent. The **Gibbard-Satterthwaite theorem** (1973/1975) states that for three or more alternatives, any strategy-proof social choice function onto its range must be dictatorial. This creates a fundamental trade-off between resistance to manipulation and fair aggregation.
