---
title: "Energy Balance Models"
field: climate-modeling
description: Zero- and one-dimensional models of Earth's temperature from the balance between absorbed solar radiation and outgoing longwave emission.
intro: >
  Energy balance models (EBMs) are the simplest physically meaningful climate
  models, capturing the competition between absorbed sunlight and infrared
  emission to space. Despite their simplicity, EBMs reveal fundamental
  phenomena such as the greenhouse effect, ice-albedo feedback, and the
  catastrophic Snowball Earth bifurcation.
math_concepts:
  - differential-equations
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Zero-dimensional energy balance

The simplest EBM treats Earth as a single uniform body with heat capacity $C$ (J m⁻² K⁻¹). The energy budget equates absorbed shortwave radiation to outgoing longwave:

$$C\frac{dT}{dt} = \frac{S_0(1-\alpha)}{4} - \epsilon\sigma T^4$$

| Symbol | Meaning | Typical value |
|--------|---------|---------------|
| $S_0$ | Solar constant | 1361 W m⁻² |
| $\alpha$ | Planetary albedo | 0.30 |
| $\epsilon$ | Effective emissivity | 0.78 |
| $\sigma$ | Stefan-Boltzmann constant | 5.67 × 10⁻⁸ W m⁻² K⁻⁴ |
| $C$ | Heat capacity (mixed layer) | ~2 × 10⁸ J m⁻² K⁻¹ |

At radiative equilibrium ($dT/dt = 0$):

$$T_{eq} = \left(\frac{S_0(1-\alpha)}{4\epsilon\sigma}\right)^{1/4}$$

With the values above, $T_{eq} \approx 255$ K. The observed surface temperature of ~288 K is warmer by 33 K — the **greenhouse effect**.

## Greenhouse effect parameterization

A simple way to include the greenhouse effect is to modify the outgoing longwave radiation (OLR) with an emissivity $\epsilon < 1$ or equivalently write:

$$\text{OLR} = A + BT$$

where $A$ and $B$ are empirically fitted constants (Budyko linearization, $A \approx -326$ W m⁻², $B \approx 1.9$ W m⁻² K⁻¹). The equilibrium temperature becomes:

$$T^* = \frac{S_0(1-\alpha)/4 - A}{B}$$

A CO₂ doubling shifts $A$ by $\Delta A \approx -3.7$ W m⁻², giving equilibrium warming:

$$\Delta T = -\frac{\Delta A}{B} \approx \frac{3.7}{1.9} \approx 1.95\text{ K}$$

This is the **no-feedback climate sensitivity** (Planck response alone).

## Stefan-Boltzmann law and linearization

The Stefan-Boltzmann law $F = \sigma T^4$ is highly nonlinear. Near a reference temperature $T_0$, expand to first order:

$$\sigma T^4 \approx \sigma T_0^4 + 4\sigma T_0^3(T - T_0)$$

The **Planck feedback parameter** is:

$$\lambda_0 = -4\epsilon\sigma T_0^3 \approx -3.2 \text{ W m}^{-2}\text{ K}^{-1}$$

This negative value ensures stability: warming increases OLR, restoring equilibrium. The e-folding timescale for relaxation is:

$$\tau = \frac{C}{|\lambda_0|} \approx \frac{2\times10^8}{3.2} \approx 2 \text{ years}$$

## Albedo feedback and ice-albedo instability

Albedo $\alpha$ depends on surface type. Snow and ice reflect ~0.6–0.85 of incoming solar, while open ocean reflects only ~0.06. Write:

$$\alpha(T) = \begin{cases} \alpha_i & T < T_1 \text{ (ice-covered)} \\ \alpha_i + (\alpha_w - \alpha_i)\frac{T - T_1}{T_2 - T_1} & T_1 \le T \le T_2 \\ \alpha_w & T > T_2 \end{cases}$$

with $T_1 = -10°C$, $T_2 = 0°C$, $\alpha_i \approx 0.62$, $\alpha_w \approx 0.30$. The ice-albedo feedback parameter is:

$$\lambda_{ice} = \frac{S_0}{4}\frac{d\alpha}{dT} > 0$$

This **positive feedback** amplifies warming (or cooling). The total feedback is $\lambda_{tot} = \lambda_0 + \lambda_{ice}$; stability requires $\lambda_{tot} < 0$.

## Budyko-Sellers one-dimensional latitudinal model

The 1D EBM distributes temperature $T(\phi)$ with latitude $\phi$ and includes meridional heat transport:

$$C\frac{\partial T}{\partial t} = \frac{S_0}{4}s(\phi)(1-\alpha(T)) - (A + BT) + D\nabla^2 T$$

where $s(\phi)$ is the meridional solar distribution ($\int s\,d\mu = 1$), and $D \approx 0.55$ W m⁻² K⁻¹ is the diffusion coefficient for dry static energy transport. In terms of $\mu = \sin\phi$:

$$C\frac{\partial T}{\partial t} = Qs(\mu)(1-\alpha) - (A + BT) + \frac{\partial}{\partial\mu}\left[D(1-\mu^2)\frac{\partial T}{\partial\mu}\right]$$

Expanding in Legendre polynomials $P_n(\mu)$, the $n=0$ mode gives the global mean and the $n=2$ mode gives the equator-to-pole gradient. The equilibrium solution has an **ice line** at latitude $\phi_s$ where $T(\phi_s) = T_{freeze}$.

## Snowball Earth bifurcation

Reducing insolation (or albedo feedback with growing ice) can push the system through a **saddle-node bifurcation**. Plotting equilibrium $T$ vs. solar constant $Q = S_0/4$:

- For large $Q$: warm, partially ice-covered equilibrium
- Decreasing $Q$: ice line advances equatorward
- At critical $Q_c$: ice line reaches tropics — no stable warm equilibrium; system collapses to **fully glaciated Snowball** state ($T \approx -50°C$)

The Snowball-to-warm transition requires very high CO₂ (volcanic outgassing over millions of years) to overcome the high albedo, creating **hysteresis**:

$$\Delta Q_{hysteresis} = Q_{melt} - Q_{freeze} \approx 0.1 Q_0$$

This bistability was recognized in Budyko (1969) and Sellers (1969) and provides a model for Neoproterozoic glaciation events (~635–720 Ma). The bifurcation structure can be analyzed via the potential:

$$V(T) = -\int \left[\frac{S_0(1-\alpha(T))}{4} - (A + BT)\right]dT$$

Stable equilibria correspond to minima of $V(T)$; the unstable equilibrium between warm and Snowball states is a local maximum (separatrix).
