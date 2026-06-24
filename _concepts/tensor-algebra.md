---
title: Tensor Algebra
slug: tensor-algebra
equation: 'T^{\mu\nu} = T^{\mu}{}_\lambda g^{\lambda\nu}'
intro: >
  Tensors are multilinear maps that generalize scalars, vectors, and matrices to
  arbitrary rank, transforming consistently under changes of basis. Tensor algebra
  provides the language of general relativity, continuum mechanics, and modern
  deep learning, where neural network weights are naturally represented as tensors.
related_concepts:
  - linear-algebra
  - differential-geometry
  - quantum-mechanics
  - group-theory
difficulty: advanced
difficulty_level: 3
---

## Tensors and index notation

A rank-$(p, q)$ tensor $T^{\mu_1\cdots\mu_p}{}_{\nu_1\cdots\nu_q}$ has $p$ contravariant and $q$ covariant indices. Einstein summation convention contracts repeated upper-lower index pairs automatically:

$$v^\mu = g^{\mu\nu} v_\nu$$

The metric tensor $g^{\mu\nu}$ raises indices, while $g_{\mu\nu}$ lowers them. The Kronecker delta $\delta^\mu_\nu$ acts as the identity, and the Levi-Civita symbol $\epsilon_{\mu\nu\rho}$ encodes orientation and cross products.

## Key operations

The outer product of tensors $A^{\mu}$ and $B^{\nu}$ yields $C^{\mu\nu} = A^\mu B^\nu$. Contraction reduces rank by two: $T^\mu{}_\mu = \text{tr}(T)$. The covariant derivative $\nabla_\mu$ generalizes partial differentiation to curved spaces, introducing Christoffel symbols to account for basis vector changes.

## Applications

Tensor algebra appears in the Einstein field equations of general relativity, the stress-strain relations of elasticity, and machine learning frameworks such as TensorFlow and PyTorch. In deep learning, convolutional operations and attention mechanisms are naturally expressed as tensor contractions, enabling efficient GPU parallelization.
