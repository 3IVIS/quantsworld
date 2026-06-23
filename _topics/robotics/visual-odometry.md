---
title: "Visual Odometry"
field: robotics
description: Estimating ego-motion from camera images by tracking visual features across frames using epipolar geometry and PnP solvers.
intro: >
  Visual odometry estimates a robot's trajectory by analyzing the motion of visual features
  across sequential camera frames. It provides continuous pose estimation without wheel
  encoders or GPS, making it essential for aerial robots, underwater vehicles, and any
  platform where odometry is unreliable. Drift accumulates over time and is corrected by
  loop closure or IMU fusion.
math_concepts:
  - linear-algebra
  - probability-theory
  - optimization
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Camera Projection Model

The **pinhole camera** maps a 3D point $P = (X, Y, Z)^\top$ in camera coordinates to image pixel $p = (u, v)^\top$:

$$\begin{pmatrix} u \\ v \\ 1 \end{pmatrix} = \frac{1}{Z} K \begin{pmatrix} X \\ Y \\ Z \end{pmatrix}, \qquad K = \begin{pmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{pmatrix}$$

$K$ is the **intrinsic matrix**: $f_x, f_y$ are focal lengths in pixels; $(c_x, c_y)$ is the principal point. Lens **distortion** adds radial and tangential corrections:

$$u_d = u(1 + k_1 r^2 + k_2 r^4) + 2p_1 uv + p_2(r^2 + 2u^2)$$

Intrinsics and distortion coefficients are determined by calibration (Zhang's method using a checkerboard), giving sub-pixel accuracy.

For a stereo rig with baseline $b$ between two cameras, depth is recovered from disparity $d = u_L - u_R$:

$$Z = \frac{f_x \cdot b}{d}$$

Stereo VO avoids the scale ambiguity of monocular VO.

## Feature Extraction and Matching

Visual odometry tracks distinctive image points across frames. The ORB descriptor (Oriented FAST + Rotated BRIEF) is the standard for real-time systems:

- **Keypoint detection**: FAST corner detector identifies candidate points; Harris score selects top-$N$
- **Orientation**: computed from the image moment $m_{pq} = \sum_{x,y} x^p y^q I(x,y)$, giving orientation $\theta = \text{atan2}(m_{01}, m_{10})$
- **Descriptor**: 256-bit binary string from random pixel-pair intensity comparisons at rotated locations

Matching uses Hamming distance between descriptors. The **Lowe ratio test** accepts a match only if:

$$\frac{d_\text{best}}{d_\text{second}} < 0.75$$

This rejects ambiguous matches with a second-best candidate nearly as good.

| Descriptor | Bits | Detection | Matching | Invariance |
|---|---|---|---|---|
| ORB | 256 | FAST | Hamming | Scale, rotation |
| SIFT | 512 (float) | DoG | L2 | Scale, rotation |
| SURF | 256 (float) | Hessian | L2 | Scale, rotation |
| BRIEF | 256 | External | Hamming | None |

## Essential Matrix and 5-Point Algorithm

Given matched point pairs $\{(p_i, p_i')\}$ in two calibrated frames, the **essential matrix** $E \in \mathbb{R}^{3\times3}$ encodes relative rotation $R$ and translation $t$:

$$E = [t]_\times R$$

where $[t]_\times$ is the skew-symmetric matrix of $t$. It satisfies the epipolar constraint for all correspondences:

$$p_i'^\top K^{-\top} E K^{-1} p_i = 0$$

Equivalently, in normalized coordinates $\hat{p} = K^{-1}\tilde{p}$:

$$\hat{p}_i'^\top E \hat{p}_i = 0$$

The **5-point algorithm** (Nistér 2004) recovers $E$ from 5 point correspondences by solving a degree-10 polynomial — the minimum needed for a unique solution (up to scale and the sign of $t$). It is embedded in RANSAC for outlier rejection:

1. Sample 5 random correspondences
2. Compute all $E$ solutions (up to 10)
3. For each $E$, count inliers: $|\hat{p}'^\top E \hat{p}| < \epsilon$
4. Retain $E$ with most inliers
5. Refit $E$ on all inliers

RANSAC runtime scales as $O(\frac{\log(1-p)}{\log(1-(1-e)^5)})$ iterations for inlier fraction $1-e$ and desired success probability $p$. At $e = 0.5$ and $p = 0.99$, this is about 145 iterations.

## PnP: Pose from 3D-2D Correspondences

Given $N$ 3D world points $P_i$ and their 2D image projections $p_i$ in a new frame, the **Perspective-n-Point (PnP)** problem recovers the camera pose $(R, t)$:

$$p_i = \pi(K(RP_i + t))$$

EPnP (Efficient PnP) solves this in $O(N)$ by expressing 3D points as weighted sums of four virtual control points and solving a linear system:

$$\sum_{j=1}^4 \alpha_{ij} \tilde{c}_j = 0 \quad \text{(control point expression)}$$

The result is then polished with nonlinear optimization (Levenberg-Marquardt) minimizing reprojection error:

$$\min_{R,t} \sum_i \left\| p_i - \pi(K(RP_i + t)) \right\|^2$$

In visual odometry, PnP uses map points visible in both the current frame and a recent keyframe to estimate the current camera pose without decomposing a new essential matrix.

## Keyframe Selection and Loop Closure

Not every frame becomes a keyframe. Keyframe selection balances two competing goals:

- **Enough motion**: insert a keyframe when the camera has moved sufficiently ($> f_\text{trans}$ translation or $> f_\text{rot}$ rotation) to triangulate new map points with good geometry
- **Enough overlap**: reject a keyframe if too few tracked features remain (covisibility graph too thin)

**Loop closure** corrects accumulated drift when the robot revisits a known place. The **bag-of-words (BoW)** model represents each image as a histogram over a visual vocabulary of $K$ visual words (cluster centers from $k$-means on descriptor space). Similarity between images is:

$$s(v_1, v_2) = 1 - \frac{1}{2} \left| \frac{v_1}{\|v_1\|_1} - \frac{v_2}{\|v_2\|_1} \right|_1$$

A loop candidate is verified geometrically (PnP + RANSAC) and triggers a pose graph optimization to distribute the accumulated error.

## IMU Fusion and Drift

Visual odometry accumulates drift of $0.1$–$1\%$ of distance traveled, depending on environment texture and speed. Fusing with an IMU (inertial measurement unit) using a **pre-integration model** corrects high-frequency motion and provides metric scale for monocular systems.

IMU pre-integration accumulates measurements $(\hat{a}_k, \hat{\omega}_k)$ between keyframes without re-integrating from the start whenever the pose is updated:

$$\Delta R_{ij} = \prod_{k=i}^{j-1} \exp\!\left((\hat{\omega}_k - b_\omega - \eta_\omega)\Delta t\right)$$

The pre-integrated quantities are treated as relative measurements in a factor graph, solved jointly with visual reprojection factors via bundle adjustment. This **visual-inertial odometry (VIO)** achieves drift below $0.1\%$ on standard benchmarks.
