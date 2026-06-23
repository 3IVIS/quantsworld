---
title: "Food Web Dynamics"
field: quant-ecology
description: Food webs describe energy flow and species interactions across trophic levels, combining network theory with nonlinear population dynamics.
intro: >
  Food webs encode the feeding relationships among species in an ecosystem, translating biological interactions into directed networks and systems of coupled differential equations. Energy transfer efficiency, network topology, and the stability of multi-species equilibria are all interconnected: May's random matrix theorem showed that complexity can destabilize ecosystems, challenging the prevailing intuition that biodiversity promotes stability. Modern food web theory integrates empirical network data with dynamical systems analysis and allometric body-mass scaling to understand community persistence.
math_concepts:
  - graph-theory
  - network-theory
  - dynamical-systems
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Trophic Structure and Energy Transfer

A **trophic level** is defined by the number of feeding links separating a species from the base of the food web (primary producers at level 1). In practice, trophic levels are fractional because omnivores feed at multiple levels:

$$TL_i = 1 + \frac{1}{n_i}\sum_{j \in \text{prey}(i)} TL_j$$

where $n_i$ is the number of prey species of $i$. This system of linear equations is solved iteratively starting from producers ($TL = 1$).

Energy transfer between trophic levels is constrained by the **ecological efficiency** (~10% rule of Lindeman 1942). If gross primary production is $\text{GPP}$, then:

- Herbivore production $\approx 0.1 \times \text{NPP}$
- Carnivore production $\approx 0.01 \times \text{NPP}$
- Top predator production $\approx 0.001 \times \text{NPP}$

This geometric decline limits food chains to 4–5 trophic levels in most ecosystems. The number of trophic levels $n$ is approximately:

$$n \approx \frac{\ln(\text{GPP}/\text{respiration threshold})}{\ln(10)}$$

## Food Web Network Metrics

A food web with $S$ species and $L$ directed links is described by the **adjacency matrix** $A$ where $A_{ij} = 1$ if species $i$ eats species $j$.

Key topological metrics:

| Metric | Formula | Ecological meaning |
|--------|---------|-------------------|
| Connectance | $C = L/S^2$ | Fraction of possible links realized |
| Link density | $L/S$ | Mean number of prey per species |
| Generality | $\overline{G} = \frac{1}{S}\sum_i \text{in-degree}_i$ | Mean number of prey |
| Vulnerability | $\overline{V} = \frac{1}{S}\sum_i \text{out-degree}_i$ | Mean number of predators |
| Clustering | $\bar{C}_i = \frac{\text{triangles at }i}{\text{possible triangles}}$ | Modularity proxy |

Real food webs exhibit **scale-free-like** degree distributions (power-law tails), high clustering relative to random graphs, short mean path lengths, and a characteristic motif structure (tri-trophic chains, omnivory loops, apparent competition).

The **niche model** (Williams & Martinez 2000) reproduces these properties statistically: each species $i$ is assigned a niche value $n_i \sim U[0,1]$ and feeds on all species within a range $[c_i - r_i/2, c_i + r_i/2]$ where $r_i \sim \text{Beta}(1, \beta_n)$ and $\beta_n$ is fitted to observed connectance. The niche model matches observed food web statistics far better than the random (**cascade**) model.

## Generalized Lotka-Volterra Dynamics

The **generalized Lotka-Volterra (GLV) model** extends the two-species predator-prey system to $S$ species:

$$\dot{N}_i = r_i N_i + N_i \sum_{j=1}^S \alpha_{ij} N_j, \qquad i = 1, \ldots, S$$

Here $r_i$ is the intrinsic growth rate of species $i$ (positive for producers, negative for consumers), and $\alpha_{ij}$ is the per-capita effect of species $j$ on species $i$:

- $\alpha_{ij} > 0, \alpha_{ji} < 0$: predation ($j$ is prey, $i$ is predator)
- $\alpha_{ij} < 0, \alpha_{ji} < 0$: competition
- $\alpha_{ij} > 0, \alpha_{ji} > 0$: mutualism

The interaction matrix $\boldsymbol{\alpha}$ encodes the full community structure. Equilibrium $\mathbf{N}^*$ satisfies $\mathbf{r} + \boldsymbol{\alpha}\mathbf{N}^* = \mathbf{0}$, giving:

$$\mathbf{N}^* = -\boldsymbol{\alpha}^{-1}\mathbf{r}$$

when $\boldsymbol{\alpha}$ is invertible. Local stability requires all eigenvalues of the **community matrix** $M_{ij} = \alpha_{ij}N_j^*$ (Jacobian at equilibrium) to have negative real parts.

## May's Complexity-Stability Theorem

Robert May (1972) used random matrix theory to ask: how does complexity affect stability? For a random community matrix $\mathbf{M}$ with:

- $S$ species
- Connectance $C$ (probability any $M_{ij} \neq 0$)
- Interaction strengths drawn from $N(0, \sigma^2)$
- Diagonal entries $M_{ii} = -d < 0$ (self-regulation)

The eigenvalues of $\mathbf{M}$ are distributed over a disk of radius $\sigma\sqrt{SC}$ (circular law). The community is stable if:

$$\sigma\sqrt{SC} < d$$

May's criterion: **stability requires** $\sigma\sqrt{SC} < d$.

This is the **complexity-stability paradox**: increasing $S$, $C$, or $\sigma$ (species richness, connectance, or interaction strength) all destabilize the community. Yet real ecosystems are complex and stable — the resolution lies in **structured interactions** (prey > predators, weak links predominant, body-mass constraints) that differ fundamentally from random matrices.

Extensions show that:
- **Weak links** between specialists stabilize by damping oscillations (McCann et al. 1998)
- **Trophic structure** (triangular $\boldsymbol{\alpha}$) substantially increases the stability region
- **Nestedness and modularity** can stabilize mutualistic networks

## Keystone Species and Trophic Cascades

A **keystone species** has a disproportionately large effect on community structure relative to its biomass. The keystone index is:

$$KS_i = \frac{\Delta \text{diversity}_i}{\text{relative biomass}_i}$$

The classic example is the sea otter (*Enhydra lutris*): otters eat sea urchins, which graze kelp. Otter removal → urchin explosion → kelp forest collapse → loss of entire associated community. This **trophic cascade** spans three trophic levels.

In GLV terms, the indirect effect of species $i$ on species $k$ through an intermediate $j$ is given by the $(k,i)$ element of $(\mathbf{I} - \mathbf{A})^{-1}$ where $\mathbf{A}$ is the signed adjacency matrix — a sum over all paths from $i$ to $k$. Long indirect pathways can dominate over direct interactions.

## Body-Mass Allometric Scaling

Feeding interactions and metabolic rates scale systematically with body mass $M$ (Peters 1983, Yodzis & Innes 1992). Metabolic rate scales as $B_i \propto M_i^{3/4}$ (Kleiber's law). Maximum consumption rate:

$$I_{ij}^{\max} = a_0 M_i^{0.75}$$

and half-saturation density:

$$B_0 = b_0 M_i^{0.75}$$

Allometric trophic network (ATN) models parametrize the GLV interaction matrix directly from body mass ratios, requiring only species body masses and the food web topology. These models reproduce empirically observed population dynamics, biomass distributions, and extinction cascades without fitting species-specific parameters.

The predator-prey body mass ratio tends to be log-normally distributed around $10^3$ for vertebrate predators, with the distribution providing a mechanistic basis for the niche model's feeding range structure.
