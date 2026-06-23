---
title: "Principal Component Analysis"
field: machine-learning
description: Linear dimensionality reduction by projecting data onto directions of maximum variance via eigendecomposition of the covariance matrix.
intro: >
  Principal component analysis finds an orthogonal linear transformation that maps data to a lower-dimensional subspace capturing maximum variance. The principal components are the eigenvectors of the sample covariance matrix, equivalently the right singular vectors of the data matrix. Extensions include kernel PCA for nonlinear structure and probabilistic PCA for a generative model interpretation that handles missing data and connects to factor analysis.
math_concepts:
  - linear-algebra
  - eigenvalues
  - matrix-calculus
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## Variance Maximization Objective

Given centered data $\mathbf{X} \in \mathbb{R}^{n \times d}$ (rows are observations, $\bar{\mathbf{x}} = \mathbf{0}$), PCA seeks a unit vector $\mathbf{w} \in \mathbb{R}^d$ that maximizes projected variance:

$$\max_{\|\mathbf{w}\|=1} \text{Var}(\mathbf{X}\mathbf{w}) = \max_{\|\mathbf{w}\|=1} \frac{1}{n}\|\mathbf{X}\mathbf{w}\|^2 = \max_{\|\mathbf{w}\|=1} \mathbf{w}^\top \mathbf{S} \mathbf{w}$$

where $\mathbf{S} = \frac{1}{n}\mathbf{X}^\top \mathbf{X}$ is the $d \times d$ sample covariance matrix.

**Solution by Lagrangian.** Maximize $\mathbf{w}^\top \mathbf{S} \mathbf{w} - \lambda(\mathbf{w}^\top \mathbf{w} - 1)$:

$$\frac{\partial}{\partial \mathbf{w}}: \quad 2\mathbf{S}\mathbf{w} = 2\lambda \mathbf{w} \implies \mathbf{S}\mathbf{w} = \lambda \mathbf{w}$$

The optimal $\mathbf{w}_1$ is the **eigenvector corresponding to the largest eigenvalue** $\lambda_1$ of $\mathbf{S}$. The maximized variance equals $\lambda_1$.

**Subsequent components.** The $k$-th principal component $\mathbf{w}_k$ maximizes variance subject to orthogonality with $\mathbf{w}_1, \ldots, \mathbf{w}_{k-1}$. By the Eckart-Young theorem, this yields the remaining eigenvectors $\mathbf{w}_2, \ldots, \mathbf{w}_d$ with eigenvalues $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_d \geq 0$.

## Covariance Matrix Eigendecomposition

The symmetric positive semidefinite covariance matrix has spectral decomposition:

$$\mathbf{S} = \mathbf{W} \boldsymbol{\Lambda} \mathbf{W}^\top$$

where $\mathbf{W} = [\mathbf{w}_1 \mid \cdots \mid \mathbf{w}_d] \in \mathbb{R}^{d \times d}$ is orthogonal ($\mathbf{W}^\top \mathbf{W} = \mathbf{I}$) and $\boldsymbol{\Lambda} = \text{diag}(\lambda_1, \ldots, \lambda_d)$.

**Projection to $K$ dimensions.** Let $\mathbf{W}_K = [\mathbf{w}_1, \ldots, \mathbf{w}_K]$. The **principal component scores**:

$$\mathbf{Z} = \mathbf{X} \mathbf{W}_K \in \mathbb{R}^{n \times K}$$

**Reconstruction:**

$$\hat{\mathbf{X}} = \mathbf{Z} \mathbf{W}_K^\top = \mathbf{X} \mathbf{W}_K \mathbf{W}_K^\top$$

**Reconstruction error (Frobenius norm):**

$$\|\mathbf{X} - \hat{\mathbf{X}}\|_F^2 = \sum_{k=K+1}^d \lambda_k \cdot n$$

This is minimized over all rank-$K$ projections — PCA gives the optimal linear reconstruction.

**Explained variance ratio** for component $k$:

$$r_k = \frac{\lambda_k}{\sum_{j=1}^d \lambda_j}$$

The cumulative explained variance $\sum_{k=1}^K r_k$ is the fraction of total variance retained in the $K$-dimensional projection.

## PCA as Singular Value Decomposition

The eigendecomposition of $\mathbf{S}$ is equivalent to the **thin SVD** of the data matrix $\mathbf{X}$:

$$\mathbf{X} = \mathbf{U} \boldsymbol{\Sigma} \mathbf{V}^\top$$

where $\mathbf{U} \in \mathbb{R}^{n \times d}$ has orthonormal columns (left singular vectors), $\boldsymbol{\Sigma} = \text{diag}(\sigma_1, \ldots, \sigma_d)$ with $\sigma_1 \geq \cdots \geq \sigma_d \geq 0$, and $\mathbf{V} \in \mathbb{R}^{d \times d}$ is orthogonal.

**Connection to eigendecomposition:**

$$\mathbf{S} = \frac{1}{n}\mathbf{X}^\top \mathbf{X} = \frac{1}{n}\mathbf{V}\boldsymbol{\Sigma}^2 \mathbf{V}^\top$$

so $\mathbf{W} = \mathbf{V}$ (principal directions are right singular vectors) and $\lambda_k = \sigma_k^2 / n$.

**SVD advantages over eigendecomposition:**
- More numerically stable for ill-conditioned matrices
- Truncated SVD algorithms (Lanczos, randomized SVD) compute only the top $K$ components in $O(ndK)$ time, bypassing the full $O(nd^2 + d^3)$ eigendecomposition
- Works directly on the $n \times d$ data matrix without forming the $d \times d$ covariance

**Randomized SVD** (Halko, Martinsson, Tropp 2011): form a sketch $\mathbf{Y} = \mathbf{X}\boldsymbol{\Omega}$ for random $\boldsymbol{\Omega} \in \mathbb{R}^{d \times (K+p)}$, orthogonalize $\mathbf{Q} = \text{orth}(\mathbf{Y})$, compute SVD of $\mathbf{Q}^\top \mathbf{X}$. Returns near-optimal rank-$K$ approximation in $O(ndK)$.

## Whitening and Scree Plots

### Whitening (Sphering)

After PCA projection, scale each component by its standard deviation:

$$\tilde{\mathbf{Z}} = \mathbf{Z} \boldsymbol{\Lambda}_K^{-1/2} = \mathbf{X}\mathbf{W}_K \boldsymbol{\Lambda}_K^{-1/2}$$

where $\boldsymbol{\Lambda}_K = \text{diag}(\lambda_1, \ldots, \lambda_K)$. The whitened features have identity covariance: $\frac{1}{n}\tilde{\mathbf{Z}}^\top \tilde{\mathbf{Z}} = \mathbf{I}_K$.

Whitening is essential before algorithms that assume isotropic inputs (ICA, k-means, certain neural network layers). The whitening matrix $\mathbf{W}_{\text{white}} = \mathbf{W}_K \boldsymbol{\Lambda}_K^{-1/2}$ maps the original features to uncorrelated, unit-variance components.

### Scree Plot and Choosing $K$

Plot $\lambda_k$ vs. $k$. Common selection rules:

| Rule | Criterion |
|------|-----------|
| Elbow | Choose $K$ where the curve bends (eigenvalue gap $\lambda_K - \lambda_{K+1}$ is large) |
| Proportion of variance | Choose $K$ so $\sum_{k=1}^K r_k \geq 0.90$ (or 0.95) |
| Kaiser rule | Retain components with $\lambda_k > \bar{\lambda} = 1$ (for correlation matrix) |
| Parallel analysis | Compare to eigenvalues from random data of same size; retain $\lambda_k > \lambda_k^{\text{random}}$ |

For data with a low-dimensional signal embedded in noise, the eigenvalue spectrum shows a **bulk** of small eigenvalues (noise) and a **spike** of large ones (signal). The Marchenko-Pastur law characterizes the bulk: for $d/n \to \gamma \in (0,1)$ and noise variance $\sigma^2$, the bulk spectrum lies in $[\sigma^2(1-\sqrt{\gamma})^2, \sigma^2(1+\sqrt{\gamma})^2]$.

## Kernel PCA

PCA finds only linear structure. **Kernel PCA** applies PCA in a (possibly infinite-dimensional) feature space $\mathcal{H}$ implicitly defined by a kernel $k(\mathbf{x}, \mathbf{x}')$.

The centered kernel matrix $\tilde{\mathbf{K}} = \mathbf{H}\mathbf{K}\mathbf{H}$ where $\mathbf{H} = \mathbf{I} - \frac{1}{n}\mathbf{1}\mathbf{1}^\top$ and $K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)$.

**Eigendecomposition** $\tilde{\mathbf{K}}\boldsymbol{\alpha}_k = n\lambda_k \boldsymbol{\alpha}_k$ gives kernel principal components. The projection of a new point $\mathbf{x}$ onto the $k$-th kernel PC:

$$z_k(\mathbf{x}) = \sum_{i=1}^n \alpha_{ki} k(\mathbf{x}_i, \mathbf{x}) - \text{(centering correction)}$$

**Cost:** $O(n^2 d)$ to form $\mathbf{K}$, $O(n^3)$ to decompose — expensive for large $n$. Nyström approximation uses $m \ll n$ landmark points to approximate $\mathbf{K} \approx \mathbf{K}_{nm}\mathbf{K}_{mm}^{-1}\mathbf{K}_{mn}$ in $O(nm^2)$.

## Probabilistic PCA

**Probabilistic PCA (PPCA)** (Tipping & Bishop, 1999) posits a latent variable model:

$$\mathbf{z} \sim \mathcal{N}(\mathbf{0}, \mathbf{I}_K), \qquad \mathbf{x} \mid \mathbf{z} \sim \mathcal{N}(\mathbf{W}\mathbf{z} + \boldsymbol{\mu},\; \sigma^2 \mathbf{I})$$

where $\mathbf{W} \in \mathbb{R}^{d \times K}$ and $\sigma^2$ is isotropic noise. Marginalizing over $\mathbf{z}$:

$$\mathbf{x} \sim \mathcal{N}(\boldsymbol{\mu},\; \mathbf{W}\mathbf{W}^\top + \sigma^2 \mathbf{I})$$

**MLE.** The maximum likelihood estimates are:

$$\hat{\boldsymbol{\mu}} = \bar{\mathbf{x}}, \qquad \hat{\sigma}^2 = \frac{1}{d - K}\sum_{k=K+1}^d \lambda_k$$

$$\hat{\mathbf{W}} = \mathbf{W}_K (\boldsymbol{\Lambda}_K - \sigma^2 \mathbf{I})^{1/2} \mathbf{R}$$

for any rotation $\mathbf{R} \in O(K)$. As $\sigma^2 \to 0$, the posterior mean $\mathbb{E}[\mathbf{z} \mid \mathbf{x}]$ recovers the classical PCA projection.

**Advantages of PPCA over classical PCA:**

| Feature | Classical PCA | PPCA |
|---------|--------------|------|
| Missing data | Requires imputation | EM algorithm handles naturally |
| Model comparison | Explained variance heuristic | Marginal likelihood |
| Noise model | Implicit | Explicit $\sigma^2$ |
| Generative model | No | Yes — can sample new data |

Factor analysis generalizes PPCA by allowing heteroskedastic noise $\boldsymbol{\Psi} = \text{diag}(\psi_1, \ldots, \psi_d)$ instead of $\sigma^2 \mathbf{I}$, fitting feature-specific noise levels.
