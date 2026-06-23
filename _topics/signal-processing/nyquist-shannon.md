---
title: "Nyquist-Shannon Sampling Theorem"
field: signal-processing
description: The fundamental theorem establishing the minimum sampling rate required to perfectly reconstruct a bandlimited continuous signal.
intro: >
  The Nyquist-Shannon sampling theorem states that a bandlimited signal with maximum frequency
  $f_{max}$ can be perfectly reconstructed from discrete samples taken at rate $f_s \geq 2f_{max}$.
  It is the theoretical bedrock of all digital signal processing, governing everything from audio
  recording to medical imaging, and its violation produces aliasing — a form of irreversible
  information loss.
math_concepts:
  - fourier-transform
  - spectral-analysis
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Ideal Sampling: The Impulse Train

Sampling a continuous-time signal $x(t)$ at uniform intervals $T_s = 1/f_s$ is modeled mathematically as multiplication by a **Dirac impulse train** (Shah function):

$$s(t) = \sum_{n=-\infty}^{\infty} \delta(t - nT_s)$$

The sampled signal is:

$$x_s(t) = x(t) \cdot s(t) = \sum_{n=-\infty}^{\infty} x(nT_s)\,\delta(t - nT_s)$$

The Fourier transform of the impulse train is itself an impulse train in frequency:

$$S(f) = f_s \sum_{k=-\infty}^{\infty} \delta(f - kf_s)$$

Since multiplication in time corresponds to convolution in frequency, the spectrum of the sampled signal is:

$$X_s(f) = X(f) * S(f) = f_s \sum_{k=-\infty}^{\infty} X(f - kf_s)$$

This is a **periodic replication** of the original spectrum $X(f)$, with copies centered at every integer multiple of the sampling frequency $f_s$.

## Aliasing and the Nyquist Criterion

If $X(f)$ is **bandlimited** — i.e., $X(f) = 0$ for $|f| > f_{max}$ — then the spectral replicas are separated by $f_s$ on either side. The replicas do not overlap if and only if:

$$f_s \geq 2f_{max}$$

The frequency $f_N = f_s/2$ is the **Nyquist frequency**. When $f_s < 2f_{max}$, the spectral copies overlap and the frequency components above $f_N$ **fold back** into the baseband as aliases:

$$f_{\text{alias}} = |f - k f_s| \quad \text{for the integer } k \text{ that maps } f \text{ into } [0, f_s/2)$$

Aliasing is **irreversible**: once the samples are taken, the original high-frequency content cannot be separated from its alias. A 1200 Hz tone sampled at 1000 Hz appears as a 200 Hz tone; nothing in the digital record reveals the original frequency.

### Alias Frequency Formula

For a sinusoid at frequency $f$ sampled at $f_s$, the alias frequency seen in the range $[0, f_s/2]$ is:

$$f_{\text{alias}} = \left|f_s \cdot \text{round}\!\left(\frac{f}{f_s}\right) - f\right|$$

| Signal frequency | Sampling rate | Alias |
|-----------------|--------------|-------|
| 900 Hz | 1000 Hz | 100 Hz |
| 600 Hz | 1000 Hz | 400 Hz |
| 1100 Hz | 1000 Hz | 100 Hz |
| 499 Hz | 1000 Hz | 499 Hz (no alias) |

## Anti-Aliasing Filters

Before sampling, an **analog low-pass filter** attenuates all frequency content above $f_s/2$. The design specifications balance between:

- **Passband** $[0, f_p]$: ripple $\leq \delta_p$ (e.g., $\pm 0.5$ dB)
- **Stopband** $[f_{stop}, \infty)$: attenuation $\geq A_s$ (e.g., 60 dB)
- **Transition band** $[f_p, f_{stop}]$: roll-off must be achieved within $f_N - f_{max}$ of bandwidth

A practical rule-of-thumb: sample at $10\%$–$20\%$ above the theoretical Nyquist rate to allow the anti-aliasing filter a realistic transition band. For audio at 20 kHz bandwidth, the CD standard of 44.1 kHz provides a 2.05 kHz transition band for the reconstruction filter.

## Reconstruction: Sinc Interpolation

Given the samples $x[n] = x(nT_s)$, the continuous signal is recovered by convolution with the **ideal sinc kernel**:

$$x(t) = \sum_{n=-\infty}^{\infty} x[n]\, \text{sinc}\!\left(\frac{t - nT_s}{T_s}\right), \qquad \text{sinc}(u) = \frac{\sin(\pi u)}{\pi u}$$

In the frequency domain, this multiplication by the rectangular window (ideal low-pass filter with cutoff $f_N$) precisely isolates the baseband replica:

$$X(f) = X_s(f) \cdot \Pi\!\left(\frac{f}{f_s}\right) \cdot \frac{1}{f_s}$$

The sinc function has infinite support in time, making ideal reconstruction non-causal and impractical. Real systems use **windowed sinc filters** (FIR approximations) or **polyphase interpolation** to approximate reconstruction with bounded delay.

## Oversampling and Noise Shaping

Oversampling at rate $M f_s$ (with $M \gg 1$) spreads quantization noise over a wider bandwidth. If quantization noise power is $\sigma_q^2$, its power spectral density is approximately flat at $\sigma_q^2 / (Mf_s)$. After decimation filtering to $f_s$, the in-band noise power is:

$$\sigma_{\text{in-band}}^2 = \frac{\sigma_q^2}{M}$$

Each doubling of the oversampling ratio $M$ reduces in-band noise by 3 dB — equivalent to adding half a bit of ADC resolution. **Noise shaping** (sigma-delta modulation) goes further by pushing quantization noise to high frequencies using a feedback loop, then removing it with a digital decimation filter. A first-order sigma-delta modulator shapes noise with a $|1 - e^{-j\omega}|^2 \approx \omega^2$ response, achieving $9$ dB per octave reduction — equivalent to 1.5 bits per doubling of oversampling ratio.

## Undersampling for Bandpass Signals

A bandpass signal occupying $[f_L, f_H]$ with bandwidth $B = f_H - f_L$ can be sampled at $f_s = 2B$ rather than $2f_H$, provided the aliases from periodic replication happen to fall in the original band without overlapping. The required condition is that there exists a positive integer $m$ such that:

$$\frac{2f_H}{m} \leq f_s \leq \frac{2f_L}{m-1}$$

This **bandpass sampling** (or harmonic sampling) is exploited in radio receivers. A 200 MHz signal occupying 190–210 MHz (bandwidth 20 MHz) can be sampled at 40 MHz instead of 420 MHz, with the digital baseband appearing at 0–10 MHz. This dramatically reduces ADC speed requirements and is standard in software-defined radio (SDR) architectures.

## Practical Sampling Considerations

**Jitter:** Random timing errors in the sampling instants (clock jitter $\sigma_t$) add noise with PSD $\approx (2\pi f \sigma_t)^2 \cdot S_{xx}(f)$. At signal frequency $f$, the SNR limit from jitter is:

$$\text{SNR}_{\text{jitter}} \approx \frac{1}{(2\pi f \sigma_t)^2}$$

For a 100 MHz signal, achieving 12-bit (72 dB SNR) requires jitter below 0.5 ps — a serious hardware constraint.

**Finite aperture:** A sample-and-hold circuit integrates over a small aperture window $\tau$, acting as a sinc roll-off in frequency: $H(f) = \tau \cdot \text{sinc}(f\tau)$. This attenuates high-frequency components and must be corrected (aperture correction) in precision systems.

**Non-uniform sampling:** When samples are taken at irregular times $\{t_n\}$, reconstruction uses the Lagrange-Whittaker formula or iterative frame-theoretic methods. Non-uniform sampling arises in astronomy (gaps from Earth's rotation), physiology (event-driven neural spikes), and triggered measurement systems.
