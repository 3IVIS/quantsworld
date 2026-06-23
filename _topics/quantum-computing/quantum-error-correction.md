---
title: "Quantum Error Correction"
field: quantum-computing
description: Techniques for protecting quantum information from decoherence and gate errors using redundant encoding and syndrome measurements.
intro: >
  Quantum error correction (QEC) enables reliable quantum computation despite noisy hardware by encoding one logical qubit into many physical qubits. The no-cloning theorem forbids the direct copying strategy of classical error correction, requiring a fundamentally different approach based on stabiliser codes and syndrome measurements that detect errors without measuring the encoded quantum information. The surface code, with its high threshold of roughly 1% physical error rate, is the leading candidate for fault-tolerant quantum computation.
math_concepts:
  - group-theory
  - information-theory
  - linear-algebra
difficulty: expert
difficulty_level: 5
read_time: 17
---

## Decoherence and Error Channels

Quantum states are fragile: interaction with the environment causes **decoherence**, collapsing superpositions and entanglement. The principal error channels are:

**Bit-flip channel:** Applies $X$ with probability $p$:

$$\mathcal{E}_{\text{bf}}(\rho) = (1-p)\rho + p\, X\rho X$$

**Phase-flip channel:** Applies $Z$ with probability $p$:

$$\mathcal{E}_{\text{pf}}(\rho) = (1-p)\rho + p\, Z\rho Z$$

**Depolarising channel:** Applies each Pauli with probability $p/3$:

$$\mathcal{E}_{\text{dep}}(\rho) = \left(1 - p\right)\rho + \frac{p}{3}(X\rho X + Y\rho Y + Z\rho Z)$$

**Amplitude damping:** Models energy relaxation (spontaneous emission) from $|1\rangle$ to $|0\rangle$ with rate $\gamma$:

$$K_0 = \begin{pmatrix}1&0\\0&\sqrt{1-\gamma}\end{pmatrix}, \quad K_1 = \begin{pmatrix}0&\sqrt{\gamma}\\0&0\end{pmatrix}$$

$$\mathcal{E}(\rho) = K_0\rho K_0^\dagger + K_1\rho K_1^\dagger$$

Any single-qubit error channel can be decomposed in the Pauli basis $\{I, X, Y, Z\}$, so correcting arbitrary Pauli errors suffices for correcting arbitrary single-qubit errors — a key linearity argument.

## The No-Cloning Theorem and QEC Strategy

**No-cloning theorem:** There is no unitary $U$ such that $U|\psi\rangle|0\rangle = |\psi\rangle|\psi\rangle$ for all states $|\psi\rangle$.

**Proof:** Suppose $U|\psi\rangle|0\rangle = |\psi\rangle|\psi\rangle$ and $U|\phi\rangle|0\rangle = |\phi\rangle|\phi\rangle$. Taking inner products and using unitarity:

$$\langle\psi|\phi\rangle = \langle\psi|\phi\rangle^2$$

This forces $\langle\psi|\phi\rangle \in \{0, 1\}$, so only orthogonal or identical states can be cloned. General superpositions cannot.

Despite this, QEC works by encoding information in **entangled states** (not copies) and performing **syndrome measurements** — projective measurements that identify which error occurred without measuring the encoded state.

**QEC conditions (Knill-Laflamme):** A code with code space $\mathcal{C}$ corrects error set $\{E_k\}$ if and only if:

$$\langle \bar{\psi}|E_k^\dagger E_l|\bar{\phi}\rangle = c_{kl}\,\delta_{\bar{\psi}\bar{\phi}}$$

for all code words $|\bar{\psi}\rangle, |\bar{\phi}\rangle$ and some Hermitian matrix $C = (c_{kl})$.

## The Three-Qubit and Shor Codes

**Three-qubit bit-flip code:** Encode $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ as:

$$|\bar{0}\rangle = |000\rangle, \quad |\bar{1}\rangle = |111\rangle$$

Syndrome measurements $Z_1Z_2$ and $Z_2Z_3$ identify which qubit flipped without measuring $\alpha, \beta$:

| Syndrome $(Z_1Z_2, Z_2Z_3)$ | Error |
|---|---|
| $(+1, +1)$ | None |
| $(-1, +1)$ | $X_1$ |
| $(-1, -1)$ | $X_2$ |
| $(+1, -1)$ | $X_3$ |

This corrects single bit-flips but is blind to phase errors.

**Shor code (9 physical qubits → 1 logical qubit):** Concatenates bit-flip and phase-flip codes:

$$|\bar{0}\rangle = \frac{(|000\rangle + |111\rangle)^{\otimes 3}}{2\sqrt{2}}, \quad |\bar{1}\rangle = \frac{(|000\rangle - |111\rangle)^{\otimes 3}}{2\sqrt{2}}$$

The outer code corrects phase errors between the three blocks; the inner codes correct bit-flips within each block. The Shor code corrects **any** single-qubit error using 8 additional qubits — the first demonstration that QEC is possible in principle.

**Distance:** A code with distance $d$ can detect $d-1$ errors and correct $\lfloor(d-1)/2\rfloor$ errors. The Shor code has $d = 3$, correcting any 1-qubit error.

## Stabiliser Formalism and CSS Codes

The **stabiliser formalism** provides a compact description of many important codes. A stabiliser group $\mathcal{S}$ is an Abelian subgroup of the $n$-qubit Pauli group $\mathcal{P}_n = \{\pm 1, \pm i\} \times \{I,X,Y,Z\}^{\otimes n}$ satisfying $-I \notin \mathcal{S}$.

The **code space** is the simultaneous $+1$ eigenspace of all stabilisers:

$$\mathcal{C}(\mathcal{S}) = \{|\psi\rangle : S|\psi\rangle = |\psi\rangle \;\forall\, S \in \mathcal{S}\}$$

For $n$ qubits and $n-k$ independent generators, the code encodes $k$ logical qubits. Syndrome measurement of generator $S_j$ yields $+1$ (no error of that type) or $-1$ (error anti-commuting with $S_j$), collapsing the system into an error subspace without disturbing the encoded state.

**CSS codes** (Calderbank-Shor-Steane) are constructed from two classical linear codes $C_1 \supseteq C_2$. For parity-check matrices $H_X$ and $H_Z$ with $H_X H_Z^T = 0$:

$$X\text{-stabilisers: } X^{H_X \text{ rows}}, \quad Z\text{-stabilisers: } Z^{H_Z \text{ rows}}$$

This separates bit and phase error correction, enabling transversal gates and more efficient decoding.

## Surface Code

The **surface code** (Kitaev toric code variant) is the leading practical QEC code. On an $L \times L$ grid of $2L^2 - 1$ qubits with data qubits on vertices and syndrome qubits interspersed:

**$X$-stabilisers (plaquettes):** $A_p = \prod_{i \in \text{plaquette } p} X_i$

**$Z$-stabilisers (vertices):** $B_v = \prod_{i \in \text{star of }v} Z_i$

The logical operators are $\bar{X} = X^{\otimes L}$ (horizontal path) and $\bar{Z} = Z^{\otimes L}$ (vertical path), each with weight $L$.

**Distance:** $d = L$ — errors must span the grid to cause a logical failure.

**Error threshold:** Under independent depolarising noise, the logical error rate satisfies:

$$p_L \approx A \left(\frac{p}{p_{\text{th}}}\right)^{\lfloor d/2 \rfloor + 1}$$

The surface code threshold is $p_{\text{th}} \approx 1\%$ (via Monte Carlo simulation), meaning if physical error rates are below $1\%$, adding more qubits exponentially suppresses logical errors.

**Overhead:** To achieve logical error rate $\varepsilon$ with physical error rate $p < p_{\text{th}}$:

$$d \approx \frac{\log(1/\varepsilon)}{\log(p_{\text{th}}/p)}, \quad n_{\text{physical}} \approx 2d^2$$

For $\varepsilon = 10^{-12}$ and $p = 10^{-3}$: $d \approx 20$, $n_{\text{physical}} \approx 800$ qubits per logical qubit.

## Fault-Tolerant Gates and Magic State Distillation

Not all gates are naturally fault-tolerant on the surface code. **Transversal gates** (applied independently to corresponding qubits of each code block) are automatically fault-tolerant but cannot form a universal gate set (Eastin-Knill theorem).

The surface code supports transversal Clifford gates $\{H, S, \text{CNOT}\}$, which generate the **Clifford group**. The Clifford group is not universal; adding the $T$ gate achieves universality.

**Magic state distillation** provides fault-tolerant $T$ gates:

1. Prepare many noisy copies of the magic state $|T\rangle = \frac{1}{\sqrt{2}}(|0\rangle + e^{i\pi/4}|1\rangle)$ using noisy physical $T$ gates.
2. Use stabiliser operations (fault-tolerant) to distill a few high-fidelity magic states from many noisy ones.
3. Apply a perfect $T$ gate via gate teleportation using the magic state.

**15-to-1 distillation:** 15 noisy $|T\rangle$ states with error rate $p$ produce 1 state with error rate $\sim 35p^3$:

| Input error $p$ | Output error | Distillation rounds |
|---|---|---|
| $10^{-3}$ | $\sim 3.5 \times 10^{-8}$ | 1 |
| $10^{-3}$ | $\sim 1.3 \times 10^{-22}$ | 2 (cascade) |

The overhead for a single logical $T$ gate is 15–1000 physical qubits per logical qubit, making $T$ gates the dominant resource cost in fault-tolerant quantum computation. Reducing magic state distillation overhead is an active research area.
