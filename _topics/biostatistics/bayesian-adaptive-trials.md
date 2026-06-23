---
title: "Bayesian Adaptive Trials"
field: biostatistics
description: Clinical trials that use Bayesian inference to update beliefs about treatment effects and modify trial conduct based on accumulating evidence.
intro: >
  Bayesian adaptive trials embed Bayes' theorem into the trial process itself: prior
  beliefs about treatment effects are updated with each observed outcome, and trial
  decisions — allocation probabilities, sample size, cohort selection — respond to the
  accumulating posterior. This framework makes ethical use of emerging evidence to
  randomize fewer patients to inferior treatments, stop trials early when evidence is
  compelling, and evaluate multiple treatments simultaneously on shared control arms.
math_concepts:
  - bayes-theorem
  - probability-theory
  - monte-carlo-methods
difficulty: expert
difficulty_level: 5
read_time: 12
---

## Bayesian framework in clinical trials

The Bayesian model updates a **prior** distribution $p(\theta)$ on the treatment effect $\theta$ with the observed data $\mathcal{D}_n$ via Bayes' theorem:

$$p(\theta \mid \mathcal{D}_n) = \frac{p(\mathcal{D}_n \mid \theta) \cdot p(\theta)}{p(\mathcal{D}_n)} \propto p(\mathcal{D}_n \mid \theta) \cdot p(\theta)$$

The **posterior** $p(\theta \mid \mathcal{D}_n)$ is the complete probabilistic summary of $\theta$ after $n$ observations. All inference and decisions flow from this posterior — point estimates (posterior mean, median), intervals (highest density intervals, HPD), and decision thresholds.

Key contrasts with frequentist trials:

| Property | Frequentist | Bayesian |
|---|---|---|
| Parameters | Fixed unknowns | Random (distributed) |
| Data interpretation | What if $H_0$ true? | $P(\theta \in A \mid \text{data})$ |
| Stopping rules | Pre-specified $\alpha$-spending | Posterior probability |
| Prior information | Ignored | Formally incorporated |
| Sequential analysis | Inflates $\alpha$ | Naturally sequential |

## Prior specification

The prior $p(\theta)$ encodes information before the trial. The choice is the most contested aspect of Bayesian trials.

**Conjugate priors**: when the posterior has the same distributional form as the prior, updating is analytic.

For a **binary outcome** with event rate $\pi$:
- Prior: $\pi \sim \text{Beta}(\alpha_0, \beta_0)$
- Likelihood: $Y \sim \text{Binomial}(n, \pi)$
- Posterior: $\pi \mid Y=y \sim \text{Beta}(\alpha_0 + y, \beta_0 + n - y)$

The prior parameters $\alpha_0, \beta_0$ can be interpreted as **pseudo-counts**: $\alpha_0$ prior successes, $\beta_0$ prior failures. Effective sample size $= \alpha_0 + \beta_0$.

For a **normal outcome** with mean $\mu$ and known variance $\sigma^2$:
- Prior: $\mu \sim N(\mu_0, \tau_0^2)$
- Likelihood: $\bar{Y} \sim N(\mu, \sigma^2/n)$
- Posterior: $\mu \mid \bar{Y} \sim N(\mu_n, \tau_n^2)$ where:

$$\mu_n = \frac{\mu_0/\tau_0^2 + n\bar{Y}/\sigma^2}{1/\tau_0^2 + n/\sigma^2}, \quad \frac{1}{\tau_n^2} = \frac{1}{\tau_0^2} + \frac{n}{\sigma^2}$$

The posterior mean is a precision-weighted average of prior mean and data mean.

**Non-informative (vague) priors**: $\text{Beta}(0.5, 0.5)$ (Jeffreys), $\text{Beta}(1,1)$ (uniform). For regulatory purposes, vague priors are preferred unless strong prior data exists (e.g., historical control data for the same disease).

**Power priors**: borrow information from historical data $\mathcal{D}_0$ by weighting:

$$p(\theta \mid \mathcal{D}_0)^{a_0} \cdot p(\theta)$$

where $a_0 \in [0,1]$ controls borrowing. $a_0 = 0$: ignore history; $a_0 = 1$: full borrowing.

## Bayesian stopping rules

Instead of frequentist $p < 0.05$, Bayesian trials stop when posterior probabilities exceed pre-specified thresholds.

**Efficacy stopping**: stop and declare treatment superior if:

$$P(\theta > \theta_0 \mid \mathcal{D}_n) > p_{\text{sup}}$$

where $\theta_0$ is the null value (e.g., 0 for difference, 1 for ratio) and $p_{\text{sup}} \approx 0.975$–$0.99$.

**Futility stopping**: stop for futility if:

$$P(\theta > \theta_0 \mid \mathcal{D}_n) < p_{\text{fut}}$$

or equivalently, if the predictive probability of success (see below) is too low.

**Posterior probability threshold calibration**: because Bayesian posterior probabilities need not control frequentist type I error, simulation under the null $H_0: \theta = \theta_0$ is used to choose $p_{\text{sup}}$ such that $P(\text{stop for efficacy} \mid H_0) \le \alpha$.

This requires Monte Carlo: simulate $N_{\text{sim}} = 10{,}000$–$100{,}000$ trials under $H_0$, count how often the stopping rule fires. Adjust $p_{\text{sup}}$ until the frequentist type I error rate is controlled.

## Predictive probability of success

The **predictive probability of success (PPS)** is the probability that the trial will be declared a success at the final analysis, given current data $\mathcal{D}_n$:

$$\text{PPS}(n) = \int P(\text{success at final} \mid \mathcal{D}_n, \theta) \, p(\theta \mid \mathcal{D}_n)\, d\theta$$

This integrates over the predictive distribution of future data. PPS is used for:
- **Interim futility**: if $\text{PPS} < 0.05$, stopping is warranted
- **Go/No-Go decisions**: $\text{PPS} > 0.80$ to proceed to a confirmatory trial
- **Dynamic sample size**: enroll more if needed to achieve target PPS

Computing PPS requires simulation (for each posterior draw $\theta^{(s)}$, simulate the remaining $N-n$ observations and check the stopping criterion) — typically expensive but feasible with modern hardware.

## Response-adaptive randomization

**Response-adaptive randomization (RAR)** updates allocation probabilities based on observed outcomes, steering more patients toward the better-performing arm.

**Thompson sampling** for $K$ arms with binary responses: at each allocation decision, draw $\pi_k^{(t)} \sim p(\pi_k \mid \mathcal{D}_{n_k})$ for each arm $k$ and allocate to $\arg\max_k \pi_k^{(t)}$.

With Beta-Binomial conjugacy, this reduces to: draw $\pi_k^{(t)} \sim \text{Beta}(\alpha_k + y_k, \beta_k + n_k - y_k)$ and assign to the arm with the highest draw.

**Power-transformed Thompson**: allocate arm $k$ with probability proportional to:

$$\rho_k \propto P(\pi_k = \max_j \pi_j \mid \mathcal{D}_n)^c \cdot \sqrt{n_k}$$

where $c < 1$ reduces variability and the $\sqrt{n_k}$ term ensures exploration. Large $c$ is more exploitative; small $c$ more exploratory.

**Properties and concerns**:
- RAR assigns more patients to the better arm — an ethical advantage in serious disease
- RAR can reduce trial power compared to equal allocation (more variance in allocation proportions)
- **Drift bias**: if the patient population changes over time, RAR can confound treatment comparison
- Regulatory agencies (FDA, EMA) accept RAR but require extensive simulation evidence

## Platform, basket, and umbrella trials

**Platform trials**: multiple treatments evaluated simultaneously on a shared control arm (RECOVERY, REMAP-CAP). Treatments enter and leave the platform as evidence accumulates. Bayesian sharing of the control arm improves efficiency.

**Basket trials**: a single treatment tested across multiple tumor types (biomarker-defined "baskets"). Bayesian hierarchical models share information across baskets:

$$\theta_k \sim N(\mu, \tau^2), \quad \mu \sim N(\mu_0, \sigma_\mu^2), \quad \tau \sim \text{Half-Cauchy}(0, s)$$

Posterior for $\theta_k$ borrows strength from other baskets proportionally to $1/\tau^2$. When $\tau \to 0$ (homogeneous), full pooling; when $\tau \to \infty$, no borrowing.

**Umbrella trials**: multiple targeted therapies tested within a single disease (e.g., lung cancer), with patients screened for biomarkers and assigned to the matching arm. Bayesian biomarker subgroup models identify which biomarker-defined populations benefit.

## Regulatory considerations

The FDA's 2019 guidance on **Adaptive Designs for Clinical Trials** and the 2010 guidance on **Bayesian Statistics** specify requirements for Bayesian trials:

1. **Pre-specification**: the analysis model, prior, and stopping rules must be pre-specified in the protocol and SAP
2. **Type I error control**: frequentist type I error rate must be assessed by simulation and controlled at a pre-specified level ($\alpha = 0.05$ two-sided for most confirmatory trials)
3. **Sensitivity analysis**: results must be robust to prior choice — try weakly informative and vague priors
4. **Operating characteristics**: power, expected sample size, and decision probabilities under a range of scenarios must be reported

Posterior probability thresholds for confirmatory evidence are typically $\ge 0.975$ to achieve frequentist type I error $\le 0.025$ (one-sided). For exploratory basket or platform trials, $\ge 0.90$ may be accepted.

Computational tools: JAGS, Stan (HMC-based MCMC), and specialized software (EAST Bayes, FACTS) are used for posterior computation and operating characteristic simulation.
