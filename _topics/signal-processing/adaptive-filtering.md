---
title: "Adaptive Filtering"
field: signal-processing
description: Filters that update their coefficients online to minimize a cost function, enabling noise cancellation, echo suppression, and channel equalization.
intro: >
  Adaptive filters adjust their coefficients automatically in response to incoming data,
  without requiring prior knowledge of signal statistics. The Wiener filter provides the
  optimal fixed solution when statistics are known; the LMS and RLS algorithms track this
  optimum in non-stationary environments using stochastic gradient descent and recursive
  least squares respectively. Adaptive filtering underpins echo cancellation in telephony,
  noise-cancelling headphones, and equalization in wireless communications.
math_concepts:
  - linear-algebra
  - optimization
  - random-processes
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## The Wiener Filter: Optimal Linear Estimation

Consider a finite impulse response (FIR) filter of length $N$ with coefficient vector $\mathbf{w} = [w_0, w_1, \ldots, w_{N-1}]^\top$ applied to input vector $\mathbf{x}[n] = [x[n], x[n-1], \ldots, x[n-N+1]]^\top$. The filter output is $\hat{d}[n] = \mathbf{w}^\top \mathbf{x}[n]$.

The **mean-squared error (MSE)** between the desired signal $d[n]$ and the filter output:

$$J(\mathbf{w}) = \mathbb{E}\left[|d[n] - \mathbf{w}^\top \mathbf{x}[n]|^2\right]$$

is a quadratic function of $\mathbf{w}$ — a **bowl-shaped paraboloid** with a unique global minimum. Expanding:

$$J(\mathbf{w}) = \sigma_d^2 - 2\mathbf{w}^\top \mathbf{p} + \mathbf{w}^\top \mathbf{R}\mathbf{w}$$

where $\mathbf{R} = \mathbb{E}[\mathbf{x}[n]\mathbf{x}^\top[n]]$ is the input autocorrelation matrix ($N \times N$, positive definite) and $\mathbf{p} = \mathbb{E}[d[n]\mathbf{x}[n]]$ is the cross-correlation vector between $d[n]$ and $\mathbf{x}[n]$.

## Wiener-Hopf Equations

Setting the gradient $\nabla_\mathbf{w} J = 0$ gives the **Wiener-Hopf equations**:

$$\mathbf{R}\mathbf{w}_{\text{opt}} = \mathbf{p}$$

The **Wiener solution** is:

$$\mathbf{w}_{\text{opt}} = \mathbf{R}^{-1}\mathbf{p}$$

The minimum MSE (MMSE) is:

$$J_{\text{min}} = \sigma_d^2 - \mathbf{p}^\top \mathbf{R}^{-1} \mathbf{p} = \sigma_d^2 - \mathbf{w}_{\text{opt}}^\top \mathbf{p}$$

The **orthogonality principle** characterizes the optimal filter: at the Wiener solution, the error $e[n] = d[n] - \hat{d}[n]$ is orthogonal to every element of the input vector:

$$\mathbb{E}[e[n]\, x[n-k]] = 0, \qquad k = 0, 1, \ldots, N-1$$

This is the geometric statement that the optimal estimate is the projection of $d[n]$ onto the subspace spanned by $\{x[n], x[n-1], \ldots, x[n-N+1]\}$.

### Error Surface Geometry

The MSE surface $J(\mathbf{w})$ can be diagonalized using the eigendecomposition $\mathbf{R} = \mathbf{Q}\boldsymbol{\Lambda}\mathbf{Q}^\top$. In the principal-axis coordinate system $\mathbf{v} = \mathbf{Q}^\top(\mathbf{w} - \mathbf{w}_{\text{opt}})$:

$$J = J_{\text{min}} + \sum_{i=1}^N \lambda_i v_i^2$$

The eigenvalues $\lambda_i$ of $\mathbf{R}$ determine the curvature along each principal axis. The **condition number** $\kappa = \lambda_{\max}/\lambda_{\min}$ governs convergence speed of gradient-based algorithms — large $\kappa$ (highly correlated inputs) causes slow convergence.

## LMS Algorithm

The **least mean squares (LMS) algorithm** approximates the true gradient $\nabla J = 2(\mathbf{R}\mathbf{w} - \mathbf{p})$ with the instantaneous (noisy) gradient using a single sample:

$$\hat{\nabla}J[n] = -2 e[n]\mathbf{x}[n]$$

The update rule is:

$$\mathbf{w}[n+1] = \mathbf{w}[n] + \mu\, e[n]\, \mathbf{x}[n]$$

where $\mu > 0$ is the **step size** (learning rate) and $e[n] = d[n] - \mathbf{w}^\top[n]\mathbf{x}[n]$ is the a priori error. This single line of code — three operations per coefficient — is one of the most widely deployed algorithms in all of signal processing.

### Convergence Analysis

For convergence in the mean, the step size must satisfy:

$$0 < \mu < \frac{2}{\lambda_{\max}(\mathbf{R})} \leq \frac{2}{\text{tr}(\mathbf{R})} = \frac{2}{N \cdot P_x}$$

where $P_x = \mathbb{E}[|x[n]|^2]$ is the input power and the trace bound $\text{tr}(\mathbf{R}) = \sum_i \lambda_i \geq \lambda_{\max}$ gives the practical sufficient condition. In the principal-axis coordinates, each mode converges with time constant:

$$\tau_i \approx \frac{1}{4\mu\lambda_i}$$

The **misadjustment** $M$ quantifies the excess MSE due to gradient noise:

$$M = \frac{J_\infty - J_{\text{min}}}{J_{\text{min}}} \approx \frac{\mu}{2}\text{tr}(\mathbf{R}) = \frac{\mu N P_x}{2}$$

The misadjustment is the price of adaptation: it represents the steady-state fluctuation of the coefficient vector around the Wiener optimum. There is a fundamental trade-off — small $\mu$ gives low misadjustment (good steady-state performance) but slow tracking of non-stationarities; large $\mu$ tracks fast changes but has high misadjustment.

| LMS variant | Key formula | Advantage |
|-------------|-------------|-----------|
| Standard LMS | $\mu$ fixed | Simple |
| Normalized LMS (NLMS) | $\mu_n = \mu / (\|\mathbf{x}[n]\|^2 + \varepsilon)$ | Robustness to input power variations |
| Sign LMS | $\mathbf{w} \mathrel{+}= \mu\,\text{sgn}(e[n])\mathbf{x}[n]$ | No multiplications |
| Leaky LMS | $\mathbf{w} \mathrel{+}= \mu(e[n]\mathbf{x}[n] - \alpha\mathbf{w})$ | Prevents coefficient drift |

## RLS Algorithm

The **recursive least squares (RLS)** algorithm minimizes the exponentially weighted sum of squared errors:

$$J_n(\mathbf{w}) = \sum_{i=0}^n \lambda^{n-i} |d[i] - \mathbf{w}^\top \mathbf{x}[i]|^2$$

where $0 < \lambda \leq 1$ is the **forgetting factor**. Observations older than $1/(1-\lambda)$ samples contribute negligibly. The solution at time $n$ is $\mathbf{w}[n] = \mathbf{R}_n^{-1}\mathbf{p}_n$ where:

$$\mathbf{R}_n = \sum_{i=0}^n \lambda^{n-i} \mathbf{x}[i]\mathbf{x}^\top[i] = \lambda\mathbf{R}_{n-1} + \mathbf{x}[n]\mathbf{x}^\top[n]$$

The **matrix inversion lemma** (Sherman-Morrison-Woodbury) gives a rank-1 update for $\mathbf{P}_n = \mathbf{R}_n^{-1}$:

$$\mathbf{P}_n = \frac{1}{\lambda}\left(\mathbf{P}_{n-1} - \frac{\mathbf{P}_{n-1}\mathbf{x}[n]\mathbf{x}^\top[n]\mathbf{P}_{n-1}}{\lambda + \mathbf{x}^\top[n]\mathbf{P}_{n-1}\mathbf{x}[n]}\right)$$

Defining the **Kalman gain** $\mathbf{k}[n] = \mathbf{P}_{n-1}\mathbf{x}[n]/(\lambda + \mathbf{x}^\top[n]\mathbf{P}_{n-1}\mathbf{x}[n])$, the coefficient update is:

$$\mathbf{w}[n] = \mathbf{w}[n-1] + \mathbf{k}[n]\left(d[n] - \mathbf{w}^\top[n-1]\mathbf{x}[n]\right)$$

**Comparison with LMS:**

| Property | LMS | RLS |
|----------|-----|-----|
| Complexity per sample | $O(N)$ | $O(N^2)$ |
| Convergence rate | Slow, depends on $\kappa(\mathbf{R})$ | Fast, independent of conditioning |
| Steady-state MSE | $J_{\min}(1+M)$ | $J_{\min}$ (deterministic inputs) |
| Memory of past data | Exponential decay via $\mu$ | Exponential decay via $\lambda$ |
| Numerical stability | Inherently stable | Can lose P.D. of $\mathbf{P}_n$ |

RLS converges in approximately $N$ samples, regardless of the eigenvalue spread of $\mathbf{R}$, making it far superior to LMS for correlated inputs or abrupt channel changes.

## Applications

### Acoustic Echo Cancellation

In telephone networks, the near-end microphone picks up the far-end speaker's voice reflected from walls (acoustic echo). The adaptive filter models the **echo path** $h_{\text{echo}}[n]$ (room impulse response, typically 100–500 ms = 800–4000 taps at 8 kHz) and subtracts the synthesized echo:

$$e[n] = d_{\text{mic}}[n] - \hat{h}^\top \mathbf{x}_{\text{far}}[n]$$

LMS converges too slowly for telephony-grade echo cancellation ($< 50$ ms). NLMS with frequency-domain partitioned block processing (PBFDAF) reduces complexity to $O(N\log N)$ per sample while achieving RLS-like convergence by whitening the input implicitly via the FFT.

### Adaptive Noise Cancellation

The **Widrow-Hoff configuration** uses two microphones: one near the signal source (primary: $d = s + n_0$) and one near the noise source (reference: $x \approx n_1$, correlated with $n_0$ but not with $s$). The adaptive filter models the path from the reference noise to the primary:

$$e[n] = d[n] - \hat{n}_0[n] \approx s[n]$$

At convergence, the error signal is the desired source. This principle underlies noise-cancelling headphones (where the reference microphone is outside the ear cup), fetal ECG extraction (where the reference measures maternal heartbeat), and vibration control in aircraft cabins.

### Channel Equalization

A wireless channel with multipath causes **intersymbol interference (ISI)**. An adaptive equalizer $\mathbf{w}[n]$ inverts the channel distortion. In **decision-directed** mode, the equalizer uses hard decisions $\hat{d}[n] \in \{-1, +1\}$ as the desired signal after initial training:

$$e[n] = \hat{d}[n] - \mathbf{w}^\top[n]\mathbf{x}[n]$$

The **minimum mean-square error (MMSE) equalizer** avoids noise enhancement at the cost of some residual ISI. In **zero-forcing (ZF)** equalization, the Wiener solution is tuned to set ISI to zero but amplifies noise severely in frequency bins where the channel is weak.

### Beamforming

An antenna array with $M$ elements processes the vector $\mathbf{x}[n]$ of received signals. The **delay-and-sum beamformer** steers toward a target direction $\theta_0$ with weights $w_m = e^{j2\pi f_0 (m-1)d\sin\theta_0/c}$. The **Capon (MVDR) beamformer** minimizes output power subject to distortionless response toward $\theta_0$:

$$\mathbf{w}_{\text{MVDR}} = \frac{\mathbf{R}^{-1}\mathbf{a}(\theta_0)}{\mathbf{a}^\top(\theta_0)\mathbf{R}^{-1}\mathbf{a}(\theta_0)}$$

where $\mathbf{a}(\theta_0)$ is the steering vector. This is the spatial Wiener filter, and its solution is a direct application of the matrix inversion lemma. The output SINR is $\text{SINR} = \mathbf{a}^\top(\theta_0)\mathbf{R}^{-1}\mathbf{a}(\theta_0) \cdot P_s$, which is maximized by MVDR over all distortionless linear beamformers.
