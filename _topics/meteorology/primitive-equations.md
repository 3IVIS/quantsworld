---
title: "Primitive Equations"
field: meteorology
description: The governing equations of atmospheric motion on a rotating sphere, forming the backbone of all global weather and climate models.
intro: >
  The primitive equations are a simplified form of the Navier-Stokes equations applied to a thin rotating spherical shell of atmosphere. They invoke the hydrostatic approximation and treat the Coriolis effect explicitly, yielding a tractable yet accurate system for large-scale flow. Nearly every operational numerical weather prediction model solves some variant of these equations.
math_concepts:
  - partial-differential-equations
  - differential-geometry
  - dynamical-systems
  - variational-calculus
difficulty: expert
difficulty_level: 5
read_time: 12
---

## Momentum Equations on a Rotating Sphere

In pressure coordinates $(x, y, p, t)$ the horizontal momentum equations are:

$$\frac{Du}{Dt} - fv = -\frac{\partial \Phi}{\partial x}$$

$$\frac{Dv}{Dt} + fu = -\frac{\partial \Phi}{\partial y}$$

where $f = 2\Omega\sin\phi$ is the Coriolis parameter, $\Omega = 7.292 \times 10^{-5}\ \text{rad s}^{-1}$ is Earth's rotation rate, $\phi$ is latitude, and $\Phi = gz$ is geopotential.

## Hydrostatic and Thermodynamic Equations

The hydrostatic approximation replaces the vertical momentum equation:

$$\frac{\partial \Phi}{\partial p} = -\frac{RT}{p} = -\alpha$$

The thermodynamic energy equation in pressure coordinates is:

$$\frac{DT}{Dt} - \frac{\omega \alpha}{c_p} = \frac{Q}{c_p}$$

where $\omega = Dp/Dt$ is vertical pressure velocity and $Q$ is diabatic heating.

## Continuity and Closure

Mass continuity in pressure coordinates takes the elegant divergence form:

$$\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial \omega}{\partial p} = 0$$

Together with the ideal gas law $p = \rho RT$ and a moisture equation for specific humidity $q$, this closes the system. The $\beta$-plane approximation linearizes the Coriolis parameter as $f \approx f_0 + \beta y$ with $\beta = \partial f/\partial y$, enabling analytical wave solutions that illuminate large-scale dynamics before full numerical integration is applied.
