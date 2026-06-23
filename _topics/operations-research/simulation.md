---
title: "Discrete-Event Simulation"
field: operations-research
description: Modeling stochastic systems by advancing a simulation clock through events and analyzing steady-state and transient behavior.
intro: >
  Discrete-event simulation (DES) models systems where state changes occur at discrete points in time driven by events such as arrivals, departures, or failures. The methodology pairs random variate generation with statistical output analysis to estimate performance measures — queue lengths, waiting times, throughput — that resist closed-form solution. Variance reduction techniques and careful replication design are essential for efficient, unbiased estimation.
math_concepts:
  - probability-theory
  - monte-carlo-methods
  - random-processes
difficulty: intermediate
difficulty_level: 3
read_time: 12
---

## System Components and Event-Driven Logic

A discrete-event simulation maintains three core data structures:

| Component | Description |
|-----------|-------------|
| **State variables** | Complete description of the system at time $t$ (e.g., number in queue $Q(t)$, server status $S(t)$) |
| **Simulation clock** | Current simulated time $t$ |
| **Future event list (FEL)** | Priority queue of scheduled events, sorted by event time |

The **main loop** repeatedly pulls the earliest event from the FEL, advances the clock to that event's time, updates state variables, and schedules new events. This is the *next-event time advance* mechanism — the clock jumps from one event to the next, skipping idle periods.

**Pseudocode:**

```
initialize state, clock t = 0, FEL
while stopping criterion not met:
    (t_e, event_type) = remove_min(FEL)
    t = t_e
    process event(event_type)      # update state, schedule new events
collect statistics
```

## M/M/1 Queue Simulation

The M/M/1 queue has Poisson arrivals at rate $\lambda$ and exponential service at rate $\mu$, with one server. State: $(Q, S)$ where $Q$ = number in queue, $S \in \{0,1\}$ = server busy.

**Event types:**

- **Arrival**: increment $Q$; if $S = 0$ set $S = 1$, schedule departure at $t + \text{Exp}(\mu)$; schedule next arrival at $t + \text{Exp}(\lambda)$
- **Departure**: if $Q > 0$ decrement $Q$, schedule next departure at $t + \text{Exp}(\mu)$; else set $S = 0$

**Theoretical benchmarks** (for validation, $\rho = \lambda/\mu < 1$):

$$\mathbb{E}[L] = \frac{\rho}{1 - \rho}, \qquad \mathbb{E}[W] = \frac{1}{\mu - \lambda}, \qquad \mathbb{E}[L_q] = \frac{\rho^2}{1 - \rho}$$

Simulation output should converge to these as the run length increases. Discrepancies indicate bugs or insufficient warm-up.

## Random Variate Generation

Simulation requires samples from non-uniform distributions. The **inverse CDF method** transforms uniform random variates:

If $U \sim \text{Uniform}(0,1)$ and $F$ is the CDF of the target distribution, then $X = F^{-1}(U)$ has distribution $F$.

**Exponential distribution** ($\text{Exp}(\lambda)$):

$$F(x) = 1 - e^{-\lambda x} \implies F^{-1}(u) = -\frac{1}{\lambda}\ln(1 - u) \equiv -\frac{1}{\lambda}\ln u$$

**Derivations for common distributions:**

| Distribution | Inverse CDF |
|--------------|-------------|
| Uniform$(a,b)$ | $a + (b-a)u$ |
| Exponential$(\lambda)$ | $-\ln(u)/\lambda$ |
| Weibull$(\lambda, k)$ | $\lambda(-\ln u)^{1/k}$ |
| Geometric$(p)$ | $\lceil \ln(u)/\ln(1-p) \rceil$ |

For distributions without a closed-form inverse (Normal, Gamma), use the **Box-Muller transform** or acceptance-rejection:

$$Z_1 = \sqrt{-2\ln U_1}\cos(2\pi U_2), \qquad Z_2 = \sqrt{-2\ln U_1}\sin(2\pi U_2)$$

where $Z_1, Z_2 \stackrel{\text{iid}}{\sim} \mathcal{N}(0,1)$.

## Variance Reduction Techniques

Crude Monte Carlo estimates a mean $\theta = \mathbb{E}[Y]$ with variance $\text{Var}(Y)/n$. Variance reduction exploits structure to achieve the same accuracy with fewer replications.

### Antithetic Variates

For each random stream $U_i$, also generate $1 - U_i$. Let $Y_i^+ = g(U_i)$ and $Y_i^- = g(1 - U_i)$. The estimator:

$$\hat{\theta} = \frac{1}{2n}\sum_{i=1}^n (Y_i^+ + Y_i^-)$$

has variance:

$$\text{Var}(\hat{\theta}) = \frac{\text{Var}(Y^+) + \text{Cov}(Y^+, Y^-)}{2n}$$

When $g$ is monotone, $\text{Cov}(Y^+, Y^-) < 0$, reducing variance. Effective for monotone performance measures like waiting time.

### Control Variates

Let $C$ be a random variable with known mean $\mu_C = \mathbb{E}[C]$. The control variate estimator:

$$\hat{\theta}_c = \bar{Y} - b(\bar{C} - \mu_C)$$

is unbiased for any $b$. The optimal coefficient minimizes variance:

$$b^* = \frac{\text{Cov}(Y, C)}{\text{Var}(C)}$$

giving variance reduction factor:

$$\frac{\text{Var}(\hat{\theta}_c)}{\text{Var}(\bar{Y})} = 1 - \rho_{YC}^2$$

where $\rho_{YC}$ is the correlation between $Y$ and $C$. In an M/M/1 simulation, the number of arrivals is a natural control variate.

### Stratified Sampling

Partition $[0,1]^d$ into $K$ strata of equal probability $1/K$. Draw $n_k$ samples from stratum $k$ with $\sum n_k = n$. The stratified estimator:

$$\hat{\theta}_{\text{str}} = \sum_{k=1}^K \frac{1}{K} \bar{Y}_k$$

Proportional allocation ($n_k = n/K$) gives variance:

$$\text{Var}(\hat{\theta}_{\text{str}}) = \frac{1}{n}\sum_k \frac{\sigma_k^2}{K}$$

which is always $\leq \text{Var}(\bar{Y}) = \sigma^2/n$ by the law of total variance, since it removes between-stratum variability.

## Output Analysis: Transient vs. Steady-State

### Transient Analysis

In transient simulation, interest is in performance at a specific time horizon $T$ or after a specific number of events. Estimates are formed by **independent replications**:

Run $r$ independent simulations; let $Y_1, \ldots, Y_r$ be the output statistics. Then:

$$\hat{\theta} = \bar{Y} = \frac{1}{r}\sum_{i=1}^r Y_i, \qquad s^2 = \frac{1}{r-1}\sum_{i=1}^r (Y_i - \bar{Y})^2$$

A $100(1-\alpha)\%$ confidence interval:

$$\bar{Y} \pm t_{r-1,\,\alpha/2} \cdot \frac{s}{\sqrt{r}}$$

This is valid because replications are independent, so the CLT applies directly.

### Steady-State Analysis and Warm-Up

For steady-state metrics (e.g., long-run average waiting time $W$), simulations must reach equilibrium. The **initialization bias** from starting empty inflates early statistics.

**Welch's method** for selecting warm-up period $w$:
1. Run $r$ replications of length $T$
2. Compute moving average $\bar{Y}_i(m) = \frac{1}{2m+1}\sum_{j=-m}^m Y_{i+j}$
3. Plot $\bar{Y}_i(m)$ and visually identify where it stabilizes; set $w$ at that point

For a single long run, use the **batch means method**: divide the post-warmup output into $k$ batches of size $m$, compute batch means $\bar{Y}_1, \ldots, \bar{Y}_k$, and treat them as approximately independent observations. The required batch size $m$ grows with autocorrelation:

$$\text{Var}(\bar{Y}_{\text{batch}}) \approx \frac{\sigma^2}{m}\left(1 + 2\sum_{l=1}^{\infty} \rho_l\right)$$

where $\rho_l$ is the lag-$l$ autocorrelation of the output process. The term in parentheses is the **variance inflation factor** due to serial correlation.

## Applications and Model Validation

Discrete-event simulation is applied across operations research and engineering:

- **Manufacturing**: job shop throughput, bottleneck identification, WIP levels
- **Healthcare**: patient flow, ED waiting times, ICU capacity planning
- **Supply chain**: inventory policies, disruption analysis
- **Telecommunications**: packet loss, buffer sizing in queuing networks
- **Finance**: path-dependent option pricing (though continuous-time Monte Carlo is more common)

**Validation** checks that the model accurately represents the real system:

1. **Face validity**: domain experts review model logic
2. **Benchmark tests**: compare against analytical solutions (M/M/1, M/D/1) for identical parameters
3. **Historical validation**: drive model with historical inputs, compare outputs to historical records using statistical tests ($\chi^2$, KS test)
4. **Sensitivity analysis**: verify that model responds plausibly to parameter changes

A simulation study without careful validation produces precise but potentially meaningless numbers — the fundamental danger of the methodology.
