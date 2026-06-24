---
title: "Ensemble Forecasting"
field: meteorology
description: Quantifying forecast uncertainty by running multiple model simulations from perturbed initial conditions.
intro: >
  Ensemble forecasting acknowledges that the initial state of the atmosphere is never perfectly known. By generating an ensemble of $N$ forecasts from slightly different initial conditions, we obtain a probabilistic description of future weather rather than a single deterministic trajectory. The spread of the ensemble estimates forecast uncertainty, and ensemble means typically outperform individual members.
math_concepts:
  - probability-theory
  - monte-carlo-methods
  - gaussian-distribution
  - information-theory
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Perturbation Methods

Initial condition perturbations must lie along the fastest-growing error directions. Two widely-used methods are:

- **Singular vectors (ECMWF):** perturbations that maximise total energy growth over an optimisation interval $\tau$, found as leading eigenvectors of $\mathbf{L}^T \mathbf{E}\,\mathbf{L}$ where $\mathbf{L}$ is the linearised model.
- **Bred vectors (NCEP):** finite-size perturbations cycled through the nonlinear model and renormalised periodically.

The ECMWF ensemble uses 50 perturbed members plus one unperturbed control.

## Probabilistic Verification

The spread-skill relationship checks that ensemble spread is a reliable uncertainty estimate:

$$\sigma_{\text{spread}}^2 \approx \overline{(x_{\text{ctrl}} - x_{\text{obs}})^2} = \text{RMSE}^2$$

The Continuous Ranked Probability Score (CRPS) is a proper scoring rule for probabilistic forecasts:

$$\text{CRPS} = \int_{-\infty}^{\infty}\left[F(y) - \mathbf{1}(y \geq x_{\text{obs}})\right]^2 dy$$

where $F(y)$ is the ensemble CDF. Lower CRPS indicates sharper, better-calibrated forecasts.

## Ensemble Mean and Reliability

The ensemble mean $\bar{x} = N^{-1}\sum_{i=1}^{N} x_i$ minimises expected squared error among all linear combinations of members. A rank histogram (Talagrand diagram) tests reliability: a flat histogram indicates a well-calibrated ensemble, while U-shaped or domed histograms reveal under- or over-dispersion.
