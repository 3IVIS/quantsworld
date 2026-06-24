---
title: "Path Integral Molecular Dynamics"
field: computational-chemistry
description: Feynman's imaginary-time path integral formulation extended to finite-temperature MD, capturing nuclear quantum effects such as tunnelling and zero-point energy.
intro: >
  Path integral molecular dynamics (PIMD) incorporates nuclear quantum effects into atomistic simulation by exploiting the isomorphism between the quantum partition function and a classical ring polymer. Each quantum particle is represented by a necklace of $P$ replicas (beads) connected by harmonic springs, and the ring polymer evolves under classical MD. This framework captures zero-point energy, quantum tunnelling, and isotope effects at finite temperature.
math_concepts:
  - quantum-mechanics
  - monte-carlo-methods
  - differential-equations
  - stochastic-calculus
difficulty: expert
difficulty_level: 5
read_time: 12
---

## The Feynman Path Integral

For a single particle in potential $V(x)$, the canonical partition function is expressed as a functional integral over all paths $x(\tau)$ in imaginary time $\tau \in [0, \hbar\beta]$:

$$Z = \oint \mathcal{D}x(\tau)\,\exp\!\left(-\frac{1}{\hbar}\int_0^{\hbar\beta}\left[\frac{m\dot{x}^2}{2}+V(x(\tau))\right]d\tau\right)$$

where $\beta = 1/k_BT$. Discretising imaginary time into $P$ slices of width $\varepsilon = \hbar\beta/P$ maps the quantum path integral onto a classical ring polymer with beads $\{x_1,\ldots,x_P\}$:

$$Z \approx \left(\frac{mP}{2\pi\hbar^2\beta}\right)^{P/2}\int\prod_{k=1}^P dx_k\,\exp\!\left(-\beta V_{RP}\right)$$

## Ring Polymer Effective Potential

The ring polymer potential couples neighbouring beads harmonically and applies the physical potential to each bead:

$$V_{RP} = \sum_{k=1}^{P}\left[\frac{m\omega_P^2}{2}(x_k-x_{k+1})^2 + \frac{1}{P}V(x_k)\right]$$

with $\omega_P = P/(\hbar\beta)$ the harmonic spring frequency and periodic boundary conditions $x_{P+1} = x_1$. In the $P\to\infty$ limit, the classical ring polymer exactly reproduces the quantum partition function.

## Ring Polymer MD and Tunnelling

RPMD evolves the ring polymer beads under classical equations of motion using fictitious momenta $p_k$, yielding real-time correlation functions and rate constants. The centroid $\bar{x} = P^{-1}\sum_k x_k$ corresponds to the physical particle position. Quantum tunnelling manifests through configurations where the ring polymer spans classically forbidden regions.

| Method | Nuclear Quantum Effects | Cost vs Classical MD |
|--------|------------------------|---------------------|
| Classical MD | None | $1\times$ |
| PIMD (static) | ZPE, tunnelling (equilibrium) | $P\times$ |
| RPMD | ZPE, tunnelling (dynamics) | $P\times$ |
| CMD | ZPE, approximate tunnelling | $P\times$ |

A typical production calculation uses $P = 32$–$64$ beads per atom, making PIMD roughly two orders of magnitude more expensive than classical MD but essential for hydrogen-containing systems at temperatures below 500 K.
