---
title: "Potential Field Theory"
field: geophysics
description: Laplace's equation, harmonic functions, and spherical harmonics underpin gravity and magnetic field modelling.
intro: >
  Potential field theory provides the mathematical foundation for interpreting both gravity and magnetic surveys. The key result is that gravitational and magnetic scalar potentials satisfy Laplace's equation outside source regions, making powerful tools from classical mathematical physics — harmonic analysis, Green's functions, and spherical harmonics — directly applicable to geophysical data.
math_concepts:
  - partial-differential-equations
  - fourier-transform
  - hilbert-spaces
  - differential-geometry
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Laplace's Equation and Harmonic Functions

Outside any source distribution the gravitational potential $\phi$ satisfies

$$\nabla^2 \phi = \frac{\partial^2\phi}{\partial x^2} + \frac{\partial^2\phi}{\partial y^2} + \frac{\partial^2\phi}{\partial z^2} = 0$$

Solutions are called harmonic functions. Key properties include the maximum principle (no interior extrema) and the mean-value theorem (the value at any point equals the average over a surrounding sphere). The fundamental solution in 3D is the Newton kernel $1/|\mathbf{r} - \mathbf{r}'|$.

## Spherical Harmonic Expansion

On a sphere of radius $R$, any harmonic function exterior to the sphere can be written

$$\phi(r, \theta, \lambda) = \frac{GM}{R}\sum_{n=0}^{\infty}\left(\frac{R}{r}\right)^{n+1} \sum_{m=0}^{n} \bigl[C_{nm}\cos m\lambda + S_{nm}\sin m\lambda\bigr] \bar{P}_{nm}(\cos\theta)$$

where $\bar{P}_{nm}$ are fully normalised associated Legendre functions and $C_{nm}, S_{nm}$ are Stokes coefficients. Global gravity field models (e.g. EGM2008, expanded to degree 2190) are expressed in this form.

## Upward and Downward Continuation

In the Fourier domain, upward continuation by height $\Delta z$ multiplies each spatial frequency component by the factor $e^{-|k|\Delta z}$, where $|k| = \sqrt{k_x^2 + k_y^2}$ is the radial wavenumber. This is a stable, low-pass operation. Downward continuation applies $e^{+|k|\Delta z}$ and is inherently unstable — high-frequency noise is amplified exponentially — requiring regularisation or spectral tapering. These operations transform data between different observation levels without re-acquiring surveys.
