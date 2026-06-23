---
title: Linear Algebra
slug: linear-algebra
equation: 'A\mathbf{v} = \lambda\mathbf{v}'
intro: >
  Linear algebra is the mathematics of vectors, matrices, and linear transformations.
  It is the language of data science, physics, and engineering — underpinning
  regression, neural networks, quantum mechanics, and signal processing.
related_concepts:
  - eigenvalues
  - optimization
  - matrix-calculus
  - gaussian-distribution
difficulty: beginner
difficulty_level: 2
---

## Vector spaces

A **vector space** over $\mathbb{R}$ is a set $V$ with addition and scalar multiplication satisfying eight axioms (closure, associativity, identity elements, inverses, distributivity).

Key subspaces of a matrix $A \in \mathbb{R}^{m \times n}$:
- **Column space** $\text{col}(A)$: set of all $A\mathbf{x}$ — relevant for OLS (projection)
- **Null space** $\text{null}(A)$: set of all $\mathbf{x}$ with $A\mathbf{x}=\mathbf{0}$ — relevant for identifiability
- **Row space** $\text{row}(A)$: complement of the null space

## Matrix decompositions

| Decomposition | Form | Applications |
|---|---|---|
| **Eigendecomposition** | $A = Q\Lambda Q^{-1}$ | PCA, spectral clustering |
| **SVD** | $A = U\Sigma V^\top$ | Dimensionality reduction, pseudoinverse |
| **QR** | $A = QR$ | Numerically stable OLS |
| **Cholesky** | $A = LL^\top$ | Gaussian sampling, GP regression |
| **LU** | $A = LU$ | Linear system solving |
