---
title: Numerical Methods
slug: numerical-methods
equation: 'y_{n+1} = y_n + h\,f(t_n, y_n)'
intro: >
  Numerical methods approximate solutions to mathematical problems that have no closed form.
  ODE solvers, quadrature, linear algebra algorithms, and root-finding are its pillars —
  essential anywhere continuous mathematics meets a computer.
related_concepts:
  - differential-equations
  - partial-differential-equations
  - linear-algebra
  - optimization
difficulty: intermediate
difficulty_level: 3
---

## ODE solvers

**Euler's method** (first order): $y_{n+1} = y_n + hf(t_n, y_n)$, error $O(h)$

**Runge–Kutta 4 (RK4):** computes four slope estimates per step, error $O(h^4)$:

$$y_{n+1} = y_n + \tfrac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$

## Numerical linear algebra

- **LU decomposition:** $A = LU$ — solves $Ax = b$ in $O(n^3)$
- **Conjugate gradient:** iterative solver for symmetric positive-definite systems — $O(n\sqrt{\kappa})$
- **QR algorithm:** computes eigenvalues iteratively

## Numerical integration (quadrature)

**Trapezoidal rule:** $\int_a^b f\,dx \approx \tfrac{h}{2}[f(a) + 2\sum_{i=1}^{n-1}f(x_i) + f(b)]$, error $O(h^2)$

**Gaussian quadrature:** $n$ optimally chosen points achieve $O(h^{2n})$ accuracy.
