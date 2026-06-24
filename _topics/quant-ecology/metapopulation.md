---
title: "Metapopulation Dynamics"
field: quant-ecology
description: The Levins metapopulation model and its extensions describe how species persist as networks of local populations connected by dispersal.
intro: >
  A metapopulation is a set of local populations inhabiting discrete habitat patches, connected by dispersal and subject to local extinction and recolonization. Richard Levins's 1969 model showed that a species can persist regionally even when each local population faces a positive extinction risk, provided recolonization keeps pace with loss. This regional coexistence mechanism—extinction-colonization balance—is central to conservation planning for fragmented landscapes.
math_concepts:
  - differential-equations
  - probability-theory
  - dynamical-systems
  - markov-chains
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The Levins Model

Let $p(t)$ be the fraction of habitat patches currently occupied. Patches go extinct at per-patch rate $e$ and are colonized at a rate proportional to the fraction of occupied patches (which supply colonists) times the fraction of empty patches available:

$$\frac{dp}{dt} = m\,p\,(1-p) - e\,p$$

where $m$ is the colonization rate. This has the same quadratic structure as the logistic equation, with two equilibria:

$$p^* = 0 \quad \text{(extinction)} \qquad \text{and} \qquad p^* = 1 - \frac{e}{m} \quad \text{(coexistence)}$$

The coexistence equilibrium exists and is stable when $m > e$, i.e., when the **metapopulation capacity** exceeds the extinction rate. The ratio $e/m$ gives the equilibrium fraction of empty patches even when the metapopulation persists — a key insight: not all patches will be occupied at any given time.

Stability analysis: linearizing around $p^*$ gives the eigenvalue $\lambda = e - m < 0$ at the coexistence equilibrium (stable) and $\lambda = m - e > 0$ at $p^*=0$ when $m > e$ (unstable).

## Extinction and Colonization Rates

The Levins model treats $e$ and $m$ as constants, but both are functions of patch characteristics:

**Extinction rate** for a patch of area $A$: smaller patches hold smaller populations and have higher demographic stochasticity, so $e \propto A^{-\gamma}$ for some $\gamma > 0$.

**Colonization rate** for a target patch at distance $d$ from occupied patches:

$$m_i = \sum_{j \neq i} c_j\, e^{-\alpha d_{ij}}$$

where $c_j$ indicates patch $j$ is occupied and $\alpha$ sets the dispersal kernel decay. This spatially explicit formulation leads to the **incidence function model** (Hanski 1994).

The **rescue effect** — colonization reducing local extinction probability by augmenting small populations — can be incorporated by making $e_i$ a decreasing function of immigration rate:

$$e_i = \frac{e_0}{1 + S_i/e_0}$$

where $S_i$ is the immigration rate into patch $i$.

## Metapopulation Capacity

For a landscape of $n$ patches with areas $A_i$ and inter-patch distances $d_{ij}$, the **metapopulation capacity** $\lambda_M$ is the leading eigenvalue of the landscape matrix $\mathbf{M}$ with elements:

$$M_{ij} = e^{-\alpha d_{ij}} \sqrt{A_i A_j}, \quad i \neq j; \qquad M_{ii} = 0$$

The metapopulation persists if and only if:

$$\lambda_M > \frac{e}{c}$$

where $c$ is a colonization parameter and $e$ the extinction parameter. This provides a single landscape-level metric for viability, enabling comparison of different habitat configurations under the same species parameters.

## Stochastic Patch Occupancy Models

In reality, $p$ is not a continuous variable but a count of occupied patches. For $n$ patches, the exact stochastic model is a continuous-time Markov chain on states $0, 1, \ldots, n$. The mean field approximation recovers Levins, but variance matters when $n$ is small.

The probability of metapopulation extinction (all patches empty) can be approximated using the quasi-stationary distribution (QSD): the distribution of patch occupancy conditioned on non-extinction. The time to extinction from the QSD scales approximately as:

$$T_\text{ext} \approx C \exp\!\left(\lambda_M n / \delta\right)$$

for some constants $C$ and $\delta$, showing that extinction risk decreases exponentially with both landscape quality ($\lambda_M$) and number of patches ($n$).
