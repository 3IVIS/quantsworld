---
title: "Particle Filter"
field: robotics
description: Monte Carlo localization represents robot belief as a set of weighted particles, enabling non-Gaussian, multi-modal distributions over robot pose.
intro: >
  The particle filter is a sequential Monte Carlo method that approximates arbitrary
  probability distributions using a set of weighted samples called particles. In robotics,
  Monte Carlo localization uses particles to track robot pose without assuming Gaussian
  uncertainty, making it robust to non-linear sensor models, multi-modal distributions,
  and the robot kidnapping problem.
math_concepts:
  - probability-theory
  - monte-carlo-methods
  - bayes-theorem
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Bayesian Filtering Revisited

Robot localization maintains a belief over pose $x_t$ given observations $z_{1:t}$ and controls $u_{1:t}$:

$$\text{bel}(x_t) = p(x_t \mid z_{1:t}, u_{1:t})$$

The Bayes filter update is exact but intractable for continuous, nonlinear systems:

$$\overline{\text{bel}}(x_t) = \int p(x_t \mid u_t, x_{t-1})\, \text{bel}(x_{t-1})\, dx_{t-1}$$

$$\text{bel}(x_t) = \eta\, p(z_t \mid x_t)\, \overline{\text{bel}}(x_t)$$

The EKF approximates the belief as a single Gaussian, which fails for multi-modal uncertainty (e.g., symmetric corridors) and strong nonlinearities. The particle filter represents the belief non-parametrically.

## Particle Representation

The belief is approximated by $M$ particles $\{x_t^{(i)}, w_t^{(i)}\}_{i=1}^M$:

$$\text{bel}(x_t) \approx \sum_{i=1}^M w_t^{(i)}\, \delta(x_t - x_t^{(i)})$$

Each particle $x_t^{(i)}$ is a hypothesis about the robot's pose (position + orientation); $w_t^{(i)} \geq 0$ is its importance weight with $\sum_i w_t^{(i)} = 1$.

By the law of large numbers, for any measurable function $f$:

$$\mathbb{E}[f(x_t)] \approx \sum_{i=1}^M w_t^{(i)} f(x_t^{(i)}) \xrightarrow{M\to\infty} \int f(x) \text{bel}(x)\, dx$$

Convergence rate is $O(1/\sqrt{M})$, independent of state dimension — a major advantage over grid-based methods, which scale exponentially.

## Sequential Importance Sampling

At each step, new particles are propagated through the motion model and reweighted by the observation likelihood:

**1. Propagate:** Sample $x_t^{(i)} \sim p(x_t \mid u_t, x_{t-1}^{(i)})$, the motion model. For a differential-drive robot with velocity commands $(v, \omega)$ and Gaussian noise:

$$x_t^{(i)} = \begin{pmatrix} x_{t-1}^{(i)} + v\Delta t \cos\theta^{(i)} \\ y_{t-1}^{(i)} + v\Delta t \sin\theta^{(i)} \\ \theta_{t-1}^{(i)} + \omega\Delta t \end{pmatrix} + \epsilon, \quad \epsilon \sim \mathcal{N}(0, Q)$$

**2. Weight:** Compute importance weights using the observation likelihood:

$$w_t^{(i)} \propto p(z_t \mid x_t^{(i)})$$

For a laser rangefinder, $p(z_t \mid x_t^{(i)})$ is computed by ray-casting the map at pose $x_t^{(i)}$ and comparing expected ranges to observed ranges — typically a mixture of Gaussian, exponential, and uniform components.

**3. Normalize:** $w_t^{(i)} \leftarrow w_t^{(i)} / \sum_j w_t^{(j)}$

## Resampling

After several steps, particle weights concentrate: a few particles dominate and the rest contribute negligibly. The **effective sample size** quantifies degeneracy:

$$N_\text{eff} = \frac{1}{\sum_{i=1}^M (w_t^{(i)})^2} \in [1, M]$$

When $N_\text{eff} < M/2$, resample: draw $M$ new particles from the current weighted set. **Systematic resampling** is preferred for low variance:

```
Systematic_Resample(particles, weights):
  u ~ Uniform(0, 1/M)
  c = w[1]
  i = 1
  for j = 1..M:
    while u > c:
      i = i + 1; c += w[i]
    new_particles[j] = particles[i]
    u += 1/M
```

This makes exactly $M$ draws in $O(M)$ time and avoids the $O(M\log M)$ cost of multinomial sampling. After resampling all weights are reset to $1/M$.

## Particle Depletion and KLD-Sampling

**Particle depletion** occurs when the true pose falls in a low-probability region and no particles cover it. Causes include poor motion models, incorrect maps, and abrupt robot movement.

A partial remedy is to inject random particles: with probability $\alpha$, sample $x^{(i)} \sim \mathcal{U}(\mathcal{C})$ uniformly over the map. The mixing coefficient $\alpha$ is set proportional to the ratio of recent observation likelihood to its moving average — high when all particles disagree with the sensor.

**KLD-sampling** adapts $M$ dynamically. The number of particles needed to bound the error between the sample distribution and the true distribution with confidence $1-\delta$ and error $\epsilon$ is:

$$M = \frac{1}{2\epsilon}\chi^2_{k-1, 1-\delta}$$

where $k$ is the number of non-empty histogram bins covering the particle set. As the filter converges and the distribution concentrates, $k$ falls and fewer particles are needed — saving computation during navigation.

## Robot Kidnapping

If the robot is physically moved to an unknown location (kidnapping), all particles become inconsistent. The particle filter fails because no particle is near the true pose and resampling reinforces the wrong region.

Remedies:
- **Global localization mode**: inject particles drawn from the observation-weighted distribution $p(z_t \mid x) \cdot p_\text{uniform}(x)$ using sensor inversion
- **Anomaly detection**: monitor $\bar{w} = \frac{1}{M}\sum_i w_t^{(i)}$; a sudden drop signals possible kidnapping and triggers particle injection
- **Multi-modal initialization**: maintain a second bank of particles sampled uniformly

## FastSLAM

FastSLAM factorizes the full SLAM posterior using the Rao-Blackwellization identity:

$$p(x_{1:t}, m \mid z_{1:t}, u_{1:t}) = p(x_{1:t} \mid z_{1:t}, u_{1:t}) \cdot \prod_{j=1}^N p(m_j \mid x_{1:t}, z_{1:t})$$

Each particle maintains its own trajectory estimate $x_{1:t}^{(i)}$ and $N$ independent EKF landmark filters $\{\mu_j^{(i)}, \Sigma_j^{(i)}\}$. Because landmarks are conditionally independent given the trajectory, each particle's landmark filters update separately with $O(N)$ total work per particle.

FastSLAM 2.0 improves sampling by incorporating the current observation into the proposal distribution, dramatically reducing particle depletion. Total complexity is $O(M \log N)$ per step using a balanced binary tree for landmark lookup — feasible for moderate-size maps where EKF-SLAM ($O(N^2)$) is too slow.
