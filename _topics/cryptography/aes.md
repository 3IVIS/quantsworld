---
title: "AES Block Cipher"
field: cryptography
description: The Advanced Encryption Standard, a symmetric block cipher operating on 128-bit blocks with Galois field arithmetic.
intro: >
  AES (Advanced Encryption Standard) has been the world's dominant symmetric cipher since NIST
  selected it in 2001. Its elegantly mathematical design — built entirely on Galois field
  arithmetic and linear algebra over $\text{GF}(2^8)$ — provides both proven algebraic
  structure and strong empirical resistance to all known attacks. AES encrypts virtually
  every TLS session, disk, and file in modern computing. Understanding its internals reveals
  how theoretical algebra translates directly into cryptographic security.
math_concepts:
  - group-theory
  - number-theory
  - linear-algebra
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Block Cipher Structure and Parameters

AES is a **substitution-permutation network (SPN)** operating on a **128-bit block** arranged as a $4 \times 4$ byte matrix called the **state**:

$$\text{State} = \begin{pmatrix} s_{0,0} & s_{0,1} & s_{0,2} & s_{0,3} \\ s_{1,0} & s_{1,1} & s_{1,2} & s_{1,3} \\ s_{2,0} & s_{2,1} & s_{2,2} & s_{2,3} \\ s_{3,0} & s_{3,1} & s_{3,2} & s_{3,3} \end{pmatrix}$$

Key sizes and round counts:

| Key Size | Rounds | Security Level |
|----------|--------|---------------|
| 128-bit | 10 | 128-bit |
| 192-bit | 12 | 192-bit |
| 256-bit | 14 | 256-bit |

Each round (except the last) applies four transformations in sequence: **SubBytes**, **ShiftRows**, **MixColumns**, **AddRoundKey**. The final round omits MixColumns.

## Galois Field Arithmetic: GF(2⁸)

All AES operations occur in the finite field $\text{GF}(2^8) = \mathbb{F}_{2^8}$, whose elements are degree-$\leq 7$ polynomials over $\mathbb{F}_2$, i.e., 8-bit bytes interpreted as polynomials:

$$\text{byte } b_7 b_6 b_5 b_4 b_3 b_2 b_1 b_0 \leftrightarrow b_7 x^7 + b_6 x^6 + \cdots + b_1 x + b_0$$

**Addition** is XOR (coefficient addition mod 2): no carries, no overflow.

**Multiplication** is polynomial multiplication modulo the irreducible polynomial:

$$p(x) = x^8 + x^4 + x^3 + x + 1 \pmod{2}$$

AES chose this specific polynomial. For example, $\{57\} \cdot \{83\}$ in hex (where braces denote GF(2⁸) elements):

$$(x^6+x^4+x^2+x+1)(x^7+x+1) \bmod p(x) = \{c1\}$$

The fundamental building block is **xtime**: multiplication by $x$ (i.e., $\{02\}$):

$$\text{xtime}(b) = \begin{cases} b \ll 1 & \text{if } b_7 = 0 \\ (b \ll 1) \oplus \{1b\} & \text{if } b_7 = 1 \end{cases}$$

where $\{1b\} = 0001\,1011_2$ is $p(x) \bmod x^8$. Any GF(2⁸) multiplication can be computed with repeated xtime and XOR, enabling efficient hardware implementation without general multipliers.

## SubBytes: The S-Box

**SubBytes** applies a nonlinear substitution $S: \text{GF}(2^8) \to \text{GF}(2^8)$ to each byte independently. The S-box is constructed in two steps:

**Step 1**: Compute the **multiplicative inverse** in $\text{GF}(2^8)$ (with $S(0) = 0$):

$$b = a^{-1} \in \text{GF}(2^8), \quad \text{i.e., } a \cdot b = 1 \bmod p(x)$$

The inverse can be computed via Fermat's little theorem: $a^{-1} = a^{2^8 - 2} = a^{254}$ in $\text{GF}(2^8)$.

**Step 2**: Apply an **affine transformation** over $\text{GF}(2)$ (bitwise):

$$s_i = b_i \oplus b_{(i+4)\bmod 8} \oplus b_{(i+5)\bmod 8} \oplus b_{(i+6)\bmod 8} \oplus b_{(i+7)\bmod 8} \oplus c_i$$

where $c = \{63\} = 0110\,0011_2$ is a constant. In matrix form:

$$\mathbf{s} = M \mathbf{b} \oplus \mathbf{c}$$

$$M = \begin{pmatrix} 1&0&0&0&1&1&1&1 \\ 1&1&0&0&0&1&1&1 \\ 1&1&1&0&0&0&1&1 \\ 1&1&1&1&0&0&0&1 \\ 1&1&1&1&1&0&0&0 \\ 0&1&1&1&1&1&0&0 \\ 0&0&1&1&1&1&1&0 \\ 0&0&0&1&1&1&1&1 \end{pmatrix}$$

The inversion provides **algebraic complexity** (no simple polynomial over $\text{GF}(2^8)$), while the affine step defeats attacks on the pure inverse map. The S-box has **maximum nonlinearity** and was specifically designed to minimize differential and linear approximation probabilities.

## ShiftRows and MixColumns

**ShiftRows** cyclically shifts each row of the state matrix by a different offset:

- Row 0: no shift
- Row 1: shift left by 1
- Row 2: shift left by 2
- Row 3: shift left by 3

This provides **inter-column diffusion**: bytes from each column are spread across all columns after the shift.

**MixColumns** applies a linear transformation to each column, treating it as a degree-3 polynomial over $\text{GF}(2^8)$ and multiplying modulo $x^4 + 1$:

$$\begin{pmatrix} s'_0 \\ s'_1 \\ s'_2 \\ s'_3 \end{pmatrix} = \begin{pmatrix} 02 & 03 & 01 & 01 \\ 01 & 02 & 03 & 01 \\ 01 & 01 & 02 & 03 \\ 03 & 01 & 01 & 02 \end{pmatrix} \begin{pmatrix} s_0 \\ s_1 \\ s_2 \\ s_3 \end{pmatrix}$$

where all entries and arithmetic are in $\text{GF}(2^8)$. The matrix $M$ was chosen so that every $4 \times 4$ submatrix formed by taking any 4 columns from the combined $[M \| I]$ is invertible — making it a **Maximum Distance Separable (MDS) matrix** with branch number 5.

**Branch number**: the minimum number of active bytes in input plus output of MixColumns is 5, meaning any nonzero input with $w$ active bytes produces an output with at least $5 - w$ active bytes. This is the maximum possible for a $4 \times 4$ MDS code.

## Key Schedule and AddRoundKey

**AddRoundKey** XORs the current state with a 128-bit **round key** derived from the original key. For AES-128, the key schedule expands the 128-bit key into $11 \times 128 = 1408$ bits of round key material.

The key schedule operates on 32-bit words $w_0, w_1, \ldots, w_{43}$:

- Initial words: $w_0, w_1, w_2, w_3$ = the original key words.
- For $i \geq 4$:
  - If $i \equiv 0 \pmod 4$: $w_i = w_{i-4} \oplus \text{SubWord}(\text{RotWord}(w_{i-1})) \oplus \text{Rcon}[i/4]$
  - Otherwise: $w_i = w_{i-4} \oplus w_{i-1}$

**RotWord** rotates a word left by one byte. **SubWord** applies SubBytes to each byte of the word. **Rcon** are round constants: $\text{Rcon}[i] = (x^{i-1}, 0, 0, 0)$ in $\text{GF}(2^8)$.

## Modes of Operation

AES is a block cipher; **modes of operation** adapt it to encrypt streams of arbitrary length:

**CBC (Cipher Block Chaining)**:

$$C_i = E_K(P_i \oplus C_{i-1}), \quad C_0 = IV$$

Sequential — cannot be parallelized for encryption (but can for decryption). A bit flip in ciphertext corrupts one block and propagates a specific pattern to the next.

**CTR (Counter Mode)**:

$$C_i = P_i \oplus E_K(\text{nonce} \| i)$$

Fully parallelizable; turns AES into a stream cipher. Random access is possible. The nonce must never repeat with the same key.

**GCM (Galois/Counter Mode)** = CTR encryption + GHASH authentication:

$$\text{GHASH}(H, C) = \bigoplus_i C_i \cdot H^{n-i+1} \in \text{GF}(2^{128})$$

where $H = E_K(0^{128})$ is the authentication key and multiplication is in $\text{GF}(2^{128})$ modulo $x^{128}+x^7+x^2+x+1$.

**AES-GCM** is an **authenticated encryption with associated data (AEAD)** scheme providing both confidentiality and integrity in a single pass. It is the mandatory cipher suite in TLS 1.3.

## Security: Wide Trail Strategy and Side Channels

AES's security argument uses the **wide trail strategy** (Daemen and Rijmen): track how differences and linear masks propagate through rounds. The two-round **active S-box** lower bound is $\geq 25$ active S-boxes, where each S-box has maximum differential probability $2^{-6}$.

Over the full 10 rounds:

$$\Pr[\text{differential characteristic}] \leq (2^{-6})^{25} = 2^{-150}$$

This makes differential cryptanalysis infeasible with far fewer than $2^{128}$ plaintexts.

**Known-key distinguishers** exist for reduced-round AES (up to 8 rounds), but full AES-128 has no attack faster than $2^{126.1}$ (biclique attack, 2011) — barely below exhaustive search and impractical.

**Side-channel attacks** are a serious practical concern:

| Attack | Method | Mitigation |
|--------|--------|-----------|
| Cache-timing | Table lookup timing leaks key | Bitsliced implementation |
| Power analysis | Power consumption correlates with S-box output | Hardware masking |
| Fault injection | Induce errors during decryption | Error detection |
| Template attacks | Statistical profiling | Constant-time code |

Hardware AES-NI instructions (available on x86 since Westmere, ARM since Cortex-A53) provide constant-time AES operations, mitigating most timing side channels.
