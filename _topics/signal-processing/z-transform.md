---
title: "Z-Transform"
field: signal-processing
description: The discrete-time counterpart to the Laplace transform, enabling algebraic analysis of digital filters and LTI systems.
intro: >
  The Z-transform converts a discrete-time sequence into a complex-variable function, making it
  possible to analyze linear time-invariant (LTI) systems using algebraic rather than convolution
  operations. It generalizes the discrete-time Fourier transform by evaluating on the entire
  complex plane rather than just the unit circle, and is the fundamental tool for characterizing
  digital filter stability, frequency response, and transfer functions.
math_concepts:
  - spectral-analysis
  - fourier-transform
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Definition and Region of Convergence

The **bilateral Z-transform** of a sequence $x[n]$ is the power series:

$$X(z) = \mathcal{Z}\{x[n]\} = \sum_{n=-\infty}^{\infty} x[n]\, z^{-n}, \qquad z \in \mathbb{C}$$

The **region of convergence (ROC)** is the set of $z$ for which this series converges absolutely:

$$\text{ROC} = \left\{z : \sum_{n=-\infty}^{\infty} |x[n]|\, |z|^{-n} < \infty\right\}$$

The ROC is always an annular region $r_1 < |z| < r_2$ in the complex plane (possibly including $|z| = 0$ or $|z| = \infty$). The Z-transform alone does not uniquely specify a sequence — the ROC is equally important.

| Signal type | ROC structure |
|-------------|--------------|
| Right-sided (causal) | $|z| > r_1$ (exterior of a circle) |
| Left-sided (anti-causal) | $|z| < r_2$ (interior of a circle) |
| Two-sided | $r_1 < |z| < r_2$ (annulus) |
| Finite-length (FIR) | All $z$ (except possibly $0$ or $\infty$) |

## Relationship to the DTFT

The discrete-time Fourier transform (DTFT) is the Z-transform evaluated on the **unit circle** $z = e^{j\omega}$, $\omega \in [-\pi, \pi]$:

$$X(e^{j\omega}) = X(z)\big|_{z = e^{j\omega}} = \sum_{n=-\infty}^{\infty} x[n]\, e^{-j\omega n}$$

The DTFT exists when the ROC includes the unit circle, which for a stable causal system requires all poles to lie strictly inside the unit circle. If the ROC does not include $|z| = 1$, the DTFT does not exist in the classical sense (though it may exist in a distributional sense for marginally stable systems).

This geometric picture is powerful: the **magnitude response** $|H(e^{j\omega})|$ can be computed by tracing the unit circle and measuring how close poles and zeros are to each point on the circle. A pole near the unit circle causes a peak in the frequency response; a zero on the unit circle creates a null.

## Common Z-Transform Pairs

| Sequence $x[n]$ | Z-transform $X(z)$ | ROC |
|-----------------|-------------------|-----|
| $\delta[n]$ | $1$ | All $z$ |
| $u[n]$ (unit step) | $\dfrac{z}{z-1} = \dfrac{1}{1-z^{-1}}$ | $|z|>1$ |
| $a^n u[n]$ | $\dfrac{z}{z-a} = \dfrac{1}{1-az^{-1}}$ | $|z|>|a|$ |
| $-a^n u[-n-1]$ | $\dfrac{z}{z-a}$ | $|z|<|a|$ |
| $n\,a^n u[n]$ | $\dfrac{az^{-1}}{(1-az^{-1})^2}$ | $|z|>|a|$ |
| $\cos(\omega_0 n)\,u[n]$ | $\dfrac{1 - z^{-1}\cos\omega_0}{1 - 2z^{-1}\cos\omega_0 + z^{-2}}$ | $|z|>1$ |

The table highlights that right-sided (causal) sequences have ROCs exterior to a circle, while the same rational function with a left-sided ROC represents a different (anti-causal) time-domain sequence.

## Key Properties

**Linearity:** $\mathcal{Z}\{ax[n] + by[n]\} = aX(z) + bY(z)$, ROC contains $\text{ROC}_x \cap \text{ROC}_y$.

**Time shifting:** $\mathcal{Z}\{x[n-k]\} = z^{-k} X(z)$, ROC unchanged (except possibly at $z=0$ or $z=\infty$).

**Convolution theorem:** If $y[n] = x[n] * h[n]$, then:
$$Y(z) = X(z) \cdot H(z), \qquad \text{ROC} \supseteq \text{ROC}_x \cap \text{ROC}_h$$

This is the central result: convolution in time becomes multiplication in the $z$-domain, converting integral equations into algebraic ones.

**Differentiation in $z$:** $\mathcal{Z}\{n\,x[n]\} = -z \dfrac{dX(z)}{dz}$

**Initial value theorem** (causal sequences): $x[0] = \lim_{z \to \infty} X(z)$

**Final value theorem** (stable, causal sequences): $\lim_{n\to\infty} x[n] = \lim_{z\to 1}(z-1)X(z)$

## Inverse Z-Transform via Partial Fractions

For a rational $X(z) = N(z)/D(z)$ with $M$ poles $p_k$, the **partial fraction expansion** (in terms of $z^{-1}$) gives:

$$X(z) = \sum_{k=1}^{M} \frac{A_k}{1 - p_k z^{-1}}$$

Each term corresponds to a geometric sequence: for a causal system ($|z| > |p_k|$ in the ROC), the inverse transform is $A_k\, p_k^n\, u[n]$. The residue is:

$$A_k = \left[(1 - p_k z^{-1}) X(z)\right]_{z = p_k}$$

For repeated poles of order $r$, the expansion includes terms $(n+1)a^n$, $(n+1)(n+2)a^n/2!$, etc.

**Example:** Given $X(z) = \dfrac{1}{(1-0.5z^{-1})(1-0.25z^{-1})}$ with ROC $|z|>0.5$:

$$X(z) = \frac{2}{1-0.5z^{-1}} - \frac{1}{1-0.25z^{-1}}$$

$$x[n] = \left[2(0.5)^n - (0.25)^n\right]u[n]$$

## Transfer Functions of LTI Systems

A causal LTI system described by the difference equation:

$$\sum_{k=0}^{N} a_k\, y[n-k] = \sum_{k=0}^{M} b_k\, x[n-k]$$

has **transfer function** (taking Z-transforms, using the shift property):

$$H(z) = \frac{Y(z)}{X(z)} = \frac{\sum_{k=0}^{M} b_k z^{-k}}{\sum_{k=0}^{N} a_k z^{-k}} = \frac{B(z)}{A(z)}$$

This can always be factored in terms of poles $p_k$ and zeros $z_k$:

$$H(z) = \frac{b_0}{a_0} \cdot \frac{\prod_{k=1}^{M}(1 - z_k z^{-1})}{\prod_{k=1}^{N}(1 - p_k z^{-1})}$$

The **pole-zero plot** in the complex $z$-plane gives a complete picture of the system. Zeros of $H(z)$ are frequencies at which the system completely blocks a sinusoidal input; poles are resonant frequencies where the response grows large.

## Stability Analysis: Poles and the Unit Circle

For a causal LTI system, BIBO (bounded-input, bounded-output) stability requires the ROC to include the unit circle $|z|=1$, which means **all poles must lie strictly inside the unit circle**:

$$\text{Stable} \iff |p_k| < 1 \quad \forall\, k$$

| Pole location | Impulse response behavior |
|---------------|--------------------------|
| $|p|<1$ inside unit circle | Decaying exponential (stable) |
| $|p|=1$ simple pole | Persistent oscillation (marginally stable) |
| $|p|=1$ repeated pole | Growing polynomial (unstable) |
| $|p|>1$ outside unit circle | Exponentially growing (unstable) |

This is the discrete-time analog of the Laplace-domain rule (all poles in the left half-plane for continuous-time stability). The bilinear transform $s = 2(z-1)/[(z+1)T_s]$ maps the left half $s$-plane to the interior of the unit $z$-circle, enabling continuous-to-discrete filter conversion while preserving stability.

**Jury stability criterion** provides an algebraic test for stability without explicitly computing pole locations: given characteristic polynomial $A(z) = \sum_{k=0}^N a_k z^k$, construct the Jury array and check sign conditions on corner elements. This is the discrete-time analogue of the Routh-Hurwitz criterion.
