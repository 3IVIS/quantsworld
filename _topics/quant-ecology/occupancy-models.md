---
title: "Occupancy Models"
field: quant-ecology
description: Occupancy models estimate species occurrence probability while explicitly accounting for imperfect detection, using repeated surveys across sites.
intro: >
  Ecologists rarely detect every species present at a site. Failing to account for imperfect detection confounds absence (species not there) with non-detection (species there but missed), biasing occupancy estimates downward. Occupancy models, formalized by MacKenzie et al. (2002), partition the observation process into true occurrence ($\psi$) and detection given presence ($p$), recovering unbiased estimates from repeated surveys. They have become the workhorse for monitoring programs and species distribution modeling.
math_concepts:
  - probability-theory
  - bayes-theorem
  - information-theory
  - markov-chains
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The Single-Season Occupancy Model

Consider $I$ sites surveyed $K_i$ times in a single season (short enough that occupancy is assumed constant — closure). Let $y_i$ be the number of detections at site $i$. The model has two components:

**State process**: site $i$ is occupied ($z_i = 1$) with probability $\psi$, or unoccupied ($z_i = 0$) with probability $1-\psi$.

**Observation process**: given occupancy, each visit yields a detection with probability $p$ (independently). Given absence, detection probability is zero.

The marginal likelihood, integrating over the latent occupancy state, is:

$$L(\psi, p \mid \mathbf{y}) = \prod_{i=1}^I \left[\psi\, p^{y_i}(1-p)^{K_i - y_i} + (1-\psi)\,\mathbf{1}(y_i = 0)\right]$$

The second term contributes only when $y_i = 0$: a site with zero detections is either unoccupied, or occupied but never detected. Maximum likelihood estimation of $\psi$ and $p$ proceeds by numerical optimization of $\ln L$.

Note the identifiability requirement: $K_i \geq 2$ visits per site (with at least some variation in detection history across sites) is needed to separately estimate $\psi$ and $p$.

## Covariates and the Occupancy Regression

Real applications model $\psi_i$ and $p_{ij}$ as functions of site-level and visit-level covariates through logit links:

$$\text{logit}(\psi_i) = \mathbf{x}_i^\top \boldsymbol{\beta}, \qquad \text{logit}(p_{ij}) = \mathbf{w}_{ij}^\top \boldsymbol{\alpha}$$

Site covariates for $\psi$: habitat type, elevation, area, vegetation index. Visit covariates for $p$: time of day, temperature, observer experience, weather. This separation is crucial — confusing detection covariates with occupancy covariates leads to biased inference about habitat associations.

Model selection uses AIC or AICc: $\text{AIC} = -2\ln\hat{L} + 2K$ where $K$ is the number of parameters. A model with heterogeneous detection $p(\text{date})$ is favored over constant $p$ if $\Delta \text{AIC} < 2$.

## Multi-Season (Dynamic) Occupancy

The **dynamic occupancy model** (Hines et al., Royle and Dorazio) extends to $T$ seasons with transition probabilities:

$$\text{colonization}: P(z_{it}=1 \mid z_{i,t-1}=0) = \gamma_t$$
$$\text{survival}: P(z_{it}=1 \mid z_{i,t-1}=1) = \phi_t = 1 - \epsilon_t$$

The occupancy in season $t$ satisfies the recursion:

$$\psi_t = \psi_{t-1}\,\phi_{t-1} + (1 - \psi_{t-1})\,\gamma_{t-1}$$

The full likelihood is a **hidden Markov model (HMM)** over the latent binary occupancy states. The forward algorithm computes the likelihood efficiently in $O(IT)$ time rather than summing over all $2^{IT}$ state sequences.

| Parameter | Symbol | Interpretation |
|---|---|---|
| Occupancy | $\psi$ | Probability a site is occupied |
| Detection | $p$ | Probability of detecting the species given presence |
| Colonization | $\gamma$ | Probability an unoccupied site becomes occupied |
| Local extinction | $\epsilon$ | Probability an occupied site becomes unoccupied |

## Bayesian Occupancy Models

In a Bayesian framework, the latent occupancy states $z_i$ are treated as parameters and estimated jointly with $\psi$ and $p$ via MCMC. The data augmentation formulation:

$$z_i \sim \text{Bernoulli}(\psi)$$
$$y_{ij} \sim \text{Bernoulli}(z_i \cdot p)$$

With priors $\psi \sim \text{Beta}(a,b)$ and $p \sim \text{Beta}(c,d)$, Gibbs sampling cycles between the full conditionals. For sites with $y_i > 0$, $z_i = 1$ with certainty. For sites with $y_i = 0$:

$$P(z_i = 1 \mid y_i = 0, \psi, p) = \frac{\psi(1-p)^{K_i}}{\psi(1-p)^{K_i} + (1-\psi)}$$

This posterior update quantifies the evidence for absence vs. undetected presence, naturally accounting for detection effort $K_i$.
