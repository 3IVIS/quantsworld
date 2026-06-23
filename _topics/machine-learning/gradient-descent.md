---
title: Gradient Descent
field: machine-learning
description: Iterative optimisation by following the steepest downhill direction. The engine of modern ML.
intro: >
  Gradient descent minimises a loss function by iteratively moving in the direction of
  steepest descent. It is the engine behind training neural networks, fitting GLMs,
  and most of modern machine learning.
math_concepts:
  - optimization
  - linear-algebra
  - matrix-calculus
difficulty: beginner
difficulty_level: 2
read_time: 7
---

## The update rule

Given a differentiable loss $\mathcal{L}(\theta)$, the gradient descent update is:

$$\theta_{t+1} \leftarrow \theta_t - \eta\,\nabla_\theta \mathcal{L}(\theta_t)$$

where $\eta > 0$ is the **learning rate** (step size). The gradient $\nabla_\theta \mathcal{L}$ points in the direction of steepest *ascent*, so subtracting it moves downhill.

## Convergence

For a $\mu$-strongly convex, $L$-smooth function, gradient descent converges at a linear rate:

$$\mathcal{L}(\theta_t) - \mathcal{L}(\theta^*) \leq \left(1 - \frac{\mu}{L}\right)^t [\mathcal{L}(\theta_0) - \mathcal{L}(\theta^*)]$$

The **condition number** $\kappa = L/\mu$ governs convergence speed — large $\kappa$ means slow convergence (ill-conditioned problem).

## Variants

| Method | Update | When to use |
|---|---|---|
| **Batch GD** | Full dataset gradient | Small datasets |
| **SGD** | Single sample gradient | Online/large data |
| **Mini-batch SGD** | Batch of $B$ samples | Default in deep learning |
| **Adam** | Adaptive per-parameter $\eta$ | Deep networks |
| **L-BFGS** | Second-order approximation | Smooth, moderate-scale |

## Learning rate selection

The learning rate must be below $2/L$ for convergence. In practice:
- Too large → divergence or oscillation.
- Too small → prohibitively slow convergence.
- **Learning rate schedules** (cosine annealing, warm restarts) often outperform fixed rates.
