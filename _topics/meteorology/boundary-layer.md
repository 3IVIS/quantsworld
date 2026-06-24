---
title: "Atmospheric Boundary Layer"
field: meteorology
description: The turbulent lowest kilometre of the atmosphere that mediates exchanges of heat, moisture, and momentum between the surface and free troposphere.
intro: >
  The atmospheric boundary layer (ABL) is the part of the troposphere directly influenced by the surface through turbulent mixing. Its depth ranges from a few hundred metres in stable nocturnal conditions to 2–3 km over sun-heated surfaces. Understanding the ABL is essential for air quality, wind energy, agriculture, and the surface fluxes that drive larger-scale circulations.
math_concepts:
  - differential-equations
  - dynamical-systems
  - spectral-analysis
  - random-processes
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Log-Wind Profile and Surface Layer Scaling

In the neutrally stratified surface layer, the mean wind profile follows:

$$\frac{\partial \bar{u}}{\partial z} = \frac{u_*}{\kappa z}$$

Integrating gives the logarithmic wind profile $\bar{u}(z) = (u_*/\kappa)\ln(z/z_0)$ where $u_*$ is friction velocity, $\kappa \approx 0.4$ is the von Kármán constant, and $z_0$ is the aerodynamic roughness length.

## Monin-Obukhov Similarity Theory

Stability corrections modify the log profile through dimensionless stability functions $\phi_m(\zeta)$ where $\zeta = z/L$ and $L$ is the Obukhov length:

$$L = -\frac{u_*^3 \overline{\theta}_v}{\kappa g \overline{w'\theta_v'}}$$

The Richardson number $Ri = N^2 / (\partial u/\partial z)^2$ measures the ratio of buoyant suppression to shear production of turbulence. Turbulence is sustained when $Ri < Ri_c \approx 0.25$.

## Turbulent Kinetic Energy Budget

The TKE equation balances shear production $P$, buoyant production/consumption $B$, transport $T$, and dissipation $\varepsilon$:

$$\frac{\partial e}{\partial t} = P + B + T - \varepsilon$$

where $e = \tfrac{1}{2}(\overline{u'^2}+\overline{v'^2}+\overline{w'^2})$. The Brunt-Väisälä frequency $N^2 = (g/\theta)(\partial\theta/\partial z)$ governs the oscillation frequency of buoyancy-displaced parcels and sets the scale of internal gravity waves generated at the ABL top.
