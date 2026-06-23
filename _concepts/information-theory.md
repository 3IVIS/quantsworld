---
title: Information Theory
slug: information-theory
equation: 'H(X) = -\sum_x p(x)\log_2 p(x)'
intro: >
  Information theory quantifies the fundamental limits of communication, compression,
  and inference. Entropy, mutual information, and the KL divergence connect it to
  machine learning, statistics, cryptography, and signal processing.
related_concepts:
  - probability-theory
  - maximum-entropy
  - optimization
difficulty: intermediate
difficulty_level: 3
---

## Shannon entropy

The entropy of a discrete random variable $X$ is:

$$H(X) = -\sum_x p(x)\log_2 p(x) \quad \text{bits}$$

It measures average uncertainty. Maximum entropy is achieved by the uniform distribution; minimum (zero) by a deterministic variable.

## KL divergence

The Kullback–Leibler divergence measures how much distribution $Q$ differs from $P$:

$$D_{KL}(P \| Q) = \sum_x p(x)\log\frac{p(x)}{q(x)} \geq 0$$

with equality iff $P = Q$. It appears as the ELBO in variational inference and as cross-entropy loss in ML.

## Mutual information

$$I(X; Y) = H(X) - H(X|Y) = D_{KL}(P_{XY} \| P_X P_Y)$$

Measures how much knowing $Y$ reduces uncertainty about $X$. Used in feature selection, ICA, and the information bottleneck.

## Channel capacity

The maximum mutual information over all input distributions is the channel capacity $C$ (Shannon, 1948):

$$C = \max_{p(x)} I(X; Y) \quad \text{bits/channel use}$$
