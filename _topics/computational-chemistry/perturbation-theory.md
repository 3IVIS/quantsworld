---
title: "Perturbation Theory in Quantum Chemistry"
field: computational-chemistry
description: Systematic expansion of energies and wavefunctions in powers of a small perturbation, including the Møller-Plesset treatment of electron correlation.
intro: >
  Rayleigh-Schrödinger perturbation theory expresses exact energies and wavefunctions as power series in a perturbation parameter $\lambda$. In quantum chemistry, Møller-Plesset (MP) theory partitions the full Hamiltonian into a Hartree-Fock reference and a correlation perturbation, yielding systematic corrections to the HF energy. The MP2 correction captures roughly 80–90% of the dynamic correlation energy at $O(N^5)$ computational cost.
math_concepts:
  - quantum-mechanics
  - hilbert-spaces
  - linear-algebra
  - eigenvalues
difficulty: expert
difficulty_level: 5
read_time: 10
---

## Rayleigh-Schrödinger Perturbation Theory

Partition the Hamiltonian as $\hat{H} = \hat{H}^{(0)} + \lambda\hat{H}'$ where $\hat{H}^{(0)}|n\rangle = E_n^{(0)}|n\rangle$ is exactly solvable. Expanding $E = E^{(0)} + \lambda E^{(1)} + \lambda^2 E^{(2)} + \cdots$ and matching powers of $\lambda$:

$$E^{(1)} = \langle 0|\hat{H}'|0\rangle$$

$$E^{(2)} = \sum_{n\neq 0}\frac{|\langle n|\hat{H}'|0\rangle|^2}{E_0^{(0)}-E_n^{(0)}}$$

The second-order correction is always negative (stabilising) for the ground state, since all energy denominators $E_0^{(0)}-E_n^{(0)} < 0$.

## Møller-Plesset Theory

In MP theory, $\hat{H}^{(0)} = \sum_i \hat{F}_i$ is the sum of Fock operators and $\hat{H}' = \hat{H}_{elec} - \hat{H}^{(0)}$ is the fluctuation potential. The MP2 energy correction, involving double excitations from occupied $\{i,j\}$ to virtual $\{a,b\}$ orbitals, is

$$E_{MP2} = \sum_{i<j}\sum_{a<b}\frac{|\langle ij||ab\rangle|^2}{\varepsilon_i+\varepsilon_j-\varepsilon_a-\varepsilon_b}$$

where $\langle ij||ab\rangle$ are antisymmetrised two-electron integrals.

## Convergence and Limitations

| Method | Scaling | Captures |
|--------|---------|---------|
| HF | $O(N^4)$ | Mean-field exchange |
| MP2 | $O(N^5)$ | ~80–90% of $E_{corr}$ |
| MP3 | $O(N^6)$ | Diminishing returns |
| MP4 | $O(N^7)$ | Near CCSD quality |

MP series can diverge for systems with small HOMO-LUMO gaps or significant multi-reference character, where the HF reference is a poor starting point. Spin-component-scaled MP2 (SCS-MP2) empirically corrects for the imbalanced treatment of same-spin and opposite-spin correlation.
