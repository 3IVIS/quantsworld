---
title: "Dark Matter"
field: astrophysics
description: The non-luminous mass component comprising roughly 27% of the universe's energy budget, inferred from gravitational effects.
intro: >
  Dark matter is matter that neither emits nor absorbs electromagnetic radiation at any detectable level, yet dominates the gravitational dynamics of galaxies and galaxy clusters. Multiple independent lines of evidence—rotation curves, velocity dispersions, gravitational lensing, the cosmic microwave background, and large-scale structure—all point to a non-baryonic dark component with density $\Omega_\text{DM} \approx 0.27$. The leading candidate remains weakly interacting massive particles (WIMPs), though axions and primordial black holes are increasingly competitive.
math_concepts:
  - probability-theory
  - dynamical-systems
  - numerical-methods
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Galaxy Rotation Curves

For a test mass $m$ in circular orbit at radius $R$ around a galaxy:

$$\frac{mv^2}{R} = \frac{G M(R)\, m}{R^2} \quad \Rightarrow \quad v(R) = \sqrt{\frac{G M(R)}{R}}$$

If mass were concentrated in visible stars and gas (most within a scale radius $R_d$), the rotation curve should exhibit **Keplerian decline**: $v \propto R^{-1/2}$ beyond $R \sim R_d$.

Observations, pioneered by Vera Rubin and Kent Ford (1970), show instead **flat rotation curves**: $v(R) \approx \text{const}$ for $R \gg R_d$ out to the largest radii probed by 21 cm HI emission ($\sim 30$–$60\ \text{kpc}$). A flat curve requires $M(R) \propto R$, implying an extended, roughly spherical halo with $\rho \propto R^{-2}$:

$$\rho_\text{isothermal}(r) = \frac{\rho_0}{1 + (r/r_c)^2}$$

This singular isothermal sphere gives exactly $v = \text{const}$ for $r \gg r_c$. For the Milky Way, $v_\odot \approx 220\ \text{km/s}$ at the Solar radius $R_\odot = 8.5\ \text{kpc}$, implying a mass interior to $R_\odot$ of $M(R_\odot) \approx 10^{11} M_\odot$.

## Virial Theorem and Galaxy Clusters

For a gravitationally bound system in equilibrium, the **virial theorem** states:

$$2K + U = 0 \quad \Rightarrow \quad K = -\frac{1}{2}U$$

where $K$ is total kinetic energy and $U$ is gravitational potential energy. For a galaxy cluster with $N$ galaxies each of mass $m$ at velocity dispersion $\sigma_v$ and cluster radius $R$:

$$N m \sigma_v^2 = \frac{\alpha G (Nm)^2}{R}$$

where $\alpha \sim 0.4$ is a geometry factor. Solving for total mass:

$$M_\text{cluster} = \frac{\sigma_v^2 R}{\alpha G}$$

Fritz Zwicky applied this to the Coma cluster in 1933, finding a mass-to-light ratio $M/L \sim 400\ M_\odot/L_\odot$—far exceeding the stellar contribution ($M/L \sim 2$–$5$). This was the first quantitative evidence for dark matter.

Modern X-ray observations of the hot intracluster gas (ICM) provide an independent mass estimate from hydrostatic equilibrium:

$$\frac{dP}{dr} = -\rho_\text{gas} \frac{G M(r)}{r^2} \quad \Rightarrow \quad M(r) = -\frac{k_B T r}{\mu m_p G}\left(\frac{d\ln\rho_\text{gas}}{d\ln r} + \frac{d\ln T}{d\ln r}\right)$$

| Cluster mass tracer | Method | $M_\text{total}/M_\text{baryon}$ |
|---|---|---|
| Galaxy velocities | Virial theorem | $\sim 6$ |
| ICM X-ray emission | Hydrostatic equilibrium | $\sim 6$–$8$ |
| Gravitational lensing | Convergence $\kappa$ | $\sim 5$–$7$ |

## Gravitational Lensing Evidence

A mass distribution with projected surface density $\Sigma(\boldsymbol{\xi})$ produces a deflection angle

$$\hat{\boldsymbol{\alpha}}(\boldsymbol{\xi}) = \frac{4G}{c^2}\int \frac{(\boldsymbol{\xi} - \boldsymbol{\xi}')\,\Sigma(\boldsymbol{\xi}')}{|\boldsymbol{\xi} - \boldsymbol{\xi}'|^2} d^2\xi'$$

The **convergence** $\kappa = \Sigma/\Sigma_\text{cr}$ (where $\Sigma_\text{cr} = c^2 D_s / 4\pi G D_l D_{ls}$ is the critical surface density) and the **shear** $\gamma$ distort background galaxy shapes.

**Weak lensing** measures the coherent ellipticity of background galaxies averaged over patches:

$$\langle\epsilon\rangle = g = \frac{\gamma}{1-\kappa}$$

The **Bullet Cluster** (1E 0657-56) provides the most direct evidence for dark matter: two galaxy clusters have passed through each other. The hot gas (traced by X-ray emission) was slowed by ram pressure and lags behind the galaxy distributions. Weak lensing mass reconstruction shows the dominant mass (dark matter) at the galaxy positions—demonstrating that dark matter is largely collision-free and cannot be explained by modified gravity without a new mass component.

## NFW Profile and Halo Structure

N-body simulations of CDM (cold dark matter) show that dark matter halos have a universal density profile—the **Navarro-Frenk-White (NFW) profile**:

$$\rho(r) = \frac{\rho_s}{(r/r_s)(1 + r/r_s)^2}$$

with characteristic density $\rho_s$ and scale radius $r_s$. Key properties:

- Inner slope: $\rho \propto r^{-1}$ (cuspy)
- Outer slope: $\rho \propto r^{-3}$
- Mass: $M(r) = 4\pi\rho_s r_s^3\left[\ln\frac{r_s + r}{r_s} - \frac{r}{r_s + r}\right]$

The **concentration parameter** $c_\text{vir} = r_\text{vir}/r_s \approx 5$–$25$ (with lower-mass halos more concentrated) encodes the halo assembly history. The circular velocity peaks at $r \approx 2.16\, r_s$:

$$v_\text{max} = \sqrt{\frac{4\pi G \rho_s r_s^2 \times 0.2162}{1}}$$

**Core-cusp tension**: observations of dwarf galaxies suggest cored profiles ($\rho \sim \text{const}$ at $r \to 0$) rather than the NFW cusp. This may reflect baryonic feedback (supernovae blowing out gas, which drags dark matter outward) or intrinsic warm/fuzzy dark matter properties.

The dark matter density in the Solar neighborhood:

$$\rho_\text{DM,\odot} \approx 0.4\ \text{GeV cm}^{-3} \approx 0.01\ M_\odot\, \text{pc}^{-3}$$

## Cosmological Dark Matter: $\Omega_{DM}$ and CDM

In the $\Lambda$CDM model, the universe's energy budget is:

| Component | $\Omega$ | $\rho$ (GeV cm$^{-3}$) |
|---|---|---|
| Baryonic matter | $0.049$ | $2.1 \times 10^{-6}$ |
| Dark matter | $0.268$ | $1.2 \times 10^{-5}$ |
| Dark energy ($\Lambda$) | $0.683$ | $3.0 \times 10^{-6}$ |

**Cold dark matter (CDM)** refers to particles that were non-relativistic at the epoch of matter-radiation equality ($z \sim 3400$). The free-streaming length $\lambda_\text{fs} \ll 1\ \text{kpc}$ for CDM, allowing structure formation down to Earth-mass scales. CDM correctly predicts:
- CMB power spectrum peak positions and heights
- Baryon acoustic oscillation scale
- Large-scale structure (galaxy clustering, Lyman-$\alpha$ forest)

## WIMP Dark Matter and Detection

The **WIMP miracle**: if dark matter is a particle with $m \sim 100\ \text{GeV}$, weak-scale cross-section $\sigma \sim G_F^2 m^2 / \pi \sim 10^{-36}\ \text{cm}^2$, and starts in thermal equilibrium, the thermal relic density is

$$\Omega_\text{DM} h^2 \approx \frac{3 \times 10^{-27}\ \text{cm}^3\text{s}^{-1}}{\langle\sigma v\rangle} \approx 0.12$$

matching observations without fine-tuning. The freeze-out temperature $T_f \approx m_\chi/20$.

**Direct detection** searches for WIMP-nucleus elastic scattering. The differential rate per unit detector mass:

$$\frac{dR}{dE_R} = \frac{\rho_\text{DM} N_A}{m_\text{target}\, m_\chi} \int_{v_\text{min}}^\infty v f(v) \frac{d\sigma}{dE_R} dv$$

where $f(v)$ is the local velocity distribution (Maxwell-Boltzmann with $v_0 = 220\ \text{km/s}$), $E_R$ is recoil energy, and $v_\text{min} = \sqrt{m_\text{target} E_R / 2\mu^2}$ is the minimum velocity for a given recoil.

LUX-ZEPLIN (LZ) and XENONnT experiments exclude spin-independent WIMP-nucleon cross-sections $\sigma_{SI} > 10^{-47}\ \text{cm}^2$ for $m_\chi \sim 40\ \text{GeV}$—approaching the **neutrino floor** where solar and atmospheric neutrino backgrounds become irreducible.

**Axion** dark matter ($m_a \sim 10^{-6}$–$10^{-3}\ \text{eV}$) arises from the Peccei-Quinn solution to the strong CP problem. ADMX and HAYSTAC search for axion-photon conversion in microwave cavities: $a + B \to \gamma$ at rate $\propto g_{a\gamma\gamma}^2 B^2$.
