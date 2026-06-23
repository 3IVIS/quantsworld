---
title: Queuing Theory
field: operations-research
description: Mathematical models of waiting lines and service systems. The M/M/1 queue and Little's law are the foundations.
intro: >
  Queuing theory analyses waiting lines and service systems. It reveals how
  random arrivals and service times interact to produce congestion — and how
  system design (servers, capacity) affects average waiting time and utilisation.
math_concepts:
  - probability-theory
  - random-processes
  - markov-chains
difficulty: intermediate
difficulty_level: 3
read_time: 8
---

## The M/M/1 queue

**Assumptions:** Poisson arrivals (rate $\lambda$), exponential service (rate $\mu$), single server, infinite queue.

Traffic intensity: $\rho = \lambda/\mu$. Stable if $\rho < 1$.

Steady-state probabilities: $\pi_n = (1-\rho)\rho^n$.

Key performance measures:
- Average queue length: $L = \rho/(1-\rho)$
- Average time in system: $W = 1/(\mu - \lambda)$
- Average time waiting: $W_q = \rho/(\mu-\lambda)$

## Little's law

The most powerful and general result in queuing theory:

$$L = \lambda W$$

**Average number in system = arrival rate × average time in system.**

Holds for any stable queuing system under very mild assumptions — no distributional assumptions required.

## M/M/c and M/G/1

**M/M/c (Erlang-C):** $c$ parallel servers. The Erlang-C formula gives the probability a customer must wait. Widely used in call centre staffing.

**M/G/1:** general service time distribution. Pollaczek-Khinchine formula:

$$W_q = \frac{\lambda\,\mathbb{E}[S^2]}{2(1-\rho)}$$

where $\mathbb{E}[S^2]$ is the second moment of service time — variability hurts.
