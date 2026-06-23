---
title: "Quantum Annealing"
field: quantum-computing
description: A metaheuristic for combinatorial optimisation that uses quantum tunnelling to escape local minima in energy landscapes.
intro: >
  Quantum annealing is an optimisation technique that encodes a combinatorial problem into an Ising Hamiltonian and exploits quantum tunnelling — rather than thermal fluctuations — to find low-energy configurations. Starting from a superposition of all states, the system adiabatically evolves from a simple quantum Hamiltonian to one whose ground state encodes the solution. D-Wave Systems produces commercial quantum annealers with thousands of qubits, though demonstrating clear quantum advantage over classical methods remains an active research question.
math_concepts:
  - quantum-mechanics
  - optimization
  - dynamical-systems
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## The Ising Model

The **Ising model** is the canonical formulation for combinatorial optimisation on quantum annealers. The classical Ising Hamiltonian is:

$$H_{\text{Ising}} = -\sum_{\langle i,j\rangle} J_{ij}\sigma_i^z\sigma_j^z - \sum_i h_i\sigma_i^z$$

where $\sigma_i^z \in \{-1, +1\}$ are classical spin variables, $J_{ij}$ are pairwise coupling strengths, and $h_i$ are local bias fields. Finding the ground state (minimum energy configuration) is equivalent to solving a **spin glass** problem.

**NP-hardness:** The Ising problem on general graphs is NP-hard. Polynomial-time algorithms exist only for special topologies (planar graphs in zero field, 1D chains).

**Ground state energy:** For a configuration $\boldsymbol{\sigma} = (\sigma_1, \ldots, \sigma_n)$:

$$E(\boldsymbol{\sigma}) = -\sum_{i<j} J_{ij}\sigma_i\sigma_j - \sum_i h_i\sigma_i$$

The energy landscape has $2^n$ local minima. For random Gaussian couplings $J_{ij} \sim \mathcal{N}(0, J^2/n)$, the number of local minima grows exponentially: $\mathcal{N}_{\text{min}} \sim e^{\alpha n}$ for $\alpha \approx 0.199$.

## QUBO Formulation

**Quadratic Unconstrained Binary Optimisation (QUBO)** is the natural form for programming quantum annealers. With binary variables $q_i \in \{0, 1\}$ (related to Ising spins by $\sigma_i = 1 - 2q_i$):

$$\min_{\mathbf{q}} \mathbf{q}^T Q\,\mathbf{q} = \min_{\mathbf{q}}\sum_{i \leq j} Q_{ij}\, q_i\, q_j$$

where $Q$ is an upper-triangular matrix encoding the objective and constraints. QUBO subsumes many NP-hard problems:

| Problem | QUBO formulation |
|---|---|
| Max-Cut | $Q_{ij} = -W_{ij}$ for edges, adjust diagonals |
| Graph colouring | Penalty for same-colour adjacent nodes |
| Portfolio optimisation | Risk matrix $\Sigma$, expected return $\mu$ |
| Number partitioning | $Q_{ij} = 2n_in_j$, $Q_{ii} = n_i(n_i - N_{\text{target}})$ |
| Travelling salesman | Time-city pairings with distance costs and constraints |

**Conversion:** A QUBO with $n$ variables and $m$ constraints penalised by $\lambda$ becomes:

$$H = \mathbf{q}^T Q\,\mathbf{q} + \lambda\sum_c (\text{constraint violation})^2$$

The penalty weight $\lambda$ must exceed the maximum objective value to ensure feasible solutions dominate.

## Adiabatic Theorem

The adiabatic quantum annealing schedule interpolates between an initial Hamiltonian $H_0$ (with easily prepared ground state) and the problem Hamiltonian $H_P$:

$$H(s) = (1-s)H_0 + s\,H_P, \quad s = t/T \in [0, 1]$$

where $T$ is the total annealing time. The **transverse field Hamiltonian** serves as $H_0$:

$$H_0 = -\Gamma\sum_i \sigma_i^x$$

with $\Gamma > 0$. The ground state of $H_0$ is the uniform superposition $|+\rangle^{\otimes n} = \frac{1}{\sqrt{2^n}}\sum_{\boldsymbol{\sigma}}|\boldsymbol{\sigma}\rangle$, easily prepared by applying $H^{\otimes n}$ to $|0\rangle^{\otimes n}$.

**Adiabatic theorem:** If the evolution is sufficiently slow, the system remains in the instantaneous ground state throughout. The required annealing time satisfies:

$$T \gg \frac{\max_s \|\partial_s H(s)\|}{g_{\min}^2}$$

where $g_{\min} = \min_s [E_1(s) - E_0(s)]$ is the minimum spectral gap between ground state and first excited state. For NP-hard instances, $g_{\min}$ typically closes exponentially in $n$, requiring exponential $T$ for adiabatic success.

## Quantum Tunnelling vs Thermal Fluctuations

The key distinction between quantum annealing and classical **simulated annealing** (SA):

**Simulated annealing** escapes local minima by thermal fluctuations. The acceptance probability for a configuration change increasing energy by $\Delta E$ is:

$$P_{\text{accept}} = e^{-\Delta E / k_B T}$$

Thermal fluctuations scale as barriers scale: tall, wide energy barriers are equally costly to cross thermally regardless of width.

**Quantum annealing** escapes via tunnelling. The tunnelling amplitude through a barrier of height $\Delta E$ and width $W$ scales as:

$$A_{\text{tunnel}} \sim e^{-W\sqrt{2m\Delta E}/\hbar}$$

Crucially, tunnelling amplitude is suppressed by barrier **width** but less sensitive to height than classical thermal hopping. This provides advantage when barriers are:
- **Tall and thin:** Quantum tunnelling wins.
- **Shallow and wide:** Thermal fluctuations win.

For the double-well potential $V(x) = \lambda(x^2 - a^2)^2$:

$$\Delta_{\text{tunnel}} = \frac{8\lambda a^3}{\sqrt{\pi}}\left(\frac{2\lambda}{m\omega_0^2}\right)^{1/2} e^{-2\lambda a^4/3\hbar\omega_0}$$

The exponential suppression $\sim e^{-a^4}$ shows that wide barriers severely limit tunnelling.

## D-Wave Architecture and Graph Embedding

D-Wave quantum annealers implement the Ising model on a specific hardware graph. The **Pegasus** graph (D-Wave Advantage) has approximately 5000 qubits with each qubit connected to up to 15 others.

**Chimera graph** (earlier D-Wave models): Bipartite graph $C_{L,L,K}$ with $L \times L$ unit cells each containing $K+K$ qubits. $C_{16,16,4}$ gives 2048 qubits with degree 6 connectivity.

**Embedding problem:** Most optimisation problems require connections between arbitrary qubit pairs. Since the hardware graph is sparse, "logical" qubits must be implemented as chains of physical qubits:

$$\sigma_i^{\text{logical}} \leftrightarrow \text{chain: } \sigma_{i_1}^{\text{physical}} = \sigma_{i_2}^{\text{physical}} = \ldots = \sigma_{i_k}^{\text{physical}}$$

enforced by strong ferromagnetic couplings $J_{\text{chain}} \ll 0$. For a $K_n$ complete graph, the minimum chain length on Chimera is $\Omega(\sqrt{n})$, and on Pegasus $\Omega(\sqrt{n/6})$, limiting the effective problem size.

**Minor embedding** is itself NP-hard in general, though heuristic methods (D-Wave's minorminer) work well in practice.

## Performance: Comparison with Classical Solvers

The question of quantum advantage for quantum annealing is nuanced:

**Benchmark studies:**

| Study | Problem | Finding |
|---|---|---|
| Rønnow et al. (2014) | Random Ising | D-Wave 2 shows no speedup vs SA |
| Denchev et al. (2016) | Weak-strong cluster | D-Wave 2X: $10^8\times$ faster than SA on tuned instances |
| King et al. (2023) | Frustrated loop model | Computational phase transition, QA advantage on specific instances |
| Willsch et al. (2022) | MAX-2-SAT | Best classical SDP solver outperforms D-Wave |

The challenge: SA is a weak baseline. Comparison against best-in-class classical solvers (Gurobi, CPLEX, simulated bifurcation machines) typically shows no consistent quantum advantage for current hardware.

**Potential advantage regime:** Problems with a specific energy landscape structure — tall narrow barriers, proximity to phase transitions — may see advantage. Identifying these remains an open problem.

## Applications to Combinatorial Optimisation

Despite unresolved advantage questions, quantum annealing has been applied to:

**Portfolio optimisation:** With $n$ assets, budget constraint $B$, and binary allocation $q_i \in \{0,1\}$:

$$\min_{\mathbf{q}}\; \mathbf{q}^T \Sigma \mathbf{q} - \mu\boldsymbol{\mu}^T\mathbf{q} + \lambda\left(\sum_i q_i - B\right)^2$$

where $\Sigma$ is the covariance matrix and $\boldsymbol{\mu}$ the expected returns vector.

**Traffic flow optimisation:** Beijing traffic routing (Volkswagen, 2019): Assign each of $N$ vehicles a route $r \in \{1,\ldots,R\}$ minimising total travel time, accounting for congestion interactions.

**Drug discovery:** Protein folding on lattice models and molecular docking with interaction energies encoded as Ising couplings.

**Machine learning:** Training Boltzmann machines: sample from $P(\mathbf{v}) \propto \sum_{\mathbf{h}} e^{-E(\mathbf{v},\mathbf{h})}$ using the quantum annealer as a sampler for the hidden variables.
