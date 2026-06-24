---
title: Information Geometry
slug: information-geometry
equation: 'g_{ij}(\theta) = \mathbb{E}\left[\partial_i \ell\,\partial_j \ell\right]'
intro: >
  Information geometry equips families of probability distributions with a
  Riemannian structure, where the Fisher information matrix serves as the metric
  tensor. This geometric perspective unifies statistical inference, information
  theory, and machine learning, yielding the natural gradient as the
  intrinsically correct direction of steepest descent on a statistical manifold.
related_concepts:
  - differential-geometry
  - information-theory
  - optimization
  - maximum-entropy
  - measure-theory
difficulty: advanced
difficulty_level: 3
---

## Statistical manifolds and Fisher metric

A parametric family $\{p(x;\theta) : \theta \in \Theta\}$ forms a statistical manifold. The Fisher information matrix defines a Riemannian metric:

$$g_{ij}(\theta) = \mathbb{E}_\theta\!\left[\frac{\partial \ell}{\partial \theta^i}\frac{\partial \ell}{\partial \theta^j}\right] = -\mathbb{E}_\theta\!\left[\frac{\partial^2 \ell}{\partial \theta^i \partial \theta^j}\right]$$

where $\ell = \log p(x;\theta)$ is the log-likelihood. The geodesic distance between distributions under this metric captures statistical distinguishability.

## Cramér-Rao bound and $\alpha$-connections

The Cramér-Rao bound $\operatorname{Var}(\hat{\theta}) \geq g^{-1}(\theta)$ follows directly from the metric structure, bounding estimator variance from below. The $\alpha$-connections (due to Amari) define a one-parameter family of affine connections on the manifold; the $\pm 1$ connections correspond to exponential and mixture families respectively, which are dual under the Fisher metric.

## Applications

Natural gradient descent replaces the ordinary gradient with $\tilde{\nabla} L = g^{-1}(\theta)\nabla L$, invariant to reparametrization and converging faster in practice. Applications include efficient training of neural networks, variational inference, expectation-maximization algorithms, and online learning in exponential families.
