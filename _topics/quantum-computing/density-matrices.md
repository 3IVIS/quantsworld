---
title: "Density Matrices"
field: quantum-computing
description: The mathematical framework for describing both pure and mixed quantum states, open systems, and quantum channels.
intro: >
  The density matrix (or density operator) $\rho$ is the most general description of a quantum state, extending pure-state wave functions to situations involving classical uncertainty, subsystems of entangled states, and open quantum systems interacting with an environment. It is the natural language for quantum information theory: entanglement entropy, quantum channels, decoherence, and quantum error correction are all most cleanly expressed in terms of density operators.
math_concepts:
  - linear-algebra
  - hilbert-spaces
  - information-theory
  - eigenvalues
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## Pure vs Mixed States

A **pure state** is a single, definite quantum state $|\psi\rangle \in \mathcal{H}$, described by the rank-1 projector:

$$\rho = |\psi\rangle\langle\psi|$$

A **mixed state** arises from classical uncertainty about which pure state the system is in. If the system is in state $|\psi_i\rangle$ with probability $p_i$ (a classical ensemble), the density matrix is:

$$\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|$$

where $p_i \geq 0$ and $\sum_i p_i = 1$. The ensemble is not unique: many different ensembles give the same $\rho$, and $\rho$ contains all physically observable information.

**Characterising properties** of valid density matrices:

| Property | Statement | Meaning |
|---|---|---|
| Hermitian | $\rho = \rho^\dagger$ | Observable (real eigenvalues) |
| Positive semidefinite | $\rho \geq 0$ | Probabilities are non-negative |
| Unit trace | $\text{tr}(\rho) = 1$ | Probabilities sum to 1 |
| Purity | $\text{tr}(\rho^2) \leq 1$ | Equality iff pure state |

**Example:** A qubit with equal classical probability of being $|0\rangle$ or $|1\rangle$ (maximally mixed):

$$\rho = \frac{1}{2}|0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1| = \frac{1}{2}\begin{pmatrix}1&0\\0&1\end{pmatrix} = \frac{I}{2}$$

Compare with the pure state $|+\rangle\langle +|$:

$$|+\rangle\langle +| = \frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix}$$

Both have $\text{tr}(\rho) = 1$, but $\text{tr}(\rho^2) = 1/2$ for the mixed state and $= 1$ for the pure state.

## Bloch Sphere Representation

Any single-qubit density matrix can be written uniquely as:

$$\rho = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma}) = \frac{1}{2}(I + r_x X + r_y Y + r_z Z)$$

where $\mathbf{r} = (r_x, r_y, r_z) \in \mathbb{R}^3$ is the **Bloch vector** with $|\mathbf{r}| \leq 1$.

The Bloch vector components are expectation values of the Pauli operators:

$$r_k = \text{tr}(\sigma_k \rho) = \langle\sigma_k\rangle, \quad k \in \{x, y, z\}$$

**Interpretation:**

- $|\mathbf{r}| = 1$: Pure state (surface of Bloch sphere). $\rho^2 = \rho$.
- $|\mathbf{r}| < 1$: Mixed state (interior of Bloch sphere). $\rho^2 \neq \rho$.
- $|\mathbf{r}| = 0$: Maximally mixed state $\rho = I/2$ (centre of sphere).

**Purity:** $\text{tr}(\rho^2) = \frac{1}{2}(1 + |\mathbf{r}|^2)$.

Under a unitary gate $U$, the density matrix transforms as $\rho \to U\rho U^\dagger$, which rotates the Bloch vector: $\mathbf{r} \to R_U\,\mathbf{r}$ where $R_U \in SO(3)$ is the corresponding rotation matrix.

## Partial Trace and Reduced Density Matrices

For a bipartite system $AB$ in state $\rho_{AB} \in \mathcal{H}_A \otimes \mathcal{H}_B$, the **partial trace** over subsystem $B$ gives the reduced density matrix of $A$:

$$\rho_A = \text{tr}_B(\rho_{AB}) = \sum_j \langle j|_B \,\rho_{AB}\, |j\rangle_B$$

where $\{|j\rangle_B\}$ is any orthonormal basis for $\mathcal{H}_B$. The result is independent of the chosen basis.

**Physical meaning:** $\rho_A$ correctly predicts the statistics of any measurement performed on subsystem $A$ alone:

$$\langle A \otimes I \rangle = \text{tr}_{AB}[(A \otimes I)\rho_{AB}] = \text{tr}_A[A\,\rho_A]$$

**Example — Bell state:** For $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$:

$$\rho_{AB} = |\Phi^+\rangle\langle\Phi^+| = \frac{1}{2}\begin{pmatrix}1&0&0&1\\0&0&0&0\\0&0&0&0\\1&0&0&1\end{pmatrix}$$

$$\rho_A = \text{tr}_B(\rho_{AB}) = \frac{1}{2}(\langle 0|_B\rho_{AB}|0\rangle_B + \langle 1|_B\rho_{AB}|1\rangle_B) = \frac{I}{2}$$

The reduced state of Alice is maximally mixed, reflecting complete entanglement — Alice's local state is maximally uncertain, yet the joint state is pure.

## Von Neumann Entropy

The **von Neumann entropy** generalises the Shannon entropy to quantum states:

$$S(\rho) = -\text{tr}(\rho \log_2 \rho) = -\sum_k \lambda_k \log_2 \lambda_k$$

where $\lambda_k$ are the eigenvalues of $\rho$ (with $0 \log 0 \equiv 0$).

**Properties:**

| Property | Statement |
|---|---|
| Non-negativity | $S(\rho) \geq 0$ |
| Pure states | $S(\rho) = 0$ iff $\rho$ is pure |
| Maximum | $S(\rho) \leq \log_2 d$ where $d = \dim\mathcal{H}$; achieved by $\rho = I/d$ |
| Unitary invariance | $S(U\rho U^\dagger) = S(\rho)$ |
| Concavity | $S(\sum_i p_i\rho_i) \geq \sum_i p_i S(\rho_i)$ |
| Subadditivity | $S(\rho_{AB}) \leq S(\rho_A) + S(\rho_B)$ |
| Strong subadditivity | $S(\rho_{ABC}) + S(\rho_B) \leq S(\rho_{AB}) + S(\rho_{BC})$ |

**Quantum mutual information:**

$$I(A:B) = S(\rho_A) + S(\rho_B) - S(\rho_{AB}) \geq 0$$

For a pure bipartite state, $S(\rho_A) = S(\rho_B)$ (Schmidt symmetry), and $I(A:B) = 2S(\rho_A)$ equals twice the entanglement entropy.

## Quantum Channels as CPTP Maps

Evolution of open quantum systems is described by **quantum channels** — completely positive, trace-preserving (CPTP) maps $\mathcal{E}: \mathcal{L}(\mathcal{H}_{\text{in}}) \to \mathcal{L}(\mathcal{H}_{\text{out}})$.

**Kraus representation:** Every CPTP map can be written as:

$$\mathcal{E}(\rho) = \sum_k K_k \rho K_k^\dagger, \quad \sum_k K_k^\dagger K_k = I$$

where the **Kraus operators** $K_k$ are not unique (related by unitary freedom). The minimum number of Kraus operators is the Kraus rank.

**Physical interpretation:** $K_k$ corresponds to the environment "jumping" to outcome $k$ (Kraus operators arise from tracing out the environment after a joint unitary $U_{SE}$).

Common channels and their Kraus operators:

| Channel | Kraus operators | Bloch effect |
|---|---|---|
| Unitary | $K_0 = U$ | Rotation |
| Depolarising ($p$) | $\sqrt{1-p}I, \sqrt{p/3}X, \sqrt{p/3}Y, \sqrt{p/3}Z$ | Shrinks $\mathbf{r} \to (1-4p/3)\mathbf{r}$ |
| Dephasing ($p$) | $\sqrt{1-p}I, \sqrt{p}Z$ | Shrinks $r_x, r_y \to (1-2p)r_x, (1-2p)r_y$ |
| Amplitude damping ($\gamma$) | $K_0, K_1$ as above | Pulls Bloch vector toward $\mathbf{r} = \hat{z}$ |

**Complete positivity** (vs merely positivity) is required because $\mathcal{E}$ must remain positive when applied to one part of an entangled state: $(\mathcal{E} \otimes I)(\rho_{AB}) \geq 0$. The **Choi-Jamiołkowski isomorphism** maps each channel to a positive semidefinite state (the Choi matrix), enabling efficient characterisation.

## Lindblad Master Equation

For **Markovian open systems** (short environment memory), the time evolution of $\rho$ obeys the **Lindblad master equation**:

$$\frac{d\rho}{dt} = -\frac{i}{\hbar}[H, \rho] + \sum_k \gamma_k\left(L_k \rho L_k^\dagger - \frac{1}{2}L_k^\dagger L_k \rho - \frac{1}{2}\rho L_k^\dagger L_k\right)$$

where $H$ is the system Hamiltonian, $L_k$ are **jump operators** (Lindblad operators) describing dissipation channels, and $\gamma_k \geq 0$ are decay rates.

**Interpretation of terms:**
- $-\frac{i}{\hbar}[H, \rho]$: Unitary evolution (Hamiltonian part).
- $L_k \rho L_k^\dagger$: Quantum jump — system jumps into a new state.
- $-\frac{1}{2}\{L_k^\dagger L_k, \rho\}$: Anti-commutator term ensures trace preservation.

**Example — single-qubit amplitude damping** ($T_1$ relaxation):

$$L_1 = \sqrt{\gamma}\, \sigma^- = \sqrt{\gamma}\begin{pmatrix}0&1\\0&0\end{pmatrix}$$

$$\frac{d\rho_{11}}{dt} = -\gamma\rho_{11}, \quad \frac{d\rho_{01}}{dt} = -\frac{\gamma}{2}\rho_{01}$$

Solution: $\rho_{11}(t) = \rho_{11}(0)e^{-\gamma t}$, $\rho_{01}(t) = \rho_{01}(0)e^{-\gamma t/2}$. The off-diagonal (coherence) decays at half the rate of the population — the $T_2 = 2T_1$ relation in the absence of pure dephasing.

Adding a pure dephasing channel $L_2 = \sqrt{\gamma_\phi}Z$:

$$\frac{d\rho_{01}}{dt} = -\left(\frac{\gamma}{2} + \gamma_\phi\right)\rho_{01} \equiv -\frac{1}{T_2}\rho_{01}$$

giving $\frac{1}{T_2} = \frac{1}{2T_1} + \frac{1}{T_\phi}$.
