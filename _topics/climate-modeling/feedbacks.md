---
title: "Climate Feedbacks"
field: climate-modeling
description: The physical mechanisms by which an initial warming perturbation is amplified or damped, quantified through the feedback framework and linearized forcing-response relationships.
intro: >
  Climate feedbacks determine how much the Earth warms for a given radiative
  forcing. The Planck response provides a stabilizing anchor, while water
  vapor, ice-albedo, and cloud feedbacks collectively more than double the
  no-feedback sensitivity. Understanding feedback mechanisms, their linearity,
  and their potential to trigger irreversible tipping points is central to
  constraining future climate change.
math_concepts:
  - dynamical-systems
  - differential-equations
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The feedback framework

Start from the linearized energy balance near equilibrium temperature $T_0$. A radiative forcing $\Delta F$ perturbs the system; each feedback $i$ generates an additional flux $\lambda_i \Delta T$:

$$C\frac{d(\Delta T)}{dt} = \Delta F + \sum_i \lambda_i \Delta T$$

At equilibrium ($d\Delta T/dt = 0$):

$$\Delta T = \frac{\Delta F}{\lambda_0 + \sum_i \lambda_i} = \frac{\Delta F}{\lambda_{eff}}$$

Defining the **feedback factor** $f_i = \lambda_i/|\lambda_0|$ (positive = amplifying, negative = damping):

$$\Delta T = \frac{\Delta T_0}{1 - \sum_i f_i}, \qquad \Delta T_0 = -\frac{\Delta F}{\lambda_0}$$

where $\Delta T_0 \approx 1.2$ K is the Planck-only (no-feedback) response to CO₂ doubling. The **gain factor** $g = 1/(1-\Sigma f_i)$; currently $g \approx 2.5$–3.5. If $\Sigma f_i \to 1$, sensitivity diverges — runaway warming.

| Feedback | $f_i$ | Physical mechanism |
|----------|------|-------------------|
| Planck | −1.00 (reference) | $\sigma T^4$ restoring force |
| Water vapor | +0.55 | More WV absorbs more LW |
| Lapse rate | −0.16 | Tropical upper-trop. warms more |
| Cloud (net) | +0.19 | Net positive in CMIP6 |
| Surface albedo | +0.11 | Ice/snow area decreases |
| **Total** | **+0.69** | |

## Planck response: the restoring force

The Planck feedback is the fundamental stabilizing mechanism — without it the climate would be unstable. For a blackbody at temperature $T$, the outgoing longwave radiation (OLR) is $F = \sigma T^4$, so:

$$\lambda_0 = \frac{\partial OLR}{\partial T} = 4\sigma T^3 \approx 3.2 \text{ W m}^{-2}\text{K}^{-1}$$

(with negative sign convention: $\lambda_0 = -3.2$ W m⁻² K⁻¹). The e-folding relaxation timescale is:

$$\tau_0 = \frac{C}{|\lambda_0|} \approx \frac{2\times10^8 \text{ J m}^{-2}\text{K}^{-1}}{3.2 \text{ W m}^{-2}\text{K}^{-1}} \approx 2 \text{ years}$$

## Water vapor feedback

Warming increases atmospheric water vapor through the Clausius-Clapeyron relation:

$$\frac{d\ln e_s}{dT} = \frac{L_v}{R_v T^2} \approx 7\% \text{ K}^{-1}$$

where $e_s$ is saturation vapor pressure, $L_v = 2.5\times10^6$ J kg⁻¹ is latent heat of vaporization, and $R_v = 461$ J kg⁻¹ K⁻¹. Assuming constant relative humidity (supported by observations and models), specific humidity rises ~7% per kelvin. This increases absorption of longwave radiation proportionally, amplifying warming.

The water vapor feedback is the **strongest positive feedback** (~+1.77 W m⁻² K⁻¹ in AR6), but its magnitude is robust across models precisely because it is thermodynamically constrained. The lapse rate and water vapor feedbacks are anticorrelated — they are typically combined as the **WV+LR feedback** of ~+1.27 W m⁻² K⁻¹.

## Lapse rate feedback

The lapse rate feedback is **negative in the tropics** (stabilizing) and **positive in the Arctic** (amplifying). In the tropics, convection ties the temperature profile to the moist adiabat. Warming increases the moist adiabatic lapse rate more at upper levels (Clausius-Clapeyron effect on latent heat release), so the upper troposphere warms faster than the surface:

$$\frac{\partial T}{\partial z}\bigg|_{moist} = -\Gamma_m(T) \approx -\Gamma_d\frac{1 + (L_v q_s)/(R_d T)}{1 + (L_v^2 q_s)/(c_p R_v T^2)}$$

Enhanced upper-tropospheric warming increases OLR more than if the surface alone warmed, providing a restoring force ($\lambda_{LR} < 0$).

In polar regions, temperature inversions trap warming near the surface (**polar amplification**), making the lapse rate feedback positive at high latitudes.

## Cloud feedbacks

Cloud feedbacks remain the largest source of uncertainty in ECS. The key distinction is between **low clouds** (optically thick, strong shortwave cooling) and **high clouds** (thin, LW trapping dominates).

**Low-cloud (marine boundary layer) feedback:** As SST rises, the stability of the boundary layer decreases, reducing stratocumulus coverage. The SW cloud feedback:

$$\lambda_{SW}^{cloud} = \frac{S_0}{4}\frac{\partial \alpha_c f_c}{\partial T} \approx +0.4 \text{ W m}^{-2}\text{K}^{-1}$$

**High-cloud altitude feedback:** The anvil-top temperature remains approximately fixed (Fixed Anvil Temperature hypothesis), so as the troposphere warms, high clouds rise. Higher clouds are colder and emit less LW, reducing OLR:

$$\lambda_{LW}^{cloud} \approx +0.2 \text{ W m}^{-2}\text{K}^{-1}$$

## Ice-albedo feedback

Sea ice and snow cover decrease with warming, exposing darker ocean/land surfaces. The feedback:

$$\lambda_{alb} = \frac{S_0}{4}\frac{d(1-\bar\alpha)}{dT} > 0$$

Arctic sea ice albedo ~0.5–0.8 vs. open ocean ~0.06. Loss of sea ice has contributed to **Arctic amplification** — the Arctic warms 2–4× faster than the global mean:

$$\frac{\Delta T_{Arctic}}{\Delta T_{global}} \approx 2\text{–}4$$

driven by albedo feedback, lapse rate feedback, and reduced poleward heat transport.

## Tipping points and nonlinear feedbacks

When $\sum f_i$ approaches 1, or when feedbacks become state-dependent (nonlinear), the system can undergo **tipping**: an irreversible transition to a qualitatively different state. Examples include:

- **West Antarctic Ice Sheet** collapse (threshold ~1.5–2°C above pre-industrial)
- **Amazon dieback** (deforestation + drought feedback)
- **AMOC collapse** (freshwater hosing, hysteresis)
- **Permafrost carbon release** (soil carbon-climate feedback)

Mathematically, tipping near a fold bifurcation: the potential $V(T) = -\int R(T)\,dT$ develops a single minimum as the barrier shrinks. **Critical slowing down** (increased autocorrelation and variance before tipping) provides early warning signals that can in principle be detected in time-series data.

The full nonlinear sensitivity is:

$$\lambda_{eff}(T) = \lambda_0 + \sum_i \lambda_i(T)$$

State-dependence of feedbacks means ECS computed from historical warming may differ from ECS under doubled CO₂ — this is the **pattern effect** and a central open question in climate sensitivity research.
