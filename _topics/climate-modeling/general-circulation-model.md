---
title: "General Circulation Models"
field: climate-modeling
description: Full three-dimensional models of Earth's climate system based on the primitive equations of atmospheric and oceanic fluid dynamics.
intro: >
  General circulation models (GCMs) solve the fluid-dynamical primitive
  equations on a rotating sphere, coupled to ocean, land, and sea-ice
  components. They are the primary tool for climate projection, but their
  complexity demands sophisticated numerical methods, parameterization schemes,
  and ensemble strategies to quantify uncertainty.
math_concepts:
  - partial-differential-equations
  - numerical-methods
  - spectral-analysis
difficulty: expert
difficulty_level: 5
read_time: 14
---

## Primitive equations on a rotating sphere

The atmospheric primitive equations are the Navier-Stokes equations under the hydrostatic and thin-shell approximations. In pressure coordinates $(x, y, p)$:

**Horizontal momentum:**
$$\frac{Du}{Dt} - fv = -\frac{1}{a\cos\phi}\frac{\partial\Phi}{\partial\lambda} + F_u$$

$$\frac{Dv}{Dt} + fu = -\frac{1}{a}\frac{\partial\Phi}{\partial\phi} + F_v$$

**Hydrostatic balance:**
$$\frac{\partial\Phi}{\partial p} = -\frac{RT}{p} = -\alpha$$

**Continuity:**
$$\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial\omega}{\partial p} = 0$$

**Thermodynamic energy:**
$$\frac{DT}{Dt} - \frac{\kappa T\omega}{p} = \frac{Q}{c_p}$$

where $f = 2\Omega\sin\phi$ is the Coriolis parameter, $\Phi = gz$ is geopotential, $\omega = Dp/Dt$ is vertical pressure velocity, $\kappa = R/c_p \approx 2/7$, and $Q$ is diabatic heating. The material derivative is:

$$\frac{D}{Dt} = \frac{\partial}{\partial t} + \frac{u}{a\cos\phi}\frac{\partial}{\partial\lambda} + \frac{v}{a}\frac{\partial}{\partial\phi} + \omega\frac{\partial}{\partial p}$$

## Spectral vs finite-difference discretization

**Spectral transform method:** Express fields in spherical harmonics $Y_n^m(\lambda, \phi)$:

$$T(\lambda,\phi,p,t) = \sum_{n=0}^{N}\sum_{m=-n}^{n} \hat{T}_n^m(p,t)\,Y_n^m(\lambda,\phi)$$

where $N$ is the truncation wavenumber (e.g., T85 $\Leftrightarrow$ $N = 85$, ~1.4° resolution). The spherical harmonics satisfy:

$$\nabla^2 Y_n^m = -\frac{n(n+1)}{a^2}Y_n^m$$

so the Laplacian is exact in spectral space, enabling efficient diffusion. Transforms between spectral and grid space cost $O(N^3)$ per level; the FFT reduces the longitudinal part to $O(N^2 \log N)$.

**Finite-difference / finite-volume:** Arakawa staggered grids (A through E) conserve different quantities. The **C-grid** (used by NEMO ocean model) staggers $u$, $v$, and tracers at separate points, ensuring local discrete conservation of mass and energy.

| Method | Pros | Cons |
|--------|------|------|
| Spectral | Exact spatial derivatives, no numerical diffusion | Gibbs ringing near discontinuities, global communication |
| Finite difference | Local, flexible grids | Truncation error, requires explicit diffusion |
| Finite volume | Conservation guaranteed | More complex implementation |
| Cubed-sphere | Avoids polar singularity | Grid-scale noise at cube edges |

## Parameterization schemes

Processes below the grid scale (~10–100 km) must be **parameterized** — represented as functions of resolved variables.

**Convective parameterization (Arakawa-Schubert):** A spectrum of entraining updraft plumes with mass flux $M_u$. Closure: work function $A_k$ (cloud work function) is relaxed to a quasi-equilibrium:

$$\frac{dA_k}{dt} = \sum_j K_{kj}\eta_j + F_k^{large-scale} = 0$$

where $\eta_j$ is the mass flux of cloud type $j$ and $K_{kj}$ is the kernel matrix.

**Boundary layer (K-diffusion):** Turbulent fluxes parameterized with eddy diffusivity $K_h$:

$$\overline{w'T'} = -K_h\frac{\partial\bar{T}}{\partial z}$$

$K_h$ depends on the Richardson number $Ri = N^2/(\partial u/\partial z)^2$ where $N^2 = g\partial\ln\theta/\partial z$ is the Brunt-Väisälä frequency.

**Cloud microphysics:** Single-moment bulk schemes prognose total condensate; double-moment schemes prognose both mass mixing ratio $q_x$ and number concentration $N_x$, improving precipitation and aerosol interactions.

## Grid resolution and computational cost

GCM computational cost scales steeply with resolution. For an atmosphere model with $N_\lambda \times N_\phi \times L$ horizontal-vertical grid and timestep $\Delta t$:

- Grid points $\propto N^2 L$ (doubling horizontal resolution quadruples points)
- CFL stability: $\Delta t \le \Delta x/c_{max}$ (halving resolution halves timestep)
- Total cost $\propto N^3 L$ (8× more compute per doubling)

Modern CMIP6-era models run at ~50–100 km atmosphere resolution. HighResMIP experiments at 25 km cost ~16× more per simulated year than 100 km.

| Resolution | ~Grid spacing | Relative cost |
|-----------|--------------|--------------|
| Low (T42) | 2.8° ≈ 300 km | 1× |
| Standard (T85) | 1.4° ≈ 150 km | 8× |
| High (T170) | 0.7° ≈ 75 km | 64× |

## Coupled ocean-atmosphere models and CMIP hierarchy

A coupled GCM (CGCM) links atmosphere, ocean, sea ice, and land components through a flux coupler exchanging heat, momentum, freshwater, and CO₂ fluxes at each timestep. The ocean component (e.g., MOM6, NEMO) solves the Boussinesq primitive equations with an additional equation for salinity.

**CMIP model hierarchy** (CMIP6):

| Model type | Components | Purpose |
|-----------|-----------|---------|
| AMIP | Atm + land, prescribed SST | Isolate atmospheric response |
| AOGCM | Atm + Ocean + Sea Ice | Standard climate projection |
| ESM | + Carbon cycle, chemistry | Biogeochemical feedbacks |
| HighResMIP | ~25 km AOGCM | Resolution dependence |

**Flux adjustment** was historically applied to prevent climate drift in coupled models; modern models generally run without it due to improved physics.

## Ensemble spread and emergent constraints

Running multiple GCMs (multi-model ensemble, MME) or perturbed parameter ensembles (PPE) quantifies model uncertainty. The **CMIP6 ensemble** contains ~50 models from ~20 centers. Ensemble spread in ECS ranges from 1.8 to 5.6°C — much wider than the assessed likely range.

**Emergent constraints** exploit correlations between an observable present-day metric $x$ (e.g., tropical low-cloud fraction) and a future response $y$ (e.g., ECS) across models. Given the observational value $x_{obs} \pm \sigma_{obs}$:

$$p(y | x_{obs}) \propto p(x_{obs} | y)\,p(y)$$

Under Gaussian assumptions with regression slope $\beta$ and intercept $\gamma$:

$$\hat{y} = \gamma + \beta x_{obs}, \quad \sigma_y^2 = \sigma_{resid}^2 + \beta^2\sigma_{obs}^2$$

Multiple proposed constraints (Klein & Hall 2015; Sherwood et al. 2014; Zelinka et al.) suggest the ECS lower bound is above 2.5°C, consistent with the AR6 likely range of 2.5–4.0°C.
