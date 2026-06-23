---
title: Eigenvalues & Eigenvectors
slug: eigenvalues
equation: 'A\mathbf{v} = \lambda\mathbf{v}'
intro: >
  Eigenvectors are special directions that a linear transformation stretches without rotating.
  Eigenvalues measure the amount of stretching. Together they reveal the intrinsic structure
  of any linear transformation and appear in PCA, quantum mechanics, graph theory, and more.
related_concepts:
  - linear-algebra
  - optimization
difficulty: intermediate
difficulty_level: 3
---

## Definition

For a square matrix $A \in \mathbb{R}^{n\times n}$, a non-zero vector $\mathbf{v}$ is an eigenvector with eigenvalue $\lambda$ if:

$$A\mathbf{v} = \lambda\mathbf{v}$$

Eigenvalues are roots of the **characteristic polynomial** $\det(A - \lambda I) = 0$.

## Spectral theorem

For real symmetric $A = A^\top$, all eigenvalues are real and eigenvectors can be chosen orthonormal — the **spectral decomposition**:

$$A = Q\Lambda Q^\top = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^\top$$

This is the foundation of PCA, where $A = X^\top X$ and the eigenvectors are principal components.
