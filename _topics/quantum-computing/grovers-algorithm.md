---
title: "Grover's Algorithm"
field: quantum-computing
description: A quantum search algorithm achieving quadratic speedup over classical exhaustive search via amplitude amplification.
intro: >
  Grover's algorithm (1996) finds a marked element in an unstructured database of $N$ items using $O(\sqrt{N})$ oracle queries, compared to $O(N)$ classically. This quadratic speedup is provably optimal — no quantum algorithm can do better for unstructured search. The algorithm's core technique, amplitude amplification, has broad applications beyond search, including quantum counting, optimization, and quantum walk algorithms.
math_concepts:
  - linear-algebra
  - hilbert-spaces
  - probability-theory
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## The Unstructured Search Problem

**Problem:** Given a function $f: \{0,1\}^n \to \{0,1\}$ with exactly one marked element $x^* \in \{0,1,\ldots,N-1\}$ (where $N = 2^n$) satisfying $f(x^*) = 1$ and $f(x) = 0$ for all other $x$, find $x^*$.

**Classical lower bound:** Any classical randomised algorithm requires $\Omega(N)$ queries to $f$ in the worst case. After $k$ queries without finding $x^*$, the probability of success is at most $k/N$.

**Quantum model:** Access is provided through a quantum oracle (black box):

$$O_f: |x\rangle|b\rangle \mapsto |x\rangle|b \oplus f(x)\rangle$$

Using the standard phase-kickback trick with $|b\rangle = |{-}\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$:

$$O_f|x\rangle|{-}\rangle = (-1)^{f(x)}|x\rangle|{-}\rangle$$

So the oracle acts as the **phase oracle**:

$$O|x\rangle = (-1)^{f(x)}|x\rangle$$

which marks $|x^*\rangle$ with a $-1$ phase while leaving all other states unchanged.

## The Grover Diffusion Operator

Grover's algorithm alternates two operations. Starting from the uniform superposition:

$$|s\rangle = H^{\otimes n}|0\rangle^{\otimes n} = \frac{1}{\sqrt{N}}\sum_{x=0}^{N-1}|x\rangle$$

**Step 1 — Oracle $O$:** Flip the sign of the target amplitude.

**Step 2 — Grover diffusion $D$:** Reflect about $|s\rangle$.

$$D = 2|s\rangle\langle s| - I = H^{\otimes n}(2|0\rangle\langle 0| - I)H^{\otimes n}$$

Explicitly, $D_{xy} = \frac{2}{N} - \delta_{xy}$: each amplitude becomes $2\bar{\alpha} - \alpha_x$ where $\bar{\alpha} = \frac{1}{N}\sum_x \alpha_x$ is the mean.

**Geometric interpretation:** Decompose the Hilbert space into a 2D subspace spanned by $|x^*\rangle$ and $|s_\perp\rangle = \frac{1}{\sqrt{N-1}}\sum_{x \neq x^*}|x\rangle$:

$$|s\rangle = \sin\theta\, |x^*\rangle + \cos\theta\, |s_\perp\rangle, \quad \sin\theta = \frac{1}{\sqrt{N}}, \quad \theta \approx \frac{1}{\sqrt{N}}$$

Each Grover iteration is a rotation by angle $2\theta$ in this 2D plane:

- $O$ reflects about $|s_\perp\rangle$: $\theta \to -\theta$.
- $D$ reflects about $|s\rangle$: net effect is rotation by $2\theta$ toward $|x^*\rangle$.

After $k$ iterations, the angle with $|x^*\rangle$ is $\frac{\pi}{2} - (2k+1)\theta$. The success probability is:

$$P(x^*, k) = \sin^2\!\bigl((2k+1)\theta\bigr) \approx \sin^2\!\left(\frac{(2k+1)}{\sqrt{N}}\right)$$

## Amplitude Amplification and Optimal Iteration Count

Success probability is maximised when $(2k+1)\theta = \pi/2$, giving:

$$k_{\text{opt}} = \left\lfloor \frac{\pi}{4\theta} \right\rfloor \approx \left\lfloor \frac{\pi\sqrt{N}}{4} \right\rfloor$$

At $k = k_{\text{opt}}$, the success probability is:

$$P_{\text{success}} = \sin^2\!\left(\frac{\pi}{2} - \frac{\pi}{4k_{\text{opt}}+2}\right) \geq 1 - \frac{1}{N}$$

For large $N$, a single run succeeds with probability approaching 1 using $\lceil \pi\sqrt{N}/4 \rceil$ oracle calls — a **quadratic speedup** over the classical $O(N)$.

Amplitude progression for $N = 64$ over iterations:

| Iteration | $\alpha(x^*)$ | $\alpha(x \neq x^*)$ | $P(\text{success})$ |
|---|---|---|---|
| 0 | $1/8$ | $1/8$ | $1/64 \approx 1.6\%$ |
| 1 | $0.391$ | $0.087$ | $15.3\%$ |
| 3 | $0.824$ | $0.025$ | $67.9\%$ |
| 6 | $0.997$ | $0.000$ | $99.4\%$ |

## Optimality Proof (Quantum Lower Bound)

Grover's quadratic speedup is **optimal**: any quantum algorithm requires $\Omega(\sqrt{N})$ oracle queries.

**Proof sketch (hybrid argument, Bennett et al. 1997):** Consider two inputs $I_0$ (no marked element) and $I_x$ (marked element is $x$). After $k$ oracle queries, define the algorithm's state on $I_0$ and $I_x$ as $|\psi_0^{(k)}\rangle$ and $|\psi_x^{(k)}\rangle$. They differ only in oracle calls where $x$ is queried:

$$\bigl\||\psi_0^{(k)}\rangle - |\psi_x^{(k)}\rangle\bigr\|^2 \leq \frac{4k^2}{N}$$

This follows because each oracle call can change the state by at most $\frac{2}{\sqrt{N}}$ in norm. For success with constant probability, we need $\||\psi_0^{(k)}\rangle - |\psi_x^{(k)}\rangle\|^2 = \Omega(1)$, requiring $k = \Omega(\sqrt{N})$.

**Adversary method (Ambainis 2002):** More refined lower bounds use a weighted adversary relation $R \subseteq X \times Y$ on input pairs and prove:

$$Q_\varepsilon(f) \geq \frac{\text{ADV}(f)}{2}$$

where $\text{ADV}(f) = \max_R \min_{x,y:(x,y)\in R} \frac{\sum_{i}\sqrt{w(x)w(y)}}{\text{relevant queries}}$.

## Multi-Solution Case

When there are $M$ marked elements (unknown), the algorithm generalises:

$$P_{\text{success}}(k) = \sin^2\!\bigl((2k+1)\theta_M\bigr), \quad \sin\theta_M = \sqrt{\frac{M}{N}}$$

Optimal iterations: $k_{\text{opt}} \approx \frac{\pi}{4}\sqrt{\frac{N}{M}}$.

For unknown $M$, the **BBHT algorithm** (Boyer, Brassard, Høyer, Tapp 1998) uses an exponential search: try $k = 1, \lceil 3/2 \rceil, \lceil 9/4 \rceil, \ldots$ iterations. If a solution is found, stop; otherwise double the number of iterations. Expected queries: $O(\sqrt{N/M})$.

**Quantum counting:** Combining phase estimation with Grover's oracle estimates $M$ to within relative error $\varepsilon$ using $O(\sqrt{N}/\varepsilon)$ oracle calls — quadratically better than classical Monte Carlo estimation.

## Applications Beyond Search

Amplitude amplification is a meta-algorithm with broad applications:

**Quantum minimum finding:** Find $\min_x f(x)$ over $N$ items in $O(\sqrt{N})$ queries by iteratively running Grover's algorithm with an adaptive threshold.

**BHT collision finding:** Find $x \neq y$ with $f(x) = f(y)$ in $O(N^{1/3})$ quantum queries (vs. $O(N^{1/2})$ classical birthday attack) using a quantum walk over a classical data structure.

**Amplitude estimation:** For any algorithm $\mathcal{A}$ that prepares a state with "good" amplitude $a$, phase estimation + Grover gives an estimate $\tilde{a}$ with $|\tilde{a} - a| \leq \varepsilon$ using $O(1/\varepsilon)$ copies of $\mathcal{A}$ — quadratically better than Monte Carlo's $O(1/\varepsilon^2)$.

**Speedups in structured problems:**

| Problem | Classical | Quantum (Grover-based) |
|---|---|---|
| 3-SAT (random) | $O(1.307^n)$ | $O(1.143^n)$ |
| Graph coloring | $O(2.246^n)$ | $O(1.499^n)$ |
| Subset sum | $O(2^{n/2})$ | $O(2^{n/3})$ |

## Connection to Quantum Walks

Grover's algorithm on a complete graph is equivalent to a **quantum walk** on that graph. This connection extends to general search problems on graphs: a quantum walk on a graph $G$ with $M$ marked vertices finds a marked vertex in $O(\sqrt{N/M} \cdot 1/\delta)$ steps, where $\delta$ is the spectral gap.

The **MNRS framework** (Magniez, Nayak, Roland, Santha 2011) gives a general recipe: define update, check, and setup costs $U, C, S$. A quantum walk search uses:

$$O\!\left(\sqrt{\frac{N}{M}}\cdot\left(S + \frac{1}{\sqrt{M/N}}C + U\right)\right)$$

quantum operations, recovering the $O(\sqrt{N})$ bound for unstructured search and yielding better bounds for structured problems such as element distinctness ($O(N^{2/3})$) and triangle finding ($O(N^{5/4})$).
