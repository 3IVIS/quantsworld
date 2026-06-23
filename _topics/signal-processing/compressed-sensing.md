---
title: "Compressed Sensing"
field: signal-processing
description: A framework for recovering sparse signals from far fewer measurements than classical sampling theory requires.
intro: >
  Compressed sensing overturns the conventional wisdom that a signal must be sampled at the
  Nyquist rate before compression. If a signal has a sparse representation in some basis,
  then $m \ll n$ random linear measurements are sufficient for exact recovery, provided the
  measurement matrix satisfies the restricted isometry property. Recovery is achieved by
  solving a convex $\ell_1$ minimization problem, bridging information theory, convex
  optimization, and random matrix theory.
math_concepts:
  - convex-optimization
  - linear-algebra
  - probability-theory
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## The Sparsity Assumption

A signal $\mathbf{x} \in \mathbb{R}^n$ is **$k$-sparse** if at most $k$ of its entries are nonzero: $\|\mathbf{x}\|_0 \leq k$, where $\|\cdot\|_0$ denotes the number of nonzero entries. More generally, $\mathbf{x}$ is **compressible** if it has a sparse representation in a basis $\Psi$: $\mathbf{x} = \Psi\boldsymbol{\alpha}$ where $\boldsymbol{\alpha}$ is $k$-sparse.

This is not merely an assumption — it is empirically observed across many domains:
- **Natural images:** wavelet coefficients decay rapidly; 95% of energy lies in $< 5\%$ of coefficients
- **Audio signals:** spectral representation is sparse over short time windows
- **Medical signals:** ECG has few dominant frequency components; MRI $k$-space data is sparse in image domain
- **Network traffic:** anomaly signals are sparse in time

The fundamental question: can we design $m$ measurements $\mathbf{y} = A\mathbf{x}$ with $m \ll n$ such that $\mathbf{x}$ can be recovered exactly from $\mathbf{y}$?

## Basis Pursuit: $\ell_1$ Minimization

With $m$ measurements $\mathbf{y} = A\mathbf{x}$ and $m < n$, the system is underdetermined — infinitely many $\mathbf{x}$ are consistent with $\mathbf{y}$. The **$\ell_0$ problem** (find the sparsest consistent solution) is NP-hard in general.

The key insight of compressed sensing is that under suitable conditions on $A$, the $\ell_0$ problem is equivalent to the convex **basis pursuit** ($\ell_1$) problem:

$$\hat{\mathbf{x}} = \arg\min_{\mathbf{x}} \|\mathbf{x}\|_1 \quad \text{subject to} \quad A\mathbf{x} = \mathbf{y}$$

The $\ell_1$ norm is the **convex envelope** of the $\ell_0$ pseudo-norm — the tightest convex relaxation. Geometrically, the $\ell_1$ ball has corners along the coordinate axes; when the feasible hyperplane $\{A\mathbf{x} = \mathbf{y}\}$ is tangent to the $\ell_1$ ball, it touches a corner, producing a sparse solution.

For noisy measurements $\mathbf{y} = A\mathbf{x} + \mathbf{n}$ with $\|\mathbf{n}\|_2 \leq \varepsilon$, the relaxed problem is:

$$\hat{\mathbf{x}} = \arg\min_{\mathbf{x}} \|\mathbf{x}\|_1 \quad \text{subject to} \quad \|A\mathbf{x} - \mathbf{y}\|_2 \leq \varepsilon$$

The unconstrained **LASSO** form with regularization parameter $\lambda$:

$$\hat{\mathbf{x}} = \arg\min_{\mathbf{x}} \frac{1}{2}\|A\mathbf{x} - \mathbf{y}\|_2^2 + \lambda\|\mathbf{x}\|_1$$

is equivalent via Lagrangian duality, with $\lambda$ and $\varepsilon$ in one-to-one correspondence.

## Restricted Isometry Property

The **restricted isometry property (RIP)** formalizes when $A$ preserves the geometry of sparse vectors. The matrix $A \in \mathbb{R}^{m \times n}$ satisfies RIP of order $k$ with constant $\delta_k$ if:

$$(1 - \delta_k)\|\mathbf{x}\|_2^2 \leq \|A\mathbf{x}\|_2^2 \leq (1 + \delta_k)\|\mathbf{x}\|_2^2$$

for all $k$-sparse $\mathbf{x}$. Equivalently, every $m \times k$ submatrix of $A$ formed by $k$ columns is well-conditioned with singular values in $[1-\delta_k, 1+\delta_k]$.

**Recovery guarantee (Candès, 2008):** If $A$ satisfies RIP of order $2k$ with $\delta_{2k} < \sqrt{2} - 1 \approx 0.414$, then for any $k$-sparse $\mathbf{x}$, basis pursuit recovers $\mathbf{x}$ exactly from $\mathbf{y} = A\mathbf{x}$. For the noisy case with $\|\mathbf{n}\|_2 \leq \varepsilon$, the recovery error is bounded:

$$\|\hat{\mathbf{x}} - \mathbf{x}\|_2 \leq C_1 \varepsilon + C_2 \frac{\sigma_k(\mathbf{x})_1}{\sqrt{k}}$$

where $\sigma_k(\mathbf{x})_1 = \min_{k\text{-sparse }\mathbf{z}} \|\mathbf{x} - \mathbf{z}\|_1$ measures how well $\mathbf{x}$ is approximated by a $k$-sparse vector.

## Mutual Coherence

The **mutual coherence** of $A$ provides a simpler (though less tight) sufficient condition:

$$\mu(A) = \max_{i \neq j} \frac{|\langle \mathbf{a}_i, \mathbf{a}_j \rangle|}{\|\mathbf{a}_i\|_2 \|\mathbf{a}_j\|_2}$$

where $\mathbf{a}_i$ are the columns of $A$. Mutual coherence ranges from $\sqrt{(n-m)/(m(n-1))}$ (Welch bound, achievable by equiangular tight frames) to 1.

**Recovery guarantee:** If the true signal is $k$-sparse with $k < (1 + 1/\mu)/2$, then basis pursuit recovers it exactly. This condition is weaker than RIP-based guarantees (requires fewer measurements) but easier to verify since $\mu$ can be computed directly.

Mutual coherence also measures the incoherence between the measurement basis $\Phi$ and the sparsity basis $\Psi$. For compressed sensing to work well, these bases should be **maximally incoherent**: $\mu(\Phi\Psi^{-1}) \approx 1/\sqrt{n}$. The canonical example is random Gaussian measurements with the Fourier (or wavelet) sparsity basis.

## Random Measurement Matrices

The practically remarkable aspect of compressed sensing: **random matrices satisfy RIP with high probability using only $m = O(k \log(n/k))$ measurements**.

**Gaussian matrices:** $A_{ij} \sim \mathcal{N}(0, 1/m)$ independently. With $m \geq C k \log(n/k)$ rows, $A$ satisfies RIP of order $k$ with $\delta_k \leq \delta$ with probability $1 - e^{-cm}$. The Gaussian ensemble is maximally incoherent with any fixed orthonormal basis.

**Bernoulli matrices:** $A_{ij} = \pm 1/\sqrt{m}$ with equal probability. Achieves the same RIP guarantee with the same number of measurements, at lower computational cost (no transcendental operations).

**Partial Fourier matrices:** Randomly select $m$ rows from the $n \times n$ DFT matrix. With $m = O(k \log^4 n)$ rows, exact recovery is possible for $k$-sparse vectors in the standard basis. This is the theoretical basis for MRI acceleration.

| Matrix type | Measurements needed | Storage | Fast multiply |
|------------|--------------------|---------|----|
| Gaussian | $O(k\log(n/k))$ | $O(mn)$ | No ($O(mn)$) |
| Bernoulli | $O(k\log(n/k))$ | $O(mn)$ bits | No |
| Partial FFT | $O(k\log^4 n)$ | $O(m)$ | Yes ($O(n\log n)$) |
| Toeplitz/circulant | $O(k\log n\log(n/k))$ | $O(n)$ | Yes |

## Greedy Algorithms

**Orthogonal Matching Pursuit (OMP)** is an iterative greedy algorithm:
1. Initialize residual $\mathbf{r}_0 = \mathbf{y}$, support set $S_0 = \emptyset$
2. At iteration $t$: find column $j^* = \arg\max_j |\langle \mathbf{a}_j, \mathbf{r}_{t-1}\rangle|$
3. Update $S_t = S_{t-1} \cup \{j^*\}$
4. Compute least-squares solution on $S_t$: $\hat{\mathbf{x}}_{S_t} = A_{S_t}^\dagger \mathbf{y}$
5. Update residual $\mathbf{r}_t = \mathbf{y} - A_{S_t}\hat{\mathbf{x}}_{S_t}$
6. Stop after $k$ iterations (or when $\|\mathbf{r}_t\|_2 < \varepsilon$)

OMP recovers $k$-sparse signals with $m \geq Ck\log n$ Gaussian measurements in $O(kmn)$ time — faster than basis pursuit (a second-order cone program) but requiring slightly more measurements for guaranteed recovery.

**CoSaMP** (Compressive Sampling Matching Pursuit) adds a pruning step that selects the top $2k$ components and performs least squares, then prunes to $k$. Its recovery error satisfies the same guarantee as RIP-based $\ell_1$ minimization with constant coefficients, using $m = O(k\log(n/k))$ measurements.

## Applications

**MRI acceleration:** MRI measures Fourier coefficients ($k$-space) sequentially — full sampling is slow and causes motion blur. The image is sparse in wavelet domain. Random $k$-space trajectories (spiral, radial) provide incoherent measurements; $\ell_1$ reconstruction allows 4–8$\times$ scan time reduction, enabling cardiac imaging in a single breath-hold.

**Radar with sparse scenes:** A surveillance radar scene with $n$ range-Doppler cells but only $k \ll n$ targets uses compressed sensing to reconstruct the full scene from $m$ random pulse measurements. Achieves the same range-Doppler resolution as conventional processing with far fewer transmitted pulses, reducing radar dwell time and intercept probability.

**Single-pixel camera (Rice University):** A digital micromirror device (DMD) encodes $m$ random binary patterns onto the scene, and a single photodetector measures the inner product with each pattern. The result is $m \ll n$ compressed measurements of an $n$-pixel image, reconstructible by $\ell_1$ minimization. This is compressive imaging without a focal-plane array.
