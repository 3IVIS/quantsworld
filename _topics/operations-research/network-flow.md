---
title: Network Flow
field: operations-research
description: Optimising flows through networks — transportation, logistics, matching, and scheduling all reduce to network flow problems.
intro: >
  Network flow problems optimise the movement of commodities through a network of nodes
  and arcs. The max-flow min-cut theorem and the efficiency of specialised algorithms
  make network flow one of the most applicable areas of combinatorial optimisation.
math_concepts:
  - linear-programming
  - graph-theory
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The max-flow problem

Given a directed graph with source $s$, sink $t$, and arc capacities $u_{ij}$: find the maximum flow from $s$ to $t$ subject to:
- **Capacity:** $0 \leq f_{ij} \leq u_{ij}$
- **Conservation:** $\sum_j f_{ij} - \sum_j f_{ji} = 0$ for all $i \neq s, t$

## Max-flow min-cut theorem

The maximum flow equals the minimum cut capacity:

$$\max\text{-flow} = \min\text{-cut}$$

A **cut** is a partition $(S, T)$ with $s \in S$, $t \in T$; its capacity is $\sum_{i\in S, j\in T} u_{ij}$.

Ford-Fulkerson augments along $s$–$t$ paths in the residual graph. Edmonds-Karp (BFS paths): $O(VE^2)$.

## Minimum cost flow

Generalises max-flow with arc costs $c_{ij}$. Minimise $\sum c_{ij}f_{ij}$ subject to flow conservation and capacity. Solved by successive shortest paths or network simplex.

## Applications

- **Transportation:** ship goods from warehouses to markets at minimum cost
- **Assignment:** match workers to jobs (Hungarian algorithm, $O(n^3)$)
- **Project scheduling:** critical path method (CPM) in a DAG
- **Bipartite matching:** Hall's theorem, maximum matching via augmenting paths
