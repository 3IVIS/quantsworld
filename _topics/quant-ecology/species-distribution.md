---
title: "Species Distribution Models"
field: quant-ecology
description: Species distribution models (SDMs) relate occurrence records to environmental predictors to estimate and project a species' ecological niche in geographic space.
intro: >
  Species distribution models (SDMs) link species occurrence or abundance data to environmental predictors — climate, topography, land cover — to estimate the species' realized niche and project its distribution across geographic space and future climate scenarios. The field spans simple logistic regression through maximum entropy (MaxEnt) and machine learning approaches, each making different assumptions about the data-generating process. Rigorous evaluation of model performance and transferability to novel conditions is critical for conservation and management applications.
math_concepts:
  - maximum-entropy
  - probability-theory
  - information-theory
difficulty: intermediate
difficulty_level: 3
read_time: 11
---

## The Ecological Niche and Geographic Distribution

The **Hutchinsonian niche** is the hypervolume in environmental space within which a species can maintain a non-declining population. SDMs approximate this niche by modeling the statistical relationship between occurrence records and environmental variables at those locations.

For a species with occurrence data $y_i \in \{0, 1\}$ at sites $i = 1, \ldots, n$ and environmental predictors $\mathbf{x}_i \in \mathbb{R}^p$, the fundamental SDM problem is to estimate:

$$\Pr(y_i = 1 \mid \mathbf{x}_i) = f(\mathbf{x}_i;\, \boldsymbol{\theta})$$

for some function $f$ with parameters $\boldsymbol{\theta}$. The predicted probabilities $\hat{p}_i$ are then mapped geographically to produce a distribution map.

A central challenge is **presence-only data**: most museum and citizen science records (GBIF, iNaturalist) indicate presence but not confirmed absence. This requires either pseudo-absence selection, case-control regression, or maximum entropy methods.

## MaxEnt: Maximum Entropy Modeling

MaxEnt (Phillips et al. 2006) models the probability distribution $p(\mathbf{x})$ of environmental conditions at species presence locations by finding the distribution of maximum entropy subject to constraints on environmental feature expectations.

The **principle of maximum entropy** selects:

$$p^* = \arg\max_{p \in \mathcal{P}} H(p) = -\int p(\mathbf{x})\ln p(\mathbf{x})\,d\mathbf{x}$$

subject to the constraints:

$$\mathbb{E}_{p}[f_k(\mathbf{x})] = \mathbb{E}_{\hat{p}}[f_k(\mathbf{x})], \quad k = 1, \ldots, K$$

where $f_k$ are environmental features (linear terms, quadratic terms, products, thresholded indicators), $\mathbb{E}_{p}$ is the expectation under the model, and $\mathbb{E}_{\hat{p}}$ is the empirical mean of the feature at presence locations.

By the method of Lagrange multipliers, the constrained maximum entropy distribution has the Gibbs (exponential family) form:

$$p^*(\mathbf{x}) = \frac{1}{Z(\boldsymbol{\lambda})}\exp\!\left(\sum_k \lambda_k f_k(\mathbf{x})\right) q(\mathbf{x})$$

where $q(\mathbf{x})$ is the background distribution (typically uniform over the study area), $\boldsymbol{\lambda}$ are the Lagrange multipliers (feature weights), and $Z(\boldsymbol{\lambda})$ is the partition function. MaxEnt with L1 regularization ($\ell_1$ penalty on $|\lambda_k|$) is equivalent to minimizing:

$$\ell(\boldsymbol{\lambda}) = \ln Z(\boldsymbol{\lambda}) - \sum_k \lambda_k \hat{\mathbb{E}}[f_k] + \alpha \|\boldsymbol{\lambda}\|_1$$

Regularization prevents overfitting to small presence samples; the penalty $\alpha$ is tuned via cross-validation or AIC.

## Logistic Regression SDMs

When absence data are available (true absences or random background points used as pseudo-absences), **logistic regression** provides a natural SDM:

$$\text{logit}(\Pr(y=1 \mid \mathbf{x})) = \beta_0 + \boldsymbol{\beta}^\top \mathbf{x}$$

with log-likelihood:

$$\ell(\boldsymbol{\beta}) = \sum_{i=1}^n \left[y_i \log p_i + (1-y_i)\log(1-p_i)\right]$$

Quadratic and interaction terms $x_j^2$, $x_j x_k$ can be included for nonlinear response curves. Regularized logistic regression (Ridge or LASSO) is preferred with $p > 30$ predictors to avoid multicollinearity and overfitting.

Generalized Additive Models (GAMs) replace linear terms with smooth splines $s_j(x_j)$:

$$\text{logit}(p) = \beta_0 + \sum_j s_j(x_j)$$

providing flexible unimodal or multimodal response curves fitted by penalized regression splines.

## Boosted Regression Trees

**Boosted regression trees** (BRT, also called gradient boosted machines) build an ensemble of regression trees sequentially, with each tree fitted to the residuals of the previous ensemble:

$$\hat{f}^{(m)}(\mathbf{x}) = \hat{f}^{(m-1)}(\mathbf{x}) + \nu\, h_m(\mathbf{x})$$

where $h_m$ is a regression tree fitted to the negative gradient (pseudo-residuals) of the loss function and $\nu \in (0,1]$ is the learning rate (shrinkage). For binary occurrence data with log-loss:

$$\text{pseudo-residuals}_i = y_i - \hat{p}_i^{(m-1)}$$

BRT handles nonlinear interactions, missing data, and variable importance automatically. The **relative influence** of predictor $j$ is:

$$I_j^2 = \frac{1}{M}\sum_{m=1}^M \sum_{\text{splits on }x_j} \Delta \text{MSE}_m$$

summed over all splits on variable $j$ across $M$ trees. BRT typically outperforms logistic regression and MaxEnt on complex real datasets (Elith et al. 2006 comparison).

## Spatial Autocorrelation and Model Evaluation

**Moran's I** tests for spatial autocorrelation in SDM residuals:

$$I = \frac{n}{\sum_{ij} w_{ij}} \cdot \frac{\sum_i \sum_j w_{ij}(y_i - \bar{y})(y_j - \bar{y})}{\sum_i (y_i - \bar{y})^2}$$

where $w_{ij}$ are spatial weights (1 if sites $i,j$ are neighbors, 0 otherwise). Significant $I > 0$ in residuals indicates missing spatial structure in the model, which inflates apparent predictive performance in non-spatially-blocked cross-validation.

**Model evaluation metrics:**

| Metric | Formula | Range | Notes |
|--------|---------|-------|-------|
| AUC-ROC | $\int_0^1 \text{TPR}\,d\text{FPR}$ | 0.5–1 | Threshold-independent |
| TSS | Sensitivity + Specificity − 1 | −1 to 1 | Threshold-dependent; 0 = random |
| Boyce Index | Spearman $\rho$ of F/P ratio | −1 to 1 | Presence-only |
| RMSE | $\sqrt{\frac{1}{n}\sum(y_i-\hat{p}_i)^2}$ | 0 to 1 | Calibration |

**Spatial cross-validation** blocks the study area into geographically distinct training and test folds to obtain honest predictive performance estimates unaffected by spatial autocorrelation.

## Climate Change Projections and Transferability

SDMs are routinely projected to future climate scenarios (SSP2-4.5, SSP5-8.5 from CMIP6) to forecast range shifts. The standard workflow:

1. Fit model to current climate (e.g., WorldClim 1970–2000 bioclimatic variables).
2. Project to future climate grids (2041–2060, 2081–2100).
3. Compute range change metrics: area gained, lost, stable; centroid shift; elevation shift.

Transferability is assessed via **environmental space extrapolation** (MESS — Multivariate Environmental Similarity Surface):

$$\text{MESS}_i = \min_j \text{MESS}_{ij}$$

where $\text{MESS}_{ij}$ measures how well the value of variable $j$ at transfer location $i$ falls within the range seen during training. Negative MESS values indicate extrapolation beyond training conditions, where predictions are unreliable.

**Ensemble modeling** averages predictions across multiple algorithm types (MaxEnt, BRT, GLM, GAM, RF) weighted by their cross-validated AUC, reducing the sensitivity of projections to algorithm choice. Committee averaging (presence/absence threshold per model, then vote) is an alternative less sensitive to threshold choice.
