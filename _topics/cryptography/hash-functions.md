---
title: "Cryptographic Hash Functions"
field: cryptography
description: Deterministic functions mapping arbitrary-length input to fixed-length digests with collision resistance and preimage resistance.
intro: >
  A cryptographic hash function compresses arbitrary-length data into a fixed-size digest in a
  way that is practically impossible to reverse or to find collisions. These properties underpin
  digital signatures, message authentication codes, password storage, and data integrity
  verification. Modern hash functions like SHA-256 and SHA-3 are designed to resist not only
  direct algebraic attacks but also length-extension attacks, differential cryptanalysis, and
  quantum speedups.
math_concepts:
  - information-theory
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Security Properties

A hash function $H: \{0,1\}^* \to \{0,1\}^n$ must satisfy three fundamental properties:

**Preimage resistance** (one-wayness): given $y$, it is computationally infeasible to find any $x$ such that $H(x) = y$. The best generic attack is exhaustive search over inputs, costing $O(2^n)$ evaluations.

**Second preimage resistance**: given $x_1$, it is infeasible to find $x_2 \neq x_1$ with $H(x_1) = H(x_2)$. This prevents an attacker from substituting a different document with the same hash. Generic cost: $O(2^n)$.

**Collision resistance**: it is infeasible to find any pair $(x_1, x_2)$ with $x_1 \neq x_2$ and $H(x_1) = H(x_2)$. This is weaker than second preimage resistance — the attacker has more freedom — and the generic attack is much cheaper due to the birthday paradox.

The three properties form a hierarchy: collision resistance $\Rightarrow$ second preimage resistance $\Rightarrow$ one-wayness (under standard assumptions).

| Property | Adversary Goal | Generic Attack Cost |
|----------|---------------|-------------------|
| Preimage resistance | Find $x$ from $y=H(x)$ | $2^n$ |
| Second preimage resistance | Find $x_2$ from $x_1$ | $2^n$ |
| Collision resistance | Find any $(x_1, x_2)$ pair | $2^{n/2}$ |

## The Birthday Paradox and Collision Bound

The birthday paradox explains why collision resistance requires $2n$ bits for $n$-bit security. If we evaluate $H$ on $q$ randomly chosen inputs, the probability of at least one collision is approximately:

$$\Pr[\text{collision}] \approx 1 - e^{-q(q-1)/(2 \cdot 2^n)} \approx 1 - e^{-q^2/2^{n+1}}$$

For this probability to reach $1/2$, we need:

$$q \approx \sqrt{2^n \ln 2} \approx 0.83 \cdot 2^{n/2}$$

This means a hash function with $n$-bit output provides only $n/2$ bits of **collision resistance**. For 128-bit collision security, SHA-256 ($n = 256$) is required. SHA-1 ($n = 160$) provides only 80-bit collision security — now broken by actual collision attacks requiring $2^{63}$ operations (the SHAttered attack, 2017).

**Grover's algorithm** on a quantum computer finds preimages in $O(2^{n/2})$ operations, halving the effective security level. For 128-bit post-quantum security, $n = 256$ is again required.

## Merkle-Damgård Construction

The **Merkle-Damgård (MD) construction** turns a fixed-length **compression function** $f: \{0,1\}^{n+b} \to \{0,1\}^n$ into a variable-length hash function. Given message $M$:

1. **Pad** $M$ to a multiple of the block size $b$: append a 1-bit, then zeros, then the 64-bit message length (this is **Merkle-Damgård strengthening**).
2. Split into blocks $M_1, M_2, \ldots, M_k$.
3. Initialize $H_0 = IV$ (a fixed public constant).
4. Iterate: $H_i = f(H_{i-1} \| M_i)$ for $i = 1, \ldots, k$.
5. Output $H_k$.

$$IV \xrightarrow{M_1} H_1 \xrightarrow{M_2} H_2 \xrightarrow{\cdots} H_{k-1} \xrightarrow{M_k \| \text{length}} H_k$$

**MD theorem**: if $f$ is collision-resistant, then the MD construction is collision-resistant.

**Length extension attack**: a critical weakness. Given $H(M)$ and $|M|$ (but not $M$), an attacker can compute $H(M \| \text{pad} \| M')$ for any suffix $M'$, without knowing $M$. This breaks naive HMAC constructions like $H(K \| M)$. SHA-3 and BLAKE2 are immune; SHA-2 is vulnerable.

## SHA-2: Compression Function and Message Schedule

SHA-256 uses a Davies-Meyer construction for its compression function, based on an **ARX** (add-rotate-XOR) design. The state consists of eight 32-bit words $(a, b, c, d, e, f, g, h)$ initialized to IV (fractional parts of square roots of first 8 primes).

**Message schedule**: expand the 16-word (512-bit) input block into 64 words:

$$W_t = \sigma_1(W_{t-2}) + W_{t-7} + \sigma_0(W_{t-15}) + W_{t-16}, \quad t = 16, \ldots, 63$$

where the rotation functions are:

$$\sigma_0(x) = \text{ROTR}^7(x) \oplus \text{ROTR}^{18}(x) \oplus \text{SHR}^3(x)$$
$$\sigma_1(x) = \text{ROTR}^{17}(x) \oplus \text{ROTR}^{19}(x) \oplus \text{SHR}^{10}(x)$$

**Round function** (64 rounds):

$$T_1 = h + \Sigma_1(e) + \text{Ch}(e,f,g) + K_t + W_t$$
$$T_2 = \Sigma_0(a) + \text{Maj}(a,b,c)$$

where $\text{Ch}(e,f,g) = (e \wedge f) \oplus (\neg e \wedge g)$ (choose), $\text{Maj}(a,b,c) = (a \wedge b) \oplus (a \wedge c) \oplus (b \wedge c)$ (majority), and $K_t$ are constants derived from cube roots of primes. After 64 rounds, add the round outputs to the input state (**Davies-Meyer feed-forward**).

## SHA-3: Keccak Sponge Construction

SHA-3 uses the **sponge construction**, a fundamentally different paradigm from MD. The sponge has an internal **state** of $b = 1600$ bits, divided into a **rate** $r$ and **capacity** $c = b - r$.

**Absorbing phase**: XOR each $r$-bit message block into the rate portion of the state, then apply the **Keccak-f[1600] permutation** $f$.

**Squeezing phase**: output $r$ bits of state; apply $f$ again if more output is needed.

$$\text{State}^{(0)} = 0^b, \quad \text{State}^{(i)} = f(\text{State}^{(i-1)} \oplus (M_i \| 0^c)), \quad \text{Digest} = \text{truncate}(\text{State}^{(k)}, n)$$

The Keccak-f permutation is a sequence of 24 rounds, each consisting of 5 steps (theta, rho, pi, chi, iota) operating on a $5 \times 5 \times 64$ array of bits.

**Security**: collision resistance is $\min(2^{c/2}, 2^n)$. SHA3-256 uses $r = 1088$, $c = 512$, giving $2^{256}$ collision security. The capacity $c$ absorbs the birthday-paradox factor: an attacker controlling the rate cannot influence the capacity bits without going through the permutation.

**No length extension**: because the capacity bits are never revealed and the final output is squeezed (not the raw state), length extension attacks are impossible.

## HMAC and Password Hashing

**HMAC** (Hash-based MAC) provides message authentication using a secret key $K$:

$$\text{HMAC}(K, M) = H\!\left((K \oplus \text{opad}) \| H((K \oplus \text{ipad}) \| M)\right)$$

where $\text{ipad} = 0x36\ldots36$ and $\text{opad} = 0x5C\ldots5C$ are padding constants. The nested hash structure defeats length extension attacks and is provably secure under mild assumptions on $H$.

**Merkle trees** use hash functions to enable efficient integrity checking of large datasets. For a dataset $\{d_1, \ldots, d_n\}$:

$$\text{Leaf}_i = H(d_i), \qquad \text{Parent} = H(\text{Left} \| \text{Right})$$

The **root hash** commits to all data; a **Merkle proof** for item $d_i$ requires only $O(\log n)$ sibling hashes, enabling logarithmic-size inclusion proofs. Merkle trees underpin Git, Bitcoin, certificate transparency, and IPFS.

**Password hashing** requires functions intentionally made slow to resist brute-force attacks:

| Function | Memory-Hard | Iterations | Notes |
|----------|------------|-----------|-------|
| bcrypt | No | Work factor $2^k$ | Fixed 72-byte input limit |
| scrypt | Yes | $N, r, p$ params | PBKDF2 + blockmix |
| Argon2id | Yes | Time + memory params | NIST/RFC 9106 recommended |

**Argon2id** is the current recommendation, filling a configurable amount of memory with pseudorandom data (preventing ASIC parallelism) while also iterating the compression multiple times (preventing time-memory tradeoffs).
