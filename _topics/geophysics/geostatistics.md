---
title: "Geostatistics"
field: geophysics
description: Variograms, kriging, and sequential simulation quantify spatial uncertainty in subsurface property estimation.
intro: >
  Geostatistics applies spatial statistics to problems where observations are scattered and correlated in space. Kriging provides the best linear unbiased estimate of a spatially varying property, while sequential Gaussian simulation generates multiple equally probable realisations to quantify uncertainty in resource models and reservoir characterisation.
math_concepts:
  - gaussian-distribution
  - linear-algebra
  - probability-theory
  - random-processes
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The Variogram

The experimental semi-variogram quantifies how spatial correlation decays with separation distance $h$:

$$\hat{\gamma}(h) = \frac{1}{2|N(h)|} \sum_{N(h)} \bigl[Z(\mathbf{x}_i) - Z(\mathbf{x}_j)\bigr]^2$$

where $N(h)$ is the set of pairs separated by lag $h$. Theoretical variogram models (spherical, exponential, Gaussian) are fitted to the experimental semi-variogram:

| Model | $\gamma(h)$ for $h \leq a$ |
|-------|---------------------------|
| Spherical | $C_0 + C\bigl[\tfrac{3h}{2a} - \tfrac{h^3}{2a^3}\bigr]$ |
| Exponential | $C_0 + C\bigl[1 - e^{-h/a}\bigr]$ |
| Gaussian | $C_0 + C\bigl[1 - e^{-h^2/a^2}\bigr]$ |

The nugget $C_0$, sill $C_0 + C$, and range $a$ characterise the spatial structure.

## Ordinary Kriging

Given $n$ data values $z(\mathbf{x}_i)$, the kriging estimator at unsampled location $\mathbf{x}_0$ is a weighted sum $\hat{Z}(\mathbf{x}_0) = \sum_{i=1}^n \lambda_i z(\mathbf{x}_i)$. Weights are obtained by solving the kriging system:

$$\begin{pmatrix} \boldsymbol{\Gamma} & \mathbf{1} \\ \mathbf{1}^T & 0 \end{pmatrix} \begin{pmatrix} \boldsymbol{\lambda} \\ \mu \end{pmatrix} = \begin{pmatrix} \boldsymbol{\gamma}_0 \\ 1 \end{pmatrix}$$

where $\Gamma_{ij} = \gamma(\mathbf{x}_i - \mathbf{x}_j)$, $\gamma_{0i} = \gamma(\mathbf{x}_i - \mathbf{x}_0)$, and $\mu$ is a Lagrange multiplier enforcing the unbiasedness constraint $\sum \lambda_i = 1$. The kriging variance $\sigma_K^2 = \boldsymbol{\lambda}^T \boldsymbol{\gamma}_0 + \mu$ provides a measure of estimation uncertainty.

## Sequential Gaussian Simulation

Sequential Gaussian simulation (SGS) visits each grid node in random order, draws a value from the local conditional Gaussian distribution (estimated by kriging the already-simulated nodes), and adds the simulated value to the conditioning data set. Repeating with different random seeds yields an ensemble of realisations that honour both data and variogram model.
