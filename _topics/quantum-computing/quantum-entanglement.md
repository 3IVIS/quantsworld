---
title: "Quantum Entanglement"
field: quantum-computing
description: The non-classical correlations between quantum systems that cannot be explained by any local hidden-variable theory.
intro: >
  Quantum entanglement arises when the state of a composite system cannot be written as a product of states of its subsystems. It is the fundamental resource enabling quantum teleportation, superdense coding, and many quantum cryptographic protocols. Entanglement also provides the sharpest separation between quantum and classical information theory, quantified by the von Neumann entropy.
math_concepts:
  - linear-algebra
  - hilbert-spaces
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## Tensor Products and Multi-Qubit Hilbert Spaces

The state space of a composite quantum system is the **tensor product** of the individual Hilbert spaces. For two qubits:

$$\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B \cong \mathbb{C}^2 \otimes \mathbb{C}^2 \cong \mathbb{C}^4$$

The computational basis of the joint system is $\{|00\rangle, |01\rangle, |10\rangle, |11\rangle\}$, where $|ij\rangle \equiv |i\rangle_A \otimes |j\rangle_B$. A general two-qubit state is:

$$|\Psi\rangle = \alpha_{00}|00\rangle + \alpha_{01}|01\rangle + \alpha_{10}|10\rangle + \alpha_{11}|11\rangle, \quad \sum_{ij}|\alpha_{ij}|^2 = 1$$

This can be expressed as a $2\times 2$ matrix $M$ with $M_{ij} = \alpha_{ij}$.

**Separable states** factor as $|\psi\rangle_A \otimes |\phi\rangle_B$; equivalently, the matrix $M$ has rank 1. **Entangled states** have $\text{rank}(M) \geq 2$; no local description can reproduce their joint statistics.

For $n$ qubits, the Hilbert space has dimension $2^n$, which grows exponentially — the classical simulation of arbitrary $n$-qubit states requires $O(2^n)$ complex numbers, explaining both the power and difficulty of quantum computing.

## Bell States

The four **Bell states** (EPR pairs) form a maximally entangled orthonormal basis for $\mathbb{C}^2 \otimes \mathbb{C}^2$:

$$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$

$$|\Phi^-\rangle = \frac{1}{\sqrt{2}}(|00\rangle - |11\rangle)$$

$$|\Psi^+\rangle = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle)$$

$$|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|01\rangle - |10\rangle)$$

These are produced from product states by a Hadamard on the first qubit followed by a CNOT:

$$H \otimes I\; \longrightarrow\; \text{CNOT}\; \longrightarrow\; |\Phi^+\rangle$$

In $|\Phi^+\rangle$, measuring qubit $A$ in the $Z$ basis collapses the joint state: if $A$ is found in $|0\rangle$, $B$ is instantly in $|0\rangle$; if $A$ is $|1\rangle$, $B$ is $|1\rangle$. The correlation is perfect, yet neither qubit had a definite value before measurement — this non-classical correlation is the signature of entanglement.

## Schmidt Decomposition

Every pure bipartite state $|\Psi\rangle \in \mathcal{H}_A \otimes \mathcal{H}_B$ (with $\dim \mathcal{H}_A = m$, $\dim \mathcal{H}_B = n$, $m \leq n$) admits a **Schmidt decomposition**:

$$|\Psi\rangle = \sum_{k=1}^{r} \lambda_k\, |u_k\rangle_A \otimes |v_k\rangle_B$$

where $\lambda_k > 0$, $\sum_k \lambda_k^2 = 1$, $\{|u_k\rangle\}$ are orthonormal in $\mathcal{H}_A$, $\{|v_k\rangle\}$ are orthonormal in $\mathcal{H}_B$, and $r \leq m$ is the **Schmidt rank**.

**Derivation:** Write $|\Psi\rangle$ as the matrix $M$ with $M_{ij} = \alpha_{ij}$ and perform the singular value decomposition $M = U \Sigma V^\dagger$. The columns of $U$ give $|u_k\rangle$, the columns of $V$ give $|v_k\rangle$, and $\Sigma_{kk} = \lambda_k$.

Key facts:

- $|\Psi\rangle$ is separable $\iff$ $r = 1$ $\iff$ $M$ has rank 1.
- $|\Psi\rangle$ is maximally entangled $\iff$ all $\lambda_k = 1/\sqrt{m}$ (uniform Schmidt coefficients).
- The Schmidt coefficients are invariant under local unitaries $U_A \otimes U_B$.

## Entanglement Entropy

The **von Neumann entropy** of subsystem $A$ quantifies the entanglement in a pure bipartite state. The reduced density matrix of $A$ is:

$$\rho_A = \text{tr}_B\bigl(|\Psi\rangle\langle\Psi|\bigr) = \sum_k \lambda_k^2\, |u_k\rangle\langle u_k|$$

The entanglement entropy is:

$$S(\rho_A) = -\text{tr}(\rho_A \log_2 \rho_A) = -\sum_k \lambda_k^2 \log_2 \lambda_k^2$$

Properties:

| Property | Statement |
|---|---|
| Non-negativity | $S(\rho_A) \geq 0$ |
| Zero iff pure | $S(\rho_A) = 0 \iff |\Psi\rangle$ is separable |
| Maximum | $S(\rho_A) \leq \log_2 m$ (achieved for maximally entangled states) |
| Symmetry | $S(\rho_A) = S(\rho_B)$ for pure bipartite states |

For a Bell state: $\lambda_1 = \lambda_2 = 1/\sqrt{2}$, so $S = -2 \cdot \frac{1}{2}\log_2\frac{1}{2} = 1$ ebit — one unit of entanglement.

## Bell Inequalities and the EPR Paradox

Einstein, Podolsky, and Rosen (1935) argued that quantum mechanics is incomplete: because measuring $A$ instantly determines $B$'s outcome, there must be hidden local variables pre-determining both outcomes. Bell (1964) showed this is testable.

The **CHSH inequality** (Clauser-Horne-Shimony-Holt) considers two parties making binary measurements with settings $a, a'$ (Alice) and $b, b'$ (Bob), each yielding $\pm 1$:

$$\mathcal{S} = \bigl|\langle AB\rangle + \langle AB'\rangle + \langle A'B\rangle - \langle A'B'\rangle\bigr| \leq 2$$

Any local hidden-variable (LHV) theory must satisfy $\mathcal{S} \leq 2$. For the Bell state $|\Psi^-\rangle$ with optimal measurement settings ($a = 0$, $a' = \pi/2$, $b = \pi/4$, $b' = -\pi/4$):

$$\langle AB\rangle = -\cos(a - b) = -\cos\!\frac{\pi}{4} = -\frac{1}{\sqrt{2}}$$

$$\mathcal{S}_{\text{QM}} = 2\sqrt{2} \approx 2.828 > 2$$

This **Tsirelson bound** $2\sqrt{2}$ is the maximum quantum violation. Loophole-free experimental tests (Delft 2015, NIST 2015) have confirmed violations, ruling out all LHV theories.

## Quantum Teleportation

Teleportation transmits an unknown qubit state using one Bell pair and two classical bits.

**Setup:** Alice has an unknown qubit $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ and one qubit of the Bell pair $|\Phi^+\rangle_{AB}$.

**Protocol:**

1. The three-qubit state is $|\psi\rangle \otimes |\Phi^+\rangle_{AB}$.

2. Alice applies CNOT (her qubits) then $H$ on $|\psi\rangle$. The joint state becomes:

$$\frac{1}{2}\bigl(|00\rangle(\alpha|0\rangle+\beta|1\rangle) + |01\rangle(\alpha|1\rangle+\beta|0\rangle) + |10\rangle(\alpha|0\rangle-\beta|1\rangle) + |11\rangle(\alpha|1\rangle-\beta|0\rangle)\bigr)$$

3. Alice measures her two qubits, obtaining outcome $(m_1, m_2) \in \{00,01,10,11\}$ with equal probability $\tfrac{1}{4}$.

4. She sends the 2-bit result to Bob. Bob applies $X^{m_2}Z^{m_1}$ to his qubit, recovering $|\psi\rangle$.

No information travels faster than light: the 2 classical bits are required to complete the transfer. The unknown state $(\alpha, \beta)$ — an infinite amount of classical information — is transmitted using only 2 classical bits plus entanglement.

## Superdense Coding

The dual of teleportation: transmit 2 classical bits using 1 qubit, given prior shared entanglement.

Alice encodes two bits by applying one of $\{I, X, Z, iY\}$ to her half of $|\Phi^+\rangle$, transforming it to one of the four orthogonal Bell states:

| Message | Gate | Resulting Bell state |
|---|---|---|
| 00 | $I$ | $\|\Phi^+\rangle$ |
| 01 | $X$ | $\|\Psi^+\rangle$ |
| 10 | $Z$ | $\|\Phi^-\rangle$ |
| 11 | $iY$ | $\|\Psi^-\rangle$ |

She sends her single qubit to Bob. Bob applies CNOT then $H$ and measures in the computational basis, perfectly identifying the Bell state and thus the 2-bit message. One qubit transmission communicates 2 bits of classical information — double the classical capacity — by leveraging the prior entanglement.
