---
title: "Numerical Weather Prediction"
field: meteorology
description: How finite-difference and spectral methods solve the atmospheric PDEs that drive operational weather forecasts.
intro: >
  Numerical weather prediction (NWP) discretises the primitive equations on a grid or in spectral space, then marches the solution forward in time. The accuracy of a forecast depends on the initial state (analysis), the model's spatial resolution, and the numerical schemes used for advection and time integration. Modern global models such as ECMWF's IFS operate at grid spacings below 10 km.
math_concepts:
  - partial-differential-equations
  - numerical-methods
  - fourier-transform
  - spectral-analysis
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Finite-Difference Schemes

Spatial derivatives are approximated on a staggered Arakawa-C grid. A second-order centred scheme for advection is:

$$\frac{\partial u}{\partial x} \approx \frac{u_{i+1} - u_{i-1}}{2\Delta x}$$

Time integration uses a leapfrog or semi-implicit scheme. The Courant–Friedrichs–Lewy (CFL) stability criterion requires:

$$C = \frac{u\,\Delta t}{\Delta x} \leq 1$$

Violating this condition causes numerical instability and exponential error growth.

## Spectral Methods

Global models often expand horizontal fields in spherical harmonics $Y_n^m(\lambda,\phi)$:

$$T(\lambda,\phi,t) = \sum_{n=0}^{N}\sum_{m=-n}^{n} \hat{T}_n^m(t)\,Y_n^m(\lambda,\phi)$$

Spectral truncation at triangular wavenumber $N$ gives an effective grid spacing of roughly $\pi a / N$ where $a$ is Earth's radius. The semi-Lagrangian scheme relaxes the CFL constraint by tracing parcel trajectories back one time step and interpolating.

## Error Growth and Predictability

Forecast errors grow roughly exponentially until they saturate at the climatological variance. The error doubling time for synoptic-scale features is approximately 2–3 days, setting a practical predictability limit near 2 weeks. Ensemble spread $\sigma_e(t)$ quantifies this growth:

$$\sigma_e^2(t) = \frac{1}{N-1}\sum_{i=1}^{N}\left[x_i(t) - \bar{x}(t)\right]^2$$

Higher horizontal and vertical resolution consistently reduces systematic error in temperature, wind, and precipitation forecasts.
