---
title: "Friedmann Equations and Cosmology"
field: astrophysics
description: The dynamical equations governing the expansion history of a homogeneous, isotropic universe derived from general relativity.
intro: >
  The Friedmann equations describe how the scale factor $a(t)$ of the universe evolves in response to its energy content. Derived from the Einstein field equations applied to the Friedmann-Lemaître-Robertson-Walker (FLRW) metric, they connect the expansion rate $H = \dot{a}/a$ to density contributions from matter, radiation, and dark energy. Together with the continuity equation, they form a complete dynamical system that predicts the age, geometry, and ultimate fate of the universe.
math_concepts:
  - differential-equations
  - dynamical-systems
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## FLRW Metric and Scale Factor

The **Friedmann-Lemaître-Robertson-Walker metric** describes a spatially homogeneous and isotropic universe:

$$ds^2 = -c^2 dt^2 + a(t)^2 \left[\frac{dr^2}{1 - kr^2} + r^2 d\Omega^2\right]$$

where $a(t)$ is the dimensionless **scale factor** (normalized so $a_0 = a(t_0) = 1$ today), and $k \in \{-1, 0, +1\}$ is the curvature parameter:
- $k = 0$: flat (Euclidean) spatial sections
- $k = +1$: closed (spherical) geometry
- $k = -1$: open (hyperbolic) geometry

The comoving coordinate $r$ labels points fixed to the cosmic expansion; proper distance is $d = a(t)\chi$ where $\chi$ is the comoving distance. The **Hubble parameter** is

$$H(t) = \frac{\dot{a}}{a}$$

with present value $H_0 \approx 70\ \text{km s}^{-1}\text{Mpc}^{-1}$.

## Friedmann Equations

Inserting the FLRW metric into the Einstein field equations with a perfect fluid stress-energy tensor yields two equations:

**First Friedmann equation** (energy constraint):

$$H^2 = \left(\frac{\dot{a}}{a}\right)^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2} + \frac{\Lambda c^2}{3}$$

**Second Friedmann equation** (acceleration equation):

$$\frac{\ddot{a}}{a} = -\frac{4\pi G}{3}\left(\rho + \frac{3P}{c^2}\right) + \frac{\Lambda c^2}{3}$$

The **fluid (continuity) equation** follows from $\nabla^\mu T_{\mu\nu} = 0$:

$$\dot{\rho} + 3H\left(\rho + \frac{P}{c^2}\right) = 0$$

This is not independent—it follows from differentiating the first Friedmann equation and using the second. The three equations involve three unknowns $(a, \rho, P)$, so an **equation of state** $P = w\rho c^2$ closes the system.

## Equation of State and Density Evolution

Different components have different equations of state parameter $w$:

| Component | $w$ | $\rho \propto$ | $a$ dominates |
|---|---|---|---|
| Matter (cold) | $0$ | $a^{-3}$ | $a \propto t^{2/3}$ |
| Radiation | $1/3$ | $a^{-4}$ | $a \propto t^{1/2}$ |
| Cosmological constant ($\Lambda$) | $-1$ | $\text{const}$ | $a \propto e^{H_\Lambda t}$ |
| Curvature | $-1/3$ | $a^{-2}$ | (sub-dominant today) |
| General dark energy | $w \neq -1$ | $a^{-3(1+w)}$ | — |

For each component with constant $w$, the fluid equation integrates to $\rho \propto a^{-3(1+w)}$. The dilution by $a^{-3}$ represents volume expansion; the additional factor $a^{-1}$ for radiation represents photon redshifting (energy per photon $\propto 1/a$).

The radiation energy density at temperature $T$:

$$\rho_r c^2 = g_* \frac{\pi^2}{30}\frac{(k_B T)^4}{(\hbar c)^3}$$

where $g_*$ counts relativistic degrees of freedom ($g_* = 2$ for photons, $43/4$ in the early universe before neutrino decoupling).

## Density Parameters and the Flat Universe

Define dimensionless **density parameters** relative to the **critical density** $\rho_c = 3H^2/8\pi G$:

$$\Omega_i = \frac{\rho_i}{\rho_c}, \quad \Omega_\Lambda = \frac{\Lambda c^2}{3H^2}, \quad \Omega_k = -\frac{kc^2}{a^2 H^2}$$

The first Friedmann equation becomes simply:

$$\Omega_m + \Omega_r + \Omega_\Lambda + \Omega_k = 1$$

The **critical density today**:

$$\rho_{c,0} = \frac{3H_0^2}{8\pi G} \approx 9.47 \times 10^{-30}\ \text{g cm}^{-3} \approx 5.4\ \text{GeV m}^{-3}$$

CMB measurements indicate $|\Omega_k| < 0.002$—the universe is spatially flat to $0.2\%$ precision, consistent with inflationary predictions. The concordance $\Lambda$CDM values:

| Parameter | Symbol | Value |
|---|---|---|
| Total matter | $\Omega_m$ | $0.315$ |
| Dark matter | $\Omega_c$ | $0.265$ |
| Baryons | $\Omega_b$ | $0.049$ |
| Radiation | $\Omega_r$ | $9.3 \times 10^{-5}$ |
| Dark energy | $\Omega_\Lambda$ | $0.685$ |
| Curvature | $\Omega_k$ | $\approx 0$ |

## Cosmic Eras and the Scale Factor

The **Hubble parameter** evolves as

$$E(z) \equiv \frac{H(z)}{H_0} = \sqrt{\Omega_{r,0}(1+z)^4 + \Omega_{m,0}(1+z)^3 + \Omega_{k,0}(1+z)^2 + \Omega_{\Lambda,0}}$$

Key transitions in cosmic history:

**Matter-radiation equality** ($z_\text{eq} \approx 3400$): $\rho_m = \rho_r$. Before this, radiation dominates; after, matter.

**Recombination** ($z \approx 1100$): hydrogen forms, photons decouple (CMB).

**Matter-Lambda equality** ($z_\Lambda \approx 0.3$): $\rho_m = \rho_\Lambda$. Expansion begins accelerating.

The deceleration parameter:

$$q = -\frac{\ddot{a} a}{\dot{a}^2} = \frac{\Omega_m}{2} + \Omega_r - \Omega_\Lambda$$

$q < 0$ indicates accelerated expansion. Today, $q_0 \approx -0.53$; the transition from deceleration to acceleration occurred at $z_\text{acc} \approx 0.64$ ($\sim 7.7\ \text{Gyr}$ ago).

Analytic solutions for single-component dominated universes:

$$a(t) \propto \begin{cases} t^{1/2} & \text{radiation domination} \\ t^{2/3} & \text{matter domination} \\ e^{H_\Lambda t} & \text{$\Lambda$ domination, } H_\Lambda = \sqrt{\Lambda/3} \end{cases}$$

## Age of the Universe

The **age of the universe** is

$$t_0 = \int_0^1 \frac{da}{a H(a)} = \frac{1}{H_0}\int_0^\infty \frac{dz}{(1+z)E(z)}$$

For flat $\Lambda$CDM with $\Omega_m = 0.315$, $\Omega_\Lambda = 0.685$, $H_0 = 67.4\ \text{km/s/Mpc}$:

$$t_0 \approx 13.8\ \text{Gyr}$$

The integrand is dominated by the low-redshift era. A matter-only ($\Omega_m = 1$, $\Omega_\Lambda = 0$) universe would give $t_0 = 2/(3H_0) \approx 9.3\ \text{Gyr}$—embarrassingly less than the age of the oldest globular clusters ($\sim 12$–$13\ \text{Gyr}$), which historically motivated introducing $\Lambda$.

The **horizon distance** (maximum causal distance):

$$d_H = c\int_0^{t_0} \frac{dt}{a(t)} = \frac{c}{H_0}\int_0^\infty \frac{dz}{E(z)} \approx 46{,}500\ \text{Mpc}$$

This is the comoving radius of the **observable universe**.

## Dark Energy and the Fate of the Universe

The cosmological constant is equivalent to a fluid with equation of state $w = -1$ and constant energy density. More generally, **dynamic dark energy** has $w(z) = w_0 + w_a(1 - a)$ (Chevallier-Polarski-Linder parameterization):

$$\Omega_\text{DE}(a) = \Omega_{\text{DE},0}\, a^{-3(1+w_0+w_a)}\exp\!\left[-3w_a(1-a)\right]$$

Current constraints from CMB + BAO + SNe Ia: $w_0 = -0.95 \pm 0.08$, consistent with $\Lambda$ ($w = -1$).

The ultimate fate depends on $w$:

| Dark energy | Fate | Timescale |
|---|---|---|
| $\Lambda$ ($w=-1$) | de Sitter expansion | $\infty$ (asymptotic) |
| Phantom ($w < -1$) | Big Rip (all structures torn apart) | Finite $t_\text{rip} \sim 20$ Gyr |
| Quintessence ($w > -1$) | Slow coasting expansion | $\infty$ |
| $w > -1/3$ | Recollapse (Big Crunch) | Finite |

In the standard $\Lambda$CDM scenario, the universe expands forever, exponentially approaching de Sitter space. Galaxies beyond $\sim 5\ \text{Gpc}$ are already receding faster than light (outside our **Hubble sphere**, not the observable universe) and are becoming permanently inaccessible.
