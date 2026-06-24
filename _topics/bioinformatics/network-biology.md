---
title: "Network Biology"
field: bioinformatics
description: Graph-theoretic analysis of protein-protein interaction networks, hub genes, and community structure.
intro: >
  Network biology models cellular systems as graphs where nodes represent genes or
  proteins and edges represent interactions. Centrality measures identify critical
  hub proteins, community detection reveals functional modules, and scale-free
  topology explains the robustness and vulnerability of biological networks.
math_concepts:
  - graph-theory
  - network-theory
  - linear-algebra
  - spectral-analysis
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Network Centrality Measures

Several centrality metrics identify biologically important hub proteins:

| Measure | Definition |
|---|---|
| Degree centrality | $C_D(v) = \deg(v) / (n-1)$ |
| Betweenness | $C_B(v) = \sum_{s \neq v \neq t} \sigma_{st}(v)/\sigma_{st}$ |
| Eigenvector | $\lambda \mathbf{x} = A\mathbf{x}$, score $= x_v$ |
| Closeness | $C_C(v) = (n-1)/\sum_u d(u,v)$ |

Hub proteins with high degree and betweenness tend to be essential genes; their removal disconnects the interaction network.

## Scale-Free Degree Distribution

Protein-protein interaction (PPI) networks exhibit a power-law degree distribution:

$$P(k) \sim k^{-\gamma}, \quad 2 < \gamma < 3$$

This heavy tail means a small number of hubs connect the majority of proteins. The network is robust to random node failures but fragile to targeted hub removal — a property with direct implications for drug target identification.

## Spectral Community Detection

The graph Laplacian $L = D - A$ encodes network topology. Its eigenvectors partition proteins into functional modules. For a $k$-way partition, the relaxed normalised cut problem becomes:

$$\min_{H} \text{tr}(H^\top L_\text{sym} H), \quad L_\text{sym} = D^{-1/2} L D^{-1/2}$$

subject to $H^\top H = I$. The solution uses the $k$ smallest eigenvectors of $L_\text{sym}$, followed by $k$-means on the resulting embedding.

## Random Walk and Disease Gene Prioritisation

Random walk with restart (RWR) propagates a signal from known disease genes across the PPI network:

$$\mathbf{p}^{(t+1)} = (1-r)\,\hat{A}\,\mathbf{p}^{(t)} + r\,\mathbf{p}^{(0)}$$

where $\hat{A} = AD^{-1}$ is the column-normalised adjacency matrix, $r$ is the restart probability, and $\mathbf{p}^{(0)}$ seeds the known disease genes. Nodes with high steady-state scores $\mathbf{p}^*$ are candidate disease genes.
