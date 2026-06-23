---
title: Cointegration
field: econometrics
description: Long-run equilibrium between non-stationary time series. Bridges econometrics and finance.
intro: >
  Cointegration describes a stable long-run relationship between two or more non-stationary
  time series. Even though each series wanders randomly (I(1)), a linear combination of them
  is stationary. This underpins pairs trading, purchasing-power-parity tests, and ECMs.
math_concepts:
  - linear-algebra
  - stationarity
  - hypothesis-testing
difficulty: advanced
difficulty_level: 4
read_time: 9
---

## Definition

Series $y_t$ and $x_t$ are **cointegrated** (CI(1,1)) if:

1. Both are integrated of order 1: $y_t \sim I(1)$, $x_t \sim I(1)$.
2. There exists $\beta$ such that $z_t = y_t - \beta x_t \sim I(0)$.

The vector $(1, -\beta)^\top$ is called the **cointegrating vector**.

## Error Correction Model (ECM)

Granger's representation theorem says that every cointegrated system has an ECM:

$$\Delta y_t = \alpha(y_{t-1} - \beta x_{t-1}) + \text{lags} + \varepsilon_t$$

The coefficient $\alpha < 0$ is the **speed of adjustment** — how fast the system corrects deviations from equilibrium. This gives cointegration its economic content: shocks are transitory, not permanent.

## Testing for cointegration

| Test | H₀ | Notes |
|---|---|---|
| **Engle–Granger** | No cointegration | Two-step; residual-based; limited to one cointegrating vector |
| **Johansen** | $r$ cointegrating vectors | Full-system; handles multiple vectors; preferred in practice |

The Johansen trace statistic tests:

$$\Lambda_{trace}(r) = -T\sum_{i=r+1}^n \log(1 - \hat{\lambda}_i)$$

where $\hat{\lambda}_i$ are the estimated eigenvalues of the companion matrix.
