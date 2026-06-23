---
title: Group Theory
slug: group-theory
equation: 'G = \langle g \rangle, \quad |G| = n'
intro: >
  A group is a set with an associative binary operation, an identity, and inverses.
  Group theory classifies symmetries and is central to cryptography, quantum computing,
  chemistry (molecular symmetry), and physics (gauge theories).
related_concepts:
  - number-theory
  - elliptic-curves
  - quantum-mechanics
difficulty: advanced
difficulty_level: 4
---

## Definition and examples

A group $(G, \cdot)$ satisfies: closure, associativity, identity $e$, and inverses.

Key examples:
- $(\mathbb{Z}, +)$: integers under addition (infinite cyclic)
- $\mathbb{Z}_n$: integers mod $n$ under addition (finite cyclic, order $n$)
- $\mathbb{Z}_p^*$: multiplicative group mod prime $p$ (cyclic, order $p-1$)
- Elliptic curve groups: abelian, used in ECC

## Lagrange's theorem

For a finite group $G$ and subgroup $H$: $|H|$ divides $|G|$. The order of any element $g$ divides $|G|$.

## Cyclic groups and generators

A group is **cyclic** if there exists $g \in G$ with $G = \{e, g, g^2, \ldots\}$. The discrete logarithm problem asks: given $g^x$, find $x$. This is hard in well-chosen groups, providing the security of most public-key cryptography.

## Applications in quantum computing

Quantum algorithms exploit group structure — Shor's algorithm reduces factoring to period-finding in $\mathbb{Z}$, which is solved efficiently via the quantum Fourier transform over $\mathbb{Z}_N$.
