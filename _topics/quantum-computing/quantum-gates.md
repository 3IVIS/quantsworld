---
title: "Quantum Gates"
field: quantum-computing
description: The fundamental building blocks of quantum circuits, implementing unitary transformations on qubit states.
intro: >
  Quantum gates are reversible linear operations on qubits, analogous to classical logic gates but governed by the rules of quantum mechanics. Unlike classical gates, every quantum gate must be unitary, preserving the norm of quantum states and enabling interference. Understanding gates from single-qubit rotations to multi-qubit entangling operations is essential for designing any quantum algorithm.
math_concepts:
  - linear-algebra
  - group-theory
  - hilbert-spaces
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## Qubits and the Bloch Sphere

A qubit is the quantum analogue of a classical bit. Whereas a classical bit is either 0 or 1, a qubit exists in a superposition of both:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \quad \alpha, \beta \in \mathbb{C}, \quad |\alpha|^2 + |\beta|^2 = 1$$

The computational basis states $|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}$ and $|1\rangle = \begin{pmatrix}0\\1\end{pmatrix}$ span the Hilbert space $\mathcal{H} \cong \mathbb{C}^2$.

Modulo global phase, any pure single-qubit state can be written as:

$$|\psi\rangle = \cos\!\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\!\frac{\theta}{2}|1\rangle$$

where $\theta \in [0, \pi]$ and $\phi \in [0, 2\pi)$. This parameterisation places every single-qubit pure state on the surface of the **Bloch sphere**: $\hat{n} = (\sin\theta\cos\phi,\, \sin\theta\sin\phi,\, \cos\theta)$.

Key Bloch sphere points:

| State | $\theta$ | $\phi$ | Bloch vector |
|---|---|---|---|
| $\|0\rangle$ | 0 | — | $(0,0,1)$ |
| $\|1\rangle$ | $\pi$ | — | $(0,0,-1)$ |
| $\|{+}\rangle = \tfrac{1}{\sqrt2}(\|0\rangle+\|1\rangle)$ | $\pi/2$ | 0 | $(1,0,0)$ |
| $\|{-}\rangle = \tfrac{1}{\sqrt2}(\|0\rangle-\|1\rangle)$ | $\pi/2$ | $\pi$ | $(-1,0,0)$ |
| $\|{+i}\rangle = \tfrac{1}{\sqrt2}(\|0\rangle+i\|1\rangle)$ | $\pi/2$ | $\pi/2$ | $(0,1,0)$ |

A single-qubit gate is a rotation of this sphere: $U = e^{-i\hat{n}\cdot\vec{\sigma}\,\theta/2}$ for some axis $\hat{n}$ and angle $\theta$.

## Unitary Operators and the Pauli Matrices

The requirement that quantum evolution is norm-preserving forces every gate to be a **unitary operator**: $UU^\dagger = U^\dagger U = I$. The set of $2\times 2$ unitary matrices forms the Lie group $U(2)$; discarding the global phase gives $SU(2)$, which double-covers the rotation group $SO(3)$.

A basis for all $2\times 2$ Hermitian operators — and hence a generating set for $SU(2)$ — is given by the **Pauli matrices**:

$$X = \begin{pmatrix}0&1\\1&0\end{pmatrix}, \quad Y = \begin{pmatrix}0&-i\\i&0\end{pmatrix}, \quad Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}$$

These satisfy the algebra $[X, Y] = 2iZ$ (and cyclic permutations) and $X^2 = Y^2 = Z^2 = I$. As gates:

- $X$ (NOT gate): $X|0\rangle = |1\rangle$, $X|1\rangle = |0\rangle$. Bit-flip.
- $Y$: $Y|0\rangle = i|1\rangle$, $Y|1\rangle = -i|0\rangle$. Bit-and-phase flip.
- $Z$ (phase flip): $Z|0\rangle = |0\rangle$, $Z|1\rangle = -|1\rangle$.

General rotation operators:

$$R_x(\theta) = e^{-i\theta X/2} = \cos\!\frac{\theta}{2}\, I - i\sin\!\frac{\theta}{2}\, X$$

$$R_y(\theta) = e^{-i\theta Y/2} = \cos\!\frac{\theta}{2}\, I - i\sin\!\frac{\theta}{2}\, Y$$

$$R_z(\theta) = e^{-i\theta Z/2} = \begin{pmatrix}e^{-i\theta/2}&0\\0&e^{i\theta/2}\end{pmatrix}$$

## Hadamard, Phase, and T Gates

The **Hadamard gate** maps the computational basis to the Hadamard (Fourier) basis:

$$H = \frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$$

$$H|0\rangle = |{+}\rangle, \quad H|1\rangle = |{-}\rangle$$

$H$ is both Hermitian and unitary ($H = H^\dagger$, $H^2 = I$), making it its own inverse. Geometrically it is a $\pi$ rotation about the $(\hat{x}+\hat{z})/\sqrt{2}$ axis on the Bloch sphere.

The **phase gate** $S$ and **$T$ gate** introduce relative phases:

$$S = \begin{pmatrix}1&0\\0&i\end{pmatrix} = R_z\!\left(\frac{\pi}{2}\right), \qquad T = \begin{pmatrix}1&0\\0&e^{i\pi/4}\end{pmatrix} = R_z\!\left(\frac{\pi}{4}\right)$$

Note $S = T^2$ and $Z = S^2 = T^4$. The $T$ gate (also called the $\pi/8$ gate) is the gate most expensive to implement fault-tolerantly; its cost dominates resource estimates for practical algorithms.

Key identities connecting these gates:

$$HXH = Z, \quad HZH = X, \quad HYH = -Y$$
$$HTH = R_x\!\left(\frac{\pi}{4}\right) \cdot (\text{phase})$$

## CNOT and the Toffoli Gate

Multi-qubit gates entangle qubits and enable universal computation. The **controlled-NOT (CNOT)** gate flips the target qubit if and only if the control qubit is $|1\rangle$:

$$\text{CNOT} = \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}$$

in the basis $\{|00\rangle, |01\rangle, |10\rangle, |11\rangle\}$. Acting on a superposition:

$$\text{CNOT}\bigl(|{+}\rangle \otimes |0\rangle\bigr) = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$

This is a Bell state — a maximally entangled state — produced by $H$ on the control followed by CNOT.

The **Toffoli gate** (CCNOT) has two controls and one target; it flips the target iff both controls are $|1\rangle$:

$$\text{Toffoli}|c_1 c_2 t\rangle = |c_1 c_2\rangle \otimes |t \oplus (c_1 \wedge c_2)\rangle$$

The Toffoli gate is universal for reversible classical computation (it can simulate NAND), and combined with $H$ it becomes universal for quantum computation.

## Universality and the Solovay-Kitaev Theorem

A gate set is **universal** if any unitary $U \in U(2^n)$ can be approximated to within $\varepsilon$ using gates from that set. Two landmark results:

**Universality of $\{H, T, \text{CNOT}\}$:** Any $n$-qubit unitary can be decomposed into a sequence of single-qubit gates and CNOTs. Furthermore, adding the $T$ gate to $\{H, \text{CNOT}\}$ achieves density in $U(2^n)$; the set is universal over $\mathbb{C}$.

**Solovay-Kitaev theorem:** Let $\mathcal{G}$ be a universal gate set closed under inverses and dense in $SU(2)$. Then any $U \in SU(2)$ can be approximated to within $\varepsilon$ using

$$O\!\left(\log^c \frac{1}{\varepsilon}\right) \text{ gates}, \quad c \approx 2$$

In practice $c \approx 3.97$. This polynomial overhead in $\log(1/\varepsilon)$ guarantees that increasing precision is efficient. The constructive proof uses a divide-and-conquer group-commutator decomposition: at each level, $U \approx VWV^\dagger W^\dagger$ where $V, W$ are recursively approximated gates.

## Gate Fidelity and Circuit Noise

Physical gates are imperfect. The **fidelity** between an ideal gate $U$ and a realised channel $\mathcal{E}$ is:

$$F(U, \mathcal{E}) = \int \langle\psi|U^\dagger \mathcal{E}(|\psi\rangle\langle\psi|)U|\psi\rangle\, d\psi$$

where the integral is over the Haar measure on the qubit Hilbert space. For a depolarising channel with error rate $p$:

$$\mathcal{E}(\rho) = (1-p)\rho + \frac{p}{3}(X\rho X + Y\rho Y + Z\rho Z)$$

the average gate fidelity is $F = 1 - p$.

**Circuit depth** and **gate count** directly control accumulated noise. Typical near-term hardware targets:

| Metric | Superconducting | Trapped Ion |
|---|---|---|
| Single-qubit gate fidelity | $99.9\%$ | $99.99\%$ |
| Two-qubit gate fidelity | $99.5\%$ | $99.8\%$ |
| Gate time (single-qubit) | $\sim 20\,\text{ns}$ | $\sim 10\,\mu\text{s}$ |
| Coherence time $T_2$ | $\sim 100\,\mu\text{s}$ | $\sim 1\,\text{s}$ |

The ratio $T_2 / t_{\text{gate}}$ sets an upper bound on the number of gates executable before decoherence dominates, motivating both faster gates and improved coherence times.
