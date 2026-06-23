---
title: "Digital Signatures"
field: cryptography
description: Cryptographic schemes binding a message to a signer's identity, providing authentication, integrity, and non-repudiation.
intro: >
  A digital signature scheme allows a signer to produce an unforgeable tag on a message using
  their private key, which anyone can verify with the corresponding public key. Signatures
  provide authentication (proof of origin), integrity (proof of non-alteration), and
  non-repudiation (the signer cannot deny signing). From RSA-PSS to BLS aggregation and
  post-quantum Dilithium, the landscape spans classical constructions and emerging alternatives
  designed for the quantum era.
math_concepts:
  - elliptic-curves
  - number-theory
  - group-theory
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## RSA-PSS Signature Scheme

**RSA-PSS** (Probabilistic Signature Scheme) is the provably secure RSA signature standard (PKCS#1 v2.1). Unlike the older PKCS#1 v1.5, RSA-PSS has a tight security reduction to RSA inversion in the random oracle model.

**Encoding** (PSS-Encode): given message $M$ and modulus length $\text{emLen}$:
1. Compute $mHash = H(M)$.
2. Generate random salt $s$ of length $sLen$.
3. Compute $M' = (0^{64} \| mHash \| s)$.
4. Compute $H' = H(M')$ (the hash to embed).
5. Construct $DB = (0^{\text{padding}} \| 0x01 \| s)$.
6. Compute $dbMask = \text{MGF}(H', \text{emLen} - hLen - 1)$.
7. Output $EM = (maskedDB \| H' \| 0xbc)$.

**Signing**: $\sigma = EM^d \bmod n$.

**Verification**: recover $EM = \sigma^e \bmod n$ and run PSS-Verify. The random salt ensures each signing of the same message produces a different signature, defeating adaptive chosen-message attacks.

Security proof: any adversary forging a PSS signature with advantage $\varepsilon$ can be used to invert RSA with advantage $\approx \varepsilon / q_H$ (where $q_H$ is the number of hash queries) — a tight reduction.

## DSA and ECDSA

**DSA (Digital Signature Algorithm)** operates in a prime-order subgroup of $\mathbb{Z}_p^*$. Parameters: large prime $p$, prime $q \mid (p-1)$ (the subgroup order), generator $g$ of order $q$, private key $x$, public key $y = g^x \bmod p$.

**Signing** of message hash $z = H(m)$:
1. Sample $k \xleftarrow{\$} \{1, \ldots, q-1\}$.
2. $r = (g^k \bmod p) \bmod q$.
3. $s = k^{-1}(z + xr) \bmod q$.
4. Output $(r, s)$.

**Verification**: compute $w = s^{-1} \bmod q$, $u_1 = zw \bmod q$, $u_2 = rw \bmod q$, and check:

$$(g^{u_1} y^{u_2} \bmod p) \bmod q \stackrel{?}{=} r$$

**ECDSA** replaces the $\mathbb{Z}_p^*$ subgroup with an elliptic curve group, using the $x$-coordinate of the point $[k]G$ as $r$. The equations are structurally identical.

**Critical weakness — nonce reuse**: if $k$ is reused across signatures $(r, s_1)$ and $(r, s_2)$ on messages with hashes $z_1$ and $z_2$:

$$s_1 - s_2 = k^{-1}(z_1 - z_2) \pmod{q} \implies k = \frac{z_1 - z_2}{s_1 - s_2} \bmod q, \quad x = \frac{s_1 k - z_1}{r} \bmod q$$

This breaks the Sony PlayStation 3 ($k$ was constant), the Debian weak RNG vulnerability, and numerous Bitcoin wallets.

Even **biased nonces** suffice for key recovery via lattice attacks (Howgrave-Graham and Smart, 1999): if $k$ is biased so that the top $\ell$ bits are known, $O(n/\ell)$ signatures suffice to recover $x$ via the **Hidden Number Problem**, solvable with LLL lattice reduction.

## EdDSA: Deterministic Schnorr Signatures

**EdDSA** (Edwards-curve Digital Signature Algorithm) solves the nonce bias problem by making $k$ **deterministic** — derived from the private key and message via a hash. This eliminates the need for a secure RNG during signing.

**Setup**: Edwards curve $E$, generator $B$ of prime order $\ell$, hash $H$ with $2b$-bit output (e.g., SHA-512 with $b = 256$ for Ed25519).

**Key generation**: private key $k \xleftarrow{\$} \{0,1\}^b$; compute $H(k) = (h_0, \ldots, h_{2b-1})$; secret scalar $s = 2^{b-2} + \sum_{3 \leq i \leq b-3} h_i 2^i$ (clamped); public key $A = [s]B$.

**Signing** of message $M$:
1. $r = H(h_b \| \cdots \| h_{2b-1} \| M)$ interpreted as integer (deterministic nonce).
2. $R = [r]B$.
3. $S = (r + H(R \| A \| M) \cdot s) \bmod \ell$.
4. Signature: $(R, S)$ (64 bytes for Ed25519).

**Verification**: check $[8S]B = [8]R + [8 \cdot H(R\|A\|M)]A$.

The factor of 8 accounts for the cofactor of the Edwards curve. Ed25519 uses the twisted Edwards curve $-x^2 + y^2 = 1 - (121665/121666)x^2 y^2$ over $\mathbb{F}_{2^{255}-19}$.

| Scheme | Key Size | Signature Size | Nonce | Security |
|--------|---------|---------------|-------|----------|
| RSA-PSS-2048 | 2048-bit | 256 bytes | Random | 112-bit |
| ECDSA-256 | 256-bit | 64 bytes | Random | 128-bit |
| Ed25519 | 256-bit | 64 bytes | Deterministic | 128-bit |
| BLS12-381 | 256-bit | 48 bytes | Deterministic | 128-bit |

## BLS Signatures: Pairing-Based Aggregation

**BLS signatures** (Boneh-Lynn-Shacham, 2001) use bilinear pairings to achieve **signature aggregation**: $n$ signatures can be compressed into one signature of the same size, verifiable in $n+1$ pairings (vs $n$ pairings for individual verification).

**Setup**: groups $G_1$, $G_2$ with generator $G_1$-generator $g_1$, $G_2$-generator $g_2$, bilinear pairing $e: G_1 \times G_2 \to G_T$; hash-to-curve $H: \{0,1\}^* \to G_1$.

**Key generation**: private $x \xleftarrow{\$} \mathbb{Z}_p$; public key $pk = [x]g_2 \in G_2$.

**Signing**: $\sigma = [x]H(m) \in G_1$.

**Verification**: check $e(\sigma, g_2) = e(H(m), pk)$:

$$e([x]H(m), g_2) = e(H(m), g_2)^x = e(H(m), [x]g_2) = e(H(m), pk) \checkmark$$

**Aggregation**: given signatures $\sigma_1 = [x_1]H(m), \ldots, \sigma_n = [x_n]H(m)$ on the same message from $n$ signers with public keys $pk_1, \ldots, pk_n$:

$$\sigma_{agg} = \sigma_1 + \cdots + \sigma_n = [(x_1 + \cdots + x_n)]H(m)$$

$$\text{Verify: } e(\sigma_{agg}, g_2) = e(H(m), pk_1 + \cdots + pk_n)$$

Only 2 pairings for any $n$. Ethereum 2.0 uses BLS12-381 for validator signatures, aggregating thousands of attestations per slot.

**Rogue-key attack**: a malicious signer can submit $pk_i' = pk_i \cdot (-pk_j)$ to cancel another's key. Defense: require a **proof of possession** (sign the public key itself) or use **hash-to-public-key** aggregation.

## Threshold and Ring Signatures

**Threshold signatures** ($t$-of-$n$): any $t$ of $n$ parties can collaboratively sign, but fewer than $t$ cannot. This is distinct from multisignatures (which require all $n$ signers).

**Shamir-based threshold ECDSA**: each party holds a share $x_i$ of the private key $x = \sum \lambda_i x_i$ (Shamir sharing). The challenge is that ECDSA requires $k^{-1}$ and $x \cdot r$ — multiplications of secret values. Modern constructions (GG18, CGGMP21) use:
- **Multiplicative-to-additive conversion** via oblivious transfer or Paillier encryption.
- **Zero-knowledge proofs** to verify each party's contribution.

A threshold ECDSA signing round produces a standard ECDSA signature — indistinguishable from a single-party signature.

**Ring signatures** allow a signer to sign on behalf of a group without revealing which member signed. Given public keys $(pk_1, \ldots, pk_n)$, the signer with private key $sk_i$ produces $\sigma$ such that:

$$\text{Verify}(m, \sigma, \{pk_1,\ldots,pk_n\}) = 1$$

but the verifier cannot identify $i$. Monero uses **CLSAG** (Concise Linkable Spontaneous Anonymous Group) signatures, which additionally detect if the same key signs twice (linkability) without revealing the key.

## Post-Quantum Signatures: CRYSTALS-Dilithium

**CRYSTALS-Dilithium** (NIST PQC standard, 2022) is a lattice-based signature scheme resistant to quantum attacks. Security is based on the hardness of **Module-LWE (MLWE)** and **Module-SIS (MSIS)** problems.

**Key generation**: sample matrix $\mathbf{A} \in R_q^{k \times \ell}$ (polynomials in $\mathbb{Z}_q[x]/(x^n+1)$), secret vectors $\mathbf{s}_1 \in R^{\ell}$ and $\mathbf{s}_2 \in R^k$ with small coefficients, compute $\mathbf{t} = \mathbf{A}\mathbf{s}_1 + \mathbf{s}_2$.

**Signing** (Fiat-Shamir with aborts):
1. Sample random $\mathbf{y} \in R^{\ell}$ with bounded coefficients.
2. Compute $\mathbf{w} = \mathbf{A}\mathbf{y}$; let $\mathbf{w}_1 = \text{HighBits}(\mathbf{w})$.
3. Compute challenge $c = H(\mu \| \mathbf{w}_1)$ (sparse polynomial in $R$).
4. Compute $\mathbf{z} = \mathbf{y} + c\mathbf{s}_1$; **abort and restart** if $\mathbf{z}$ or $\mathbf{r}_0 = \text{LowBits}(\mathbf{w} - c\mathbf{s}_2)$ have large coefficients.
5. Output $\sigma = (\mathbf{z}, h, c)$ where $h$ are hint bits.

The **rejection sampling** (abort-and-restart) ensures $\mathbf{z}$ has a distribution independent of $\mathbf{s}_1$, providing zero-knowledge.

| Scheme | Signature Size | Public Key | Quantum-Safe |
|--------|---------------|------------|--------------|
| ECDSA-256 | 64 bytes | 32 bytes | No |
| Ed25519 | 64 bytes | 32 bytes | No |
| Dilithium2 | 2420 bytes | 1312 bytes | Yes |
| FALCON-512 | 666 bytes | 897 bytes | Yes |
| SPHINCS+-128 | 8080 bytes | 32 bytes | Yes (hash-based) |
