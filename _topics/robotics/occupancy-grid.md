---
title: "Occupancy Grid Mapping"
field: robotics
description: Bayesian grid-based environment representation where each cell independently tracks its probability of being occupied.
intro: >
  Occupancy grid mapping divides the environment into a regular grid of cells and maintains
  a probabilistic estimate of occupancy for each cell independently. Sensor observations
  update each cell via Bayes' theorem in log-odds form, enabling efficient incremental
  map building from noisy range sensors such as lidar and sonar.
math_concepts:
  - bayes-theorem
  - probability-theory
  - information-theory
difficulty: intermediate
difficulty_level: 3
read_time: 10
---

## Binary Occupancy Model

Each cell $c$ in the grid has a binary state: occupied ($o_c = 1$) or free ($o_c = 0$). The belief about cell $c$ after $t$ observations is:

$$p(o_c = 1 \mid z_{1:t})$$

Under the assumption that cells are **independent** and each observation depends only on the cell it observes (not neighbors), the joint map belief factorizes:

$$p(m \mid z_{1:t}, x_{1:t}) = \prod_c p(o_c \mid z_{1:t}^c)$$

where $z_{1:t}^c$ denotes all observations relevant to cell $c$. This independence assumption is the defining approximation of occupancy grids — it ignores spatial correlations but enables $O(1)$ per-cell updates.

## Log-Odds Representation

Working directly with probabilities requires dividing by potentially tiny numbers. The **log-odds ratio** avoids numerical issues and converts Bayesian updates to additions:

$$l_t = \log \frac{p(o_c = 1 \mid z_{1:t})}{p(o_c = 0 \mid z_{1:t})}$$

Applying Bayes' rule iteratively:

$$\frac{p(o_c \mid z_{1:t})}{1 - p(o_c \mid z_{1:t})} = \frac{p(z_t \mid o_c)}{p(z_t \mid \neg o_c)} \cdot \frac{p(o_c \mid z_{1:t-1})}{1 - p(o_c \mid z_{1:t-1})} \cdot \frac{1 - p_0}{p_0}$$

Taking the logarithm transforms this multiplication into the recursive update:

$$l_t = l_{t-1} + \underbrace{\log\frac{p(o_c \mid z_t)}{1-p(o_c \mid z_t)}}_{l_\text{sensor}(z_t, c)} - \underbrace{\log\frac{p_0}{1-p_0}}_{l_0}$$

The **inverse sensor model** $l_\text{sensor}(z_t, c)$ encodes how much a measurement $z_t$ changes the belief about cell $c$. The prior $l_0$ is typically 0 (uniform $p_0 = 0.5$).

Recovery of probability: $p = 1 - \frac{1}{1 + e^{l_t}}$.

## Inverse Sensor Model for Lidar

A lidar emits a ray at angle $\phi$ from the robot pose $(x_r, y_r, \theta_r)$ and returns range $r$. The inverse sensor model assigns log-odds increments along the ray:

$$l_\text{sensor}(z, c) = \begin{cases} l_\text{occ} & \text{if } d(c) \in [r - \epsilon,\, r + \epsilon] \text{ (at endpoint)} \\ l_\text{free} & \text{if } d(c) < r - \epsilon \text{ (along ray)} \\ 0 & \text{if } d(c) > r + \epsilon \text{ (beyond return)} \end{cases}$$

where $d(c)$ is the range to cell center $c$ along the ray, $l_\text{occ} > 0$ (typically $+0.9$), $l_\text{free} < 0$ (typically $-0.7$), and $\epsilon$ is half the sensor footprint.

**Ray casting** traces each beam through the grid using Bresenham's line algorithm, updating every cell the ray passes through. For a 360° lidar with 1000 beams and grid resolution 5 cm, this is roughly $5000$–$10{,}000$ cell updates per scan.

To prevent runaway accumulation, log-odds values are clamped: $l_t \in [l_\text{min}, l_\text{max}]$ (e.g., $[-5, 5]$).

| Sensor type | Typical $l_\text{occ}$ | Typical $l_\text{free}$ | Range |
|---|---|---|---|
| Lidar (2D) | $+0.9$ | $-0.4$ | 0.1–100 m |
| Ultrasonic sonar | $+0.5$ | $-0.2$ | 0.02–5 m |
| Depth camera | $+0.7$ | $-0.4$ | 0.3–8 m |

## 3D Voxel Maps and OctoMap

Extending to 3D replaces cells with voxels. A $1000 \times 1000 \times 100$ grid at 5 cm resolution requires $10^7$ cells, each storing a float — about 40 MB, feasible but wasteful since most cells are free.

**OctoMap** represents the 3D occupancy grid as an octree, recursively subdividing space and pruning homogeneous regions. A free subtree is stored as a single node regardless of depth, achieving compression ratios of 50–100× in practice. Updates propagate from leaf nodes to parents, aggregating occupancy estimates.

The memory cost of OctoMap is $O(S)$ where $S$ is the number of distinct surfaces, not the volume — ideal for indoor mapping where occupied regions are sparse.

## Signed Distance Fields

A **signed distance field (SDF)** stores at each voxel the signed Euclidean distance to the nearest surface:

$$\text{SDF}(x) = \begin{cases} +d(x, \partial\mathcal{O}) & x \in \mathcal{C}_\text{free} \\ -d(x, \partial\mathcal{O}) & x \in \mathcal{C}_\text{obs} \end{cases}$$

SDFs enable $O(1)$ collision checking (query SDF at robot link positions), smooth gradient computation for trajectory optimization, and fast nearest-obstacle lookup. They are computed from occupancy grids via the Fast Marching Method or GPU-parallel distance transforms.

**TSDF (Truncated SDF)**, used in KinectFusion-style dense reconstruction, truncates values beyond $\pm \delta$ from the surface and fuses depth images directly:

$$\text{TSDF}(x) \leftarrow \frac{W(x) \cdot \text{TSDF}(x) + w_\text{new} \cdot \text{SDF}_\text{new}(x)}{W(x) + w_\text{new}}$$

The mesh is extracted via the Marching Cubes algorithm on the zero level set.

## Comparison with Landmark Maps

| Property | Occupancy Grid | Landmark Map |
|---|---|---|
| Environment type | Unstructured | Structured |
| Storage | $O(A/r^2)$, area/resolution | $O(N)$, number of features |
| Update | $O(1)$ per cell | $O(N^2)$ (EKF-SLAM) |
| Path planning | Direct (A*, D*) | Requires additional planner |
| Loop closure | Hard | Natural (feature matching) |
| Semantic info | None | Feature identity |

Occupancy grids dominate mobile robotics for navigation due to their simplicity and directness; landmark maps are preferred for long-range SLAM where metric drift dominates.
