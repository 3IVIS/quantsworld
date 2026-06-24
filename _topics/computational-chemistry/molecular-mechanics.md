---
title: "Molecular Mechanics"
field: computational-chemistry
description: Classical force field models that treat atoms as point masses connected by springs to simulate large biomolecular systems.
intro: >
  Molecular mechanics (MM) replaces quantum mechanical electrons with empirical potential energy functions parameterised to reproduce experimental or high-level quantum data. By avoiding explicit treatment of electrons, MM enables simulations of systems containing millions of atoms over nanosecond to microsecond timescales. Force fields such as AMBER, CHARMM, and OPLS are the backbone of computational biology and drug discovery.
math_concepts:
  - differential-equations
  - optimization
  - numerical-methods
  - linear-algebra
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The Force Field Energy Function

The total potential energy is a sum of bonded and non-bonded contributions:

$$E_{total} = \underbrace{\sum_{bonds}k_b(r-r_0)^2 + \sum_{angles}k_\theta(\theta-\theta_0)^2 + \sum_{torsions}V_n[1+\cos(n\phi-\gamma)]}_{bonded} + \underbrace{\sum_{i<j}\left[\frac{A_{ij}}{r_{ij}^{12}}-\frac{B_{ij}}{r_{ij}^6}+\frac{q_iq_j}{4\pi\varepsilon_0 r_{ij}}\right]}_{non\text{-}bonded}$$

The Lennard-Jones $r^{-12}$ repulsion models Pauli exclusion while the $r^{-6}$ term captures London dispersion. Partial charges $q_i$ generate the electrostatic interactions.

## Parameterisation

Force field parameters are derived from a combination of:
- High-level QM calculations (bond lengths, torsion profiles, ESP charges)
- Experimental thermodynamic data (heats of vaporisation, densities)
- Spectroscopic observables (IR frequencies)

| Force Field | Primary Application | Charge Scheme |
|-------------|-------------------|---------------|
| AMBER | Proteins, nucleic acids | RESP |
| CHARMM | Membrane proteins, lipids | CGenFF |
| OPLS-AA | Organic liquids, drug-like | CM5 |
| GROMOS | Carbohydrates | Partial equalisation |

## Strengths and Limitations

MM geometry optimisation minimises $E_{total}$ with gradient-based methods such as conjugate gradient or L-BFGS, converging in $O(10^3)$–$O(10^5)$ steps. The computational cost scales as $O(N\log N)$ with particle mesh Ewald for long-range electrostatics.

Key limitations include the inability to model bond breaking or formation, fixed charge models that ignore electronic polarisation, and transferability issues outside the parameterisation set. QM/MM hybrid methods address the first two by treating a reactive centre with DFT or semiempirical quantum mechanics while the environment is described by MM.
