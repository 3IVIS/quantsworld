---
title: "Robot Dynamics"
field: robotics
description: Equations of motion for rigid-body robot manipulators derived via Lagrangian mechanics and computed efficiently with the Newton-Euler algorithm.
intro: >
  Robot dynamics describes how applied torques and forces produce motion through the robot's
  mechanical structure. The equations of motion take the form $M(q)\ddot{q} + C(q,\dot{q})\dot{q} + g(q) = \tau$,
  coupling all joints through the configuration-dependent inertia matrix. Efficient algorithms
  exploit the tree structure of the kinematic chain to evaluate these equations in linear time.
math_concepts:
  - differential-equations
  - linear-algebra
  - variational-calculus
difficulty: expert
difficulty_level: 5
read_time: 15
---

## Newton-Euler Equations for a Rigid Body

A rigid body with mass $m$, center of mass $c$, and inertia tensor $I_c$ (about the center of mass) satisfies:

$$F = m\dot{v}_c, \qquad \tau_c = I_c \dot{\omega} + \omega \times I_c\omega$$

The **inertia tensor** $I_c \in \mathbb{R}^{3\times3}$ is symmetric positive definite:

$$I_c = \int_\mathcal{B} \left(\|r\|^2 I_{3\times3} - rr^\top\right) \rho(r)\, dV$$

where $r$ is measured from the center of mass. Its eigenvalues are the **principal moments of inertia** and the eigenvectors are the principal axes. The parallel axis theorem shifts $I_c$ to an arbitrary reference point $p$:

$$I_p = I_c + m\left(\|d\|^2 I_{3\times3} - dd^\top\right), \quad d = p - c$$

For a uniform rectangular box with dimensions $(l_x, l_y, l_z)$ and mass $m$, the diagonal entries are $I_{xx} = \frac{m}{12}(l_y^2 + l_z^2)$, and so on.

## Lagrangian Mechanics

The Lagrangian $L = T - V$ (kinetic minus potential energy) generates the equations of motion via the Euler-Lagrange equations:

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}_i} - \frac{\partial L}{\partial q_i} = \tau_i, \qquad i = 1,\ldots,n$$

**Kinetic energy** of a serial robot chain:

$$T = \frac{1}{2}\dot{q}^\top M(q)\dot{q}$$

where the **generalized inertia matrix** $M(q) \in \mathbb{R}^{n\times n}$ is:

$$M(q) = \sum_{i=1}^n \left(m_i J_{v_i}^\top J_{v_i} + J_{\omega_i}^\top {}^0R_i I_{c_i} {}^0R_i^\top J_{\omega_i}\right)$$

$J_{v_i}$ is the translational Jacobian to link $i$'s center of mass; $J_{\omega_i}$ is the rotational Jacobian; ${}^0R_i$ is the rotation from link $i$ frame to world. $M(q)$ is symmetric positive definite for all $q$.

**Potential energy** for gravity $g_0$ (pointing down):

$$V = -\sum_{i=1}^n m_i g_0^\top r_{c_i}(q)$$

$$\nabla_q V = g(q) \quad \text{(gravity vector)}$$

## Equations of Motion

The Euler-Lagrange equations for an $n$-DOF robot expand to:

$$M(q)\ddot{q} + C(q, \dot{q})\dot{q} + g(q) = \tau$$

The **Coriolis and centrifugal matrix** $C(q,\dot{q})$ has entries defined by Christoffel symbols:

$$C_{ij}(q,\dot{q}) = \sum_{k=1}^n \Gamma_{ijk}(q)\dot{q}_k, \qquad \Gamma_{ijk} = \frac{1}{2}\left(\frac{\partial M_{ij}}{\partial q_k} + \frac{\partial M_{ik}}{\partial q_j} - \frac{\partial M_{jk}}{\partial q_i}\right)$$

Key structural properties exploited in control:

1. **Symmetry**: $M(q) = M(q)^\top \succ 0$
2. **Skew-symmetry**: $\dot{M}(q) - 2C(q,\dot{q})$ is skew-symmetric, so $\dot{q}^\top(\dot{M} - 2C)\dot{q} = 0$
3. **Bounded inertia**: $m_1 I \preceq M(q) \preceq m_2 I$ for constants $m_1, m_2 > 0$
4. **Linearity in parameters**: $M(q)\ddot{q} + C(q,\dot{q})\dot{q} + g(q) = Y(q,\dot{q},\ddot{q})\theta$ for a regressor matrix $Y$ and parameter vector $\theta$ (masses, inertias, COM locations)

The skew-symmetry property is crucial for passivity-based controller proofs.

## Recursive Newton-Euler Algorithm

Direct evaluation of $M(q)$ costs $O(n^3)$. The **Recursive Newton-Euler Algorithm (RNEA)** computes $\tau = \text{RNEA}(q, \dot{q}, \ddot{q})$ in $O(n)$ by propagating velocities and accelerations outward and forces inward:

**Forward pass** (base to tip): for each link $i = 1,\ldots,n$,

$${}^i\omega_i = {}^i R_{i-1}\, {}^{i-1}\omega_{i-1} + \dot{q}_i z_i$$

$${}^i\dot{\omega}_i = {}^i R_{i-1}\, {}^{i-1}\dot{\omega}_{i-1} + \ddot{q}_i z_i + \dot{q}_i\, {}^i\omega_i \times z_i$$

$${}^i\dot{v}_{c_i} = {}^i\dot{\omega}_i \times {}^i p_{c_i} + {}^i\omega_i \times ({}^i\omega_i \times {}^i p_{c_i}) + {}^i R_{i-1}\, {}^{i-1}\dot{v}_{i-1}$$

**Backward pass** (tip to base): for each link $i = n,\ldots,1$,

$${}^i F_i = m_i \,{}^i\dot{v}_{c_i}$$

$${}^i N_i = {}^i I_{c_i}\, {}^i\dot{\omega}_i + {}^i\omega_i \times {}^i I_{c_i}\, {}^i\omega_i$$

$$\tau_i = {}^i N_i^\top z_i + {}^i F_i^\top ({}^i\omega_i \times z_i \cdot \cdots)$$

The inertia matrix $M(q)$ is assembled by calling RNEA $n$ times with unit $\ddot{q}$ vectors ($O(n^2)$ total), or via the Composite Rigid Body Algorithm (CRBA) in $O(n^2)$.

## Floating Base Dynamics

Legged robots and free-flying vehicles have no fixed base — the system has 6 additional unactuated degrees of freedom (the floating base). The equations of motion become:

$$\begin{pmatrix} M_{bb} & M_{bj} \\ M_{jb} & M_{jj} \end{pmatrix} \begin{pmatrix} \ddot{q}_b \\ \ddot{q}_j \end{pmatrix} + \begin{pmatrix} h_b \\ h_j \end{pmatrix} = \begin{pmatrix} J_b^\top \\ J_j^\top \end{pmatrix} f_\text{ext} + \begin{pmatrix} 0 \\ \tau \end{pmatrix}$$

where $q_b \in SE(3)$ is the base pose, $q_j$ are joint angles, $f_\text{ext}$ are contact forces, and $J_b, J_j$ are the contact Jacobians.

The base dynamics cannot be directly actuated; control authority comes through joint torques transmitted via the contact forces $f_\text{ext}$ at the feet. Whole-body control computes $\tau$ to track desired tasks (CoM motion, swing foot trajectory) while satisfying contact constraints (friction cone, no interpenetration).

## Simulation via Numerical Integration

Given $\tau$, forward dynamics computes $\ddot{q} = M(q)^{-1}(\tau - C\dot{q} - g)$ in $O(n^3)$ naively or $O(n)$ via the Articulated Body Algorithm (ABA). State integration uses explicit or implicit ODE solvers:

| Method | Order | Cost/step | Stability |
|---|---|---|---|
| Euler | 1 | $O(n)$ | Conditionally stable |
| RK4 | 4 | $4\times O(n)$ | Conditionally stable |
| Newmark-$\beta$ | 2 | $O(n^2)$ | Unconditionally stable |
| Implicit Euler | 1 | $O(n^2)$–$O(n^3)$ | Unconditionally stable |

For stiff systems (high stiffness contacts), explicit methods require very small $\Delta t \sim 10^{-5}$ s. Implicit methods tolerate $\Delta t \sim 10^{-3}$ s at the cost of a Newton solve per step. Physics engines (MuJoCo, PyBullet, Drake) use semi-implicit or symplectic Euler for speed combined with constraint-based contact resolution.
