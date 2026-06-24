---
title: "Differential Item Functioning"
field: psychometrics
description: Detection of items that favor one group over another after matching on the latent trait being measured.
intro: >
  Differential Item Functioning (DIF) occurs when examinees from different groups
  with the same underlying ability have different probabilities of endorsing an
  item. Identifying DIF is central to test fairness: an item exhibiting DIF may
  introduce construct-irrelevant variance that systematically advantages or
  disadvantages a particular group.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - information-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Uniform vs. Non-Uniform DIF

**Uniform DIF** occurs when one group consistently outperforms the other across all ability levels — the ICCs are shifted but do not cross. **Non-uniform DIF** occurs when the direction of the group difference changes at some ability level, producing crossing ICCs. This distinction matters because some detection methods are sensitive only to uniform DIF.

## Mantel-Haenszel Method

The Mantel-Haenszel (MH) procedure matches focal and reference groups on total score, then forms $2 \times 2$ contingency tables across score strata $s$:

$$\hat{\alpha}_{\text{MH}} = \frac{\sum_s A_s D_s / n_s}{\sum_s B_s C_s / n_s}$$

The common odds ratio $\hat{\alpha}_{\text{MH}}$ is transformed to the ETS $\Delta$ scale: $\Delta_{\text{MH}} = -2.35 \ln\hat{\alpha}_{\text{MH}}$. Items with $|\Delta_{\text{MH}}| \ge 1.5$ are flagged as moderate DIF (Category B) and $\ge 1.5$ with significance as large DIF (Category C).

## Logistic Regression DIF

A logistic regression approach models item response as a function of matching variable $\theta$, group membership $G$, and their interaction:

$$\logit[P(U=1)] = \beta_0 + \beta_1\theta + \beta_2 G + \beta_3(\theta \times G)$$

$\beta_2 \ne 0$ indicates uniform DIF; $\beta_3 \ne 0$ indicates non-uniform DIF. The likelihood-ratio test comparing nested models provides a $\chi^2$ test with 1 or 2 degrees of freedom.

## IRT-Based DIF: Lord's Chi-Squared

Under IRT, Lord's $\chi^2$ tests for simultaneous equality of item parameters across groups:

$$\chi^2 = (\hat{\mathbf{a}}_R - \hat{\mathbf{a}}_F)^\top \hat{\boldsymbol{\Sigma}}^{-1} (\hat{\mathbf{a}}_R - \hat{\mathbf{a}}_F)$$

where $\hat{\mathbf{a}}$ contains calibrated item parameters for reference (R) and focal (F) groups after scale linking.
