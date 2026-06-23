---
title: "Climate Sensitivity"
field: climate-modeling
description: Quantifying how much global mean temperature responds to a doubling of CO₂, from feedback analysis to paleoclimate and observational constraints.
intro: >
  Climate sensitivity is the central quantity in climate science, linking
  radiative forcing to eventual temperature change. Constraining it requires
  synthesizing evidence from GCM feedbacks, instrumental records, and
  paleoclimate proxies. The persistence of a 1.5–4.5°C likely range since
  Charney (1979) reflects deep structural uncertainty, especially in cloud
  feedbacks.
math_concepts:
  - probability-theory
  - dynamical-systems
  - bayes-theorem
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Definitions: ECS, TCR, and TCRE

**Equilibrium Climate Sensitivity (ECS):** the equilibrium global mean surface temperature change following a sustained doubling of atmospheric CO₂:

$$ECS = \Delta T_{2\times CO_2}^{equil} = -\frac{\Delta F_{2\times}}{\lambda_{eff}}$$

where $\Delta F_{2\times} \approx 3.93$ W m⁻² (AR6) and $\lambda_{eff}$ is the net feedback parameter (W m⁻² K⁻¹, negative for a stable climate).

**Transient Climate Response (TCR):** warming at CO₂ doubling under 1% yr⁻¹ increase (70-year ramp). TCR $<$ ECS because ocean heat uptake delays equilibration:

$$TCR = ECS \cdot \frac{1}{1 + \kappa/\lambda_{eff}}$$

where $\kappa \approx 0.6$ W m⁻² K⁻¹ is the ocean heat uptake efficiency.

**Transient Climate Response to Cumulative Emissions (TCRE):** approximately constant at ~0.45°C per 1000 PgC (AR6), providing the basis for carbon budgets.

| Metric | AR6 likely range | AR6 best estimate |
|--------|----------------|-------------------|
| ECS | 2.5–4.0°C | 3.0°C |
| TCR | 1.2–2.4°C | 1.8°C |
| TCRE | 0.27–0.63°C/1000 PgC | 0.45°C/1000 PgC |

## Feedback analysis

The net feedback parameter decomposes into additive contributions:

$$\lambda_{eff} = \lambda_0 + \sum_i \lambda_i$$

where $\lambda_0 = -3.2$ W m⁻² K⁻¹ is the Planck response (blackbody cooling). Individual feedback parameters (AR6 best estimates, W m⁻² K⁻¹):

| Feedback | $\lambda_i$ | Sign | Mechanism |
|----------|------------|------|-----------|
| Planck (reference) | −3.20 | Stabilizing | Increased OLR with $T$ |
| Water vapor | +1.77 | Amplifying | More WV in warmer atm. |
| Lapse rate | −0.50 | Stabilizing | Tropical upper-trop. warms more |
| Cloud (SW) | +0.42 | Amplifying | Low-cloud reduction |
| Cloud (LW) | +0.20 | Amplifying | High-cloud rise |
| Surface albedo | +0.35 | Amplifying | Ice/snow retreat |
| **Net** | **−0.96** | | |

The **feedback factor** $f$ measures the amplification of the no-feedback response:

$$f_i = \frac{\lambda_i}{\lambda_0}, \qquad \Delta T = \frac{\Delta T_{Planck}}{1-\sum f_i}$$

With the values above, $\sum f_i \approx 0.70$, amplifying the Planck-only response by $1/(1-0.70) \approx 3.3$.

## Cloud feedbacks and the Charney range

Cloud feedbacks are the dominant source of inter-model spread. The AR6 likely range 2.5–4.0°C is largely determined by uncertainty in low-cloud (boundary layer) response.

**Low-cloud feedback mechanism:** Marine stratocumulus cover decreases with warming because (a) the lower troposphere becomes less stably stratified and (b) subsidence weakens. The shortwave cloud feedback:

$$\lambda_{SW,cloud} = \frac{S_0}{4}\frac{\partial(1-\alpha)}{\partial T} = -\frac{S_0}{4}\frac{\partial\alpha_{cloud} \cdot f_{cloud}}{\partial T}$$

CMIP6 models span $\lambda_{SW,cloud}$ from $-0.1$ to $+1.2$ W m⁻² K⁻¹ — a 1.3 W m⁻² K⁻¹ spread translating to ~1.5°C in ECS.

## Emergent constraints

Cross-model relationships between observable present-day quantities and ECS provide **emergent constraints**. Key examples:

- **Sherwood et al. (2014):** Lower-tropospheric mixing (D index) correlates with ECS across CMIP5 models; observations constrain ECS $>$ 3°C.
- **Klein & Hall (2015):** Seasonal cycle of low-cloud cover correlates with ECS.
- **Zelinka et al. (2020):** CMIP6 high ECS models ($>$ 5°C) have unrealistically large cloud feedbacks compared to CERES observations.

In a Bayesian framework, let $x$ be the observable and $y = ECS$:

$$p(y | x_{obs}) \propto \int p(x_{obs} | x_{model}) p(y | x_{model}) p(x_{model})\,dx_{model}$$

With a Gaussian likelihood and a uniform prior, the constrained estimate is:

$$\hat{y} = \bar{y} + \frac{\rho\sigma_y}{\sigma_x}(x_{obs} - \bar{x}), \quad \sigma_{y|x}^2 = \sigma_y^2(1-\rho^2)$$

where $\rho$ is the cross-model correlation. This yields a narrower posterior distribution.

## Historical energy balance constraint

The **energy budget** method uses instrumental records directly. Over a period with forcing $\Delta F$, warming $\Delta T$, and ocean heat uptake $N$:

$$ECS = \frac{\Delta F_{2\times}}{\Delta F - N}\Delta T$$

Using AR6 estimates ($\Delta T = 1.03$ K, $\Delta F = 2.20$ W m⁻², $N = 0.79$ W m⁻²):

$$ECS \approx \frac{3.93}{2.20 - 0.79} \times 1.03 \approx \frac{3.93}{1.41} \times 1.03 \approx 2.87\text{ K}$$

The **pattern effect** complicates this: the geographic pattern of SST warming affects the global radiative response. Historical warming has been relatively concentrated in regions of low cloud feedback (Pacific); future warming will spread to high-feedback regions, implying $\lambda_{eff}^{historical} > \lambda_{eff}^{future}$, and so the energy-budget method underestimates ECS by ~0.5°C.

## Paleoclimate evidence

**Last Glacial Maximum (LGM, ~21 ka):** Global cooling of ~5–7°C with ice-sheet and CO₂ forcings of ~$-8$ W m⁻². The **paleo-ECS** from LGM:

$$ECS_{paleo} = \frac{\Delta T_{LGM}}{\Delta F_{LGM}}\times \Delta F_{2\times} \approx \frac{6}{8} \times 3.93 \approx 2.9\text{ K}$$

**Eocene (~50 Ma):** CO₂ ~1000 ppm, temperatures ~10–14°C warmer. Paleoclimate proxies (Mg/Ca, $\delta^{18}$O, TEX86) suggest ECS consistent with 2.5–4.5°C when ice-albedo feedback differences are accounted for. The combination of instrumental, model, and paleo evidence underpins the AR6 assessment that ECS is **very likely** 2.0–5.0°C and **likely** 2.5–4.0°C, with a best estimate of 3.0°C.
