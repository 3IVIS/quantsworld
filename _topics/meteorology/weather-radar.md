---
title: "Weather Radar"
field: meteorology
description: How radar equations, reflectivity, Doppler velocity, and dual-polarisation moments are used to observe precipitation and storms.
intro: >
  Weather radar provides the only real-time, spatially continuous view of precipitation structure at kilometre scales. Modern dual-polarisation systems transmit pulses in both horizontal and vertical planes, returning a rich set of moments that allow retrieval of rainfall rate, hydrometeor type, and storm kinematics. The physical foundation is the electromagnetic scattering of radar microwaves by hydrometeors.
math_concepts:
  - fourier-transform
  - spectral-analysis
  - probability-theory
  - numerical-methods
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The Radar Equation

The received power from a volume of hydrometeors is:

$$P_r = \frac{P_t\,G^2\,\lambda^2\,\sigma}{(4\pi)^3\,r^4}$$

where $P_t$ is transmitted power, $G$ is antenna gain, $\lambda$ is wavelength, $r$ is range, and $\sigma$ is the radar cross-section of the resolution volume. For Rayleigh scattering (particle diameter $D \ll \lambda$), $\sigma \propto D^6$, leading to the reflectivity factor:

$$Z = \frac{1}{V}\sum D_i^6 \quad [\text{mm}^6\,\text{m}^{-3}]$$

Operationally, $Z$ is expressed in dBZ: $Z_{\text{dBZ}} = 10\log_{10}(Z)$.

## Doppler Velocity and Spectral Width

The mean Doppler velocity $\bar{v}$ is estimated from the phase shift between successive pulses:

$$\bar{v} = \frac{\lambda}{4\pi T_s}\arg\left[\sum_{k} I_k Q_{k+1} - I_{k+1}Q_k\right]$$

The Nyquist velocity $v_N = \lambda/(4T_s)$ limits unambiguous velocity measurement; aliasing occurs for $|\bar{v}| > v_N$. Spectral width $\sigma_v$ measures turbulence and wind shear within the beam.

## Dual-Polarisation Moments

| Moment | Symbol | Physical meaning |
|---|---|---|
| Differential reflectivity | $Z_{DR}$ | Median drop oblateness |
| Specific differential phase | $K_{DP}$ | Rain liquid water content |
| Correlation coefficient | $\rho_{hv}$ | Hydrometeor homogeneity |

Quantitative precipitation estimation (QPE) using $K_{DP}$ is less sensitive to attenuation than $Z$-based relations. The classic power-law $R = a\,Z^b$ (e.g., Marshall-Palmer: $R = 0.036\,Z^{0.625}$) is replaced by multi-moment retrievals that reduce error by 30–50% in heavy rain.
