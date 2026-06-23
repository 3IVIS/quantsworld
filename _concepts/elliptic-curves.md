---
title: Elliptic Curves
slug: elliptic-curves
equation: 'y^2 = x^3 + ax + b'
intro: >
  Elliptic curves are smooth cubic curves with a group law that makes point addition
  the hard problem underlying ECC cryptography. They also appear in number theory,
  coding theory, and the proof of Fermat's Last Theorem.
related_concepts:
  - group-theory
  - number-theory
difficulty: advanced
difficulty_level: 5
---

## The group law

An elliptic curve over a field $F$ is $E: y^2 = x^3 + ax + b$ (with $4a^3 + 27b^2 \neq 0$).

Points on $E$ form an abelian group under the **chord-and-tangent rule**: to add $P + Q$, draw the line through $P,Q$, find the third intersection with $E$, reflect over the $x$-axis. The identity is the point at infinity $\mathcal{O}$.

## Elliptic Curve Discrete Logarithm

In $E(\mathbb{F}_p)$, given $P$ and $Q = kP$, finding $k$ is the **elliptic curve discrete logarithm problem (ECDLP)** — believed harder than the classical DLP, so ECC achieves equivalent security at smaller key sizes (256-bit ECC $\approx$ 3072-bit RSA).

## Key curves in practice

| Curve | Field | Applications |
|---|---|---|
| P-256 (NIST) | $\mathbb{F}_p$ | TLS, ECDSA |
| Curve25519 | $\mathbb{F}_{2^{255}-19}$ | Signal, WireGuard |
| secp256k1 | $\mathbb{F}_p$ | Bitcoin, Ethereum |
