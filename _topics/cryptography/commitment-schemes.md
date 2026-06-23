---
title: "Commitment Schemes"
field: cryptography
description: Cryptographic primitives allowing a party to commit to a value while keeping it hidden, and later reveal it with a binding guarantee.
intro: >
  A commitment scheme is the digital analogue of a sealed envelope: a committer can lock a
  value inside, and later open it to prove the original choice. The scheme guarantees that
  the value cannot be changed after commitment (binding) and is not revealed before opening
  (hiding). Commitments are foundational building blocks in zero-knowledge proofs, secure
  multi-party computation, blockchain protocols, and auction systems. Advanced variants —
  Pedersen, KZG polynomial commitments — enable efficient proofs about committed values
  without revealing them.
math_concepts:
  - group-theory
  - number-theory
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Hiding and Binding Properties

A commitment scheme consists of three algorithms:
- **Setup**: generate public parameters $pp$.
- **Commit**: $(c, d) \leftarrow \text{Commit}(pp, m; r)$ — outputs commitment $c$ and decommitment (opening) $d$ for message $m$ using randomness $r$.
- **Verify**: $\{0,1\} \leftarrow \text{Open}(pp, c, m, d)$ — check that $d$ is a valid opening of $c$ to $m$.

**Hiding**: the commitment $c$ reveals no information about $m$. Formally:

$$\text{Perfect hiding: } \forall m_0, m_1,\; c_0 \text{ and } c_1 \text{ are identically distributed}$$
$$\text{Computational hiding: } c_0 \text{ and } c_1 \text{ are computationally indistinguishable}$$

**Binding**: it is hard to open $c$ to two different values. Formally:

$$\text{Computational binding: no PPT adversary finds } (c, m, d, m', d') \text{ with } m \neq m' \text{ and both openings valid}$$
$$\text{Perfect/statistical binding: impossible or negligible probability even unbounded adversary}$$

**Fundamental tension**: a commitment scheme cannot simultaneously achieve **perfect hiding** and **perfect binding**. This follows from information theory: perfect hiding means $c$ is independent of $m$ (uniform distribution), so the committer can always find alternative openings. Perfect binding means $c$ uniquely determines $m$. Both can hold computationally under hardness assumptions.

| Scheme | Hiding | Binding | Assumption |
|--------|--------|---------|-----------|
| Hash commitment $H(m \| r)$ | Computational | Computational | Collision resistance |
| Pedersen commitment | Perfect | Computational | DLog |
| Elgamal commitment | Computational | Perfect | DDH |

## Pedersen Commitments

**Pedersen commitments** (1991) are the most widely used commitment scheme in cryptographic protocols. They are perfectly hiding and computationally binding under the discrete logarithm assumption.

**Setup**: prime-order group $G = \langle g \rangle$ with order $q$; choose $h = g^\alpha$ for unknown $\alpha$ (generated as $h = H(\text{context})$ via hash-to-group, so no one knows $\alpha$).

**Commit** to message $m \in \mathbb{Z}_q$ with randomness $r \xleftarrow{\$} \mathbb{Z}_q$:

$$C = g^m h^r \in G$$

**Open**: reveal $(m, r)$; verifier checks $C = g^m h^r$.

**Perfect hiding**: for any $m$, the distribution of $C = g^m h^r$ over uniform $r$ is the uniform distribution on $G$ — because $r \mapsto g^m h^r$ is a bijection. Thus $C$ reveals zero information about $m$.

**Computational binding**: to equivocate (open to $m' \neq m$), find $r'$ with $g^m h^r = g^{m'} h^{r'}$, which requires $g^{m-m'} = h^{r'-r} = g^{\alpha(r'-r)}$, i.e., $\alpha = (m-m')/(r'-r) \bmod q$ — solving discrete log for $h$.

**Homomorphic property**: Pedersen commitments are **additively homomorphic**:

$$C(m_1, r_1) \cdot C(m_2, r_2) = g^{m_1+m_2} h^{r_1+r_2} = C(m_1+m_2, r_1+r_2)$$

This enables commitments to sums, inner products, and more complex relations without opening individual values.

**Vector commitments**: commit to a vector $(m_1, \ldots, m_n)$ using independent generators $g_1, \ldots, g_n$:

$$C = g_1^{m_1} g_2^{m_2} \cdots g_n^{m_n} h^r$$

## Hash-Based and Merkle Commitments

**Hash commitment**: the simplest scheme. Commit to $m$ with randomness $r$: $c = H(m \| r)$. Open by revealing $(m, r)$.

Security: computationally hiding (preimage resistance) and computationally binding (collision resistance). Both properties hold under standard assumptions on $H$.

**Merkle tree commitment** to a vector $(m_1, \ldots, m_N)$ (with $N = 2^k$):

$$\text{Leaf}_i = H(m_i), \qquad \text{Node}_{i,j} = H(\text{Node}_{i+1,2j} \| \text{Node}_{i+1,2j+1})$$

The root $\text{rt}$ commits to all $N$ values. An **opening proof** for position $i$ consists of the $O(\log N)$ sibling hashes along the path from leaf $i$ to the root — a **Merkle path**. Verification requires $O(\log N)$ hash computations.

**Constant-time updates**: changing $m_i$ requires updating only $O(\log N)$ nodes. This makes Merkle trees efficient for dynamic commitment to large datasets (UTXO sets, state tries).

## KZG Polynomial Commitments

**KZG commitments** (Kate, Zaverucha, Goldberg, 2010) commit to a polynomial $f \in \mathbb{F}_p[x]$ and later prove the value $f(z) = y$ for any evaluation point $z$, using a single group element as proof.

**Setup** (trusted): sample secret $\tau \xleftarrow{\$} \mathbb{F}_p$; publish **structured reference string**:

$$\text{SRS} = \left([1]_1, [\tau]_1, [\tau^2]_1, \ldots, [\tau^d]_1, [1]_2, [\tau]_2\right)$$

where $[x]_k = [x]G_k$ is scalar multiplication in groups $G_1, G_2$ with bilinear pairing $e: G_1 \times G_2 \to G_T$.

**Commit** to $f(x) = \sum_{i=0}^d a_i x^i$:

$$[f(\tau)]_1 = \sum_{i=0}^d a_i [\tau^i]_1$$

This is computable from the SRS without knowing $\tau$. The commitment is a single $G_1$ element (48 bytes on BLS12-381).

**Evaluation proof**: to prove $f(z) = y$, observe that $(f(x) - y)$ has $(x-z)$ as a factor:

$$f(x) - y = (x - z) \cdot q(x) \quad \text{(quotient polynomial)}$$

Compute the quotient $q$ and publish the proof:

$$\pi = [q(\tau)]_1$$

**Verification**: check using the pairing:

$$e\!\left([f(\tau)]_1 - [y]_1,\; [1]_2\right) = e\!\left(\pi,\; [\tau]_2 - [z]_2\right)$$

Expanding: $e\!\left([(f(\tau)-y)]_1, [1]_2\right) = e\!\left([q(\tau)]_1, [\tau - z]_2\right) = e([(f(\tau)-y)/({\tau-z})]_1, [\tau-z]_2)$. This checks that $f(\tau) - y = q(\tau)(\tau - z)$ — i.e., $\tau$ is a root of $f(x) - y - q(x)(x-z) = 0$, which (by binding of $\tau$) implies $f(z) = y$.

**Properties**:

| Property | Value |
|----------|-------|
| Commitment size | 1 group element (48 B) |
| Proof size | 1 group element (48 B) |
| Verification cost | 2 pairings |
| Batch verification | $O(1)$ pairings for $n$ openings |
| Trusted setup | Yes (circuit-universal) |

KZG polynomial commitments are used in **EIP-4844** (Ethereum's blob transactions) and as the polynomial oracle in PLONK and Marlin proving systems.

## Applications: Blockchain and Zero-Knowledge

**Blockchain applications**:

- **UTXO commitments** (Mimblewimble): each transaction output is a Pedersen commitment $g^v h^r$ to its value $v$. Transaction validity requires the sum of output commitments to equal input commitments (homomorphic balance check), without revealing any values.

- **EIP-4844 (Proto-Danksharding)**: Ethereum data availability uses KZG commitments to 4096-element blobs. Validators can sample random positions and verify inclusion proofs ($O(1)$ per proof) — enabling **data availability sampling** for light clients.

- **Verkle trees**: replace Merkle trees with vector commitments based on inner-product arguments. Each node commits to its $n$ children with a single constant-size commitment; witnesses are $O(\log N)$ group elements (vs $O(\log N)$ hashes for Merkle, but with smaller constants for large branching factor).

**Equivocal commitments**: some protocols require commitments that are binding during normal operation but can be equivocated by a trusted party (e.g., the simulator in a zero-knowledge proof). Pedersen commitments achieve this: anyone knowing $\alpha = \log_g h$ can equivocate any commitment, since $g^m h^r = g^{m'}h^{r'}$ requires $r' = r + (m-m')/\alpha$.

**Statistically hiding vs computationally binding tradeoffs**: Pedersen is statistically hiding / computationally binding. Flipping this (computationally hiding / statistically binding) requires using hash commitments or special constructions. The tradeoff determines which party needs computational assumptions: a quantum-unbounded verifier requires computational binding; a quantum-unbounded prover requires computational hiding.
