---
title: "Atmospheric Thermodynamics"
field: meteorology
description: The thermodynamic laws governing temperature, stability, and phase change in the atmosphere.
intro: >
  Atmospheric thermodynamics applies classical thermodynamics to a compressible, moist ideal gas subject to gravity. Key quantities — potential temperature, equivalent potential temperature, and CAPE — determine whether parcels rise or sink and whether convection will be deep or suppressed. These concepts underpin everything from local thunderstorm forecasting to global circulation models.
math_concepts:
  - differential-equations
  - probability-theory
  - measure-theory
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Potential Temperature and Adiabatic Processes

Potential temperature $\theta$ is the temperature a parcel would have if brought dry-adiabatically to a reference pressure $p_0 = 1000\ \text{hPa}$:

$$\theta = T\left(\frac{p_0}{p}\right)^{R/c_p}$$

where $R = 287\ \text{J kg}^{-1}\text{K}^{-1}$ and $c_p = 1004\ \text{J kg}^{-1}\text{K}^{-1}$. For dry adiabatic ascent $\theta$ is conserved; it increases monotonically with height in a stable atmosphere.

## Lapse Rates and Stability

| Lapse rate | Symbol | Value |
|---|---|---|
| Dry adiabatic | $\Gamma_d$ | $9.8\ \text{K km}^{-1}$ |
| Moist adiabatic | $\Gamma_s$ | $4–7\ \text{K km}^{-1}$ |
| Environmental | $\Gamma_e$ | varies |

The atmosphere is conditionally unstable when $\Gamma_s < \Gamma_e < \Gamma_d$. Saturation occurs at the lifting condensation level (LCL), above which the parcel cools at the moist adiabatic rate.

## CAPE and Convective Potential

Convective Available Potential Energy measures the work done on a rising parcel between the Level of Free Convection (LFC) and the Equilibrium Level (EL):

$$\text{CAPE} = \int_{\text{LFC}}^{\text{EL}} g\,\frac{T_{v,\text{parcel}} - T_{v,\text{env}}}{T_{v,\text{env}}}\,dz$$

Values above $2500\ \text{J kg}^{-1}$ indicate the potential for severe convection. The skew-T log-p diagram provides a graphical framework for reading these integrals directly from radiosonde profiles.
