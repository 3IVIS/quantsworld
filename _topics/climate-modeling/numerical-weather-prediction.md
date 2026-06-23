---
title: "Numerical Weather Prediction"
field: climate-modeling
description: Mathematical foundations of operational weather forecasting, from the primitive equations and data assimilation to ensemble prediction and probabilistic skill metrics.
intro: >
  Numerical weather prediction (NWP) translates the atmosphere's governing
  equations into discrete computational forecasts. Success requires three
  pillars: accurate discretization of the primitive equations, optimal
  initialization via data assimilation, and ensemble methods to quantify
  the irreducible uncertainty arising from chaotic dynamics.
math_concepts:
  - partial-differential-equations
  - numerical-methods
  - probability-theory
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Atmospheric primitive equations

The forecast system integrates the primitive equations in hybrid pressure-sigma coordinates. In vorticity-divergence form for the horizontal wind ($\zeta = \hat{k}\cdot\nabla\times\mathbf{v}$, $D = \nabla\cdot\mathbf{v}$):

$$\frac{\partial\zeta}{\partial t} = -\nabla\cdot[(\zeta + f)\mathbf{v}] - \frac{\partial\omega}{\partial p}\frac{\partial v}{\partial x} + \frac{\partial\omega}{\partial p}\frac{\partial u}{\partial y} + F_\zeta$$

$$\frac{\partial D}{\partial t} = \hat{k}\cdot\nabla\times[(\zeta + f)\mathbf{v}] - \nabla^2\left(\frac{v^2+u^2}{2} + \Phi\right) + F_D$$

The thermodynamic and tracer equations complete the system. The ECMWF model uses ~1000 vertical levels and ~9 km horizontal resolution for deterministic forecasts.

## Finite-difference and spectral methods

**Leapfrog scheme** for $\partial u/\partial t = F(u)$:

$$u^{n+1} = u^{n-1} + 2\Delta t\, F(u^n)$$

The CFL stability condition requires $|c|\Delta t/\Delta x \le 1$ for wave speed $c$. Atmospheric gravity waves travel at $c \sim 300$ m s⁻¹, requiring very small timesteps unless an **implicit** scheme is used for fast modes.

**Semi-implicit time stepping:** Split fast (gravity wave) terms $L$ from slow $N$:

$$u^{n+1} = u^{n-1} + 2\Delta t\left[N(u^n) + L\left(\frac{u^{n+1}+u^{n-1}}{2}\right)\right]$$

This implicit treatment of $L$ requires solving a Helmholtz equation at each timestep but allows 3–5× longer timesteps.

**Semi-Lagrangian advection:** Rather than fixed Eulerian grid points, track trajectories backward in time. For a tracer $q$:

$$q^{n+1}(\mathbf{x}) = q^n(\mathbf{x}_{dep})$$

where the departure point $\mathbf{x}_{dep} = \mathbf{x} - \mathbf{v}\Delta t$ (iterative for accuracy). Semi-Lagrangian schemes are unconditionally stable for advection, permitting $\Delta t$ 5–10× larger than Eulerian CFL.

## Data assimilation: 3D-Var, 4D-Var, EnKF

The analysis $\mathbf{x}^a$ minimizes the cost:

$$J(\mathbf{x}) = \frac{1}{2}(\mathbf{x}-\mathbf{x}^b)^T B^{-1}(\mathbf{x}-\mathbf{x}^b) + \frac{1}{2}(\mathbf{y}-H(\mathbf{x}))^T R^{-1}(\mathbf{y}-H(\mathbf{x}))$$

where $\mathbf{x}^b$ is the background (prior), $\mathbf{y}$ are observations, $H$ is the observation operator, $B$ is background error covariance, $R$ is observation error covariance.

**3D-Var:** Minimize $J$ at a single analysis time. $B$ is static and pre-specified. Gradient:

$$\nabla J = B^{-1}(\mathbf{x}-\mathbf{x}^b) - H^T R^{-1}(\mathbf{y}-H\mathbf{x})$$

**4D-Var:** Extend over a time window $[t_0, t_N]$. The model $M$ propagates the state; the adjoint $M^T$ propagates sensitivities backward:

$$J = \frac{1}{2}\|\mathbf{x}_0 - \mathbf{x}^b_0\|^2_B + \sum_{i=0}^N \frac{1}{2}\|\mathbf{y}_i - H_i M_{0\to i}\mathbf{x}_0\|^2_R$$

4D-Var implicitly evolves $B$ through the forecast window — computationally expensive (requires adjoint model) but gives superior analyses.

**Ensemble Kalman Filter (EnKF):** Represent $B$ by sample covariance of $N_{ens}$ model forecasts:

$$\hat{B} = \frac{1}{N_{ens}-1}\sum_{k=1}^{N_{ens}}(\mathbf{x}_k^f - \bar{\mathbf{x}}^f)(\mathbf{x}_k^f - \bar{\mathbf{x}}^f)^T$$

The Kalman gain $K = \hat{B}H^T(H\hat{B}H^T + R)^{-1}$ is applied to each ensemble member: $\mathbf{x}^a_k = \mathbf{x}^f_k + K(\mathbf{y}_k - H\mathbf{x}^f_k)$ (with perturbed observations $\mathbf{y}_k$). EnKF scales better than 4D-Var for very high state dimensions.

## Initial condition sensitivity and the Lorenz butterfly

Lorenz (1963) showed that chaotic dynamics impose a fundamental limit on predictability. The **Lorenz equations**:

$$\dot{x} = \sigma(y-x), \quad \dot{y} = x(\rho-z)-y, \quad \dot{z} = xy-\beta z$$

with $\sigma=10$, $\rho=28$, $\beta=8/3$ exhibit exponential error growth. The **Lyapunov exponent** $\Lambda$ measures the growth rate of infinitesimal perturbation $\delta$:

$$|\delta(t)| \approx |\delta_0| e^{\Lambda t}$$

For the atmosphere, the leading Lyapunov exponent corresponds to an **error doubling time** of ~1.5–2 days. Starting from analysis errors of $\sim 1$ m in wind, forecast errors grow to climatological variance in ~2 weeks. This sets the theoretical limit for deterministic weather prediction.

## Forecast skill metrics

**Anomaly correlation coefficient (ACC):** Correlation of forecast and verifying analysis anomalies from climatology:

$$ACC = \frac{\sum_i (f_i - c_i)(a_i - c_i)}{\sqrt{\sum_i(f_i-c_i)^2\sum_i(a_i-c_i)^2}}$$

Skill is deemed useful for $ACC > 0.6$. In the 1970s this threshold was reached at ~5 days for 500 hPa geopotential; modern NWP achieves it at ~9 days — roughly 1 extra day of predictability per decade.

**RMSE** for 2-m temperature, 500 hPa geopotential, and 10-m wind speed are standard operational metrics tracked by ECMWF, NCEP, and UK Met Office.

## Ensemble prediction and probabilistic forecasts

The **ensemble prediction system (EPS)** samples initial condition uncertainty and model uncertainty. ECMWF runs 50+1 (control) members at 18 km resolution for 15-day EPS.

**Singular vectors** (fastest-growing perturbations) initialize the ensemble. The $i$-th singular vector maximizes:

$$\frac{\|\delta\mathbf{x}(t)\|_{E_t}}{\|\delta\mathbf{x}(0)\|_{E_0}} = \sigma_i$$

where $E_t$ is a norm (total energy). Leading singular vectors capture uncertainty in rapidly developing weather systems.

**Probabilistic verification** uses the **Brier score**:

$$BS = \frac{1}{N}\sum_{i=1}^N (p_i - o_i)^2$$

and the **continuous ranked probability score (CRPS)** for the full distribution. The **reliability diagram** checks calibration: when the model says 70% probability of rain, it should rain ~70% of the time. Extended-range (~2–6 weeks) prediction exploits slower predictability sources: Madden-Julian Oscillation (MJO), stratospheric sudden warmings, and sea surface temperature anomalies.
