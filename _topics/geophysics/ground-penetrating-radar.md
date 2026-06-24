---
title: "Ground-Penetrating Radar"
field: geophysics
description: Electromagnetic wave propagation and reflection imaging reveal shallow subsurface structure with centimetre-scale resolution.
intro: >
  Ground-penetrating radar (GPR) transmits short pulses of high-frequency electromagnetic energy (10 MHz to 2.5 GHz) into the ground and records reflections from dielectric contrasts. Penetration depth and resolution are governed by the dielectric properties of the subsurface and the wave frequency, trading off against each other in a manner analogous to seismic surveys.
math_concepts:
  - partial-differential-equations
  - fourier-transform
  - wavelet-transform
  - spectral-analysis
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Electromagnetic Propagation

GPR pulses obey Maxwell's equations, and in a non-magnetic medium the EM wave velocity is

$$v = \frac{c}{\sqrt{\varepsilon_r}}$$

where $c$ is the speed of light and $\varepsilon_r$ is the relative dielectric permittivity. Water dominates: dry sand has $\varepsilon_r \approx 3$–6 ($v \approx 0.13$ m/ns) while water-saturated sediment has $\varepsilon_r \approx 30$ ($v \approx 0.055$ m/ns). Attenuation $\alpha$ (dB/m) scales with electrical conductivity $\sigma$:

$$\alpha \approx \frac{\sigma}{2}\sqrt{\frac{\mu_0}{\varepsilon_0 \varepsilon_r}}$$

High-conductivity clays and salt water drastically limit depth penetration.

## Reflection Coefficients and Two-Way Traveltime

At a planar interface between media with permittivities $\varepsilon_1$ and $\varepsilon_2$ (normal incidence), the reflection coefficient is

$$R = \frac{\sqrt{\varepsilon_1} - \sqrt{\varepsilon_2}}{\sqrt{\varepsilon_1} + \sqrt{\varepsilon_2}}$$

The depth $d$ to a reflector is estimated from the two-way traveltime $t$ and the medium velocity:

$$d = \frac{v\,t}{2}$$

Hyperbolic diffraction patterns in common-offset sections are used to estimate $v$ by fitting $t^2 = t_0^2 + x^2/v^2$ (a $T^2$–$X^2$ transform analogous to seismic NMO).

## Migration

Raw GPR data place energy at the wrong lateral position for dipping reflectors and diffractors. Kirchhoff migration collapses diffraction hyperbolae by summing along traveltime curves

$$t(x) = \frac{1}{v}\sqrt{t_0^2 v^2 + (x - x_0)^2}$$

F-K (frequency-wavenumber) migration is efficient for laterally homogeneous velocity models, while reverse-time migration handles complex velocity variations.
