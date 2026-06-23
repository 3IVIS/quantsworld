---
title: "Variational Quantum Eigensolver"
field: quantum-computing
description: A hybrid quantum-classical algorithm for approximating ground-state energies of quantum systems using parameterised circuits.
intro: >
  The Variational Quantum Eigensolver (VQE) is a near-term quantum algorithm that exploits the quantum variational principle to find ground-state energies of Hamiltonians representing molecules or materials. A parameterised quantum circuit prepares a trial state, a quantum processor evaluates expectation values, and a classical optimiser updates the parameters. VQE is designed to function on noisy hardware and has applications to quantum chemistry, materials science, and combinatorial optimisation.
math_concepts:
  - optimization
  - linear-algebra
  - variational-calculus
difficulty: expert
difficulty_level: 5
read_time: 16
---

## The Variational Principle

The **quantum variational principle** states that for any Hermitian Hamiltonian $H$ with ground state $|E_0\rangle$ and ground-state energy $E_0$:

$$E_0 \leq \langle\psi(\boldsymbol{\theta})|H|\psi(\boldsymbol{\theta})\rangle \equiv E(\boldsymbol{\theta})$$

for any normalised trial state $|\psi(\boldsymbol{\theta})\rangle$ parameterised by $\boldsymbol{\theta} \in \mathbb{R}^m$. Equality holds iff $|\psi(\boldsymbol{\theta})\rangle$ is the ground state.

**Proof:** Expand $|\psi(\boldsymbol{\theta})\rangle = \sum_k c_k|E_k\rangle$ in the eigenbasis of $H$ (with $H|E_k\rangle = E_k|E_k\rangle$ and $E_0 \leq E_1 \leq \ldots$):

$$\langle\psi|H|\psi\rangle = \sum_k |c_k|^2 E_k \geq E_0 \sum_k |c_k|^2 = E_0$$

The VQE objective is therefore:

$$E^* = \min_{\boldsymbol{\theta}} E(\boldsymbol{\theta}) = \min_{\boldsymbol{\theta}} \langle\psi(\boldsymbol{\theta})|H|\psi(\boldsymbol{\theta})\rangle$$

The quality of the approximation depends entirely on whether the true ground state lies in the manifold $\{|\psi(\boldsymbol{\theta})\rangle : \boldsymbol{\theta} \in \mathbb{R}^m\}$ — the expressibility of the ansatz.

## Ansatz Circuits

The **ansatz** $|\psi(\boldsymbol{\theta})\rangle = U(\boldsymbol{\theta})|0\rangle^{\otimes n}$ must balance expressibility and trainability.

### Hardware-Efficient Ansatz

Designed to match the native connectivity of the quantum device, minimising SWAP gates:

$$U(\boldsymbol{\theta}) = \prod_{l=1}^{L} \left[\prod_{\langle i,j\rangle} \text{CNOT}_{ij} \cdot \prod_{i} R_y(\theta_{i,l}) R_z(\phi_{i,l})\right]$$

Each layer $l$ applies single-qubit rotations followed by entangling gates on connected qubit pairs. With $L$ layers and $n$ qubits, this has $O(Ln)$ parameters. Hardware-efficient ansatze are easy to implement but may not capture chemically relevant correlations.

### UCCSD Ansatz

The **Unitary Coupled Cluster Singles and Doubles (UCCSD)** ansatz is motivated by quantum chemistry. The UCCSD unitary is:

$$U_{\text{UCCSD}}(\boldsymbol{\theta}) = e^{T(\boldsymbol{\theta}) - T^\dagger(\boldsymbol{\theta})}$$

where the cluster operator is:

$$T(\boldsymbol{\theta}) = \sum_{ia} \theta_i^a \hat{a}_a^\dagger \hat{a}_i + \sum_{ijab} \theta_{ij}^{ab} \hat{a}_a^\dagger \hat{a}_b^\dagger \hat{a}_j \hat{a}_i$$

with $i,j$ indexing occupied orbitals and $a,b$ indexing virtual orbitals. After Jordan-Wigner or Bravyi-Kitaev mapping to Pauli operators, the exponentiated cluster operator becomes a product of Pauli exponentials:

$$e^{\theta(\hat{a}_a^\dagger\hat{a}_i - \hat{a}_i^\dagger\hat{a}_a)} \longrightarrow e^{i\theta/2 \cdot P_1 \otimes P_2 \otimes \cdots \otimes P_n}$$

where $P_k \in \{I, X, Y, Z\}$. Each such term requires $O(n)$ CNOT gates. For a molecule with $N$ spin orbitals, UCCSD has $O(N^4)$ parameters, which becomes costly for large systems.

## Parameter-Shift Rule for Gradients

To optimise $E(\boldsymbol{\theta})$, we need gradients $\partial E/\partial\theta_k$. Numerical finite differences suffer from shot noise amplification. Instead, use the **parameter-shift rule**.

For any gate of the form $G(\theta) = e^{-i\theta P/2}$ where $P$ is a Pauli operator ($P^2 = I$), the gate has only two eigenvalues $\pm 1$. Then:

$$\frac{\partial}{\partial\theta_k}\langle\psi(\boldsymbol{\theta})|H|\psi(\boldsymbol{\theta})\rangle = \frac{1}{2}\left[E\!\left(\boldsymbol{\theta} + \frac{\pi}{2}\hat{e}_k\right) - E\!\left(\boldsymbol{\theta} - \frac{\pi}{2}\hat{e}_k\right)\right]$$

**Proof:** $G(\theta) = \cos(\theta/2)I - i\sin(\theta/2)P$, so:

$$\frac{\partial G}{\partial\theta} = -\frac{i}{2}PG = \frac{1}{2}\left[G\!\left(\theta+\frac{\pi}{2}\right) - G\!\left(\theta-\frac{\pi}{2}\right)\right] \cdot (-i)$$

The gradient is therefore estimated using exactly two circuit evaluations per parameter — a hardware-compatible method requiring no additional ancilla qubits.

**Higher-order derivatives:** The Hessian $\partial^2 E/\partial\theta_j\partial\theta_k$ requires four shifted evaluations:

$$\frac{\partial^2 E}{\partial\theta_j\partial\theta_k} = \frac{1}{4}\left[E(s_j^+,s_k^+) - E(s_j^+,s_k^-) - E(s_j^-,s_k^+) + E(s_j^-,s_k^-)\right]$$

where $s_j^\pm = \boldsymbol{\theta} \pm \frac{\pi}{2}\hat{e}_j$.

## Classical Optimisers and the Hybrid Loop

The quantum-classical hybrid loop:

1. **Prepare:** Execute circuit $U(\boldsymbol{\theta})$ on quantum processor.
2. **Measure:** Estimate $E(\boldsymbol{\theta}) = \langle H \rangle$ by decomposing $H = \sum_k c_k P_k$ into Pauli terms and measuring each.
3. **Optimise:** Classical optimiser proposes new $\boldsymbol{\theta}'$.
4. **Repeat** until convergence.

**SPSA (Simultaneous Perturbation Stochastic Approximation)** is noise-robust and requires only 2 circuit evaluations per gradient step regardless of parameter count:

$$\hat{g}_k(\boldsymbol{\theta}) = \frac{E(\boldsymbol{\theta} + c_k\boldsymbol{\Delta}_k) - E(\boldsymbol{\theta} - c_k\boldsymbol{\Delta}_k)}{2c_k}\boldsymbol{\Delta}_k^{-1}$$

where $\boldsymbol{\Delta}_k$ is a random $\pm 1$ vector and $c_k \to 0$.

Optimiser comparison for VQE:

| Optimiser | Gradient calls/step | Noise robustness | Convergence |
|---|---|---|---|
| Gradient descent | $O(m)$ (param-shift) | Low | Linear |
| L-BFGS-B | $O(m)$ + Hessian approx | Low | Superlinear |
| SPSA | $2$ (stochastic) | High | Sublinear |
| Adam | $O(m)$ | Medium | Linear |
| NFT (Nakanishi-Fujii-Todo) | $O(m)$ | Medium | Exact for linear models |

## The Barren Plateau Problem

A major challenge for VQE is the **barren plateau** phenomenon: for deep random circuits on $n$ qubits, gradients vanish exponentially:

$$\text{Var}\!\left[\frac{\partial E}{\partial\theta_k}\right] \leq F(n) \cdot e^{-\gamma n}$$

for some $\gamma > 0$ depending on circuit depth and connectivity. This means:

- Gradient magnitudes are $O(2^{-n/2})$, requiring exponentially many shots to estimate reliably.
- The energy landscape becomes exponentially flat — a barren plateau.

**Causes:**
- **Global cost functions:** $H = \sum_i Z_i$ (sum over all qubits) cause barren plateaus.
- **Expressible (2-design) circuits:** Random circuits that form approximate 2-designs exhibit barren plateaus after $O(\log n)$ layers.
- **Noise:** Even local noise induces barren plateaus for deep circuits.

**Mitigations:** Use local cost functions ($H = \sum_i h_i$ with $h_i$ acting on $O(1)$ qubits), initialise near a known good solution, use layer-by-layer training, or restrict to shallow circuits.

## Applications to Molecular Quantum Chemistry

For a molecule with $N_e$ electrons in $M$ spin orbitals, the electronic Hamiltonian in second quantisation is:

$$H = \sum_{pq} h_{pq}\hat{a}_p^\dagger\hat{a}_q + \frac{1}{2}\sum_{pqrs} g_{pqrs}\hat{a}_p^\dagger\hat{a}_q^\dagger\hat{a}_r\hat{a}_s$$

where $h_{pq} = \langle p|T + V_{\text{nuc}}|q\rangle$ are one-electron integrals and $g_{pqrs} = \langle pq|r^{-1}_{12}|rs\rangle$ are two-electron integrals.

After Jordan-Wigner mapping ($\hat{a}_j \to \frac{1}{2}(X_j - iY_j)\prod_{k<j}Z_k$), the Hamiltonian becomes a sum of $O(N^4)$ Pauli strings, each measurable on the quantum computer.

**H$_2$ molecule example** (STO-3G basis, $N = 4$ spin orbitals, $N_e = 2$ electrons):

$$H = c_0 I + c_1 Z_0 + c_2 Z_1 + c_3 Z_2 + c_4 Z_3 + c_5 Z_0 Z_1 + \ldots + c_{15} X_0 X_1 Y_2 Y_3$$

VQE with UCCSD (1 parameter for H$_2$) achieves chemical accuracy ($< 1.6 \times 10^{-3}$ Hartree) in 5–10 iterations.

## Connection to QAOA

The **Quantum Approximate Optimization Algorithm (QAOA)** is a special case of VQE for combinatorial optimisation. For a problem Hamiltonian $H_C = \sum_{\alpha} C_\alpha Z_{i_\alpha}Z_{j_\alpha}$ and mixer $H_B = \sum_i X_i$:

$$|\boldsymbol{\gamma}, \boldsymbol{\beta}\rangle = \prod_{l=1}^p e^{-i\beta_l H_B} e^{-i\gamma_l H_C}|s\rangle$$

where $|s\rangle = |+\rangle^{\otimes n}$. QAOA has $2p$ parameters and approximation ratio converging to the true optimum as $p \to \infty$.

The QAOA circuit is structured (unlike arbitrary hardware-efficient ansatze) and avoids some barren plateau issues, but the landscape still has local minima and the parameter-shift rule applies identically.
