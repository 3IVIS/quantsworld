---
title: "PID Control"
field: robotics
description: The proportional-integral-derivative controller — the most widely deployed feedback control law in engineering.
intro: >
  A PID controller computes a corrective signal from three terms: the current error,
  its accumulated history, and its rate of change. Despite its simplicity, it achieves
  acceptable performance across an enormous range of plants and is the de facto standard
  in industrial and embedded control.
math_concepts:
  - control-theory
  - differential-equations
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Controller Structure

Let $e(t) = r(t) - y(t)$ be the error between reference $r$ and measured output $y$. The PID control signal is:

$$u(t) = K_p\, e(t) + K_i \int_0^t e(\tau)\, d\tau + K_d\, \frac{de}{dt}$$

In the Laplace domain this is a transfer function from error to control:

$$C(s) = K_p + \frac{K_i}{s} + K_d s = \frac{K_d s^2 + K_p s + K_i}{s}$$

Each term serves a distinct role:

| Term | Effect on response | Drawback |
|---|---|---|
| Proportional $K_p$ | Reduces rise time | Leaves steady-state error |
| Integral $K_i$ | Eliminates steady-state error | Introduces overshoot, windup |
| Derivative $K_d$ | Damps oscillations, improves stability | Amplifies measurement noise |

## Closed-Loop Analysis

With a plant $P(s)$ in unity feedback, the closed-loop transfer function is:

$$T(s) = \frac{C(s)P(s)}{1 + C(s)P(s)}$$

For a first-order plant $P(s) = \frac{K}{\tau s + 1}$ with a PI controller $C(s) = K_p + K_i/s$, the characteristic polynomial is:

$$s^2 + \frac{K K_p + 1}{\tau} s + \frac{K K_i}{\tau} = 0$$

Comparing with the standard second-order form $s^2 + 2\zeta\omega_n s + \omega_n^2$ gives:

$$\omega_n = \sqrt{\frac{K K_i}{\tau}}, \qquad \zeta = \frac{K K_p + 1}{2\tau\omega_n}$$

Damping ratio $\zeta < 1$ gives underdamped (oscillatory) response; $\zeta \geq 1$ gives overdamped. Setting $\zeta = \frac{1}{\sqrt{2}} \approx 0.707$ minimizes ITAE (integral of time-weighted absolute error) for step inputs.

## Ziegler-Nichols Tuning

Ziegler-Nichols provides heuristic starting points based on step-response identification or relay feedback. The **ultimate gain method** increases $K_p$ (with $K_i = K_d = 0$) until sustained oscillations occur at ultimate gain $K_u$ and period $T_u$:

| Controller | $K_p$ | $T_i = K_p/K_i$ | $T_d = K_d/K_p$ |
|---|---|---|---|
| P | $0.5 K_u$ | — | — |
| PI | $0.45 K_u$ | $0.83 T_u$ | — |
| PID | $0.6 K_u$ | $0.5 T_u$ | $0.125 T_u$ |

These rules typically yield $\zeta \approx 0.2$–$0.3$, often requiring further manual refinement to reduce overshoot.

## Anti-Windup and Derivative Filtering

When the actuator saturates (e.g., motor at maximum torque), the integrator continues accumulating error — a phenomenon called **integrator windup**. Anti-windup back-calculation feeds the saturation error back to the integrator:

$$\frac{d}{dt}\hat{e}_i = e + \frac{1}{T_t}(u_{\text{sat}} - u)$$

where $T_t$ is the tracking time constant, typically $T_t = \sqrt{T_i T_d}$. When the output is unsaturated $u_{\text{sat}} = u$ and the integrator operates normally; during saturation the feedback term drives $\hat{e}_i$ toward a value consistent with the saturation limit.

The pure derivative $K_d s$ is improper and amplifies high-frequency noise. A first-order filter is added:

$$C_d(s) = \frac{K_d s}{\frac{\tau_f}{\omega_c} s + 1}$$

where $\omega_c$ is the desired filter cutoff. A common choice is $\omega_c = N\omega_\text{crossover}$ with $N \in [5, 20]$.

## Cascade Control

For plants with two measurable states, cascade (inner-outer) control achieves tighter performance. The inner loop controls a fast variable (e.g., current), and the outer loop controls the slow variable (e.g., speed or position):

$$u_{\text{inner}} = C_{\text{inner}}(s)\bigl(r_{\text{inner}}(t) - y_{\text{inner}}(t)\bigr)$$

$$r_{\text{inner}}(t) = C_{\text{outer}}(s)\bigl(r(t) - y_{\text{outer}}(t)\bigr)$$

The inner loop must be tuned first and its bandwidth should be 5–10× faster than the outer loop. This structure is standard in servo drives: current loop (bandwidth ~1 kHz), velocity loop (~100 Hz), position loop (~10 Hz).

## Digital PID Implementation

In embedded systems the controller runs at sample period $T_s$. The continuous integral is approximated using the trapezoidal rule (Tustin method), which maps $s \to \frac{2}{T_s}\frac{z-1}{z+1}$:

$$u[k] = u[k-1] + K_p\bigl(e[k] - e[k-1]\bigr) + K_i \frac{T_s}{2}\bigl(e[k] + e[k-1]\bigr) + \frac{K_d}{T_s}\bigl(e[k] - 2e[k-1] + e[k-2]\bigr)$$

This **incremental (velocity) form** has natural anti-windup: simply clamp $u[k]$ to actuator limits without modifying the integrator state. The position form accumulates the integral explicitly and is more susceptible to windup but easier to initialize.

Selecting $T_s$: the Nyquist criterion requires $T_s < \frac{\pi}{\omega_\text{crossover}}$. In practice, $T_s \leq \frac{1}{20 f_\text{crossover}}$ is recommended to keep discretization error negligible.
