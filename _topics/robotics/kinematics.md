---
title: "Robot Kinematics"
field: robotics
description: Forward and inverse kinematics for serial manipulators using homogeneous transforms, DH parameters, and the geometric Jacobian.
intro: >
  Robot kinematics describes the geometric relationship between joint configurations and
  end-effector pose without considering forces. Forward kinematics maps joint angles to
  Cartesian pose via transformation matrices; inverse kinematics solves the reverse problem
  and is fundamental to motion planning and control.
math_concepts:
  - linear-algebra
  - differential-geometry
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 11
---

## Homogeneous Transformation Matrices

A rigid-body pose in $\mathbb{R}^3$ is represented by a $4\times 4$ homogeneous transformation matrix:

$$T = \begin{pmatrix} R & p \\ 0^\top & 1 \end{pmatrix}, \qquad R \in SO(3),\; p \in \mathbb{R}^3$$

where $R$ is a rotation matrix ($R^\top R = I$, $\det R = +1$) and $p$ is the position vector. Transformations compose by matrix multiplication: if frame $B$ is expressed in frame $A$ by $T_{AB}$, and frame $C$ in $B$ by $T_{BC}$, then:

$$T_{AC} = T_{AB} T_{BC}$$

A point $q$ in frame $C$ maps to frame $A$ as $\tilde{q}_A = T_{AC} \tilde{q}_C$ using homogeneous coordinates $\tilde{q} = (q^\top, 1)^\top$.

## Denavit-Hartenberg Parameters

The DH convention assigns four parameters to each joint, making forward kinematics a systematic product of elementary transforms. For joint $i$:

| Parameter | Symbol | Meaning |
|---|---|---|
| Link length | $a_i$ | Distance along $x_i$ from $z_{i-1}$ to $z_i$ |
| Link twist | $\alpha_i$ | Angle about $x_i$ from $z_{i-1}$ to $z_i$ |
| Link offset | $d_i$ | Distance along $z_{i-1}$ from $x_{i-1}$ to $x_i$ |
| Joint angle | $\theta_i$ | Angle about $z_{i-1}$ from $x_{i-1}$ to $x_i$ |

The $i$-th joint transform is:

$$T_{i-1,i} = R_z(\theta_i)\, T_z(d_i)\, T_x(a_i)\, R_x(\alpha_i)$$

$$= \begin{pmatrix} \cos\theta_i & -\sin\theta_i\cos\alpha_i & \sin\theta_i\sin\alpha_i & a_i\cos\theta_i \\ \sin\theta_i & \cos\theta_i\cos\alpha_i & -\cos\theta_i\sin\alpha_i & a_i\sin\theta_i \\ 0 & \sin\alpha_i & \cos\alpha_i & d_i \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

For a robot with $n$ joints, the end-effector pose in the base frame is:

$$T_{0,n}(q) = \prod_{i=1}^{n} T_{i-1,i}(\theta_i)$$

## Rotation Representations

Three common parameterizations of $SO(3)$:

**Euler angles** (ZYX convention) decompose $R$ into three elementary rotations:

$$R = R_z(\psi) R_y(\theta) R_x(\phi)$$

They are compact but suffer from **gimbal lock** at $\theta = \pm 90°$, where the $\psi$ and $\phi$ axes align.

**Quaternions** $q = (w, x, y, z)$ with $w^2 + x^2 + y^2 + z^2 = 1$ avoid gimbal lock and compose efficiently. The rotation matrix from unit quaternion is:

$$R = \begin{pmatrix} 1-2(y^2+z^2) & 2(xy-wz) & 2(xz+wy) \\ 2(xy+wz) & 1-2(x^2+z^2) & 2(yz-wx) \\ 2(xz-wy) & 2(yz+wx) & 1-2(x^2+y^2) \end{pmatrix}$$

Quaternion multiplication is $O(1)$ and interpolation (SLERP) is smooth:

$$q(\tau) = q_1 \frac{\sin((1-\tau)\Omega)}{\sin\Omega} + q_2 \frac{\sin(\tau\Omega)}{\sin\Omega}, \quad \Omega = \cos^{-1}(q_1 \cdot q_2)$$

**Axis-angle** $(\hat{n}, \theta)$ and its exponential map via $\mathfrak{so}(3)$ are natural for Lie group methods.

## Differential Kinematics and the Jacobian

The relationship between joint velocities $\dot{q} \in \mathbb{R}^n$ and end-effector velocity $(v^\top, \omega^\top)^\top \in \mathbb{R}^6$ is:

$$\begin{pmatrix} v \\ \omega \end{pmatrix} = J(q)\, \dot{q}$$

The geometric Jacobian $J(q) \in \mathbb{R}^{6\times n}$ has columns constructed joint-by-joint. For a revolute joint $i$:

$$J_i = \begin{pmatrix} z_{i-1} \times (p_n - p_{i-1}) \\ z_{i-1} \end{pmatrix}$$

where $z_{i-1}$ is the $i$-th joint axis and $p_n - p_{i-1}$ is the vector from joint $i$ to the end-effector.

**Singularities** occur where $\text{rank}(J) < \min(6, n)$, equivalently $\det(JJ^\top) = 0$. At singularities the robot loses the ability to move in certain directions and velocities become unbounded for finite end-effector motion.

## Inverse Kinematics

Given a desired end-effector pose $T^*$, find $q^*$ such that $T_{0,n}(q^*) = T^*$. For simple geometries (spherical wrist, 6-DOF) closed-form solutions exist. Generally, numerical methods are used:

**Newton-Raphson** linearizes around the current estimate $q_k$:

$$q_{k+1} = q_k + J(q_k)^+ \Delta x$$

where $\Delta x \in \mathbb{R}^6$ is the pose error (position part plus angle-axis of orientation error) and $J^+ = J^\top(JJ^\top)^{-1}$ is the Moore-Penrose pseudoinverse.

Near singularities, $JJ^\top$ becomes ill-conditioned. **Damped least squares** regularizes:

$$J^*_\lambda = J^\top (JJ^\top + \lambda^2 I)^{-1}$$

choosing $\lambda$ proportional to the distance to singularity (manipulability $w = \sqrt{\det(JJ^\top)}$).

## Redundant Robots and Workspace

A robot with $n > 6$ joints is redundant — it has a $(n-6)$-dimensional null space $\mathcal{N}(J)$. The general IK solution is:

$$\dot{q} = J^+ \dot{x} + (I - J^+ J)\, z$$

where $z \in \mathbb{R}^n$ is arbitrary. The null-space term $(I - J^+J)z$ allows secondary objectives — joint limit avoidance, obstacle avoidance, manipulability maximization — without affecting end-effector motion.

The **workspace** of a manipulator is the set of end-effector poses reachable from some joint configuration:

- **Dexterous workspace**: positions reachable with all orientations
- **Reachable workspace**: positions reachable with at least one orientation

Both can be characterized via Monte Carlo sampling of $q$ and forward kinematics, or analytically for simple geometries.
