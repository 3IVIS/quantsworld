---
title: "Logistic Population Growth"
field: quant-ecology
description: The logistic equation models density-dependent population growth toward a carrying capacity, with rich extensions including chaos, Allee effects, and generalized forms.
intro: >
  Population growth cannot be exponential indefinitely — intraspecific competition for resources eventually limits growth as density rises. The logistic model, introduced by Pierre-François Verhulst in 1838, captures this by adding a density-dependent brake to the Malthusian exponential. The model produces an S-shaped (sigmoidal) growth curve that has become the cornerstone of population ecology, with extensions revealing surprising complexity including chaos in discrete-time variants.
math_concepts:
  - differential-equations
  - dynamical-systems
  - probability-theory
difficulty: beginner
difficulty_level: 2
read_time: 10
---

## Malthusian Exponential Growth

The simplest population model assumes each individual contributes equally to reproduction regardless of density. With $N(t)$ as population size and $r$ as the intrinsic rate of natural increase:

$$\dot{N} = rN$$

This is the **Malthusian growth equation**. The solution is:

$$N(t) = N_0 e^{rt}$$

where $N_0 = N(0)$ is the initial population size. The parameter $r = b - d$ is the difference between per capita birth rate $b$ and death rate $d$.

When $r > 0$, the population grows without bound — clearly unrealistic. Real populations are bounded by food, space, disease, and predation. The per capita growth rate $\dot{N}/N = r$ is constant, independent of $N$, which is the key unrealistic assumption.

## The Logistic Equation

Verhulst added the simplest possible density dependence: the per capita growth rate declines linearly with $N$, reaching zero at the **carrying capacity** $K$:

$$\frac{\dot{N}}{N} = r\!\left(1 - \frac{N}{K}\right)$$

This gives the **logistic differential equation**:

$$\dot{N} = rN\!\left(1 - \frac{N}{K}\right)$$

The term $(1 - N/K)$ acts as a braking factor. When $N \ll K$, growth is approximately exponential. When $N \to K$, $\dot{N} \to 0$. When $N > K$, $\dot{N} < 0$ and the population declines.

The equilibria are $N^* = 0$ (unstable) and $N^* = K$ (stable). Stability follows from $d\dot{N}/dN = r(1 - 2N/K)$, which equals $r > 0$ at $N=0$ and $-r < 0$ at $N=K$.

## Analytical Solution

The logistic ODE is separable. Rewriting:

$$\frac{dN}{N(1 - N/K)} = r\,dt$$

Using partial fractions:

$$\frac{1}{N(1 - N/K)} = \frac{1}{N} + \frac{1/K}{1 - N/K}$$

Integrating both sides:

$$\ln N - \ln(1 - N/K) = rt + C$$

Solving for $N(t)$ with initial condition $N(0) = N_0$:

$$\boxed{N(t) = \frac{K}{1 + \left(\dfrac{K}{N_0} - 1\right)e^{-rt}}}$$

Key properties of this solution:

| Property | Value |
|----------|-------|
| Asymptote as $t \to \infty$ | $K$ |
| Inflection point (maximum growth rate) | $N = K/2$ |
| Time to inflection (from $N_0 < K/2$) | $t^* = \frac{1}{r}\ln\!\frac{K - N_0}{N_0}$ |
| Maximum $\dot{N}$ | $rK/4$ |

The inflection at $N = K/2$ is ecologically important: it corresponds to maximum sustainable yield (MSY) in fisheries management. Harvesting to maintain $N = K/2$ theoretically maximizes the long-run catch.

## Discrete Logistic Map and Chaos

Replacing continuous time with discrete generations gives the **discrete logistic map** (May 1976):

$$N_{t+1} = r N_t\!\left(1 - \frac{N_t}{K}\right)$$

Rescaling with $x_t = N_t/K$:

$$x_{t+1} = r x_t(1 - x_t)$$

This deceptively simple map exhibits a full range of dynamical behaviors depending on $r$:

| Growth Rate $r$ | Behavior |
|----------------|----------|
| $0 < r \leq 1$ | Monotone convergence to $x^* = 1 - 1/r$ |
| $1 < r \leq 3$ | Damped oscillations to stable equilibrium |
| $3 < r \leq 3.449$ | Period-2 limit cycle |
| $3.449 < r \leq 3.544$ | Period-4 cycle |
| $r > 3.57$ | Chaos (period-doubling cascade complete) |
| $r = 4$ | Full chaos on $[0,1]$, ergodic |

The bifurcation cascade follows the **Feigenbaum constant** $\delta \approx 4.669$: the ratio of successive bifurcation intervals converges to $\delta$. For $r = 4$, the invariant density is:

$$\rho(x) = \frac{1}{\pi\sqrt{x(1-x)}}$$

This U-shaped distribution means the chaotic trajectory spends more time near 0 and 1 than near 0.5. The Lyapunov exponent $\lambda_L = \ln 2 > 0$ confirms sensitive dependence on initial conditions.

## Allee Effects

The standard logistic assumes per capita growth rate is maximized at low density. The **Allee effect** (Allee 1931) occurs when per capita growth rate decreases at low density due to:

- Difficulty finding mates (especially in sexually reproducing species)
- Loss of cooperative hunting or predator dilution
- Reduced social thermoregulation

The **strong Allee effect** (component) introduces a critical threshold $A$ ($0 < A < K$):

$$\dot{N} = rN\!\left(\frac{N}{A} - 1\right)\!\left(1 - \frac{N}{K}\right)$$

This cubic model has three equilibria: $N=0$ (stable), $N=A$ (unstable — the Allee threshold), and $N=K$ (stable). Populations below $A$ decline to extinction despite positive $r$. The Allee threshold acts as a minimum viable population size from a purely deterministic standpoint.

The **weak Allee effect** does not create an unstable equilibrium but slows growth at low density without causing decline:

$$\dot{N} = rN\!\left(1 - \frac{N}{K}\right)\!\left(\frac{N}{N + A}\right)$$

Here per capita growth approaches zero as $N \to 0$ rather than going negative, avoiding the extinction basin.

## Theta-Logistic Generalization

The theta-logistic model (Gilpin and Ayala 1973) allows nonlinear density dependence:

$$\dot{N} = rN\!\left[1 - \left(\frac{N}{K}\right)^\theta\right]$$

The standard logistic corresponds to $\theta = 1$. When $\theta < 1$, density dependence is strongest at low densities (concave relationship). When $\theta > 1$, density dependence is felt primarily near $K$. The parameter $\theta$ can be estimated from time series data.

The solution to the theta-logistic is:

$$N(t) = K\!\left[1 + \left(\left(\frac{N_0}{K}\right)^{-\theta} - 1\right)e^{-r\theta t}\right]^{-1/\theta}$$

Model selection between logistic ($\theta=1$) and theta-logistic can be performed using AIC comparing fits to population time series.

## Fitting to Data

Fitting the logistic to a population time series with observations $N_1, N_2, \ldots, N_T$ at times $t_1, \ldots, t_T$ typically uses nonlinear least squares:

$$\hat{\theta} = \arg\min_{\theta} \sum_{i=1}^T \left[N_i - N(t_i; r, K, N_0)\right]^2$$

Alternatively, rearranging the discrete logistic in difference form:

$$\frac{N_{t+1} - N_t}{N_t} = r - \frac{r}{K}N_t$$

This is a linear regression of per capita growth rate on $N_t$, yielding OLS estimates $\hat{r}$ (intercept) and $\hat{r}/K$ (slope). Confidence intervals on $K = \hat{r}/\hat{\text{slope}}$ require the delta method or bootstrapping since $K$ is a ratio of estimated quantities.

A common diagnostic is the **Pella-Tomlinson plot**: per capita growth rate $\Delta N_t / N_t$ vs $N_t$, which should be linear with negative slope under the logistic assumption.
