---
title: "Shor's Algorithm"
field: quantum-computing
description: A quantum algorithm for integer factorisation running in polynomial time, breaking RSA encryption.
intro: >
  Shor's algorithm (1994) solves integer factorisation in polynomial time $O((\log N)^3)$ on a quantum computer, compared to the best classical algorithm's sub-exponential $O(e^{(\log N)^{1/3}(\log\log N)^{2/3}})$. It works by reducing factoring to period finding, then using the quantum Fourier transform to find periods exponentially faster than any classical method. A practical implementation would break RSA and most public-key cryptography currently in use.
math_concepts:
  - number-theory
  - fourier-transform
  - linear-algebra
  - quantum-mechanics
difficulty: expert
difficulty_level: 5
read_time: 18
---

## Reduction: Factoring to Period Finding

The core insight of Shor's algorithm is a classical reduction from **integer factorisation** to **order (period) finding**.

Given $N = pq$ (product of two large primes), choose a random $a$ with $1 < a < N$ and $\gcd(a, N) = 1$. Define the function:

$$f(x) = a^x \bmod N$$

This function is **periodic**: there exists a smallest positive integer $r$ (the **order** of $a$ modulo $N$) such that $a^r \equiv 1 \pmod{N}$, so $f(x+r) = f(x)$ for all $x$.

**Extraction of factors:** If $r$ is even and $a^{r/2} \not\equiv -1 \pmod{N}$, then:

$$a^r - 1 = (a^{r/2} - 1)(a^{r/2} + 1) \equiv 0 \pmod{N}$$

Since $N | (a^{r/2}-1)(a^{r/2}+1)$ but $N \nmid (a^{r/2} \pm 1)$, computing $\gcd(a^{r/2} \pm 1,\, N)$ yields a non-trivial factor of $N$ with probability at least $1 - 2^{1-k}$ where $k$ is the number of distinct prime factors.

**Example with $N = 15$, $a = 7$:**

$$7^1 = 7,\; 7^2 = 4,\; 7^3 = 13,\; 7^4 = 1 \pmod{15}$$

So $r = 4$. Then $7^2 = 49 \equiv 4 \pmod{15}$, and $\gcd(4-1, 15) = \gcd(3,15) = 3$. Factor found.

## The Quantum Fourier Transform

The **quantum Fourier transform (QFT)** over $\mathbb{Z}_N$ maps:

$$\text{QFT}_N|j\rangle = \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1} e^{2\pi i jk/N}|k\rangle$$

For $N = 2^n$ (using $n$ qubits), the QFT can be implemented in $O(n^2)$ gates using the recursive structure:

$$\text{QFT}_{2^n}|j\rangle = \frac{1}{\sqrt{2^n}}\bigotimes_{l=1}^{n}\left(|0\rangle + e^{2\pi i \cdot 0.j_{n-l+1}\ldots j_n}|1\rangle\right)$$

where $j = j_1 j_2 \ldots j_n$ in binary and $0.j_k \ldots j_n = \sum_{m=0}^{n-k} j_{k+m}/2^{m+1}$.

The circuit uses $n$ Hadamard gates and $O(n^2)$ controlled phase rotation gates $R_k = \text{diag}(1, e^{2\pi i/2^k})$:

| Step | Operation |
|---|---|
| Apply $H$ to qubit $n$ | Creates $\|0\rangle + e^{2\pi i \cdot 0.j_n}\|1\rangle$ |
| Apply $R_2$ controlled on qubit $n-1$ | Adds $e^{2\pi i \cdot 0.j_{n-1}j_n}$ phase |
| Continue to $R_n$ controlled on qubit $1$ | Completes first output qubit |
| Repeat for remaining qubits, bit-reverse | Gives full QFT output |

Total gate count: $\frac{n(n+1)}{2}$ gates — compare to the classical FFT's $O(n \cdot 2^n)$ operations.

## Phase Estimation and Order Finding

**Quantum phase estimation (QPE)** is the subroutine that extracts $r$. Consider the unitary:

$$U_a|x\rangle = |ax \bmod N\rangle$$

The eigenstates of $U_a$ are:

$$|u_s\rangle = \frac{1}{\sqrt{r}}\sum_{k=0}^{r-1} e^{-2\pi i sk/r}|a^k \bmod N\rangle, \quad s = 0,1,\ldots,r-1$$

with eigenvalues $e^{2\pi i s/r}$. The phase estimation circuit:

1. Prepare $n$ ancilla qubits in $|0\rangle^{\otimes n}$ and the target in $\frac{1}{\sqrt{r}}\sum_s|u_s\rangle = |1\rangle$.
2. Apply $H^{\otimes n}$ to ancilla: creates uniform superposition $\frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}|x\rangle$.
3. Apply controlled-$U_a^{2^j}$ for each ancilla qubit $j = 0,\ldots,n-1$.
4. Apply inverse QFT to ancilla.
5. Measure ancilla to obtain $\tilde{s} \approx s \cdot 2^n / r$.

The measurement yields an integer close to $s \cdot 2^n / r$. Using the **continued fraction algorithm** on $\tilde{s}/2^n$, we recover $s/r$ exactly (as a reduced fraction), giving us $r$.

## Complexity Analysis

**Quantum part:** The dominant cost is computing $a^x \bmod N$ coherently. Modular exponentiation via repeated squaring requires $O((\log N)^2)$ modular multiplications, each costing $O((\log N)^2)$ elementary gates, giving $O((\log N)^3)$ gates total. The QFT adds only $O((\log N)^2)$ gates.

**Classical comparison:**

| Algorithm | Complexity | Type |
|---|---|---|
| Trial division | $O(N^{1/2})$ | Classical |
| Pollard's rho | $O(N^{1/4})$ | Classical randomised |
| Quadratic sieve | $O(e^{\sqrt{\log N \log\log N}})$ | Classical |
| General number field sieve (GNFS) | $O(e^{1.923(\log N)^{1/3}(\log\log N)^{2/3}})$ | Classical |
| Shor's algorithm | $O((\log N)^3)$ | Quantum |

For a 2048-bit RSA key ($N \approx 2^{2048}$): GNFS requires $\sim 10^{23}$ operations classically; Shor's requires $\sim 2048^3 \approx 10^{10}$ quantum gates.

## Chinese Remainder Theorem and Classical Post-Processing

The **Chinese Remainder Theorem (CRT)** plays a role both in the correctness proof and efficient classical simulation of parts of the algorithm.

**CRT statement:** If $n_1, \ldots, n_k$ are pairwise coprime, then for any integers $a_1, \ldots, a_k$:

$$x \equiv a_i \pmod{n_i}, \quad i = 1,\ldots,k$$

has a unique solution modulo $M = \prod n_i$. The solution is $x = \sum_i a_i M_i (M_i^{-1} \bmod n_i)$ where $M_i = M/n_i$.

In Shor's algorithm, the order $r$ of $a$ modulo $N = p_1^{e_1}\cdots p_k^{e_k}$ satisfies $r = \text{lcm}(r_1, \ldots, r_k)$ where $r_i$ is the order of $a$ modulo $p_i^{e_i}$. This structure guarantees that when $r$ is even and the non-degenerate condition holds, the probability that $\gcd(a^{r/2}-1, N)$ is non-trivial is at least $1 - 1/2^{k-1}$ where $k$ is the number of distinct prime factors.

The classical post-processing after measuring the phase is:
1. Compute $\tilde{s}/2^n$.
2. Run continued fraction expansion: $\tilde{s}/2^n = [a_0; a_1, a_2, \ldots]$.
3. The convergents $p_j/q_j$ satisfy $|s/r - p_j/q_j| < 1/q_j^2$.
4. Test whether $q_j$ is the order: check $a^{q_j} \equiv 1 \pmod N$.
5. Use LCM of multiple runs to handle the case $s = 0$.

## Hardware Requirements and Current Limitations

A fault-tolerant implementation of Shor's algorithm for $N = 2048$-bit RSA requires approximately:

| Resource | Estimate |
|---|---|
| Logical qubits | $\sim 4000$ |
| Physical qubits (surface code, $p = 10^{-3}$) | $\sim 4 \times 10^6$ |
| Gate operations | $\sim 10^{10}$ |
| Wall clock time | $\sim 8$ hours |
| Required gate error rate | $< 10^{-3}$ |

Current state-of-the-art quantum processors (2025) have $\mathcal{O}(1000)$ physical qubits with error rates around $10^{-3}$, insufficient for error correction overhead. The largest number factored by Shor's algorithm remains $N = 21$ on quantum hardware (though efficient classical shortcuts are often used for small numbers).

The threshold for quantum advantage in cryptographic applications likely requires $10^6$–$10^7$ physical qubits with error rates below $10^{-4}$, representing a 2–3 order of magnitude improvement in qubit count and a factor of 10 in error rates compared to current hardware.
