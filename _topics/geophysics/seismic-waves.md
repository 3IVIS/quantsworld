---
title: "Seismic Waves"
field: geophysics
description: P and S waves, the elastic wave equation, and Snell's law govern how seismic energy travels through the Earth.
intro: >
  Seismic waves are elastic disturbances that propagate through the Earth following the same wave equation that governs sound and light. Understanding their types, velocities, and behaviour at interfaces underpins virtually every branch of applied and global seismology.
math_concepts:
  - partial-differential-equations
  - fourier-transform
  - spectral-analysis
  - differential-equations
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The Elastic Wave Equation

Seismic wave propagation in a homogeneous, isotropic elastic medium is described by

$$\nabla^2 \mathbf{u} = \frac{1}{v^2}\frac{\partial^2 \mathbf{u}}{\partial t^2}$$

where $\mathbf{u}$ is the displacement field and $v$ is the wave speed. Two independent wave types emerge from the Helmholtz decomposition of $\mathbf{u}$ into scalar and vector potentials:

| Wave type | Motion | Velocity |
|-----------|--------|----------|
| P (compressional) | Parallel to propagation | $v_P = \sqrt{(\lambda + 2\mu)/\rho}$ |
| S (shear) | Perpendicular to propagation | $v_S = \sqrt{\mu/\rho}$ |

Here $\lambda$ and $\mu$ are the Lamé parameters and $\rho$ is density. Since $\mu > 0$ always, $v_P > v_S$.

## Snell's Law and Critical Angles

At an interface between two media, the angle of incidence $\theta_1$ and transmission $\theta_2$ satisfy

$$\frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2} = p$$

where $p$ is the ray parameter, conserved along any ray path. Total internal reflection occurs when $\theta_2 = 90°$, giving the critical angle $\theta_c = \sin^{-1}(v_1/v_2)$. Head waves (refractions) travel along the interface at $v_2$ and are the basis of seismic refraction surveys.

## Surface Waves

Surface waves are confined near a free surface and decay exponentially with depth. Love waves (SH particle motion, dispersive) and Rayleigh waves (elliptical retrograde motion) travel at speeds below $v_S$. Their dispersion relation links phase velocity $c(\omega)$ to depth-averaged shear modulus, making them ideal for near-surface $v_S$ profiling.
