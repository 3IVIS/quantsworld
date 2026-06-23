---
title: Linear Programming
field: operations-research
description: Optimising a linear objective over a polytope. The simplex algorithm and interior-point methods are the two main solution approaches.
intro: >
  Linear programming (LP) optimises a linear objective subject to linear constraints.
  It models resource allocation, transportation, production planning, and is a building
  block for more complex integer and mixed-integer programs.
math_concepts:
  - linear-programming
  - linear-algebra
  - convex-optimization
difficulty: beginner
difficulty_level: 2
read_time: 7
---

## Standard form

$$\min\, c^\top x \quad \text{s.t.} \quad Ax = b,\; x \geq 0$$

Any LP can be put in standard form by introducing slack variables and splitting free variables.

## The simplex algorithm

The feasible region of an LP is a convex polytope; the optimum lies at a vertex (basic feasible solution). Simplex pivots between adjacent vertices along improving edges.

**Pivoting:** identify a non-basic variable with negative reduced cost $\bar c_j = c_j - c_B^\top B^{-1} A_j$; bring it into the basis; remove the departing variable by the minimum ratio test.

Worst case: exponential (Klee-Minty); average: polynomial in practice.

## Interior-point methods

The **barrier method** replaces inequality $x \geq 0$ with a log-barrier:

$$\min\, c^\top x - \mu\sum_i\log x_i \quad \text{s.t.} \quad Ax = b$$

Following the **central path** (solutions as $\mu \to 0$) via Newton steps gives polynomial $O(n^{3.5}L)$ complexity — provably polynomial, unlike simplex.

## LP duality in practice

Shadow prices from the dual solution directly give the value of relaxing each constraint — critical for sensitivity analysis and column generation in decomposition methods.
