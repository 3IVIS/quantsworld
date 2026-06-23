---
title: "Decision Trees"
field: machine-learning
description: Recursive partitioning of the feature space using impurity-based splitting criteria to build interpretable prediction rules.
intro: >
  Decision trees partition the feature space into axis-aligned rectangular regions, assigning a constant prediction within each leaf. The recursive binary splitting algorithm greedily minimizes an impurity criterion at each node, yielding an interpretable model that requires no feature scaling and handles mixed variable types naturally. Understanding tree bias-variance behavior is the foundation for ensemble methods such as random forests and gradient boosting.
math_concepts:
  - information-theory
  - probability-theory
  - optimization
difficulty: intermediate
difficulty_level: 3
read_time: 11
---

## Recursive Partitioning

A decision tree partitions the feature space $\mathcal{X} = \mathbb{R}^d$ into $M$ disjoint regions $R_1, \ldots, R_M$ and predicts:

$$f(\mathbf{x}) = \sum_{m=1}^M c_m \,\mathbf{1}[\mathbf{x} \in R_m]$$

For regression, $c_m = \bar{y}_{R_m}$ (mean of training responses in region $m$); for classification, $c_m = \text{mode}(\{y_i : \mathbf{x}_i \in R_m\})$.

**Splitting.** At each internal node containing data subset $S$, choose a feature $j$ and threshold $t$ to split:

$$S_L = \{(\mathbf{x}, y) \in S : x_j \leq t\}, \qquad S_R = \{(\mathbf{x}, y) \in S : x_j > t\}$$

The split $(j^*, t^*)$ minimizes the weighted impurity:

$$\min_{j, t} \quad \frac{|S_L|}{|S|} I(S_L) + \frac{|S_R|}{|S|} I(S_R)$$

where $I(\cdot)$ is an impurity measure. Recursion continues until a stopping criterion (max depth, minimum leaf size, impurity threshold) is met.

**Search complexity.** For $n$ samples and $d$ features: at each node, evaluate $O(nd)$ splits (for each feature, $n-1$ candidate thresholds). Each level of depth costs $O(nd)$; total for depth $D$ tree: $O(ndD)$.

## Impurity Measures

### Classification Impurity

Let $\hat{p}_k$ be the fraction of class-$k$ examples in node $S$. Three standard measures:

**Gini impurity:**

$$G(S) = \sum_{k=1}^K \hat{p}_k(1 - \hat{p}_k) = 1 - \sum_k \hat{p}_k^2$$

Interpretation: the probability of misclassifying a randomly drawn example if it is labeled by a random draw from the empirical class distribution.

**Entropy (information gain):**

$$H(S) = -\sum_{k=1}^K \hat{p}_k \log_2 \hat{p}_k$$

The **information gain** of a split is $\text{IG} = H(S) - \frac{|S_L|}{|S|}H(S_L) - \frac{|S_R|}{|S|}H(S_R)$.

**Misclassification error:**

$$E(S) = 1 - \max_k \hat{p}_k$$

All three measures are concave in $\hat{p}$, zero when the node is pure, and maximal at $\hat{p}_k = 1/K$.

**Comparison for binary case ($K=2$, $p = \hat{p}_1$):**

| Measure | Formula | Value at $p=0.5$ |
|---------|---------|-----------------|
| Gini | $2p(1-p)$ | 0.5 |
| Entropy | $-p\log_2 p - (1-p)\log_2(1-p)$ | 1.0 |
| Error | $1 - \max(p, 1-p)$ | 0.5 |

Gini and entropy are differentiable and preferred for splitting; misclassification error is used for pruning cost evaluation.

### Regression Impurity

For regression, impurity is the within-node variance:

$$I(S) = \frac{1}{|S|}\sum_{(\mathbf{x},y) \in S} (y - \bar{y}_S)^2$$

Minimizing weighted variance is equivalent to minimizing the training MSE. The optimal leaf prediction is indeed $c_m = \bar{y}_{R_m}$, and the total loss is:

$$\text{RSS} = \sum_{m=1}^M \sum_{i:\,\mathbf{x}_i \in R_m} (y_i - \bar{y}_{R_m})^2$$

## Pruning and Cost-Complexity

Deep trees overfit. **Cost-complexity pruning** (used in CART) introduces a regularized objective:

$$R_\alpha(T) = \sum_{m=1}^{|T|} n_m I(R_m) + \alpha |T|$$

where $|T|$ is the number of leaves and $\alpha \geq 0$ is a complexity penalty.

**Algorithm:**
1. Grow the full tree $T_{\max}$
2. For each internal node $t$, compute the threshold $\alpha_t = \frac{R(t) - R(T_t)}{|T_t| - 1}$ where $R(t)$ is the impurity of collapsing the subtree rooted at $t$ into a leaf, and $T_t$ is that subtree
3. Prune the weakest link (smallest $\alpha_t$) to get a sequence of nested trees $T_0 \supset T_1 \supset \cdots \supset \{t_0\}$
4. Select $\alpha$ (and hence the tree) by cross-validation

The key insight is that as $\alpha$ increases, a finite sequence of nested subtrees spans all optimal solutions — so cross-validation over this sequence is efficient.

**Effective pruning levels.** Let $\alpha_1 < \alpha_2 < \cdots < \alpha_K$ be the pruning thresholds. For $\alpha \in [\alpha_k, \alpha_{k+1})$, the optimal tree is $T_k$. Cross-validation selects the $k$ minimizing held-out error, then returns $T_k$.

## Continuous vs. Categorical Features and Missing Values

### Continuous Features

For a continuous feature $X_j$, candidate thresholds are the midpoints between consecutive distinct values: $t = (x_{(k)} + x_{(k+1)})/2$. After sorting the $n$ values, all $n-1$ thresholds are evaluated in $O(n)$ time using cumulative statistics.

### Categorical Features

For a categorical feature with $K$ categories, there are $2^{K-1} - 1$ possible binary splits. This is intractable for large $K$.

**For regression and binary classification**, an optimal split can be found in $O(K \log K)$ by sorting categories by their mean response and searching thresholds among this ordered list. For multi-class problems, the exponential search is generally unavoidable (though greedy heuristics work in practice).

### Missing Values

CART uses **surrogate splits**: for each primary split on feature $j$, learn surrogate splits on other features that best replicate the primary split's partition. At test time, if $x_j$ is missing, use the best surrogate.

Alternatively, assign missing values to the majority branch or use a separate "missing" category.

## Bias-Variance Analysis

For a single tree with $M$ leaves fit on $n$ training points, each leaf contains $\approx n/M$ points. The bias-variance decomposition of MSE at $\mathbf{x}$:

$$\text{MSE}(\mathbf{x}) = \text{Bias}^2(\mathbf{x}) + \text{Variance}(\mathbf{x})$$

**Bias** arises from within-leaf averaging: all $\mathbf{x}$ in a region are assigned the same prediction. Larger regions (shallow trees) have higher bias.

**Variance** arises from estimating leaf means from finite samples. A leaf with $n/M$ samples has variance $\sigma^2 M/n$. More leaves (deep trees) have higher variance.

The optimal tree depth balances these: $M^* = O(n^{d/(d+2)})$ for a $d$-dimensional regression problem with smooth $f$, giving MSE $= O(n^{-2/(d+2)})$ — the curse of dimensionality rate for nonparametric estimation.

**Comparison with linear models:**

| Property | Decision Tree | Linear Model |
|----------|--------------|-------------|
| Decision boundary | Axis-aligned piecewise constant | Linear hyperplane |
| Extrapolation | Constant (last leaf value) | Linear extrapolation |
| Interaction handling | Automatic | Requires feature engineering |
| Interpretability | High (small trees) | High |
| Optimal for | Heterogeneous, interaction-rich data | Smooth, low-dimensional data |

Trees perform poorly relative to linear models when the true function is globally smooth and the dimension is moderate — the reason ensembles (random forests, boosting) almost always outperform single trees in practice.

## Axis-Aligned vs. Oblique Splits

Standard CART uses **axis-aligned splits** $x_j \leq t$. An **oblique split** uses a linear combination: $\mathbf{v}^\top \mathbf{x} \leq t$, aligning the boundary with the actual class structure.

Oblique splits are more expressive — an axis-aligned tree may need $O(2^k)$ nodes to approximate a single oblique split in $k$ dimensions. However, finding the optimal oblique split is NP-hard (related to minimum hyperplane separation), so heuristic methods (random projections, linear discriminant-based splits) are used in practice. Oblique trees are deeper to interpret but can achieve lower error at smaller tree size.
