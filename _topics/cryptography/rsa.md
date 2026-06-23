---
title: "RSA Cryptosystem"
field: cryptography
description: A public-key cryptosystem based on the computational hardness of factoring large integers.
intro: >
  RSA, introduced by Rivest, Shamir, and Adleman in 1977, was the first practical public-key
  cryptosystem and remains foundational to internet security. It derives its security from the
  presumed difficulty of factoring the product of two large primes, while its correctness rests
  on Euler's theorem from number theory. Despite being superseded in efficiency by elliptic-curve
  methods, RSA underpins TLS certificates, code signing, and SSH authentication worldwide.
math_concepts:
  - number-theory
  - group-theory
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## Key Generation

RSA key generation begins by selecting two large secret primes $p$ and $q$, each typically 1024–2048 bits. Their product forms the **modulus**:

$$n = pq$$

The security of RSA rests entirely on the difficulty of recovering $p$ and $q$ from $n$. Euler's totient function counts integers less than $n$ that are coprime to it:

$$\phi(n) = (p-1)(q-1)$$

This formula holds because $\phi$ is multiplicative for coprime arguments. Next, choose a **public exponent** $e$ satisfying:

$$1 < e < \phi(n), \quad \gcd(e, \phi(n)) = 1$$

The most common choice is $e = 65537 = 2^{16}+1$, a Fermat prime chosen for efficient modular exponentiation (only two 1-bits in binary). The **private exponent** $d$ is the modular inverse of $e$:

$$d \equiv e^{-1} \pmod{\phi(n)}$$

computed via the extended Euclidean algorithm. The public key is $(n, e)$; the private key is $(n, d)$ (with $p$, $q$ discarded after key generation).

| Parameter | Typical Value | Role |
|-----------|--------------|------|
| $p, q$ | 1024-bit primes | Secret factors |
| $n = pq$ | 2048-bit modulus | Public |
| $e$ | 65537 | Public exponent |
| $d = e^{-1} \bmod \phi(n)$ | 2048-bit integer | Private exponent |

## Encryption and Decryption

RSA encryption treats a message $m$ as an integer in $\{0, 1, \ldots, n-1\}$ and computes the **ciphertext**:

$$c = m^e \bmod n$$

Decryption recovers the message by exponentiating with the private key:

$$m' = c^d \bmod n$$

Both operations use **fast modular exponentiation** (square-and-multiply), running in $O(\log e)$ and $O(\log d)$ multiplications modulo $n$ respectively. For a 2048-bit key, encryption requires roughly 17 multiplications (since $e = 65537$ has low Hamming weight), while decryption requires about 2000.

## Correctness via Euler's Theorem

The correctness of RSA—that $m' = m$—follows from **Euler's theorem**: for $\gcd(m, n) = 1$,

$$m^{\phi(n)} \equiv 1 \pmod{n}$$

Since $ed \equiv 1 \pmod{\phi(n)}$, we can write $ed = 1 + k\phi(n)$ for some integer $k$. Therefore:

$$c^d = (m^e)^d = m^{ed} = m^{1 + k\phi(n)} = m \cdot (m^{\phi(n)})^k \equiv m \cdot 1^k = m \pmod{n}$$

This argument requires $\gcd(m, n) = 1$. The case $\gcd(m, n) > 1$ (i.e., $p \mid m$ or $q \mid m$) can be handled by the Chinese Remainder Theorem, and correctness still holds when working modulo $p$ and $q$ separately via Fermat's little theorem.

More precisely, RSA operates in the **multiplicative group** $(\mathbb{Z}/n\mathbb{Z})^*$, which has order $\phi(n)$. The map $x \mapsto x^e$ is a bijection on this group (since $\gcd(e, \phi(n)) = 1$), with inverse $x \mapsto x^d$.

## Security: Integer Factorization Hardness

The security of RSA reduces to the **integer factorization problem**: given $n$, find $p$ and $q$. No polynomial-time classical algorithm is known. The best general-purpose algorithm is the **General Number Field Sieve (GNFS)**, with sub-exponential complexity:

$$L_n\!\left[\tfrac{1}{3}, \sqrt[3]{\tfrac{64}{9}}\right] = \exp\!\left(\left(\sqrt[3]{\tfrac{64}{9}} + o(1)\right)(\ln n)^{1/3} (\ln \ln n)^{2/3}\right)$$

This motivates the 2048-bit recommendation: GNFS against a 2048-bit modulus requires roughly $2^{112}$ operations, deemed infeasible classically. However, **Shor's algorithm** factors $n$ in polynomial time on a quantum computer, threatening all RSA deployments.

Additional security considerations:

- **Textbook RSA is deterministic** — the same message always encrypts to the same ciphertext, enabling chosen-plaintext attacks and revealing patterns.
- **Small $e$ attacks**: if $e$ is small and the message is small, $m^e < n$ and the ciphertext is $m^e$ exactly, recoverable by taking the $e$-th root.
- **Common modulus attacks**: never share $n$ across multiple key pairs.
- **Timing attacks**: constant-time implementations are essential.

## OAEP Padding

Optimal Asymmetric Encryption Padding (OAEP) converts textbook RSA into a semantically secure scheme (IND-CCA2 secure in the random oracle model). Given a message $M$ of length $|M|$ and a hash function $H$ with output length $hLen$:

1. Pad $M$ with a label hash and zeros to produce a **data block** $DB$ of length $k - hLen - 1$.
2. Sample a random **seed** $r$ of length $hLen$.
3. Compute $maskedDB = DB \oplus \text{MGF}(r)$ where MGF is a mask generation function.
4. Compute $maskedSeed = r \oplus \text{MGF}(maskedDB)$.
5. Set the encoded message $EM = 0x00 \| maskedSeed \| maskedDB$.

The resulting padded value is then encrypted as $c = EM^e \bmod n$. Decryption reverses the process and checks consistency. The random seed ensures each encryption of the same message produces a different ciphertext, providing semantic security.

$$\text{OAEP:}\quad M \xrightarrow{\text{pad with random seed}} EM \xrightarrow{x \mapsto x^e \bmod n} c$$

## RSA-CRT Speedup

The **Chinese Remainder Theorem (CRT)** accelerates RSA decryption significantly. Instead of computing $m = c^d \bmod n$ directly (working modulo a 2048-bit number), compute separately:

$$m_p = c^{d_p} \bmod p, \qquad d_p = d \bmod (p-1)$$

$$m_q = c^{d_q} \bmod q, \qquad d_q = d \bmod (q-1)$$

Each exponentiation works modulo a 1024-bit prime, which is about 4× faster per operation, and the exponents $d_p$, $d_q$ are half the size—yielding roughly an 8× total speedup. Recover $m$ via:

$$m = m_q + q \cdot \left[q_{\text{inv}} (m_p - m_q) \bmod p\right], \qquad q_{\text{inv}} = q^{-1} \bmod p$$

This precomputed value $q_{\text{inv}}$ (sometimes called $\text{iqmp}$ in libraries) is stored alongside the private key. The CRT recombination uses Garner's formula to avoid working modulo $n$ until the final step. Because of this speedup, RSA private-key operations (decryption, signing) are typically 3–4× faster in practice than the asymptotic 4× suggests, due to memory and pipeline effects.

| Operation | Modulus Size | Multiplications | Relative Speed |
|-----------|-------------|-----------------|----------------|
| Direct $c^d \bmod n$ | 2048-bit | ~3000 | 1× |
| CRT: $c^{d_p} \bmod p$ | 1024-bit | ~750 | ~4× |
| CRT: $c^{d_q} \bmod q$ | 1024-bit | ~750 | ~4× |
| CRT total (with recombination) | 1024-bit | ~1550 | ~3.8× |
