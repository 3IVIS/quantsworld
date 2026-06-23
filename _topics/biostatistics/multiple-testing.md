---
title: "Multiple Testing Corrections"
field: biostatistics
description: Methods for controlling error rates when simultaneously testing many hypotheses, from conservative Bonferroni corrections to FDR control in genomics.
intro: >
  When many hypotheses are tested simultaneously, the probability of at least one false
  positive grows rapidly — testing 100 independent true null hypotheses at $\alpha = 0.05$
  yields an expected 5 false rejections. Multiple testing corrections control either the
  familywise error rate (probability of any false positive) or the false discovery rate
  (expected proportion of rejections that are false). The choice between these criteria
  depends on the consequences of false positives and the scale of testing.
math_concepts:
  - hypothesis-testing
  - probability-theory
difficulty: intermediate
difficulty_level: 3
read_time: 9
---

## The multiple testing problem

Consider $m$ simultaneous hypothesis tests with null hypotheses $H_1, \ldots, H_m$. Let $m_0$ be the number of true nulls and $m_1 = m - m_0$ be the number of true alternatives. Possible outcomes:

| | Not rejected | Rejected | Total |
|---|---|---|---|
| True null | $U$ | $V$ | $m_0$ |
| True alt. | $T$ | $S$ | $m_1$ |
| **Total** | $m - R$ | $R$ | $m$ |

- $V$ = false positives (type I errors, "false discoveries")
- $T$ = false negatives (type II errors, missed signals)
- $R$ = total rejections (observed)

The **familywise error rate** (FWER): $\text{FWER} = P(V \ge 1)$. The probability of at least one false positive.

For $m$ independent tests each at level $\alpha$: $\text{FWER} = 1 - (1-\alpha)^m \to 1$ as $m \to \infty$.

## Bonferroni correction

The simplest FWER control: reject $H_i$ if $p_i \le \alpha/m$.

**Proof**: By Boole's inequality:

$$P(V \ge 1) = P\left(\bigcup_{i=1}^{m_0} \{p_i \le \alpha/m\}\right) \le \sum_{i=1}^{m_0} P(p_i \le \alpha/m) = m_0 \cdot \frac{\alpha}{m} \le \alpha$$

Bonferroni is **valid for any dependence structure** among tests — a major strength. It is **conservative** when tests are positively correlated, and when $m_0 \ll m$ (many true alternatives), because it divides by $m$ rather than $m_0$.

**Power loss**: the per-test level $\alpha/m = 0.05/20 = 0.0025$ for 20 tests. Requires a much larger effect to achieve significance.

**Šidák correction** (for independent tests): $p_i \le 1 - (1-\alpha)^{1/m}$. Slightly less conservative than Bonferroni; $1 - (1-\alpha)^{1/m} \approx \alpha/m$ for small $\alpha$.

## Holm-Bonferroni procedure

The **Holm step-down procedure** (1979) is uniformly more powerful than Bonferroni while still controlling FWER strongly.

**Algorithm**:
1. Order the $p$-values: $p_{(1)} \le p_{(2)} \le \cdots \le p_{(m)}$
2. Find the smallest $k$ such that $p_{(k)} > \alpha / (m - k + 1)$
3. Reject $H_{(1)}, \ldots, H_{(k-1)}$; do not reject $H_{(k)}, \ldots, H_{(m)}$

Equivalently: reject $H_{(i)}$ if $p_{(j)} \le \alpha/(m-j+1)$ for all $j \le i$.

**Adjusted p-values**: $\tilde{p}_{(i)} = \max_{j \le i} [(m-j+1) p_{(j)}]$, capped at 1.

**Proof sketch**: at step $k$, if $V \ge 1$ (any false positive exists among the $m_0$ true nulls), the probability that the smallest true-null $p$-value is $\le \alpha/(m-k+1)$ is bounded by $\alpha$. The closure principle guarantees strong FWER control.

**Hochberg step-up** (1988): slightly more powerful than Holm under independence; find the largest $k$ such that $p_{(k)} \le \alpha/(m-k+1)$ and reject all $H_{(1)}, \ldots, H_{(k)}$.

## False discovery rate

For large-scale testing (genomics, neuroimaging), FWER is too stringent. The **false discovery rate** (FDR) controls the expected proportion of false discoveries among all rejections:

$$\text{FDR} = E\left[\frac{V}{R} \cdot \mathbf{1}_{R > 0}\right]$$

FDR $\le$ FWER $\le$ 1; FDR control is less stringent and allows more discoveries while bounding the expected contamination rate.

## Benjamini-Hochberg procedure

The **Benjamini-Hochberg (BH) procedure** (1995) controls FDR at level $q$ under independence (and positive dependence — PRDS condition):

**Algorithm**:
1. Order $p$-values: $p_{(1)} \le p_{(2)} \le \cdots \le p_{(m)}$
2. Find $k^* = \max\{k : p_{(k)} \le k \cdot q / m\}$
3. Reject $H_{(1)}, \ldots, H_{(k^*)}$

Equivalently: reject all tests whose $p$-value falls below the BH critical line $i \cdot q/m$ on the $p_{(i)}$ vs. $i$ plot.

**BH controls FDR at $q \cdot m_0/m \le q$** under independence. When few alternatives are true ($m_0 \approx m$), FDR $\approx q$; when many alternatives exist, FDR is conservative.

**Adjusted BH p-values** (q-values): $\tilde{p}_{(i)} = \min_{j \ge i}[m \cdot p_{(j)}/j]$, interpreted as the FDR if $H_{(i)}$ is the marginal rejection.

| Method | Controls | Dependence | Power |
|---|---|---|---|
| Bonferroni | FWER | Any | Low |
| Holm | FWER | Any | Better than Bonferroni |
| Hochberg | FWER | Independence | Slightly better than Holm |
| BH | FDR | Independence/PRDS | High |
| BY | FDR | Any | Moderate |

## The q-value and $\pi_0$ estimation

The **q-value** (Storey 2002) refines BH by estimating the proportion $\pi_0 = m_0/m$ of true nulls:

$$q(p_{(i)}) = \pi_0 \cdot m \cdot p_{(i)} / i$$

Estimating $\pi_0$: the p-value distribution under $H_0$ is Uniform$(0,1)$; under $H_1$, p-values tend to be small. At large $p$-values (e.g., $> \lambda = 0.5$), only null hypotheses contribute. The Storey estimator:

$$\hat{\pi}_0(\lambda) = \frac{\#\{p_i > \lambda\}}{m(1-\lambda)}$$

The optimal $\lambda$ is chosen by a bootstrap or spline-smoothing procedure. Plugging $\hat{\pi}_0 < 1$ into the BH procedure yields the **Storey-BH** or q-value procedure, which is less conservative than standard BH when many true alternatives exist.

## Westfall-Young permutation approach

The **Westfall-Young (WY) permutation** procedure controls FWER while accounting for the actual dependence structure among tests — crucial when tests are highly correlated.

**Step-down WY algorithm**:
1. Compute observed test statistics $t_1, \ldots, t_m$; sort to get $t_{(1)} \ge \cdots \ge t_{(m)}$
2. Permute the outcome (or exposure) labels $B$ times (e.g., $B = 10{,}000$)
3. For each permutation $b$, compute statistics $t_1^{(b)}, \ldots, t_m^{(b)}$ and define:

$$q_k^{(b)} = \max_{j \ge k} t_{(j)}^{(b)}$$

4. Adjusted p-value: $\tilde{p}_{(k)} = \#\{b : q_k^{(b)} \ge t_{(k)}\} / B$, enforced to be non-decreasing

WY is computationally expensive ($B \times m$ statistic computations) but exploits correlation to avoid over-correction. It is the standard in **GWAS** where SNP correlations (linkage disequilibrium) are complex.

## Applications in GWAS

Genome-wide association studies (GWAS) test $m \approx 10^6$–$10^7$ SNPs for association with a trait. The **genome-wide significance threshold** is:

$$p < 5 \times 10^{-8}$$

derived from Bonferroni correction at $\alpha = 0.05$ for approximately $10^6$ independent tests (the effective number of independent SNPs after accounting for LD):

$$\alpha_{\text{adjusted}} = 0.05 / 10^6 = 5 \times 10^{-8}$$

This threshold has become the universal standard for GWAS discoveries. For specific populations or denser arrays, the effective number of independent tests differs — East Asian populations have higher LD, reducing the effective $m$.

**FDR in GWAS**: using BH at $q = 0.05$ would yield far more discoveries but at the cost of many false positives. The FWER threshold $5 \times 10^{-8}$ is preferred for confirmatory discovery because replication is expected and false discoveries have high follow-up costs.

**Regional testing**: for gene-based tests or pathway analyses, the relevant family is genes or pathways, not individual SNPs. Within-gene Bonferroni is applied to the $m_{\text{gene}}$ SNPs in each gene, followed by cross-gene FDR control.

## Comparing FWER and FDR in practice

The choice of error criterion depends on the scientific context:

| Context | Preferred criterion | Reason |
|---|---|---|
| Confirmatory trial (1-2 hypotheses) | FWER (Bonferroni/Holm) | Any false positive costly |
| Exploratory genomics ($m > 10^3$) | FDR (BH/q-value) | Some false positives tolerable |
| GWAS discovery ($m \sim 10^6$) | FWER ($5 \times 10^{-8}$) | Replication expected |
| Neuroimaging ($m \sim 10^5$ voxels) | FDR or cluster-based FWER | Balance sensitivity/specificity |
| Drug safety surveillance | FWER (conservative) | False safety signals dangerous |

The **per-comparison error rate** (no correction) is used in exploratory work where all findings will be replicated, accepting that many individual tests will be false positives.
