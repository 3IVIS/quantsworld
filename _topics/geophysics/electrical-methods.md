---
title: "Electrical Methods"
field: geophysics
description: Resistivity surveys and IP measurements map subsurface conductivity by injecting current and measuring potential differences.
intro: >
  Electrical geophysical methods exploit the wide range of electrical resistivity found in Earth materials — from metallic ores at $10^{-3}$ Ω·m to dry resistive rocks at $10^5$ Ω·m. Resistivity profiling, induced polarisation, and electromagnetic methods all depend on solving Maxwell's equations in conducting media.
math_concepts:
  - partial-differential-equations
  - linear-algebra
  - numerical-methods
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Maxwell's Equations in Conducting Media

At low frequencies, the quasi-static approximation reduces Maxwell's equations to

$$\nabla \times \mathbf{H} = \sigma \mathbf{E} + \frac{\partial \mathbf{D}}{\partial t}, \qquad \nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$$

For DC resistivity, the displacement current is negligible and the electric potential $\phi$ satisfies the continuity equation

$$\nabla \cdot (\sigma \nabla \phi) = -I\,\delta(\mathbf{r} - \mathbf{r}_s)$$

where $\sigma(\mathbf{r})$ is the conductivity distribution and $I$ is the injected current at source location $\mathbf{r}_s$.

## Apparent Resistivity and Electrode Arrays

For a homogeneous half-space, the potential due to a current electrode at the surface decays as $\phi = \rho I / (2\pi r)$. Four-electrode configurations measure a potential difference $\Delta V$ and the apparent resistivity is

$$\rho_a = K \frac{\Delta V}{I}$$

where $K$ is a geometric factor depending on the electrode layout:

| Array | $K$ |
|-------|-----|
| Wenner ($a$ spacing) | $2\pi a$ |
| Schlumberger | $\pi \frac{L^2 - \ell^2}{2\ell}$ |
| Dipole–dipole | $\pi n(n+1)(n+2)a$ |

## 2D/3D Inversion

Modern surveys acquire many soundings along profiles and invert for a 2D or 3D conductivity model. The inverse problem minimises

$$\Phi = \|\mathbf{W}_d(\mathbf{d} - F[\mathbf{m}])\|^2 + \lambda \|\mathbf{W}_m \mathbf{m}\|^2$$

where $F[\mathbf{m}]$ is the forward finite-element or finite-difference operator and $\mathbf{W}_m$ applies smoothness constraints. The Jacobian $\partial F/\partial \mathbf{m}$ is computed via the adjoint state method.
