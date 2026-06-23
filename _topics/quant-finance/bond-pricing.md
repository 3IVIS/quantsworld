---
title: Bond Pricing & Duration
field: quant-finance
description: Valuing fixed-income securities and measuring their interest rate sensitivity. Duration and convexity are the core risk metrics.
intro: >
  Bond pricing discounts future cash flows at appropriate interest rates.
  Duration and convexity measure sensitivity to rate changes — the primary
  risk of fixed-income portfolios. The yield curve encodes market expectations
  about future rates, inflation, and term premia.
math_concepts:
  - differential-equations
  - probability-theory
  - optimization
difficulty: beginner
difficulty_level: 2
read_time: 7
---

## Bond price

A bond paying coupons $C$ at times $t_1,\ldots,t_m$ and face $F$ at maturity $T$:

$$P = \sum_{i=1}^m \frac{C}{(1+y)^{t_i}} + \frac{F}{(1+y)^T}$$

where $y$ is the **yield to maturity** — the single discount rate equating present value to price.

## Duration

**Macaulay duration:** the weighted average time to receive cash flows:

$$D_{Mac} = \frac{\sum_i t_i \cdot PV(C_i)}{P}$$

**Modified duration** measures price sensitivity to yield:

$$D_{mod} = -\frac{1}{P}\frac{dP}{dy} \approx \frac{D_{Mac}}{1+y}$$

A 1 basis-point (0.01%) rise in yield changes price by approximately $-D_{mod} \times P \times 0.0001$.

## Convexity

Duration is a linear approximation. The second-order correction:

$$\frac{\Delta P}{P} \approx -D_{mod}\,\Delta y + \frac{1}{2}\text{Conv}(\Delta y)^2$$

Convexity $= \frac{1}{P}\frac{d^2P}{dy^2}$. Positive convexity (all standard bonds) means price falls less than duration predicts when yields rise, and rises more when yields fall — beneficial asymmetry.
