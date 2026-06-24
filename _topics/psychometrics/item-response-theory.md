---
title: "Item Response Theory"
field: psychometrics
description: Probabilistic models linking latent trait levels to item response probabilities via item characteristic curves.
intro: >
  Item Response Theory (IRT) models the probability of a correct response as a
  function of a respondent's latent ability $\theta$ and item parameters. Unlike
  Classical Test Theory, IRT places persons and items on the same scale, enabling
  adaptive testing and robust item calibration.
math_concepts:
  - probability-theory
  - optimization
  - information-theory
  - numerical-methods
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Item Characteristic Curves

The three-parameter logistic (3PL) model defines the probability of a correct response as:

$$P(\theta) = c + \frac{1 - c}{1 + e^{-a(\theta - b)}}$$

where $a$ is the discrimination parameter (slope), $b$ is the difficulty (location), and $c$ is the pseudo-guessing lower asymptote. Setting $c = 0$ yields the 2PL; additionally fixing $a = 1$ yields the 1PL (Rasch-family).

| Parameter | Symbol | Interpretation |
|-----------|--------|---------------|
| Discrimination | $a$ | Steepness of the ICC at $b$ |
| Difficulty | $b$ | $\theta$ at which $P = (1+c)/2$ |
| Guessing | $c$ | Lower asymptote ($0 \le c < 1$) |

## Item and Test Information

The item information function quantifies how precisely an item measures ability:

$$I_i(\theta) = \frac{[P'_i(\theta)]^2}{P_i(\theta)\,Q_i(\theta)}$$

where $Q_i = 1 - P_i$. For the 2PL this simplifies to $I_i(\theta) = a_i^2 P_i Q_i$. Test information is additive across items:

$$I(\theta) = \sum_{i=1}^{k} I_i(\theta)$$

The standard error of measurement at a given ability level is $\text{SE}(\theta) = 1/\sqrt{I(\theta)}$.

## Parameter Estimation

Item parameters are estimated via marginal maximum likelihood (MML), integrating over the latent ability distribution. Person parameters are recovered by maximum likelihood or expected a posteriori (EAP) estimation given calibrated item parameters. The likelihood for person $n$ is:

$$L(\theta_n) = \prod_{i=1}^{k} P_i(\theta_n)^{u_{ni}}\,[1 - P_i(\theta_n)]^{1 - u_{ni}}$$

Fit is assessed using $\chi^2$-based outfit and infit statistics.
