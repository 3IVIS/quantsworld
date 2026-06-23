---
title: "Hubble's Law and Cosmic Expansion"
field: astrophysics
description: The empirical relationship between a galaxy's recession velocity and its distance, forming the foundation of observational cosmology.
intro: >
  Hubble's Law, $v = H_0 d$, encodes the expansion of the universe in a single proportionality constant measured across millions of light-years. Originally inferred from Doppler-shifted galaxy spectra in 1929, it now anchors the entire distance ladder and the $\Lambda$CDM concordance model. A persistent tension between values of $H_0$ derived from the early and late universe has emerged as one of the deepest puzzles in modern cosmology.
math_concepts:
  - differential-equations
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## The Hubble–Lemaître Law

For a galaxy at proper distance $d$, the recession velocity due to cosmic expansion is

$$v = H_0\, d$$

where $H_0$ is the **Hubble constant**, with current best estimates near $70\ \text{km s}^{-1}\text{Mpc}^{-1}$. Hubble's original 1929 value was $\approx 500\ \text{km s}^{-1}\text{Mpc}^{-1}$—a factor of seven too high due to a miscalibrated distance ladder.

The law is not a "velocity through space" but rather a statement about space itself expanding: every pair of points separated by distance $d$ recedes at rate $v = H_0 d$. The relationship follows directly from homogeneity and isotropy of the universe—galaxies are not moving from a central point but rather riding an expanding metric.

In terms of the scale factor $a(t)$, the proper distance evolves as

$$d(t) = a(t)\, \chi$$

where $\chi$ is the **comoving coordinate** (fixed to the cosmic grid). Differentiating:

$$\dot{d} = \dot{a}\, \chi = \frac{\dot{a}}{a}\, d \equiv H(t)\, d$$

The Hubble constant is thus the present-day value $H_0 = \dot{a}_0 / a_0$, conventionally written $H_0 = 100\, h\ \text{km s}^{-1}\text{Mpc}^{-1}$ with $h \approx 0.70$.

## Cosmological Redshift

Light emitted at wavelength $\lambda_\text{em}$ and observed at $\lambda_\text{obs}$ defines the **redshift**

$$z = \frac{\lambda_\text{obs} - \lambda_\text{em}}{\lambda_\text{em}} = \frac{\Delta\lambda}{\lambda_\text{em}}$$

For a universe with scale factor $a(t)$, photon wavelengths stretch with the metric:

$$1 + z = \frac{a_0}{a_\text{em}} = \frac{1}{a_\text{em}}$$

(using the convention $a_0 = 1$). In the local universe ($z \ll 1$), this reduces to the Doppler formula $z \approx v/c$, so

$$v \approx c z = H_0 d \quad \Rightarrow \quad d \approx \frac{cz}{H_0}$$

For larger redshifts the relationship becomes geometry-dependent. The comoving distance to redshift $z$ is

$$\chi(z) = \frac{c}{H_0} \int_0^z \frac{dz'}{E(z')}$$

where $E(z) = H(z)/H_0 = \sqrt{\Omega_m(1+z)^3 + \Omega_r(1+z)^4 + \Omega_\Lambda}$ encodes the energy content.

| Quantity | Symbol | Typical value |
|---|---|---|
| Hubble constant | $H_0$ | $70\ \text{km s}^{-1}\text{Mpc}^{-1}$ |
| Hubble time | $t_H = 1/H_0$ | $\approx 14\ \text{Gyr}$ |
| Hubble distance | $D_H = c/H_0$ | $\approx 4280\ \text{Mpc}$ |
| CMB-derived $H_0$ (Planck) | $H_0^\text{CMB}$ | $67.4 \pm 0.5$ |
| Local $H_0$ (SH0ES) | $H_0^\text{local}$ | $73.0 \pm 1.0$ |

## The Cosmic Distance Ladder

Measuring $H_0$ requires calibrating distances independently of redshift. The **distance ladder** chains multiple overlapping methods:

**Rung 1 — Geometric distances.** Parallax gives precise distances to nearby stars. GAIA provides sub-microarcsecond parallaxes to $\sim 3\ \text{kpc}$.

**Rung 2 — Cepheid variable stars.** The period-luminosity (Leavitt) law:

$$M = -a \log_{10}(P/10\ \text{days}) + b$$

with $a \approx 2.81$ in the $I$-band. Cepheids reach to $\sim 50\ \text{Mpc}$ with HST or JWST.

**Rung 3 — Type Ia supernovae (SNe Ia).** These "standard candles" have a luminosity-decline-rate correlation (Phillips relation):

$$M_B^\text{max} = -19.3 + \alpha\, \Delta m_{15}(B)$$

where $\Delta m_{15}$ is the $B$-band decline in 15 days. SNe Ia reach $z \sim 1.5$, providing the kinematic evidence for accelerated expansion.

**Rung 4 — Hubble flow.** Once $d$ is calibrated and $z$ is measured spectroscopically, $H_0 = v/d$.

The distance modulus linking apparent magnitude $m$ to absolute magnitude $M$ and luminosity distance $d_L$:

$$\mu = m - M = 5\log_{10}\!\left(\frac{d_L}{10\ \text{pc}}\right)$$

## Lookback Time and Comoving Distance

The **lookback time** to redshift $z$ is

$$t_L(z) = \frac{1}{H_0} \int_0^z \frac{dz'}{(1+z')\, E(z')}$$

For the concordance model ($\Omega_m = 0.3$, $\Omega_\Lambda = 0.7$):

| $z$ | Lookback time (Gyr) | Comoving distance (Mpc) |
|---|---|---|
| 0.1 | 1.3 | 420 |
| 0.5 | 5.1 | 1890 |
| 1.0 | 7.9 | 3300 |
| 2.0 | 10.3 | 5200 |
| 1100 | 13.8 | 14,000 |

The **proper distance** at the moment of emission differs from the comoving distance:

$$d_\text{proper}(t_\text{em}) = a(t_\text{em})\, \chi = \frac{\chi}{1+z}$$

The **luminosity distance** $d_L = (1+z)\chi$ and **angular diameter distance** $d_A = \chi/(1+z)$ differ by a factor of $(1+z)^2$, a consequence of photon time dilation and aberration.

## The Hubble Tension

Two classes of measurement give inconsistent $H_0$ values at $\sim 5\sigma$ significance:

**Early-universe (CMB) measurements** use the acoustic peak positions in the CMB power spectrum—a standard ruler with angular scale $\theta_s = r_s / d_A$, where the sound horizon $r_s \approx 147\ \text{Mpc}$ is precisely calculated from pre-recombination physics. Planck 2018 gives $H_0 = 67.4 \pm 0.5\ \text{km s}^{-1}\text{Mpc}^{-1}$.

**Late-universe (distance ladder) measurements** use Cepheids anchored to geometric distances plus SNe Ia. The SH0ES collaboration gives $H_0 = 73.0 \pm 1.0\ \text{km s}^{-1}\text{Mpc}^{-1}$.

Proposed resolutions include:
- **Early dark energy** modifying $r_s$ before recombination
- **Interacting dark energy** with nonstandard equation of state
- Systematic errors in Cepheid metallicity corrections or SNe Ia calibration
- New physics at or after recombination

The tension persists across independent late-time probes (TRGB, megamasers, surface brightness fluctuations), suggesting a genuine cosmological discrepancy rather than a measurement artifact.

## Statistical Estimation of $H_0$

Estimating $H_0$ from a catalog of galaxies requires propagating distance uncertainties. If each galaxy $i$ has observed recession velocity $v_i$ and distance estimate $d_i$ with uncertainty $\sigma_i$:

$$\hat{H}_0 = \frac{\sum_i v_i d_i / \sigma_i^2}{\sum_i d_i^2 / \sigma_i^2}$$

A full Bayesian treatment models the **peculiar velocity** contribution. Galaxies deviate from pure Hubble flow by peculiar velocities $v_\text{pec} \sim 300\ \text{km/s}$ due to local gravitational structure. The likelihood for galaxy $i$ is

$$\mathcal{L}_i(H_0) = \int P(v_\text{pec}) \, \mathcal{N}\!\left(v_i - H_0 d_i - v_\text{pec} \mid 0, \sigma_v^2\right) dv_\text{pec}$$

Gravitational wave standard sirens offer a completely independent route: binary mergers provide absolute distance from GW amplitude, and an electromagnetic counterpart provides $z$. The single event GW170817 gave $H_0 = 70^{+12}_{-8}\ \text{km s}^{-1}\text{Mpc}^{-1}$, with precision improving as the event catalog grows.
