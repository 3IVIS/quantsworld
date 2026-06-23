---
title: "Clinical Trial Design"
field: biostatistics
description: Principled design of randomized controlled trials, covering sample size, error control, adaptive methods, and regulatory frameworks.
intro: >
  A clinical trial is a prospective experiment in human subjects designed to evaluate
  the effect of an intervention. Good design — randomization, blinding, pre-specified
  analysis plans — is what allows causal inference in medicine. Statistical design
  determines the sample size needed to detect a clinically meaningful effect at controlled
  error rates, and adaptive designs allow efficient learning while the trial runs.
math_concepts:
  - hypothesis-testing
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Hypothesis framework and error rates

A trial tests $H_0: \delta = 0$ (no treatment effect) vs. $H_1: \delta = \delta_*$ (a clinically meaningful effect).

**Type I error** $\alpha = P(\text{reject }H_0 \mid H_0\text{ true})$ — the false positive rate. Conventionally $\alpha = 0.05$ (two-sided).

**Type II error** $\beta = P(\text{fail to reject }H_0 \mid H_1\text{ true})$ — the false negative rate. Power $= 1 - \beta$, typically $0.80$ or $0.90$.

**Signal-to-noise intuition**: the test statistic $Z = \hat{\delta} / \text{SE}(\hat{\delta})$ has a non-central normal distribution under $H_1$. The non-centrality parameter is $\lambda = \delta_* / \text{SE}$. Power increases as:
- The true effect $\delta_*$ grows
- The sample size $n$ grows (reducing $\text{SE}$)
- Outcome variability $\sigma^2$ shrinks

## Sample size formulas

**Two-sample comparison of means**: equal group sizes $n$ per group, common variance $\sigma^2$, two-sided $\alpha$, power $1-\beta$:

$$n = \frac{(z_{\alpha/2} + z_\beta)^2 \cdot 2\sigma^2}{\delta^2}$$

where $z_p$ is the $p$-th quantile of $N(0,1)$ (e.g., $z_{0.025} = 1.96$, $z_{0.10} = 1.28$ for $90\%$ power, $z_{0.20} = 0.84$ for $80\%$ power).

**Survival endpoint** (log-rank test): sample size is driven by the **number of events** $E$:

$$E = \frac{(z_{\alpha/2} + z_\beta)^2}{[\log(\text{HR})]^2 \cdot p_1 p_2}$$

where $p_1, p_2$ are allocation proportions ($p_1 = p_2 = 0.5$ for 1:1). The total $n$ follows from the expected event probability over follow-up.

**Binary endpoint** (two proportions $\pi_1, \pi_2$):

$$n = \frac{(z_{\alpha/2} + z_\beta)^2 [\pi_1(1-\pi_1) + \pi_2(1-\pi_2)]}{(\pi_1 - \pi_2)^2}$$

**Determinants of sample size**:

| Factor | Direction | Impact |
|---|---|---|
| Smaller $\alpha$ | Stricter | $\uparrow n$ |
| Higher power $(1-\beta)$ | More power | $\uparrow n$ |
| Smaller effect $\delta$ | Harder to detect | $\uparrow n$ |
| Larger $\sigma$ | Noisier outcome | $\uparrow n$ |
| Unequal allocation | Imbalanced | $\uparrow n$ |

## Randomization methods

**Simple randomization**: each subject assigned independently with probability $p$. Imbalance likely in small trials.

**Block randomization**: within blocks of size $2k$, exactly $k$ subjects assigned to each treatment. Block sizes are concealed to prevent allocation prediction.

**Stratified randomization**: perform block randomization separately within strata defined by prognostic factors (e.g., disease stage, center). Ensures balance on key variables. Recommended when $< 200$ subjects per stratum.

**Minimization** (Pocock-Simon): new subject assigned to the group that minimizes imbalance on multiple factors simultaneously, using a deterministic or probabilistic rule. Produces superior covariate balance to stratified randomization but allocation is less truly random.

**Cluster randomization**: entire clusters (practices, schools, villages) randomized. Intra-cluster correlation (ICC) inflates required sample size by the **design effect** $\text{DEFF} = 1 + (m-1)\rho$, where $m$ is cluster size and $\rho$ is the ICC.

## Group sequential designs

Sequential designs allow **interim analyses** with stopping rules for efficacy or futility, avoiding the need to wait until the full sample is enrolled.

The challenge: each interim look at cumulative data inflates type I error. If the trial is analyzed $K$ times at nominal $\alpha = 0.05$, the actual type I error is $> 0.05$.

**O'Brien-Fleming boundaries**: apply a stringent boundary at early looks (allowing stopping only for overwhelming evidence) and relax the boundary toward the final analysis:

$$b_k = z_{\alpha/2} \sqrt{K/k}$$

At interim $k$ of $K$, reject $H_0$ if $|Z_k| > b_k$. The final boundary $b_K = z_{\alpha/2}$ (essentially unchanged), while early boundaries are very large.

**Pocock boundaries**: constant threshold $b_k = c_\alpha$ for all $k$, where $c_\alpha$ is chosen to maintain overall type I error $\alpha$. More likely to stop early but the final $p$-value threshold is more conservative than $z_{0.025}$.

**Information fraction**: at interim $k$, the information fraction is $\mathcal{I}_k / \mathcal{I}_{\max}$, where $\mathcal{I}$ is Fisher information. For a fixed sample, $\mathcal{I}_k / \mathcal{I}_{\max} = n_k / N$.

**Spending functions** (Lan-DeMets): instead of pre-specifying look times, define an error-spending function $\alpha^*(t)$ that allocates the overall $\alpha$ continuously as a function of information fraction $t \in [0,1]$. The O'Brien-Fleming spending function: $\alpha_{\text{OF}}(t) = 2[1 - \Phi(z_{\alpha/2}/\sqrt{t})]$.

## Adaptive designs

**Sample size re-estimation (SSR)**: after an interim look, revise the sample size based on the observed variance (blinded) or effect size (unblinded), while controlling type I error via conditional power arguments.

**Adaptive enrichment**: modify eligibility criteria during the trial based on interim data — e.g., restrict to the subgroup showing larger treatment benefit.

**Seamless phase II/III**: a single trial starts with multiple doses (phase II) and adapts to carry forward only the promising doses into the confirmatory phase (III), with pre-specified rules and combined inference.

**Estimands (ICH E9(R1))**: the 2020 addendum requires explicit specification of:
1. **Population**: which patients
2. **Variable**: the outcome
3. **Intercurrent events**: how are events like treatment discontinuation handled (treatment policy, hypothetical, composite, while on treatment, principal stratum)
4. **Summary measure**: mean difference, HR, OR

This forces alignment between the scientific question, the design, and the analysis.

## Blinding and CONSORT reporting

**Blinding levels**:
- **Open-label**: all parties know assignment
- **Single-blind**: subjects unaware
- **Double-blind**: subjects and investigators unaware (gold standard)
- **Triple-blind**: subjects, investigators, and outcome assessors unaware

CONSORT (**Consolidated Standards of Reporting Trials**) is the international standard for reporting parallel-group RCTs. Key elements:
- CONSORT flow diagram (enrollment → randomization → follow-up → analysis)
- Allocation concealment mechanism
- Randomization sequence generation
- Primary outcome pre-specification
- All enrolled, randomized, analyzed counts

ICH E9 requires the **primary estimand** and **primary estimator** (method) to be pre-specified in the statistical analysis plan (SAP) before database lock.
