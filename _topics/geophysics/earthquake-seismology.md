---
title: "Earthquake Seismology"
field: geophysics
description: Moment tensors, seismic moment, and the Gutenberg-Richter law characterise earthquake sources and their statistical recurrence.
intro: >
  Earthquake seismology quantifies faulting processes by analysing the seismic radiation pattern, the strength of rupture through the seismic moment, and the statistical distribution of earthquake sizes. The moment tensor provides the most complete linear source description, while empirical relations such as the Gutenberg-Richter law reveal the self-similar nature of seismicity.
math_concepts:
  - probability-theory
  - linear-algebra
  - spectral-analysis
  - differential-equations
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Seismic Moment and Moment Tensor

The scalar seismic moment quantifies rupture size:

$$M_0 = \mu\, A\, D$$

where $\mu$ is the shear modulus of the source region, $A$ is the rupture area, and $D$ is the average slip. The moment magnitude is $M_w = \tfrac{2}{3}\log_{10}(M_0) - 6.07$.

The full source is described by the symmetric, traceless moment tensor $\mathbf{M}$ (a $3\times 3$ matrix). Its eigendecomposition separates the double-couple (shear faulting), CLVD (compensated linear vector dipole), and isotropic (volume change) components. The far-field displacement from a double-couple source in direction $\hat{\mathbf{r}}$ is

$$u_i^P(\mathbf{x}, t) = \frac{1}{4\pi\rho v_P^3 r} \mathcal{R}_P^{ij} \dot{M}_{ij}(t - r/v_P)$$

where $\mathcal{R}_P^{ij}$ is the P-wave radiation pattern factor.

## Focal Mechanisms

The beach-ball diagram projects the P- and T-axis orientations onto the focal sphere, dividing it into quadrants of compression and dilatation. The strike $\phi$, dip $\delta$, and rake $\lambda$ of the fault plane are recovered from the two nodal planes that separate these quadrants. Moment tensor inversion from waveform data uniquely determines $\mathbf{M}$ and hence the focal mechanism.

## Gutenberg-Richter Recurrence

The frequency–magnitude distribution of earthquakes in any region follows

$$\log_{10} N(M) = a - bM$$

where $N(M)$ is the cumulative number of earthquakes with magnitude $\geq M$, the $b$-value is typically close to 1, and $a$ describes regional seismicity rate. This power-law implies that $N$ scales as $M_0^{-2b/3}$, reflecting the self-similar geometry of fault networks. Deviations from $b = 1$ signal stress heterogeneity or fluid pore-pressure changes.
