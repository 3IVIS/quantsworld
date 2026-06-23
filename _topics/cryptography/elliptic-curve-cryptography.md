---
title: "Elliptic Curve Cryptography"
field: cryptography
description: Public-key cryptography built on the algebraic structure of elliptic curves over finite fields.
intro: >
  Elliptic curve cryptography (ECC) achieves the same security as RSA with dramatically smaller
  key sizes: a 256-bit ECC key is considered equivalent to a 3072-bit RSA key. This efficiency
  advantage stems from the elliptic curve discrete logarithm problem (ECDLP), which has no
  known sub-exponential classical algorithm, unlike integer factorization. ECC now underlies
  Bitcoin, TLS 1.3, Signal, and most modern secure communications.
math_concepts:
  - elliptic-curves
  - group-theory
  - number-theory
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## Elliptic Curves over Finite Fields

An **elliptic curve** over a prime field $\mathbb{F}_p$ (with $p > 3$) is the set of points $(x, y) \in \mathbb{F}_p^2$ satisfying the **Weierstrass equation**:

$$y^2 \equiv x^3 + ax + b \pmod{p}$$

together with a special **point at infinity** $\mathcal{O}$, provided the discriminant is nonzero:

$$\Delta = -16(4a^3 + 27b^2) \neq 0 \pmod{p}$$

This non-degeneracy condition ensures the curve has no cusps or self-intersections, which is required for the group law to be well-defined. The number of points on the curve, $\#E(\mathbb{F}_p)$, is constrained by **Hasse's theorem**:

$$\left|\#E(\mathbb{F}_p) - (p+1)\right| \leq 2\sqrt{p}$$

This tight bound means $\#E(\mathbb{F}_p) \approx p$, so curves over a $p$-bit prime field have approximately $p$ points.

| Curve | Field Size | Security Level | $a$ | Notes |
|-------|-----------|----------------|-----|-------|
| NIST P-256 | 256-bit | 128-bit | $-3$ | Most widely deployed |
| NIST P-384 | 384-bit | 192-bit | $-3$ | Suite B government use |
| Curve25519 | 255-bit | 128-bit | 486662 | Montgomery form, fast |
| secp256k1 | 256-bit | 128-bit | $0$ | Bitcoin, Ethereum |

## Point Addition: Chord-and-Tangent Law

The set $E(\mathbb{F}_p) \cup \{\mathcal{O}\}$ forms an **abelian group** under a geometric addition law. To add points $P = (x_1, y_1)$ and $Q = (x_2, y_2)$:

**Case 1: $P \neq Q$ (chord rule).** Draw the line through $P$ and $Q$; it meets the curve at a third point $R'$; reflect across the $x$-axis to get $R = P + Q$:

$$\lambda = \frac{y_2 - y_1}{x_2 - x_1}, \qquad x_3 = \lambda^2 - x_1 - x_2, \qquad y_3 = \lambda(x_1 - x_3) - y_1$$

**Case 2: $P = Q$ (tangent rule, point doubling).** Use the tangent line at $P$:

$$\lambda = \frac{3x_1^2 + a}{2y_1}, \qquad x_3 = \lambda^2 - 2x_1, \qquad y_3 = \lambda(x_1 - x_3) - y_1$$

**Case 3: $P = -Q$ (i.e., $x_1 = x_2$, $y_1 = -y_2$).** Then $P + Q = \mathcal{O}$ (the identity).

Each field division ($\lambda$ computation) is the most expensive step, costing roughly $80$ field multiplications using Montgomery inversion. **Projective coordinates** eliminate divisions by representing $(X : Y : Z)$ with $(x, y) = (X/Z, Y/Z)$, replacing each division with a few extra multiplications.

## The Elliptic Curve Discrete Logarithm Problem

**Scalar multiplication** computes $[k]P = P + P + \cdots + P$ ($k$ times) for an integer $k$ and point $P$, using the **double-and-add** algorithm analogous to square-and-multiply:

$$[k]P = \sum_{i=0}^{\lfloor \log_2 k \rfloor} k_i \cdot [2^i]P$$

where $k = \sum k_i 2^i$ is the binary representation. This runs in $O(\log k)$ point doublings and additions.

The **elliptic curve discrete logarithm problem (ECDLP)**: given points $P$ and $Q = [k]P$ on $E(\mathbb{F}_p)$, find $k$. The best known algorithms are:

- **Baby-step giant-step**: $O(\sqrt{n})$ time and space, where $n = \#E(\mathbb{F}_p)$.
- **Pollard's rho**: $O(\sqrt{n})$ time, $O(1)$ space — the practical attack of choice.
- **Pohlig-Hellman**: reduces to subgroups; defeated by choosing $n$ to be (near-)prime.

No sub-exponential algorithm is known for general curves, unlike discrete log in $\mathbb{F}_p^*$ (index calculus). For $n \approx 2^{256}$, the best attack requires $\approx 2^{128}$ operations.

## ECDH Key Exchange

**Elliptic Curve Diffie-Hellman (ECDH)** allows two parties to establish a shared secret over an insecure channel. Let $G$ be a public base point (generator) of order $n$ on a curve $E(\mathbb{F}_p)$:

1. **Alice** samples private key $a \xleftarrow{\$} \{1, \ldots, n-1\}$, publishes $A = [a]G$.
2. **Bob** samples private key $b \xleftarrow{\$} \{1, \ldots, n-1\}$, publishes $B = [b]G$.
3. **Alice** computes $S = [a]B = [ab]G$.
4. **Bob** computes $S = [b]A = [ab]G$.

Both arrive at the same shared point $S$. The shared secret is typically the $x$-coordinate of $S$, passed through a KDF (key derivation function). Breaking ECDH requires solving ECDLP: given $G$, $[a]G$, $[b]G$, find $[ab]G$ (the **computational Diffie-Hellman problem** on elliptic curves).

**X25519** is the ECDH function over Curve25519. Its Montgomery form $y^2 = x^3 + 486662x^2 + x$ allows a particularly efficient scalar multiplication that only tracks the $x$-coordinate, using the **Montgomery ladder** — which is also resistant to timing attacks.

## ECDSA Signature Scheme

**Elliptic Curve Digital Signature Algorithm (ECDSA)** signs a message hash $z = H(m)$:

**Signing** (with private key $d$, base point $G$ of order $n$):
1. Sample nonce $k \xleftarrow{\$} \{1, \ldots, n-1\}$ (must be secret and unique per signature).
2. Compute $R = [k]G$; let $r = R_x \bmod n$ (the $x$-coordinate of $R$).
3. Compute $s = k^{-1}(z + rd) \bmod n$.
4. Output signature $(r, s)$.

**Verification** (with public key $Q = [d]G$):
1. Compute $u_1 = s^{-1}z \bmod n$ and $u_2 = s^{-1}r \bmod n$.
2. Compute $R' = [u_1]G + [u_2]Q$.
3. Accept if $R'_x \equiv r \pmod{n}$.

**Critical security note**: the nonce $k$ must be uniformly random and never reused. Reusing $k$ across two signatures $(r, s_1)$ and $(r, s_2)$ on messages $z_1$ and $z_2$ allows immediate private key recovery:

$$k = \frac{z_1 - z_2}{s_1 - s_2} \bmod n, \qquad d = \frac{sk - z}{r} \bmod n$$

This flaw was famously exploited to extract private keys from PlayStation 3 consoles.

## Pairing-Based Cryptography: Overview

**Bilinear pairings** are maps $e: G_1 \times G_2 \to G_T$ where $G_1$, $G_2$ are groups of points on elliptic curves and $G_T$ is a multiplicative group, satisfying:

$$e([a]P, [b]Q) = e(P, Q)^{ab}$$

for all $P \in G_1$, $Q \in G_2$ and integers $a, b$. Pairings are computed via the **Weil pairing** or **Tate pairing** on specially chosen **pairing-friendly curves** (BN254, BLS12-381).

Pairings enable cryptographic constructions impossible with standard elliptic curves:

| Construction | Key Property Used |
|-------------|------------------|
| BLS signatures | Signature aggregation via $e(H(m), Q) = e(\sigma, G)$ |
| Identity-based encryption | Master public key as pairing input |
| KZG polynomial commitments | Evaluation proofs via pairing check |
| zk-SNARKs (Groth16) | Bilinear verification equation |

The **BLS signature** of message $m$ with private key $x$ is $\sigma = [x]H(m)$, verified by checking $e(\sigma, G) = e(H(m), [x]G)$. Crucially, $n$ signatures on the same message can be aggregated into a single $\sigma_{agg} = \sum \sigma_i$, verified in two pairings regardless of $n$ — enabling massive scalability in blockchain consensus.
