---
title: "Exchange-Correlation Functionals"
field: computational-chemistry
description: The approximations to the unknown exchange-correlation energy in DFT, ranging from LDA to hybrid and dispersion-corrected functionals.
intro: >
  The exchange-correlation (XC) functional $E_{xc}[n]$ is the central approximation in density functional theory, encoding all quantum many-body effects beyond the classical Hartree energy. Despite the formal exactness of DFT, the true $E_{xc}$ is unknown and must be approximated. Decades of functional development have produced a hierarchy — Jacob's Ladder — with each rung offering improved accuracy at increased computational cost.
math_concepts:
  - quantum-mechanics
  - variational-calculus
  - optimization
  - measure-theory
difficulty: expert
difficulty_level: 5
read_time: 10
---

## Jacob's Ladder of DFT Approximations

| Rung | Functional Class | Ingredients | Example |
|------|-----------------|-------------|---------|
| 1 | LDA | $n(\mathbf{r})$ | SVWN |
| 2 | GGA | $n, \nabla n$ | PBE, BLYP |
| 3 | meta-GGA | $n, \nabla n, \tau$ | TPSS, SCAN |
| 4 | Hybrid | GGA + HF exchange | B3LYP, PBE0 |
| 5 | Double hybrid | Hybrid + MP2 correlation | B2-PLYP |

The local density approximation uses the uniform electron gas result:

$$E_{xc}^{LDA}[n] = \int n(\mathbf{r})\,\varepsilon_{xc}^{hom}(n(\mathbf{r}))\,d\mathbf{r}$$

## Hybrid Functionals

Hybrid functionals replace a fraction $a_x$ of DFT exchange with exact Hartree-Fock exchange. The widely used B3LYP functional is

$$E_{xc}^{B3LYP} = (1-a_x)E_x^{LDA} + a_x E_x^{HF} + b\,\Delta E_x^{B88} + (1-c)E_c^{VWN} + c\,E_c^{LYP}$$

with $a_x=0.20$, $b=0.72$, $c=0.81$ fitted to experimental thermochemistry. Range-separated hybrids (e.g. CAM-B3LYP, $\omega$B97X-D) use 100% HF exchange at long range to correct self-interaction error in charge-transfer excited states.

## Dispersion Corrections

Standard GGAs and hybrids lack long-range dispersion ($R^{-6}$ van der Waals). Grimme's DFT-D3 correction adds a damped pairwise sum:

$$E_{disp} = -\frac{1}{2}\sum_{i\neq j}\sum_{n=6,8}\frac{s_n\,C_n^{ij}}{r_{ij}^n\left[1+(6r_{ij}/r_{cut})^{-\alpha_n}\right]}$$

where $C_n^{ij}$ are dispersion coefficients and $s_n$ are functional-dependent scaling parameters. DFT-D3 or the many-body dispersion (MBD) correction is essential for non-covalent interactions, crystal packing, and surface adsorption.
