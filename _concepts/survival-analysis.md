---
title: Survival Analysis
slug: survival-analysis
equation: 'S(t) = P(T > t) = \exp\!\left(-\int_0^t \lambda(u)\,du\right)'
intro: >
  Survival analysis studies the time until an event — death, failure, relapse.
  The hazard function, survival function, and censoring are its core concepts,
  connecting biostatistics, actuarial science, reliability engineering, and economics.
related_concepts:
  - probability-theory
  - differential-equations
  - hypothesis-testing
difficulty: intermediate
difficulty_level: 3
---

## The hazard and survival functions

The **hazard rate** $\lambda(t) = \lim_{dt\to0} P(T \in [t,t+dt) \mid T \geq t)/dt$ — the instantaneous event rate.

The **survival function** $S(t) = P(T > t) = \exp(-\Lambda(t))$ where $\Lambda(t) = \int_0^t\lambda(u)\,du$ is the cumulative hazard.

The relationship: $f(t) = \lambda(t)S(t)$, $S(t) = 1 - F(t)$.

## Censoring

**Right censoring:** we observe $\min(T, C)$ where $C$ is a censoring time. The observed data are $(t_i, \delta_i)$ with $\delta_i = \mathbf{1}[T_i \leq C_i]$.

Censoring is crucial: ignoring it (treating censored times as event times) biases estimates downward.

## Kaplan-Meier estimator

The non-parametric estimator of $S(t)$:

$$\hat{S}(t) = \prod_{t_i \leq t} \left(1 - \frac{d_i}{n_i}\right)$$

where $d_i$ events occur among $n_i$ at-risk individuals at time $t_i$.
