---
title: "Matched Filter"
field: signal-processing
description: The optimal linear filter for detecting a known signal in additive white Gaussian noise, maximizing output signal-to-noise ratio.
intro: >
  The matched filter is the solution to the problem of detecting a deterministic signal of known
  shape in the presence of additive white Gaussian noise. It maximizes the output signal-to-noise
  ratio at the decision instant, and the resulting optimal SNR depends only on the signal energy
  and noise spectral density, not on the signal shape. The matched filter is the cornerstone of
  radar, sonar, digital communications, and hypothesis testing.
math_concepts:
  - hypothesis-testing
  - probability-theory
  - spectral-analysis
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## The SNR Maximization Problem

Consider a received signal $r(t) = s(t) + n(t)$ on $t \in [0, T]$, where $s(t)$ is the known deterministic signal of energy $E = \int_0^T s^2(t)\,dt$, and $n(t)$ is zero-mean white Gaussian noise with one-sided PSD $N_0/2$ (i.e., $\mathbb{E}[n(t)n(\tau)] = (N_0/2)\delta(t-\tau)$).

We filter with a linear time-invariant filter $h(t)$ and sample the output at time $t_0$:

$$y(t_0) = \int_{-\infty}^\infty h(t_0 - \tau) r(\tau)\, d\tau$$

The **output SNR** at $t_0$ is:

$$\text{SNR} = \frac{y_s^2(t_0)}{\mathbb{E}[y_n^2(t_0)]}$$

where $y_s(t_0) = \int h(t_0-\tau)s(\tau)d\tau$ is the signal component and $y_n(t_0)$ is the noise component. By Parseval's theorem and the Cauchy-Schwarz inequality:

$$y_s^2(t_0) = \left|\int H(f)S(f)e^{j2\pi f t_0}\,df\right|^2 \leq \int |H(f)|^2\,df \cdot \int |S(f)|^2\,df$$

The noise power at the output is $\sigma_n^2 = (N_0/2)\int |H(f)|^2\,df$. Therefore:

$$\text{SNR} \leq \frac{\int |H(f)|^2\,df \cdot \int |S(f)|^2\,df}{(N_0/2)\int |H(f)|^2\,df} = \frac{2E}{N_0}$$

## The Matched Filter Solution

Equality in the Cauchy-Schwarz inequality holds when $H(f) \propto S^*(f)e^{-j2\pi f t_0}$. The **matched filter** has transfer function:

$$H_{\text{opt}}(f) = S^*(f)\, e^{-j2\pi f t_0}$$

and equivalently the impulse response:

$$h_{\text{opt}}(t) = s(t_0 - t)$$

The matched filter is the **time-reversed, delayed replica** of the signal. The output SNR is the maximum achievable value:

$$\text{SNR}_{\text{max}} = \frac{2E}{N_0}$$

This is a profound result: the maximum SNR depends only on the ratio of signal energy to noise spectral density, not on the waveform shape. A 1 ms Gaussian pulse and a 1 ms chirp with the same energy achieve identical maximum SNR, though their time-bandwidth products differ.

## Matched Filter as a Correlator

The matched filter output $y(t) = r(t) * h_{\text{opt}}(t) = r(t) * s(-t)$ is the **cross-correlation** of the received signal with the reference:

$$y(t_0) = \int_{-\infty}^\infty r(\tau)\, s(\tau - (t_0 - t_0))\, d\tau = \int_{-\infty}^\infty r(\tau)\, s(\tau)\, d\tau$$

At the sampling instant $t_0$, the matched filter computes the **inner product** of the received waveform with the transmitted waveform — the projection of the received signal onto the signal space. This correlation receiver interpretation is central to optimal demodulation in digital communications.

The output waveform of the matched filter applied to a clean signal $s(t)$ is the **autocorrelation function** of $s$:

$$y_s(t) = \int s(\tau) s(\tau - (t_0 - t))\, d\tau = R_{ss}(t - t_0)$$

This has a peak at $t = t_0$ of value $E$, and rolls off according to the autocorrelation shape of $s$.

## Detection Theory and the Neyman-Pearson Framework

The detection problem is a binary hypothesis test:

$$H_0: r(t) = n(t) \qquad \text{(noise only)}$$
$$H_1: r(t) = s(t) + n(t) \qquad \text{(signal present)}$$

The sufficient statistic is the matched filter output $y_0 = \int_0^T r(t)s(t)\,dt$. Under $H_0$, $y_0 \sim \mathcal{N}(0, N_0 E/2)$; under $H_1$, $y_0 \sim \mathcal{N}(E, N_0 E/2)$.

The **Neyman-Pearson (NP) detector** sets a threshold $\eta$ and decides $H_1$ if $y_0 > \eta$:

- **Probability of false alarm:** $P_{\text{FA}} = P(y_0 > \eta | H_0) = Q\!\left(\frac{\eta}{\sqrt{N_0 E/2}}\right)$
- **Probability of detection:** $P_D = P(y_0 > \eta | H_1) = Q\!\left(\frac{\eta - E}{\sqrt{N_0 E/2}}\right)$

where $Q(x) = \frac{1}{\sqrt{2\pi}}\int_x^\infty e^{-t^2/2}\,dt$. Eliminating $\eta$:

$$P_D = Q\!\left(Q^{-1}(P_{\text{FA}}) - \sqrt{\frac{2E}{N_0}}\right)$$

The quantity $d' = \sqrt{2E/N_0}$ is the **deflection** or detectability index. This formula directly yields the **receiver operating characteristic (ROC)** curve — the trade-off between $P_D$ and $P_{\text{FA}}$ as the threshold $\eta$ varies.

| $E/N_0$ (dB) | $P_{\text{FA}} = 10^{-6}$ | $P_{\text{FA}} = 10^{-3}$ |
|---------|---------------------|---------------------|
| 10 dB | $P_D \approx 0.21$ | $P_D \approx 0.60$ |
| 13 dB | $P_D \approx 0.63$ | $P_D \approx 0.92$ |
| 16 dB | $P_D \approx 0.93$ | $P_D \approx 0.998$ |

## Pulse Compression in Radar

A **long pulse** has high energy but poor range resolution ($\Delta R = cT/2$ for pulse duration $T$). A **short pulse** has good range resolution but low energy. **Pulse compression** combines both advantages using a wideband modulated waveform followed by matched filtering.

The **linear frequency modulated (LFM) chirp**:

$$s(t) = A\,\text{rect}(t/T)\, e^{j\pi \beta t^2/T}$$

sweeps frequency from $-\beta/2$ to $+\beta/2$ over duration $T$, giving bandwidth $B = \beta$. The **time-bandwidth product** $BT$ is the compression ratio. After matched filtering, the range resolution is:

$$\Delta R = \frac{c}{2B}$$

with a peak-to-sidelobe ratio of $-13.2$ dB for the rectangular envelope. The **pulse compression gain** is the ratio of output to input SNR improvement: $G = BT$, which for a 100 $\mu$s chirp with 10 MHz bandwidth gives $G = 1000$ (30 dB).

Tapering (windowing) the matched filter reduces sidelobes at the cost of widening the main lobe and losing $\sim 1$–$2$ dB of SNR. A Hamming-weighted matched filter achieves $-43$ dB sidelobes with $\sim 40\%$ resolution broadening.

## The Ambiguity Function

The **ambiguity function** characterizes matched filter performance in the joint delay-Doppler plane:

$$|\chi(\tau, \nu)|^2 = \left|\int_{-\infty}^\infty s(t)\, s^*(t-\tau)\, e^{j2\pi\nu t}\, dt\right|^2$$

where $\tau$ is the time delay (range) and $\nu$ is the Doppler shift (velocity). The ambiguity function satisfies:

- $|\chi(0,0)|^2 = E^2$ (maximum at origin)
- $\int\!\!\int |\chi(\tau,\nu)|^2\, d\tau\, d\nu = E^2$ (volume invariant)
- $|\chi(-\tau,-\nu)| = |\chi(\tau,\nu)|$ (symmetry)

The **volume invariance** is fundamental: total ambiguity is conserved. A thumbtack ambiguity function (narrow main lobe everywhere) is impossible — sidelobes must exist somewhere. Waveform design trades off range-Doppler coupling, sidelobe levels, and Doppler tolerance.

The LFM chirp has a **ridge-shaped** ambiguity function — good Doppler tolerance (the matched filter output remains high even for moderate Doppler shifts, just displaced in range). Phase-coded waveforms (Barker codes, m-sequences) have thumbtack-like ambiguity functions — accurate simultaneous range and velocity estimation but sensitive to Doppler.

| Waveform | Range resolution | Doppler tolerance | Sidelobe level |
|----------|-----------------|------------------|---------------|
| CW pulse | $c/2B$ | Excellent | N/A |
| LFM chirp | $c/2B$ | Good | $-13$ dB |
| Barker code (13-bit) | $c/2B$ | Poor | $-22$ dB |
| Polyphase codes | $c/2B$ | Fair | $< -30$ dB |
