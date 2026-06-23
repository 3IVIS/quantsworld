---
title: "Traveling Salesman Problem"
field: operations-research
description: Find the shortest tour visiting all cities exactly once — a canonical NP-hard problem driving advances in combinatorial optimization and approximation algorithms.
intro: >
  The Traveling Salesman Problem asks for the minimum-cost Hamiltonian cycle through a set of cities. Despite its simple statement, TSP is NP-hard and serves as a benchmark for exact algorithms, heuristics, and approximation theory. Modern solvers combine branch-and-cut with sophisticated LP relaxations to solve instances with tens of thousands of cities.
math_concepts:
  - linear-programming
  - graph-theory
  - convex-optimization
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Problem Formulation

Given $n$ cities with pairwise costs $c_{ij}$, find a tour of minimum total cost. The **integer programming formulation** uses binary variables $x_{ij} \in \{0,1\}$ indicating whether edge $(i,j)$ is in the tour:

$$\min \sum_{i \ne j} c_{ij} x_{ij}$$

$$\text{s.t.} \quad \sum_{j \ne i} x_{ij} = 1, \quad \sum_{j \ne i} x_{ji} = 1 \quad \forall i$$

$$\sum_{i \in S, j \notin S} x_{ij} \ge 1 \quad \forall S \subset V, S \ne \emptyset, V$$

The last constraints are **subtour elimination constraints** (SECs). There are exponentially many SECs, but they can be separated in polynomial time via max-flow.

## LP Relaxation and Bounds

The **Held-Karp LP relaxation** is the subtour LP with $x_{ij} \in [0,1]$. Its optimal value gives the best known polynomial-time lower bound. The gap between LP and TSP optimal is typically less than 1%.

The **Held-Karp bound** via 1-tree relaxation: remove one vertex $r$, find a minimum spanning tree $T$ on the remaining vertices, add the two cheapest edges incident to $r$:

$$\text{HK} = \min_\lambda \; w(1\text{-tree}(\lambda)) - \sum_i \lambda_i (d_i - 2)$$

where $\lambda_i$ are Lagrange multipliers for degree constraints. This is a subgradient optimization problem.

## Christofides' Algorithm

For metric TSP (triangle inequality holds), **Christofides' algorithm** gives a $\frac{3}{2}$-approximation:

1. Compute minimum spanning tree $T$.
2. Find odd-degree vertices $O$ in $T$.
3. Compute minimum-weight perfect matching $M$ on $O$.
4. Combine $T \cup M$ to get an Eulerian graph.
5. Shortcut the Euler tour to a Hamiltonian cycle.

$$\text{cost}(T) \le \text{OPT}, \quad \text{cost}(M) \le \frac{1}{2}\text{OPT} \implies \text{cost} \le \frac{3}{2}\text{OPT}$$

The $\frac{3}{2}$ bound was the best known for 40+ years; in 2020, a $(1.5 - \varepsilon)$ algorithm was announced.

## Nearest Neighbor and Heuristics

The **nearest neighbor heuristic** builds a tour greedily:
1. Start at any city.
2. Always visit the closest unvisited city.
3. Return to start.

Performance: typically within 20–25% of optimal. **2-opt** improvement swaps pairs of edges:

$$\Delta = c_{i,i+1} + c_{j,j+1} - c_{i,j} - c_{i+1,j+1}$$

If $\Delta > 0$, remove the two edges and reconnect. Repeat until no improving swap exists.

## Lin-Kernighan Moves

**3-opt** and **Lin-Kernighan (LK) moves** allow more complex edge exchanges:

A $k$-opt move removes $k$ edges and reconnects the resulting segments differently. The LK algorithm uses variable-depth search:
- Start with a candidate edge to remove.
- Greedily add/remove edges maintaining tour structure.
- Accept improvements; backtrack otherwise.

LK and its variants (LKH) find near-optimal solutions within seconds on instances with hundreds of thousands of cities.

## Branch-and-Cut

The **Concorde solver** combines:
1. LP relaxation (subtour LP)
2. Cutting planes: Gomory cuts, comb inequalities, blossoms
3. Branch and bound with strong branching

**Comb inequalities**: for a handle $H$ and teeth $T_1, \ldots, T_k$ (k odd):

$$\sum_{e \in \delta(H)} x_e + \sum_{i=1}^k \sum_{e \in \delta(T_i)} x_e \ge 3k + 1$$

These are facets of the TSP polytope and tighten the LP dramatically.

## Variants

| Variant | Modification |
|---|---|
| Asymmetric TSP | $c_{ij} \ne c_{ji}$ |
| VRPTW | Multiple vehicles, time windows |
| Prize-collecting | Can skip cities at a penalty |
| Clustered TSP | Must visit clusters consecutively |
| mTSP | Multiple salespeople, single depot |

The **vehicle routing problem (VRP)** generalizes TSP to capacitated routes serving customers from a depot, directly applicable to logistics and last-mile delivery.
