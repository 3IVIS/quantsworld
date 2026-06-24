---
title: "Born-Oppenheimer Approximation"
field: computational-chemistry
description: The foundational separation of nuclear and electronic motion that underlies nearly all of computational chemistry.
intro: >
  The Born-Oppenheimer (BO) approximation exploits the large mass ratio between nuclei and electrons ($m_N/m_e \sim 10^3$–$10^5$) to decouple their motions. Electrons are assumed to adjust instantaneously to any nuclear configuration, allowing a potential energy surface (PES) to be defined as a function of nuclear coordinates alone. The PES governs chemical reactions, molecular vibrations, and conformational changes.
math_concepts:
  - quantum-mechanics
  - differential-equations
  - variational-calculus
  - partial-differential-equations
difficulty: advanced
difficulty_level: 4
read_time: 9
---

## Separation of the Molecular Hamiltonian

The full molecular Hamiltonian is $\hat{H} = \hat{T}_N + \hat{T}_e + \hat{V}_{ee} + \hat{V}_{eN} + \hat{V}_{NN}$. The BO ansatz factorises the total wavefunction as

$$\Psi(\mathbf{r}, \mathbf{R}) = \psi_{el}(\mathbf{r};\mathbf{R})\,\chi_{nuc}(\mathbf{R})$$

where $\mathbf{r}$ denotes electronic and $\mathbf{R}$ nuclear coordinates. The electronic Schrödinger equation is solved for fixed nuclei:

$$\hat{H}_{el}\psi_{el}(\mathbf{r};\mathbf{R}) = E_{el}(\mathbf{R})\,\psi_{el}(\mathbf{r};\mathbf{R})$$

## Potential Energy Surface

The electronic energy $E_{el}(\mathbf{R})$ plus nuclear repulsion $V_{NN}(\mathbf{R})$ defines the PES:

$$U(\mathbf{R}) = E_{el}(\mathbf{R}) + V_{NN}(\mathbf{R})$$

Nuclei then move on this surface according to

$$\left[\hat{T}_N + U(\mathbf{R})\right]\chi_{nuc}(\mathbf{R}) = E_{tot}\,\chi_{nuc}(\mathbf{R})$$

Critical points on the PES — minima (stable structures), saddle points (transition states), and conical intersections — determine reaction pathways and rates.

## Adiabatic and Non-Adiabatic Effects

The BO approximation neglects the nuclear kinetic energy operator acting on $\psi_{el}$, specifically the non-adiabatic coupling terms

$$d_{IJ}(\mathbf{R}) = \langle\psi_I|\nabla_{\mathbf{R}}|\psi_J\rangle$$

These become large near conical intersections where two PES cross. At such points, the single-surface BO picture breaks down and non-adiabatic dynamics — such as photochemical processes and ultrafast spectroscopy — must treat multiple coupled surfaces simultaneously using methods like surface hopping or MCTDH.

## Validity and Limitations

| Regime | BO Valid? | Reason |
|--------|-----------|--------|
| Ground-state thermochemistry | Yes | Large energy gaps |
| Excited-state photochemistry | Often No | Near-degenerate surfaces |
| Proton transfer / tunnelling | Partial | Light nucleus mass |
| Heavy nuclei, low temperature | Yes | Classical nuclear motion |
