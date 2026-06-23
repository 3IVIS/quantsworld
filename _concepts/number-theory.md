---
title: Number Theory
slug: number-theory
equation: 'a^{\phi(n)} \equiv 1 \pmod{n} \quad \text{(Euler)}'
intro: >
  Number theory studies the integers and their properties. Once considered pure mathematics,
  it now forms the mathematical backbone of modern cryptography — RSA, elliptic curves,
  and lattice-based schemes all rely on number-theoretic hardness assumptions.
related_concepts:
  - group-theory
  - elliptic-curves
  - modular-arithmetic
difficulty: intermediate
difficulty_level: 3
---

## Modular arithmetic

$a \equiv b \pmod{n}$ means $n \mid (a-b)$. The integers mod $n$ form a ring $\mathbb{Z}/n\mathbb{Z}$.

Euler's theorem: for $\gcd(a,n)=1$, $a^{\phi(n)} \equiv 1 \pmod{n}$ where $\phi(n) = |\{k \leq n : \gcd(k,n)=1\}|$ is Euler's totient function. RSA is a direct corollary.

## Primes and factoring

**Fundamental theorem of arithmetic:** every integer $> 1$ factors uniquely into primes.

**Prime number theorem:** $\pi(x) \sim x/\ln x$ — primes thin out logarithmically.

The **integer factorisation problem** — given $n = pq$, find $p,q$ — is believed hard classically but easy for quantum computers (Shor's algorithm), breaking RSA.

## The discrete logarithm problem

In a cyclic group $\mathbb{Z}_p^*$, given $g^x \bmod p$, finding $x$ is computationally hard — the basis of Diffie–Hellman and DSA security.
