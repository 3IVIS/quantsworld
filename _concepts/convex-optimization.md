---
title: Convex Optimization
slug: convex-optimization
equation: '\min_{x \in \mathcal{C}} f(x), \quad f \text{ convex}, \mathcal{C} \text{ convex}'
intro: >
  Convex optimization is the class of problems where every local minimum is global.
  It covers linear programming, quadratic programming, and semidefinite programming —
  and is the theoretical backbone of ML, finance, and operations research.
related_concepts:
  - optimization
  - linear-programming
  - linear-algebra
difficulty: advanced
difficulty_level: 4
---

## Convex sets and functions

A set $\mathcal{C}$ is **convex** if $\lambda x + (1-\lambda)y \in \mathcal{C}$ for all $x,y \in \mathcal{C}$, $\lambda \in [0,1]$.

A function $f$ is convex if its epigraph is a convex set, equivalently:

$$f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda)f(y)$$

For twice-differentiable $f$: convexity $\Leftrightarrow \nabla^2 f \succeq 0$.

## Duality

Every convex problem has a **dual** obtained via the Lagrangian $L(x,\lambda,\nu) = f_0(x) + \sum\lambda_i f_i(x) + \sum\nu_j h_j(x)$:

$$g(\lambda,\nu) = \inf_x L(x,\lambda,\nu)$$

Strong duality holds (primal = dual optimal) under Slater's condition. The dual reveals shadow prices and certificates of optimality.

## Algorithms

- **Gradient descent:** $O(1/\epsilon)$ iterations for $L$-smooth convex functions
- **Accelerated GD (Nesterov):** $O(1/\sqrt\epsilon)$ — optimal for first-order methods
- **Interior-point:** $O(\sqrt{n})$ Newton steps — polynomial time, handles constraints
