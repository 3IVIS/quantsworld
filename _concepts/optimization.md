---
title: Optimization
slug: optimization
equation: '\theta^* = \arg\min_\theta \mathcal{L}(\theta)'
intro: >
  Mathematical optimization finds the best solution from a set of feasible alternatives.
  From gradient descent in ML to linear programming in operations research, it is the
  computational engine behind nearly every quantitative field.
related_concepts:
  - linear-algebra
  - matrix-calculus
  - gaussian-distribution
difficulty: intermediate
difficulty_level: 3
---

## First-order conditions

For differentiable $f: \mathbb{R}^n \to \mathbb{R}$, a necessary condition for a local minimum is:

$$\nabla f(\mathbf{x}^*) = \mathbf{0}$$

**Second-order sufficient condition:** $\nabla^2 f(\mathbf{x}^*)$ is positive definite.

## Convexity

A function $f$ is convex if:

$$f(\lambda\mathbf{x} + (1-\lambda)\mathbf{y}) \leq \lambda f(\mathbf{x}) + (1-\lambda)f(\mathbf{y}), \quad \forall \lambda \in [0,1]$$

For convex $f$, every local minimum is a global minimum. This is why convex loss functions are so important in ML.

## Constrained optimization (KKT)

Minimize $f(\mathbf{x})$ subject to $g_i(\mathbf{x}) \leq 0$ and $h_j(\mathbf{x}) = 0$. The KKT conditions require:

$$\nabla f(\mathbf{x}^*) + \sum_i \mu_i \nabla g_i(\mathbf{x}^*) + \sum_j \lambda_j \nabla h_j(\mathbf{x}^*) = \mathbf{0}$$

with $\mu_i \geq 0$ and $\mu_i g_i(\mathbf{x}^*) = 0$ (complementary slackness).
