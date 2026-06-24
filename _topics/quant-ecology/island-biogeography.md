---
title: "Island Biogeography"
field: quant-ecology
description: MacArthur and Wilson's equilibrium theory explains species richness on islands through the balance of immigration and extinction, predicting the species-area relationship.
intro: >
  The theory of island biogeography, developed by Robert MacArthur and E. O. Wilson in 1967, provided the first dynamic equilibrium explanation for why larger and nearer islands hold more species. Immigration from a mainland species pool brings new species, while local extinction removes them; the equilibrium is where these rates balance. The theory underpins modern reserve design and the concept of habitat fragmentation as analogous to insularity.
math_concepts:
  - probability-theory
  - differential-equations
  - dynamical-systems
difficulty: intermediate
difficulty_level: 2
read_time: 8
---

## The Species-Area Relationship

The most robust empirical pattern in biogeography is the **species-area relationship (SAR)**:

$$S = c A^z$$

or equivalently, $\log S = \log c + z \log A$, where $S$ is species richness, $A$ is island area, $c$ is a taxon- and region-specific constant, and $z$ is the slope on a log-log plot.

Typical values of $z$:

| Context | $z$ range |
|---|---|
| True oceanic islands | $0.25$–$0.35$ |
| Habitat islands (fragments) | $0.20$–$0.35$ |
| Within continuous areas (species-area curves) | $0.10$–$0.18$ |
| Across continents (inter-provincial) | $\approx 0.65$ |

The steeper slope for true islands reflects the additional filtering imposed by overwater dispersal. The mechanistic explanation from MacArthur-Wilson is that both immigration and extinction rates depend on $A$ through their effects on population sizes.

## Equilibrium Theory: Immigration and Extinction Rates

MacArthur and Wilson modeled species richness as a dynamic equilibrium. Let $P$ be the size of the mainland species pool and $S$ the number of species currently on the island.

**Immigration rate** $I(S)$: the rate at which new species (not yet on the island) arrive. When $S = 0$, all mainland species can arrive ($I$ is maximal). When $S = P$, no new species are possible ($I = 0$). A linear approximation:

$$I(S) = \lambda(P - S)$$

where $\lambda$ is the per-species immigration rate. Distance reduces $\lambda$: $\lambda \propto e^{-\alpha d}$ for distance $d$.

**Extinction rate** $E(S)$: the rate at which resident species go locally extinct. When $S = 0$, extinction is impossible. As $S$ increases, each species occupies smaller average populations, increasing extinction risk:

$$E(S) = \mu S$$

where $\mu$ is the per-species extinction rate. Larger islands have smaller $\mu$ because they support larger populations: $\mu \propto A^{-\gamma}$.

**Equilibrium species richness**: setting $I(S^*) = E(S^*)$:

$$S^* = \frac{\lambda P}{\lambda + \mu}$$

Species turnover at equilibrium: $T^* = I(S^*) = E(S^*) = \frac{\lambda\mu P}{\lambda + \mu}$. This predicted turnover—species replacement without change in $S$—was confirmed by Wilson and Simberloff's mangrove island defaunation experiments in the Florida Keys (1969).

## Distance and Area Effects

Both effects enter naturally:

- **Distance effect**: Far islands have lower $\lambda$ (fewer propagules arrive), so $S^*_\text{far} < S^*_\text{near}$ at the same area.
- **Area effect**: Large islands have lower $\mu$, so $S^*_\text{large} > S^*_\text{small}$ at the same distance.

These can be combined. With $\lambda = \lambda_0 e^{-\alpha d}$ and $\mu = \mu_0 / A^\gamma$:

$$S^* = \frac{\lambda_0 e^{-\alpha d}\,P}{\lambda_0 e^{-\alpha d} + \mu_0 A^{-\gamma}}$$

This recovers the qualitative predictions of both the SAR and the distance effect, and unifies them in a single mechanistic expression.

## Applications to Conservation: The SLOSS Debate

The theory sparked the **SLOSS debate** (Single Large Or Several Small): does one large reserve hold more species than several small reserves of the same total area? The SAR suggests the large reserve wins if $z > 0$, since:

$$S_\text{large}(nA) = c(nA)^z = c n^z A^z > n \cdot c A^z = n \cdot S_\text{small}(A)$$

because $n^z < n$ for $z < 1$. However, the debate is more nuanced in practice: several small reserves may capture more habitat heterogeneity, reduce disease transmission, and hedge against catastrophe. Modern reserve design incorporates connectivity (dispersal corridors) alongside size, extending the MacArthur-Wilson framework into the metapopulation paradigm.
