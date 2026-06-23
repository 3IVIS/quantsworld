---
title: "Ocean Circulation"
field: climate-modeling
description: The physical dynamics of large-scale ocean flow, from geostrophic balance and wind-driven gyres to the thermohaline circulation and ENSO variability.
intro: >
  The ocean transports roughly 1.3 PW of heat poleward, sequesters anthropogenic
  CO₂, and drives climate variability on interannual to millennial timescales.
  Its dynamics arise from the interplay of wind stress, buoyancy forcing,
  the Coriolis effect, and the equation of state of seawater.
math_concepts:
  - partial-differential-equations
  - dynamical-systems
  - differential-equations
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Geostrophic balance and thermal wind

In the large-scale ocean, the Rossby number $Ro = U/fL \ll 1$ and the Ekman number $Ek = \nu/fH^2 \ll 1$, so the dominant force balance is **geostrophic**:

$$f\hat{k}\times\mathbf{u}_g = -\frac{1}{\rho_0}\nabla p$$

In component form:

$$-fv = -\frac{1}{\rho_0}\frac{\partial p}{\partial x}, \qquad fu = -\frac{1}{\rho_0}\frac{\partial p}{\partial y}$$

Differentiating geostrophy with respect to depth and using the hydrostatic relation $\partial p/\partial z = -\rho g$ gives the **thermal wind balance**:

$$f\frac{\partial\mathbf{u}_g}{\partial z} = \frac{g}{\rho_0}\hat{k}\times\nabla\rho$$

This links vertical shear of horizontal currents to horizontal density gradients. Strong horizontal temperature gradients (e.g., Gulf Stream) produce powerful deep shear.

## Sverdrup balance and wind-driven gyres

Depth-integrating the vorticity equation, the interior ocean satisfies **Sverdrup balance**:

$$\beta V = \frac{1}{\rho_0}\hat{k}\cdot\nabla\times\boldsymbol{\tau}_s$$

where $\beta = \partial f/\partial y = 2\Omega\cos\phi/a$, $V = \int_{-H}^0 v\,dz$ is the meridional transport, and $\boldsymbol{\tau}_s$ is wind stress. The curl of the trade winds and westerlies drives subtropical gyres. For the North Atlantic:

$$V = \frac{1}{\rho_0\beta}\left(\frac{\partial\tau^y}{\partial x} - \frac{\partial\tau^x}{\partial y}\right)$$

The western boundary current (Gulf Stream) closes the gyre. Its narrow, intense character is explained by the **Stommel model** including bottom friction, which breaks the east-west symmetry via the $\beta$-plane effect. The western intensification transport scales as:

$$U_{WBC} \sim \frac{\tau_0 L}{\rho_0\beta\delta^2}$$

where $\delta \sim r/\beta$ is the western boundary layer width and $r$ is the bottom friction coefficient.

## Thermohaline circulation (AMOC)

The **Atlantic Meridional Overturning Circulation (AMOC)** is driven by surface buoyancy loss in the North Atlantic and Nordic Seas. Dense water sinks (deep convection), forming North Atlantic Deep Water (NADW), which spreads through the deep ocean.

A two-box model (Stommel 1961) captures the thermohaline instability. Let $T_1, S_1$ (equatorial) and $T_2, S_2$ (polar) be temperature and salinity. Overturning $q$:

$$q = k(\alpha(T_1-T_2) - \beta_S(S_1-S_2))$$

where $\alpha \approx 2\times10^{-4}$ K⁻¹, $\beta_S \approx 7.6\times10^{-4}$ psu⁻¹. The sign of $q$ determines circulation direction. **Multiple equilibria** exist:

- **On state** ($q > 0$): temperature-driven, warm salty water flows north, cools, sinks — present-day Atlantic
- **Off state** ($q < 0$): salinity-driven reverse cell or collapsed circulation

The stability boundary in forcing space shows **hysteresis**: AMOC can collapse irreversibly if freshwater input exceeds a threshold (hosing experiments). Proxy evidence (Pa/Th ratios, sortable silt) indicates the AMOC weakened by 15–50% at the Last Glacial Maximum and during Heinrich events.

## ENSO: coupled ocean-atmosphere oscillation

El Niño–Southern Oscillation (ENSO) is the dominant mode of interannual climate variability. The coupled system involves:

- **Bjerknes feedback:** warm SST in east Pacific $\Rightarrow$ weakened trade winds $\Rightarrow$ reduced upwelling $\Rightarrow$ further warming (positive feedback)
- **Delayed oscillator:** thermocline anomalies propagate as Kelvin and Rossby waves; reflected Rossby waves provide delayed negative feedback

The **Zebiak-Cane delayed oscillator** equation:

$$\frac{dT_E}{dt} = aT_E - bT_E(t-\tau)$$

where $T_E$ is eastern Pacific SST anomaly, $a > 0$ is the Bjerknes growth rate, $b > 0$ is the delayed negative feedback, and $\tau \approx 6$–12 months is the basin crossing time. For $a\tau < \pi/2$ and $b > a$, solutions oscillate with period:

$$P \approx \frac{4\tau}{\pi}\sqrt{b/a}$$

giving the observed ~2–7 year ENSO period. The recharge oscillator (Jin 1997) provides an alternative formulation tracking thermocline depth $h$ and SST:

$$\frac{dT_E}{dt} = aT_E + \gamma h, \qquad \frac{dh}{dt} = -\epsilon h - \alpha T_E$$

## Ocean heat uptake and sea level rise

The ocean has absorbed ~90% of the excess heat from anthropogenic greenhouse forcing since 1971. Ocean heat content (OHC) change:

$$\frac{d(OHC)}{dt} = N \cdot A_{ocean}$$

where $N \approx 0.79$ W m⁻² is the current planetary energy imbalance and $A_{ocean} = 3.6\times10^{14}$ m². The ocean's large heat capacity introduces a lag between forcing and surface temperature response.

**Sea level rise** has two main components: thermal expansion (steric) and ice melt (barystatic). The steric component:

$$\Delta SL_{steric} = -\int_0^H \frac{\Delta\rho}{\rho_0}\,dz \approx \alpha_{T}\int_0^H \Delta T\,dz$$

with $\alpha_T \approx 2\times10^{-4}$ K⁻¹. Globally averaged, 1°C of warming through 700 m adds ~50 mm of steric sea level rise. Current sea level rise is ~3.7 mm yr⁻¹ (2006–2018 average); glaciers and ice sheets now dominate the budget over thermal expansion.

## Abyssal circulation and carbon sequestration

The **abyssal circulation** (Antarctic Bottom Water, AABW) connects the deep ocean basins on millennial timescales. Upwelling in the Southern Ocean (wind-driven) closes the global loop. The overturning streamfunction in density coordinates:

$$\frac{\partial\psi}{\partial\rho} = \int \frac{F_\rho}{|G_\rho|}\,dA$$

where $F_\rho$ is surface buoyancy flux and $G_\rho$ is interior diapycnal mixing. The deep ocean stores ~38,000 PgC as dissolved inorganic carbon — 50× the atmospheric inventory. Carbon export via the **biological pump** (sinking organic matter) maintains the deep-surface gradient of ~200 μmol kg⁻¹. A warming, stratifying ocean could weaken this pump by reducing nutrient supply to the sunlit zone, potentially converting the ocean to a weaker carbon sink.
