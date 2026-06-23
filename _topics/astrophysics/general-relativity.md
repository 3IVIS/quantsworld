---
title: "General Relativity"
field: astrophysics
description: Einstein's geometric theory of gravitation describing spacetime curvature produced by mass and energy.
intro: >
  General relativity replaces Newtonian gravity with the statement that matter curves spacetime, and curved spacetime tells matter how to move. The Einstein field equations relate the geometry of spacetime—encoded in the metric tensor—to the distribution of energy and momentum. From these equations emerge predictions that have been verified to extraordinary precision: gravitational redshift, light deflection, perihelion precession, gravitational waves, and the dynamics of the entire universe.
math_concepts:
  - differential-geometry
  - partial-differential-equations
  - variational-calculus
difficulty: expert
difficulty_level: 5
read_time: 16
---

## Spacetime Metric and the Equivalence Principle

The fundamental object of GR is the **metric tensor** $g_{\mu\nu}$, a symmetric $(0,2)$ tensor that measures spacetime intervals:

$$ds^2 = g_{\mu\nu}\, dx^\mu\, dx^\nu$$

with Einstein's summation convention over repeated indices $\mu, \nu \in \{0,1,2,3\}$. In flat Minkowski spacetime, $g_{\mu\nu} = \eta_{\mu\nu} = \text{diag}(-1,+1,+1,+1)$.

The **weak equivalence principle** (WEP) states that inertial mass equals gravitational mass, so all freely falling bodies follow the same trajectories regardless of composition. Einstein elevated this to the **strong equivalence principle**: in a freely falling (local inertial) frame, the laws of special relativity hold. Gravity is not a force but the curvature of spacetime.

The **geodesic equation** governs the worldline of a freely falling particle:

$$\frac{d^2 x^\mu}{d\tau^2} + \Gamma^\mu_{\ \alpha\beta}\frac{dx^\alpha}{d\tau}\frac{dx^\beta}{d\tau} = 0$$

where $\tau$ is proper time. The **Christoffel symbols** (not a tensor) express the metric connection:

$$\Gamma^\mu_{\ \alpha\beta} = \frac{1}{2}g^{\mu\nu}\left(\partial_\alpha g_{\nu\beta} + \partial_\beta g_{\nu\alpha} - \partial_\nu g_{\alpha\beta}\right)$$

These encode the "fictitious forces" experienced in a non-inertial frame—in GR, they represent the gravitational field.

## Curvature: Riemann, Ricci, Einstein Tensors

The **Riemann curvature tensor** measures the failure of parallel transport around a closed loop:

$$R^\rho_{\ \sigma\mu\nu} = \partial_\mu \Gamma^\rho_{\ \nu\sigma} - \partial_\nu \Gamma^\rho_{\ \mu\sigma} + \Gamma^\rho_{\ \mu\lambda}\Gamma^\lambda_{\ \nu\sigma} - \Gamma^\rho_{\ \nu\lambda}\Gamma^\lambda_{\ \mu\sigma}$$

It has $20$ independent components in 4D. Contracting indices gives:

**Ricci tensor:** $R_{\mu\nu} = R^\rho_{\ \mu\rho\nu}$ (10 independent components)

**Ricci scalar:** $R = g^{\mu\nu} R_{\mu\nu}$

**Einstein tensor:** $G_{\mu\nu} = R_{\mu\nu} - \frac{1}{2}g_{\mu\nu}R$

The crucial property of the Einstein tensor is that it is covariantly conserved: $\nabla^\mu G_{\mu\nu} = 0$ (the contracted Bianchi identity). This matches the conservation of the stress-energy tensor $\nabla^\mu T_{\mu\nu} = 0$, ensuring energy-momentum conservation is built into the geometry.

## Einstein Field Equations

The **Einstein field equations** (EFE) relate spacetime geometry to energy-momentum:

$$G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}$$

The right side is the **stress-energy tensor** $T_{\mu\nu}$: for a perfect fluid with energy density $\rho$, pressure $P$, and 4-velocity $u^\mu$,

$$T_{\mu\nu} = (\rho + P/c^2) u_\mu u_\nu + P g_{\mu\nu}$$

The EFE are 10 coupled, nonlinear PDEs in the 10 components of $g_{\mu\nu}$. The cosmological constant $\Lambda$ was introduced by Einstein to allow a static universe; its modern interpretation is vacuum energy (dark energy).

The equations can be derived from the **Einstein-Hilbert action** via the principle of stationary action:

$$S = \frac{c^4}{16\pi G}\int (R - 2\Lambda)\sqrt{-g}\, d^4x + S_\text{matter}$$

Variation with respect to $g^{\mu\nu}$ yields the EFE. The factor $\sqrt{-g}$ ($g = \det g_{\mu\nu}$) ensures the action is a scalar under coordinate transformations.

## Schwarzschild Metric

The unique spherically symmetric vacuum solution ($T_{\mu\nu} = 0$, $\Lambda = 0$) is the **Schwarzschild metric**:

$$ds^2 = -\left(1 - \frac{r_s}{r}\right)c^2 dt^2 + \left(1 - \frac{r_s}{r}\right)^{-1}dr^2 + r^2 d\Omega^2$$

where $r_s = 2GM/c^2$ is the Schwarzschild radius and $d\Omega^2 = d\theta^2 + \sin^2\theta\, d\phi^2$. The metric is singular at $r = r_s$ (a coordinate singularity, not a physical one) and at $r = 0$ (a genuine curvature singularity where $R_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma} \to \infty$).

The three classical tests follow from geodesics in this metric:

**Gravitational redshift.** A photon emitted at $r_1$ and received at $r_2 > r_1$ is redshifted by

$$\frac{\nu_1}{\nu_2} = \sqrt{\frac{1 - r_s/r_2}{1 - r_s/r_1}} \approx 1 + \frac{GM}{c^2}\left(\frac{1}{r_2} - \frac{1}{r_1}\right)$$

Pound and Rebka verified this to $1\%$ precision using the Mössbauer effect over a $22.5\ \text{m}$ tower at Harvard in 1959.

**Light deflection.** The bending angle for a ray passing at closest approach $b \gg r_s$ is

$$\delta\phi = \frac{4GM}{bc^2} = \frac{2 r_s}{b}$$

For $b = R_\odot$: $\delta\phi = 1.75''$. Eddington's 1919 solar eclipse measurement confirmed this, making Einstein world-famous.

**Perihelion precession.** An orbit precesses by

$$\Delta\phi = \frac{6\pi G M}{a(1-e^2)c^2}\ \text{per orbit}$$

For Mercury: $43.1''$ per century, exactly matching the anomaly unexplained by Newtonian gravity.

| Test | GR prediction | Observed | Precision |
|---|---|---|---|
| Gravitational redshift | $z = \Delta U/c^2$ | Confirmed | $10^{-4}$ |
| Light deflection (Sun) | $1.75''$ | $1.75 \pm 0.10''$ | $\sim 1\%$ |
| Mercury precession | $43.1''/\text{cy}$ | $43.1 \pm 0.5''$/cy | $\sim 1\%$ |
| Shapiro delay (Cassini) | $\gamma = 1$ | $1 + (2.1 \pm 2.3)\times10^{-5}$ | $10^{-5}$ |

## Weak-Field Limit and Gravitational Potential

For weak fields ($|h_{\mu\nu}| \ll 1$, where $g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}$) and slow motion, the EFE reduce to the Poisson equation:

$$\nabla^2 \Phi = 4\pi G \rho$$

The $tt$-component of the metric is $g_{00} = -(1 + 2\Phi/c^2)$, recovering Newtonian gravity as the low-energy limit. The geodesic equation reduces to $\ddot{\mathbf{x}} = -\nabla\Phi$.

In the linearized theory, with the trace-reversed perturbation $\bar{h}_{\mu\nu} = h_{\mu\nu} - \frac{1}{2}\eta_{\mu\nu}h$, the EFE in Lorenz gauge $\partial^\mu \bar{h}_{\mu\nu} = 0$ become:

$$\Box\, \bar{h}_{\mu\nu} = -\frac{16\pi G}{c^4} T_{\mu\nu}$$

where $\Box = -c^{-2}\partial_t^2 + \nabla^2$ is the d'Alembertian. This is the wave equation for gravitational radiation.

## Post-Newtonian Expansion and Parameterization

For solar-system tests and binary pulsars, the **post-Newtonian (PN) expansion** systematically includes corrections in powers of $v/c$ and $\Phi/c^2$:

$$g_{00} = -1 + \frac{2\Phi}{c^2} - \frac{2\beta \Phi^2}{c^4} + \cdots$$

$$g_{ij} = \delta_{ij}\left(1 + \frac{2\gamma \Phi}{c^2}\right) + \cdots$$

GR predicts $\beta = \gamma = 1$. Alternative theories of gravity (Brans-Dicke, $f(R)$, scalar-tensor) predict $\gamma \neq 1$. The parameterized post-Newtonian (PPN) formalism provides a model-independent framework to test GR against observations.

The **Hulse-Taylor binary pulsar** (PSR 1913+16) provided indirect evidence for gravitational waves: the observed orbital decay rate $\dot{P}_b = -2.4184 \times 10^{-12}$ agrees with GR's quadrupole radiation formula to $0.2\%$ precision—earning Hulse and Taylor the 1993 Nobel Prize.
