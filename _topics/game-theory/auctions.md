---
title: "Auctions"
field: game-theory
description: Market mechanisms for allocating goods through competitive bidding.
intro: >
  Auction theory analyses how different bidding rules affect revenue, efficiency,
  and bidder behaviour. The revenue equivalence theorem unifies first-price,
  second-price, English, and Dutch auctions under symmetric independent private
  values, while Myerson's optimal mechanism design characterises the
  revenue-maximising auction.
math_concepts:
  - probability-theory
  - optimization
  - convex-optimization
  - information-theory
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Auction Formats

| Format          | Winner pays          | Dominant strategy     |
|-----------------|---------------------|-----------------------|
| Second-price (Vickrey) | Second-highest bid | Bid true value $v_i$ |
| First-price     | Own bid             | Shade bid below $v_i$ |
| English (ascending) | Dropout price   | Stay until price $= v_i$ |
| Dutch (descending) | Stopping price  | Stop at optimal shade |

In the **Vickrey auction**, truthful bidding is a weakly dominant strategy: winning at the second price gives $v_i - b_{(2)} \geq 0$ regardless of others' bids.

## Revenue Equivalence Theorem

Under symmetric independent private values drawn from a common distribution $F$ on $[0,\bar{v}]$, any auction that (i) allocates to the highest type and (ii) gives a type-0 bidder zero expected surplus yields the **same expected revenue** to the seller. For $n$ bidders with values i.i.d. $F$, the equilibrium expected revenue equals:

$$\mathbb{E}[R] = n \int_0^{\bar{v}} v \, f(v) F(v)^{n-1} dv - \int_0^{\bar{v}} F(v)^{n-1} dv \cdot \text{(boundary term)}$$

The first-price equilibrium bid for uniform $F$ on $[0,1]$ is $b^*(v) = \frac{n-1}{n} v$.

## Myerson's Optimal Auction

Myerson (1981) showed the revenue-maximising auction uses **virtual valuations** $\psi_i(v_i) = v_i - \frac{1 - F_i(v_i)}{f_i(v_i)}$. The optimal rule allocates to the bidder with the highest non-negative virtual valuation and sets a reserve price $r^*$ solving $\psi(r^*) = 0$. For uniform $F$ on $[0,1]$, the optimal reserve is $r^* = 1/2$ regardless of the number of bidders.
