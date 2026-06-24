---
title: "Atmospheric Waves"
field: meteorology
description: Rossby waves, gravity waves, and their dispersion relations that govern large-scale energy propagation in the atmosphere.
intro: >
  Atmospheric waves transport energy and momentum across vast distances, linking tropical heating to extratropical weather, driving the quasi-biennial oscillation, and causing clear-air turbulence for aviation. The two dominant families are Rossby (planetary) waves, restored by the latitudinal gradient of the Coriolis parameter $\beta$, and gravity waves, restored by buoyancy. Both have well-defined dispersion relations that determine their group velocity and propagation characteristics.
math_concepts:
  - partial-differential-equations
  - fourier-transform
  - spectral-analysis
  - dynamical-systems
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Rossby Wave Dispersion Relation

On a $\beta$-plane with background zonal wind $\bar{u}$, the quasi-geostrophic dispersion relation for Rossby waves is:

$$\omega = \bar{u}k - \frac{\beta k}{k^2 + l^2 + f_0^2/N^2 H^2}$$

where $k$ and $l$ are the zonal and meridional wavenumbers. The zonal phase speed $c_p = \omega/k < \bar{u}$ — Rossby waves always propagate westward relative to the mean flow. The group velocity, which carries energy, can propagate both east and west.

## Gravity Wave Dispersion

Internal gravity waves satisfy:

$$\omega^2 = N^2\frac{k_h^2}{k_h^2 + m^2} + f^2\frac{m^2}{k_h^2 + m^2}$$

where $k_h$ is horizontal wavenumber and $m$ is vertical wavenumber. The Brunt-Väisälä frequency $N$ sets the maximum gravity wave frequency; $f$ sets the minimum (inertia-gravity waves). Gravity waves carry momentum vertically and deposit it where they break, driving the Brauer-Dobson circulation.

## Wave-Mean Flow Interaction

The Eliassen-Palm flux $\mathbf{F}$ encapsulates the wave influence on the zonal-mean flow:

$$\frac{\partial \bar{u}}{\partial t} = \frac{1}{\rho_0 a\cos\phi}\nabla\cdot\mathbf{F} + \bar{X}$$

Non-zero EP-flux divergence accelerates or decelerates the mean zonal wind. In the stratosphere, breaking Rossby waves decelerate the polar vortex and can trigger sudden stratospheric warming events with surface weather impacts.
