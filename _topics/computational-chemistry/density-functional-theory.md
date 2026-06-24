---
title: "Density Functional Theory"
field: computational-chemistry
description: A quantum mechanical method that replaces the many-body wavefunction with the electron density as the fundamental variable.
intro: >
  Density functional theory (DFT) reformulates the quantum many-body problem by proving that all ground-state properties of a system are determined solely by its electron density $n(\mathbf{r})$. The Hohenberg-Kohn theorems provide the theoretical foundation, while the Kohn-Sham scheme makes the approach computationally tractable by mapping the interacting system onto a set of non-interacting electrons in an effective potential. DFT is the workhorse of modern computational chemistry and materials science.
math_concepts:
  - quantum-mechanics
  - hilbert-spaces
  - variational-calculus
  - partial-differential-equations
difficulty: expert
difficulty_level: 5
read_time: 12
---

## Hohenberg-Kohn Theorems

The first Hohenberg-Kohn theorem states that the external potential $V_{ext}(\mathbf{r})$ is uniquely determined (up to a constant) by the ground-state electron density $n_0(\mathbf{r})$. The second theorem establishes a variational principle: for any trial density $\tilde{n}(\mathbf{r})$, the total energy functional satisfies

$$E[\tilde{n}] \geq E[n_0]$$

The universal Hohenberg-Kohn functional $F[n]$ contains the kinetic energy and electron-electron interaction and is independent of the external potential.

## Kohn-Sham Equations

The practical implementation replaces the interacting system with $N$ fictitious non-interacting electrons obeying single-particle Schrödinger equations:

$$\left[-\frac{\hbar^2}{2m}\nabla^2 + V_{eff}(\mathbf{r})\right]\psi_i(\mathbf{r}) = \varepsilon_i\,\psi_i(\mathbf{r})$$

The effective potential combines the external, Hartree, and exchange-correlation contributions:

$$V_{eff}(\mathbf{r}) = V_{ext}(\mathbf{r}) + \int \frac{n(\mathbf{r}')}{|\mathbf{r}-\mathbf{r}'|}d\mathbf{r}' + V_{xc}(\mathbf{r})$$

The electron density is reconstructed as $n(\mathbf{r}) = \sum_{i=1}^{N}|\psi_i(\mathbf{r})|^2$.

## Self-Consistent Field Cycle

Because $V_{eff}$ depends on $n(\mathbf{r})$ which in turn depends on the orbitals, the Kohn-Sham equations must be solved iteratively:

| Step | Operation |
|------|-----------|
| 1 | Guess initial $n(\mathbf{r})$ |
| 2 | Construct $V_{eff}[n]$ |
| 3 | Solve KS eigenvalue problem |
| 4 | Compute new $n(\mathbf{r})$ |
| 5 | Check convergence; if not, mix and repeat |

Convergence is declared when the energy or density change falls below a threshold, typically $10^{-6}$ hartree.

## Exchange-Correlation Approximations

The exact $V_{xc}$ is unknown. Common approximations include the local density approximation (LDA), which uses the uniform electron gas result $\varepsilon_{xc}^{LDA}[n]$, and the generalised gradient approximation (GGA) which adds dependence on $\nabla n$. Hybrid functionals such as B3LYP mix in a fraction of exact Hartree-Fock exchange, substantially improving thermochemistry at modest additional cost.
