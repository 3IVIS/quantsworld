---
title: "Vector Autoregression"
field: econometrics
description: A multivariate time-series model in which each variable is regressed on its own lags and the lags of all other variables in the system.
intro: >
  Vector Autoregression (VAR) extends univariate autoregressive models to a system of equations, capturing the dynamic interdependencies among multiple time series without imposing strong a priori restrictions on which variables affect which. Estimated equation-by-equation by OLS, the VAR generates impulse response functions that trace how a shock to one variable propagates through the system, and variance decompositions that attribute forecast uncertainty to different structural innovations. Stability of the system depends on the eigenvalues of the companion matrix, while structural identification typically relies on Cholesky decomposition or external restrictions.
math_concepts:
  - linear-algebra
  - eigenvalues
  - random-processes
  - dynamical-systems
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## The VAR(p) Model

A VAR of order $p$ for an $n$-dimensional stationary time series $y_t \in \mathbb{R}^n$ is:

$$y_t = c + A_1 y_{t-1} + A_2 y_{t-2} + \cdots + A_p y_{t-p} + \varepsilon_t$$

where $c \in \mathbb{R}^n$ is a vector of intercepts, $A_j \in \mathbb{R}^{n \times n}$ are coefficient matrices for lag $j$, and $\varepsilon_t \sim \mathcal{WN}(0, \Sigma)$ is a white noise vector with covariance matrix $\Sigma$ (positive definite). The disturbances satisfy $\mathbb{E}[\varepsilon_t] = 0$, $\mathbb{E}[\varepsilon_t \varepsilon_t^\top] = \Sigma$, and $\mathbb{E}[\varepsilon_t \varepsilon_s^\top] = 0$ for $t \neq s$.

The model can be written compactly using the lag operator $L$ (where $Ly_t = y_{t-1}$):

$$A(L)\,y_t = c + \varepsilon_t, \qquad A(L) = I_n - A_1 L - A_2 L^2 - \cdots - A_p L^p$$

Each equation $j$ of the VAR has the form:

$$y_{jt} = c_j + \sum_{l=1}^p \sum_{k=1}^n a_{jk,l}\,y_{k,t-l} + \varepsilon_{jt}$$

so the $j$-th variable depends on $p$ lags of all $n$ variables. The total number of free parameters is $n^2 p + n$ (slope coefficients plus intercepts), growing rapidly with $n$ and $p$.

## OLS Estimation Equation-by-Equation

A key advantage of the reduced-form VAR is that **OLS applied separately to each equation is consistent and asymptotically efficient** (equivalent to GLS/SUR) when the same set of regressors appears in every equation, which is the case for a standard VAR.

Define the regressor vector $z_{t-1} = (1, y_{t-1}^\top, \ldots, y_{t-p}^\top)^\top \in \mathbb{R}^{1 + np}$ and stack observations into matrices:

$$Y = \begin{pmatrix} y_1^\top \\ \vdots \\ y_T^\top \end{pmatrix}, \quad Z = \begin{pmatrix} z_0^\top \\ \vdots \\ z_{T-1}^\top \end{pmatrix}$$

where $Y$ is $T \times n$ and $Z$ is $T \times (1 + np)$. The OLS estimator in matrix form is:

$$\hat{B} = (Z^\top Z)^{-1} Z^\top Y$$

where $B = (c, A_1, \ldots, A_p)^\top$ is the $(1+np) \times n$ coefficient matrix. This is equivalent to running $n$ separate OLS regressions, one per equation. The residual covariance matrix is estimated as:

$$\hat{\Sigma} = \frac{1}{T - np - 1} \hat{E}^\top \hat{E}, \qquad \hat{E} = Y - Z\hat{B}$$

Under stationarity and invertibility, $\hat{B}$ is consistent and $\sqrt{T}$-asymptotically normal.

## Stability and the Companion Matrix

The VAR(p) is **stable** (has a stationary solution) if and only if all eigenvalues of the **companion matrix** lie strictly inside the unit circle. Rewrite the VAR as a first-order VAR($1$) in the stacked state vector $Y_t = (y_t^\top, y_{t-1}^\top, \ldots, y_{t-p+1}^\top)^\top \in \mathbb{R}^{np}$:

$$Y_t = \mathcal{C} + \mathcal{A}\,Y_{t-1} + \mathcal{E}_t$$

The companion matrix $\mathcal{A} \in \mathbb{R}^{np \times np}$ is:

$$\mathcal{A} = \begin{pmatrix} A_1 & A_2 & \cdots & A_{p-1} & A_p \\ I_n & 0 & \cdots & 0 & 0 \\ 0 & I_n & \cdots & 0 & 0 \\ \vdots & & \ddots & & \vdots \\ 0 & 0 & \cdots & I_n & 0 \end{pmatrix}$$

**Stability condition:** The VAR(p) is stable if and only if $\det(I_{np} - \mathcal{A}z) \neq 0$ for all $|z| \leq 1$ in $\mathbb{C}$, equivalently, all eigenvalues $\lambda_i$ of $\mathcal{A}$ satisfy $|\lambda_i| < 1$. A stable VAR has a Wold moving average representation:

$$y_t = \mu + \sum_{h=0}^\infty \Phi_h\,\varepsilon_{t-h}$$

where $\mu = (I - A_1 - \cdots - A_p)^{-1}c$ and the MA coefficient matrices $\Phi_h$ decay geometrically at rate controlled by the largest eigenvalue modulus.

## Lag Length Selection

Choosing the VAR order $p$ is critical: too few lags leave serial correlation in residuals (violating white noise assumptions); too many lags waste degrees of freedom and increase estimation uncertainty.

The **information criteria** balance in-sample fit against the penalty for additional parameters. For a VAR with $np^2 + np$ total slope parameters (ignoring intercepts), evaluated at the MLE:

$$\text{AIC}(p) = \ln|\hat{\Sigma}(p)| + \frac{2}{T}\cdot n^2 p$$

$$\text{BIC}(p) = \ln|\hat{\Sigma}(p)| + \frac{\ln T}{T}\cdot n^2 p$$

$$\text{HQC}(p) = \ln|\hat{\Sigma}(p)| + \frac{2\ln\ln T}{T}\cdot n^2 p$$

| Criterion | Penalty rate | Consistency | Asymptotic efficiency |
|-----------|-------------|-------------|----------------------|
| AIC | $2/T$ | No (overfits) | Yes |
| BIC | $\ln T / T$ | Yes | No |
| HQC | $2\ln\ln T / T$ | Yes | No |

BIC is consistent (selects the true $p$ asymptotically) but may underfit in finite samples. AIC minimizes one-step-ahead forecast MSE asymptotically. A common practice is to run both and prefer parsimonious models when they agree.

**LR test:** To test $H_0: p = p_0$ vs. $H_1: p = p_1 > p_0$:

$$\text{LR} = T\left(\ln|\hat{\Sigma}(p_0)| - \ln|\hat{\Sigma}(p_1)|\right) \xrightarrow{d} \chi^2_{n^2(p_1 - p_0)}$$

## Impulse Response Functions

The **impulse response function (IRF)** traces how a unit shock to one variable propagates through the system. From the Wold representation, the response of variable $j$ to a unit shock in variable $k$ at horizon $h$ is the $(j,k)$ element of $\Phi_h$:

$$\text{IRF}_{jk}(h) = \frac{\partial y_{j,t+h}}{\partial \varepsilon_{kt}} = [\Phi_h]_{jk}$$

The MA coefficients are computed recursively from the VAR coefficients:

$$\Phi_h = \sum_{j=1}^{\min(h,p)} A_j\,\Phi_{h-j}, \qquad \Phi_0 = I_n, \quad \Phi_h = 0 \text{ for } h < 0$$

However, the reduced-form shocks $\varepsilon_t$ are typically correlated ($\Sigma \neq I$), so a unit shock to $\varepsilon_{kt}$ implicitly changes all other shocks. **Structural identification** is required to isolate orthogonal structural shocks $u_t$ via $\varepsilon_t = P u_t$ where $P P^\top = \Sigma$ and $u_t \sim (0, I_n)$.

**Cholesky decomposition** is the most common identification scheme. Write $\Sigma = L L^\top$ where $L$ is lower triangular (unique up to sign). Set $P = L$, so the structural shocks are $u_t = L^{-1}\varepsilon_t$. The Cholesky ordering imposes a **recursive causal structure**: variable 1 responds to no contemporaneous shocks from other variables; variable 2 responds contemporaneously to variable 1 but not variables 3 through $n$; etc. The ordering should reflect economic theory about contemporaneous causation.

The **structural IRF** is:

$$\Psi_h = \Phi_h L$$

with $[\Psi_h]_{jk}$ giving the response of $y_j$ at horizon $h$ to a one-standard-deviation structural shock to variable $k$.

Confidence bands for IRFs are typically computed by:
- **Asymptotic delta method:** Apply the delta method to the mapping from VAR coefficients to $\Phi_h$.
- **Bootstrap:** Residual bootstrap or wild bootstrap resample to construct empirical confidence bands.

## Forecast Error Variance Decomposition

The **forecast error variance decomposition (FEVD)** attributes the $h$-step-ahead forecast uncertainty of each variable to structural shocks. The $h$-step forecast error is:

$$y_{T+h} - \hat{y}_{T+h|T} = \sum_{j=0}^{h-1} \Phi_j\,\varepsilon_{T+h-j} = \sum_{j=0}^{h-1}\Psi_j\,u_{T+h-j}$$

The total forecast error variance of variable $i$ at horizon $h$ is:

$$[\text{FECM}(h)]_{ii} = \left[\sum_{j=0}^{h-1}\Psi_j\Psi_j^\top\right]_{ii}$$

The fraction of this variance attributable to structural shock $k$ is:

$$\omega_{ik}(h) = \frac{\sum_{j=0}^{h-1}[\Psi_j]_{ik}^2}{\left[\sum_{j=0}^{h-1}\Psi_j\Psi_j^\top\right]_{ii}} \in [0,1]$$

By construction $\sum_{k=1}^n \omega_{ik}(h) = 1$ for all $i$ and $h$. At $h=0$, $\omega_{ik}(0) = [\Sigma]_{ik}^2 / [\Sigma]_{ii}$ (from Cholesky), reflecting contemporaneous attribution. As $h \to \infty$, the FEVD converges to the long-run attribution.

## Granger Causality

Variable $y_k$ **Granger causes** variable $y_j$ if past values of $y_k$ have predictive power for $y_j$ beyond what is contained in lagged values of all other variables in the system. Formally, $y_k$ does not Granger cause $y_j$ if and only if in the $j$-th VAR equation:

$$[A_l]_{jk} = 0 \quad \text{for all } l = 1, \ldots, p$$

This is tested by a block-exogeneity Wald test: restrict the $p$ coefficients on lags of $y_k$ in the $j$-th equation to zero and test:

$$W = \left(\text{vec}(\hat{R})\right)^\top \left[\hat{R}\,\widehat{\text{Avar}}(\hat{A})\,\hat{R}^\top\right]^{-1} \text{vec}(\hat{R}) \xrightarrow{d} \chi^2_p$$

where $\hat{R}$ is the restriction matrix. Granger causality is a predictive (not structural) concept: it does not imply contemporaneous causation and is sensitive to variable omissions. The companion to FEVD, Granger causality testing identifies the direction of predictive information flow in the system.
