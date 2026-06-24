---
title: Statistical Mechanics
slug: statistical-mechanics
equation: 'Z = \sum_i e^{-E_i/k_BT}'
intro: >
  Statistical mechanics bridges microscopic particle dynamics and macroscopic thermodynamic
  observables by treating large systems probabilistically. The Boltzmann distribution gives
  the probability of a microstate as a function of its energy and temperature, while the
  partition function encodes all thermodynamic information of a system.
related_concepts:
  - probability-theory
  - information-theory
  - measure-theory
  - monte-carlo-methods
difficulty: advanced
difficulty_level: 3
---

## Boltzmann distribution and partition function

For a system in thermal equilibrium at temperature $T$, the probability of microstate $i$ with energy $E_i$ is:

$$P_i = \frac{e^{-E_i / k_B T}}{Z}$$

where the partition function $Z = \sum_i e^{-E_i / k_B T}$ acts as a normalizing constant and generating function for thermodynamic quantities. The free energy is $F = -k_B T \ln Z$.

## Entropy and the second law

Boltzmann's entropy formula connects microstates to macroscopic entropy:

$$S = -k_B \sum_i p_i \ln p_i$$

This is formally identical to Shannon entropy with $k_B$ setting physical units. The second law asserts that $S$ is non-decreasing for isolated systems, corresponding to the most probable macrostate dominating at large $N$.

## Applications

Statistical mechanics underpins condensed matter physics, chemical thermodynamics, and machine learning. The Ising model studies phase transitions; Boltzmann machines in deep learning borrow the same energy-based framework. Monte Carlo methods sample the Boltzmann distribution when exact summation over microstates is intractable.
