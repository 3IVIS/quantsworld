---
title: "Tropical Cyclones"
field: meteorology
description: The dynamics of warm-core rotating vortices that form over tropical oceans and can reach devastating intensities.
intro: >
  Tropical cyclones (hurricanes and typhoons) are self-organised vortices sustained by the release of latent heat over warm ocean surfaces. Their structure is governed by gradient wind balance, and their maximum possible intensity is set by a Carnot heat-engine argument relating sea surface temperature to outflow temperature. Understanding their dynamics requires combining fluid mechanics, thermodynamics, and boundary-layer theory.
math_concepts:
  - differential-equations
  - dynamical-systems
  - variational-calculus
  - differential-geometry
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Gradient Wind Balance

Away from the boundary layer, the tangential wind $V$ in a tropical cyclone obeys the gradient wind equation balancing centrifugal, Coriolis, and pressure gradient forces:

$$\frac{V^2}{r} + fV = \frac{1}{\rho}\frac{\partial p}{\partial r}$$

At the radius of maximum wind $r_m$, the radial pressure gradient is steepest and $V$ reaches its peak $V_{\max}$.

## Maximum Potential Intensity

Emanuel's MPI theory treats the tropical cyclone as a Carnot heat engine cycling between the warm ocean ($T_s$) and cold upper troposphere ($T_0$):

$$V_{\max}^2 = \frac{C_k}{C_D}\frac{T_s - T_0}{T_0}\left(k_s^* - k\right)$$

where $C_k$ and $C_D$ are the enthalpy and drag exchange coefficients, $k_s^*$ is the saturation enthalpy of the sea surface, and $k$ is the near-surface air enthalpy. Warmer SSTs directly increase $V_{\max}$.

## Wind-Pressure Relationship

Empirically, maximum sustained wind speed $V_{\max}$ relates to central pressure deficit $\Delta p = p_{\text{env}} - p_c$:

$$V_{\max} \approx A(\Delta p)^B$$

with $A \approx 6.3$ and $B \approx 0.5$ (SI units) as commonly used constants, though regional variations exist. The warm-core thermal anomaly $\delta T$ that drives this pressure deficit is maintained by deep convective heating concentrated near the eye wall, with values reaching 10–16 K in intense storms.
