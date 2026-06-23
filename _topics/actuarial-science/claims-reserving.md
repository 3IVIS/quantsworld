---
title: "Claims Reserving"
field: actuarial-science
description: Actuarial methods for estimating the amount an insurer must set aside to pay claims that have been incurred but not yet fully settled.
intro: >
  Claims reserving—estimating liabilities for incurred but unsettled losses—is one of the most consequential actuarial tasks: underestimates can lead to insolvency, overestimates distort profitability. The run-off triangle is the central data structure, organizing paid or incurred claims by accident year and development year. From the simple chain-ladder to the stochastic Mack and over-dispersed Poisson models, reserving methods span a spectrum from deterministic projections to full uncertainty quantification required by Solvency II and IFRS 17.
math_concepts:
  - probability-theory
  - numerical-methods
  - bayes-theorem
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## The Run-Off Triangle

A **run-off triangle** (development triangle) tabulates cumulative paid claims $C_{i,j}$ where:
- $i = 1, \ldots, n$ is the **accident year** (or underwriting year)
- $j = 1, \ldots, n$ is the **development year**
- Only cells with $i + j - 1 \le n$ are observed (the "upper triangle")

The **lower triangle** $\{C_{i,j} : i + j - 1 > n\}$ must be projected to estimate the **outstanding claims reserve**.

Example triangle (cumulative paid losses, £000s):

| Acc.\Dev. | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 2020 | 1,001 | 1,855 | 2,423 | 2,988 | 3,410 |
| 2021 | 1,113 | 2,103 | 2,774 | 3,422 | **?** |
| 2022 | 1,265 | 2,433 | 3,233 | **?** | **?** |
| 2023 | 1,490 | 2,873 | **?** | **?** | **?** |
| 2024 | 1,725 | **?** | **?** | **?** | **?** |

**IBNR** (Incurred But Not Reported) reserves cover claims that have occurred but not yet been reported. **IBNER** (Incurred But Not Enough Reserved) covers reported claims still developing. The total **Outstanding Claims Provision** includes both.

## Chain-Ladder Method

The **chain-ladder** (development method) assumes that cumulative claims develop by age-to-age **factors** that are stable across accident years.

The **development factor** from column $j$ to $j+1$ is:

$$
\hat{f}_j = \frac{\sum_{i=1}^{n-j} C_{i,j+1}}{\sum_{i=1}^{n-j} C_{i,j}}, \quad j = 1, \ldots, n-1
$$

This is a volume-weighted average: larger triangles in column $j$ receive proportionally more weight.

**Projection algorithm**:
1. Compute all $\hat{f}_j$ from the observed upper triangle.
2. Project: $\hat{C}_{i,j+1} = \hat{C}_{i,j} \cdot \hat{f}_j$ for each unseen cell, row by row.
3. The reserve for accident year $i$ is: $\hat{R}_i = \hat{C}_{i,n} - C_{i,n+1-i}$ (projected ultimate minus current diagonal).
4. Total reserve: $\hat{R} = \sum_i \hat{R}_i$.

The chain-ladder is equivalent to the **weighted least squares** regression of $C_{i,j+1}$ on $C_{i,j}$ with weights $1/C_{i,j}$, providing a least-squares interpretation.

**Tail factor**: Beyond the last observed development year, a tail $\hat{f}_{\infty}$ is applied. Common methods: curve-fitting (exponential, inverse power), benchmark from industry data, or $\hat{f}_{\infty} = 1.000$ (assuming full development).

## Bornhuetter-Ferguson Method

The **Bornhuetter-Ferguson (BF)** method blends the chain-ladder projection with an **a priori** (external) loss estimate $\mu_i$ (e.g., from pricing):

$$
\hat{C}_{i,n}^{\text{BF}} = C_{i,j_i} + \mu_i \cdot (1 - 1/\hat{f}_i^{\text{ult}})
$$

where $j_i = n + 1 - i$ is the current development year for accident year $i$, and $\hat{f}_i^{\text{ult}} = \hat{f}_{j_i} \cdot \hat{f}_{j_i+1} \cdots \hat{f}_{n-1}$ is the cumulative development factor to ultimate.

The factor $(1 - 1/\hat{f}_i^{\text{ult}})$ is the **expected unreported percentage**, so BF adds the expected unreported IBNR to the actual paid claims.

**Comparison with chain-ladder**:

| Method | Ultimate = | Weight on data | Weight on prior |
|---|---|---|---|
| Chain-ladder | $C_{i,j_i} \times \hat{f}_i^{\text{ult}}$ | 100% | 0% |
| BF | $C_{i,j_i} + \mu_i(1-1/\hat{f}_i^{\text{ult}})$ | $1/\hat{f}_i^{\text{ult}}$ | $1 - 1/\hat{f}_i^{\text{ult}}$ |
| Bornhuetter (credibility) | $Z_i\bar{X}_i + (1-Z_i)\mu_i$ | $Z_i$ | $1-Z_i$ |

BF is preferred for immature accident years (small $1/\hat{f}^{\text{ult}}$) where few claims have been paid and the chain-ladder amplifies noise.

## Cape Cod Method

The **Cape Cod** (Bornhuetter-Ferguson with endogenous a priori) avoids specifying $\mu_i$ externally. Instead, the expected loss ratio is estimated from the data:

$$
\hat{\text{ELR}} = \frac{\sum_i C_{i,j_i}}{\sum_i P_i / \hat{f}_i^{\text{ult}}}
$$

where $P_i$ is the premium for accident year $i$ and $P_i / \hat{f}_i^{\text{ult}}$ is the **used-up premium** (the portion of premium that covers already-developed claims). Then:

$$
\mu_i = \hat{\text{ELR}} \times P_i
$$

Cape Cod is particularly useful when the a priori loss ratio varies across accident years and no external benchmark is available.

## Mack's Model and Uncertainty

**Mack's model** (1993) provides a distribution-free framework for quantifying the **prediction error** of the chain-ladder reserve, without assuming a parametric distribution.

Assumptions:
1. $E[C_{i,j+1} \mid C_{i,1}, \ldots, C_{i,j}] = C_{i,j} \cdot f_j$ (development factors explain all structure)
2. $\text{Var}(C_{i,j+1} \mid C_{i,j}) = C_{i,j} \cdot \sigma_j^2$ (variance proportional to cumulative)
3. Accident years are independent

Under these assumptions, Mack derived:

$$
\widehat{\text{MSE}}(\hat{R}_i) = \hat{C}_{i,n}^2 \sum_{j=j_i}^{n-1} \frac{\hat{\sigma}_j^2 / \hat{f}_j^2}{\sum_{k=1}^{n-j} C_{k,j}}
$$

with $\hat{\sigma}_j^2 = \frac{1}{n-j-1}\sum_{i=1}^{n-j} C_{i,j}\!\left(\frac{C_{i,j+1}}{C_{i,j}} - \hat{f}_j\right)^2$.

The total reserve standard error is:

$$
\text{SE}(\hat{R}) = \sqrt{\sum_i \widehat{\text{MSE}}(\hat{R}_i) + 2\sum_{i<k} \text{Cov}(\hat{R}_i, \hat{R}_k)}
$$

## Stochastic Reserving: ODP and Bootstrap

The **Over-Dispersed Poisson (ODP)** model assumes incremental payments $c_{i,j} = C_{i,j} - C_{i,j-1}$ satisfy:

$$
E[c_{i,j}] = x_i\,y_j, \quad \text{Var}(c_{i,j}) = \phi\,x_i\,y_j
$$

where $x_i$ are accident year parameters, $y_j$ are development year parameters, and $\phi > 0$ is the dispersion parameter ($\phi = 1$ is standard Poisson). MLE of $x_i, y_j$ exactly reproduces the chain-ladder development factors.

The **bootstrap** ODP method:
1. Fit the ODP model to obtain Pearson residuals $r_{i,j} = (c_{i,j} - \hat{c}_{i,j})/\sqrt{\hat{c}_{i,j}}$.
2. Resample residuals with replacement; reconstruct a pseudo-triangle.
3. Re-fit the chain-ladder to each pseudo-triangle and project.
4. Repeat 10,000 times to obtain the empirical distribution of the reserve.

This distribution captures **process variance** (random claim payments) and **parameter uncertainty** (estimation error in the factors).

**IFRS 17 implications**: Under IFRS 17, reserves must be a **contractual service margin (CSM)** plus **risk adjustment** (RA). The RA quantifies non-financial risk using a confidence interval (TVaR at 75% is common), making stochastic reserving methods an accounting requirement rather than merely an internal actuarial tool.
