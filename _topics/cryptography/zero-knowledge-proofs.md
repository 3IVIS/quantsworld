---
title: "Zero-Knowledge Proofs"
field: cryptography
description: Interactive or non-interactive protocols enabling a prover to convince a verifier of a statement's truth without revealing any additional information.
intro: >
  A zero-knowledge proof allows a prover to convince a verifier that some statement is true —
  say, that they know a secret, or that a computation was done correctly — without revealing
  anything beyond the bare fact of truth. Formalised by Goldwasser, Micali, and Rackoff in 1985,
  ZKPs have moved from theoretical curiosity to practical deployment in privacy-preserving
  blockchains, anonymous credentials, and scalable computation via zk-rollups. Modern systems
  like Groth16 and zk-STARKs can prove the correct execution of arbitrary programs in
  milliseconds.
math_concepts:
  - number-theory
  - group-theory
  - information-theory
difficulty: expert
difficulty_level: 5
read_time: 16
---

## Completeness, Soundness, and Zero-Knowledge

A **proof system** for a language $\mathcal{L}$ is a pair of algorithms $(\mathcal{P}, \mathcal{V})$ satisfying:

**Completeness**: if $x \in \mathcal{L}$ with witness $w$, an honest prover always convinces the verifier:

$$\Pr[\langle \mathcal{P}(x,w), \mathcal{V}(x) \rangle = 1] = 1$$

**Soundness**: if $x \notin \mathcal{L}$, no cheating prover $\mathcal{P}^*$ can convince the verifier except with negligible probability (the **soundness error** $\varepsilon$):

$$\forall \mathcal{P}^*: \Pr[\langle \mathcal{P}^*(x), \mathcal{V}(x) \rangle = 1] \leq \varepsilon$$

**Zero-knowledge**: the verifier learns nothing beyond $x \in \mathcal{L}$. Formally, there exists a probabilistic polynomial-time **simulator** $\mathcal{S}$ such that for all $x \in \mathcal{L}$ and all verifiers $\mathcal{V}^*$:

$$\text{View}_{\mathcal{V}^*}[\langle \mathcal{P}(x,w), \mathcal{V}^*(x) \rangle] \approx_c \mathcal{S}^{\mathcal{V}^*}(x)$$

The simulator can produce transcripts indistinguishable from real interactions **without knowing the witness**. This captures that the verifier could have generated the transcript itself, so no information was transferred.

Strength levels: **perfect ZK** (identical distributions), **statistical ZK** (statistically close), **computational ZK** (computationally indistinguishable).

## Schnorr Identification Protocol

The **Schnorr protocol** is the paradigmatic $\Sigma$-protocol for proving knowledge of a discrete logarithm. Let $G$ be a group of prime order $q$, $g$ a generator, and public key $Y = g^x$ (the prover knows $x$).

**Round 1 (Commit)**: $\mathcal{P}$ samples $r \xleftarrow{\$} \mathbb{Z}_q$, sends commitment $R = g^r$.

**Round 2 (Challenge)**: $\mathcal{V}$ sends random challenge $c \xleftarrow{\$} \mathbb{Z}_q$.

**Round 3 (Response)**: $\mathcal{P}$ sends $s = r + cx \bmod q$.

**Verification**: $\mathcal{V}$ checks $g^s \stackrel{?}{=} R \cdot Y^c$.

$$g^s = g^{r+cx} = g^r \cdot g^{cx} = R \cdot Y^c \checkmark$$

**Zero-knowledge**: the simulator picks $c$ and $s$ at random, sets $R = g^s Y^{-c}$ — this produces a valid transcript without knowing $x$. The distribution is identical to the real protocol since $R$ is uniformly distributed in both cases.

**Soundness**: if a prover can answer two distinct challenges $c \neq c'$ for the same commitment $R$, then from responses $s = r + cx$ and $s' = r + c'x$:

$$x = \frac{s - s'}{c - c'} \bmod q$$

So a successful cheater can be used to extract the witness — this is **special soundness**.

## Sigma Protocols and Compositions

A **$\Sigma$-protocol** is a 3-move protocol (commit–challenge–respond) satisfying completeness, special soundness, and special honest-verifier zero-knowledge (SHVZK). Schnorr is the canonical example.

$\Sigma$-protocols compose to prove complex statements:

**AND composition**: to prove knowledge of $x_1, x_2$ such that $Y_1 = g^{x_1}$ AND $Y_2 = g^{x_2}$, run both protocols with the same challenge and send both responses. Commitments $R_1, R_2$ are sent together.

**OR composition** (Cramer, Damgård, Schoenmakers): to prove knowledge of $x_1$ OR $x_2$ (without revealing which), the prover simulates the branch for the unknown witness:

1. For the known branch (say $x_1$): sample $r$, compute $R_1 = g^r$.
2. For the unknown branch: sample $c_2, s_2$ at random, compute $R_2 = g^{s_2} Y_2^{-c_2}$ (simulator).
3. On receiving challenge $c$, set $c_1 = c \oplus c_2$ and respond with $s_1 = r + c_1 x_1$.
4. Output $(c_1, s_1), (c_2, s_2)$ — verifier checks both and that $c_1 \oplus c_2 = c$.

This proves disjunctions with no information about which branch is true.

## Fiat-Shamir Heuristic

The **Fiat-Shamir transform** converts any public-coin interactive proof into a **non-interactive** proof in the **random oracle model**. The key idea: replace the verifier's random challenge with the hash of the prover's commitment and public inputs.

For Schnorr:

$$c = H(Y, R), \qquad s = r + cx \bmod q$$

**Non-interactive proof**: $(R, s)$ — the verifier recomputes $c = H(Y, R)$ and checks $g^s = R \cdot Y^c$.

Security: in the random oracle model, the adversary must query $H$ before it can respond; a rewinding argument shows soundness. In practice, $H$ is instantiated with SHA-256 or SHA-3 with domain separation.

The Fiat-Shamir transform is the foundation of practically all non-interactive zero-knowledge schemes: Schnorr signatures are simply Fiat-Shamir applied to the Schnorr protocol, and zk-SNARKs like Groth16 use it to eliminate the need for an online verifier.

## Arithmetic Circuits, R1CS, and QAP

Modern **zk-SNARKs** prove arbitrary computations by encoding them as polynomial constraints. The pipeline:

**Step 1: Arithmetic circuit**. Express the computation as a directed acyclic circuit over a prime field $\mathbb{F}_p$, with addition and multiplication gates. For example, proving knowledge of $x, y$ with $x^3 + x + y = z$:

$$\text{Gate 1: } w_1 = x \cdot x \quad \text{Gate 2: } w_2 = w_1 \cdot x \quad \text{Gate 3: } w_3 = w_2 + x + y$$

**Step 2: Rank-1 Constraint System (R1CS)**. Each multiplication gate becomes a constraint $\mathbf{a} \cdot \mathbf{w} \times \mathbf{b} \cdot \mathbf{w} = \mathbf{c} \cdot \mathbf{w}$, where $\mathbf{w}$ is the witness vector $(1, x, y, z, w_1, w_2, w_3)$ and $\mathbf{a}, \mathbf{b}, \mathbf{c}$ are selector vectors. A valid assignment satisfies all constraints.

**Step 3: Quadratic Arithmetic Program (QAP)**. Encode R1CS constraints as polynomial divisibility. Choose evaluation points $\{r_1, \ldots, r_m\}$ and construct polynomials $A_i(x), B_i(x), C_i(x)$ via Lagrange interpolation such that:

$$\left(\sum_i w_i A_i(x)\right)\left(\sum_i w_i B_i(x)\right) - \sum_i w_i C_i(x) = H(x) \cdot Z(x)$$

where $Z(x) = \prod_j (x - r_j)$ is the **target polynomial**. A valid witness makes the left side divisible by $Z$, i.e., $H(x)$ exists as a polynomial.

## Groth16 zk-SNARK

**Groth16** (Groth, 2016) is the most efficient zk-SNARK in practice, producing proofs of only 3 group elements (~200 bytes) with constant-time verification. It requires a **trusted setup** generating a **structured reference string (SRS)** specific to the circuit.

**Setup**: sample toxic waste $(\alpha, \beta, \gamma, \delta, \tau)$, output:

$$\sigma = \left([\alpha]_1, [\beta]_1, [\beta]_2, [\delta]_1, [\delta]_2, \left[\frac{\tau^i \cdot A_j(\tau)}{\gamma}\right]_1, \ldots\right)$$

where $[x]_1 = [x]G_1$ denotes scalar multiplication in $G_1$ (elliptic curve group).

**Proof**: $\pi = ([A]_1, [B]_2, [C]_1)$ computed by the prover from the witness.

**Verification** (2 pairing checks):

$$e([A]_1, [B]_2) = e([\alpha]_1, [\beta]_2) \cdot e\!\left(\sum_i w_i \left[\frac{A_i(\tau)}{\gamma}\right]_1, [\gamma]_2\right) \cdot e([C]_1, [\delta]_2)$$

| Property | Groth16 | PLONK | STARKs |
|----------|---------|-------|--------|
| Proof size | ~200 bytes | ~400 bytes | 10–100 KB |
| Verify time | ~2 ms | ~5 ms | ~10 ms |
| Setup | Circuit-specific | Universal | Transparent |
| Quantum-safe | No | No | Yes |

## zk-STARKs: Transparent and Scalable

**zk-STARKs** (Scalable Transparent ARguments of Knowledge) eliminate the trusted setup, using only a public random hash function. Security relies on collision-resistant hash functions rather than elliptic curve pairings.

**Core components**:

1. **Algebraic Intermediate Representation (AIR)**: encode computation as polynomial constraints over an execution trace. For a computation of $T$ steps, the trace is a matrix of field elements.

2. **FRI (Fast Reed-Solomon IOP of Proximity)**: the key protocol. The prover commits to a polynomial $f$ of degree $< d$ by showing that a committed function is "close to" a low-degree polynomial. FRI uses a recursive folding argument:

$$f(x) = f_E(x^2) + x \cdot f_O(x^2)$$

where $f_E$ and $f_O$ are the even and odd parts. Each folding halves the degree, yielding $O(\log d)$ rounds.

3. **Proof composition**: the verifier's checks themselves form a computation that can be recursively proven, enabling proof aggregation.

**Proof size**: $O(\log^2 T)$ field elements — larger than SNARKs but post-quantum secure and requiring no trusted setup. STARKs are used by StarkWare's StarkEx and StarkNet for Ethereum L2 scaling.
