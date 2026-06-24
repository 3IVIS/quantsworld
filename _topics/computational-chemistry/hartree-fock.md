---
title: "Hartree-Fock Theory"
field: computational-chemistry
description: The foundational mean-field method for solving the electronic Schrödinger equation using antisymmetrised orbital products.
intro: >
  Hartree-Fock (HF) theory approximates the $N$-electron wavefunction as a single Slater determinant of one-electron spin orbitals, ensuring antisymmetry under particle exchange. Each electron moves in the average field of all others, giving rise to a self-consistent set of integro-differential equations. HF defines the reference point for all post-HF correlated methods and provides the concept of correlation energy.
math_concepts:
  - quantum-mechanics
  - hilbert-spaces
  - linear-algebra
  - eigenvalues
difficulty: expert
difficulty_level: 5
read_time: 11
---

## The Slater Determinant

The HF wavefunction for $N$ electrons is an antisymmetrised product of spin orbitals $\{\chi_i\}$:

$$|\Psi_{HF}\rangle = \frac{1}{\sqrt{N!}}\begin{vmatrix}\chi_1(\mathbf{x}_1) & \cdots & \chi_N(\mathbf{x}_1)\\ \vdots & \ddots & \vdots\\ \chi_1(\mathbf{x}_N) & \cdots & \chi_N(\mathbf{x}_N)\end{vmatrix}$$

This form automatically satisfies the Pauli exclusion principle: swapping any two columns changes the sign of the determinant.

## The Fock Operator and HF Equations

The Fock operator for orbital $\chi_i$ is

$$\hat{F}\chi_i = \left[\hat{h} + \sum_{j}\left(\hat{J}_j - \hat{K}_j\right)\right]\chi_i = \varepsilon_i\chi_i$$

where $\hat{h}$ is the one-electron core Hamiltonian, $\hat{J}_j$ is the Coulomb operator (classical repulsion), and $\hat{K}_j$ is the exchange operator (purely quantum mechanical). The equations are nonlinear because $\hat{F}$ depends on the occupied orbitals.

## Self-Consistent Field Procedure

In the LCAO-MO expansion $\chi_i = \sum_\mu C_{\mu i}\phi_\mu$ over basis functions $\{\phi_\mu\}$, the HF equations become the Roothaan-Hall matrix equation:

$$\mathbf{FC} = \mathbf{SC\varepsilon}$$

where $F_{\mu\nu} = \langle\phi_\mu|\hat{F}|\phi_\nu\rangle$ and $S_{\mu\nu} = \langle\phi_\mu|\phi_\nu\rangle$. The SCF cycle iterates until the density matrix $\mathbf{P} = 2\mathbf{C}\mathbf{C}^\dagger$ converges.

## Correlation Energy

The HF energy $E_{HF}$ is bounded below by the exact non-relativistic energy $E_{exact}$. The correlation energy is defined as

$$E_{corr} = E_{exact} - E_{HF} < 0$$

Though typically only 0.1–1% of the total energy, $E_{corr}$ is chemically significant. Post-HF methods (MP2, CCSD, CASSCF) recover this missing correlation through explicit treatment of multi-determinant character.
