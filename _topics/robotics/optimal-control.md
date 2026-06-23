---
title: "Optimal Control in Robotics"
field: robotics
description: Optimal control finds inputs that minimize a cost functional over a trajectory, from LQR for linear systems to MPC and iLQR for nonlinear robots.
intro: >
  Optimal control formulates robot planning and control as a constrained optimization problem
  over trajectories. The Linear Quadratic Regulator provides a closed-form solution for linear
  systems; iterative LQR and model predictive control extend these ideas to the nonlinear,
  constrained systems encountered in real robotics.
math_concepts:
  - control-theory
  - optimization
  - variational-calculus
  - dynamical-systems
difficulty: expert
difficulty_level: 5
read_time: 16
---

## Continuous-Time Optimal Control

Consider a dynamical system $\dot{x} = f(x, u)$ with state $x \in \mathbb{R}^n$ and control $u \in \mathcal{U} \subset \mathbb{R}^m$. The optimal control problem minimizes a cost functional over a finite horizon $[0, T]$:

$$J(x_0, u(\cdot)) = \int_0^T \ell(x(t), u(t))\, dt + \phi(x(T))$$

subject to $\dot{x} = f(x, u)$, $x(0) = x_0$, and $u(t) \in \mathcal{U}$. The running cost $\ell$ penalizes state deviations and control effort; the terminal cost $\phi$ enforces final conditions.

The **value function** $V(x, t)$ gives the optimal cost-to-go from state $x$ at time $t$:

$$V(x, t) = \min_{u(\cdot)} \int_t^T \ell(x, u)\, d\tau + \phi(x(T))$$

By Bellman's principle of optimality, $V$ satisfies the **Hamilton-Jacobi-Bellman (HJB) equation**:

$$-\frac{\partial V}{\partial t} = \min_{u \in \mathcal{U}} \left[ \ell(x, u) + \frac{\partial V}{\partial x} f(x, u) \right], \quad V(x, T) = \phi(x)$$

The optimal control is recovered as $u^*(x, t) = \arg\min_{u} \left[\ell(x,u) + \nabla_x V \cdot f(x,u)\right]$. Solving the HJB PDE is generally intractable in high dimensions — it is the "curse of dimensionality" of dynamic programming.

## Linear Quadratic Regulator

For linear systems $\dot{x} = Ax + Bu$ with quadratic cost:

$$J = \int_0^\infty \left(x^\top Q x + u^\top R u\right) dt, \qquad Q \succeq 0,\; R \succ 0$$

the HJB equation reduces to the algebraic **Riccati equation**:

$$PA + A^\top P - PBR^{-1}B^\top P + Q = 0$$

The optimal feedback law is linear:

$$u^* = -Kx, \qquad K = R^{-1}B^\top P$$

where $P \succ 0$ is the unique positive-definite solution (guaranteed when $(A, B)$ is stabilizable and $(A, C)$ is detectable with $Q = C^\top C$). The closed-loop system $\dot{x} = (A - BK)x$ is asymptotically stable.

The finite-horizon LQR has a time-varying gain $K(t)$ obtained by integrating the differential Riccati equation backward from $P(T) = Q_f$:

$$-\dot{P} = PA + A^\top P - PBR^{-1}B^\top P + Q$$

| Parameter | Effect |
|---|---|
| Large $Q$ | Penalizes state error heavily → fast convergence, large $u$ |
| Large $R$ | Penalizes control effort → small $u$, slower response |
| $Q = C^\top C$ | Penalizes output $y = Cx$ rather than full state |

## Pontryagin Minimum Principle

For constrained inputs $u \in \mathcal{U}$ (not handled by LQR), the **Pontryagin Minimum Principle (PMP)** provides necessary conditions. Define the Hamiltonian:

$$\mathcal{H}(x, u, \lambda) = \ell(x, u) + \lambda^\top f(x, u)$$

where $\lambda(t) \in \mathbb{R}^n$ is the co-state (adjoint variable). Necessary conditions for optimality:

$$\dot{x}^* = \frac{\partial \mathcal{H}}{\partial \lambda} = f(x^*, u^*), \qquad x^*(0) = x_0$$

$$-\dot{\lambda}^* = \frac{\partial \mathcal{H}}{\partial x} = \nabla_x \ell + \left(\frac{\partial f}{\partial x}\right)^\top \lambda^*, \qquad \lambda^*(T) = \nabla_x \phi(x^*(T))$$

$$u^*(t) = \arg\min_{u \in \mathcal{U}}\, \mathcal{H}(x^*(t), u, \lambda^*(t))$$

For bang-bang control ($\mathcal{U} = \{-1, +1\}^m$), the minimum principle shows the optimal input is determined by the sign of the **switching function** $\sigma(t) = B^\top \lambda(t)$.

## iLQR for Nonlinear Systems

**Iterative LQR** solves nonlinear optimal control by repeatedly linearizing around the current trajectory and applying LQR to the linearized system. Given a nominal trajectory $(x_t, u_t)$, linearize:

$$\delta\dot{x} = A_t \delta x + B_t \delta u, \qquad A_t = \frac{\partial f}{\partial x}\bigg|_{(x_t,u_t)},\; B_t = \frac{\partial f}{\partial u}\bigg|_{(x_t,u_t)}$$

The local quadratic cost is:

$$\ell_t(\delta x, \delta u) \approx \frac{1}{2}\begin{pmatrix}\delta x \\ \delta u\end{pmatrix}^\top \begin{pmatrix} Q_{xx} & Q_{xu} \\ Q_{ux} & Q_{uu} \end{pmatrix} \begin{pmatrix}\delta x \\ \delta u\end{pmatrix} + q_x^\top \delta x + q_u^\top \delta u$$

Backward pass: compute value function quadratic approximations $\{V_t, v_t\}$ via Riccati recursion, obtaining feedback gains $K_t$ and feedforward terms $k_t$:

$$\delta u_t^* = -K_t \delta x_t - k_t$$

Forward pass: simulate the nonlinear system with $u_t \leftarrow u_t + \alpha k_t + K_t(x_t - \bar{x}_t)$, using a line search on $\alpha \in (0,1]$ to ensure cost decrease.

iLQR converges quadratically near the optimum and handles nonlinear dynamics exactly during forward simulation. It is the core of trajectory optimization in systems like Boston Dynamics Atlas.

## Model Predictive Control

**MPC** solves a finite-horizon optimal control problem at each time step using the current state measurement:

$$\min_{u_{0|t},\ldots,u_{N-1|t}} \sum_{k=0}^{N-1} \ell(x_{k|t}, u_{k|t}) + \phi(x_{N|t})$$

subject to $x_{k+1|t} = f(x_{k|t}, u_{k|t})$, $x_{0|t} = x_t$, $u \in \mathcal{U}$, $x \in \mathcal{X}$.

Only the first control $u^*_{0|t}$ is applied; the optimization is repeated at $t+1$. This **receding horizon** strategy provides:

- **Feedback**: state measurement is incorporated every step
- **Constraint satisfaction**: hard constraints on $u$ and $x$ are enforced explicitly
- **Disturbance rejection**: unmodeled dynamics are corrected each step

**Stability** requires a terminal cost $\phi$ and (optionally) a terminal constraint $x_{N|t} \in \mathcal{X}_f$ designed so $\phi$ is a control Lyapunov function for the terminal region. With these ingredients, closed-loop stability is guaranteed despite the finite horizon.

Solving the MPC QP in real-time requires $O(N^3 n^3)$ for generic QP solvers or $O(N n^2)$ with Riccati-based structure-exploiting methods (ACADO, HPIPM). For linear MPC with $N=20$, $n=6$, this runs at 1 kHz on a modern CPU.

**Nonlinear MPC** uses iLQR or direct collocation as the inner solver, enabling control of legged robots, aerial vehicles, and autonomous cars.
