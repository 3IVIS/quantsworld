---
title: "Embedded Options in Insurance"
field: actuarial-science
description: Financial options implicit in insurance and annuity contracts—such as guaranteed annuity rates and variable annuity guarantees—that require stochastic modeling and hedging for fair valuation under Solvency II.
intro: >
  Insurance contracts frequently contain options that policyholders can exercise to their benefit: the right to convert a pension pot to an annuity at a guaranteed rate, the right to a minimum account value on death, or the right to withdraw a guaranteed income regardless of fund performance. These embedded options create significant market risk exposures for insurers, as their value rises sharply when interest rates fall or volatility increases. Pricing and hedging them requires risk-neutral valuation, stochastic interest rate and equity models, and the full apparatus of financial derivatives theory applied in an insurance context.
math_concepts:
  - stochastic-calculus
  - probability-theory
  - optimization
difficulty: expert
difficulty_level: 5
read_time: 13
---

## Participating Policies and With-Profits Business

A **participating (with-profits) policy** credits policyholders with a share of investment returns through bonuses. The basic structure is:

- **Guaranteed benefit**: a minimum sum assured $G$
- **Reversionary (annual) bonus**: $b_t \cdot S_t$ added irrevocably each year
- **Terminal bonus**: $T$ paid at maturity, depending on final fund performance

The insurer holds a **smoothed** asset portfolio $F_t$, crediting bonuses when $F_t$ exceeds the policy reserve. The implicit guarantee is:

$$
\text{Benefit} = \max\!\left(G + \sum_{t} b_t, F_n\right)
$$

This is equivalent to holding the guaranteed amount $G$ plus a **call option** on the excess fund performance:

$$
\text{Benefit} = G + \max(F_n - G, 0) = G + (F_n - G)_+
$$

Under risk-neutral measure $Q$ with risk-free rate $r$ and equity volatility $\sigma$:

$$
V_0 = e^{-rT}E^Q[\max(F_T, G)] = F_0\,N(d_1) - G\,e^{-rT}N(d_2)
$$

using Black-Scholes with $d_1 = [\ln(F_0/G) + (r + \sigma^2/2)T]/(\sigma\sqrt{T})$, exactly the price of a European call on the fund.

## Guaranteed Annuity Options (GAO)

A **Guaranteed Annuity Option (GAO)** gives the policyholder the right to convert their accumulation fund $A$ at retirement into an annuity at a pre-specified **guaranteed annuity rate** $g$ (e.g., £9 of annual income per £100 of fund) rather than the prevailing market rate.

The annuity at market rates: $a_{65}(r) = $ annuity factor at current yield $r$.
The annuity at guaranteed rate: $g \cdot A$ (fixed).

The policyholder exercises the GAO when the guaranteed annuity exceeds the market annuity:

$$
g > 1/a_{65}(r) \quad\Longleftrightarrow\quad a_{65}(r) > 1/g
$$

The **payoff** of the GAO at retirement is:

$$
\text{GAO Payoff} = A \cdot \max(g\,a_{65}(r) - 1, 0)
$$

This is equivalent to a **put option on interest rates** (since falling rates raise annuity factors). UK with-profits policies written in the 1970s-80s with $g = 11\%$ became severely in-the-money when 1990s interest rates collapsed — creating billions in unexpected liabilities.

**Valuation** requires a stochastic interest rate model (e.g., Hull-White or CIR) combined with stochastic mortality:

$$
V_0^{\text{GAO}} = E^Q\!\left[e^{-\int_0^T r_s\,ds} \cdot A_T \cdot \max\!\left(g\,a_{65}(r_T,K_{65}) - 1,\; 0\right)\right]
$$

where $K_{65}$ is the curtate future lifetime random variable — making this a **hybrid financial-demographic** option.

## Variable Annuity Guarantees (GMxB)

**Variable annuities** (known as unit-linked bonds in the UK) invest premiums in mutual funds, providing market-linked growth with optional guarantees:

| Guarantee | Acronym | Payoff |
|---|---|---|
| Guaranteed Minimum Death Benefit | GMDB | $\max(A_\tau, G)$ on death at time $\tau$ |
| Guaranteed Minimum Accumulation Benefit | GMAB | $\max(A_T, G)$ at maturity $T$ |
| Guaranteed Minimum Income Benefit | GMIB | Annuity at rate $g$ if elected at $T$ |
| Guaranteed Minimum Withdrawal Benefit | GMWB | Annual withdrawal of $w$ guaranteed regardless of fund |

The **GMDB** with guarantee $G$ (typically the initial premium) is a **put option** on the policyholder's fund:

$$
\text{GMDB payoff at death} = \max(G - A_\tau, 0) = (G - A_\tau)_+
$$

If $A_t = A_0 e^{(r-\sigma^2/2)t + \sigma W_t}$ under $Q$, and $\tau \sim \text{Exp}(\mu)$ (constant force of mortality), then:

$$
V_0^{\text{GMDB}} = \int_0^\infty \mu e^{-\mu t} \cdot e^{-rt} \cdot E^Q[(G-A_t)_+]\,dt
$$

$$
= \mu\int_0^\infty e^{-(\mu+r)t}\!\left[G\,e^{-rt}N(-d_2) - A_0\,N(-d_1)\right]\!dt
$$

where $d_1, d_2$ are the Black-Scholes factors evaluated at horizon $t$. The integral can be evaluated numerically.

## Risk-Neutral vs Real-World Measure

**Risk-neutral valuation** prices liabilities by discounting expected payoffs under measure $Q$ where all assets grow at the risk-free rate $r$. This is the arbitrage-free price — the cost of a perfect hedge.

For insurance, the distinction between $Q$ (risk-neutral) and $P$ (real-world) matters because:

- $P$ governs actual outcomes (used in capital modeling, VaR, business planning)
- $Q$ governs fair value and hedge cost (used in IFRS 17, Solvency II market-consistent valuation)

The **Girsanov transformation** relates the two: if under $P$ the fund follows $dA = \mu_P A\,dt + \sigma A\,dW^P$, then under $Q$:

$$
dA = r A\,dt + \sigma A\,dW^Q, \quad dW^Q = dW^P + \frac{\mu_P - r}{\sigma}\,dt
$$

The **market price of risk** $\lambda = (\mu_P - r)/\sigma$ (Sharpe ratio) is the change of measure.

**Mortality risk** introduces a third dimension: under $P$, mortality follows best-estimate rates; a risk adjustment (Wang transform or cost of capital loading) is applied to move to a pricing measure $Q^*$.

## Hedging Strategies for Embedded Options

A **delta hedge** neutralizes first-order sensitivity to the underlying asset:

$$
\Delta = \frac{\partial V}{\partial A}, \quad \text{Hedge position: } -\Delta \text{ units of fund}
$$

A **delta-gamma hedge** adds a second instrument (e.g., an option) to neutralize curvature:

$$
\Gamma = \frac{\partial^2 V}{\partial A^2}, \quad \text{simultaneously hedge } \Delta \text{ and } \Gamma
$$

For **interest rate risk** in GAOs, a **vega hedge** (position in interest rate swaptions) neutralizes sensitivity to rate volatility:

$$
\text{Vega} = \frac{\partial V}{\partial \sigma_r}
$$

**Dynamic hedging** rebalances $\Delta, \Gamma$ at each time step, incurring transaction costs. For long-dated insurance products (30-50 year guarantees), dynamic hedging is expensive; **static hedges** using long-dated swaptions or equity puts are preferred when available.

## Stochastic Modeling and Solvency II Market-Consistent Valuation

**Solvency II** requires insurers to value liabilities at **market-consistent (fair) value**, which for policies with embedded options means:

$$
\text{Technical Provisions} = \text{Best Estimate} + \text{Risk Margin}
$$

The **Best Estimate** of a GMWB is:

$$
BE = E^Q\!\left[\sum_{t=1}^{T} e^{-\int_0^t r_s\,ds}\left[\text{guaranteed withdrawal}_t - \text{account charge}_t\right] \cdot {}_t p_x\right]
$$

This requires **nested simulations**: an outer set of real-world scenarios for the SCR calculation, each of which contains inner risk-neutral simulations for fair value — computationally demanding.

**Least-Squares Monte Carlo (LSMC)** (Longstaff-Schwartz adapted for insurance) approximates the continuation value via regression on basis functions of state variables $(r_t, A_t, K_t)$, avoiding nested simulation:

$$
V_t(r, A, K) \approx \sum_{j} \beta_j \phi_j(r_t, A_t, K_t)
$$

This regression-based backward induction, applied on a single set of $N$ paths, reduces computational cost from $O(N^2)$ to $O(N)$, making real-time SCR calculations feasible for large VA books.

The **Risk Margin** under Solvency II uses the **cost-of-capital** approach: it is the present value of the SCR capital charge (6% per year) required to run off the non-hedgeable risks (longevity, lapse):

$$
\text{RM} = 6\% \times \sum_{t=0}^{T} e^{-rt} \cdot \text{SCR}_t^{\text{non-hedgeable}}
$$
