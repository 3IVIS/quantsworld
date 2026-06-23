---
title: Linear Programming
slug: linear-programming
equation: '\min\, c^\top x \;\text{s.t.}\; Ax = b,\; x \geq 0'
intro: >
  Linear programming optimises a linear objective over a polytope defined by
  linear constraints. The simplex algorithm and interior-point methods solve it in
  practice; duality theory gives deep economic interpretations.
related_concepts:
  - convex-optimization
  - linear-algebra
  - optimization
difficulty: intermediate
difficulty_level: 3
---

## Standard form

$$\min_{x} c^\top x \quad \text{subject to} \quad Ax = b, \quad x \geq 0$$

Every LP can be put in this form. The feasible region is a polytope; the optimum (if it exists) lies at a vertex.

## The simplex algorithm

Move between adjacent vertices of the feasible polytope, always decreasing the objective. Worst-case exponential but polynomial in practice — runs in $O(m^2 n)$ per pivot on $m$ constraints and $n$ variables.

## LP duality

The dual of the standard-form LP is:

$$\max_y b^\top y \quad \text{subject to} \quad A^\top y \leq c$$

**Strong duality:** primal and dual optima are equal. The dual variables $y^*$ are shadow prices — the marginal value of relaxing each constraint.

## Applications

LP solves network flow, scheduling, resource allocation, and is a subroutine in branch-and-bound for integer programs and column generation for large-scale problems.
