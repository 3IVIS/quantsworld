---
title: "Magnetic Methods"
field: geophysics
description: Total-field anomaly maps, Euler deconvolution, and susceptibility inversion image subsurface magnetic sources.
intro: >
  Magnetic surveying measures spatial variations in Earth's total magnetic field intensity caused by the induced and remanent magnetisation of subsurface rocks. Iron-bearing minerals such as magnetite create dipolar anomalies whose shape, amplitude, and wavelength encode the geometry, depth, and magnetic susceptibility of the causative body.
math_concepts:
  - partial-differential-equations
  - linear-algebra
  - optimization
  - fourier-transform
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Magnetic Potential and the Dipole Field

The scalar magnetic potential of a magnetic dipole with moment $\mathbf{m}$ is

$$\phi_m = \frac{\mu_0}{4\pi}\frac{\mathbf{m}\cdot\hat{\mathbf{r}}}{r^2}$$

The total-field anomaly $\Delta T$ is the projection of the anomalous field vector onto the direction of the ambient field $\hat{\mathbf{F}}_0$. For a body of susceptibility contrast $\Delta\kappa$ in an inducing field of strength $F_0$:

$$\mathbf{M} = \Delta\kappa\, \mathbf{H} \approx \Delta\kappa \frac{F_0}{\mu_0}\hat{\mathbf{F}}_0$$

At mid-latitudes, a compact body produces an asymmetric anomaly with a positive peak offset horizontally from the body and a negative lobe, complicating interpretation directly from the total-field map.

## Reduction to the Pole

Reduction to the pole (RTP) is a Fourier-domain filter that transforms the asymmetric mid-latitude anomaly into the symmetric anomaly that would be observed at the magnetic pole (vertical inducing field). In the wavenumber domain the RTP operator is

$$W_{RTP}(\mathbf{k}) = \frac{|\mathbf{k}|^2}{(\mathbf{k}\cdot\hat{\mathbf{F}}_0)^2}$$

At low latitudes the operator becomes singular (near-horizontal $\hat{\mathbf{F}}_0$), requiring regularisation or equivalent-layer methods.

## Euler Deconvolution

Euler's homogeneity equation relates the total-field anomaly $T$, its spatial gradients, and the unknown source depth $z_0$:

$$(x - x_0)\frac{\partial T}{\partial x} + (y - y_0)\frac{\partial T}{\partial y} + (z - z_0)\frac{\partial T}{\partial z} = -N(T - B)$$

where $N$ is the structural index (0 for contacts, 1 for dykes, 2 for pipes, 3 for spheres) and $B$ is the regional background. Solving this equation in a sliding window over the survey grid gives automated depth estimates for different source geometries.
