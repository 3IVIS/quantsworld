---
title: "Single-Cell RNA Sequencing"
field: bioinformatics
description: Dimensionality reduction, clustering, and trajectory inference for high-dimensional single-cell transcriptomic data.
intro: >
  Single-cell RNA sequencing (scRNA-seq) measures gene expression in thousands of
  individual cells simultaneously, producing high-dimensional count matrices.
  Analysis pipelines combine dimensionality reduction, graph-based clustering, and
  pseudotime inference to reveal cell types and developmental trajectories.
math_concepts:
  - linear-algebra
  - eigenvalues
  - graph-theory
  - probability-theory
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Count Normalisation and Log-Transformation

Raw UMI counts $x_{ic}$ for gene $i$ in cell $c$ are normalised to correct for library size differences:

$$\tilde{x}_{ic} = \log\!\left(1 + \frac{x_{ic}}{\sum_i x_{ic}} \times 10^4\right)$$

This log-normalisation stabilises variance across the expression range before downstream analysis.

## PCA for Dimensionality Reduction

Cells form an $n \times p$ matrix $X$ ($n$ cells, $p$ highly variable genes). PCA extracts the top-$k$ principal components via the eigendecomposition of the sample covariance:

$$X^\top X\, \mathbf{v}_k = \lambda_k \mathbf{v}_k$$

The projection $Z = X V_k \in \mathbb{R}^{n \times k}$ (typically $k = 50$) captures the major axes of transcriptional variation. UMAP then embeds $Z$ into two dimensions by preserving fuzzy topological structure.

## Graph-Based Clustering

A $k$-nearest-neighbour graph $G = (V, E)$ is built on the PCA embedding. The Leiden algorithm partitions $G$ by optimising modularity:

$$Q = \frac{1}{2m}\sum_{ij}\left[A_{ij} - \frac{k_i k_j}{2m}\right]\delta(c_i, c_j)$$

where $m = |E|$, $k_i$ is the degree of cell $i$, and $\delta(c_i, c_j) = 1$ if both cells share a community. Leiden refines Louvain by guaranteeing well-connected communities.

## Pseudotime Trajectory Inference

Pseudotime orders cells along a latent developmental axis. Diffusion pseudotime (DPT) uses the diffusion operator:

$$M = D^{-1} A, \quad D_{ii} = \sum_j A_{ij}$$

Eigenvectors of $M$ describe diffusion distances. Pseudotime $t_c$ is assigned as the diffusion distance from a root cell, capturing branching differentiation trajectories without requiring time-series data.
