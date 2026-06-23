---
title: "Kalman Filter SLAM"
field: robotics
description: Simultaneous localization and mapping using the Extended Kalman Filter to jointly estimate robot pose and landmark positions.
intro: >
  SLAM is the problem of building a map of an unknown environment while simultaneously
  estimating the robot's position within it. The EKF-SLAM algorithm maintains a joint
  Gaussian belief over the robot pose and all landmark positions, updating this belief
  with each sensor observation and motion command.
math_concepts:
  - probability-theory
  - linear-algebra
  - control-theory
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## The SLAM Problem

A robot navigates an environment containing $N$ landmarks at unknown positions $m_i \in \mathbb{R}^2$. At each time step $t$, the robot executes a control $u_t$ and receives observations $z_t$ of nearby landmarks. The SLAM problem is to infer the full posterior:

$$p(x_{0:t}, m_{1:N} \mid z_{1:t}, u_{1:t})$$

simultaneously over the robot trajectory $x_{0:t}$ and the map $m_{1:N}$.

The state vector in EKF-SLAM concatenates robot pose with all landmark positions:

$$\mu = \begin{pmatrix} x_r \\ y_r \\ \theta_r \\ m_{1,x} \\ m_{1,y} \\ \vdots \\ m_{N,x} \\ m_{N,y} \end{pmatrix} \in \mathbb{R}^{3 + 2N}$$

The joint covariance $\Sigma \in \mathbb{R}^{(3+2N)\times(3+2N)}$ encodes uncertainty and correlations across all components.

## EKF Prediction Step

The motion model propagates the robot pose forward. For a velocity-based model:

$$x_r' = x_r + v \Delta t \cos\theta_r, \quad y_r' = y_r + v \Delta t \sin\theta_r, \quad \theta_r' = \theta_r + \omega \Delta t$$

This is nonlinear, so EKF linearizes via the Jacobian $G_t = \frac{\partial g}{\partial \mu}$:

$$G_t = \begin{pmatrix} I_{3\times 3} + F_x^\top \begin{pmatrix} 0 & 0 & -v\Delta t\sin\theta \\ 0 & 0 & v\Delta t\cos\theta \\ 0 & 0 & 0 \end{pmatrix} F_x & 0 \\ 0 & I_{2N\times 2N} \end{pmatrix}$$

where $F_x$ is the embedding that selects the robot pose subvector. The prediction updates:

$$\bar{\mu}_t = g(\mu_{t-1}, u_t), \qquad \bar{\Sigma}_t = G_t \Sigma_{t-1} G_t^\top + R_t$$

Landmark positions are unchanged in the prediction step — only the robot pose and cross-correlations are updated. The process noise $R_t$ is nonzero only in the $3\times 3$ robot pose block.

## EKF Update Step

An observation of landmark $j$ at range $r$ and bearing $\phi$ from the robot:

$$z^j = \begin{pmatrix} r \\ \phi \end{pmatrix} = h(\bar{\mu}_t, j) + \delta, \quad \delta \sim \mathcal{N}(0, Q_t)$$

where the observation function is:

$$h(\bar{\mu}_t, j) = \begin{pmatrix} \sqrt{(m_{j,x} - \bar{x}_r)^2 + (m_{j,y} - \bar{y}_r)^2} \\ \operatorname{atan2}(m_{j,y} - \bar{y}_r,\; m_{j,x} - \bar{x}_r) - \bar{\theta}_r \end{pmatrix}$$

The observation Jacobian $H_t^j$ is computed with respect to the full state vector. The Kalman update then proceeds:

$$S_t^j = H_t^j \bar{\Sigma}_t (H_t^j)^\top + Q_t$$

$$K_t^j = \bar{\Sigma}_t (H_t^j)^\top (S_t^j)^{-1}$$

$$\mu_t = \bar{\mu}_t + K_t^j (z_t^j - h(\bar{\mu}_t, j))$$

$$\Sigma_t = (I - K_t^j H_t^j) \bar{\Sigma}_t$$

Each observation updates every entry in $\Sigma$, including robot-landmark and landmark-landmark cross terms.

## Data Association

Before applying the update, the robot must determine which landmark $j$ corresponds to an incoming observation $z_t$. Nearest-neighbor association picks:

$$j^* = \arg\min_j (z_t - \hat{z}^j)^\top (S_t^j)^{-1} (z_t - \hat{z}^j)$$

This is the Mahalanobis distance, which accounts for measurement and state uncertainty. A new landmark is initialized if all distances exceed a threshold.

Joint compatibility branch and bound (JCBB) considers all observations simultaneously, finding the globally consistent assignment. It is exponential in the worst case but far more robust to incorrect associations.

| Method | Cost | Robustness |
|---|---|---|
| Nearest neighbor | $O(N)$ | Low |
| Hungarian algorithm | $O(N^3)$ | Medium |
| JCBB | Exponential worst case | High |

Data association failures cause filter inconsistency — a corrupted covariance that no longer reflects true uncertainty.

## Quadratic Growth and Sparsity

EKF-SLAM has quadratic complexity in $N$: the covariance matrix $\Sigma$ is $(3+2N)\times(3+2N)$, and each update requires $O(N^2)$ operations. For a 1000-landmark map this is $2\times 10^6$ elements — feasible offline but challenging in real time.

The **information form** (also called canonical form) represents the belief as:

$$\Omega = \Sigma^{-1}, \quad \xi = \Sigma^{-1}\mu$$

The information matrix $\Omega$ is sparse: an observation linking robot to landmark $j$ adds entries only in the $(r,j)$ block. This sparsity is exploited by algorithms such as Sparse Extended Information Filter (SEIF) and iSAM (incremental smoothing and mapping), which maintain the sparse structure to achieve near-linear scaling.

## Unscented SLAM and Graph SLAM

The **Unscented Kalman Filter** propagates sigma points through the nonlinear motion and observation models without computing Jacobians:

$$\mathcal{X}_i = \mu \pm \sqrt{(n+\lambda)\Sigma}_i \quad i = 0,\ldots,2n$$

Sigma points are transformed through $g$ and $h$ exactly, then reaggregated into a Gaussian. UKF-SLAM is more accurate than EKF-SLAM for highly nonlinear systems and avoids manual Jacobian derivation, at roughly the same $O(N^2)$ cost.

**Graph SLAM** takes a fundamentally different approach: it maintains a pose graph where nodes are robot poses and edges encode constraints from odometry and observations. The SLAM back-end solves:

$$\mu^* = \arg\min_\mu \sum_{(i,j) \in \mathcal{E}} (z_{ij} - h(\mu_i, \mu_j))^\top \Omega_{ij} (z_{ij} - h(\mu_i, \mu_j))$$

This nonlinear least-squares problem is solved with Gauss-Newton or Levenberg-Marquardt, exploiting the sparse structure via Cholesky factorization. Graph SLAM scales to millions of poses and is the basis of production systems like Google Cartographer and GTSAM.
