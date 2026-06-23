---
title: Network Theory
slug: network-theory
equation: 'C_i = \frac{\text{triangles through }i}{\text{possible triangles at }i}'
intro: >
  Network theory studies complex systems as graphs — nodes and edges capturing
  relationships. Small-world and scale-free properties, centrality, and community
  structure connect it to biology, epidemiology, sociology, and economics.
related_concepts:
  - graph-theory
  - probability-theory
  - dynamical-systems
difficulty: intermediate
difficulty_level: 2
---

## Scale-free networks

Many real networks (internet, protein interactions, citations) have degree distributions following a power law:

$$P(k) \sim k^{-\gamma}, \quad \gamma \in (2, 3)$$

The Barabási–Albert preferential attachment model generates such networks: new nodes connect to existing nodes with probability proportional to their degree.

## Small-world networks

The Watts–Strogatz model interpolates between regular lattices and random graphs. At intermediate rewiring probability, networks exhibit:
- **High clustering:** triangles form locally (like a lattice)
- **Short path lengths:** any two nodes are connected by few hops (like a random graph)

The average path length scales as $O(\log N)$ — "six degrees of separation."

## Centrality measures

| Measure | Definition | Captures |
|---|---|---|
| Degree | $k_i$ | Local connectivity |
| Betweenness | Fraction of shortest paths through $i$ | Bottleneck nodes |
| PageRank | Stationary dist. of random walk | Influence/authority |
| Eigenvector | $\lambda \mathbf{v} = A\mathbf{v}$ entry | Connectivity to well-connected |
