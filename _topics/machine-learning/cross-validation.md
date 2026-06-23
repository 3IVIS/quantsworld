---
title: "Cross-Validation"
field: machine-learning
description: A family of resampling techniques for estimating generalization error and selecting models without a separate held-out test set.
intro: >
  Cross-validation partitions data into complementary subsets to train and evaluate a model repeatedly, producing an approximately unbiased estimate of out-of-sample predictive performance. The choice of scheme — k-fold, leave-one-out, stratified, or time-series variants — involves a bias-variance tradeoff of its own that depends on sample size, model complexity, and data structure. Nested cross-validation separates hyperparameter selection from performance estimation to avoid optimistic bias.
math_concepts:
  - probability-theory
  - hypothesis-testing
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Train / Validation / Test Split

The fundamental data partition separates three roles:

| Set | Purpose | Typical share |
|-----|---------|--------------|
| Training | Fit model parameters | 60–80% |
| Validation | Tune hyperparameters / select model | 10–20% |
| Test | Unbiased final performance estimate | 10–20% |

The test set must remain sealed until a single final evaluation. Once the test set is viewed even once to guide a modeling decision, it becomes a validation set and its error estimate is optimistic. For a fixed test set of size $n_{\text{test}}$, the standard error of the test error estimate (assuming i.i.d. Bernoulli losses $\ell_i$) is:

$$\widehat{\text{SE}} = \sqrt{\frac{\hat{p}(1 - \hat{p})}{n_{\text{test}}}}$$

where $\hat{p}$ is the estimated error rate. With $n_{\text{test}} = 1000$ and $\hat{p} = 0.10$, the 95% confidence interval is roughly $\hat{p} \pm 0.019$.

## k-Fold Cross-Validation

Partition the $n$ observations into $k$ folds $F_1, \ldots, F_k$ of roughly equal size $n/k$. For each fold $j$:

1. Train on $\mathcal{D} \setminus F_j$ (size $\approx n(1 - 1/k)$).
2. Predict on $F_j$ and compute loss $\hat{L}_j$.

The k-fold CV estimate is:

$$\widehat{\text{Err}}_{k\text{-CV}} = \frac{1}{k} \sum_{j=1}^k \hat{L}_j = \frac{1}{n}\sum_{i=1}^n L\!\left(y_i,\, \hat{f}^{-\kappa(i)}(x_i)\right)$$

where $\kappa(i)$ denotes the fold containing observation $i$ and $\hat{f}^{-\kappa(i)}$ is the model trained without that fold. Common choices:

- **$k = 5$ or $k = 10$:** Low computational cost, good bias-variance balance.
- **$k = n$ (LOO):** Nearly unbiased but high variance; expensive for large $n$.

The choice of $k$ controls a bias-variance tradeoff in the error estimator itself: small $k$ means each training fold is much smaller than $n$, so the estimated error is pessimistically biased (training set too small). Large $k$ reduces bias but increases variance because the $k$ fold estimates become highly correlated (they share most of their training data).

## Leave-One-Out CV and Its Bias

Leave-one-out CV (LOO-CV) trains $n$ models, each on $n-1$ observations. Its bias is nearly zero because each training set has size $n-1 \approx n$. However, the variance is high:

$$\text{Var}\!\left(\widehat{\text{Err}}_{\text{LOO}}\right) = \frac{1}{n^2}\sum_{i=1}^n \text{Var}(\ell_i) + \frac{2}{n^2}\sum_{i < j}\text{Cov}(\ell_i, \ell_j)$$

The covariance terms are large because each LOO model shares $n-2$ training points with every other LOO model. Empirically, 5- or 10-fold CV often has lower mean squared error as an estimator than LOO because the reduction in variance more than offsets the increase in bias.

For linear smoothers (linear regression, ridge, kernel smoothers) with hat matrix $H$ where $\hat{y} = Hy$, LOO-CV has the closed-form shortcut:

$$\widehat{\text{Err}}_{\text{LOO}} = \frac{1}{n}\sum_{i=1}^n \left(\frac{y_i - \hat{y}_i}{1 - H_{ii}}\right)^2$$

This avoids refitting the model $n$ times — a major computational saving.

## Stratified k-Fold and Time-Series CV

**Stratified k-fold** preserves the class proportion within each fold. For a binary outcome with prevalence $\pi$, each fold contains approximately $\pi n/k$ positives. This matters when $\pi$ is small (rare events) or $k$ is large, where random partitioning can accidentally create folds with no positive examples.

**Time-series CV (expanding window)** respects temporal order. At step $t$, train on $\{1, \ldots, t-1\}$ and evaluate on observation $t$, then expand the training set:

$$\widehat{\text{Err}}_{\text{TS}} = \frac{1}{T - t_0} \sum_{t=t_0+1}^{T} L\!\left(y_t,\, \hat{f}_{1:t-1}(x_t)\right)$$

where $t_0$ is the minimum training size required for a stable fit. A sliding-window variant uses a fixed training window $\{t-W, \ldots, t-1\}$ to accommodate structural breaks. Randomly shuffling time-series data before CV is a common error that leaks future information into training and produces overly optimistic estimates.

## Nested CV for Hyperparameter Tuning

A single loop of CV used both to select hyperparameters and to estimate error gives an optimistic estimate: the selected model is the best among several candidates, so its apparent CV error understates true generalization error. **Nested CV** uses two loops:

- **Outer loop** ($k_{\text{out}}$ folds): splits data into outer train and outer test sets; estimates generalization error.
- **Inner loop** ($k_{\text{in}}$ folds, applied to each outer train set): selects the best hyperparameter $\lambda^*$.

$$\widehat{\text{Err}}_{\text{nested}} = \frac{1}{k_{\text{out}}}\sum_{j=1}^{k_{\text{out}}} L\!\left(y_{F_j},\, \hat{f}_{\lambda^*_j}^{-F_j}(x_{F_j})\right)$$

Note that $\lambda^*_j$ may differ across outer folds. Nested CV is computationally expensive ($k_{\text{out}} \times k_{\text{in}}$ fits plus one final refit) but gives an honest error estimate. A common choice is $5 \times 5$ or $10 \times 5$ nested CV.

## The Bootstrap .632 Estimator

The ordinary bootstrap error estimate trains on a bootstrap sample of size $n$ and evaluates on the original data, yielding an optimistic "apparent error." The leave-one-out bootstrap evaluates only on OOB observations (those not in the bootstrap sample):

$$\widehat{\text{Err}}^{(1)} = \frac{1}{n}\sum_{i=1}^n \frac{\sum_{b : i \notin \mathcal{D}^{*b}} L(y_i, \hat{f}^b(x_i))}{|\{b : i \notin \mathcal{D}^{*b}\}|}$$

This tends to be pessimistic because each bootstrap model is trained on $\approx 0.632\,n$ unique observations. The **.632 estimator** combines the apparent training error $\overline{\text{err}}$ with the OOB error:

$$\widehat{\text{Err}}^{.632} = 0.368\,\overline{\text{err}} + 0.632\,\widehat{\text{Err}}^{(1)}$$

The weights 0.368 and 0.632 reflect the probability that an observation is in a bootstrap sample. For heavily overfit models (where $\overline{\text{err}} \approx 0$), this is still pessimistic. The **.632+** correction adjusts for this using the relative overfitting rate $\hat{R}$:

$$\hat{w} = \frac{0.632}{1 - 0.368\,\hat{R}}, \qquad \hat{R} = \frac{\widehat{\text{Err}}^{(1)} - \overline{\text{err}}}{\gamma - \overline{\text{err}}}$$

where $\gamma$ is the no-information error rate (the error achieved by a classifier that ignores features). The $.632+$ estimator uses $\hat{w}$ in place of $0.632$.

## Learning Curves and CV for Model Selection

**Learning curves** plot CV error as a function of training set size $n_{\text{train}}$. They diagnose whether more data or a more complex model would help:

- **High bias (underfitting):** Training and CV errors converge to a high value; adding data does not help; increase model complexity.
- **High variance (overfitting):** Large gap between training error and CV error; adding data closes the gap; regularize or reduce complexity.

**CV for model selection** picks among a discrete set of models (e.g., polynomial degrees $d \in \{1,2,\ldots,10\}$ or regularization strengths $\lambda \in \Lambda$) by selecting the one with lowest CV error:

$$\hat{d} = \arg\min_{d} \widehat{\text{Err}}_{k\text{-CV}}(d)$$

The **one-standard-error rule** (Breiman et al.) provides parsimony: choose the simplest model whose CV error is within one standard error of the minimum. Let $\hat{\sigma}_d = \text{SD}(\hat{L}_{1,d}, \ldots, \hat{L}_{k,d})/\sqrt{k}$. Then:

$$\hat{d}_{1\text{SE}} = \min\!\left\{d : \widehat{\text{Err}}(d) \le \widehat{\text{Err}}(\hat{d}) + \hat{\sigma}_{\hat{d}}\right\}$$

This guards against overfitting the hyperparameter selection itself to noise in the CV estimate.
