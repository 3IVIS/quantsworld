---
title: "Probabilistic Roadmaps"
field: robotics
description: Sampling-based motion planning algorithms that construct roadmaps in configuration space to find collision-free paths.
intro: >
  Probabilistic roadmaps and their variants bypass the intractability of explicit configuration
  space construction by randomly sampling configurations and connecting them with a local planner.
  RRT and RRT* extend the approach to tree-based exploration and asymptotically optimal planning,
  enabling motion planning in high-dimensional spaces that are otherwise computationally intractable.
math_concepts:
  - graph-theory
  - probability-theory
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Configuration Space

The **configuration space** $\mathcal{C}$ of a robot with $n$ degrees of freedom is the $n$-dimensional space of all joint configurations $q \in \mathbb{R}^n$. For a 6-DOF arm, $\mathcal{C} = \mathbb{T}^6$ (the six-dimensional torus for revolute joints).

The workspace obstacles $\mathcal{W}_\text{obs}$ induce a set of forbidden configurations:

$$\mathcal{C}_\text{obs} = \{q \in \mathcal{C} : \text{robot}(q) \cap \mathcal{W}_\text{obs} \neq \emptyset\}$$

The free configuration space is $\mathcal{C}_\text{free} = \mathcal{C} \setminus \mathcal{C}_\text{obs}$. Motion planning asks: given $q_\text{start}, q_\text{goal} \in \mathcal{C}_\text{free}$, find a continuous path $\pi : [0,1] \to \mathcal{C}_\text{free}$ with $\pi(0) = q_\text{start}$ and $\pi(1) = q_\text{goal}$.

Computing $\mathcal{C}_\text{obs}$ explicitly is PSPACE-hard in general. Sampling-based planners avoid this by checking membership $q \in \mathcal{C}_\text{obs}$ via forward kinematics and collision detection — an $O(1)$ operation.

## PRM: Probabilistic Roadmap Method

PRM builds a graph $G = (V, E)$ in $\mathcal{C}_\text{free}$ via two phases:

**Learning phase:**
1. Sample $q \sim \mathcal{U}(\mathcal{C})$ uniformly
2. If $q \in \mathcal{C}_\text{free}$, add to $V$
3. For each $q' \in \text{kNN}(q, k)$, if local planner $\ell(q, q') \subset \mathcal{C}_\text{free}$, add edge $(q, q') \in E$
4. Repeat until $|V| = n_\text{samples}$

**Query phase:** add $q_\text{start}$ and $q_\text{goal}$ to $G$, then run A* or Dijkstra on $G$.

The local planner $\ell$ is typically linear interpolation: $\ell(q, q', \tau) = (1-\tau)q + \tau q'$, $\tau \in [0,1]$, checked at discrete steps. This is valid only for convex joint spaces (not $SO(3)$ directly).

**Probabilistic completeness:** PRM is probabilistically complete — if a solution exists, it will be found with probability approaching 1 as $n_\text{samples} \to \infty$. Formally, if there exists a path with clearance $\delta > 0$ from $\mathcal{C}_\text{obs}$, then:

$$P(\text{failure after } n \text{ samples}) \leq c_1 \exp(-c_2 n)$$

for constants $c_1, c_2 > 0$ depending on $\delta$ and the dimension.

## RRT: Rapidly-Exploring Random Trees

RRT grows a tree rooted at $q_\text{start}$ by iteratively extending toward random samples:

```
RRT(q_start, q_goal):
  T = {q_start}
  for i = 1..N:
    q_rand = Sample()        # uniform or biased toward q_goal
    q_near = Nearest(T, q_rand)
    q_new  = Extend(q_near, q_rand, step_size)
    if CollisionFree(q_near, q_new):
      T.add(q_new)
      if ||q_new - q_goal|| < ε: return Path(T, q_new)
  return FAILURE
```

The `Nearest` operation uses a $k$-d tree for $O(\log n)$ expected cost. RRT explores the free space rapidly because each expansion step is biased toward unexplored regions via Voronoi bias — nodes with larger Voronoi cells are statistically more likely to be selected as `q_near`.

RRT is probabilistically complete but not optimal. The returned path can be arbitrarily suboptimal.

## RRT*: Asymptotic Optimality

RRT* adds two steps that repair the tree toward optimality:

1. **Near-neighbor rewiring on insertion**: instead of connecting $q_\text{new}$ only to `q_near`, find all nodes in a ball $B(q_\text{new}, r_n)$ and connect through whichever minimizes cost-from-root:

$$q_\text{parent} = \arg\min_{q' \in B(q_\text{new}, r_n)} c(q_\text{start}, q') + d(q', q_\text{new})$$

2. **Propagate cost improvement**: for each $q' \in B(q_\text{new}, r_n)$, if routing through $q_\text{new}$ gives lower cost, rewire.

The ball radius scales as:

$$r_n = \gamma \left(\frac{\log n}{n}\right)^{1/d}$$

for a constant $\gamma$ depending on the free-space volume and dimension $d$. With this schedule, RRT* is **asymptotically optimal**: the cost of the best path in the tree converges almost surely to the optimal cost $c^*$:

$$\lim_{n\to\infty} c(T_n) = c^* \quad \text{a.s.}$$

| Algorithm | Complete | Optimal | Query time |
|---|---|---|---|
| PRM | Prob. complete | No | Fast (offline) |
| RRT | Prob. complete | No | Real-time |
| RRT* | Prob. complete | Asymptotically | Slower |
| Bi-RRT | Prob. complete | No | ~2× faster |

## Kinodynamic Planning

When the robot has dynamic constraints (nonholonomic or differential constraints), simple interpolation is not a valid local planner. **Kinodynamic planning** extends RRT to systems of the form $\dot{x} = f(x, u)$:

- State space is $(q, \dot{q})$ or full dynamic state
- Extensions are generated by simulating $f$ under a random control $u$ for a short time $\Delta t$
- The Nearest metric must reflect reachability under dynamics

**State lattice planners** precompute a set of motion primitives connecting lattice states and search the resulting graph with A*, guaranteeing resolution completeness. They are highly efficient for vehicles with limited actuation (cars, quadrotors) but require careful primitive design.

## Real-Time Planning

Online replanning requires fast query response. Key techniques:

- **D* Lite**: incremental A* that efficiently repairs shortest paths as obstacles are discovered
- **MPPI (Model Predictive Path Integral)**: samples $K$ rollouts in parallel (GPU-parallelizable), weights by $\exp(-J/\lambda)$, and returns the optimal control:

$$u_t^* = \frac{\sum_k w_k u_t^{(k)}}{\sum_k w_k}, \quad w_k = \exp\!\left(-\frac{1}{\lambda} J(\tau^{(k)})\right)$$

MPPI handles complex cost functions (non-convex, non-differentiable) and is increasingly used for agile robot navigation.
