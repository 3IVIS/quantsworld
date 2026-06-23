---
title: "Age-Structured Population Models"
field: quant-ecology
description: Age-structured models use matrix algebra and eigenanalysis to project population dynamics when vital rates depend on age or stage class.
intro: >
  Many organisms have vital rates — survival, fecundity, development — that differ dramatically across life stages. A juvenile salmon faces vastly different survival probabilities than a spawning adult. Age-structured (Leslie matrix) models capture this heterogeneity by tracking the number of individuals in each age class and projecting population state through time using matrix multiplication. The dominant eigenvalue of the population projection matrix determines the asymptotic growth rate, while the associated eigenvectors reveal the stable age distribution and reproductive values.
math_concepts:
  - eigenvalues
  - linear-algebra
  - differential-equations
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## The Leslie Matrix

Consider a population divided into $m$ age classes. Let $n_x(t)$ be the number of individuals in age class $x$ at time $t$, and form the **population vector** $\mathbf{n}(t) = (n_1, n_2, \ldots, n_m)^\top$.

The **Leslie matrix** $\mathbf{L}$ is:

$$\mathbf{L} = \begin{pmatrix} F_1 & F_2 & F_3 & \cdots & F_m \\ P_1 & 0 & 0 & \cdots & 0 \\ 0 & P_2 & 0 & \cdots & 0 \\ \vdots & & \ddots & & \vdots \\ 0 & 0 & \cdots & P_{m-1} & 0 \end{pmatrix}$$

where:
- $F_x$ = fecundity of age class $x$ (expected offspring per individual, often $F_x = \ell_x m_x$ with survival to age $x$ built in)
- $P_x = l_{x+1}/l_x$ = probability of surviving from age $x$ to $x+1$ (subdiagonal entries)

The population projects forward as:

$$\mathbf{n}(t+1) = \mathbf{L}\,\mathbf{n}(t) \implies \mathbf{n}(t) = \mathbf{L}^t\,\mathbf{n}(0)$$

**Example:** A three-age-class population with $P_1 = 0.6$, $P_2 = 0.7$, $F_2 = 1.2$, $F_3 = 2.5$:

$$\mathbf{L} = \begin{pmatrix} 0 & 1.2 & 2.5 \\ 0.6 & 0 & 0 \\ 0 & 0.7 & 0 \end{pmatrix}$$

## Dominant Eigenvalue and Asymptotic Growth

The **characteristic polynomial** of $\mathbf{L}$ is obtained from $\det(\mathbf{L} - \lambda\mathbf{I}) = 0$. By the Perron-Frobenius theorem (applied to nonnegative, primitive matrices), $\mathbf{L}$ has a unique dominant real eigenvalue $\lambda_1 > |\lambda_i|$ for all $i \neq 1$.

The long-run behavior:

$$\mathbf{n}(t) \approx c_1 \lambda_1^t \mathbf{v}_1$$

where $\mathbf{v}_1$ is the right eigenvector corresponding to $\lambda_1$ and $c_1$ depends on initial conditions. Thus:

- $\lambda_1 > 1$: population growing
- $\lambda_1 = 1$: stationary population
- $\lambda_1 < 1$: population declining

The **finite rate of increase** is $\lambda_1$; the continuous-time equivalent is $r = \ln \lambda_1$.

For the Euler-Lotka equation (see below), $\lambda_1$ also satisfies:

$$\sum_{x=1}^{m} F_x \prod_{j=1}^{x-1} P_j \cdot \lambda_1^{-x} = 1$$

This provides a scalar equation for $\lambda_1$ when the matrix structure is known.

## Stable Age Distribution and Reproductive Value

**Stable age distribution:** The right eigenvector $\mathbf{v}_1$ gives the proportional age structure approached asymptotically. Normalizing so entries sum to 1:

$$\mathbf{w} = \frac{\mathbf{v}_1}{\mathbf{1}^\top \mathbf{v}_1}$$

$w_x$ is the fraction of the population in age class $x$ at the stable age distribution (SAD).

**Reproductive value:** The left eigenvector $\mathbf{u}_1$ (satisfying $\mathbf{u}_1^\top \mathbf{L} = \lambda_1 \mathbf{u}_1^\top$) gives the **reproductive value** of each age class — the expected future contribution to population growth, discounted by $\lambda_1$. Normalized so $\mathbf{u}_1^\top \mathbf{w} = 1$:

$$V_x = u_{1,x} \propto \sum_{y=x}^{m} \frac{\ell_y}{\ell_x} m_y \lambda_1^{-(y-x)}$$

Reproductive value is maximized at the age of peak reproduction and declines thereafter. In conservation biology, reproductive value weights the importance of preserving different cohorts: losing pre-reproductive individuals is more costly (per capita) than losing post-reproductive ones.

## Sensitivity and Elasticity Analysis

**Sensitivity** of $\lambda_1$ to matrix element $a_{ij}$:

$$s_{ij} = \frac{\partial \lambda_1}{\partial a_{ij}} = \frac{u_i v_j}{\langle \mathbf{u}, \mathbf{v} \rangle}$$

where $\mathbf{v} = \mathbf{v}_1$ and $\mathbf{u} = \mathbf{u}_1$ (left eigenvector), and $\langle \mathbf{u}, \mathbf{v}\rangle = \mathbf{u}^\top \mathbf{v}$.

Sensitivity measures the absolute response of $\lambda_1$ to a small change in $a_{ij}$. It is most useful when entries are on comparable scales.

**Elasticity** (proportional sensitivity) is more ecologically interpretable since it measures the proportional change in $\lambda_1$ for a proportional change in $a_{ij}$:

$$e_{ij} = \frac{a_{ij}}{\lambda_1}\,\frac{\partial \lambda_1}{\partial a_{ij}} = \frac{a_{ij}\,s_{ij}}{\lambda_1}$$

A key property: elasticities sum to 1 ($\sum_{ij} e_{ij} = 1$). This allows direct comparison of the relative importance of survival vs fecundity entries.

**Conservation insight:** For long-lived organisms (sea turtles, whales), $\lambda_1$ is far more sensitive to adult survival elasticities than to juvenile survival or fecundity. Protecting adult females is therefore more effective than protecting nests — a result that caused a major shift in sea turtle conservation strategy (Crouse et al. 1987).

| Life history type | Highest elasticity |
|-------------------|-------------------|
| Long-lived (whales, turtles) | Adult survival $P_{m-1}$ |
| Annual plants | Fecundity $F_1$ |
| Iteroparous vertebrates | Juvenile survival $P_1$ |

## Euler-Lotka Equation

The continuous-time analog of the Leslie matrix is the **Euler-Lotka equation**, which implicitly defines the intrinsic rate of increase $r$ given a survivorship schedule $\ell(a)$ and fecundity schedule $m(a)$:

$$\int_0^\infty e^{-ra}\ell(a)m(a)\,da = 1$$

This equation says: the sum of discounted reproductive output across all ages equals 1 at the stable growth rate. The net reproductive rate $R_0 = \int_0^\infty \ell(a)m(a)\,da$ gives the expected lifetime offspring per individual. When $R_0 = 1$, $r = 0$; when $R_0 > 1$, $r > 0$.

Demographic quantities from the Euler-Lotka framework:

- **Generation time:** $T = \ln R_0 / r \approx \frac{\int_0^\infty a\,\ell(a)m(a)\,da}{R_0}$
- **Damping ratio:** $\rho = |\lambda_1/\lambda_2|$ (speed of convergence to SAD)

## McKendrick-von Foerster Equation

The continuous age-structured PDE (McKendrick 1926, von Foerster 1959) tracks age density $n(a, t)$:

$$\frac{\partial n}{\partial t} + \frac{\partial n}{\partial a} = -\mu(a)\,n(a,t)$$

with boundary condition (recruitment):

$$n(0, t) = \int_0^\infty m(a)\,n(a,t)\,da$$

and initial condition $n(a, 0) = n_0(a)$. Here $\mu(a)$ is the age-specific mortality rate with $\ell(a) = \exp\!\left(-\int_0^a \mu(s)\,ds\right)$.

The steady-state solution with $n(a,t) = c\,e^{rt}\ell(a)$ recovers the Euler-Lotka equation. The PDE is solved numerically using method-of-characteristics or finite difference schemes, and is the foundation of **cohort-component** demographic projections used by national statistics offices.
