---
title: "Radiative Forcing"
field: climate-modeling
description: The change in Earth's energy budget caused by an external perturbation, measured in watts per square meter, and its role in attributing observed climate change.
intro: >
  Radiative forcing (RF) quantifies how much an agent — such as increased CO₂
  or aerosol emissions — perturbs the top-of-atmosphere energy balance before
  climate feedbacks respond. It is the standard metric for comparing drivers
  of climate change and anchors the relationship between emissions and
  temperature response.
math_concepts:
  - probability-theory
  - differential-equations
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Definition and types of radiative forcing

**Instantaneous RF** is the change in net irradiance at the tropopause immediately after imposing an agent, before any temperature or circulation adjustments:

$$\Delta F_{inst} = F_{perturbed} - F_{control} \quad [\text{W m}^{-2}]$$

**Stratospherically adjusted RF** (conventional RF): the stratosphere is allowed to re-equilibrate (typically ~2 months) while tropospheric temperatures are fixed. This removes the large but fast stratospheric response and gives a forcing more predictive of surface temperature change.

**Effective RF (ERF)**: tropospheric adjustments (cloud cover, water vapor, land albedo) are also allowed to respond — only surface temperature is fixed. ERF is now preferred in IPCC AR6 because it better predicts transient warming:

$$ERF = \Delta F_{inst} + \text{rapid adjustments}$$

The **forcing-response relationship** is approximately linear:

$$\Delta T = \lambda \cdot ERF$$

where $\lambda \approx 0.8$ K (W m⁻²)⁻¹ is the equilibrium climate sensitivity parameter.

## CO₂ logarithmic forcing

The radiative forcing from CO₂ follows a logarithmic relationship because the main absorption bands are already saturated; additional CO₂ absorbs in the band wings:

$$\Delta F_{CO_2} = \alpha\ln\left(\frac{C}{C_0}\right)$$

with $\alpha \approx 5.35$ W m⁻² (Myhre et al. 1998, IPCC AR5). At doubled CO₂ ($C = 2C_0$):

$$\Delta F_{2\times CO_2} = 5.35\ln 2 \approx 3.71 \text{ W m}^{-2}$$

The logarithmic dependence arises from the Voigt line shape of CO₂ absorption features. At very high concentrations the forcing transitions toward a square-root dependence as continuum absorption dominates.

| Agent | RF (W m⁻²) | Uncertainty |
|-------|-----------|-------------|
| CO₂ (1750–2019) | +2.16 | ±10% |
| CH₄ | +0.54 | ±20% |
| N₂O | +0.21 | ±10% |
| Halocarbons | +0.41 | ±10% |
| Total aerosol | −1.1 | ±50% |
| Solar | +0.01 | ±50% |

## Aerosol forcing: direct and indirect effects

Aerosols scatter and absorb solar radiation (**direct effect**) and modify cloud properties (**indirect/Twomey effect**).

**Direct RF** depends on aerosol optical depth $\tau$, single-scatter albedo $\omega_0$, and asymmetry factor $g$:

$$\Delta F_{direct} = -\frac{S_0}{4}T_{atm}^2(1-A_c)(1-\omega_0 f)\left[2\omega_0\beta\tau\right]$$

where $f = g^2$, $\beta$ is the backscatter fraction, and $A_c$ is cloud fraction.

**Twomey (first indirect) effect:** More aerosol $\Rightarrow$ more cloud condensation nuclei $\Rightarrow$ smaller droplets $\Rightarrow$ higher cloud albedo $\alpha_c$. For fixed liquid water path:

$$\frac{d\alpha_c}{d\ln N} \approx \frac{\alpha_c(1-\alpha_c)}{3}$$

The **second indirect (lifetime) effect**: smaller droplets suppress precipitation, increasing cloud lifetime and coverage. Total aerosol ERF is estimated at $-1.1 \pm 0.4$ W m⁻² (AR6), the largest uncertainty in the forcing budget.

## Solar forcing and stratospheric ozone

Solar forcing varies with the 11-year sunspot cycle ($\Delta F \approx \pm 0.1$ W m⁻²) and longer-term changes in total solar irradiance (TSI). Since 1750, the net solar ERF is only $+0.01$ W m⁻² — negligible compared to greenhouse gas forcing.

Stratospheric ozone depletion (CFCs) exerts a **negative** RF through two mechanisms:
1. Reduced ozone absorbs less solar UV $\Rightarrow$ less warming of stratosphere $\Rightarrow$ more OLR to space
2. Less stratospheric ozone also reduces downward IR emission

The net ozone RF was approximately $-0.05$ W m⁻² over 1750–2019.

## Transient vs equilibrium response and forcing efficacies

The **transient climate response** (TCR) is the warming at the time of CO₂ doubling under a 1% per year increase:

$$TCR = \lambda_{eff} \cdot \Delta F_{2\times} \approx 0.55 \times ECS$$

The ratio TCR/ECS $< 1$ because the ocean absorbs heat: the net forcing driving surface warming is $N = ERF - \lambda\Delta T$ where $N$ is ocean heat uptake rate.

**Forcing efficacy** $e$ accounts for different geographic/vertical patterns having different temperature impacts per unit forcing. Defined as:

$$e = \frac{ECS_i / \Delta F_{2\times CO_2}}{ECS_{CO_2} / \Delta F_{2\times CO_2}} = \frac{\lambda_{CO_2}}{\lambda_i}$$

Solar forcing has efficacy ~1.0; volcanic forcing has ~0.6 (short-lived aerosols at low latitudes); land-use albedo ~1.0; black carbon on ice ~3 (very high, as it affects the ice-albedo feedback strongly).

## Attribution of observed warming

The energy budget attribution links observed warming $\Delta T_{obs} \approx 1.1$ K (1850–2019) to forcing components via:

$$\Delta T = \sum_i \lambda_i \cdot ERF_i$$

In a regression framework, observed temperature $\mathbf{y}$ is decomposed:

$$\mathbf{y} = \sum_k \beta_k \mathbf{x}_k + \boldsymbol{\varepsilon}$$

where $\mathbf{x}_k$ are GCM-simulated fingerprints (greenhouse gas, aerosol, natural) and $\beta_k$ are scaling factors estimated by **optimal fingerprinting**:

$$\hat{\boldsymbol{\beta}} = (X^T C^{-1} X)^{-1} X^T C^{-1} \mathbf{y}$$

Here $C$ is the internal variability covariance estimated from unforced control runs. IPCC AR6 concludes: it is **unequivocal** that human influence has warmed the climate. The greenhouse gas contribution is $+1.0$ to $+2.0$ K, partially offset by aerosol cooling of $−0.5$ to $−0.2$ K.
