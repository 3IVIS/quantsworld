---
title: "Power Spectral Density"
field: signal-processing
description: Describes how the power of a random signal is distributed across frequencies, estimated via periodogram and spectral averaging methods.
intro: >
  The power spectral density (PSD) characterizes the second-order statistics of a wide-sense
  stationary random process by describing how its variance is distributed over frequency.
  PSD estimation is a core task in time-series analysis, turning a single observed record into
  an inference about the underlying process's spectral structure. The tension between variance
  and frequency resolution governs all estimation methods, from the simple periodogram to
  multitaper and parametric approaches.
math_concepts:
  - fourier-transform
  - random-processes
  - spectral-analysis
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Wiener-Khinchin Theorem

For a wide-sense stationary (WSS) random process $\{X(t)\}$ with autocorrelation function:

$$R_X(\tau) = \mathbb{E}[X(t+\tau)\overline{X(t)}]$$

the **power spectral density** is the Fourier transform of the autocorrelation:

$$S_X(f) = \int_{-\infty}^{\infty} R_X(\tau)\, e^{-j2\pi f\tau}\, d\tau$$

This is the **Wiener-Khinchin theorem**. By the inverse transform, the total power equals the integral of the PSD over all frequencies:

$$\mathbb{E}[|X(t)|^2] = R_X(0) = \int_{-\infty}^{\infty} S_X(f)\, df$$

Properties of a valid PSD: $S_X(f) \geq 0$ for all $f$, $S_X(-f) = S_X(f)$ for real-valued processes, and $S_X(f)$ must be integrable. In the discrete-time case, the PSD is periodic with period $f_s$ and the autocorrelation sequence is:

$$S_X(e^{j\omega}) = \sum_{k=-\infty}^{\infty} R_X[k]\, e^{-j\omega k}, \qquad \omega \in [-\pi, \pi]$$

## The Periodogram and Its Problems

Given $N$ observations $x[0], x[1], \ldots, x[N-1]$, the natural PSD estimate is the **periodogram**:

$$\hat{S}_{\text{per}}(f) = \frac{1}{N}\left|\sum_{n=0}^{N-1} x[n]\, e^{-j2\pi f n / N}\right|^2 = \frac{|X_N(f)|^2}{N}$$

The periodogram is computed via the FFT in $\mathcal{O}(N\log N)$ operations and evaluated at the DFT frequencies $f_k = k/N$. Its expectation reveals a fundamental bias:

$$\mathbb{E}[\hat{S}_{\text{per}}(f)] = \int_{-\infty}^{\infty} S_X(\nu)\, W_N(f - \nu)\, d\nu$$

where $W_N(f) = N^{-1}|\sum_{n=0}^{N-1} e^{-j2\pi fn}|^2 = N^{-1}|D_N(f)|^2$ is the squared Dirichlet kernel. The periodogram **smears** the true PSD by convolution with this kernel, creating **spectral leakage** from strong components into neighboring bins.

More seriously, the variance of the periodogram does **not** decrease with $N$:

$$\text{Var}[\hat{S}_{\text{per}}(f)] \approx S_X^2(f) \quad \text{(for } N \to \infty\text{)}$$

The periodogram is **inconsistent** — it never converges to the true PSD regardless of data length. The estimated PSD fluctuates by approximately 100% (relative standard deviation $\approx 1$) even for very long records.

## Bartlett's Method

**Bartlett (1948)** proposed averaging periodograms over $K$ non-overlapping segments of length $M = N/K$:

$$\hat{S}_{\text{Bartlett}}(f) = \frac{1}{K} \sum_{i=0}^{K-1} \hat{S}_{\text{per}}^{(i)}(f)$$

Since the segments are approximately independent, averaging reduces variance by $K$:

$$\text{Var}[\hat{S}_{\text{Bartlett}}(f)] \approx \frac{S_X^2(f)}{K} = \frac{S_X^2(f) \cdot M}{N}$$

But the frequency resolution (bin spacing) is $1/M = K/N$ — $K$ times coarser than the periodogram. The trade-off is fundamental: **halving the variance doubles the frequency resolution loss**.

The **bandwidth-variance product** characterizes any spectral estimator:

$$\text{BW} \times \text{Var}[\hat{S}] \approx \frac{2}{N} S_X^2(f)$$

## Welch's Method

**Welch's method** extends Bartlett's by using **overlapping segments** (typically 50% overlap) and applying a window $w[n]$ to each segment before computing the periodogram:

$$\hat{S}_{\text{Welch}}(f) = \frac{1}{K} \sum_{i=0}^{K-1} \frac{1}{M \cdot U} \left|\sum_{n=0}^{M-1} w[n]\, x[iL + n]\, e^{-j2\pi fn/M}\right|^2$$

where $L$ is the step between segments and $U = M^{-1}\sum_n w^2[n]$ is the window power normalization factor.

With 50% overlap, $K \approx 2N/M$ segments are available (twice as many as Bartlett). Windowing (Hanning, Hamming, etc.) reduces spectral leakage at the cost of a 50% widening of the main lobe. The net effect: Welch's method matches Bartlett's variance with better leakage performance, or achieves lower variance for the same leakage.

| Method | Frequency resolution | Variance reduction | Leakage |
|--------|---------------------|-------------------|---------|
| Periodogram | $1/N$ | $1\times$ | High |
| Bartlett | $K/N$ | $1/K$ | High |
| Welch (50% overlap) | $\approx 2K/N$ | $\approx 1/(1.7K)$ | Low |
| Multitaper | $2W$ | $\sim 1/(2NW)$ | Very low |

## Multitaper Estimation

**Thomson's multitaper method (1982)** uses $K$ orthogonal **discrete prolate spheroidal sequences (DPSS)**, or Slepian tapers $\{w_k[n]\}_{k=0}^{K-1}$, to form $K$ eigenspectra:

$$\hat{S}^{(k)}(f) = \left|\sum_{n=0}^{N-1} w_k[n]\, x[n]\, e^{-j2\pi fn}\right|^2$$

The multitaper estimate is:

$$\hat{S}_{\text{MT}}(f) = \frac{1}{K} \sum_{k=0}^{K-1} \hat{S}^{(k)}(f)$$

Slepian tapers are the **optimal** windows in the sense of minimizing spectral leakage: they are the orthonormal sequences that maximize the ratio of energy within $[-W, W]$ to total energy, given the bandwidth $W$. The half-bandwidth parameter $NW$ (time-bandwidth product, typically 2–4) controls the trade-off:

- NW = 2: resolution $2W = 4/N$, $K = 2$ tapers, moderate leakage suppression
- NW = 4: resolution $8/N$, $K = 7$ tapers, excellent leakage suppression

The variance is approximately $S_X^2(f)/K$, so more tapers give lower variance. The adaptive multitaper uses frequency-dependent weights $d_k(f)$ determined by the ratio of signal power to broadband leakage, down-weighting higher-order tapers where leakage is problematic.

## Parametric PSD Estimation: AR Models

If the signal is assumed to be the output of an **autoregressive (AR)** process of order $p$:

$$x[n] + a_1 x[n-1] + \cdots + a_p x[n-p] = e[n], \qquad e[n] \sim \mathcal{N}(0, \sigma_e^2)$$

then its PSD has a rational form:

$$S_X(e^{j\omega}) = \frac{\sigma_e^2}{\left|1 + a_1 e^{-j\omega} + \cdots + a_p e^{-j\omega p}\right|^2}$$

The AR coefficients satisfy the **Yule-Walker equations**, derived from the autocorrelation of both sides:

$$\begin{pmatrix} R[0] & R[1] & \cdots & R[p-1] \\ R[1] & R[0] & \cdots & R[p-2] \\ \vdots & & \ddots & \vdots \\ R[p-1] & R[p-2] & \cdots & R[0] \end{pmatrix} \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_p \end{pmatrix} = -\begin{pmatrix} R[1] \\ R[2] \\ \vdots \\ R[p] \end{pmatrix}$$

This Toeplitz system is solved efficiently by the **Levinson-Durbin algorithm** in $\mathcal{O}(p^2)$ operations. The noise variance is $\sigma_e^2 = R[0] + \sum_{k=1}^p a_k R[k]$.

AR-based PSD estimation can resolve spectral peaks that are only $1/N$ apart (Rayleigh criterion) using data of length $N$, far exceeding the $1/N$ resolution of nonparametric methods. The cost is model mismatch if the true process is not AR($p$).

**Model order selection** uses information criteria:

$$\text{AIC}(p) = N\log\hat{\sigma}_e^2(p) + 2p, \qquad \text{BIC}(p) = N\log\hat{\sigma}_e^2(p) + p\log N$$

BIC penalizes complexity more heavily and tends to select sparser models.

## Cross-Spectral Density and Coherence

For two jointly WSS processes $X$ and $Y$, the **cross-spectral density** is:

$$S_{XY}(f) = \int_{-\infty}^\infty R_{XY}(\tau)\, e^{-j2\pi f\tau}\, d\tau, \qquad R_{XY}(\tau) = \mathbb{E}[X(t+\tau)\overline{Y(t)}]$$

The **coherence** (magnitude-squared coherence, MSC) normalizes the cross-spectrum:

$$\gamma_{XY}^2(f) = \frac{|S_{XY}(f)|^2}{S_X(f)\, S_Y(f)}, \qquad 0 \leq \gamma_{XY}^2(f) \leq 1$$

Coherence measures the linear relationship between $X$ and $Y$ at each frequency, analogous to the squared correlation coefficient. $\gamma^2 = 1$ means $Y$ is a linear (possibly filtered) version of $X$ at frequency $f$; $\gamma^2 = 0$ means they are uncorrelated at that frequency.

Applications include brain connectivity analysis (EEG coherence between electrode pairs), vibration testing (input-output coherence identifies nonlinearities), and seismology (array processing for wave direction estimation). Significant coherence is determined by the threshold $\gamma_{\text{thresh}}^2 = 1 - (1-\alpha)^{1/(K-1)}$ for $K$ averaged periodograms at significance level $\alpha$.
