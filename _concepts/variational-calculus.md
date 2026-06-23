---
title: Variational Calculus
slug: variational-calculus
equation: '\frac{d}{dx}\frac{\partial L}{\partial y\prime} - \frac{\partial L}{\partial y} = 0'
intro: >
  Variational calculus finds functions that extremise functionals — integrals of the
  function and its derivatives. The Euler-Lagrange equation is its central result,
  underpinning classical mechanics, optimal control, and variational inference in ML.
related_concepts:
  - optimization
  - differential-equations
  - control-theory
difficulty: advanced
difficulty_level: 4
---

## The Euler-Lagrange equation

To extremise $J[y] = \int_a^b L(x, y, y')\,dx$ subject to boundary conditions $y(a)=y_a$, $y(b)=y_b$:

$$\frac{\partial L}{\partial y} - \frac{d}{dx}\frac{\partial L}{\partial y'} = 0$$

**Example:** geodesics on $\mathbb{R}^2$ minimise arc length $J = \int\sqrt{1+y'^2}\,dx$, giving $y'' = 0$ — straight lines.

## Hamilton's principle

Classical mechanics follows from: the physical trajectory $q(t)$ extremises the **action**:

$$S[q] = \int_{t_1}^{t_2} L(q, \dot{q}, t)\,dt$$

where $L = T - V$ (kinetic minus potential energy). The Euler-Lagrange equation gives Newton's laws.

## Variational inference

In Bayesian ML, the posterior $p(\theta|x)$ is approximated by $q(\theta)$ from a tractable family by minimising $D_{KL}(q\|p)$. The ELBO (Evidence Lower BOund) is the variational objective.
