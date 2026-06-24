---
title: Dimensionality Reduction
slug: dimensionality-reduction
equation: 'X \approx U_k \Sigma_k V_k^T'
intro: >
  Dimensionality reduction finds low-dimensional representations of high-dimensional
  data while preserving structure such as variance or pairwise distances. It is
  central to data visualization, noise reduction, and computational efficiency,
  and rests on the manifold hypothesis that real-world data lies near a
  low-dimensional manifold embedded in high-dimensional space.
related_concepts:
  - linear-algebra
  - eigenvalues
  - matrix-calculus
  - kernel-methods
difficulty: intermediate
difficulty_level: 2
---

## Principal component analysis

PCA finds an orthonormal basis that maximizes variance. Via the singular value decomposition $X = U \Sigma V^T$, the rank-$k$ approximation

$$X \approx U_k \Sigma_k V_k^T$$

retains the top $k$ singular values and explains the maximum possible variance with $k$ components. The fraction of variance explained by component $i$ is $\sigma_i^2 / \sum_j \sigma_j^2$.

## Nonlinear methods

When data lies on a curved manifold, linear projections lose structure. t-SNE minimizes the KL divergence between pairwise similarity distributions in high and low dimensions, preserving local neighborhoods. UMAP constructs a fuzzy topological representation and optimizes a cross-entropy objective, scaling better to large datasets and preserving more global structure.

## Applications

Dimensionality reduction appears in genomics (single-cell RNA sequencing), finance (factor models), image compression, and preprocessing pipelines for supervised learning. Kernel PCA extends PCA to nonlinear settings via the kernel trick, implicitly mapping data to a reproducing kernel Hilbert space before applying linear PCA.
