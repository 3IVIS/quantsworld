---
title: "Interest Rate Risk"
field: actuarial-science
description: The exposure of insurance liabilities and fixed-income assets to changes in interest rates, managed through duration, convexity, immunization, and asset-liability management techniques.
intro: >
  Insurance companies hold long-duration liabilities (annuities, pensions) financed by fixed-income assets. A mismatch in interest rate sensitivity between assets and liabilities creates interest rate risk: a fall in rates increases liability values more than asset values, eroding solvency. Duration and convexity quantify this sensitivity, while immunization strategies neutralize it. Asset-liability management (ALM) extends these concepts to dynamic hedging, integrating stochastic interest rate models for internal model capital calculations.
math_concepts:
  - stochastic-calculus
  - differential-equations
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Bond Price Sensitivity Basics

The **price** of a fixed coupon bond with face value $F$, coupon $C$, maturity $n$, and yield-to-maturity $y$ is:

$$
P = \sum_{t=1}^n \frac{C}{(1+y)^t} + \frac{F}{(1+y)^n} = C\,\ddot{a}_{\overline{n}|y} + F\,v_y^n
$$

The **dollar value of a basis point (DV01)** measures the price change per 1 bp (0.01%) change in yield:

$$
\text{DV01} = -\frac{dP}{dy} \cdot 0.0001
$$

## Macaulay Duration

**Macaulay duration** is the time-weighted average of cash flow present values, interpreted as the effective maturity of the bond:

$$
D_{\text{Mac}} = \frac{\sum_{t=1}^n t \cdot PV(CF_t)}{P} = \frac{\sum_{t=1}^n t \cdot CF_t \cdot v^t}{P}
$$

where $v = 1/(1+y)$.

For a zero-coupon bond maturing at $T$: $D_{\text{Mac}} = T$ (all cash flow at maturity).

For a perpetuity with yield $y$: $D_{\text{Mac}} = (1+y)/y$.

**Modified duration** adjusts for the compounding convention:

$$
D^* = \frac{D_{\text{Mac}}}{1+y}
$$

The first-order price sensitivity is:

$$
\frac{dP}{dy} = -D^* \cdot P \implies \frac{\Delta P}{P} \approx -D^* \Delta y
$$

**Portfolio duration**: For a portfolio of bonds with values $P_i$ and durations $D_i^*$:

$$
D_{\text{port}}^* = \frac{\sum_i P_i D_i^*}{\sum_i P_i}
$$

For a liability stream (annuity or pension): replace bond cash flows with liability cash flows in the Macaulay duration formula.

## Convexity

Duration is only a first-order approximation. **Convexity** captures the curvature:

$$
\text{Conv} = \frac{1}{P}\frac{d^2P}{dy^2} = \frac{\sum_{t=1}^n t(t+1) \cdot CF_t \cdot v^{t+2}}{P}
$$

The second-order price approximation is:

$$
\frac{\Delta P}{P} \approx -D^*\,\Delta y + \tfrac{1}{2}\,\text{Conv}\,(\Delta y)^2
$$

**Dollar convexity** $= \text{Conv} \times P$, so the DV01 change per 1 bp shift is:

$$
\Delta(\text{DV01}) \approx \tfrac{1}{2}\,\text{Conv}\,P\,(0.0001)
$$

Convexity is always positive for standard bonds (no embedded options), meaning the price rises more than linearly as yields fall — a benefit to holders. Callable bonds or mortgage-backed securities can exhibit **negative convexity** in some yield environments.

## Immunization Theory

**Redington immunization** (1952) seeks a portfolio of assets that is insensitive to small parallel yield shifts. For assets (A) and liabilities (L) with the same present value:

**Conditions for immunization:**

1. $PV(\text{Assets}) = PV(\text{Liabilities})$ (value matching)
2. $D^*_A = D^*_L$ (duration matching)
3. $\text{Conv}_A > \text{Conv}_L$ (convexity matching — actually exceeds)

Condition 3 ensures that for large yield shifts, assets outperform liabilities: the asset price curve is more convex than the liability price curve, so the surplus is a convex function of yield with a minimum at zero (the current position).

**Proof sketch**: Define surplus $V(\Delta y) = A(\Delta y) - L(\Delta y)$. Taylor expand:

$$
V(\Delta y) = V(0) + V'(0)\Delta y + \tfrac{1}{2}V''(0)(\Delta y)^2 + \ldots
$$

Conditions 1 and 2 give $V(0) = 0$ and $V'(0) = 0$. Condition 3 gives $V''(0) > 0$, so $V(\Delta y) > 0$ for small $|\Delta y|$.

**Limitations**: Immunization assumes parallel yield shifts; non-parallel shifts (twists, butterflies) require **key rate durations**.

## Key Rate Durations

**Key rate duration (KRD)** at tenor $\tau$ measures price sensitivity to a localized shift in the yield curve at maturity $\tau$:

$$
\text{KRD}_\tau = -\frac{1}{P}\frac{\partial P}{\partial r_\tau}
$$

where $r_\tau$ is the $\tau$-year spot rate and the shift is a hat-shaped bump of height 1 affecting only nearby maturities.

Portfolio KRDs (typically at 5-10 key maturities: 1, 2, 3, 5, 7, 10, 20, 30 years) allow **bucket hedging**: match each KRD of liabilities with assets at the corresponding maturity. This neutralizes non-parallel curve risk.

**DV01 by key rate**: $\text{KRD-DV01}_\tau = \text{KRD}_\tau \times P \times 0.0001$.

The full vector of KRDs hedges the portfolio against all curve shape changes that can be expressed as combinations of shifts at the key rate tenors.

## Interest Rate Models for ALM

**Vasicek model** — short rate $r_t$ satisfies the Ornstein-Uhlenbeck SDE:

$$
dr_t = \kappa(\theta - r_t)\,dt + \sigma\,dW_t
$$

Parameters: $\kappa$ (mean-reversion speed), $\theta$ (long-run mean), $\sigma$ (volatility). Under the risk-neutral measure $\tilde{Q}$:

$$
P(t, T) = A(t,T)\,e^{-B(t,T)r_t}
$$

$$
B(t,T) = \frac{1-e^{-\kappa(T-t)}}{\kappa}, \quad \ln A(t,T) = \left(\theta - \frac{\sigma^2}{2\kappa^2}\right)(B-T+t) - \frac{\sigma^2}{4\kappa}B^2
$$

**Cox-Ingersoll-Ross (CIR) model** — ensures positive rates:

$$
dr_t = \kappa(\theta - r_t)\,dt + \sigma\sqrt{r_t}\,dW_t
$$

Zero-coupon bond prices have the same affine form $P = A(t,T)e^{-B(t,T)r_t}$ with different coefficient functions. The Feller condition $2\kappa\theta > \sigma^2$ prevents rates hitting zero.

**ALM application — liability duration under stochastic rates**: The market value of a life annuity under Vasicek is:

$$
V(r) = \sum_{t=1}^{\omega-x} {}_t p_x \cdot P(0, t; r)
$$

where $P(0, t; r) = A(0,t)e^{-B(0,t)r}$. The stochastic duration is:

$$
D^{\text{stoch}} = \frac{\sum_{t} {}_t p_x \cdot B(0,t) \cdot P(0,t)}{\sum_{t} {}_t p_x \cdot P(0,t)}
$$

This differs from the deterministic duration because the discount factors are no longer $e^{-rt}$ — the mean reversion structure flattens long-dated sensitivities.

## Cash Flow Matching vs Duration Matching

**Cash flow matching (dedication)** constructs an asset portfolio whose cash flows exactly replicate liability cash flows period by period:

$$
\min_{\mathbf{x}} \sum_j c_j x_j \quad \text{subject to} \quad \sum_j CF_j(t)\,x_j \ge L(t) \; \forall t, \quad x_j \ge 0
$$

This is a **linear program** (no residual interest rate risk once matched) but requires a specific bond for each liability maturity — often impossible or expensive.

**Duration matching** relaxes this: any bond can be used, provided the portfolio duration matches the liability duration. It is cheaper and more liquid but leaves residual curve risk (it immunizes only against parallel shifts).

**In practice**, insurers use a hybrid: cash flow match the near-term liabilities (where specific bonds exist) and duration match the long end (where matching bonds are scarce), supplemented by interest rate swaps and inflation swaps to fine-tune the sensitivity profile.
