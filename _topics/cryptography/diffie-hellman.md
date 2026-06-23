---
title: "Diffie-Hellman Key Exchange"
field: cryptography
description: A protocol enabling two parties to establish a shared secret over an insecure channel using discrete logarithms.
intro: >
  The Diffie-Hellman key exchange, published in 1976, was a revolutionary idea: two parties
  who have never met can jointly establish a secret key in full public view of an adversary.
  It relies on the discrete logarithm problem — computing $k$ from $g^k \bmod p$ is
  computationally hard even when $g$ and $p$ are public. The protocol has since been generalized
  to elliptic curves and extended to provide forward secrecy, forming the backbone of TLS 1.3.
math_concepts:
  - number-theory
  - group-theory
difficulty: intermediate
difficulty_level: 3
read_time: 11
---

## The Discrete Logarithm Problem

Fix a large prime $p$ and a **generator** $g$ of the multiplicative group $\mathbb{Z}_p^* = \{1, 2, \ldots, p-1\}$. This group has order $p - 1$ under multiplication modulo $p$.

The **discrete logarithm problem (DLP)**: given $p$, $g$, and $h = g^a \bmod p$, find $a$.

While computing $h = g^a \bmod p$ (modular exponentiation) is efficient — $O(\log a)$ multiplications — the inverse operation has no known polynomial-time algorithm. The best classical algorithms have sub-exponential complexity in $\log p$:

$$L_p\!\left[\tfrac{1}{3}, (64/9)^{1/3}\right] = \exp\!\Bigl((c+o(1))(\ln p)^{1/3}(\ln\ln p)^{2/3}\Bigr)$$

This **index calculus** method exploits the algebraic structure of $\mathbb{Z}_p^*$ — specifically, that most elements can be expressed as products of small primes (**factor base**). For $p$ a 2048-bit prime, index calculus requires $\approx 2^{112}$ operations.

**Safe primes**: to resist sub-exponential attacks, choose $p = 2q + 1$ where $q$ is also prime (making $p$ a **safe prime**) and work in the subgroup of order $q$. This forces Pohlig-Hellman attacks to contend with the large prime factor $q$.

## The Diffie-Hellman Protocol

Public parameters: a prime $p$, a generator $g$ of $\mathbb{Z}_p^*$ (or of a prime-order subgroup).

**Protocol:**

1. **Alice** chooses secret $a \xleftarrow{\$} \{2, \ldots, p-2\}$, sends $A = g^a \bmod p$.
2. **Bob** chooses secret $b \xleftarrow{\$} \{2, \ldots, p-2\}$, sends $B = g^b \bmod p$.
3. **Alice** computes $K = B^a = g^{ab} \bmod p$.
4. **Bob** computes $K = A^b = g^{ab} \bmod p$.

Both parties derive the same shared secret $K = g^{ab} \bmod p$. A passive eavesdropper observing $g$, $p$, $A = g^a$, and $B = g^b$ must solve the **computational Diffie-Hellman problem (CDH)**: compute $g^{ab}$ from $g^a$ and $g^b$ without knowing $a$ or $b$ individually.

The **decisional Diffie-Hellman problem (DDH)**: distinguish $(g^a, g^b, g^{ab})$ from $(g^a, g^b, g^c)$ for random $c$. DDH hardness is a stronger assumption used to prove security of ElGamal encryption.

| Problem | Input | Goal | Hardness |
|---------|-------|------|---------|
| DLP | $g^a$ | Find $a$ | Sub-exponential attacks known |
| CDH | $g^a, g^b$ | Compute $g^{ab}$ | At most as hard as DLP |
| DDH | $g^a, g^b, g^c$ | Is $c = ab$? | Harder than CDH (no sub-exp known) |

## Man-in-the-Middle Attack and Authentication

Unauthenticated DH is vulnerable to a **man-in-the-middle (MITM) attack**. An adversary $\mathcal{M}$ intercepts all messages:

1. $\mathcal{M}$ intercepts $A = g^a$ from Alice; sends $M_1 = g^m \bmod p$ to Bob.
2. $\mathcal{M}$ intercepts $B = g^b$ from Bob; sends $M_2 = g^m \bmod p$ to Alice.
3. Alice computes $K_1 = M_2^a = g^{am}$; Bob computes $K_2 = M_1^b = g^{bm}$.
4. $\mathcal{M}$ knows both $K_1 = g^{am}$ and $K_2 = g^{bm}$ (since she knows $m$).

$\mathcal{M}$ now sits as a silent relay, decrypting and re-encrypting all traffic. The fix is **authenticated DH**: bind the DH exchange to long-term keys via digital signatures (STS protocol) or pre-shared keys. In TLS, the server signs the ephemeral DH parameters with its certificate key.

**Station-to-Station (STS) protocol:**

$$A \to B: g^a \qquad B \to A: g^b,\; \text{Sig}_B(g^a, g^b) \qquad A \to B: \text{Sig}_A(g^a, g^b)$$

Each party verifies the other's signature using pre-established public keys, defeating MITM.

## ElGamal Encryption

**ElGamal encryption** is a public-key scheme built directly on the DDH assumption. Setup: prime $p$, generator $g$, private key $x$, public key $h = g^x \bmod p$.

**Encryption** of message $m \in \mathbb{Z}_p^*$:
1. Choose random $r \xleftarrow{\$} \{1, \ldots, p-2\}$.
2. Ciphertext: $(c_1, c_2) = (g^r,\; m \cdot h^r) \bmod p$.

**Decryption**: recover $m = c_2 \cdot c_1^{-x} = m \cdot h^r \cdot g^{-rx} = m \cdot g^{xr} \cdot g^{-rx} = m$.

ElGamal is **semantically secure** (IND-CPA) under DDH. It is also **multiplicatively homomorphic**:

$$\text{Enc}(m_1) \cdot \text{Enc}(m_2) = (g^{r_1} g^{r_2},\; m_1 m_2 \cdot h^{r_1+r_2}) = \text{Enc}(m_1 m_2)$$

This homomorphic property is exploited in e-voting systems and verifiable computation.

## Forward Secrecy and Ephemeral DH

**Forward secrecy** (or **perfect forward secrecy**, PFS) guarantees that compromise of long-term keys does not expose past session keys. Standard RSA key exchange lacks PFS: if the server's private key is later compromised, an adversary who recorded past TLS sessions can retroactively decrypt them.

**Ephemeral Diffie-Hellman (DHE/ECDHE)** provides PFS by generating a fresh DH key pair for every session:

- Server generates ephemeral $(a, g^a)$ per session; signs $g^a$ with its certificate key.
- Session key $K = g^{ab}$ is used and then **discarded**.
- Compromise of the certificate key only allows future MITM (not past session decryption).

TLS 1.3 mandates forward secrecy, removing all non-PFS cipher suites. The handshake uses **ECDHE** (DH over Curve25519 or NIST P-256), with the client and server each generating ephemeral key pairs.

## X3DH: The Extended Triple Diffie-Hellman Protocol

**X3DH**, designed for the Signal protocol, achieves **asynchronous authenticated key exchange** — Alice can send an encrypted message to Bob even if Bob is offline, without prior interaction.

Bob pre-publishes to a server:
- **Identity key** $IK_B = [ik_b]G$ (long-term)
- **Signed prekey** $SPK_B = [spk_b]G$ (medium-term, signed by $IK_B$)
- **One-time prekeys** $OPK_B^{(i)} = [opk_b^{(i)}]G$ (ephemeral, each used once)

Alice computes four DH values and derives the master secret via HKDF:

$$DH_1 = [ik_a] \cdot SPK_B, \quad DH_2 = [ek_a] \cdot IK_B, \quad DH_3 = [ek_a] \cdot SPK_B, \quad DH_4 = [ek_a] \cdot OPK_B$$

$$SK = \text{HKDF}(DH_1 \| DH_2 \| DH_3 \| DH_4)$$

where $EK_A = [ek_a]G$ is Alice's ephemeral key. The combination of identity and ephemeral keys provides:

| Property | Provided By |
|----------|------------|
| Mutual authentication | $DH_1$ and $DH_2$ bind identity keys |
| Forward secrecy | $DH_3$: ephemeral key of Alice |
| One-time prekey protection | $DH_4$: breaks replay attacks |

## Index Calculus and Attack Complexity

The **index calculus** attack exploits the fact that many elements of $\mathbb{Z}_p^*$ factor over a small **factor base** $\mathcal{F} = \{p_1, p_2, \ldots, p_B\}$ of the first $B$ primes:

1. **Relation collection**: for random $k$, compute $g^k \bmod p$ and check if it is $\mathcal{F}$-smooth (all prime factors $\leq p_B$). If so, record the relation $k \equiv \sum a_i \log_g p_i \pmod{p-1}$.

2. **Linear algebra**: solve the system of linear equations over $\mathbb{Z}_{p-1}$ to find $\log_g p_i$ for all $p_i \in \mathcal{F}$.

3. **Individual log**: to find $\log_g h$, search for $r$ such that $h \cdot g^r$ is $\mathcal{F}$-smooth, then use the precomputed logarithms.

The optimal factor base size is $B = L_p[1/2, 1/2]$, giving total complexity $L_p[1/2, 1/2]$. The Number Field Sieve variant achieves $L_p[1/3, (64/9)^{1/3}]$.

This is why DH over $\mathbb{Z}_p^*$ requires 2048-bit primes for 112-bit security, while ECDH over elliptic curves achieves the same with 256-bit keys: index calculus does not apply to generic elliptic curve groups.
