---
title: Graph Theory
slug: graph-theory
equation: 'L = D - A, \quad L\mathbf{v} = \lambda\mathbf{v}'
intro: >
  Graph theory studies networks of vertices connected by edges.
  The Laplacian, spectral graph theory, and network flow are its key tools —
  used in bioinformatics, social networks, operations research, and machine learning.
related_concepts:
  - linear-algebra
  - eigenvalues
  - optimization
difficulty: intermediate
difficulty_level: 2
---

## Graph Laplacian

For an undirected graph with adjacency matrix $A$ and degree matrix $D$, the **graph Laplacian** is $L = D - A$.

Properties: $L$ is symmetric positive semi-definite; its eigenvalues $0 = \lambda_1 \leq \lambda_2 \leq \cdots$ encode connectivity. The **Fiedler value** $\lambda_2 > 0$ iff the graph is connected.

Spectral clustering uses the bottom $k$ eigenvectors of $L$ as features.

## Shortest paths and flow

- **Dijkstra's algorithm:** single-source shortest paths in $O((V+E)\log V)$
- **Bellman-Ford:** handles negative weights, detects negative cycles
- **Max-flow min-cut:** the maximum flow equals the minimum cut capacity (Ford–Fulkerson)

## Random graphs

The **Erdős–Rényi model** $G(n,p)$: $n$ vertices, each edge present with probability $p$.

Phase transition: for $p = c/n$, the graph transitions from many small components ($c<1$) to a giant component ($c>1$) at $c=1$.
