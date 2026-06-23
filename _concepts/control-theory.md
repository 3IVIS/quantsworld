---
title: Control Theory
slug: control-theory
equation: 'u(t) = K_p e + K_i \int e\,dt + K_d \dot{e}'
intro: >
  Control theory designs feedback laws to make dynamical systems behave as desired.
  PID controllers, state-space methods, and optimal control are its pillars —
  used in robotics, aerospace, chemical engineering, and climate models.
related_concepts:
  - differential-equations
  - linear-algebra
  - optimization
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
---

## Transfer functions and the Laplace domain

A linear time-invariant (LTI) system is characterised by its transfer function $G(s) = Y(s)/U(s)$, the ratio of output to input in the Laplace domain. The closed-loop transfer function with controller $C(s)$ is:

$$T(s) = \frac{C(s)G(s)}{1 + C(s)G(s)}$$

## PID control

The PID controller computes control input from error $e(t) = r(t) - y(t)$:

$$u(t) = K_p e + K_i\int_0^t e\,d\tau + K_d\dot{e}$$

- $K_p$ (proportional): reacts to current error
- $K_i$ (integral): eliminates steady-state error
- $K_d$ (derivative): damps oscillations

## State-space representation

$$\dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u}, \qquad \mathbf{y} = C\mathbf{x} + D\mathbf{u}$$

Controllability (can we steer to any state?) requires rank of $[B, AB, \ldots, A^{n-1}B]$ to be $n$.
Observability (can we infer state from outputs?) requires rank of $[C^\top, A^\top C^\top, \ldots]$ to be $n$.
