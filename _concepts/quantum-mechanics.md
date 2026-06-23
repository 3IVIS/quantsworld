---
title: Quantum Mechanics
slug: quantum-mechanics
equation: 'i\hbar\frac{\partial}{\partial t}|\psi\rangle = H|\psi\rangle'
intro: >
  Quantum mechanics is the fundamental theory of physics at the atomic and subatomic scale.
  Its mathematical framework — Hilbert spaces, operators, and unitary evolution — underpins
  quantum computing, computational chemistry, and condensed matter physics.
related_concepts:
  - hilbert-spaces
  - linear-algebra
  - differential-equations
  - fourier-transform
difficulty: advanced
difficulty_level: 5
---

## The postulates

1. **State:** a quantum system is described by a state vector $|\psi\rangle$ in a complex Hilbert space $\mathcal{H}$.
2. **Evolution:** $i\hbar\partial_t|\psi\rangle = H|\psi\rangle$ (Schrödinger equation), where $H$ is the Hamiltonian.
3. **Measurement:** observable $A$ has outcomes equal to its eigenvalues $\{a_n\}$; probability of $a_n$ is $|\langle a_n|\psi\rangle|^2$.
4. **Born rule:** after measuring $a_n$, the state collapses to $|a_n\rangle$.

## Wave-particle duality and the uncertainty principle

Position and momentum are Fourier conjugate variables. The Heisenberg uncertainty principle:

$$\sigma_x \sigma_p \geq \frac{\hbar}{2}$$

is a mathematical consequence of the non-commutativity $[x, p] = i\hbar$.

## Spin and qubits

A spin-$\frac{1}{2}$ particle is the simplest quantum system: a two-level Hilbert space $\mathbb{C}^2$. A qubit state is $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ with $|\alpha|^2 + |\beta|^2 = 1$ — the foundation of quantum computing.
