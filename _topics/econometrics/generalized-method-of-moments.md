---
title: "Generalized Method of Moments"
field: econometrics
description: A general estimation framework that exploits population moment conditions to identify and estimate model parameters with minimal distributional assumptions.
intro: >
  Generalized Method of Moments (GMM) unifies many estimators — OLS, IV, GLS, MLE — under a single framework defined by moment conditions $\mathbb{E}[g(y_i, \theta_0)] = 0$. When the number of moment conditions exceeds the number of parameters, GMM minimizes a quadratic form in sample moments, with the optimal weighting matrix chosen to minimize asymptotic variance. The resulting estimator is consistent and asymptotically normal under mild regularity conditions, and overidentified models can be tested via the J-statistic.
math_concepts:
  - optimization
  - linear-algebra
  - hypothesis-testing
difficulty: expert
difficulty_level: 5
read_time: 15
---

## Moment Conditions and Identification

Let $\{w_i\}_{i=1}^n$ be i.i.d. observations from a distribution $F_0$ parameterized (partially or fully) by $\theta_0 \in \Theta \subseteq \mathbb{R}^k$. Suppose the model implies $L \geq k$ population moment conditions:

$$\mathbb{E}[g(w_i, \theta_0)] = 0, \qquad g: \mathcal{W} \times \Theta \to \mathbb{R}^L$$

The moment function $g$ encodes the economic or statistical restrictions of the model. The corresponding sample moments are:

$$g_n(\theta) = \frac{1}{n}\sum_{i=1}^n g(w_i, \theta)$$

By the law of large numbers, $g_n(\theta_0) \xrightarrow{p} 0$. Three cases arise based on the relationship between $L$ (moments) and $k$ (parameters):

| Case | Condition | Implication |
|------|-----------|-------------|
| Just-identified | $L = k$ | Unique $\hat{\theta}$ solving $g_n(\hat{\theta}) = 0$ exactly |
| Over-identified | $L > k$ | Cannot set all moments to zero; minimize a quadratic form |
| Under-identified | $L < k$ | $\theta_0$ not identified; need more restrictions |

**Identification condition:** $\theta_0$ is identified if and only if $g(\theta) \equiv \mathbb{E}[g(w_i, \theta)] \neq 0$ for all $\theta \neq \theta_0$. A sufficient condition is that $G_0 = \mathbb{E}[\partial g / \partial \theta^\top]$ has rank $k$.

## The GMM Estimator and Weighting Matrix

For the over-identified case ($L > k$), exact satisfaction of all moment conditions is generally impossible. The **GMM estimator** minimizes a weighted quadratic form in sample moments:

$$\hat{\theta}_W = \arg\min_{\theta \in \Theta}\; Q_n(\theta, W) = g_n(\theta)^\top W\, g_n(\theta)$$

where $W$ is an $L \times L$ symmetric positive definite weighting matrix. The first-order condition is:

$$\hat{G}_n^\top W\, g_n(\hat{\theta}_W) = 0, \qquad \hat{G}_n = \frac{1}{n}\sum_{i=1}^n \frac{\partial g(w_i, \hat{\theta}_W)}{\partial \theta^\top}$$

For the just-identified case ($L = k$), the minimizer satisfies $g_n(\hat{\theta}) = 0$ exactly and $W$ is irrelevant.

**Asymptotic distribution.** Under standard regularity conditions (compactness of $\Theta$, uniform LLN, CLT, identification), $\hat{\theta}_W$ is consistent and:

$$\sqrt{n}(\hat{\theta}_W - \theta_0) \xrightarrow{d} \mathcal{N}(0, V_W)$$

$$V_W = (G_0^\top W G_0)^{-1} G_0^\top W \Omega W G_0 (G_0^\top W G_0)^{-1}$$

where $\Omega = \mathbb{E}[g(w_i,\theta_0)g(w_i,\theta_0)^\top]$ is the long-run variance of the moments.

## Optimal Weighting Matrix

The asymptotic variance $V_W$ depends on $W$. By a matrix inequality, the minimum variance (in the Loewner order) is achieved by $W^* = \Omega^{-1}$, the inverse of the moment variance matrix. With this choice:

$$V^* = (G_0^\top \Omega^{-1} G_0)^{-1}$$

This is the **Cramér-Rao lower bound** within the GMM class: no other weighting matrix yields a smaller asymptotic variance. Intuitively, moments estimated with low variance (small diagonal entries of $\Omega$) receive larger weights.

The optimal $W^*$ is unknown in practice because it depends on $\theta_0$. The **two-step GMM** procedure estimates it consistently:

1. **Step 1:** Use an arbitrary (e.g., identity) matrix $W = I_L$. Compute a preliminary consistent estimator $\hat{\theta}^{(1)}$.
2. **Step 2:** Estimate the optimal weighting matrix:
$$\hat{\Omega} = \frac{1}{n}\sum_{i=1}^n g(w_i, \hat{\theta}^{(1)})\,g(w_i, \hat{\theta}^{(1)})^\top$$
Compute the efficient two-step estimator $\hat{\theta}^{(2)} = \arg\min_\theta g_n(\theta)^\top \hat{\Omega}^{-1} g_n(\theta)$.

**Continuously updated GMM (CUE)** avoids the two-step approach by jointly minimizing over $\theta$ with $W(\theta) = \hat{\Omega}(\theta)^{-1}$:

$$\hat{\theta}_{\text{CUE}} = \arg\min_\theta\; g_n(\theta)^\top \hat{\Omega}(\theta)^{-1} g_n(\theta)$$

CUE is median-unbiased and invariant to reparameterization, but the objective is non-convex and harder to optimize.

## The J-Test for Overidentification

In the just-identified case, $g_n(\hat{\theta}) = 0$ exactly and the model is not testable from the data alone. In the over-identified case, $g_n(\hat{\theta}) \neq 0$ in general, and the discrepancy tests whether the $L - k$ overidentifying restrictions hold.

The **Hansen J-statistic** (also called the Sargan statistic in linear IV) is:

$$J = n\cdot g_n(\hat{\theta})^\top \hat{\Omega}^{-1} g_n(\hat{\theta}) \xrightarrow{d} \chi^2_{L-k}$$

under $H_0$ (all moment conditions are valid). Rejection indicates that at least one moment condition is violated — either the model is misspecified or some instruments are invalid.

The degrees of freedom $L - k$ reflect the number of testable restrictions: $k$ parameters use up $k$ moments exactly, leaving $L - k$ moment conditions that are over-determined and testable.

**Limitations of the J-test:** It has low power against specific alternatives (it tests the average of all moment violations, so individual invalid instruments may not be detected if their bias is small relative to the standard error). It also does not identify which moments are violated.

## Relation to OLS and IV

GMM nests many classical estimators as special cases.

**OLS** arises from the moment conditions $\mathbb{E}[x_i(y_i - x_i^\top\beta)] = 0$ (orthogonality between regressors and errors), giving $L = k = \dim(x)$ and the just-identified GMM estimator:

$$\hat{\beta}_{\text{OLS}} = \left(\sum_i x_i x_i^\top\right)^{-1}\sum_i x_i y_i$$

**Instrumental variables (IV)** arises when endogenous regressors $x_i \in \mathbb{R}^k$ are instrumented by $z_i \in \mathbb{R}^L$, $L \geq k$, with moment conditions $\mathbb{E}[z_i(y_i - x_i^\top\beta)] = 0$. The two-stage least squares (2SLS) estimator is:

$$\hat{\beta}_{\text{2SLS}} = (X^\top P_Z X)^{-1} X^\top P_Z y, \qquad P_Z = Z(Z^\top Z)^{-1}Z^\top$$

This is the GMM estimator with $W = (Z^\top Z/n)^{-1}$ and coincides with efficient GMM when errors are homoskedastic ($\Omega = \sigma^2 Z^\top Z / n$). With heteroskedasticity, efficient GMM and 2SLS diverge, and efficient GMM yields smaller standard errors.

## Weak Instruments

Instrument strength is critical for IV/GMM: weak instruments cause the Wald confidence interval to be severely misleading, even with large samples. Instrument relevance is assessed by the **first-stage F-statistic** in the linear projection of endogenous regressors on instruments. A common rule of thumb is $F > 10$ for a single endogenous variable.

More formally, for one endogenous variable and $L$ instruments, the **concentration parameter** is:

$$\mu^2 = \pi^\top Z^\top Z \pi / \sigma^2_\nu$$

where $\pi$ is the first-stage coefficient and $\sigma^2_\nu$ the first-stage error variance. The 2SLS estimator has a Cauchy-like distribution when $\mu^2 = 0$ — no finite moments exist. The **Stock-Yogo test** tabulates critical values for $F$ such that the 2SLS bias as a fraction of OLS bias does not exceed a specified level.

**Robust inference with weak instruments** uses the Anderson-Rubin (AR) test, which is valid regardless of instrument strength:

$$AR(\beta_0) = n\cdot g_n(\beta_0)^\top \hat{\Omega}^{-1} g_n(\beta_0) \xrightarrow{d} \chi^2_L$$

under the null $H_0: \beta = \beta_0$, yielding confidence sets by inverting the AR test.

## Dynamic Panel GMM (Arellano-Bond)

For dynamic panels $y_{it} = \rho\,y_{i,t-1} + x_{it}^\top\beta + \alpha_i + u_{it}$ with $i = 1,\ldots,N$ and $t=1,\ldots,T$, first-differencing eliminates $\alpha_i$:

$$\Delta y_{it} = \rho\,\Delta y_{i,t-1} + \Delta x_{it}^\top\beta + \Delta u_{it}$$

But $\Delta y_{i,t-1} = y_{i,t-1} - y_{i,t-2}$ is correlated with $\Delta u_{it} = u_{it} - u_{i,t-1}$ through $u_{i,t-1}$. Under the assumption that $u_{it}$ is serially uncorrelated, $y_{i,t-2}, y_{i,t-3}, \ldots$ are valid instruments. This generates the Arellano-Bond moment conditions:

$$\mathbb{E}[y_{i,t-s}\,\Delta u_{it}] = 0, \qquad s \geq 2,\; t = 3, \ldots, T$$

The instrument matrix for unit $i$ at period $t$ is a row of zeros and $y_{i,1}, \ldots, y_{i,t-2}$, stacked across periods into $Z_i$. The Arellano-Bond estimator is efficient GMM on the full system:

$$\hat{\theta}_{\text{AB}} = \arg\min_\theta \left(\frac{1}{N}\sum_i Z_i^\top \Delta u_i(\theta)\right)^\top \hat{W}^{-1} \left(\frac{1}{N}\sum_i Z_i^\top \Delta u_i(\theta)\right)$$

The instrument count grows quadratically with $T$ ("instrument proliferation"), which can over-fit the weighting matrix with small $N$. The Blundell-Bond system GMM adds moment conditions from the levels equation, improving efficiency when $\rho$ is close to one.
