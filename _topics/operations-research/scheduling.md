---
title: "Job Scheduling"
field: operations-research
description: Minimizing makespan and completion times in single-machine, multi-machine, and project scheduling settings.
intro: >
  Job scheduling studies how to order tasks on machines to optimize objectives such as makespan, weighted completion time, or lateness. From simple SPT rules on a single machine to NP-hard multi-machine problems, scheduling theory draws on combinatorics, linear programming, and graph algorithms. Practical tools such as PERT/CPM and Johnson's algorithm give exact solutions in tractable special cases.
math_concepts:
  - linear-programming
  - graph-theory
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## Scheduling Notation and Objectives

A scheduling problem is described by the triple $\alpha \mid \beta \mid \gamma$, where $\alpha$ denotes the machine environment, $\beta$ encodes job characteristics, and $\gamma$ is the objective.

**Basic parameters for $n$ jobs and $m$ machines:**

| Symbol | Meaning |
|--------|---------|
| $p_j$ | Processing time of job $j$ |
| $r_j$ | Release time (earliest start) of job $j$ |
| $d_j$ | Due date of job $j$ |
| $w_j$ | Weight (priority) of job $j$ |
| $C_j$ | Completion time of job $j$ |
| $L_j = C_j - d_j$ | Lateness |
| $T_j = \max(L_j, 0)$ | Tardiness |

Common objectives:

$$C_{\max} = \max_j C_j \quad \text{(makespan)}$$

$$\sum w_j C_j \quad \text{(weighted completion time)}$$

$$\sum w_j T_j \quad \text{(weighted tardiness)}$$

The makespan $C_{\max}$ measures the time to finish all jobs; minimizing it maximizes machine utilization. Weighted completion time balances throughput against job priorities.

## Single-Machine Scheduling

### Makespan

On a single machine, jobs must be processed one at a time without preemption. Since all jobs must be processed, $C_{\max} = \sum_{j=1}^n p_j$ regardless of order. Makespan minimization on a single machine is trivial — any sequence is optimal.

### SPT Rule and Total Completion Time

To minimize $\sum C_j$, sequence jobs in **Shortest Processing Time (SPT)** order: $p_{[1]} \leq p_{[2]} \leq \cdots \leq p_{[n]}$.

**Proof.** In sequence $\sigma$, the completion time of the $k$-th job is:

$$C_{[k]} = \sum_{i=1}^{k} p_{[i]}$$

Therefore:

$$\sum_{k=1}^n C_{[k]} = \sum_{k=1}^n \sum_{i=1}^k p_{[i]} = \sum_{i=1}^n (n - i + 1)\, p_{[i]}$$

This is minimized when larger coefficients $(n - i + 1)$ multiply smaller processing times, i.e., when jobs are sorted by $p_j$ ascending. $\square$

**Example.** Four jobs with $p = (6, 2, 4, 3)$. SPT order: $(2, 3, 4, 6)$.

$$\sum C_j = 2 + 5 + 9 + 15 = 31$$

Any other order gives a larger sum.

### Weighted Completion Time

For $\sum w_j C_j$, the **WSPT rule** (Weighted SPT) sequences jobs by increasing ratio $p_j / w_j$:

$$\frac{p_{[1]}}{w_{[1]}} \leq \frac{p_{[2]}}{w_{[2]}} \leq \cdots \leq \frac{p_{[n]}}{w_{[n]}}$$

**Adjacent exchange argument.** Consider two adjacent jobs $a, b$. Ordering $a$ before $b$ gives cost contribution:

$$w_a C_a + w_b(C_a + p_b) = w_a C_a + w_b C_a + w_b p_b$$

Ordering $b$ before $a$:

$$w_b C_b + w_a(C_b + p_a) = w_b C_b + w_a C_b + w_a p_a$$

Prefer $a$ before $b$ when $w_b p_a > w_a p_b$, i.e., $p_a / w_a < p_b / w_b$.

### Release Times and Preemption

With release times $r_j$ (jobs unavailable before their release), the problem $1 \mid r_j \mid C_{\max}$ remains trivial, but $1 \mid r_j \mid \sum C_j$ is NP-hard without preemption.

With preemption allowed, the **Preemptive SPT** rule solves $1 \mid r_j, \text{pmtn} \mid \sum C_j$ optimally: always process the available job with shortest remaining time.

## Precedence Constraints and PERT/CPM

Many projects require that certain jobs finish before others can start. These dependencies form a **DAG** (directed acyclic graph) $G = (V, E)$ where $(i, j) \in E$ means job $i$ must finish before job $j$ starts.

### Critical Path Method (CPM)

Define the **earliest start time** $ES_j$ and **earliest finish time** $EF_j$:

$$ES_j = \max_{i \in \text{pred}(j)} EF_i, \qquad EF_j = ES_j + p_j$$

And **latest start** $LS_j$, **latest finish** $LF_j$ (backward pass from the project deadline $D$):

$$LF_j = \min_{k \in \text{succ}(j)} LS_k, \qquad LS_j = LF_j - p_j$$

The **total float** of job $j$ is $F_j = LS_j - ES_j \geq 0$.

Jobs with $F_j = 0$ lie on the **critical path** — the longest path through the DAG:

$$C_{\max} = \text{length of longest path in } G$$

Finding the critical path runs in $O(|V| + |E|)$ via topological sort.

### PERT: Probabilistic Durations

PERT (Program Evaluation and Review Technique) treats $p_j$ as random. Using a beta-distribution approximation:

$$\mathbb{E}[p_j] = \frac{a_j + 4m_j + b_j}{6}, \qquad \text{Var}(p_j) = \left(\frac{b_j - a_j}{6}\right)^2$$

where $a_j$, $m_j$, $b_j$ are optimistic, most likely, and pessimistic estimates. The project duration variance is approximated by summing variances along the critical path.

## Two-Machine Flow Shop: Johnson's Algorithm

In a **flow shop**, all jobs are processed first on machine 1, then on machine 2, in the same order. The problem $F2 \mid\mid C_{\max}$ is solvable in $O(n \log n)$ by **Johnson's algorithm**.

**Algorithm.** Partition jobs into two sets:
- $U = \{j : p_{1j} \leq p_{2j}\}$ — process these **first**, sorted by $p_{1j}$ ascending
- $V = \{j : p_{1j} > p_{2j}\}$ — process these **last**, sorted by $p_{2j}$ descending

Concatenate $U$ then $V$.

**Example.** Five jobs:

| Job | $p_{1j}$ | $p_{2j}$ |
|-----|----------|----------|
| A | 3 | 7 |
| B | 8 | 2 |
| C | 5 | 5 |
| D | 2 | 6 |
| E | 6 | 1 |

Set $U = \{A, D, C\}$ (sorted: D, A, C); $V = \{B, E\}$ (sorted: B, E). Optimal sequence: D, A, C, B, E.

**Makespan calculation** via Gantt chart (tracking machine 2's idle and busy periods):

$$C_{\max} = \max_{k} \left( \sum_{j=1}^k p_{1,[j]} + \sum_{j=k}^n p_{2,[j]} \right)$$

## Complexity and LP Relaxations

Most multi-machine scheduling problems are NP-hard. Key hardness results:

| Problem | Complexity |
|---------|-----------|
| $1 \mid\mid \sum w_j T_j$ | NP-hard |
| $P2 \mid\mid C_{\max}$ | NP-hard (partition) |
| $F3 \mid\mid C_{\max}$ | NP-hard |
| $1 \mid r_j \mid \sum C_j$ | NP-hard |
| $P \mid\mid C_{\max}$ | Strongly NP-hard |

**LP relaxation for $\sum w_j C_j$.** A time-indexed LP introduces binary variable $x_{jt} = 1$ if job $j$ completes at time $t$:

$$\min \sum_j \sum_t w_j t \, x_{jt}$$

$$\text{s.t.} \quad \sum_t x_{jt} = 1 \;\forall j, \quad \sum_j \sum_{\tau \leq t} p_j x_{j\tau} \leq t \;\forall t, \quad x_{jt} \geq 0$$

The LP gives a $\frac{3}{2}$-approximation after randomized rounding: schedule jobs in order of their LP completion times. Better approximations use the **preemptive schedule lower bound**:

$$C_{\max}^* \geq \max\left(\max_j p_j,\; \frac{1}{m}\sum_j p_j\right)$$

List scheduling algorithms (LPT — Longest Processing Time first) achieve a $\frac{4}{3} - \frac{1}{3m}$ approximation for $P \mid\mid C_{\max}$.
