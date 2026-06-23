---
title: "Stellar Evolution"
field: astrophysics
description: The life cycle of stars from gravitational collapse through nuclear burning phases to their final compact remnants.
intro: >
  Stars are gravitationally bound nuclear reactors that spend most of their lives fusing hydrogen into helium on the main sequence. The Hertzsprung-Russell diagram maps stellar luminosity against temperature, organizing all evolutionary stages into a comprehensible narrative from stellar birth to death. The endpoint of evolution—white dwarf, neutron star, or black hole—is determined almost entirely by the initial mass, with the critical thresholds lying near $8 M_\odot$ and $20\text{–}25 M_\odot$.
math_concepts:
  - differential-equations
  - numerical-methods
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## Hertzsprung-Russell Diagram

The **Hertzsprung-Russell (HR) diagram** plots absolute luminosity $L$ (or absolute magnitude $M_V$) on the vertical axis against effective temperature $T_\text{eff}$ (increasing rightward to leftward) or spectral type. The key features:

- **Main sequence**: a diagonal strip where hydrogen-burning stars reside ($90\%$ of catalogued stars). Luminosity scales steeply with mass: $L \propto M^{3.5\text{–}4}$.
- **Red giant branch (RGB)**: stars evolving off the main sequence with degenerate helium cores.
- **Horizontal branch (HB)**: helium-burning stars at roughly constant luminosity.
- **Asymptotic giant branch (AGB)**: double shell-burning stars ascending again.
- **White dwarf sequence**: cooling degenerate remnants in the lower left.

The **Stefan-Boltzmann law** connects luminosity, radius, and temperature:

$$L = 4\pi R^2 \sigma T_\text{eff}^4$$

Lines of constant radius are diagonal in the HR diagram. The Sun: $L_\odot = 3.828 \times 10^{33}\ \text{erg/s}$, $T_{\text{eff},\odot} = 5778\ \text{K}$, $R_\odot = 6.96 \times 10^{10}\ \text{cm}$.

| Star type | Spectral class | $T_\text{eff}$ (K) | $L/L_\odot$ | $M/M_\odot$ |
|---|---|---|---|---|
| O supergiant | O | $>30{,}000$ | $10^5$–$10^6$ | $20$–$120$ |
| A main sequence | A | $7{,}500$–$10{,}000$ | $5$–$80$ | $1.5$–$3$ |
| G dwarf (Sun) | G2V | $5{,}500$–$6{,}000$ | $0.6$–$1.5$ | $0.8$–$1.1$ |
| M dwarf | M | $2{,}500$–$3{,}800$ | $0.001$–$0.08$ | $0.08$–$0.5$ |

## Pre-Main Sequence Evolution

Stars form by gravitational collapse of molecular cloud cores. The **Jeans mass** for a cloud of temperature $T$ and density $\rho$ is

$$M_J = \left(\frac{5 k_B T}{G \mu m_H}\right)^{3/2} \left(\frac{3}{4\pi\rho}\right)^{1/2} \approx 1 M_\odot \left(\frac{T}{10\ \text{K}}\right)^{3/2} \left(\frac{n_H}{10^3\ \text{cm}^{-3}}\right)^{-1/2}$$

A collapsing protostar follows the **Hayashi track**—a nearly vertical descent in the HR diagram—while fully convective. The luminosity is set by the Kelvin-Helmholtz contraction:

$$L = -\frac{dE_\text{grav}}{dt} = \frac{GM^2}{2R^2}\dot{R}$$

Once radiative transport develops in the core, the star moves onto the **Henyey track** (nearly horizontal at roughly constant luminosity) before settling on the zero-age main sequence (ZAMS) when central nuclear burning ignites. The pre-main sequence timescale:

$$t_\text{PMS} \approx \frac{G M^2}{R_\text{ZAMS} L_\text{ZAMS}} \approx 30\ \text{Myr}\ (M/M_\odot)^{-2.5}$$

## Hydrogen Burning and Main Sequence Lifetime

The **pp chain** dominates for $M < 1.5 M_\odot$ (lower core temperatures $T_c < 1.7 \times 10^7\ \text{K}$):

$${}^1\text{H} + {}^1\text{H} \to {}^2\text{H} + e^+ + \nu_e \quad \text{(slow, governs rate)}$$
$${}^2\text{H} + {}^1\text{H} \to {}^3\text{He} + \gamma$$
$${}^3\text{He} + {}^3\text{He} \to {}^4\text{He} + 2{}^1\text{H}$$

Net: $4{}^1\text{H} \to {}^4\text{He} + 2e^+ + 2\nu_e + \text{energy}$ ($Q_\text{eff} \approx 25\ \text{MeV}$)

The **CNO cycle** dominates for $M > 1.5 M_\odot$ (energy generation $\varepsilon_\text{CNO} \propto T^{18}$), driving convective cores. The **main sequence lifetime** is

$$t_\text{MS} = \frac{\eta Q f_H M}{L} \approx 10^{10}\ \text{yr} \times \left(\frac{M}{M_\odot}\right)^{-2.5}$$

where $f_H \approx 0.1$ (core hydrogen fraction burned), $\eta = 0.007$. This creates a fundamental tension between stellar lifetimes and galactic ages for stars more massive than $\sim 10 M_\odot$.

The **main sequence turnoff** in a stellar cluster—the point where stars have just exhausted core hydrogen—gives the cluster age directly from the HR diagram.

## Red Giant Branch and Helium Flash

When central hydrogen is exhausted, the core contracts (Kelvin-Helmholtz) while a hydrogen-burning shell ignites. The envelope expands enormously (radius increases by factor $\sim 100$) and cools—the star becomes a **red giant**. The core mass grows as the shell burns outward.

For $M < 2 M_\odot$, the helium core becomes **electron-degenerate**: pressure is independent of temperature. When $M_\text{core} \approx 0.45 M_\odot$ and $T_c \approx 10^8\ \text{K}$, helium ignites in an unstable, runaway flash:

$${}^4\text{He} + {}^4\text{He} \leftrightarrow {}^8\text{Be} \quad \text{(equilibrium)}$$
$${}^8\text{Be} + {}^4\text{He} \to {}^{12}\text{C}^* \to {}^{12}\text{C} + 2\gamma \quad \text{(triple-alpha)}$$

In a degenerate gas, increased energy generation raises $T$ but not $P$, so the core cannot expand and cool—the burning is thermally unstable. This **helium flash** (lasting seconds to minutes) releases $\sim 10^{11} L_\odot$ momentarily but is entirely absorbed by the envelope. After the flash, the core becomes non-degenerate and settles on the **horizontal branch** (HB) burning helium quietly at $\sim 50 L_\odot$.

## Asymptotic Giant Branch, Planetary Nebulae, White Dwarfs

After core helium exhaustion, a **carbon-oxygen (CO) core** forms surrounded by a double-shell structure: helium burning just above the CO core, and hydrogen burning further out. The star ascends the **asymptotic giant branch (AGB)**:

- **Thermal pulses**: the helium shell burns unsteadily, flashing quasi-periodically every $10^3$–$10^5\ \text{yr}$
- **Third dredge-up**: convection mixes carbon to the surface during pulses (carbon stars)
- **Stellar winds**: mass loss rates $\dot{M} \sim 10^{-8}$–$10^{-4} M_\odot/\text{yr}$ strip the envelope

For $M < 8 M_\odot$, the envelope is ejected as a **planetary nebula** (ionized shell glowing in forbidden emission lines), leaving a **white dwarf** (CO core, $0.5$–$1.4 M_\odot$, $R \sim R_\oplus$). The **Chandrasekhar mass limit** for a degenerate electron-pressure supported object:

$$M_\text{Ch} = \frac{5.87}{\mu_e^2} M_\odot \approx 1.44 M_\odot$$

where $\mu_e$ is the mean molecular weight per electron. White dwarfs cool passively over billions of years; the oldest in the Milky Way have $T_\text{eff} \approx 3500\ \text{K}$.

## Massive Stars: Supernovae and Compact Remnants

Stars with $M > 8 M_\odot$ ignite carbon, neon, oxygen, and silicon burning successively in their cores, building an onion-shell structure:

| Burning stage | Fuel | $T$ ($10^9$ K) | Duration |
|---|---|---|---|
| H | H | 0.04 | $10^7$ yr |
| He | He | 0.2 | $10^6$ yr |
| C | C | 0.8 | $10^3$ yr |
| Ne | Ne | 1.5 | 1 yr |
| O | O | 2 | 6 months |
| Si | Si | 3.5 | 1 day |

Silicon burning produces an iron peak (Fe, Ni, Co) that cannot release energy by fusion. When the iron core reaches $M_\text{Ch} \approx 1.4 M_\odot$, it collapses in $\sim 0.25\ \text{s}$, reaching nuclear densities ($\rho \sim 3 \times 10^{14}\ \text{g cm}^{-3}$). Neutron degeneracy pressure halts the collapse (core bounce), launching a shock wave that—with neutrino energy deposition—expels the envelope in a **Type II core-collapse supernova** (energy $\sim 10^{53}\ \text{erg}$, with $\sim 99\%$ as neutrinos).

**Type Ia supernovae** (no hydrogen lines in spectrum) arise from thermonuclear detonation of a CO white dwarf approaching $M_\text{Ch}$ via accretion or merger—releasing $\sim 10^{51}\ \text{erg}$ as kinetic energy, synthesizing $\sim 0.6 M_\odot$ of ${}^{56}\text{Ni}$.

The remnant left behind depends on mass:
- $M_\text{initial} < 8 M_\odot$: white dwarf
- $8 < M_\text{initial} < 20\text{–}25 M_\odot$: neutron star ($R \approx 10\ \text{km}$, $M \approx 1.4\text{–}2.0 M_\odot$)
- $M_\text{initial} > 20\text{–}25 M_\odot$: black hole

**Neutron star cooling** is analogous to white dwarf cooling but faster, involving neutrino emission from the dense core (modified Urca process) during the first $\sim 10^5\ \text{yr}$, followed by photon cooling.
