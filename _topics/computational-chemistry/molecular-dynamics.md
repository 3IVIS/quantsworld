---
title: "Molecular Dynamics"
field: computational-chemistry
description: Classical simulation of atomic motion by integrating Newton's equations with empirical force fields.
intro: >
  Molecular dynamics (MD) simulates the time evolution of a molecular system by numerically integrating Newton's equations of motion for each atom. Given a force field that encodes interatomic interactions, the trajectories yield thermodynamic averages, structural properties, and kinetic information through statistical mechanics. Modern MD can handle millions of atoms over microsecond timescales, bridging quantum chemistry and macroscopic observables.
math_concepts:
  - differential-equations
  - numerical-methods
  - markov-chains
  - dynamical-systems
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Equations of Motion and the Verlet Integrator

For $N$ atoms with positions $\mathbf{r}_i$ and masses $m_i$, Newton's second law gives

$$m_i\ddot{\mathbf{r}}_i = \mathbf{F}_i = -\nabla_i U(\{\mathbf{r}\})$$

The velocity Verlet algorithm advances the system with a timestep $\Delta t$:

$$\mathbf{r}(t+\Delta t) = 2\mathbf{r}(t) - \mathbf{r}(t-\Delta t) + \mathbf{a}(t)\,\Delta t^2$$
$$\mathbf{v}(t+\tfrac{1}{2}\Delta t) = \frac{\mathbf{r}(t+\Delta t)-\mathbf{r}(t-\Delta t)}{2\Delta t}$$

The method is time-reversible and symplectic, conserving the phase-space volume (Liouville's theorem), which is essential for correct statistical sampling.

## Statistical Ensembles

Different experimental conditions correspond to different statistical ensembles:

| Ensemble | Fixed quantities | Thermostat/Barostat |
|----------|-----------------|---------------------|
| NVE (microcanonical) | $N, V, E$ | None |
| NVT (canonical) | $N, V, T$ | Nosé-Hoover |
| NPT (isobaric-isothermal) | $N, P, T$ | Nosé-Hoover + Parrinello-Rahman |

The Nosé-Hoover thermostat extends the Hamiltonian with a fictitious degree of freedom $s$ and friction $\xi$, yielding equations of motion that correctly sample the canonical distribution at temperature $T$.

## Force Fields and Ergodicity

The potential energy $U$ is decomposed into bonded and non-bonded terms:

$$U = \sum_{bonds}k_b(r-r_0)^2 + \sum_{angles}k_\theta(\theta-\theta_0)^2 + \sum_{torsions}V_n\cos(n\phi-\gamma) + \sum_{i<j}\left[\frac{A_{ij}}{r^{12}}-\frac{B_{ij}}{r^6}+\frac{q_iq_j}{r}\right]$$

Ergodicity — the equivalence of time averages and ensemble averages — underpins the validity of MD observables: $\langle A \rangle_{time} = \langle A \rangle_{ensemble}$ in the limit of sufficient sampling.
