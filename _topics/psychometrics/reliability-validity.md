---
title: "Reliability and Validity"
field: psychometrics
description: Core psychometric properties evaluating the consistency and accuracy of a measurement instrument.
intro: >
  Reliability refers to the consistency of scores across time, raters, or
  parallel forms; validity concerns whether a test measures what it is intended
  to measure. Both properties are prerequisites for defensible score
  interpretation, and modern validity theory treats validity as a unitary concept
  supported by multiple sources of evidence.
math_concepts:
  - probability-theory
  - hypothesis-testing
  - gaussian-distribution
difficulty: beginner
difficulty_level: 2
read_time: 8
---

## Internal Consistency: Cronbach's Alpha

Cronbach's $\alpha$ estimates reliability from the inter-item covariance structure:

$$\alpha = \frac{k}{k-1}\left(1 - \frac{\sum_{i=1}^k \sigma^2_i}{\sigma^2_X}\right)$$

For $k$ items with equal correlations $\bar{r}$, this reduces to the Spearman-Brown form: $\alpha = k\bar{r}/[1 + (k-1)\bar{r}]$. Values $\ge 0.70$ are conventionally acceptable.

## Inter-Rater Reliability

When scores depend on human judgment, rater agreement is quantified by:

| Coefficient | Application |
|-------------|-------------|
| Cohen's $\kappa$ | Categorical ratings, two raters |
| Weighted $\kappa$ | Ordinal categories with partial credit |
| ICC(2,1) | Continuous ratings, random raters, absolute agreement |

The intraclass correlation (ICC) under a two-way random model is:

$$\text{ICC} = \frac{\sigma^2_P}{\sigma^2_P + \sigma^2_R + \sigma^2_{PR} + \sigma^2_e}$$

## Convergent and Discriminant Validity

The **Multitrait-Multimethod (MTMM)** matrix tests whether a construct correlates more strongly with different methods measuring the same trait (convergent validity) than with the same method measuring different traits (discriminant validity). Campbell and Fiske's criteria require:

1. Validity coefficients exceed correlations in the heterotrait-monomethod triangles.
2. Validity coefficients exceed correlations in the heterotrait-heteromethod triangles.

Formally this is now tested via a CFA comparing trait-only, method-only, and combined factor models.
