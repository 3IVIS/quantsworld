---
title: "Kalman Filter"
field: signal-processing
description: The optimal recursive estimator for linear Gaussian state-space models, fusing predictions with noisy observations.
intro: >
  The Kalman filter is a recursive algorithm that estimates the hidden state of a dynamical system
  from a sequence of noisy measurements. Under the assumption of linear dynamics and Gaussian noise,
  it is the minimum mean-squared-error estimator, and it achieves this optimality in a single
  forward pass without storing past data.
math_concepts:
  - linear-algebra
  - probability-theory
  - control-theory
  - random-processes
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## State-Space Model

The Kalman filter operates on a discrete-time linear state-space model:

$$\mathbf{x}_k = \mathbf{F}\mathbf{x}_{k-1} + \mathbf{B}\mathbf{u}_k + \mathbf{w}_k, \qquad \mathbf{w}_k \sim \mathcal{N}(\mathbf{0}, \mathbf{Q})$$

$$\mathbf{z}_k = \mathbf{H}\mathbf{x}_k + \mathbf{v}_k, \qquad \mathbf{v}_k \sim \mathbf{v}_k \sim \mathcal{N}(\mathbf{0}, \mathbf{R})$$

The state $\mathbf{x}_k \in \mathbb{R}^n$ is hidden; only the measurement $\mathbf{z}_k \in \mathbb{R}^m$ is observed. The matrices have the following roles:

| Symbol | Dimensions | Role |
|--------|-----------|------|
| $\mathbf{F}$ | $n \times n$ | State transition (dynamics) |
| $\mathbf{B}$ | $n \times p$ | Control-input mapping |
| $\mathbf{H}$ | $m \times n$ | Observation model |
| $\mathbf{Q}$ | $n \times n$ | Process noise covariance |
| $\mathbf{R}$ | $m \times m$ | Measurement noise covariance |

The noise sequences $\{\mathbf{w}_k\}$ and $\{\mathbf{v}_k\}$ are assumed mutually independent and white (uncorrelated over time). The initial state is Gaussian: $\mathbf{x}_0 \sim \mathcal{N}(\hat{\mathbf{x}}_{0|0}, \mathbf{P}_{0|0})$.

## Prediction Step

Given the posterior estimate $\hat{\mathbf{x}}_{k-1|k-1}$ and covariance $\mathbf{P}_{k-1|k-1}$ from the previous step, propagate forward in time:

**State prediction:**
$$\hat{\mathbf{x}}_{k|k-1} = \mathbf{F}\hat{\mathbf{x}}_{k-1|k-1} + \mathbf{B}\mathbf{u}_k$$

**Covariance prediction:**
$$\mathbf{P}_{k|k-1} = \mathbf{F}\mathbf{P}_{k-1|k-1}\mathbf{F}^\top + \mathbf{Q}$$

The predicted covariance $\mathbf{P}_{k|k-1}$ grows during prediction because the process noise $\mathbf{Q}$ adds uncertainty. This is the "spread" phase — without observations, uncertainty can only increase.

The predicted measurement and its innovation covariance are:

$$\hat{\mathbf{z}}_{k|k-1} = \mathbf{H}\hat{\mathbf{x}}_{k|k-1}$$

$$\mathbf{S}_k = \mathbf{H}\mathbf{P}_{k|k-1}\mathbf{H}^\top + \mathbf{R}$$

## Update Step and Kalman Gain

When the observation $\mathbf{z}_k$ arrives, compute the **innovation** (prediction residual):

$$\tilde{\mathbf{y}}_k = \mathbf{z}_k - \hat{\mathbf{z}}_{k|k-1}$$

The **Kalman gain** $\mathbf{K}_k$ weights how much to trust the innovation versus the prediction:

$$\mathbf{K}_k = \mathbf{P}_{k|k-1}\mathbf{H}^\top \mathbf{S}_k^{-1} = \mathbf{P}_{k|k-1}\mathbf{H}^\top \left(\mathbf{H}\mathbf{P}_{k|k-1}\mathbf{H}^\top + \mathbf{R}\right)^{-1}$$

The posterior state and covariance updates are:

$$\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_k \tilde{\mathbf{y}}_k$$

$$\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_k \mathbf{H})\mathbf{P}_{k|k-1}$$

The numerically stable **Joseph form** avoids symmetry loss due to floating-point errors:

$$\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_k \mathbf{H})\mathbf{P}_{k|k-1}(\mathbf{I} - \mathbf{K}_k \mathbf{H})^\top + \mathbf{K}_k \mathbf{R} \mathbf{K}_k^\top$$

### Limiting Cases of the Gain

| Scenario | Gain | Behavior |
|----------|------|----------|
| $\mathbf{R} \to 0$ (perfect sensor) | $\mathbf{K} \to \mathbf{H}^{-1}$ | Fully trust measurement |
| $\mathbf{P} \to 0$ (perfect model) | $\mathbf{K} \to 0$ | Ignore measurement |
| Scalar 1D case | $K = P/(P+R)$ | Weighted average |

## Optimality for Linear Gaussian Systems

The Kalman filter is the MMSE estimator among all estimators (linear and nonlinear) when the model is linear and the noise is Gaussian. The proof proceeds via the **Bayesian perspective**: since Gaussian distributions are closed under linear transformations and conditioning, the posterior $p(\mathbf{x}_k | \mathbf{z}_{1:k})$ is always Gaussian. The Kalman filter propagates exactly its mean and covariance.

The posterior distribution at each step:

$$p(\mathbf{x}_k | \mathbf{z}_{1:k}) = \mathcal{N}\!\left(\hat{\mathbf{x}}_{k|k},\, \mathbf{P}_{k|k}\right)$$

The **steady-state Kalman gain** $K_\infty$ satisfies the discrete algebraic Riccati equation (DARE):

$$\mathbf{P}_\infty = \mathbf{F}\mathbf{P}_\infty \mathbf{F}^\top + \mathbf{Q} - \mathbf{F}\mathbf{P}_\infty \mathbf{H}^\top \left(\mathbf{H}\mathbf{P}_\infty \mathbf{H}^\top + \mathbf{R}\right)^{-1} \mathbf{H}\mathbf{P}_\infty \mathbf{F}^\top$$

For a stable, observable, and controllable system, $\mathbf{P}_{k|k}$ converges to $\mathbf{P}_\infty$ regardless of the initial covariance.

## Extended Kalman Filter

When the dynamics or observation model are nonlinear:

$$\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{u}_k) + \mathbf{w}_k, \qquad \mathbf{z}_k = h(\mathbf{x}_k) + \mathbf{v}_k$$

the EKF linearizes around the current estimate using Jacobians:

$$\mathbf{F}_k = \left.\frac{\partial f}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k-1|k-1}}, \qquad \mathbf{H}_k = \left.\frac{\partial h}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k-1}}$$

The prediction and update equations then use these time-varying Jacobian matrices in place of the constant $\mathbf{F}$ and $\mathbf{H}$. The EKF is a first-order approximation and can diverge when the nonlinearity is severe or the state uncertainty is large, because the Gaussian assumption breaks down after propagating through a strongly curved function.

## Unscented Kalman Filter

The **Unscented Kalman Filter (UKF)** avoids explicit Jacobian computation by propagating a set of deterministically chosen **sigma points** through the exact nonlinear function. For state dimension $n$, the $2n+1$ sigma points are:

$$\boldsymbol{\chi}_0 = \hat{\mathbf{x}}, \qquad \boldsymbol{\chi}_{i} = \hat{\mathbf{x}} + \left(\sqrt{(n+\lambda)\mathbf{P}}\right)_i, \qquad \boldsymbol{\chi}_{n+i} = \hat{\mathbf{x}} - \left(\sqrt{(n+\lambda)\mathbf{P}}\right)_i$$

where $\lambda = \alpha^2(n + \kappa) - n$ is a scaling parameter. The predicted mean and covariance are recovered as weighted sums:

$$\hat{\mathbf{x}}^- = \sum_{i=0}^{2n} W_i^m \, f(\boldsymbol{\chi}_i)$$

$$\mathbf{P}^- = \sum_{i=0}^{2n} W_i^c \left[f(\boldsymbol{\chi}_i) - \hat{\mathbf{x}}^-\right]\left[f(\boldsymbol{\chi}_i) - \hat{\mathbf{x}}^-\right]^\top + \mathbf{Q}$$

The UKF is accurate to third order in the Taylor expansion for Gaussian distributions (compared to first order for the EKF) and handles moderate nonlinearities well without Jacobians.

## Applications in Tracking and Navigation

**GPS/INS fusion:** The state vector $\mathbf{x} = [x, y, z, \dot{x}, \dot{y}, \dot{z}]^\top$ combines position and velocity. Inertial measurements (high-rate, noisy) drive the prediction step; GPS fixes (low-rate, accurate) perform the update. The filter reconciles the complementary frequency characteristics of both sensors.

**Radar tracking:** A constant-velocity or constant-acceleration model predicts target position between radar scans. The innovation is compared to a **gate** (ellipsoidal region of size $\chi^2_{m,\alpha}$ in innovation space); measurements outside the gate are rejected as clutter.

**Example — 1D constant-velocity tracker** with position observations ($H = [1,0]$, $R = \sigma_z^2$, $Q = \text{diag}(0, \sigma_a^2 \Delta t)$):

After $k$ steps from a perfect initial state, the steady-state position estimate variance equals $\sigma_z / \sqrt{k}$ — the filter averages down noise at the rate of a sample mean, but maintains velocity estimates simultaneously.
