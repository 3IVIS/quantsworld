---
title: "Cooperative Games"
field: game-theory
description: Games where players form coalitions and share payoffs according to fairness axioms.
intro: >
  Cooperative game theory studies how groups of players form binding agreements
  and divide the resulting surplus. Rather than modelling strategic interaction
  directly, it characterises outcomes through a characteristic function that
  assigns a value to every coalition, then asks which allocations are stable
  or fair.
math_concepts:
  - linear-programming
  - optimization
  - measure-theory
  - convex-optimization
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Characteristic Function and Superadditivity

A cooperative game is a pair $(N, v)$ where $N = \{1,\ldots,n\}$ is the player set and $v: 2^N \to \mathbb{R}$ is the characteristic function with $v(\emptyset) = 0$. The game is **superadditive** if for disjoint coalitions $S, T$:

$$v(S \cup T) \geq v(S) + v(T)$$

An **imputation** is a payoff vector $x \in \mathbb{R}^n$ with $\sum_i x_i = v(N)$ (efficiency) and $x_i \geq v(\{i\})$ (individual rationality).

## The Core

The **core** is the set of imputations that no coalition can profitably block:

$$\mathcal{C}(v) = \left\{ x \in \mathbb{R}^n \;\middle|\; \sum_{i \in N} x_i = v(N),\; \sum_{i \in S} x_i \geq v(S)\;\forall S \subseteq N \right\}$$

The core is a convex polytope defined by $2^n - 1$ linear inequalities. It may be empty; convex games (where $v(S \cup T) + v(S \cap T) \geq v(S) + v(T)$) always have a non-empty core.

## Shapley Value

The **Shapley value** uniquely satisfies efficiency, symmetry, null player, and additivity axioms. It is:

$$\phi_i(v) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!\,(n - |S| - 1)!}{n!}\bigl[v(S \cup \{i\}) - v(S)\bigr]$$

This is the average marginal contribution of player $i$ over all orderings of $N$. Computing it naively costs $O(2^n)$ but polynomial approximations via sampling are available for large games.

## Nucleolus

The **nucleolus** minimises the maximum excess $e(S, x) = v(S) - \sum_{i \in S} x_i$ lexicographically, producing a unique allocation even when the core is empty. It can be computed via a sequence of linear programs, each adding constraints from the previous step.
