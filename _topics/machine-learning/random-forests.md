---
title: "Random Forests"
field: machine-learning
description: An ensemble method combining bagged decision trees with random feature subsets to produce low-variance, high-accuracy predictions.
intro: >
  Random forests build a large collection of decorrelated decision trees by training each tree on a bootstrap sample of the data and restricting splits to a random subset of features. The ensemble prediction averages over all trees, dramatically reducing variance relative to a single tree while keeping bias low. The method provides built-in out-of-bag error estimates, feature importance measures, and proximity matrices without requiring a separate validation set.
math_concepts:
  - probability-theory
  - information-theory
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## Bootstrap Aggregation (Bagging)

Bagging reduces the variance of a high-variance base learner by averaging over models trained on independent bootstrap samples. Given a training set $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^n$, draw $B$ bootstrap samples $\mathcal{D}^{*b}$ each of size $n$ with replacement. Train a tree $\hat{f}^b$ on each and aggregate:

$$\hat{f}_{\text{bag}}(x) = \frac{1}{B} \sum_{b=1}^B \hat{f}^b(x)$$

For classification the aggregation is by majority vote. The key insight is the bias-variance decomposition. For a squared-error regression problem, the expected MSE of a single tree decomposes as:

$$\mathbb{E}[(Y - \hat{f}(x))^2] = \text{Bias}^2(\hat{f}(x)) + \text{Var}(\hat{f}(x)) + \sigma^2_\varepsilon$$

Averaging $B$ independent unbiased estimators reduces variance by a factor of $B$. But bootstrap trees are correlated: if one strong predictor dominates, all trees look similar. Let $\rho$ be the pairwise correlation between trees and $\sigma^2$ be the variance of a single tree. Then the variance of the ensemble is:

$$\text{Var}\!\left(\frac{1}{B}\sum_{b=1}^B \hat{f}^b\right) = \rho\,\sigma^2 + \frac{1-\rho}{B}\,\sigma^2$$

As $B \to \infty$ the second term vanishes but the first term $\rho\,\sigma^2$ remains. Reducing $\rho$ between trees is the core motivation for random feature subsets.

## Random Feature Subsets and the Hyperparameter $m$

At each node, instead of searching all $p$ features for the best split, random forests sample $m < p$ features uniformly at random and find the best split among only those $m$ features. This introduces extra randomness that decorrelates the trees.

The hyperparameter $m$ controls the bias-variance tradeoff of the ensemble:

| Setting | Effect |
|---------|--------|
| $m = p$ | Standard bagging; trees still correlated |
| $m = \lfloor\sqrt{p}\rfloor$ | Default for classification |
| $m = \lfloor p/3 \rfloor$ | Default for regression |
| $m = 1$ | Fully randomized trees; maximum decorrelation, higher bias |

The split criterion itself is typically Gini impurity for classification or mean squared error (variance reduction) for regression. At a node with region $R$ containing classes $k = 1,\ldots,K$ with proportions $\hat{p}_k$, the Gini impurity is:

$$G(R) = \sum_{k=1}^K \hat{p}_k(1-\hat{p}_k) = 1 - \sum_{k=1}^K \hat{p}_k^2$$

The information-theoretic alternative is cross-entropy (deviance):

$$H(R) = -\sum_{k=1}^K \hat{p}_k \log \hat{p}_k$$

Both measure node impurity; a split sending region $R$ into $R_L$ and $R_R$ is scored by the weighted impurity decrease:

$$\Delta I = I(R) - \frac{|R_L|}{|R|}\,I(R_L) - \frac{|R_R|}{|R|}\,I(R_R)$$

## Out-of-Bag Error Estimation

Each bootstrap sample $\mathcal{D}^{*b}$ omits roughly $1/e \approx 36.8\%$ of observations. The probability that observation $i$ is not included in a single bootstrap draw is $(1 - 1/n)^n \to e^{-1}$. These out-of-bag (OOB) observations provide a nearly unbiased estimate of generalization error without requiring a separate held-out set.

For each observation $i$, collect the set of trees that did not use it in training:

$$\mathcal{B}_i = \{b : i \notin \mathcal{D}^{*b}\}$$

The OOB prediction for observation $i$ is:

$$\hat{f}_{\text{OOB}}(x_i) = \frac{1}{|\mathcal{B}_i|} \sum_{b \in \mathcal{B}_i} \hat{f}^b(x_i)$$

The OOB error is then computed as the average loss across all observations:

$$\widehat{\text{Err}}_{\text{OOB}} = \frac{1}{n}\sum_{i=1}^n L\!\left(y_i,\, \hat{f}_{\text{OOB}}(x_i)\right)$$

Studies show the OOB error converges to the leave-one-out cross-validation error as $B$ grows, making it an efficient substitute. The OOB error also provides a reliable convergence diagnostic: plot it against $B$ and stop when it plateaus.

## Feature Importance

Random forests offer two main variable importance measures that go beyond a single model's coefficients.

**Mean Decrease in Impurity (MDI).** For each feature $j$, sum the weighted impurity decreases over all splits on feature $j$ across all trees:

$$\text{MDI}_j = \frac{1}{B} \sum_{b=1}^B \sum_{t \in T^b : v(t)=j} \frac{|R_t|}{n} \cdot \Delta I(t)$$

where $v(t)$ is the splitting variable at node $t$ and $|R_t|/n$ is the fraction of training samples reaching node $t$. MDI is fast but biased toward high-cardinality continuous features.

**Permutation Importance.** For each tree $b$ and each feature $j$, permute the values of feature $j$ in the OOB sample, measure the increase in OOB error, and average across trees:

$$\text{PI}_j = \frac{1}{B}\sum_{b \in \mathcal{B}} \left[\widehat{\text{Err}}^b(\tilde{X}_j) - \widehat{\text{Err}}^b\right]$$

where $\tilde{X}_j$ denotes the data with feature $j$ permuted. Permutation importance is more reliable than MDI for correlated features and preserves the marginal distribution of each feature.

**Conditional importance** extends permutation importance by permuting feature $j$ only within strata defined by correlated features, removing the bias introduced when predictors are correlated.

## Variable Interactions and Proximity Matrix

The proximity matrix captures pairwise similarity between observations as inferred by the ensemble. Pass all $n$ observations down every tree; increment $\text{Prox}(i,j)$ by 1 whenever observations $i$ and $j$ land in the same leaf. Normalize:

$$\text{Prox}(i,j) = \frac{1}{B}\sum_{b=1}^B \mathbf{1}[\text{leaf}^b(x_i) = \text{leaf}^b(x_j)]$$

Proximity values range in $[0,1]$ and define a kernel on the feature space. Applications include:

- **Missing value imputation:** Replace missing $x_{ij}$ with the weighted average of non-missing values, weighted by proximity to observation $i$.
- **Outlier detection:** Observations with uniformly low proximity to all others may be anomalies; define an outlier score as $\left(\frac{1}{n}\sum_j \text{Prox}(i,j)^2\right)^{-1}$.
- **Visualization:** Apply multidimensional scaling to $1 - \text{Prox}$ to embed observations in 2D.

## Comparison with Boosting and Extrapolation Limits

| Property | Random Forest | Gradient Boosting |
|----------|--------------|-------------------|
| Training strategy | Parallel (independent trees) | Sequential (corrective) |
| Bias reduction | Limited (shallow bias) | Strong (iterative bias correction) |
| Variance reduction | Strong (averaging) | Moderate (regularized) |
| Overfitting risk | Low | Higher without tuning |
| Interpretability | OOB, importance | Partial dependence plots |
| Speed | Fast to train | Slower; depends on depth |
| Hyperparameters | $B$, $m$, min leaf size | Learning rate, depth, subsampling |

Both methods fail to **extrapolate** beyond the support of the training data. Because each prediction is an average of leaf-node constants, random forests predict a value within the range $[\min y_i, \max y_i]$ seen in training. For time series with trends or test data outside the training covariate range, this is a fundamental limitation. Monotone transformations, detrending, or gradient boosting with linear leaves ($\texttt{LinearTreeBoost}$) partially mitigate this.

The **bias-variance tradeoff as $m$ varies** can be summarized by writing the expected ensemble error for large $B$:

$$\mathbb{E}[\text{Err}] \approx \text{Bias}^2 + \rho(m)\,\sigma^2(m)$$

Increasing $m$ decreases bias (each tree is more powerful) but increases $\rho$ (trees look more alike). The optimal $m$ balances these competing effects and is typically found via OOB error or cross-validation over a grid.
