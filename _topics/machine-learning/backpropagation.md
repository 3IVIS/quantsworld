---
title: Backpropagation
field: machine-learning
description: Efficient computation of gradients in neural networks via the chain rule of calculus.
intro: >
  Backpropagation is the algorithm that makes training deep neural networks tractable.
  It applies the chain rule of calculus systematically to compute gradients of the loss
  with respect to every parameter in a network in a single backward pass.
math_concepts:
  - matrix-calculus
  - optimization
  - linear-algebra
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Forward pass

A feedforward network with $L$ layers computes:

$$a^{(l)} = \sigma(W^{(l)} a^{(l-1)} + b^{(l)}), \quad l = 1, \ldots, L$$

The final layer outputs predictions; the loss $\mathcal{L}$ measures their quality.

## Backward pass — the chain rule

Define $\delta^{(l)} = \frac{\partial \mathcal{L}}{\partial z^{(l)}}$ where $z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$ (pre-activation). Then:

**Output layer:**
$$\delta^{(L)} = \nabla_{a^{(L)}} \mathcal{L} \odot \sigma'(z^{(L)})$$

**Hidden layers (propagate backwards):**
$$\delta^{(l)} = \left((W^{(l+1)})^\top \delta^{(l+1)}\right) \odot \sigma'(z^{(l)})$$

**Parameter gradients:**
$$\frac{\partial \mathcal{L}}{\partial W^{(l)}} = \delta^{(l)} (a^{(l-1)})^\top, \qquad \frac{\partial \mathcal{L}}{\partial b^{(l)}} = \delta^{(l)}$$

## Computational cost

Backpropagation computes all $\sum_l (d_{l-1} d_l + d_l)$ gradients in $O(\text{forward pass cost})$ time — a remarkable fact enabled by dynamic programming (storing intermediate activations).

## The vanishing gradient problem

For deep networks with sigmoid activations, $|\sigma'(z)| \leq 0.25$. After $L$ layers, $|\delta^{(1)}| \leq 0.25^L \cdot |\delta^{(L)}|$ — gradients vanish exponentially. Solutions: ReLU activations, batch normalisation, residual connections.
