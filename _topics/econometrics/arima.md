---
title: ARIMA & Time Series
field: econometrics
description: Modelling autocorrelated sequences. Connects deeply to signal processing and Fourier analysis.
intro: >
  ARIMA (AutoRegressive Integrated Moving Average) models characterise time series
  through their autocorrelation structure. They are the workhorse of univariate forecasting
  and share deep mathematical links with signal processing and spectral analysis.
math_concepts:
  - fourier-transform
  - stationarity
  - linear-algebra
  - hypothesis-testing
difficulty: intermediate
difficulty_level: 3
read_time: 10
widget:
  type: include
  file: fourier-explorer.html
---

## The ARIMA(p, d, q) model

An ARIMA model combines three components:

- **AR(p):** the current value depends on $p$ past values.
- **I(d):** the series is differenced $d$ times to achieve stationarity.
- **MA(q):** the current value depends on $q$ past forecast errors.

**The general form after differencing:**

$$\phi(L)\,\Delta^d y_t = \theta(L)\,\varepsilon_t, \qquad \varepsilon_t \sim \text{WN}(0, \sigma^2)$$

where $L$ is the lag operator, $\phi(L) = 1 - \phi_1 L - \cdots - \phi_p L^p$ is the AR polynomial, and $\theta(L) = 1 + \theta_1 L + \cdots + \theta_q L^q$ is the MA polynomial.

## Stationarity requirement

The AR polynomial $\phi(L)$ must have all roots **outside** the unit circle for the process to be (weakly) stationary — a direct analogy to stable poles in a digital filter. This is why ARIMA and signal processing share so much mathematics.

## Identification via ACF and PACF

| Pattern | Suggests |
|---|---|
| ACF cuts off at lag $q$, PACF decays | MA(q) |
| ACF decays, PACF cuts off at lag $p$ | AR(p) |
| Both decay slowly | ARMA — use information criteria |

## Connection to spectral analysis

The **power spectral density** of a stationary ARMA process is:

$$S(\omega) = \sigma^2 \left|\frac{\theta(e^{-i\omega})}{\phi(e^{-i\omega})}\right|^2$$

This connects time-series modelling directly to the Fourier transform and signal processing. An AR(1) process with $|\phi_1| < 1$ is a low-pass filter; MA processes shape the spectrum via their zero structure.
