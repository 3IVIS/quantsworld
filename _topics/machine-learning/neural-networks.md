---
title: "Neural Networks"
field: machine-learning
description: Universal function approximators trained by backpropagation, forming the foundation of modern deep learning.
intro: >
  Neural networks are parametric function families built by composing layers of affine transformations and nonlinear activations. The universal approximation theorem guarantees that a single hidden layer can represent any continuous function, while depth provides exponential expressivity advantages in practice. Training proceeds by gradient descent using backpropagation, which efficiently computes the loss gradient via the chain rule through the computation graph.
math_concepts:
  - linear-algebra
  - matrix-calculus
  - optimization
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 13
---

## Architecture and Forward Pass

A feedforward network with $L$ layers maps input $\mathbf{x} \in \mathbb{R}^{d_0}$ to output $\hat{\mathbf{y}} \in \mathbb{R}^{d_L}$ through a sequence of transformations.

**Layer $\ell$ computation:**

$$\mathbf{z}^{(\ell)} = \mathbf{W}^{(\ell)} \mathbf{a}^{(\ell-1)} + \mathbf{b}^{(\ell)}, \qquad \mathbf{a}^{(\ell)} = \sigma\!\left(\mathbf{z}^{(\ell)}\right)$$

where $\mathbf{W}^{(\ell)} \in \mathbb{R}^{d_\ell \times d_{\ell-1}}$, $\mathbf{b}^{(\ell)} \in \mathbb{R}^{d_\ell}$, and $\sigma$ is an elementwise activation. Set $\mathbf{a}^{(0)} = \mathbf{x}$ and $\hat{\mathbf{y}} = \mathbf{a}^{(L)}$.

Total parameters: $\sum_{\ell=1}^L (d_{\ell-1} + 1) d_\ell$.

### Activation Functions

| Activation | Formula | Range | Key property |
|-----------|---------|-------|-------------|
| Sigmoid | $\sigma(z) = \frac{1}{1+e^{-z}}$ | $(0,1)$ | Saturates; vanishing gradient |
| Tanh | $\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $(-1,1)$ | Zero-centered; still saturates |
| ReLU | $\max(0, z)$ | $[0, \infty)$ | No saturation for $z > 0$; dead neurons |
| Leaky ReLU | $\max(\alpha z, z)$, $\alpha \ll 1$ | $\mathbb{R}$ | Fixes dead neuron problem |
| GELU | $z \Phi(z)$ | $\mathbb{R}$ | Smooth; used in transformers |

**Sigmoid derivative:** $\sigma'(z) = \sigma(z)(1 - \sigma(z))$, which peaks at $\frac{1}{4}$ — causing vanishing gradients in deep sigmoid networks since $\prod_\ell \sigma'(z^{(\ell)}) \to 0$ exponentially.

**ReLU derivative:** $\mathbf{1}[z > 0]$, which is constant for positive activations and eliminates gradient vanishing in those units.

## Universal Approximation Theorem

**Theorem (Cybenko, 1989; Hornik, 1991).** Let $\sigma$ be a continuous, non-constant, bounded function. For any continuous $f: [0,1]^d \to \mathbb{R}$ and $\varepsilon > 0$, there exist $N \in \mathbb{N}$, weights $\mathbf{w}_k \in \mathbb{R}^d$, biases $b_k \in \mathbb{R}$, and coefficients $c_k \in \mathbb{R}$ such that:

$$\sup_{\mathbf{x} \in [0,1]^d} \left| f(\mathbf{x}) - \sum_{k=1}^N c_k \sigma(\mathbf{w}_k^\top \mathbf{x} + b_k) \right| < \varepsilon$$

The theorem guarantees existence but says nothing about how to find the weights or how large $N$ must be. Extensions show that:
- Deep networks can represent functions exponentially more efficiently than shallow ones (depth separation)
- Width-$O(d)$ networks with $O(2^d)$ depth can represent any Boolean function — but $O(d^2)$-wide, $O(1)$-depth networks require exponential neurons for the same functions

## Loss Functions

For a dataset $\{(\mathbf{x}_i, y_i)\}_{i=1}^n$, the empirical risk is:

$$\mathcal{L}(\theta) = \frac{1}{n} \sum_{i=1}^n \ell(f_\theta(\mathbf{x}_i), y_i) + \lambda R(\theta)$$

**Regression — Mean Squared Error:**

$$\ell(\hat{y}, y) = \frac{1}{2}(\hat{y} - y)^2$$

**Binary classification — Binary Cross-Entropy:**

$$\ell(\hat{p}, y) = -y \log \hat{p} - (1-y)\log(1-\hat{p})$$

where $\hat{p} = \sigma(z)$. This equals the negative log-likelihood under a Bernoulli model.

**Multi-class — Categorical Cross-Entropy with Softmax:**

$$\hat{p}_k = \frac{e^{z_k}}{\sum_{j=1}^K e^{z_j}}, \qquad \ell(\hat{\mathbf{p}}, y) = -\log \hat{p}_y$$

The softmax + cross-entropy combination has a particularly clean gradient: $\partial \ell / \partial z_k = \hat{p}_k - \mathbf{1}[k = y]$.

## Backpropagation

Backpropagation computes $\nabla_\theta \mathcal{L}$ by reverse-mode automatic differentiation. Define the **error signal**:

$$\boldsymbol{\delta}^{(\ell)} = \frac{\partial \mathcal{L}}{\partial \mathbf{z}^{(\ell)}}$$

**Output layer** (cross-entropy loss, softmax output):

$$\boldsymbol{\delta}^{(L)} = \hat{\mathbf{y}} - \mathbf{y}$$

**Hidden layer** (chain rule):

$$\boldsymbol{\delta}^{(\ell)} = \left(\mathbf{W}^{(\ell+1)}\right)^\top \boldsymbol{\delta}^{(\ell+1)} \odot \sigma'\!\left(\mathbf{z}^{(\ell)}\right)$$

**Weight and bias gradients:**

$$\frac{\partial \mathcal{L}}{\partial \mathbf{W}^{(\ell)}} = \boldsymbol{\delta}^{(\ell)} \left(\mathbf{a}^{(\ell-1)}\right)^\top, \qquad \frac{\partial \mathcal{L}}{\partial \mathbf{b}^{(\ell)}} = \boldsymbol{\delta}^{(\ell)}$$

**Computational cost.** Forward pass: $O\!\left(\sum_\ell d_\ell d_{\ell-1}\right)$. Backward pass: same order — backpropagation costs at most a small constant times the forward pass.

**Mini-batch SGD update** with learning rate $\eta$:

$$\theta \leftarrow \theta - \frac{\eta}{|B|} \sum_{i \in B} \nabla_\theta \ell_i(\theta)$$

Adam optimizer maintains first and second moment estimates $m_t, v_t$ with bias correction:

$$\hat{m}_t = \frac{m_t}{1-\beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1-\beta_2^t}, \quad \theta_t = \theta_{t-1} - \frac{\eta \hat{m}_t}{\sqrt{\hat{v}_t} + \varepsilon}$$

## Weight Initialization and Batch Normalization

### Xavier and He Initialization

Improper initialization causes activations and gradients to explode or vanish. For a layer with $n_{\text{in}}$ inputs and $n_{\text{out}}$ outputs:

**Xavier (Glorot) initialization** — suited for tanh/sigmoid:

$$W_{ij} \sim \mathcal{U}\!\left(-\sqrt{\frac{6}{n_{\text{in}} + n_{\text{out}}}},\; \sqrt{\frac{6}{n_{\text{in}} + n_{\text{out}}}}\right)$$

**He initialization** — suited for ReLU (variance doubles due to zero-out of negative half):

$$W_{ij} \sim \mathcal{N}\!\left(0,\; \frac{2}{n_{\text{in}}}\right)$$

**Derivation.** For a ReLU layer with input $x \sim \mathcal{N}(0, \sigma_x^2)$ and $\mathbf{w} \sim \mathcal{N}(0, \sigma_w^2)$:

$$\text{Var}(\text{ReLU}(\mathbf{w}^\top \mathbf{x})) = \frac{n_{\text{in}} \sigma_w^2 \sigma_x^2}{2}$$

Setting this equal to $\sigma_x^2$ gives $\sigma_w^2 = 2/n_{\text{in}}$.

### Batch Normalization

Batch normalization normalizes pre-activations within a mini-batch of size $m$:

$$\hat{z}_i = \frac{z_i - \mu_B}{\sqrt{\sigma_B^2 + \varepsilon}}, \qquad y_i = \gamma \hat{z}_i + \beta$$

where $\mu_B = \frac{1}{m}\sum_i z_i$, $\sigma_B^2 = \frac{1}{m}\sum_i (z_i - \mu_B)^2$, and $\gamma, \beta$ are learnable scale and shift.

Benefits: reduces internal covariate shift, allows higher learning rates, acts as mild regularizer, reduces sensitivity to initialization. At test time, $\mu_B$ and $\sigma_B^2$ are replaced by running statistics computed during training.

## Dropout and Depth vs. Width

### Dropout Regularization

During training, each neuron is independently zeroed with probability $p$ (typically $p = 0.5$ for hidden layers, $p = 0.1$–$0.2$ for inputs). The effective network per-sample is a random subnetwork from the $2^N$ possible masks (where $N$ = number of neurons).

At test time, all neurons are active but outputs are scaled by $(1-p)$ to match expected activation magnitudes. This is **inverted dropout**: scale by $1/(1-p)$ during training instead.

**Interpretation.** Dropout approximates training an ensemble of $2^N$ networks with shared weights. The test-time network is an approximation to the geometric mean of the ensemble predictions.

**Effect on loss.** Dropout adds implicit $L_2$ regularization: for a linear layer, the expected regularized loss under dropout with rate $p$ satisfies:

$$\mathbb{E}_{\text{mask}}[\mathcal{L}] \approx \mathcal{L}_{\text{full}} + \frac{p}{2} \|\mathbf{W}\|_F^2 \cdot \text{(input variance)}$$

### Depth vs. Width Trade-offs

A key theoretical result: for piecewise linear networks (ReLU), an $L$-layer width-$n$ network can produce $\Theta\!\left(\binom{n}{d}^{L-1} n^d\right)$ linear regions, exponential in depth. Shallow networks require exponentially wider layers to match the expressivity of deep ones for certain function classes.

Empirically, depth provides:
- Better feature hierarchies (edges → textures → objects)
- Better optimization landscapes (skip connections in ResNets)
- Better generalization per parameter

Width provides: parallelism, memorization capacity, and is easier to optimize in overparameterized regimes where gradient descent finds global minima (as shown by neural tangent kernel theory in the infinite-width limit).
