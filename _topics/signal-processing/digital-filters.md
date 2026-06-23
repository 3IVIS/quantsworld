---
title: "Digital Filter Design"
field: signal-processing
description: Methods for designing FIR and IIR digital filters to meet prescribed frequency-domain specifications.
intro: >
  Digital filter design translates a set of frequency-domain requirements — passband ripple,
  stopband attenuation, transition bandwidth — into a set of filter coefficients that can be
  implemented as a difference equation. The two major families, FIR and IIR, offer fundamental
  trade-offs between computational cost, phase linearity, and design flexibility, each with
  mature design methods ranging from windowing to equiripple optimization.
math_concepts:
  - fourier-transform
  - spectral-analysis
  - numerical-methods
difficulty: intermediate
difficulty_level: 3
read_time: 11
---

## FIR vs IIR: Fundamental Trade-offs

A **finite impulse response (FIR)** filter has transfer function:

$$H(z) = \sum_{n=0}^{N-1} h[n]\, z^{-n}$$

with $N$ taps and no feedback. Its impulse response is exactly $h[n]$ for $n = 0, \ldots, N-1$ and zero elsewhere.

An **infinite impulse response (IIR)** filter uses feedback:

$$H(z) = \frac{\sum_{k=0}^{M} b_k z^{-k}}{1 + \sum_{k=1}^{N} a_k z^{-k}}$$

with poles that produce an impulse response lasting forever.

| Property | FIR | IIR |
|----------|-----|-----|
| Phase | Exactly linear (if symmetric) | Nonlinear |
| Stability | Always stable (no poles, except at $z=0$) | Requires design care |
| Order for given spec | High (100s for sharp filters) | Low (5–12 for Butterworth) |
| Computational cost | $N$ multiplications/sample | $M+N$ multiplications/sample |
| Delay | Fixed $N/2$ samples | Frequency-dependent |
| Analog prototype | Not applicable | Butterworth, Chebyshev, Elliptic |

For audio and communications where linear phase is critical (images, pulse shaping), FIR is preferred. For control loops and biomedical monitoring where computational economy matters, IIR wins.

## Linear Phase FIR Filters

A symmetric FIR filter $h[n] = h[N-1-n]$ has exactly **linear phase**:

$$H(e^{j\omega}) = |H(e^{j\omega})|\, e^{-j\omega(N-1)/2}$$

The group delay $\tau_g = -d\angle H/d\omega = (N-1)/2$ is constant — all frequency components are delayed by exactly the same number of samples. This is essential for applications such as audio equalization, where phase distortion creates pre-ringing artifacts, and image sharpening, where different edges must not be shifted relative to each other.

There are four types of linear-phase FIR filters distinguished by whether $N$ is odd or even and whether the symmetry is even or odd. Type I (odd length, even symmetry) can realize any frequency response; Type II (even length, even symmetry) always has a zero at $\omega = \pi$ and cannot implement highpass filters.

## Windowed Sinc Design

The ideal lowpass filter has impulse response:

$$h_{\text{ideal}}[n] = \frac{\omega_c}{\pi}\,\text{sinc}\!\left(\frac{\omega_c n}{\pi}\right) = \frac{\sin(\omega_c n)}{\pi n}$$

which is non-causal and infinite. **Windowing** truncates and time-shifts this:

$$h[n] = h_{\text{ideal}}[n - (N-1)/2] \cdot w[n], \qquad n = 0, \ldots, N-1$$

The window $w[n]$ controls the trade-off between main-lobe width (transition bandwidth) and side-lobe height (stopband attenuation):

| Window | Peak sidelobe (dB) | Stopband atten. (dB) | Main lobe width |
|--------|-------------------|----------------------|-----------------|
| Rectangular | $-13$ | $21$ | $4\pi/N$ |
| Hanning | $-31$ | $44$ | $8\pi/N$ |
| Hamming | $-41$ | $53$ | $8\pi/N$ |
| Blackman | $-57$ | $74$ | $12\pi/N$ |
| Kaiser ($\beta=8$) | $-69$ | $80$ | Variable |

The **Kaiser window** $w[n] = I_0\!\left(\beta\sqrt{1-(2n/N-1)^2}\right)/I_0(\beta)$ (where $I_0$ is the modified Bessel function) is particularly useful because the parameter $\beta$ controls the sidelobe level continuously, and design formulas exist:

$$\beta = \begin{cases} 0 & A \leq 21 \\ 0.5842(A-21)^{0.4} + 0.07886(A-21) & 21 < A \leq 50 \\ 0.1102(A-8.7) & A > 50 \end{cases}$$

where $A$ is the desired stopband attenuation in dB. The required filter length is approximately $N \approx (A - 7.95)/(2.285\,\Delta\omega)$, where $\Delta\omega$ is the transition bandwidth in rad/sample.

## Parks-McClellan Equiripple Design

The **Parks-McClellan (Remez exchange) algorithm** finds the FIR filter of minimum length that satisfies given frequency-domain specifications, by minimizing the **Chebyshev error** (maximum deviation from the desired response):

$$\min_{h[n]} \max_{\omega \in \mathcal{F}} W(\omega)|H(e^{j\omega}) - D(e^{j\omega})|$$

where $\mathcal{F}$ is the union of passband and stopband, $D(\omega)$ is the desired response, and $W(\omega)$ is a weighting function controlling the relative importance of each band.

By the **Chebyshev equiripple theorem**, the optimal filter has a response that oscillates between $+\delta$ and $-\delta$ with at least $N/2 + 2$ alternations — this **equiripple** property is the signature of optimality. The Remez exchange algorithm iteratively updates the set of alternation frequencies until convergence, typically in 5–10 iterations.

For a lowpass filter with passband ripple $\delta_1$ and stopband attenuation $\delta_2$, the minimum filter order is approximately:

$$N \approx \frac{-10\log_{10}(\delta_1 \delta_2) - 13}{14.6\,\Delta f/f_s} + 1$$

where $\Delta f$ is the transition bandwidth. Parks-McClellan achieves roughly $40\%$ lower order than windowing for the same specifications.

## IIR Design via Analog Prototypes

The standard IIR design workflow is:

1. Specify digital filter requirements: passband edge $\omega_p$, stopband edge $\omega_s$, ripple $\delta_p$, attenuation $A_s$
2. **Pre-warp** to analog frequencies: $\Omega = (2/T_s)\tan(\omega/2)$
3. Design analog prototype (Butterworth, Chebyshev, or elliptic)
4. Apply **bilinear transform**: $s = (2/T_s)(z-1)/(z+1)$

**Butterworth** (maximally flat): all-pole, monotone in passband and stopband. Order:

$$N \geq \frac{\log\!\sqrt{(10^{A_s/10}-1)/(10^{A_p/10}-1)}}{\log(\Omega_s/\Omega_p)}$$

**Chebyshev Type I**: equiripple in passband, monotone in stopband. Lower order than Butterworth.

**Elliptic (Cauer)**: equiripple in both passband and stopband. Minimum order for given specifications. For $N$-th order elliptic filter, the frequency selectivity is characterized by the selectivity parameter $k = \Omega_p/\Omega_s$ and the complete elliptic integral $K(k)$.

The **bilinear transform** $z = (1 + sT_s/2)/(1 - sT_s/2)$ maps the entire left half $s$-plane into the unit disk without aliasing, but introduces frequency warping. Pre-warping the specification frequencies before applying the transform ensures the critical frequencies (passband edge, stopband edge) end up at precisely the right digital frequencies after the transform.

## Fixed-Point Effects

In fixed-point implementations, finite word length causes three types of errors:

**Coefficient quantization:** The actual transfer function $\hat{H}(z)$ has poles shifted from their designed positions. Near the unit circle, a small perturbation $\Delta p_k$ can cause instability. Direct-form structures are particularly sensitive because a single coefficient change shifts all poles simultaneously. **Cascade form** (second-order sections) localizes this sensitivity.

**Roundoff noise:** Arithmetic operations produce rounding errors modeled as additive white noise of power $\sigma_r^2 = 2^{-2B}/12$ (for $B$-bit fixed-point). This noise propagates through the filter's impulse response, producing output noise power $\sigma_o^2 = \sigma_r^2 \sum_n h^2[n] = \sigma_r^2 \|h\|^2$.

**Overflow:** Accumulator overflow in fixed-point arithmetic causes severe distortion. Scaling inputs to avoid overflow reduces dynamic range. **Saturation arithmetic** (clip instead of wrap) prevents the worst artifacts at the cost of harmonic distortion.

**Limit cycles:** IIR filters can exhibit zero-input oscillations due to nonlinearity of rounding. A $B$-bit implementation has a deadband of $\pm 2^{-B}$ around fixed points, within which the quantizer appears as unity gain, enabling oscillations. Increasing word length or using dithering suppresses limit cycles.
