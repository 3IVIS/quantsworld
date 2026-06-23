---
title: "Integer Programming"
field: operations-research
description: Optimization over integer or binary decision variables, essential for combinatorial problems in scheduling, routing, and resource allocation.
intro: >
  Integer programming extends linear programming by requiring some or all decision variables to take integer values. This seemingly small constraint transforms tractable continuous problems into NP-hard combinatorial ones, yet modern branch-and-bound solvers with cutting planes routinely tackle problems with millions of variables.
math_concepts:
  - linear-programming
  - convex-optimization
  - graph-theory
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## From Continuous to Discrete

A **mixed-integer linear program (MILP)** has the form

$$\min_{x,y} \; c^\top x + d^\top y \quad \text{s.t.} \quad Ax + By \le b, \; x \in \mathbb{R}^n, \; y \in \mathbb{Z}^m$$

When $y \in \{0,1\}^m$ the problem is a **binary integer program (BIP)**, the workhorse of combinatorial optimization. The continuous relaxation — dropping the integrality constraint — gives a lower bound on the optimal value and serves as the root node of the branch-and-bound tree.

## Branch and Bound

The exact solution method partitions the feasible set by branching on fractional variables:

1. Solve the LP relaxation. If solution is integer-valued, done.
2. Select a fractional variable $y_j = \bar{y}_j \notin \mathbb{Z}$.
3. Create two subproblems: add $y_j \le \lfloor \bar{y}_j \rfloor$ or $y_j \ge \lceil \bar{y}_j \rceil$.
4. Prune nodes whose LP bound exceeds the best known integer solution (incumbent).

The **LP relaxation bound gap** measures problem difficulty:

$$\text{gap} = \frac{z^*_{\text{IP}} - z^*_{\text{LP}}}{|z^*_{\text{IP}}|} \times 100\%$$

## Cutting Planes

Cutting planes tighten the LP relaxation without changing the integer feasible region. The **Gomory cut** generated from row $i$ of the optimal simplex tableau is:

$$\sum_j \bar{f}_{ij} x_j \ge \bar{f}_{i0}$$

where $\bar{f}_{ij} = f(a_{ij})$ and $f(x) = x - \lfloor x \rfloor$ is the fractional part. Modern solvers combine Gomory cuts with problem-specific **valid inequalities**.

## Modeling with Binary Variables

**Logical constraints** encode combinatorial structure. If $y_1, y_2 \in \{0,1\}$:

| Constraint | Meaning | Formulation |
|---|---|---|
| $y_1 \implies y_2$ | If 1 selected, 2 must be | $y_1 \le y_2$ |
| At most $k$ of $n$ | Cardinality limit | $\sum y_i \le k$ |
| Either/or | $f_1(x) \le b_1$ or $f_2(x) \le b_2$ | Big-M with binary $\delta$ |
| Fixed cost | Pay $f$ if $x > 0$ | $x \le M \delta$, add $f\delta$ to objective |

The **big-M method** links continuous and binary variables:

$$x \le M \cdot y \quad \Rightarrow \quad x = 0 \text{ when } y=0, \; x \le M \text{ when } y=1$$

Choosing $M$ as tight as possible is critical — loose big-M coefficients weaken LP relaxations dramatically.

## The Assignment Problem

Assign $n$ workers to $n$ jobs minimizing total cost. With $x_{ij} \in \{0,1\}$:

$$\min \sum_{i,j} c_{ij} x_{ij} \quad \text{s.t.} \quad \sum_j x_{ij} = 1 \; \forall i, \quad \sum_i x_{ij} = 1 \; \forall j$$

This is a **totally unimodular** LP — the LP relaxation always yields integer solutions. The Hungarian algorithm solves it in $O(n^3)$.

## Facility Location

Given potential facility sites $I$ and customers $J$, the uncapacitated facility location problem minimizes fixed + service costs:

$$\min \sum_i f_i y_i + \sum_{i,j} c_{ij} x_{ij} \quad \text{s.t.} \quad \sum_i x_{ij} = 1 \; \forall j, \quad x_{ij} \le y_i$$

where $y_i \in \{0,1\}$ indicates whether facility $i$ is opened. This admits a strong LP relaxation with facility-based cuts:

$$\sum_i y_i \ge 1 \quad \text{(must open at least one)}$$

## Complexity

Most integer programs are NP-hard. Key complexity results:

- **Knapsack**: NP-hard in general, pseudo-polynomial via DP
- **Vertex cover**: NP-hard, but 2-approximation via LP rounding  
- **TSP**: NP-hard, no polynomial-time approximation within factor $(1+\varepsilon)$ for arbitrary $\varepsilon > 0$ unless P=NP
- **Max-flow**: Polynomial (LP with TU constraint matrix)

The **integrality gap** of a formulation bounds the worst-case ratio of LP to IP optimal:

$$\text{int. gap} = \max_{\text{instances}} \frac{z^*_{\text{LP}}}{z^*_{\text{IP}}}$$
