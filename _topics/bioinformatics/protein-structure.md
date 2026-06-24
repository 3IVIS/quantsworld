---
title: "Protein Structure Prediction"
field: bioinformatics
description: Energy minimization, force fields, and deep learning approaches for predicting 3D protein structure from sequence.
intro: >
  Protein structure prediction seeks to determine the three-dimensional conformation
  of a protein from its amino acid sequence. Classical approaches rely on physical
  force fields and energy minimization, while modern methods like AlphaFold leverage
  attention mechanisms and geometric deep learning to predict inter-residue distance maps.
math_concepts:
  - optimization
  - differential-geometry
  - probability-theory
  - linear-algebra
difficulty: advanced
difficulty_level: 4
read_time: 10
---

## Force Fields and Energy Minimization

A molecular force field models the potential energy of a conformation as a sum of bonded and non-bonded terms:

$$E_\text{total} = \sum_\text{bonds} k_b(r - r_0)^2 + \sum_\text{angles} k_\theta(\theta - \theta_0)^2 + \sum_\text{torsions} \frac{V_n}{2}[1 + \cos(n\phi - \delta)] + \sum_{i<j}\left[\frac{A_{ij}}{r_{ij}^{12}} - \frac{B_{ij}}{r_{ij}^6} + \frac{q_i q_j}{\epsilon r_{ij}}\right]$$

Minimization proceeds via gradient descent on the $3N$-dimensional conformational space, where $N$ is the number of atoms.

## Ramachandran Plot

Backbone geometry is constrained by steric clashes. For each residue, the allowed $(\phi, \psi)$ dihedral angles form a Ramachandran distribution. Under a probabilistic model:

$$P(\phi, \psi \mid \text{residue type}) \propto \exp\!\left(-\frac{E(\phi,\psi)}{k_B T}\right)$$

Most residues cluster in $\alpha$-helix and $\beta$-sheet regions, serving as a quality metric for predicted structures.

## AlphaFold Distance Map Prediction

AlphaFold2 frames structure prediction as a distribution over inter-residue distances $d_{ij}$ and orientations. It learns:

$$P(d_{ij} \mid \text{MSA}, \text{templates}) = \text{softmax}(\mathbf{W}\,\mathbf{z}_{ij})$$

where $\mathbf{z}_{ij}$ are pair representations updated by triangle multiplicative attention. Final coordinates are produced by an equivariant structure module operating on $SE(3)$ frames per residue.

## Homology Modelling

When a homologous template exists with sequence identity $\geq 30\%$, coordinates are transferred and refined. Model quality is estimated by the TM-score:

$$\text{TM-score} = \frac{1}{L}\sum_{i=1}^{L_\text{ali}} \frac{1}{1 + (d_i/d_0)^2}, \quad d_0 = 1.24\,(L-15)^{1/3} - 1.8$$

A TM-score above $0.5$ generally indicates the same fold.
