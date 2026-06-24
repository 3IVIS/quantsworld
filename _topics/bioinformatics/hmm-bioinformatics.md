---
title: "Hidden Markov Models in Bioinformatics"
field: bioinformatics
description: Probabilistic sequence models for gene finding, CpG island detection, and profile-based database search.
intro: >
  A Hidden Markov Model represents a biological sequence as emissions from a latent Markov chain of states.
  The forward-backward algorithm computes posterior state probabilities; Viterbi finds the most likely state path;
  and Baum-Welch iteratively trains parameters from unlabeled sequences via expectation-maximization.
math_concepts:
  - markov-chains
  - probability-theory
  - information-theory
  - bayes-theorem
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## HMM Definition

An HMM is a tuple $(\mathcal{S}, \Sigma, \mathbf{A}, \mathbf{E}, \pi)$: states $\mathcal{S}$, alphabet $\Sigma$, transition matrix $A_{ij} = P(s_t = j \mid s_{t-1} = i)$, emission matrix $E_{ik} = P(x_t = k \mid s_t = i)$, and initial distribution $\pi_i$. The joint probability of a sequence $\mathbf{x}$ with hidden path $\boldsymbol{\pi}$ is:

$$P(\mathbf{x}, \boldsymbol{\pi}) = \pi_{s_1} \prod_{t=1}^{L} E_{s_t, x_t} \prod_{t=2}^{L} A_{s_{t-1}, s_t}$$

## Forward-Backward Algorithm

The forward variable $\alpha_t(i) = P(x_1 \ldots x_t,\, s_t = i)$ satisfies:

$$\alpha_t(i) = E_{i,x_t} \sum_{j} \alpha_{t-1}(j)\, A_{ji}$$

The backward variable $\beta_t(i) = P(x_{t+1} \ldots x_L \mid s_t = i)$ runs in reverse. The posterior probability of state $i$ at position $t$ is:

$$\gamma_t(i) = \frac{\alpha_t(i)\,\beta_t(i)}{P(\mathbf{x})}$$

Both passes run in $O(L \lvert\mathcal{S}\rvert^2)$ time.

## Viterbi Decoding

Viterbi finds $\arg\max_{\boldsymbol{\pi}} P(\mathbf{x}, \boldsymbol{\pi})$ via:

$$v_t(i) = \max_{j}\, v_{t-1}(j)\, A_{ji}\, E_{i,x_t}$$

Traceback recovers the optimal path. In practice computations use log-space to avoid underflow: $\log v_t(i) = \max_j [\log v_{t-1}(j) + \log A_{ji}] + \log E_{i,x_t}$.

## Baum-Welch Training

Baum-Welch is EM applied to HMMs. The M-step re-estimates parameters using expected counts:

$$\hat{A}_{ij} = \frac{\sum_t \xi_t(i,j)}{\sum_t \gamma_t(i)}, \qquad \hat{E}_{ik} = \frac{\sum_{t:\,x_t=k} \gamma_t(i)}{\sum_t \gamma_t(i)}$$

where $\xi_t(i,j) = P(s_t=i, s_{t+1}=j \mid \mathbf{x})$. Each iteration is guaranteed to increase or maintain $P(\mathbf{x})$.
