---
title: "Lotka-Volterra Equations"
field: quant-ecology
description: A foundational system of nonlinear ODEs describing predator-prey population dynamics and their oscillatory coexistence.
intro: >
  The Lotka-Volterra equations, independently derived by Alfred Lotka (1925) and Vito Volterra (1926), describe the coupled dynamics of prey and predator populations through a pair of nonlinear ordinary differential equations. The system predicts neutrally stable oscillations around a coexistence equilibrium, a result that depends critically on the conservative structure of the equations. Extensions such as the Rosenzweig-MacArthur model introduce ecological realism by incorporating logistic prey growth and saturating functional responses.
math_concepts:
  - differential-equations
  - dynamical-systems
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## The Classical Predator-Prey System

Let $x(t)$ denote prey population density and $y(t)$ predator population density. The Lotka-Volterra (LV) system is:

$$\dot{x} = ax - bxy$$

$$\dot{y} = cxy - dy$$

The parameters have direct ecological meaning:

| Parameter | Ecological Interpretation | Typical Units |
|-----------|--------------------------|---------------|
| $a$ | Intrinsic prey growth rate | $\text{time}^{-1}$ |
| $b$ | Predation rate (prey removal per predator) | $\text{predator}^{-1}\text{time}^{-1}$ |
| $c$ | Predator conversion efficiency times predation rate | $\text{prey}^{-1}\text{time}^{-1}$ |
| $d$ | Predator death rate | $\text{time}^{-1}$ |

All parameters are strictly positive. The term $bxy$ represents predation events removing prey, while $cxy$ represents new predators produced from consumed prey. The ratio $c/b$ is the trophic conversion efficiency, typically between 0.05 and 0.2 in real systems.

## Equilibria and Linear Stability Analysis

The system has two equilibria. Setting $\dot{x} = \dot{y} = 0$:

**Trivial equilibrium:** $E_0 = (0, 0)$ — extinction of both species.

**Coexistence equilibrium:** $E^* = (d/c,\ a/b)$.

The Jacobian matrix of the system evaluated at a general point $(x, y)$ is:

$$J = \begin{pmatrix} a - by & -bx \\ cy & cx - d \end{pmatrix}$$

At the coexistence equilibrium $E^* = (d/c, a/b)$:

$$J^* = \begin{pmatrix} 0 & -bd/c \\ ca/b & 0 \end{pmatrix}$$

The characteristic polynomial is:

$$\lambda^2 - \text{tr}(J^*)\lambda + \det(J^*) = 0$$

$$\lambda^2 + ad = 0 \implies \lambda = \pm i\sqrt{ad}$$

Pure imaginary eigenvalues indicate a **center** in linear analysis — neither stable nor unstable. The coexistence point is a neutrally stable equilibrium, and orbits in its vicinity are closed curves.

At $E_0 = (0,0)$, $J = \text{diag}(a, -d)$, giving one positive and one negative eigenvalue — a saddle point. The origin is unstable to prey invasion.

## Conservation Law and Closed Orbits

The classical LV system is **conservative**: it possesses a first integral (conserved quantity) that prevents trajectories from spiraling inward or outward. Dividing the two equations:

$$\frac{dy}{dx} = \frac{y(cx - d)}{x(a - by)}$$

Separating variables and integrating:

$$\int \frac{a - by}{y}\,dy = \int \frac{cx - d}{x}\,dx$$

$$a\ln y - by = cx - d\ln x + C_0$$

This gives the conserved quantity:

$$V(x, y) = cx - d\ln x + by - a\ln y = \text{constant}$$

Every trajectory lies on a level curve of $V$, forming a family of closed orbits around $E^*$. The system is **not asymptotically stable**: perturbations shift the population to a different closed orbit rather than returning to $E^*$. This structural fragility is ecologically unrealistic and motivates more refined models.

## Phase Portrait and Time Series

The phase plane portrait shows nested closed orbits. Moving counterclockwise (for standard parameter ordering):

1. When prey are abundant and predators are scarce, predators increase.
2. High predator density drives prey down.
3. Low prey causes predator starvation and decline.
4. With few predators, prey recover.

The time series of both populations are periodic with the **same period** but offset in phase:

$$T = \frac{2\pi}{\sqrt{ad}}$$

Prey peak **before** predator peak, with a phase lag of approximately $T/4$. The amplitude of oscillation depends on initial conditions — unlike a true limit cycle, there is no preferred amplitude.

A practical consequence: computing the time-average of each population over one full cycle gives:

$$\langle x \rangle = \frac{d}{c} = x^*, \qquad \langle y \rangle = \frac{a}{b} = y^*$$

The temporal means equal the equilibrium values regardless of orbit size (Volterra's theorem).

## Rosenzweig-MacArthur Model

The classical LV model is biologically criticized for two assumptions: prey grow exponentially without bound, and predators have a linear functional response. The Rosenzweig-MacArthur (RM) model corrects both:

$$\dot{x} = rx\!\left(1 - \frac{x}{K}\right) - \frac{\alpha xy}{1 + \alpha h x}$$

$$\dot{y} = \frac{e\alpha xy}{1 + \alpha h x} - dy$$

Here $K$ is prey carrying capacity, $\alpha$ is the attack rate, $h$ is handling time (Holling Type II functional response), and $e$ is conversion efficiency. The functional response saturates at $\alpha/(h\alpha) = 1/h$ prey per predator per unit time.

The coexistence equilibrium is now:

$$x^* = \frac{d}{e\alpha - dh}, \qquad y^* = \frac{r(1 - x^*/K)(1 + \alpha h x^*)}{\alpha}$$

The Jacobian at $E^*$ can have negative trace, making $E^*$ a stable spiral (damped oscillations) or, with a Hopf bifurcation, an unstable spiral surrounded by a stable limit cycle.

**Paradox of enrichment** (Rosenzweig 1971): Increasing $K$ (enriching the prey's environment) destabilizes the coexistence equilibrium through a Hopf bifurcation at:

$$K_{\text{Hopf}} = \frac{x^*(2 + \alpha h x^*)}{1 - \alpha h x^*}$$

For $K > K_{\text{Hopf}}$, the system transitions from a stable spiral to sustained limit cycle oscillations of increasing amplitude, eventually leading to extinction via stochastic events when population dips become small. This counterintuitive result — more productivity leads to instability — has been empirically observed in enriched laboratory microcosms (Luckinbill 1973).

## Real Data and Parameter Estimation

The Hudson's Bay Company lynx-hare pelt records (1845–1935) provide one of ecology's most famous time series, showing approximate 10-year cycles. Fitting the LV model to these data reveals:

- Hare period: $\approx 9$–11 years
- Lynx peak lags hare peak by $\approx 1$–2 years

However, detailed analysis shows the hare cycle is driven partly by vegetation overexploitation (trophic cascade), not purely predation, and the RM model with explicit plant dynamics provides a better fit.

Parameter estimation proceeds by nonlinear least squares or maximum likelihood. Given discrete observations $(x_i, y_i)$ at times $t_i$, one minimizes:

$$\mathcal{L}(\theta) = \sum_i \left[\left(\frac{x_i^{\text{obs}} - x_i^{\text{pred}}}{\sigma_x}\right)^2 + \left(\frac{y_i^{\text{obs}} - y_i^{\text{pred}}}{\sigma_y}\right)^2\right]$$

where $x_i^{\text{pred}}, y_i^{\text{pred}}$ are obtained by numerical integration of the ODE system with parameter vector $\theta = (a, b, c, d)$. Identifiability requires time series with at least one full oscillation cycle; partial cycles lead to poorly constrained parameter estimates.
