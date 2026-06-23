---
title: Matrix Calculus
slug: matrix-calculus
equation: '\nabla_\mathbf{x}(\mathbf{x}^\top A\mathbf{x}) = (A + A^\top)\mathbf{x}'
intro: >
  Matrix calculus extends differential calculus to vector and matrix arguments.
  It is indispensable for deriving gradient descent updates, computing Fisher information,
  and deriving closed-form solutions in statistics and machine learning.
related_concepts:
  - linear-algebra
  - optimization
difficulty: intermediate
difficulty_level: 3
---

## Key identities

For vectors $\mathbf{x} \in \mathbb{R}^n$ and compatible matrices:

$$\nabla_\mathbf{x}(\mathbf{a}^\top \mathbf{x}) = \mathbf{a}$$

$$\nabla_\mathbf{x}(\mathbf{x}^\top A\mathbf{x}) = (A + A^\top)\mathbf{x} = 2A\mathbf{x} \text{ if } A = A^\top$$

$$\frac{\partial}{\partial A}\log\det A = A^{-\top}$$

$$\frac{\partial}{\partial A}\text{tr}(BA) = B^\top$$

## The chain rule

For $f: \mathbb{R}^m \to \mathbb{R}$ and $g: \mathbb{R}^n \to \mathbb{R}^m$, the Jacobian of $f \circ g$ is:

$$J_{f \circ g}(\mathbf{x}) = J_f(g(\mathbf{x}))\, J_g(\mathbf{x})$$

This is the foundation of backpropagation in neural networks.
