---
title: "Gravity Methods"
field: geophysics
description: Bouguer anomalies and gravitational potential inversion reveal subsurface density contrasts.
intro: >
  Gravity surveys measure tiny variations in Earth's gravitational acceleration to infer the distribution of mass beneath the surface. After removing predictable contributions from latitude, elevation, and terrain, the residual Bouguer anomaly reflects lateral density contrasts that can be inverted for geological structure.
math_concepts:
  - partial-differential-equations
  - linear-algebra
  - optimization
  - numerical-methods
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Gravitational Potential

The gravitational potential due to a density distribution $\rho(\mathbf{r}')$ is

$$U(\mathbf{r}) = -G \int_V \frac{\rho(\mathbf{r}')}{|\mathbf{r} - \mathbf{r}'|}\, dV'$$

The vertical gravity component measured at the surface is $g_z = -\partial U/\partial z$. In the absence of mass, $U$ satisfies Laplace's equation $\nabla^2 U = 0$; in regions containing mass it satisfies Poisson's equation $\nabla^2 U = 4\pi G \rho$.

## Reductions and Anomalies

Raw measurements are corrected through a sequence of reductions:

| Correction | Formula | Purpose |
|------------|---------|---------|
| Free-air | $+0.3086\,\Delta h$ mGal/m | Elevation above datum |
| Bouguer slab | $-2\pi G \rho_0 h$ | Mass of rock between datum and station |
| Terrain | Numerical integration | Irregular topography |
| Latitude | $g_0(\phi)$ from GRS80 | Reference spheroid |

The Bouguer anomaly $\Delta g_B$ isolates density contrasts relative to the assumed background density $\rho_0 \approx 2670$ kg m$^{-3}$.

## Density Inversion

Given $N$ surface observations $\mathbf{d}$ and $M$ sub-surface cells with unknown density contrasts $\mathbf{m}$, the forward problem is linear: $\mathbf{d} = \mathbf{G}\mathbf{m}$. Because $N \ll M$ the system is underdetermined, and a regularised least-squares solution is sought:

$$\hat{\mathbf{m}} = \arg\min_{\mathbf{m}} \|\mathbf{G}\mathbf{m} - \mathbf{d}\|^2 + \lambda \|\mathbf{W}\mathbf{m}\|^2$$

where $\mathbf{W}$ encodes smoothness or depth-weighting constraints and $\lambda$ controls regularisation strength.
