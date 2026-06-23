---
title: "Lattice-Based Cryptography"
field: cryptography
description: Post-quantum cryptographic constructions built on the computational hardness of lattice problems like LWE and SVP.
intro: >
  Lattice-based cryptography has emerged as the leading candidate for post-quantum security,
  with NIST standardising CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for
  signatures in 2022. Lattice problems enjoy worst-case to average-case hardness reductions —
  meaning breaking average instances is as hard as solving the worst-case lattice problem — a
  property unique in cryptography. The Learning With Errors (LWE) problem is the central
  hardness assumption, and its algebraically structured variants enable practical, efficient
  schemes.
math_concepts:
  - lattices
  - linear-algebra
  - number-theory
difficulty: expert
difficulty_level: 5
read_time: 15
---

## Lattices and Fundamental Geometry

A **lattice** $\Lambda$ is the set of all integer linear combinations of $n$ linearly independent vectors $\mathbf{b}_1, \ldots, \mathbf{b}_n \in \mathbb{R}^m$:

$$\Lambda = \mathcal{L}(\mathbf{b}_1, \ldots, \mathbf{b}_n) = \left\{\sum_{i=1}^n z_i \mathbf{b}_i : z_i \in \mathbb{Z}\right\}$$

The vectors form a **basis matrix** $B = [\mathbf{b}_1 \mid \cdots \mid \mathbf{b}_n] \in \mathbb{R}^{m \times n}$. The same lattice has many bases; two bases $B$ and $B'$ represent the same lattice if and only if $B' = BU$ for a unimodular matrix $U \in \mathbb{Z}^{n \times n}$ with $|\det U| = 1$.

The **determinant** of a lattice is the volume of its fundamental domain:

$$\det(\Lambda) = \sqrt{\det(B^T B)}$$

which is basis-independent. For an $n$-dimensional lattice ($m = n$), $\det(\Lambda) = |\det B|$.

**Successive minima**: $\lambda_i(\Lambda)$ is the smallest $r$ such that the ball of radius $r$ contains $i$ linearly independent lattice vectors. The fundamental inequality:

$$\prod_{i=1}^n \lambda_i(\Lambda) \leq \left(\frac{2}{\sqrt{\pi}} \cdot \Gamma\!\left(\frac{n}{2}+1\right)\right)^{2/n} \cdot \det(\Lambda) \approx \left(\frac{n}{2\pi e}\right)^{n/2} \cdot \det(\Lambda)^{2/n}$$

**Gaussian heuristic**: for a random $n$-dimensional lattice with determinant $\det(\Lambda)$:

$$\lambda_1(\Lambda) \approx \sqrt{\frac{n}{2\pi e}} \cdot \det(\Lambda)^{1/n}$$

This predicts the length of the shortest lattice vector with high accuracy for random lattices.

## SVP and CVP: Hardness Foundations

**Shortest Vector Problem (SVP)**: given a lattice basis $B$, find a nonzero vector $\mathbf{v} \in \Lambda$ minimising $\|\mathbf{v}\|$.

**Closest Vector Problem (CVP)**: given $B$ and a target $\mathbf{t} \in \mathbb{R}^n$ not necessarily in $\Lambda$, find $\mathbf{v} \in \Lambda$ minimising $\|\mathbf{v} - \mathbf{t}\|$.

Both SVP and CVP are NP-hard (under randomized reductions). The best known algorithms run in $2^{O(n)}$ time:

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| Enumeration | $2^{O(n^2)}$ | poly$(n)$ | Practical for $n \leq 70$ |
| Sieve (BKZ + NV) | $2^{0.292n}$ | $2^{0.208n}$ | Best asymptotic |
| BKZ-2.0 | $2^{\beta \log \beta}$ | poly | Block size $\beta$, practical |

**Approximate SVP** (SVP$_\gamma$): find $\mathbf{v} \in \Lambda$ with $\|\mathbf{v}\| \leq \gamma \cdot \lambda_1(\Lambda)$. Polynomial-time algorithms exist for $\gamma = 2^{O(n)}$ (LLL, $\gamma \approx (4/3)^{n/2}$), but improving to polynomial $\gamma$ appears hard.

## Learning With Errors (LWE)

**LWE** (Regev, 2005) is the central problem in modern lattice cryptography. Fix parameters $n$ (dimension), $q$ (modulus), and error distribution $\chi$ (typically discrete Gaussian $D_{\mathbb{Z}, \sigma}$ with $\sigma \ll q$).

**LWE distribution**: sample $\mathbf{a} \xleftarrow{\$} \mathbb{Z}_q^n$, $s \xleftarrow{\$} \mathbb{Z}_q^n$ (secret), $e \sim \chi$; output $(\mathbf{a}, \langle \mathbf{a}, \mathbf{s} \rangle + e \bmod q)$.

**LWE problem**: given $m$ samples $(\mathbf{A}, \mathbf{b}) = (\mathbf{A}, \mathbf{A}\mathbf{s} + \mathbf{e})$, recover $\mathbf{s}$ (or distinguish from uniform).

Without the error $\mathbf{e}$, this is just linear algebra ($\mathbf{s} = \mathbf{A}^{-1}\mathbf{b}$). The error makes it hard: it is equivalent to an approximate CVP instance.

**Worst-case hardness**: Regev proved that breaking LWE (solving decisional LWE) is at least as hard as solving approximate SVP on worst-case $n$-dimensional lattices (with quantum reduction). This is the unique and remarkable property of LWE: **breaking average-case LWE is as hard as solving the worst-case lattice problem**.

**Parameters for security**:
- NIST Level 1 (≥ 128-bit classical, ≥ 64-bit quantum): $n \approx 512$, $q \approx 12289$, $\sigma \approx 3.2$.
- NIST Level 5 (≥ 256-bit classical): $n \approx 1024$, $q \approx 12289$, $\sigma \approx 3.2$.

## Ring-LWE and Algebraic Structure

**Ring-LWE (RLWE)** replaces $\mathbb{Z}_q$ with a polynomial ring $R_q = \mathbb{Z}_q[x]/(x^n+1)$ for $n$ a power of 2 (making $x^n+1$ irreducible over $\mathbb{Z}$). A single RLWE sample encodes $n$ LWE equations in $O(n \log n)$ space:

$$(\mathbf{a}, b = as + e) \in R_q \times R_q$$

where $a \xleftarrow{\$} R_q$, $s \in R_q$ is the secret, and $e \in R_q$ has small coefficients. Multiplying by $a$ in $R_q = \mathbb{Z}_q[x]/(x^n+1)$ is equivalent to a structured ($\text{NTT}$-computable) matrix-vector product via the negacyclic convolution matrix.

Efficiency gains over LWE:

| Scheme | Public Key | Ciphertext | KEM/KA Speed |
|--------|-----------|------------|-------------|
| LWE-based (Frodo) | 9616 B | 9720 B | Slow |
| RLWE-based (Kyber-512) | 800 B | 768 B | Fast (NTT) |

**Module-LWE (MLWE)**: generalises to vectors of RLWE samples, interpolating between LWE and RLWE for flexible security-efficiency tradeoffs. Kyber uses MLWE with module rank $k \in \{2, 3, 4\}$.

**Number Theoretic Transform (NTT)**: multiplication in $R_q$ can be computed in $O(n \log n)$ using the NTT (analogue of FFT for finite fields). For $q = 3329$ (Kyber's modulus) and $n = 256$, the NTT factorises as a Cooley-Tukey butterfly network over $\mathbb{Z}_{3329}$, exploiting the $2n$-th primitive root of unity modulo $q$.

## Regev Encryption Scheme

**Regev encryption** is the foundational LWE-based public-key encryption scheme. Parameters: $n$, $q$, $\chi$ as above; $m = O(n \log q)$ samples.

**Key generation**: sample $\mathbf{A} \xleftarrow{\$} \mathbb{Z}_q^{m \times n}$, $\mathbf{s} \xleftarrow{\$} \mathbb{Z}_q^n$, $\mathbf{e} \sim \chi^m$. Public key: $(\mathbf{A}, \mathbf{b} = \mathbf{A}\mathbf{s} + \mathbf{e})$. Private key: $\mathbf{s}$.

**Encryption** of bit $\mu \in \{0, 1\}$: sample $\mathbf{r} \xleftarrow{\$} \{0, 1\}^m$, output:

$$c_1 = \mathbf{A}^T \mathbf{r} \in \mathbb{Z}_q^n, \qquad c_2 = \mathbf{b}^T \mathbf{r} + \mu \cdot \lfloor q/2 \rfloor \in \mathbb{Z}_q$$

**Decryption**: compute $v = c_2 - c_1^T \mathbf{s}$ and round: $\mu' = \lfloor 2v/q \rceil \bmod 2$.

**Correctness**: $c_2 - c_1^T \mathbf{s} = \mathbf{b}^T\mathbf{r} + \mu \lfloor q/2 \rfloor - (\mathbf{A}^T\mathbf{r})^T\mathbf{s} = \mathbf{e}^T\mathbf{r} + \mu \lfloor q/2 \rfloor \approx \mu \lfloor q/2 \rfloor$, which rounds correctly when $\|\mathbf{e}^T\mathbf{r}\| \ll q/4$.

## CRYSTALS-Kyber: NIST PQC Standard

**Kyber** (now standardised as FIPS 203 ML-KEM) is a key encapsulation mechanism (KEM) based on Module-LWE. It compresses Regev encryption with optimised decryption correction.

**Kyber.CPA-PKE** (IND-CPA secure encryption):

Key generation in $R_q = \mathbb{Z}_{3329}[x]/(x^{256}+1)$, module rank $k$ (Kyber-512: $k=2$):

$$\hat{\mathbf{A}} \xleftarrow{\$} R_q^{k \times k}, \quad \mathbf{s}, \mathbf{e} \sim \beta_\eta^k$$

$$\mathbf{t} = \hat{\mathbf{A}}\mathbf{s} + \mathbf{e} \quad \text{(public key)}$$

where $\beta_\eta$ is the centred binomial distribution (approximating Gaussian). Encryption of message $m \in \{0,1\}^{256}$:

$$\mathbf{r}, \mathbf{e}_1 \sim \beta_{\eta_1}^k, \quad e_2 \sim \beta_{\eta_2}$$
$$\mathbf{u} = \hat{\mathbf{A}}^T\mathbf{r} + \mathbf{e}_1, \quad v = \mathbf{t}^T\mathbf{r} + e_2 + \text{Decompress}(m, 1)$$

Ciphertext $(\mathbf{u}, v)$ is compressed to reduce bandwidth.

**Kyber.KEM** wraps CPA-PKE in a Fujisaki-Okamoto transform to achieve IND-CCA2 security (secure against chosen-ciphertext attacks).

| Kyber Variant | $k$ | Public Key | Ciphertext | Security |
|---------------|-----|-----------|------------|---------|
| Kyber-512 | 2 | 800 B | 768 B | NIST Level 1 |
| Kyber-768 | 3 | 1184 B | 1088 B | NIST Level 3 |
| Kyber-1024 | 4 | 1568 B | 1568 B | NIST Level 5 |

## Hardness Reductions and Security Analysis

The LWE hardness hierarchy:

$$\text{Worst-case lattice problems} \leq_{\text{quantum}} \text{Average-case LWE} \leq \text{Regev/Kyber}$$

Concretely, the **lattice estimator** (Albrecht et al.) analyses attacks on LWE instances using:

1. **Primal attack**: reduce LWE to uSVP (unique SVP) via embedding, then use BKZ.
2. **Dual attack**: find short dual vectors, use as distinguishers.
3. **Algebraic attacks on RLWE**: include subfield attacks and Gentry-Szydlo for special rings.

For Kyber-512 ($n=256$, $q=3329$, $k=2$, $\eta_1=\eta_2=3$), the best known attack requires $\approx 2^{118}$ classical operations (core-SVP hardness), comfortably above the 128-bit target when accounting for the BKZ cost model.

**Quantum resistance**: unlike integer factorisation (Shor's algorithm, poly-time) and discrete log (quantum poly-time), the best quantum algorithm for SVP/LWE (quantum sieve) achieves only a constant-factor speedup over the classical sieve — giving roughly $2^{0.265n}$ versus $2^{0.292n}$ classically. This minor quantum advantage motivates using parameters slightly larger than classical 128-bit security.
