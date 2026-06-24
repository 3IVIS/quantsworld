---
title: "Phylogenetics"
field: bioinformatics
description: Inferring evolutionary trees from molecular sequences using substitution models and likelihood methods.
intro: >
  Phylogenetics reconstructs the evolutionary history of species or genes from aligned sequence data.
  The Jukes-Cantor model describes nucleotide substitution as a continuous-time Markov process,
  and maximum likelihood inference finds the tree topology and branch lengths that best explain the observed alignment.
math_concepts:
  - markov-chains
  - probability-theory
  - optimization
  - graph-theory
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## Substitution Models

The Jukes-Cantor (JC69) model assumes all nucleotides mutate at equal rate $\mu$. The transition probability matrix after time $t$ is:

$$P_{ij}(t) = \begin{cases} \tfrac{1}{4} + \tfrac{3}{4}e^{-4\mu t/3} & i = j \\ \tfrac{1}{4} - \tfrac{1}{4}e^{-4\mu t/3} & i \neq j \end{cases}$$

More general models (HKY85, GTR) allow unequal base frequencies and separate rate categories. The rate matrix $\mathbf{Q}$ with $Q_{ij} \geq 0$ for $i \neq j$ and $\sum_j Q_{ij} = 0$ gives $\mathbf{P}(t) = e^{\mathbf{Q}t}$.

## Maximum Likelihood Tree Inference

Given a tree topology $\tau$ with branch lengths $\mathbf{v}$ and alignment column $\mathbf{x}$, the site likelihood is computed by Felsenstein's pruning algorithm:

$$L_k(\tau, \mathbf{v}) = \sum_{\text{internal states}} \prod_{\text{edges}} P_{ij}(v_e)$$

The total log-likelihood over all sites is $\ell = \sum_k \ln L_k$. Tree search maximizes $\ell$ over topologies using nearest-neighbor interchange (NNI) or subtree pruning and regrafting (SPR).

## Neighbor-Joining

Neighbor-joining builds a tree greedily from a pairwise distance matrix $\mathbf{D}$. At each step it selects the pair $(i,j)$ minimizing the transformed distance:

$$Q_{ij} = (n-2)\,D_{ij} - \sum_{k} D_{ik} - \sum_{k} D_{jk}$$

Branch lengths to the new node $u$ are:

$$v_{iu} = \frac{D_{ij}}{2} + \frac{\sum_k D_{ik} - \sum_k D_{jk}}{2(n-2)}$$

NJ runs in $O(n^3)$ and produces an unrooted tree consistent with additive distances.
