---
title: "Motion Planning"
field: robotics
description: Algorithms for finding collision-free, dynamically feasible, and optimally smooth robot trajectories from start to goal.
intro: >
  Motion planning computes a trajectory that moves a robot from a start configuration to a goal
  while satisfying constraints including obstacle avoidance, kinematic limits, and smoothness.
  The field spans classical methods like potential fields and cell decomposition to modern
  gradient-based trajectory optimizers that jointly handle collision avoidance and dynamics.
math_concepts:
  - optimization
  - dynamical-systems
  - graph-theory
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Holonomic and Nonholonomic Constraints

A robot is **holonomic** if all degrees of freedom can be independently commanded — its achievable velocities span the full tangent space $T_q\mathcal{C}$. A **nonholonomic** constraint restricts instantaneous velocity without restricting reachable configurations:

$$A(q)\dot{q} = 0, \qquad \text{rank}(A) < n$$

The classic example is the differential-drive robot (or car): the no-slip constraint $\dot{y}\cos\theta - \dot{x}\sin\theta = 0$ prevents sideways motion at any instant, yet the robot can park anywhere. Formally, by Chow's theorem, the distribution $\Delta = \ker(A)$ is bracket-generating (the Lie brackets of its vector fields span $T_q\mathcal{C}$), ensuring full reachability despite the constraint.

Planning for nonholonomic systems requires respecting the constraint during local steering — linear interpolation in $\mathcal{C}$ is generally inadmissible.

## Potential Field Methods

Artificial potential field methods guide the robot with a virtual force derived from a scalar potential $U(q)$:

$$U(q) = U_\text{att}(q) + U_\text{rep}(q)$$

**Attractive potential** pulls toward the goal $q_\text{goal}$:

$$U_\text{att}(q) = \frac{1}{2} k_\text{att} \|q - q_\text{goal}\|^2$$

**Repulsive potential** pushes away from obstacles within influence distance $d^*$:

$$U_\text{rep}(q) = \begin{cases} \frac{1}{2} k_\text{rep}\left(\frac{1}{d(q)} - \frac{1}{d^*}\right)^2 & d(q) \leq d^* \\ 0 & d(q) > d^* \end{cases}$$

where $d(q)$ is the clearance to the nearest obstacle. The robot follows the negative gradient:

$$F(q) = -\nabla U(q) = -\nabla U_\text{att} - \nabla U_\text{rep}$$

Potential fields are simple and reactive but suffer from **local minima** — configurations where $\nabla U = 0$ but $q \neq q_\text{goal}$. Harmonic potential functions (satisfying Laplace's equation $\nabla^2 U = 0$) guarantee global minima equal the goal, but are expensive to compute.

## Bug Algorithms

Bug algorithms require only a contact sensor and a distance-to-goal estimate. **Bug2** follows a rule:

1. Move straight toward goal along the M-line
2. On obstacle contact: circumnavigate the obstacle
3. Leave circumnavigation when the M-line is hit again at a point closer to the goal than the hit point

Bug2 guarantees termination and finds a path of length at most $O(P + d)$ where $P$ is the obstacle perimeter and $d$ is the straight-line distance. Tangent Bug uses range sensors to select the shortest local path around the obstacle boundary.

## Cell Decomposition

**Exact cell decomposition** (trapezoidal decomposition) partitions $\mathcal{C}_\text{free}$ into simple cells whose adjacency is captured in a connectivity graph. Planning reduces to graph search:

1. Decompose free space into trapezoids/triangles
2. Build adjacency graph on cells
3. Run Dijkstra/A* on the graph
4. Within each cell, path is a straight line

**Approximate cell decomposition** (fixed-resolution grid) is simpler to implement but introduces resolution dependence. A* on a 2D grid with diagonal moves uses the octile heuristic:

$$h(n) = \max(\Delta x, \Delta y) + (\sqrt{2}-1)\min(\Delta x, \Delta y)$$

**Voronoi roadmaps** place the robot on the Generalized Voronoi Diagram — the set of points equidistant from the two nearest obstacles. Paths on the GVD maximize clearance and are computed via distance transforms in $O(A)$ for a grid of area $A$.

## Trajectory Optimization: CHOMP

**CHOMP** (Covariant Hamiltonian Optimization for Motion Planning) finds a smooth, collision-free trajectory $\xi: [0,1] \to \mathcal{C}$ by minimizing:

$$\mathcal{U}[\xi] = \frac{\lambda}{2}\int_0^1 \|\xi'(s)\|^2 ds + \int_0^1 c(\xi(s))\|\xi'(s)\| ds$$

The first term is the smoothness functional (squared velocity norm); the second integrates the obstacle cost $c(q)$ along arc length. Discretizing $\xi$ into $T$ waypoints $\{q_t\}$ and writing the smoothness term as $\xi^\top A^\top A \xi$ (with $A$ the finite-difference matrix), the gradient update is:

$$\xi \leftarrow \xi - \eta M^{-1}\left(A^\top A \xi + \nabla_\xi C_\text{obs}\right)$$

The metric $M = A^\top A$ is the covariant metric in function space, ensuring the update is a gradient step in the Hilbert space of trajectories — not just in the Euclidean parameter space. This corrects for waypoint spacing.

The obstacle gradient $\nabla_q c(q)$ is computed from the signed distance field or from the workspace Jacobian mapped through $J(q)$.

## STOMP: Stochastic Trajectory Optimization

**STOMP** (Stochastic Trajectory Optimization for Motion Planning) avoids computing cost gradients by sampling noisy trajectories:

$$q_{t,k} = q_t + \epsilon_{t,k}, \quad \epsilon_{t,k} \sim \mathcal{N}(0, R^{-1})$$

where $R = A^\top A$ is the smoothness precision matrix so samples are smooth by construction. The update uses weighted averaging:

$$\Delta q_t = \frac{\sum_k P_k \epsilon_{t,k}}{\sum_k P_k}, \qquad P_k = \frac{\exp(-S_k/\lambda)}{\sum_j \exp(-S_j/\lambda)}$$

where $S_k$ is the total cost of sample $k$. STOMP handles non-smooth and non-differentiable costs (e.g., binary collision indicators) and is parallelizable across samples.

## Time-Optimal Planning

Given a path $\gamma(s)$ parameterized by arc length $s \in [0, L]$, time-optimal planning finds the time profile $s(t)$ minimizing traversal time subject to:

$$\dot{s}^2 \leq v_\text{max}^2(s), \qquad |\ddot{s}| \leq a_\text{max}(s)$$

The velocity limits $v_\text{max}(s)$ arise from joint velocity, torque, and curvature constraints: at high-curvature points, centripetal acceleration limits speed. The **Bobrow algorithm** computes the time-optimal profile in $O(L/\Delta s)$ by finding the maximum-velocity curve and patching acceleration/deceleration arcs at switching points. This gives a bang-bang solution: full acceleration or full deceleration between switch points.
