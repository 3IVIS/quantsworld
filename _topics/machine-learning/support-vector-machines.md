---
title: "Support Vector Machines"
field: machine-learning
description: Maximum-margin classifiers that find the optimal separating hyperplane using convex quadratic programming and the kernel trick.
intro: >
  Support vector machines find the hyperplane that maximizes the margin between classes, providing a geometrically motivated and theoretically grounded approach to classification. The dual formulation reveals that only a sparse set of training points — the support vectors — determine the decision boundary. Replacing the dot product with a kernel function extends SVMs to nonlinear boundaries without explicitly mapping to high-dimensional feature spaces.
math_concepts:
  - convex-optimization
  - kernel-methods
  - linear-algebra
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## Maximum Margin Classification

Given training data $\{(\mathbf{x}_i, y_i)\}_{i=1}^n$ with $y_i \in \{-1, +1\}$ and $\mathbf{x}_i \in \mathbb{R}^d$, a linear classifier predicts $\hat{y} = \text{sign}(\mathbf{w}^\top \mathbf{x} + b)$.

**Functional margin** of point $i$: $\hat{\gamma}_i = y_i(\mathbf{w}^\top \mathbf{x}_i + b)$.

**Geometric margin** (distance from $\mathbf{x}_i$ to the hyperplane $\mathbf{w}^\top \mathbf{x} + b = 0$):

$$\gamma_i = y_i \left(\frac{\mathbf{w}}{\|\mathbf{w}\|}\right)^\top \mathbf{x}_i + \frac{b}{\|\mathbf{w}\|}$$

The **margin** of the classifier is $\gamma = \min_i \gamma_i$. The SVM maximizes this margin.

### Hard-Margin SVM (Primal)

By canonical scaling (set $\min_i \hat{\gamma}_i = 1$), the primal problem becomes:

$$\min_{\mathbf{w}, b} \quad \frac{1}{2}\|\mathbf{w}\|^2$$

$$\text{s.t.} \quad y_i(\mathbf{w}^\top \mathbf{x}_i + b) \geq 1 \quad \forall i$$

This is a convex quadratic program. The margin equals $2/\|\mathbf{w}\|$, so minimizing $\|\mathbf{w}\|^2$ maximizes the margin. The hyperplanes $\mathbf{w}^\top \mathbf{x} + b = \pm 1$ are the **margin boundaries**; points on them are the **support vectors**.

## Lagrangian Dual and KKT Conditions

Introduce multipliers $\alpha_i \geq 0$ for each constraint. The Lagrangian:

$$\mathcal{L}(\mathbf{w}, b, \boldsymbol{\alpha}) = \frac{1}{2}\|\mathbf{w}\|^2 - \sum_{i=1}^n \alpha_i \left[y_i(\mathbf{w}^\top \mathbf{x}_i + b) - 1\right]$$

**Stationarity conditions** (setting partial derivatives to zero):

$$\frac{\partial \mathcal{L}}{\partial \mathbf{w}} = 0 \implies \mathbf{w} = \sum_{i=1}^n \alpha_i y_i \mathbf{x}_i$$

$$\frac{\partial \mathcal{L}}{\partial b} = 0 \implies \sum_{i=1}^n \alpha_i y_i = 0$$

Substituting back yields the **dual problem**:

$$\max_{\boldsymbol{\alpha}} \quad \sum_{i=1}^n \alpha_i - \frac{1}{2}\sum_{i=1}^n \sum_{j=1}^n \alpha_i \alpha_j y_i y_j \mathbf{x}_i^\top \mathbf{x}_j$$

$$\text{s.t.} \quad \alpha_i \geq 0, \quad \sum_{i=1}^n \alpha_i y_i = 0$$

**KKT complementary slackness:** $\alpha_i [y_i(\mathbf{w}^\top \mathbf{x}_i + b) - 1] = 0$ for all $i$.

This means:
- If $\alpha_i > 0$: $y_i(\mathbf{w}^\top \mathbf{x}_i + b) = 1$ — point is a **support vector** on the margin boundary
- If $\alpha_i = 0$: point is off the margin (correctly classified with margin $> 1$)

The solution is **sparse**: most $\alpha_i = 0$. The weight vector is a linear combination of only the support vectors:

$$\mathbf{w}^* = \sum_{i:\,\alpha_i > 0} \alpha_i y_i \mathbf{x}_i$$

Bias is recovered from any support vector: $b^* = y_s - \mathbf{w}^{*\top}\mathbf{x}_s$ (averaged over all support vectors in practice).

## Soft-Margin SVM

When data is not linearly separable, introduce slack variables $\xi_i \geq 0$ allowing constraint violations:

$$\min_{\mathbf{w}, b, \boldsymbol{\xi}} \quad \frac{1}{2}\|\mathbf{w}\|^2 + C\sum_{i=1}^n \xi_i$$

$$\text{s.t.} \quad y_i(\mathbf{w}^\top \mathbf{x}_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0 \quad \forall i$$

The **hinge loss** $\xi_i = \max(0, 1 - y_i(\mathbf{w}^\top \mathbf{x}_i + b))$ is the minimum feasible slack. The objective can be written:

$$\min_{\mathbf{w}, b} \quad \frac{1}{2}\|\mathbf{w}\|^2 + C\sum_{i=1}^n \max(0, 1 - y_i(\mathbf{w}^\top \mathbf{x}_i + b))$$

This is the **regularized hinge loss**: $\ell_2$ regularization with the hinge loss. The dual becomes:

$$\max_{\boldsymbol{\alpha}} \quad \sum_i \alpha_i - \frac{1}{2}\sum_{i,j} \alpha_i \alpha_j y_i y_j \mathbf{x}_i^\top \mathbf{x}_j \qquad \text{s.t.} \quad 0 \leq \alpha_i \leq C$$

The box constraint $\alpha_i \leq C$ is the only change from the hard-margin dual. The parameter $C$ controls the trade-off:
- Large $C$: penalize misclassification heavily; small margin, low bias, high variance
- Small $C$: allow more violations; wide margin, high bias, low variance

## The Kernel Trick

### Feature Maps and Mercer's Theorem

For nonlinear boundaries, map inputs to a higher-dimensional space: $\phi: \mathbb{R}^d \to \mathcal{H}$. The dual objective depends only on inner products $\phi(\mathbf{x}_i)^\top \phi(\mathbf{x}_j)$.

A **kernel function** $k(\mathbf{x}, \mathbf{x}') = \langle \phi(\mathbf{x}), \phi(\mathbf{x}')\rangle_\mathcal{H}$ computes this inner product without explicitly forming $\phi(\mathbf{x})$.

**Mercer's theorem.** A symmetric function $k: \mathcal{X} \times \mathcal{X} \to \mathbb{R}$ corresponds to a valid inner product (is a **positive definite kernel**) if and only if for all finite sets $\{\mathbf{x}_1, \ldots, \mathbf{x}_n\}$, the **Gram matrix** $K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)$ is positive semidefinite.

**Common kernels:**

| Kernel | Formula | Feature space |
|--------|---------|---------------|
| Linear | $\mathbf{x}^\top \mathbf{x}'$ | $\mathbb{R}^d$ |
| Polynomial | $(\mathbf{x}^\top \mathbf{x}' + c)^p$ | Degree-$p$ monomials |
| RBF (Gaussian) | $\exp\!\left(-\frac{\|\mathbf{x}-\mathbf{x}'\|^2}{2\sigma^2}\right)$ | Infinite-dimensional |
| Laplacian | $\exp\!\left(-\frac{\|\mathbf{x}-\mathbf{x}'\|_1}{\sigma}\right)$ | Infinite-dimensional |
| Sigmoid | $\tanh(\kappa \mathbf{x}^\top \mathbf{x}' + c)$ | (Not always PD) |

**RBF kernel expansion.** Using $e^{-\|\mathbf{x}-\mathbf{x}'\|^2/(2\sigma^2)} = e^{-\|\mathbf{x}\|^2/(2\sigma^2)} e^{\mathbf{x}^\top \mathbf{x}'/\sigma^2} e^{-\|\mathbf{x}'\|^2/(2\sigma^^2)}$ and Taylor-expanding $e^{\mathbf{x}^\top\mathbf{x}'/\sigma^2}$, the feature space is infinite-dimensional with exponentially decaying weights on higher-order terms.

### Kernelized Decision Function

Substituting the kernel, the prediction for a new point $\mathbf{x}$:

$$f(\mathbf{x}) = \text{sign}\!\left(\sum_{i:\,\alpha_i > 0} \alpha_i y_i k(\mathbf{x}_i, \mathbf{x}) + b\right)$$

The computational cost is $O(n_{\text{sv}} \cdot d_k)$ per prediction, where $n_{\text{sv}}$ is the number of support vectors and $d_k$ is the cost of evaluating $k$.

## Support Vector Regression (SVR)

SVR extends SVMs to regression by using the $\varepsilon$-insensitive loss:

$$L_\varepsilon(y, f(\mathbf{x})) = \max(0, |y - f(\mathbf{x})| - \varepsilon)$$

Points within an $\varepsilon$-tube around the prediction incur zero loss. The primal:

$$\min_{\mathbf{w}, b, \xi, \xi^*} \quad \frac{1}{2}\|\mathbf{w}\|^2 + C\sum_i (\xi_i + \xi_i^*)$$

$$\text{s.t.} \quad y_i - (\mathbf{w}^\top \mathbf{x}_i + b) \leq \varepsilon + \xi_i, \quad (\mathbf{w}^\top \mathbf{x}_i + b) - y_i \leq \varepsilon + \xi_i^*, \quad \xi_i, \xi_i^* \geq 0$$

The dual uses $\alpha_i - \alpha_i^*$ as coefficients, and the solution $f(\mathbf{x}) = \sum_i (\alpha_i - \alpha_i^*) k(\mathbf{x}_i, \mathbf{x}) + b$ is again sparse.

## Multi-Class Strategies

SVMs are binary classifiers by design. Extension to $K > 2$ classes uses:

**One-vs-One (OvO):** Train $\binom{K}{2}$ binary classifiers, one per pair of classes. Predict by majority vote. Advantages: smaller subproblems, less class imbalance.

**One-vs-Rest (OvR):** Train $K$ classifiers, each separating class $k$ from all others. Predict the class with the highest margin $f_k(\mathbf{x})$. Requires calibrated margins for meaningful comparison.

**Crammer-Singer multi-class SVM:** Directly solves:

$$\min_{\{\mathbf{w}_k\}} \frac{1}{2}\sum_k \|\mathbf{w}_k\|^2 + C\sum_i \max_{k \neq y_i}\!\left(1 + \mathbf{w}_k^\top \mathbf{x}_i - \mathbf{w}_{y_i}^\top \mathbf{x}_i\right)_+$$

enforcing that the correct class scores above all others by margin 1 simultaneously. This is a single convex QP and avoids the inconsistency of combining separate binary classifiers.
