---
title: "Coupled Cluster Theory"
field: computational-chemistry
description: The gold-standard wavefunction method based on an exponential cluster operator that systematically captures electron correlation.
intro: >
  Coupled cluster (CC) theory parameterises the exact wavefunction through an exponential ansatz acting on a reference determinant, allowing systematic and size-consistent recovery of electron correlation. CCSD(T) — coupled cluster with singles, doubles, and perturbative triples — is widely regarded as the gold standard of molecular quantum chemistry, achieving sub-kJ/mol accuracy for thermochemistry when combined with complete basis set extrapolation.
math_concepts:
  - quantum-mechanics
  - hilbert-spaces
  - linear-algebra
  - variational-calculus
difficulty: expert
difficulty_level: 5
read_time: 11
---

## The Exponential Ansatz

The CC wavefunction is written as

$$|\Psi_{CC}\rangle = e^{\hat{T}}|\Phi_0\rangle$$

where $|\Phi_0\rangle$ is the HF reference and the cluster operator $\hat{T} = \hat{T}_1 + \hat{T}_2 + \hat{T}_3 + \cdots$ generates excited determinants. $\hat{T}_n$ produces all $n$-fold excitations:

$$\hat{T}_2 = \tfrac{1}{4}\sum_{i,j,a,b}t_{ij}^{ab}\,\hat{a}^\dagger_a\hat{a}^\dagger_b\hat{a}_j\hat{a}_i$$

The exponential form ensures size consistency — the energy of two non-interacting subsystems scales correctly with system size.

## CCSD and the Amplitude Equations

Projecting the Schrödinger equation $e^{-\hat{T}}\hat{H}e^{\hat{T}}|\Phi_0\rangle = E_{CC}|\Phi_0\rangle$ onto singly and doubly excited determinants yields the amplitude equations:

$$\langle\Phi_i^a|e^{-\hat{T}}\hat{H}e^{\hat{T}}|\Phi_0\rangle = 0, \qquad \langle\Phi_{ij}^{ab}|e^{-\hat{T}}\hat{H}e^{\hat{T}}|\Phi_0\rangle = 0$$

The Baker-Campbell-Hausdorff expansion of the similarity-transformed Hamiltonian $\bar{H} = e^{-\hat{T}}\hat{H}e^{\hat{T}}$ terminates at fourth order for two-body interactions, giving a polynomial system for the amplitudes $t_i^a$ and $t_{ij}^{ab}$.

## CCSD(T): The Gold Standard

| Method | Scaling | Description |
|--------|---------|-------------|
| CCSD | $O(N^6)$ | Singles and doubles |
| CCSD(T) | $O(N^7)$ | Perturbative triples correction |
| CCSDT | $O(N^8)$ | Full iterative triples |

The perturbative triples correction $\Delta E_{(T)}$ accounts for most of the remaining correlation at modest cost, making CCSD(T) the practical standard. With cc-pVTZ or larger basis sets and complete basis set (CBS) extrapolation, CCSD(T) routinely achieves thermochemical accuracy of $\pm 1$ kJ/mol for main-group molecules.
