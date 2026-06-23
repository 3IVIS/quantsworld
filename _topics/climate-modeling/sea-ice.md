---
title: "Sea Ice Modeling"
field: climate-modeling
description: Thermodynamic and dynamic modeling of sea ice, including the Stefan freezing condition, viscous-plastic rheology, and Arctic decline under climate change.
intro: >
  Sea ice is both a sensitive indicator and an active driver of polar climate
  change. Its high albedo and insulating properties couple strongly to the
  atmosphere and ocean; models must capture the thermodynamics of growth and
  melt, the complex mechanics of ice deformation, and feedbacks that produce
  Arctic amplification and potentially irreversible decline.
math_concepts:
  - partial-differential-equations
  - differential-equations
  - dynamical-systems
difficulty: advanced
difficulty_level: 4
read_time: 11
---

## Sea ice thermodynamics: the Stefan condition

Sea ice grows at the ice-ocean interface when the ocean heat flux is less than the conductive heat flux through the ice. The **Stefan condition** governs ice thickness $h$:

$$\rho_i L \frac{dh}{dt} = F_{cond} - F_{ocean}$$

where $\rho_i = 917$ kg m⁻³ is ice density, $L = 3.34\times10^5$ J kg⁻¹ is latent heat of fusion. The conductive flux through ice of thermal conductivity $k_i = 2.0$ W m⁻¹ K⁻¹:

$$F_{cond} = k_i\frac{T_f - T_s}{h}$$

where $T_f = -1.8°C$ is the freezing point and $T_s$ is the ice surface temperature (determined by energy balance at the top surface). Integrating the growth equation from rest ($h(0) = 0$) gives the **Stefan law** for ice growth in a simple freeze-down:

$$h(t) = \sqrt{\frac{2k_i}{\rho_i L}|T_f - T_{air}|t} \propto \sqrt{t}$$

This square-root growth law reflects the insulating effect of thicker ice — thicker ice has lower conductive flux, slowing further growth. Ocean heat flux $F_{ocean}$ from turbulent mixing opposes freezing; in the Arctic Ocean $F_{ocean} \approx 2$–5 W m⁻².

## Surface energy balance at the top of ice

At the ice surface, the energy balance determines $T_s$:

$$F_{sw}(1-\alpha) + F_{lw} - \sigma T_s^4 - F_{turb} - F_{cond} = 0$$

Surface albedo is critical:
- Fresh snow: $\alpha \approx 0.85$
- Melting snow: $\alpha \approx 0.70$–0.75
- Bare multiyear ice: $\alpha \approx 0.50$–0.60
- Melt ponds: $\alpha \approx 0.20$–0.40
- Open ocean: $\alpha \approx 0.06$

Melt ponds form on first-year ice in spring and dramatically lower the area-averaged albedo, accelerating melt — a powerful positive feedback on the 1–10 km scale.

## Ice-albedo feedback and the tipping point question

The **ice-albedo feedback** is the dominant driver of Arctic amplification. As sea ice retreats, dark ocean absorbs more shortwave radiation, warming the ocean, which melts more ice. The feedback parameter:

$$\lambda_{ia} = \frac{\partial F_{net}}{\partial T} = \frac{S_0}{4}\frac{\partial \bar\alpha}{\partial A_{ice}}\frac{\partial A_{ice}}{\partial T} > 0$$

The debate over a **sea ice tipping point** centers on whether the summer ice minimum can disappear abruptly or gradually. GCM evidence suggests summer sea ice loss is **reversible** and approximately linear with global temperature — no tipping point — but the September ice minimum is extremely sensitive: ~3 m² per tonne of CO₂ emitted.

## Sea ice dynamics: viscous-plastic rheology

Sea ice is not passive — it deforms under wind and ocean currents. The **momentum equation** for sea ice:

$$m\frac{D\mathbf{u}}{Dt} = \boldsymbol{\tau}_{air} + \boldsymbol{\tau}_{ocean} - mf\hat{k}\times\mathbf{u} - mg\nabla\eta + \nabla\cdot\boldsymbol{\sigma}$$

where $\boldsymbol{\sigma}$ is the internal ice stress tensor, $\boldsymbol{\tau}_{air}$ and $\boldsymbol{\tau}_{ocean}$ are surface drags, $f$ is the Coriolis parameter, and $\eta$ is sea surface height. The **viscous-plastic (VP) rheology** (Hibler 1979) relates stress to strain rate via a yield curve. For strain rates $\dot{\boldsymbol{\varepsilon}}$ below the yield stress, ice behaves as a viscous fluid; at the yield surface it flows plastically:

$$\boldsymbol{\sigma} = 2\eta\dot{\boldsymbol{\varepsilon}} + (\zeta - \eta)\dot{\varepsilon}_{kk}\mathbf{I} - \frac{P}{2}\mathbf{I}$$

with $\eta$ (shear viscosity) and $\zeta$ (bulk viscosity) determined by the ice pressure $P$ and strain rate magnitude. The **elliptical yield curve** defines the transition from elastic to plastic flow. The **elastic-viscous-plastic (EVP)** scheme (Hunke & Dukowicz 1997) replaces the computationally expensive implicit VP solver with subcycling over a pseudo-elastic relaxation, enabling efficient parallelization.

## Arctic sea ice trends and multi-year vs first-year ice

Arctic September sea ice extent has declined at ~13% per decade since 1979 (NSIDC satellite records). Ice volume has declined even faster due to thinning:

| Period | September extent (10⁶ km²) | Mean thickness (m) |
|--------|--------------------------|-------------------|
| 1980s | ~7.0 | ~3.5 |
| 2000s | ~5.5 | ~2.0 |
| 2012 record low | 3.34 | ~1.5 |
| 2020s average | ~4.5 | ~1.3 |

The shift from **multi-year ice** (MYI, survived at least one melt season, thick, low salinity, high albedo) to **first-year ice** (FYI, thinner, saltier, lower albedo) represents a structural change. MYI fraction declined from ~75% in the 1980s to ~30% by 2020. First-year ice is more prone to complete summer melt, further accelerating the transition.

## Ice-free Arctic projections

All CMIP6 models project an ice-free Arctic summer (September extent $< 10^6$ km²) before 2100 under SSP2-4.5 and higher. The threshold for ice-free conditions scales with cumulative CO₂ emissions:

$$A_{Sept} \approx A_0 - \beta \cdot \Delta T_{global}$$

with $\beta \approx 3\times10^6$ km² K⁻¹. Ice-free conditions likely occur when global warming exceeds ~2°C above pre-industrial. Under SSP1-1.9, the ice-free period may be brief and reversed. The Bering Sea shows strong interannual variability, driven by atmospheric blocking (dipole anomaly pattern) that can shift September extent by ~1–2 million km² year-to-year. The **Beaufort Gyre** stores freshwater that, when released, could influence AMOC stability on decadal timescales — an ocean-ice-thermohaline coupling that is poorly constrained in models.
