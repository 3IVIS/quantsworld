---
title: "Geodesy"
field: geophysics
description: Reference ellipsoids, geoid undulations, GPS trilateration, and InSAR measure Earth's shape, gravity field, and crustal deformation.
intro: >
  Geodesy is the science of precisely measuring Earth's shape, orientation in space, and gravity field. Modern satellite geodesy — GPS, GRACE, and InSAR — achieves millimetre-level precision, enabling the detection of tectonic strain accumulation, post-glacial rebound, and groundwater depletion from space.
math_concepts:
  - differential-geometry
  - linear-algebra
  - optimization
  - numerical-methods
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## Reference Ellipsoid and Geoid

Earth's shape is approximated by a reference ellipsoid defined by its semi-major axis $a$ and flattening $f = (a-b)/a$. The GRS80 ellipsoid has $a = 6{,}378{,}137.0$ m, $f = 1/298.257$. The geoid is the equipotential surface of Earth's gravity field that best fits mean sea level; it undulates by up to $\pm100$ m relative to the ellipsoid. The geoid undulation $N$ relates ellipsoidal height $h$ to orthometric height $H$ by

$$h = H + N$$

Stokes' formula computes $N$ by integrating free-air gravity anomalies $\Delta g$ over the sphere:

$$N = \frac{R}{4\pi g_0}\iint \Delta g\, S(\psi)\, d\sigma$$

where $S(\psi)$ is the Stokes kernel depending on the angular separation $\psi$.

## GPS Trilateration

GPS positioning exploits pseudorange observations $\rho_i = r_i + c(\delta t_r - \delta t_i) + \epsilon$, where $r_i$ is the geometric range to satellite $i$, $c$ is the speed of light, and $\delta t_r$, $\delta t_i$ are receiver and satellite clock errors. With four or more satellites the nonlinear system is linearised around an initial position and solved iteratively using least squares. Precise point positioning (PPP) achieves $\sim$1 cm horizontal accuracy using orbit and clock products from the IGS network.

## InSAR and GRACE

Interferometric SAR (InSAR) measures the phase difference between two SAR acquisitions to detect surface displacement along the radar line of sight with $\sim$1 cm precision. The interferometric phase $\Delta\phi = \frac{4\pi}{\lambda}\Delta r$ where $\Delta r$ is the displacement component and $\lambda$ the radar wavelength. GRACE satellite gravimetry tracks inter-satellite range-rate perturbations $\dot{\rho}$ using microwave ranging; monthly gravity field solutions reveal mass redistribution from ice loss, hydrology, and ocean circulation at spatial scales $\geq 300$ km.
