---
title: "Seismic Tomography"
field: geophysics
description: Ray-path integrals and least-squares inversion map 3D velocity structure inside the Earth.
intro: >
  Seismic tomography borrows the mathematics of medical CT scanning to image Earth's interior. Traveltime residuals from earthquakes recorded at global networks are back-projected along ray paths to recover three-dimensional variations in seismic velocity, revealing mantle convection, subducting slabs, and magma chambers.
math_concepts:
  - linear-algebra
  - optimization
  - numerical-methods
  - fourier-transform
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## The Forward Problem

The traveltime along a ray connecting source $s$ to receiver $r$ is

$$T_{sr} = \int_{\mathrm{ray}} \frac{ds}{v(\mathbf{x})}$$

Linearising about a reference model $v_0(\mathbf{x})$ with slowness perturbation $\delta s(\mathbf{x}) = \delta(1/v)$ gives

$$\delta t_{sr} = \int_{\mathrm{ray}_0} \delta s(\mathbf{x})\, dl$$

Discretising the model into $M$ cells with unknown slowness perturbations $\mathbf{m}$ and stacking $N$ ray-pairs yields the linear system $\mathbf{A}\mathbf{m} = \mathbf{b}$, where $A_{ij}$ is the path length of ray $i$ through cell $j$.

## Regularised Least-Squares Inversion

The system $\mathbf{A}\mathbf{m} = \mathbf{b}$ is typically both large and ill-conditioned. The damped least-squares solution is

$$\hat{\mathbf{m}} = (\mathbf{A}^T\mathbf{A} + \lambda \mathbf{I})^{-1}\mathbf{A}^T\mathbf{b}$$

In practice, iterative solvers (LSQR, conjugate gradient) are used because $\mathbf{A}$ may contain $10^6 \times 10^6$ entries. Additional Laplacian smoothing regularisation $\mu \|\nabla^2 \mathbf{m}\|^2$ suppresses spurious short-wavelength artefacts.

## Waveform Tomography

Full-waveform inversion (FWI) extends ray tomography by matching entire seismograms. The misfit

$$\chi = \frac{1}{2}\sum_{sr}\int \bigl[u_{sr}^{\text{obs}}(t) - u_{sr}^{\text{syn}}(t)\bigr]^2\, dt$$

is minimised via adjoint methods, which compute the gradient $\partial\chi/\partial\mathbf{m}$ at the cost of two wavefield simulations. Cross-correlation time shifts provide a robust phase misfit that is less sensitive to amplitude errors.
