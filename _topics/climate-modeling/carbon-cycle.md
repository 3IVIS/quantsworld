---
title: "Carbon Cycle Modeling"
field: climate-modeling
description: Box models of carbon exchange between the atmosphere, ocean, and land biosphere, including feedback parameters that modulate the airborne fraction of emissions.
intro: >
  The carbon cycle determines how much of anthropogenic CO₂ emissions remain
  in the atmosphere. Box models track carbon reservoirs and fluxes; ocean
  chemistry and terrestrial ecology set the uptake rates. Climate-carbon
  feedbacks — quantified by the parameters β and γ — control whether the
  natural carbon sink strengthens or weakens as the planet warms.
math_concepts:
  - differential-equations
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Box model structure

The simplest carbon cycle model partitions carbon among three reservoirs: atmosphere ($A$), ocean ($O$), and terrestrial biosphere ($L$). Let $x_i$ denote carbon content in PgC.

$$\frac{dA}{dt} = E(t) - F_{AO}(A, T) - F_{AL}(A, T)$$

$$\frac{dO}{dt} = F_{AO}(A, T) - F_{buried}$$

$$\frac{dL}{dt} = F_{AL}(A, T) - R_{het}(T)$$

where $E(t)$ is anthropogenic emission, $F_{AO}$ is air-sea flux, $F_{AL}$ is net primary productivity, and $R_{het}$ is heterotrophic (soil) respiration. Current reservoir sizes:

| Reservoir | Carbon (PgC) | Turnover time |
|-----------|-------------|---------------|
| Atmosphere | 870 | ~4 years (one-way) |
| Ocean surface | 900 | ~1 year |
| Deep ocean | 37,000 | ~1000 years |
| Land biosphere | 550 (live) + 1700 (soil) | decades–centuries |

## Revelle buffer factor

The ocean's capacity to absorb CO₂ is limited by seawater chemistry. The **Revelle (buffer) factor** $R_f$ relates fractional changes in $pCO_2$ to fractional changes in dissolved inorganic carbon (DIC):

$$R_f = \frac{\partial\ln pCO_2}{\partial\ln DIC}\bigg|_{T,S,ALK}$$

At present ocean conditions $R_f \approx 10$–14 (it increases as the ocean acidifies), meaning a 1% increase in DIC raises $pCO_2$ by $R_f\%$. The ocean must take up $R_f$ times more carbon than a simple proportional calculation would suggest to equilibrate with a given atmospheric $pCO_2$. The air-sea flux is:

$$F_{AO} = k_w K_0 (pCO_2^{atm} - pCO_2^{ocean})$$

where $k_w$ is the piston velocity (~5 m day⁻¹ globally averaged) and $K_0$ is Henry's law solubility:

$$[CO_2]_{aq} = K_0(T, S) \cdot pCO_2$$

$K_0$ decreases with temperature, reducing ocean uptake capacity in a warmer world.

## Carbonate system chemistry

Dissolved CO₂ in seawater participates in a buffered system:

$$CO_2 + H_2O \rightleftharpoons H_2CO_3 \rightleftharpoons H^+ + HCO_3^- \rightleftharpoons 2H^+ + CO_3^{2-}$$

The dissociation constants $K_1$, $K_2$ and total alkalinity (ALK) close the system. For given $pCO_2$ and ALK, DIC and pH are solved iteratively. Ocean pH has fallen from ~8.2 to ~8.1 since industrialization — a 30% increase in acidity ($[H^+]$). As pH decreases and carbonate ion $[CO_3^{2-}]$ decreases, $R_f$ increases, progressively limiting future uptake.

## Terrestrial carbon: NPP, respiration, and soil carbon

Net primary productivity (NPP) is the carbon fixed by photosynthesis minus plant respiration:

$$NPP = GPP - R_{auto}$$

NPP responds to atmospheric CO₂ (CO₂ fertilization) and temperature. A simple NPP model:

$$NPP(C_{atm}, T) = NPP_0\left(1 + \beta_L\ln\frac{C_{atm}}{C_0}\right)\cdot f(T)$$

where $\beta_L \approx 0.2$–0.4 is the terrestrial carbon sensitivity. Soil carbon decomposition:

$$R_{het} = k_s S \cdot Q_{10}^{(T-T_{ref})/10}$$

where $Q_{10} \approx 2$ (decomposition doubles per 10°C warming) and $S$ is soil carbon stock. Net ecosystem production (NEP) = NPP $- R_{het}$; currently NEP $> 0$ (land is a net sink of ~3 PgC yr⁻¹).

## Airborne fraction and IPCC emission scenarios

The **airborne fraction** (AF) is the fraction of cumulative emissions remaining in the atmosphere:

$$AF = \frac{\Delta C_{atm}}{\int E\,dt}$$

Currently AF $\approx 0.44$ (oceans and land absorb ~56%). Remarkably, AF has been nearly constant at ~0.44 over 1960–2020 despite tripling emissions, implying sinks scale proportionally. Whether AF rises (weaker sinks) or falls (stronger sinks) is a key uncertainty.

IPCC AR6 uses **Shared Socioeconomic Pathways (SSPs)**:

| Scenario | 2100 CO₂ (ppm) | Warming (°C) |
|---------|---------------|-------------|
| SSP1-1.9 | ~400 | 1.0–1.8 |
| SSP2-4.5 | ~600 | 2.1–3.5 |
| SSP3-7.0 | ~900 | 2.8–4.6 |
| SSP5-8.5 | ~1135 | 3.3–5.7 |

The numbers (1.9, 4.5, etc.) refer to the 2100 ERF in W m⁻².

## Carbon-cycle feedback parameters β and γ

The IPCC carbon-cycle feedback framework decomposes the land/ocean sink sensitivity into two parameters:

**β (carbon-concentration feedback):** how much the sink increases per unit increase in atmospheric CO₂ at constant temperature:

$$\beta = \frac{\partial C_{land+ocean}}{\partial C_{atm}}\bigg|_T \quad [\text{PgC ppm}^{-1}]$$

**γ (carbon-climate feedback):** how much the sink decreases per unit warming at constant CO₂:

$$\gamma = \frac{\partial C_{land+ocean}}{\partial T}\bigg|_{C_{atm}} \quad [\text{PgC K}^{-1}]$$

Typical CMIP6 values: $\beta_{land} \approx 0.9$ PgC ppm⁻¹, $\beta_{ocean} \approx 0.8$ PgC ppm⁻¹, $\gamma_{land} \approx -50$ PgC K⁻¹ (strong negative — warming releases soil carbon), $\gamma_{ocean} \approx -8$ PgC K⁻¹ (warming reduces solubility). The net effect of $\gamma$ is a **positive feedback**: warming weakens sinks, leaving more CO₂ in the atmosphere, amplifying warming further. The **climate-carbon gain** is:

$$g = \frac{-\gamma \lambda_{ECS}}{\text{airborne fraction sensitivity}} > 0$$

Models project 20–200 additional PgC released from permafrost thaw by 2100 — a major but uncertain positive feedback.
