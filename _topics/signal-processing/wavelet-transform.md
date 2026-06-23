---
title: "Wavelet Transform"
field: signal-processing
description: A time-frequency analysis tool that overcomes the fixed resolution of the STFT by using dilated and translated basis functions.
intro: >
  The wavelet transform decomposes a signal into contributions from localized oscillatory functions
  called wavelets, each scaled to a specific frequency band. Unlike the Fourier transform, wavelets
  capture transient features precisely in time, and unlike the short-time Fourier transform they
  achieve adaptive time-frequency resolution — fine frequency resolution at low frequencies and
  fine time resolution at high frequencies.
math_concepts:
  - fourier-transform
  - spectral-analysis
  - wavelet-transform
  - linear-algebra
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Limitations of the STFT and Heisenberg Uncertainty

The short-time Fourier transform (STFT) of $x(t)$ with window $g(t)$:

$$\text{STFT}_x(\tau, \omega) = \int_{-\infty}^\infty x(t)\, g^*(t-\tau)\, e^{-j\omega t}\, dt$$

tiles the time-frequency plane with **fixed-size rectangles**. The time resolution $\Delta t$ and frequency resolution $\Delta \omega$ satisfy the Heisenberg-Gabor uncertainty principle:

$$\Delta t \cdot \Delta \omega \geq \frac{1}{2}$$

A narrow window gives good time resolution but poor frequency resolution, and vice versa. This is a fundamental limitation — once the window is chosen, it cannot be adapted. High-frequency transients and low-frequency modulations require the same box size. The wavelet transform breaks free from this constraint by using a **variable window** that scales with frequency: high frequencies get a narrow window (good time resolution), low frequencies get a wide window (good frequency resolution).

## Continuous Wavelet Transform

The **continuous wavelet transform (CWT)** of $x(t)$ is:

$$W_x(a, b) = \frac{1}{\sqrt{|a|}} \int_{-\infty}^\infty x(t)\, \psi^*\!\left(\frac{t - b}{a}\right) dt$$

where $\psi(t)$ is the **mother wavelet**, $a > 0$ is the **scale** (inversely related to frequency), and $b$ is the **translation** (time localization). The factor $1/\sqrt{|a|}$ preserves energy across scales. The analyzed wavelets $\psi_{a,b}(t) = |a|^{-1/2}\psi((t-b)/a)$ are all dilated and translated copies of the mother wavelet.

The CWT is an **invertible** transform. The reconstruction formula is:

$$x(t) = \frac{1}{C_\psi} \int_0^\infty \int_{-\infty}^\infty W_x(a,b)\, \psi_{a,b}(t)\, \frac{da\, db}{a^2}$$

## Admissibility Condition

Not every function can serve as a mother wavelet. The **admissibility condition** requires:

$$C_\psi = \int_0^\infty \frac{|\hat{\psi}(\omega)|^2}{\omega}\, d\omega < \infty$$

where $\hat{\psi}(\omega)$ is the Fourier transform of $\psi$. This condition implies $\hat{\psi}(0) = 0$, meaning the wavelet must have **zero mean**:

$$\int_{-\infty}^\infty \psi(t)\, dt = 0$$

Wavelets are therefore oscillatory (hence the name). The Morlet wavelet $\psi(t) = \pi^{-1/4} e^{j\omega_0 t} e^{-t^2/2}$ (windowed complex sinusoid) and the Mexican hat $\psi(t) = (1-t^2)e^{-t^2/2}$ (second derivative of Gaussian) are widely used mother wavelets.

## Multiresolution Analysis and the Mallat Algorithm

The **discrete wavelet transform (DWT)** samples the CWT on a dyadic grid: $a = 2^j$, $b = k \cdot 2^j$. This leads to the framework of **multiresolution analysis (MRA)**, a nested sequence of approximation spaces:

$$\cdots \subset V_{-1} \subset V_0 \subset V_1 \subset \cdots \subset L^2(\mathbb{R})$$

Each $V_j$ captures signal content at scale $2^j$. The **detail space** $W_j$ is the orthogonal complement of $V_j$ in $V_{j+1}$: $V_{j+1} = V_j \oplus W_j$. Scaling functions $\phi(t)$ span $V_0$; wavelets $\psi(t)$ span $W_0$.

The two-scale relations (perfect reconstruction filter bank) are:

$$\phi(t) = \sqrt{2}\sum_n h_0[n]\,\phi(2t-n), \qquad \psi(t) = \sqrt{2}\sum_n h_1[n]\,\phi(2t-n)$$

**Mallat's fast algorithm** implements the DWT as a cascade of filter banks followed by downsampling by 2:

```
x[n] ──► h_0[n] ──► ↓2 ──► a_1[n]  (approximation at level 1)
      └─► h_1[n] ──► ↓2 ──► d_1[n]  (detail at level 1)
```

The approximation $a_1$ is recursively split at the next level. After $J$ levels, the signal is represented by $\{a_J, d_J, d_{J-1}, \ldots, d_1\}$ — the **wavelet packet**. Reconstruction reverses the process using conjugate filters $\tilde{h}_0$ and $\tilde{h}_1$.

The complexity is $\mathcal{O}(N)$ — linear in signal length — compared to $\mathcal{O}(N \log N)$ for the FFT.

## Daubechies Wavelets and Vanishing Moments

Ingrid Daubechies constructed the first family of **compactly supported, orthonormal wavelets** with a specified number of **vanishing moments**. A wavelet has $p$ vanishing moments if:

$$\int_{-\infty}^\infty t^k \psi(t)\, dt = 0, \qquad k = 0, 1, \ldots, p-1$$

Equivalently, $\hat{\psi}(\omega)$ has a zero of order $p$ at $\omega = 0$. A wavelet with $p$ vanishing moments produces zero (or very small) coefficients when applied to a polynomial of degree $< p$. This means **smooth signal regions** yield small wavelet coefficients — a key property for compression and denoising.

| Family | Vanishing moments | Filter length | Symmetry | Support |
|--------|------------------|---------------|----------|---------|
| Haar (db1) | 1 | 2 | Yes | $[0,1]$ |
| db4 | 4 | 8 | No | $[0,7]$ |
| db8 | 8 | 16 | No | $[0,15]$ |
| Symlets (sym4) | 4 | 8 | Near-symmetric | $[0,7]$ |
| Coiflets | 6 | 18 | Near-symmetric | $[0,17]$ |

The Daubechies db$N$ filter coefficients are the unique real, minimum-phase solution to the system of equations derived from the two-scale relation. The db1 (Haar) wavelet has $h_0 = [1/\sqrt{2}, 1/\sqrt{2}]$, giving the simplest possible averaging filter.

## Denoising via Coefficient Thresholding

A clean signal $s[n]$ plus Gaussian noise $\epsilon[n] \sim \mathcal{N}(0,\sigma^2)$ will produce large wavelet coefficients in regions of signal activity and small coefficients everywhere else (due to the sparsity of the wavelet representation). Noise, being spectrally flat, spreads uniformly across all wavelet coefficients.

**Donoho-Johnstone denoising** proceeds in three steps:
1. Compute the DWT: $w_{j,k} = \langle x, \psi_{j,k} \rangle$
2. Threshold the detail coefficients
3. Reconstruct with the inverse DWT

The two threshold rules are:

$$\hat{w}_{j,k}^{\text{hard}} = w_{j,k} \cdot \mathbf{1}[|w_{j,k}| > \lambda]$$

$$\hat{w}_{j,k}^{\text{soft}} = \text{sgn}(w_{j,k})\max(|w_{j,k}| - \lambda, 0)$$

**Hard thresholding** preserves large coefficients unchanged but introduces discontinuities at $\pm\lambda$. **Soft thresholding** shrinks all coefficients by $\lambda$, producing smoother reconstructions, and is equivalent to the LASSO estimator in the wavelet domain.

The **universal threshold** $\lambda^* = \sigma\sqrt{2\log N}$ (VisuShrink) guarantees that no noise spike exceeds $\lambda^*$ with high probability. In practice, **SureShrink** minimizes Stein's Unbiased Risk Estimate (SURE) to choose a level-dependent threshold, achieving near-minimax performance over a wide class of function spaces.

## Compression

Wavelet-based compression (used in JPEG 2000 and FBI fingerprint database) exploits the **energy compaction** property: most signal energy concentrates in a small fraction of large coefficients. The procedure:

1. Apply DWT to obtain coefficient matrix
2. Quantize: retain the $M$ largest coefficients (setting the rest to zero)
3. Entropy-code the sparse coefficient set

The **rate-distortion** trade-off for a signal in a Besov space $B^s_{p,q}$ with sparsity index $s$ gives approximation error:

$$\|x - x_M\|^2 \leq C \cdot M^{-2s/1}$$

where $x_M$ is the $M$-term wavelet approximation. Wavelets achieve the optimal (minimax) rate for a wide class of piecewise-smooth signals, outperforming the Fourier basis which spreads discontinuities (Gibbs phenomenon) across many coefficients.
