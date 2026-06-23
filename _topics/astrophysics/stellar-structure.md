---
title: "Stellar Structure Equations"
field: astrophysics
description: The four coupled differential equations governing the interior structure of stars in hydrostatic equilibrium.
intro: >
  A star in steady state is described by four ordinary differential equations relating pressure, temperature, luminosity, and mass as functions of radius. These equations, combined with microphysical inputs for opacity and nuclear energy generation, form a well-posed boundary value problem whose solutions map out the Hertzsprung-Russell diagram. Solving them numerically reproduces the observed mass-luminosity relation, stellar lifetimes, and main-sequence positions to high accuracy.
math_concepts:
  - differential-equations
  - partial-differential-equations
  - numerical-methods
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## The Four Structure Equations

A spherically symmetric star in hydrostatic equilibrium is fully described by four coupled ODEs with radius $r$ as the independent variable.

**Mass continuity:**

$$\frac{dM}{dr} = 4\pi r^2 \rho$$

This simply states that the mass enclosed within radius $r$ increases with the local density shell by shell.

**Hydrostatic equilibrium:**

$$\frac{dP}{dr} = -\frac{G M(r)\, \rho}{r^2}$$

The pressure gradient balances the local gravitational acceleration $g = GM/r^2$. This is the most fundamental constraint—without it, the star would either collapse or expand on a dynamical timescale $t_\text{dyn} \sim (G\bar{\rho})^{-1/2} \approx 30\ \text{min}$ for the Sun.

**Energy transport:**

$$\frac{dT}{dr} = -\frac{3 \kappa \rho}{16\pi a c} \frac{L(r)}{r^2 T^3} \quad \text{(radiative)}$$

or

$$\frac{dT}{dr} = \left(1 - \frac{1}{\gamma}\right)\frac{T}{P}\frac{dP}{dr} \quad \text{(adiabatic convection)}$$

where $\kappa$ is opacity ($\text{cm}^2\,\text{g}^{-1}$), $a = 4\sigma/c$ is the radiation constant, and $\gamma = c_P/c_V$ is the adiabatic index.

**Energy generation:**

$$\frac{dL}{dr} = 4\pi r^2 \rho \varepsilon$$

where $\varepsilon$ is the energy generation rate per unit mass ($\text{erg g}^{-1}\text{s}^{-1}$) from nuclear reactions and gravitational contraction.

## Equation of State and Microphysics

For main-sequence stars, the interior is well approximated as a **mixture of ideal gas and radiation pressure**:

$$P = P_\text{gas} + P_\text{rad} = \frac{\rho k_B T}{\mu m_H} + \frac{a T^4}{3}$$

Here $\mu$ is the mean molecular weight. For fully ionized hydrogen ($X$), helium ($Y$), and metals ($Z = 1-X-Y$):

$$\frac{1}{\mu} = 2X + \frac{3Y}{4} + \frac{Z}{2} \approx 2X + \frac{3Y}{4}$$

For the present-day Sun ($X = 0.71$, $Y = 0.27$), $\mu \approx 0.62$.

**Opacity** combines free-free (Kramers) and electron scattering contributions:

| Mechanism | Form | Regime |
|---|---|---|
| Thomson scattering | $\kappa_\text{es} = 0.20(1+X)\ \text{cm}^2\text{g}^{-1}$ | Hot, low density |
| Kramers free-free | $\kappa_\text{ff} \propto \rho T^{-7/2}$ | Intermediate |
| H$^-$ bound-free | peaks near $T \sim 6000\ \text{K}$ | Stellar envelopes |

The Rosseland mean opacity $\kappa$ is the harmonic mean over frequency:

$$\frac{1}{\kappa} = \frac{\int_0^\infty \kappa_\nu^{-1} (\partial B_\nu / \partial T) d\nu}{\int_0^\infty (\partial B_\nu / \partial T) d\nu}$$

## Nuclear Energy Generation

The dominant hydrogen-burning channels are the **pp chain** (low-mass stars) and the **CNO cycle** (high-mass stars). Energy generation rates scale as power laws in temperature:

$$\varepsilon_\text{pp} \approx \varepsilon_0^{(\text{pp})} \rho X^2 T_6^4 \quad (T_6 = T/10^6\ \text{K})$$

$$\varepsilon_\text{CNO} \approx \varepsilon_0^{(\text{CNO})} \rho X X_\text{CNO} T_6^{18}$$

The steep CNO temperature dependence ($\propto T^{18}$) forces convective cores in massive stars. The net nuclear reaction for hydrogen burning:

$$4\,{}^1\text{H} \rightarrow {}^4\text{He} + 2e^+ + 2\nu_e + \text{energy}$$

The mass-energy released per helium nucleus formed is

$$Q = \Delta m c^2 = (4 m_p - m_\alpha - 2m_e)c^2 \approx 26.73\ \text{MeV}$$

of which $\sim 2\ \text{MeV}$ is lost to neutrinos. The **stellar luminosity** is therefore

$$L = \frac{Q_\text{eff}}{4 m_p} \dot{M}_\text{burn}$$

where $\dot{M}_\text{burn}$ is the hydrogen mass consumption rate. For the Sun, $\dot{M}_\text{burn} \approx 6 \times 10^{11}\ \text{g s}^{-1}$.

## Polytropic Models and the Lane-Emden Equation

A **polytrope** assumes $P = K \rho^{(n+1)/n}$, reducing the structure equations to a single ODE. Define dimensionless variables:

$$\rho = \rho_c\, \theta^n, \quad r = \alpha\, \xi, \quad \alpha^2 = \frac{(n+1)K\rho_c^{(1-n)/n}}{4\pi G}$$

The hydrostatic and mass-continuity equations combine to the **Lane-Emden equation**:

$$\frac{1}{\xi^2}\frac{d}{d\xi}\left(\xi^2 \frac{d\theta}{d\xi}\right) = -\theta^n$$

with boundary conditions $\theta(0) = 1$, $\theta'(0) = 0$. The stellar surface corresponds to the first zero $\xi_1$ where $\theta(\xi_1) = 0$.

| $n$ | Physical case | $\xi_1$ | $(-\xi^2 d\theta/d\xi)_{\xi_1}$ |
|---|---|---|---|
| 0 | Uniform density | $\sqrt{6}$ | $2\sqrt{6}/3$ |
| 1 | Neutron star (approx.) | $\pi$ | $\pi$ |
| 1.5 | Convective star / white dwarf | 3.654 | 2.714 |
| 3 | Eddington standard model | 6.897 | 2.018 |
| 5 | Infinite radius | $\infty$ | — |

For $n=3$ (the Eddington standard model), the central-to-mean density ratio is $\rho_c/\bar{\rho} \approx 54$, close to the solar value of $\sim 100$.

## Timescales and the Mass-Luminosity Relation

The **Kelvin-Helmholtz timescale** gives the time for a star to radiate away its gravitational energy:

$$t_\text{KH} = \frac{GM^2}{R L} \approx \frac{3.14 \times 10^7\ \text{yr}}{\ell\, \mu^4 m^2}$$

where $\ell = L/L_\odot$, $m = M/M_\odot$. For the Sun, $t_\text{KH} \approx 1.5 \times 10^7\ \text{yr}$—far too short to explain Earth's geological record, resolving the Victorian controversy only when nuclear energy was recognized.

The **nuclear timescale** (main-sequence lifetime):

$$t_\text{nuc} = \frac{\eta\, Q\, f_H\, M}{L} \approx 10^{10}\ \text{yr} \times \frac{m}{\ell}$$

where $f_H \approx 0.1$ is the fraction of hydrogen available for burning and $\eta \approx 0.007$ is the mass-energy conversion efficiency.

The **mass-luminosity relation** emerges from the structure equations through the opacity. For electron scattering opacity ($\kappa = \text{const}$) in radiative equilibrium:

$$L \propto \frac{\mu^4 M^3}{\kappa} \times \text{(weak density dependence)}$$

Empirically, $L \propto M^4$ for $M < 10 M_\odot$ (with $L \propto M^{3.5}$ for more massive stars). This makes the stellar lifetime

$$t_\text{nuc} \propto M/L \propto M^{-3}$$

so a $10 M_\odot$ star lives only $10^7\ \text{yr}$ compared to $10^{10}\ \text{yr}$ for the Sun.

## Numerical Solution: Shooting Method

The boundary conditions split between the center and surface, making stellar structure a **two-point boundary value problem**:

- At $r = 0$: $M(0) = 0$, $L(0) = 0$ (regularity)
- At $r = R$: $P(R) = 0$, $T(R) = T_\text{eff}$ (surface)

The standard numerical approach is the **Henyey method**: simultaneously integrate inward from the surface and outward from the center, then match at a fitting point $r_f$. The residuals at the fitting point define a nonlinear system solved by Newton-Raphson iteration.

Let $\mathbf{y} = (P, T, M, L)$ with central values $(P_c, T_c)$ as free parameters. The Jacobian of residuals with respect to parameters is computed by perturbing each parameter and solving the ODEs:

$$\Delta\mathbf{p} = -\mathbf{J}^{-1}\, \mathbf{r}(\mathbf{p})$$

Convergence requires $|\Delta p_i / p_i| < 10^{-6}$ for each iteration. Modern stellar evolution codes (MESA, STARS, GENEC) couple this to a time-stepping scheme that evolves the composition $X(r,t)$, $Y(r,t)$ in response to nuclear burning.
