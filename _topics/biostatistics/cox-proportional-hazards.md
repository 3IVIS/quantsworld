---
title: "Cox Proportional Hazards"
field: biostatistics
description: Semi-parametric regression model for survival data that estimates covariate effects without specifying the baseline hazard.
intro: >
  The Cox proportional hazards model is the workhorse of survival regression. It links
  covariates to the hazard rate through a multiplicative factor, leaving the baseline
  hazard unspecified — a semi-parametric approach that yields valid inference without
  distributional assumptions. The model's partial likelihood is a theoretical tour de
  force that eliminates the nuisance baseline hazard and remains the most cited
  statistical method in medical literature.
math_concepts:
  - survival-analysis
  - probability-theory
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## The proportional hazards model

For subject $i$ with covariate vector $\mathbf{x}_i$, the Cox model specifies:

$$h(t \mid \mathbf{x}_i) = h_0(t) \exp(\mathbf{x}_i^\top \boldsymbol{\beta})$$

where $h_0(t)$ is the **baseline hazard** — an arbitrary non-negative function — and $\exp(\mathbf{x}_i^\top \boldsymbol{\beta})$ is the relative risk. The **hazard ratio** for a one-unit increase in covariate $x_j$ is:

$$\text{HR}_j = e^{\beta_j}$$

The "proportional hazards" name comes from the ratio of any two hazard functions being constant over time:

$$\frac{h(t \mid \mathbf{x}_i)}{h(t \mid \mathbf{x}_j)} = \exp((\mathbf{x}_i - \mathbf{x}_j)^\top \boldsymbol{\beta})$$

This is the key assumption: the covariate multiplies the hazard by the same factor at every time point.

## Partial likelihood

Cox's 1972 insight was that $\boldsymbol{\beta}$ can be estimated without knowing $h_0(t)$ via the **partial likelihood**. At each event time $t_{(j)}$ (the $j$-th ordered event), conditional on the risk set $\mathcal{R}(t_{(j)})$ (all subjects still at risk), the probability that subject $i(j)$ fails is:

$$\frac{h_0(t_{(j)}) e^{\mathbf{x}_{i(j)}^\top \boldsymbol{\beta}}}{\sum_{\ell \in \mathcal{R}(t_{(j)})} h_0(t_{(j)}) e^{\mathbf{x}_\ell^\top \boldsymbol{\beta}}} = \frac{e^{\mathbf{x}_{i(j)}^\top \boldsymbol{\beta}}}{\sum_{\ell \in \mathcal{R}(t_{(j)})} e^{\mathbf{x}_\ell^\top \boldsymbol{\beta}}}$$

The baseline hazard cancels. The **partial log-likelihood** over all $D$ event times:

$$\ell(\boldsymbol{\beta}) = \sum_{j=1}^D \left[ \mathbf{x}_{i(j)}^\top \boldsymbol{\beta} - \log \sum_{\ell \in \mathcal{R}(t_{(j)})} e^{\mathbf{x}_\ell^\top \boldsymbol{\beta}} \right]$$

This is **concave** in $\boldsymbol{\beta}$, so Newton-Raphson (or Fisher scoring) converges to the global MLE. The score and information:

$$\mathbf{U}(\boldsymbol{\beta}) = \sum_{j=1}^D \left[\mathbf{x}_{i(j)} - \frac{\sum_\ell e^{\mathbf{x}_\ell^\top\boldsymbol{\beta}} \mathbf{x}_\ell}{\sum_\ell e^{\mathbf{x}_\ell^\top\boldsymbol{\beta}}}\right], \quad \mathcal{I}(\boldsymbol{\beta}) = -\frac{\partial^2 \ell}{\partial \boldsymbol{\beta} \partial \boldsymbol{\beta}^\top}$$

The second term in $\mathbf{U}$ is the covariate mean in the risk set, weighted by relative risk. Standard errors come from $\mathcal{I}(\hat{\boldsymbol{\beta}})^{-1}$.

**Ties**: when multiple events occur at the same time, approximations are needed. The **Efron approximation** (default in most software) is:

$$\ell_{\text{Efron}}(\boldsymbol{\beta}) = \sum_{j}\left[\mathbf{x}_{(j)}^\top \boldsymbol{\beta} - \log\left(\sum_{\ell \in \mathcal{R}_j} e^{\mathbf{x}_\ell^\top\boldsymbol{\beta}} - \frac{k-1}{d_j}\sum_{\ell \in \mathcal{D}_j} e^{\mathbf{x}_\ell^\top\boldsymbol{\beta}}\right)\right]$$

where $\mathcal{D}_j$ is the set of events at $t_{(j)}$ and the sum over $k = 1, \ldots, d_j$.

## Checking proportionality: Schoenfeld residuals

The **Schoenfeld residual** for covariate $p$ at event time $t_{(j)}$ is:

$$r_{jp} = x_{i(j),p} - \hat{E}[X_p \mid \mathcal{R}(t_{(j)})]$$

where the expected value is weighted by relative risks $e^{\mathbf{x}_\ell^\top\hat{\boldsymbol{\beta}}}$. Under the PH assumption, Schoenfeld residuals are **uncorrelated with time**. A test for non-proportionality:

$$\text{Corr}(r_{jp},\, g(t_{(j)})) \ne 0$$

where $g(t) = t$, $\log t$, or KM-based ranks. The **scaled Schoenfeld residuals** (divided by the information matrix) should follow the true $\beta(t)$ if the effect is time-varying — plotting them against time reveals the form of non-proportionality.

Formal test (Grambsch-Therneau): regress scaled residuals on $g(t_{(j)})$ and test $H_0: \text{slope} = 0$ using a chi-squared test.

## Breslow estimator for the baseline hazard

Given $\hat{\boldsymbol{\beta}}$, the **Breslow estimator** of the cumulative baseline hazard is:

$$\hat{H}_0(t) = \sum_{t_{(j)} \le t} \frac{d_j}{\sum_{\ell \in \mathcal{R}(t_{(j)})} e^{\mathbf{x}_\ell^\top\hat{\boldsymbol{\beta}}}}$$

The estimated survival for a new subject with covariates $\mathbf{x}^*$:

$$\hat{S}(t \mid \mathbf{x}^*) = \exp\left(-\hat{H}_0(t) \cdot e^{\mathbf{x}^{*\top}\hat{\boldsymbol{\beta}}}\right)$$

## Time-varying covariates

The Cox model extends to **time-varying covariates** $\mathbf{x}_i(t)$, where the hazard at time $t$ depends on the covariate value at that same time:

$$h(t \mid \mathbf{x}_i(t)) = h_0(t) \exp(\mathbf{x}_i(t)^\top \boldsymbol{\beta})$$

The partial likelihood replaces $\mathbf{x}_{i(j)}$ with $\mathbf{x}_{i(j)}(t_{(j)})$. The data must be restructured into a **counting process format**: one row per time interval per subject $(t_{\text{start}}, t_{\text{stop}}, \delta, x(t))$.

Important: time-varying covariates can model:
- CD4 cell count in HIV studies (measured longitudinally)
- Treatment switching or dose changes
- **Landmark analyses** to handle time-dependent confounding

**Caution**: conditioning on future information (using post-baseline values as covariates without care) introduces **immortal time bias**.

## Stratified Cox model

If a covariate violates the PH assumption but is a nuisance variable (not of primary interest), stratify on it:

$$h(t \mid \mathbf{x}_i, s_i = k) = h_{0k}(t) \exp(\mathbf{x}_i^\top \boldsymbol{\beta})$$

Each stratum $k$ gets its own baseline hazard, but $\boldsymbol{\beta}$ is common. The partial likelihood is the product of stratum-specific partial likelihoods. This allows different baseline hazard shapes per stratum while still estimating a single, pooled $\hat{\boldsymbol{\beta}}$.

## Competing risks and frailty models

**Competing risks**: when multiple event types exist (e.g., cancer death vs. other-cause death), the **cause-specific hazard** for cause $k$:

$$h_k(t) = \lim_{\Delta t\to 0} \frac{P(t \le T < t+\Delta t, K=k \mid T \ge t)}{\Delta t}$$

The **subdistribution hazard** (Fine-Gray model) models the **cumulative incidence function** (CIF) $F_k(t) = P(T \le t, K=k)$ directly:

$$h_k^*(t) = -\frac{d}{dt} \log(1 - F_k(t))$$

Fine-Gray includes those who experienced a competing event in the risk set (with time-varying weights), so HR from Fine-Gray directly describes effects on the CIF — more relevant for prognosis.

**Frailty models** handle **clustering** (e.g., patients within hospitals):

$$h(t \mid \mathbf{x}_i, Z_i) = Z_i h_0(t) e^{\mathbf{x}_i^\top \boldsymbol{\beta}}$$

where $Z_i \sim \text{Gamma}(1/\theta, 1/\theta)$ is a latent frailty with $E[Z]=1$ and $\text{Var}(Z)=\theta$. Marginalizing over $Z$ yields a survival function with heavier tails than Cox. The parameter $\theta$ quantifies between-cluster heterogeneity; $\theta=0$ reduces to the standard Cox model. Estimation uses the EM algorithm or penalized partial likelihood.
