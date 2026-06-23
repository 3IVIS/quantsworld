---
title: "Quantum Phase Estimation"
field: quantum-computing
description: A core quantum subroutine that extracts eigenphases of unitary operators, underpinning Shor's algorithm and quantum chemistry simulations.
intro: >
  Quantum phase estimation (QPE) solves the problem of finding the eigenphase $\phi$ of a unitary operator $U$ given access to a corresponding eigenstate $|\psi\rangle$, such that $U|\psi\rangle = e^{2\pi i\phi}|\psi\rangle$. With $n$ ancilla qubits, QPE estimates $\phi$ to $n$ bits of precision using $O(2^n)$ applications of controlled-$U$. It is the central subroutine in Shor's algorithm, the variational quantum eigensolver, and quantum simulation of physical systems.
math_concepts:
  - fourier-transform
  - linear-algebra
  - eigenvalues
  - quantum-mechanics
difficulty: expert
difficulty_level: 5
read_time: 15
---

## Problem Setup

Let $U$ be an $n$-qubit unitary operator with eigendecomposition:

$$U|\psi_k\rangle = e^{2\pi i\phi_k}|\psi_k\rangle, \quad \phi_k \in [0, 1), \quad k = 0, 1, \ldots, 2^n-1$$

**Goal:** Given access to controlled-$U$ (a $(n+1)$-qubit gate that applies $U$ conditioned on an ancilla qubit) and an eigenstate $|\psi\rangle$ with eigenphase $\phi$, estimate $\phi$ to $m$ bits of precision.

The eigenphase encodes physically meaningful quantities:
- **Energy eigenvalues:** $U = e^{-iHt/\hbar}$ gives $\phi = E_k t / (2\pi\hbar)$.
- **Order finding (Shor):** $U_a|x\rangle = |ax \bmod N\rangle$ has eigenphases $s/r$ where $r$ is the order of $a$.
- **Singular values:** For matrix $A$, the eigenphases of $e^{i\arcsin(A)}$ give singular values of $A$.

**Setup: controlled-$U^{2^j}$:** The $j$-th ancilla qubit controls $U^{2^j}$ (applying $U$ a total of $2^j$ times). This costs $2^j$ applications of the basic controlled-$U$ oracle.

## The QPE Circuit

The QPE algorithm uses $m$ ancilla qubits and the $n$-qubit eigenstate register:

**Step 1 — Superposition:** Apply $H^{\otimes m}$ to the ancilla register:

$$|0\rangle^{\otimes m}|\psi\rangle \xrightarrow{H^{\otimes m}\otimes I} \frac{1}{\sqrt{2^m}}\sum_{j=0}^{2^m-1}|j\rangle|\psi\rangle$$

**Step 2 — Controlled unitaries:** Apply controlled-$U^{2^{m-1-j}}$ with the $j$-th ancilla qubit as control (for $j = 0, \ldots, m-1$). Since $U|\psi\rangle = e^{2\pi i\phi}|\psi\rangle$, we get $U^{2^k}|\psi\rangle = e^{2\pi i\cdot 2^k\phi}|\psi\rangle$:

$$\frac{1}{\sqrt{2^m}}\sum_{j=0}^{2^m-1}|j\rangle|\psi\rangle \xrightarrow{\text{ctrl-}U} \frac{1}{\sqrt{2^m}}\sum_{j=0}^{2^m-1}e^{2\pi i\phi j}|j\rangle|\psi\rangle$$

**Step 3 — Inverse QFT:** Apply $\text{QFT}^{-1}$ to the ancilla register. The state $\frac{1}{\sqrt{2^m}}\sum_{j=0}^{2^m-1}e^{2\pi i\phi j}|j\rangle$ is precisely the QFT of $|{\tilde{\phi}}\rangle$ where $\tilde{\phi} = 2^m\phi$:

$$\text{QFT}^{-1}\left[\frac{1}{\sqrt{2^m}}\sum_{j=0}^{2^m-1}e^{2\pi i\phi j}|j\rangle\right] = |\tilde{\phi}\rangle \quad \text{when } 2^m\phi \in \mathbb{Z}$$

**Step 4 — Measurement:** Measure the ancilla in the computational basis to obtain $\tilde{\phi}$, giving $\phi = \tilde{\phi}/2^m$.

Total controlled-$U$ calls: $1 + 2 + 4 + \ldots + 2^{m-1} = 2^m - 1 = O(2^m)$.

## Precision and Error Analysis

When $\phi$ is exactly representable in $m$ bits ($2^m\phi \in \mathbb{Z}$), QPE succeeds with probability 1. For general $\phi$, let $b = \lfloor 2^m\phi \rceil$ be the nearest $m$-bit integer. Writing $\delta = 2^m\phi - b \in [-1/2, 1/2)$:

The probability of measuring outcome $b + k$ (for integer $k$) is:

$$P(b+k) = \frac{1}{4^m}\left|\frac{\sin(2^m\pi(\phi - (b+k)/2^m))}{\sin(\pi(\phi - (b+k)/2^m))}\right|^2 = \frac{\sin^2(\pi(\delta - k))}{4^m\sin^2(\pi(\delta-k)/2^m)}$$

Using $\sin(\pi\delta/2^m) \approx \pi\delta/2^m$ for $|\delta| \leq 1/2$:

$$P(b) = \left(\frac{\sin(\pi\delta)}{2^m\sin(\pi\delta/2^m)}\right)^2 \geq \frac{4}{\pi^2} \approx 0.405$$

The probability of measuring within $k$ of the correct answer falls geometrically:

$$P(|\text{error}| \geq k) \leq \frac{1}{2(k-1)}$$

**Achieving $n$ bits of precision with probability $\geq 1 - \varepsilon$:** Use $m = n + \lceil\log_2(2 + 1/(2\varepsilon))\rceil$ ancilla qubits. For $\varepsilon = 0.01$: $m \approx n + 7$ ancillas.

**Resource summary:**

| Precision (bits) | Ancilla qubits | Controlled-$U$ calls |
|---|---|---|
| $n$ (prob $\geq 0.5$) | $n$ | $2^n - 1$ |
| $n$ (prob $\geq 1-\varepsilon$) | $n + \lceil\log(1/\varepsilon)\rceil$ | $\sim 2^{n+\log(1/\varepsilon)}$ |

## Applications to Shor's Algorithm

In Shor's algorithm, $U_a|x\rangle = |ax \bmod N\rangle$ and the target eigenstates are:

$$|u_s\rangle = \frac{1}{\sqrt{r}}\sum_{k=0}^{r-1}e^{-2\pi isk/r}|a^k \bmod N\rangle, \quad \phi_s = \frac{s}{r}$$

QPE on $|1\rangle = \frac{1}{\sqrt{r}}\sum_s |u_s\rangle$ yields a random $s/r$ in $m$ bits. The **continued fraction algorithm** then extracts $r$:

Given $\tilde{s}/2^m \approx s/r$, the convergents of the continued fraction expansion of $\tilde{s}/2^m$:

$$\frac{\tilde{s}}{2^m} = a_0 + \cfrac{1}{a_1 + \cfrac{1}{a_2 + \cdots}}$$

include $s/r$ (in lowest terms) as a convergent whenever $|s/r - \tilde{s}/2^m| < 1/(2r^2)$. This is guaranteed when $m \geq 2\log_2 N$ (using $r \leq N$).

**Phase estimation precision requirement for Shor:** Need $2^m > 2N^2$ to ensure the continued fraction algorithm succeeds. With $N$ a $b$-bit number, $m = 2b$ ancilla qubits suffice.

## Applications to Quantum Chemistry (VQE + QPE)

For molecular Hamiltonians $H$, time evolution $U = e^{-iHt}$ has eigenphases $\phi_k = E_k t/(2\pi\hbar)$. QPE on a prepared approximate ground state $|\tilde{E}_0\rangle$ yields the ground-state energy $E_0$ to chemical accuracy.

**Overlap requirement:** If $|\tilde{E}_0\rangle = \sum_k c_k|E_k\rangle$, QPE measures energy $E_k$ with probability $|c_k|^2$. Success probability (measuring $E_0$) equals $|c_0|^2 = |\langle E_0|\tilde{E}_0\rangle|^2$ — the overlap of the trial state with the true ground state.

**Trotter-Suzuki simulation:** Implementing $e^{-iHt}$ requires Trotterising $H = \sum_j h_j$:

$$e^{-iHt} \approx \left(\prod_j e^{-ih_j t/r}\right)^r + O\!\left(\frac{t^2}{r}\right)$$

For $m$ bits of energy precision, $t = \pi 2^m/\|H\|$ and the Trotter error requires $r = O(t^2 \|H\|^2/\varepsilon) = O(2^{2m}\|H\|^2/\varepsilon)$ steps. Total cost for the LiH molecule in a minimal basis: $\sim 10^{10}$ gates — out of reach for near-term hardware but achievable with fault-tolerant devices.

## Kitaev Phase Estimation and Iterative QPE

**Kitaev's algorithm (1995):** Estimates one bit of $\phi$ at a time using only 1 ancilla qubit:

1. Prepare $\frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)|\psi\rangle$.
2. Apply controlled-$U^{2^k}$.
3. Apply $R_z(-\theta)$ then $H$ to ancilla (for angle $\theta$ chosen to test specific bit).
4. Measure: obtain $\lfloor 2\phi \cdot 2^k \rfloor \bmod 2$ approximately.

Repeating for $k = 0, 1, \ldots, m-1$ with $O(m/\varepsilon^2)$ repetitions per bit estimates $\phi$ to $m$ bits using only 1 ancilla qubit — at the cost of more circuit repetitions.

**Iterative QPE (IPQE):** Modern variant with 1 ancilla, $m$ sequential rounds, classical Bayesian update:

At round $k$, measure controlled-$U^{2^k}$ outcome $x_k \in \{0,1\}$. Update belief:

$$P(\phi | x_0, \ldots, x_k) \propto P(x_k|\phi) \cdot P(\phi|x_0,\ldots,x_{k-1})$$

where $P(x_k|\phi) = \frac{1}{2}(1 + (-1)^{x_k}\cos(2\pi \cdot 2^k\phi - \theta_k))$.

Using $\theta_k$ from the classical posterior mean, each round provides $\sim 1$ bit of information. After $m$ rounds: error $\sim 2^{-m}$ with $O(2^m)$ total controlled-$U$ calls — matching the ancilla-heavy QPE but using only 1 ancilla qubit.

**Comparison of QPE variants:**

| Variant | Ancilla qubits | Circuit depth | Repetitions | Error |
|---|---|---|---|---|
| Standard QPE | $m + \lceil\log(1/\varepsilon)\rceil$ | $O(2^m)$ | 1 | $2^{-m}$ |
| Kitaev QPE | 1 | $O(2^k)$ per bit | $O(m/\varepsilon^2)$ | $2^{-m}$ |
| Iterative (Bayesian) | 1 | $O(2^m)$ total | $O(m)$ | $2^{-m}$ |
| Hadamard test | 1 | $O(2^k)$ per bit | $O(m/\varepsilon^2)$ | $2^{-m}$ |
