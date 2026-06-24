---
title: "Test Equating"
field: psychometrics
description: Statistical procedures that place scores from different test forms onto a common scale so they can be used interchangeably.
intro: >
  Test equating adjusts for differences in difficulty between parallel test
  forms, ensuring that a score on Form B means the same thing as the
  corresponding score on Form A. Valid equating requires that the forms measure
  the same construct and that an appropriate data-collection design links the
  two forms.
math_concepts:
  - probability-theory
  - numerical-methods
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Data Collection Designs

Two main designs provide the linkage needed for equating. The **common-item nonequivalent groups** (CINEG) design administers each form to a different population but includes a set of anchor items $A$ common to both forms. The **common-person** (single-group or counterbalanced) design has the same examinees take both forms.

## Linear Equating

Linear equating assumes that Form X and Form Y are linearly related. The equated score on the Y scale is:

$$y = \mu_Y + \frac{\sigma_Y}{\sigma_X}(x - \mu_X)$$

Mean and variance are matched; the slope $\sigma_Y/\sigma_X$ corrects for scale differences.

## Equipercentile Equating

Equipercentile equating maps $x$ to the score $y$ on Form Y with the same percentile rank:

$$e_Y(x) = F_Y^{-1}[F_X(x)]$$

where $F_X$ and $F_Y$ are the cumulative score distributions. Kernel smoothing is applied to the raw distributions before computing the conversion to reduce irregularities.

## IRT True-Score Equating

Under IRT, the true score on Form Y equivalent to true score $\tau_X$ on Form X satisfies:

$$\tau_X = \sum_{i \in X} P_i(\hat{\theta}), \qquad \tau_Y = \sum_{j \in Y} P_j(\hat{\theta})$$

The same latent $\hat{\theta}$ drives both sums. Common-item concurrent or separate calibration places both item banks on the same metric before the mapping is applied.
