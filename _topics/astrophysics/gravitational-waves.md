---
title: "Gravitational Waves"
field: astrophysics
description: Ripples in spacetime curvature propagating at the speed of light, produced by accelerating asymmetric mass distributions.
intro: >
  Gravitational waves are transverse distortions of spacetime metric that travel at $c$, carrying energy and angular momentum away from dynamical gravitational systems. Predicted by Einstein in 1916 and directly detected by LIGO in 2015, they encode information about extreme astrophysical events—merging black holes, neutron stars, and possibly the early universe—that is completely inaccessible to electromagnetic astronomy. Detection relies on matched filtering of instrumental noise against theoretical waveform templates derived from numerical relativity.
math_concepts:
  - differential-equations
  - spectral-analysis
  - numerical-methods
difficulty: expert
difficulty_level: 5
read_time: 15
---

## Linearized Gravity and Wave Equation

Starting from the Einstein field equations with small perturbation $g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}$, $|h_{\mu\nu}| \ll 1$, expand to first order. Define the **trace-reversed perturbation**:

$$\bar{h}_{\mu\nu} = h_{\mu\nu} - \frac{1}{2}\eta_{\mu\nu}h, \quad h = \eta^{\mu\nu}h_{\mu\nu}$$

In the **Lorenz gauge** $\partial^\mu \bar{h}_{\mu\nu} = 0$, the linearized EFE become a wave equation:

$$\Box\, \bar{h}_{\mu\nu} = -\frac{16\pi G}{c^4} T_{\mu\nu}$$

with $\Box = \eta^{\mu\nu}\partial_\mu \partial_\nu = -c^{-2}\partial_t^2 + \nabla^2$. In vacuum ($T_{\mu\nu} = 0$), this becomes the massless wave equation with solutions propagating at $c$.

The **transverse-traceless (TT) gauge** further simplifies the physical description. Imposing $h^\mu_{\ \mu} = 0$ (traceless) and $h_{\mu 0} = 0$, $\partial^j h_{ij} = 0$ (transverse), for a wave propagating in the $z$-direction:

$$h_{ij}^\text{TT} = \begin{pmatrix} h_+ & h_\times & 0 \\ h_\times & -h_+ & 0 \\ 0 & 0 & 0 \end{pmatrix} e^{i(kz - \omega t)}$$

The two independent polarizations $h_+$ and $h_\times$ are the physical degrees of freedom. A ring of test masses is deformed into an ellipse that oscillates between stretched and compressed configurations in the $x$-$y$ plane, rotated $45°$ between polarizations.

## The Two Polarizations

**Plus polarization** $h_+$: separation between test masses changes as

$$\delta x(t) = \frac{1}{2} h_+(t)\, x_0, \quad \delta y(t) = -\frac{1}{2} h_+(t)\, y_0$$

**Cross polarization** $h_\times$: causes shearing

$$\delta x(t) = \frac{1}{2} h_\times(t)\, y_0, \quad \delta y(t) = \frac{1}{2} h_\times(t)\, x_0$$

The strain amplitude reaching Earth from a source at distance $r$ is extraordinarily small. For GW150914 (two ~$30 M_\odot$ black holes at $\sim 400\ \text{Mpc}$):

$$h \sim 10^{-21}$$

This corresponds to a displacement of $\sim 10^{-18}\ \text{m}$ over a 4 km LIGO arm—a thousandth the diameter of a proton.

## Quadrupole Formula and Radiated Power

The **quadrupole formula** gives the leading-order gravitational wave emission from a source with time-varying mass quadrupole moment $Q_{ij}$:

$$h_{ij}^\text{TT} = \frac{2G}{c^4 r}\ddot{Q}_{ij}^\text{TT}(t - r/c)$$

where the reduced quadrupole moment tensor is

$$Q_{ij} = \int \rho \left(x_i x_j - \frac{1}{3}\delta_{ij} r^2\right) d^3x$$

The total radiated power (luminosity) is the **Peters formula**:

$$P = \frac{G}{5c^5}\left\langle \dddot{Q}_{ij}\dddot{Q}^{ij}\right\rangle = \frac{32G^4 m_1^2 m_2^2(m_1+m_2)}{5c^5 a^5(1-e^2)^{7/2}}f(e)$$

for a Keplerian binary with semi-major axis $a$, eccentricity $e$, and

$$f(e) = 1 + \frac{73}{24}e^2 + \frac{37}{96}e^4$$

This result, accurate to leading post-Newtonian order, matched the Hulse-Taylor pulsar orbital decay to $0.2\%$.

## Binary Inspiral: Chirp Mass and Frequency Evolution

For a compact binary (black holes or neutron stars), energy loss to gravitational waves drives **inspiral**: the orbit shrinks while the frequency sweeps upward—a "chirp."

The **chirp mass** $\mathcal{M}$ governs the frequency evolution and is the most precisely measured parameter from a GW signal:

$$\mathcal{M} = \frac{(m_1 m_2)^{3/5}}{(m_1 + m_2)^{1/5}}$$

The orbital frequency evolution at leading order:

$$\dot{f} = \frac{96}{5} \pi^{8/3} \left(\frac{G\mathcal{M}}{c^3}\right)^{5/3} f^{11/3}$$

This gives the time-to-merger from GW frequency $f_\text{gw} = 2 f_\text{orb}$:

$$t_\text{merge} = \frac{5c^5}{256\pi^{8/3}} \left(\frac{G\mathcal{M}}{c^3}\right)^{-5/3} f_\text{gw}^{-8/3}$$

The GW frequency at merger (innermost stable circular orbit) is approximately

$$f_\text{ISCO} = \frac{c^3}{6^{3/2}\pi G M_\text{tot}} \approx \frac{4400\ \text{Hz}}{M_\text{tot}/M_\odot}$$

For a $60 M_\odot$ total mass system (like GW150914), $f_\text{ISCO} \approx 150\ \text{Hz}$.

| Event | Component masses ($M_\odot$) | $\mathcal{M}$ ($M_\odot$) | Distance (Mpc) | $f_\text{peak}$ (Hz) |
|---|---|---|---|---|
| GW150914 | $35.6 + 30.6$ | 28.3 | 440 | ~150 |
| GW170817 | $1.17 + 1.36$ | 1.19 | 40 | ~1000 |
| GW190521 | $95 + 69$ | 65 | 5300 | ~60 |

## LIGO Detector: Interferometry

LIGO is a **Michelson interferometer** with 4 km Fabry-Pérot arm cavities. A passing GW with strain $h_+$ differentially changes the arm lengths:

$$\Delta L_x = +\frac{1}{2}h_+ L, \quad \Delta L_y = -\frac{1}{2}h_+ L$$

producing a differential phase shift $\Delta\phi = 4\pi\Delta L/\lambda$. Optical power recycling and signal recycling cavities store $\sim 100\ \text{kW}$ in the arms, enhancing the effective path length by a factor $\mathcal{F} \approx 300$ (finesse).

The **noise power spectral density** $S_n(f)$ sets the sensitivity floor. Key noise sources:

| Frequency | Dominant noise |
|---|---|
| $< 10\ \text{Hz}$ | Seismic noise |
| $10\text{–}100\ \text{Hz}$ | Suspension thermal noise |
| $\sim 100\ \text{Hz}$ | Quantum radiation pressure |
| $> 100\ \text{Hz}$ | Shot noise ($\propto 1/\sqrt{P}$) |

The **shot noise** arises from photon counting statistics: $S_n^\text{shot}(f) = \hbar \lambda c / (2\pi P)$. Advanced LIGO uses squeezed light to reduce shot noise below the standard quantum limit.

## Matched Filtering and Detection Statistics

Gravitational wave detection is a signal-processing problem in colored noise. The **optimal matched filter** for a template waveform $h(t)$ embedded in noise $n(t)$ with PSD $S_n(f)$ is

$$\rho = \frac{4\,\text{Re}\int_0^\infty \frac{\tilde{d}(f)\tilde{h}^*(f)}{S_n(f)}\, df}{\sqrt{4\int_0^\infty \frac{|\tilde{h}(f)|^2}{S_n(f)} df}}$$

The **signal-to-noise ratio** (SNR) $\rho$ is compared against a threshold (typically $\rho > 8$ for individual detectors). The detection statistic follows a noncentral chi-squared distribution.

The **inner product** on waveform space:

$$\langle a \mid b \rangle = 4\,\text{Re}\int_0^\infty \frac{\tilde{a}(f)\tilde{b}^*(f)}{S_n(f)}\, df$$

defines an effective distance $D_\text{eff}$ that includes antenna pattern functions:

$$D_\text{eff} = D_L \left[F_+^2\left(\frac{1+\cos^2\iota}{2}\right)^2 + F_\times^2 \cos^2\iota\right]^{-1/2}$$

where $F_+, F_\times$ are the antenna patterns and $\iota$ is the inclination angle.

The template bank covers the chirp mass $\mathcal{M}$ and mass ratio $q = m_2/m_1 \in [1/18, 1]$, with bank spacing chosen so the worst-case **fitting factor** (match between signal and nearest template) exceeds $0.97$.

## Multimessenger Astronomy

GW170817 (two neutron stars merging) was detected simultaneously in gravitational waves by LIGO/Virgo and in gamma rays by Fermi-GBM $1.7\ \text{s}$ later, launching **multimessenger astronomy**. This single event:

- Confirmed short gamma-ray bursts originate from neutron star mergers
- Observed the kilonova (r-process nucleosynthesis) in optical/IR for 2 weeks
- Measured $H_0 = 70^{+12}_{-8}\ \text{km s}^{-1}\text{Mpc}^{-1}$ independently
- Constrained the neutron star equation of state via tidal deformability $\Lambda$

The **tidal deformability** parameter $\Lambda = \frac{2}{3}k_2 (c^2 R / G M)^5$ modifies the GW phasing at 5PN order and encodes neutron star interior physics. GW170817 constrained $\Lambda_{1.4} < 800$, ruling out the stiffest equations of state.

Future space-based detectors (LISA, $2037$) will observe millihertz GWs: supermassive black hole mergers ($10^6$–$10^9 M_\odot$), extreme mass-ratio inspirals (EMRIs), and the stochastic GW background from the early universe.
