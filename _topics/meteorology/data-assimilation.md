---
title: "Data Assimilation"
field: meteorology
description: Combining model forecasts with observations using Bayesian estimation to produce optimal initial conditions for NWP.
intro: >
  Data assimilation (DA) merges prior model information (the background) with observations to produce an analysis that minimises a statistical cost function. The problem is fundamentally Bayesian: given a prior distribution over atmospheric states and a likelihood from observations, we seek the posterior maximum or mean. Operational centres use variational methods (3D-Var, 4D-Var) or ensemble Kalman filters to handle the $O(10^9)$ state dimensions of modern NWP models.
math_concepts:
  - bayes-theorem
  - linear-algebra
  - optimization
  - matrix-calculus
difficulty: expert
difficulty_level: 5
read_time: 13
---

## Variational Cost Function

The 3D-Var cost function penalises departure from both background and observations:

$$J(\mathbf{x}) = \frac{1}{2}(\mathbf{x}-\mathbf{x}_b)^T \mathbf{B}^{-1}(\mathbf{x}-\mathbf{x}_b) + \frac{1}{2}(\mathbf{y}-H\mathbf{x})^T \mathbf{R}^{-1}(\mathbf{y}-H\mathbf{x})$$

Here $\mathbf{x}_b$ is the background state, $\mathbf{B}$ is the background error covariance, $\mathbf{y}$ is the observation vector, $H$ is the (possibly nonlinear) observation operator, and $\mathbf{R}$ is the observation error covariance. The analysis $\mathbf{x}_a$ satisfies $\nabla J = 0$.

## Kalman Filter and Ensemble Kalman Filter

The classical Kalman filter update equations are:

$$\mathbf{K} = \mathbf{B}H^T(H\mathbf{B}H^T + \mathbf{R})^{-1}$$
$$\mathbf{x}_a = \mathbf{x}_b + \mathbf{K}(\mathbf{y} - H\mathbf{x}_b)$$

The Ensemble Kalman Filter (EnKF) estimates $\mathbf{B}$ from an ensemble of $N$ short-range forecasts, avoiding explicit storage of the $n \times n$ matrix for $n \sim 10^9$.

## 4D-Var and the Adjoint

4D-Var extends the cost function over a time window $[t_0, t_N]$, requiring gradient computation via the adjoint model $\mathbf{L}^T$. The gradient is:

$$\nabla_{\mathbf{x}_0} J = \mathbf{B}^{-1}(\mathbf{x}_0 - \mathbf{x}_b) - \sum_{k=0}^{N}\mathbf{L}_{0\to k}^T H_k^T \mathbf{R}_k^{-1}(\mathbf{y}_k - H_k\mathbf{x}_k)$$

4D-Var implicitly propagates background error covariances through time, making it more powerful than 3D-Var but computationally demanding.
