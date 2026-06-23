---
title: "Secret Sharing Schemes"
field: cryptography
description: Methods for distributing a secret among multiple parties so that only authorized subsets can reconstruct it.
intro: >
  Secret sharing distributes a secret $s$ among $n$ parties such that any $t$ parties can
  reconstruct $s$, but any $t-1$ parties learn nothing. Shamir's scheme (1979) achieves this
  with information-theoretic security using polynomial interpolation over a finite field —
  even an adversary with unlimited computational power cannot distinguish shares from noise.
  Secret sharing is the foundation of threshold cryptography, secure multi-party computation,
  and distributed key management, underpinning systems from cryptocurrency hardware wallets
  to distributed signing in cloud HSMs.
math_concepts:
  - number-theory
  - linear-algebra
  - probability-theory
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Shamir's Secret Sharing

**Shamir's $(t, n)$-threshold scheme** distributes a secret $s \in \mathbb{F}_p$ (a prime field element) among $n$ parties such that any $t$ shares suffice to recover $s$, but any $t-1$ shares give no information.

**Sharing** (dealer holds secret $s$):
1. Choose a prime $p > \max(s, n)$.
2. Sample $t-1$ uniformly random coefficients $a_1, a_2, \ldots, a_{t-1} \xleftarrow{\$} \mathbb{F}_p$.
3. Construct the secret polynomial $f(x) = s + a_1 x + a_2 x^2 + \cdots + a_{t-1} x^{t-1}$.
4. Distribute share $s_i = f(i)$ to party $i$, for $i = 1, \ldots, n$.

Note that $f(0) = s$ — the secret is the constant term.

**Reconstruction**: any $t$ parties $\{(i_1, s_{i_1}), \ldots, (i_t, s_{i_t})\}$ can recover $s = f(0)$ using **Lagrange interpolation**:

$$s = f(0) = \sum_{j=1}^t s_{i_j} \prod_{\substack{k=1 \\ k \neq j}}^t \frac{0 - i_k}{i_j - i_k} = \sum_{j=1}^t s_{i_j} \cdot \lambda_j$$

where the **Lagrange basis polynomials** evaluated at 0 are:

$$\lambda_j = \prod_{\substack{k=1 \\ k \neq j}}^t \frac{-i_k}{i_j - i_k} \bmod p$$

These coefficients $\lambda_j$ depend only on the set of participant indices $\{i_1, \ldots, i_t\}$, not on the secret values. They can be precomputed.

**Example**: $(2, 3)$-threshold scheme with $p = 17$, $s = 7$. Choose $a_1 = 3$, so $f(x) = 7 + 3x$.

| Party | $x$ | Share $f(x) \bmod 17$ |
|-------|-----|----------------------|
| $P_1$ | 1 | $f(1) = 10$ |
| $P_2$ | 2 | $f(2) = 13$ |
| $P_3$ | 3 | $f(3) = 16$ |

Recovery from $(P_1, P_2)$: $\lambda_1 = -2/(1-2) = 2$, $\lambda_2 = -1/(2-1) = -1 = 16$. Then $s = 2 \cdot 10 + 16 \cdot 13 = 20 + 208 = 228 \equiv 7 \pmod{17}$. ✓

## Lagrange Interpolation over Finite Fields

The **unique polynomial** of degree $< t$ passing through $t$ points $(x_1, y_1), \ldots, (x_t, y_t)$ with distinct $x_i$ is:

$$f(x) = \sum_{i=1}^t y_i \cdot L_i(x), \qquad L_i(x) = \prod_{\substack{j=1 \\ j \neq i}}^t \frac{x - x_j}{x_i - x_j}$$

Over $\mathbb{F}_p$, all arithmetic is modular. The key fact used in Shamir: the polynomial of degree $< t$ is uniquely determined by $t$ points but **completely undetermined** by $t-1$ points — for any $t-1$ shares, every possible value of $f(0) = s$ is equally consistent with exactly $p^0 = 1$ choice of polynomial (given the shares). Wait — more precisely:

**Information-theoretic security**: for any $t-1$ shares $\{s_{i_1}, \ldots, s_{i_{t-1}}\}$ and any target secret value $s^* \in \mathbb{F}_p$, there exists exactly one polynomial $f$ of degree $< t$ with $f(0) = s^*$ and $f(i_j) = s_{i_j}$ for all $j$. Therefore the distribution of shares is identical for all secrets — the shares carry zero information about $s$.

$$\Pr[s = v \mid s_{i_1}, \ldots, s_{i_{t-1}}] = \Pr[s = v] \quad \forall v \in \mathbb{F}_p$$

This is **perfect secrecy** in the information-theoretic sense (cf. Shannon's one-time pad).

**Share size**: each share is one field element (same size as the secret). This is optimal — any perfect $(t, n)$-secret sharing scheme must have shares of size at least $|S|$ (the size of the secret space). Shamir achieves this bound.

## Blakley's Scheme: Geometric Approach

**Blakley's scheme** (1979, independent of Shamir) takes a geometric approach. The secret is encoded as a coordinate of a point in $t$-dimensional space; each share is a $(t-1)$-dimensional hyperplane passing through the secret point.

**Construction**: secret $s$ is embedded as the first coordinate of a point $\mathbf{P} = (s, r_2, r_3, \ldots, r_t) \in \mathbb{F}_p^t$ for random $r_2, \ldots, r_t$.

Each share is a hyperplane $H_i$ defined by a random linear equation $\mathbf{a}_i \cdot \mathbf{x} = b_i$ passing through $\mathbf{P}$ (so $\mathbf{a}_i \cdot \mathbf{P} = b_i$).

**Reconstruction**: $t$ hyperplanes in general position intersect in a unique point $\mathbf{P}$, recoverable by solving a $t \times t$ linear system. Fewer than $t$ hyperplanes intersect in a subspace of dimension $\geq 1$, providing no unique point.

**Comparison**:

| Property | Shamir | Blakley |
|----------|--------|---------|
| Secret size | 1 field element | 1 field element |
| Share size | 1 field element | $t$ field elements |
| Reconstruction | Lagrange interpolation | Linear system solve |
| Information leakage | Perfect zero | Slight (hyperplane narrows range) |

Shamir's scheme is generally preferred due to smaller share sizes. Blakley's scheme has a minor information leak: each share reveals that the secret lies in a half-space, reducing entropy slightly — though this leaks only $O(\log p)$ bits per share.

## Verifiable Secret Sharing

**Problem**: Shamir's scheme trusts the dealer to distribute valid shares. A malicious dealer could give inconsistent shares, making reconstruction fail without parties detecting the corruption.

**Feldman VSS** (Verifiable Secret Sharing, 1987): the dealer publishes **commitments** to the polynomial coefficients using a homomorphic commitment scheme (typically Pedersen commitments $[a_i]$ in a discrete-log group $G$):

$$C_i = g^{a_i} \in G, \quad i = 0, 1, \ldots, t-1$$

Party $i$ verifies their share $s_i = f(i)$ by checking:

$$g^{s_i} = \prod_{k=0}^{t-1} C_k^{i^k} = g^{\sum_k a_k i^k} = g^{f(i)}$$

This is a group exponentiation, computable from the public commitments. A dishonest dealer providing inconsistent shares will fail this check.

**Pedersen VSS** (information-theoretically hiding): instead of Feldman's computationally hiding approach, use Pedersen commitments $C_k = g^{a_k} h^{b_k}$ where $b_k$ are extra random coefficients. The dealer shares both $f(i)$ and $g(i)$ (a second polynomial), and parties verify:

$$C(i) = \prod_k C_k^{i^k} = g^{f(i)} h^{g(i)}$$

This hides the coefficients even from computationally unbounded adversaries, at the cost of requiring $2t$ field elements per share.

## Proactive Secret Sharing and Key Refreshing

In long-lived systems, an adversary might corrupt parties sequentially over time. **Proactive secret sharing** counters this by **refreshing** shares periodically: at each epoch, parties collaborate to rerandomise all shares without changing the underlying secret.

**Refreshing protocol**: parties jointly sample a new $(t, n)$-sharing of $0$ (the zero secret) with random polynomial $\Delta(x) = \delta_1 x + \delta_2 x^2 + \cdots + \delta_{t-1} x^{t-1}$ (no constant term). Each party $i$ receives $\delta_i = \Delta(i)$ and updates:

$$s_i^{\text{new}} = s_i^{\text{old}} + \delta_i = f(i) + \Delta(i) = (f + \Delta)(i)$$

The new polynomial $f + \Delta$ has the same constant term (since $\Delta(0) = 0$) but completely different higher-degree coefficients. An adversary who corrupted $t-1$ parties before refreshing and $t-1$ different parties after learns nothing about the secret (information-theoretically), even though $2(t-1) \geq t$ total parties were corrupted.

**Security model**: **mobile adversary** — can corrupt any $t-1$ parties per epoch, but shares are refreshed between epochs. This provides security as long as the adversary cannot corrupt $t$ parties simultaneously within a single epoch.

## Multi-Party Computation Connection

Secret sharing is the core primitive in **Secure Multi-Party Computation (MPC)**: $n$ parties hold private inputs $x_1, \ldots, x_n$ and want to compute $f(x_1, \ldots, x_n)$ without revealing individual inputs.

The **BGW protocol** (Ben-Or, Goldwasser, Wigderson, 1988) computes any function over a field in a constant number of rounds per gate, using Shamir sharing:

**Addition gate** (free): parties locally add their shares:

$$\text{shares of } (a+b) = \text{shares of } a + \text{shares of } b$$

since Shamir sharing is linear: if $a = f(i)$ and $b = g(i)$, then $(f+g)(i)$ are valid shares of $a+b$.

**Multiplication gate** (expensive): computing shares of $ab$ from shares of $a$ and $b$ requires a **degree reduction** step, since naively $f(i) \cdot g(i) = (fg)(i)$ are shares of $ab$ on a degree-$2(t-1)$ polynomial — too high for a $(t,n)$ scheme with $n < 2t-1$.

The BGW multiplication protocol uses a local multiplication followed by a **Shamir re-sharing** (parties re-share their local products and sum using Lagrange interpolation coefficients), costing $O(n^2)$ field elements of communication per multiplication gate.

**Applications of threshold cryptography**:

| Application | Secret | Threshold |
|-------------|--------|-----------|
| Distributed key generation | Private key | $t$-of-$n$ |
| Threshold decryption | Decryption key | $t$-of-$n$ |
| Threshold signatures | Signing key | $t$-of-$n$ |
| Distributed randomness | Random beacon | $t$-of-$n$ |
| Key escrow | Encryption key | $k$-of-$n$ recovery |

Hardware security modules (HSMs), cloud KMS systems, and MPC-based crypto custody services (Fireblocks, Curv) all use variants of threshold secret sharing to eliminate single points of failure for cryptographic keys.
