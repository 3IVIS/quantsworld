---
title: "Monte Carlo Methods in Chemistry"
field: computational-chemistry
description: Stochastic sampling techniques for computing thermodynamic averages and solving high-dimensional quantum problems.
intro: >
  Monte Carlo (MC) methods replace deterministic integration with random sampling, making them especially powerful in the high-dimensional configuration spaces encountered in chemistry. The Metropolis algorithm generates a Markov chain whose stationary distribution matches the Boltzmann ensemble, enabling the computation of thermodynamic averages without exhaustive enumeration. Quantum Monte Carlo extends these ideas to solve the Schrödinger equation stochastically.
math_concepts:
  - monte-carlo-methods
  - markov-chains
  - probability-theory
  - measure-theory
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## The Metropolis Algorithm

For a system with potential energy $U(\mathbf{r})$, equilibrium averages are weighted by the Boltzmann distribution $\pi(\mathbf{r}) \propto e^{-U(\mathbf{r})/k_BT}$. The Metropolis algorithm constructs a Markov chain that samples $\pi$ by accepting trial moves with probability

$$P_{acc}(\mathbf{r}\to\mathbf{r}') = \min\!\left(1,\, e^{-\Delta U/k_BT}\right)$$

where $\Delta U = U(\mathbf{r}') - U(\mathbf{r})$. The detailed balance condition $\pi(\mathbf{r})P(\mathbf{r}\to\mathbf{r}') = \pi(\mathbf{r}')P(\mathbf{r}'\to\mathbf{r})$ guarantees convergence to the correct equilibrium distribution.

## Importance Sampling and Variance Reduction

A raw Monte Carlo estimate of $\langle A\rangle = \int A(\mathbf{r})\pi(\mathbf{r})d\mathbf{r}$ from $M$ samples has error $\sigma_A/\sqrt{M}$. Importance sampling rewrites the integral as

$$\langle A\rangle = \int A(\mathbf{r})\frac{\pi(\mathbf{r})}{q(\mathbf{r})}q(\mathbf{r})\,d\mathbf{r}$$

with a proposal density $q$ chosen to be large where the integrand is large, dramatically reducing variance in high dimensions where most of the Boltzmann weight lives in a narrow region.

## Quantum Monte Carlo

Variational Monte Carlo (VMC) minimises the energy expectation value of a trial wavefunction $\Psi_T$ parameterised by Jastrow factors and determinants:

$$E_{VMC} = \frac{\langle\Psi_T|\hat{H}|\Psi_T\rangle}{\langle\Psi_T|\Psi_T\rangle} = \int E_L(\mathbf{r})\,|\Psi_T(\mathbf{r})|^2\,d\mathbf{r}$$

where $E_L = \hat{H}\Psi_T/\Psi_T$ is the local energy. Diffusion Monte Carlo (DMC) then projects out the ground state by interpreting the imaginary-time Schrödinger equation as a diffusion-branching process, achieving near-exact energies for systems of hundreds of electrons.
