---
title: "Quantum Key Distribution"
field: quantum-computing
description: Protocols for distributing cryptographic keys with information-theoretic security guaranteed by the laws of quantum mechanics.
intro: >
  Quantum key distribution (QKD) enables two parties to establish a shared secret key whose security is guaranteed by quantum physics rather than computational hardness assumptions. Any eavesdropper attempting to measure the transmitted quantum states unavoidably disturbs them, revealing their presence. Unlike RSA or elliptic-curve cryptography, QKD remains secure even against adversaries with unlimited computational power, including quantum computers.
math_concepts:
  - information-theory
  - quantum-mechanics
  - probability-theory
difficulty: advanced
difficulty_level: 4
read_time: 14
---

## BB84 Protocol

The **BB84 protocol** (Bennett and Brassard, 1984) is the foundational QKD scheme. Alice encodes bits in single-qubit states across two mutually unbiased bases:

| Bit | Rectilinear basis $\{|0\rangle, |1\rangle\}$ | Diagonal basis $\{|+\rangle, |-\rangle\}$ |
|---|---|---|
| 0 | $\|0\rangle$ | $\|+\rangle = \frac{1}{\sqrt2}(\|0\rangle+\|1\rangle)$ |
| 1 | $\|1\rangle$ | $\|-\rangle = \frac{1}{\sqrt2}(\|0\rangle-\|1\rangle)$ |

**Protocol steps:**

1. **Transmission:** Alice chooses a random bit $b \in \{0,1\}$ and a random basis $\beta \in \{Z, X\}$, then sends the corresponding state.

2. **Measurement:** Bob independently chooses a random basis $\beta' \in \{Z, X\}$ and measures each received qubit.

3. **Sifting:** Alice and Bob publicly announce (over an authenticated classical channel) which basis they used for each qubit. They keep only the positions where $\beta = \beta'$ — the **sifted key** — discarding the rest. On average, half the bits survive.

4. **Error estimation:** They sacrifice a random subset of the sifted key to estimate the **quantum bit error rate (QBER)**: $Q = P(\text{disagreement})$.

5. **Error correction:** Using a classical error-correcting code (e.g., cascade protocol) over the public channel, they reconcile their keys. This leaks $h(Q)$ bits per sifted bit (where $h$ is the binary entropy function).

6. **Privacy amplification:** They apply a random hash function to compress the reconciled key, reducing Eve's information to a negligible amount. The final key rate is:

$$R = 1 - 2h(Q) \quad \text{(Shor-Preskill bound)}$$

where $h(Q) = -Q\log_2 Q - (1-Q)\log_2(1-Q)$. If $Q > (1-1/\sqrt{2}) \approx 11\%$, the protocol aborts.

## Intercept-Resend Attack Detection

An eavesdropper Eve intercepting BB84 faces a fundamental dilemma: she cannot determine Alice's basis without a $50\%$ chance of choosing the wrong one.

**Intercept-resend attack:** Eve measures each qubit in a randomly chosen basis and resends the post-measurement state to Bob.

**Analysis:** When Eve's basis $\beta_E \neq \beta_A$ (probability $1/2$), she sends the wrong state. Bob, measuring in the correct basis $\beta_B = \beta_A$, gets the wrong answer with probability $1/2$.

$$P(\text{error}) = P(\beta_E \neq \beta_A) \cdot P(\text{Bob wrong}|\text{Eve wrong basis}) = \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}$$

Eve's intervention introduces a QBER of $Q = 25\%$, far above the $11\%$ threshold — the attack is detected.

**Intercept-resend with optimal strategy:** Eve measures in the $(\hat{x}+\hat{z})/\sqrt{2}$ axis (the Breidbart basis), achieving QBER $= 1 - \cos^2(\pi/8) \approx 14.6\%$, still detectable but maximising her information. No classical strategy can avoid this noise penalty.

## Information-Theoretic Security

The security of BB84 rests on **information-theoretic** (unconditional) security, proven by Mayers (1996) and Shor-Preskill (2000).

The Shor-Preskill proof reduces BB84 security to entanglement distillation:

1. Consider the **entanglement-based** version: Alice prepares Bell pairs $|\Phi^+\rangle$ and sends one qubit to Bob, keeping the other. Measuring in random bases on her qubit simulates BB84's state preparation.

2. Eve's intervention creates a mixed state $\rho_{ABE}$ involving Alice, Bob, and Eve's ancilla.

3. If the QBER is $Q < 11\%$, there exists an error-correcting code $C$ such that after error correction and privacy amplification, Eve's mutual information satisfies:

$$I(K; E) \leq 2^{-\ell}$$

for an arbitrarily long final key $K$ of length $\ell$.

The **composable security** framework (Renner 2005) gives a stronger statement using the **smooth min-entropy** $H_{\min}^\varepsilon(\rho_{AB}\|\sigma_B)$: the key rate is bounded by:

$$\ell \leq H_{\min}^\varepsilon(A|E) - \text{(error correction leakage)}$$

This holds against the most general quantum attacks (coherent attacks on all $n$ qubits simultaneously) by the quantum de Finetti theorem or the entropy accumulation theorem.

## E91 Protocol (Entanglement-Based)

Ekert's **E91 protocol** (1991) uses entangled Bell pairs distributed between Alice and Bob.

1. A source emits pairs in the singlet state $|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|01\rangle - |10\rangle)$.

2. Alice measures in bases $\{0°, 45°, 90°\}$ and Bob in $\{45°, 90°, 135°\}$.

3. They announce bases publicly and compute the **CHSH correlator** $\mathcal{S}$ from the non-shared basis measurements.

4. **Security check:** $\mathcal{S} = 2\sqrt{2}$ certifies that the states are maximally entangled (no Eve). If $\mathcal{S} < 2\sqrt{2}$, Eve may be present.

5. The shared-basis measurement outcomes form the raw key.

E91 security relies on the violation of Bell inequalities — any eavesdropper reduces the correlations, lowering $\mathcal{S}$. This provides **device-independent** security in principle: the security guarantee holds even if the measurement devices are untrusted.

## Practical Implementation Challenges

Real QKD systems face several departures from the ideal single-photon model:

**Photon number splitting (PNS) attack:** Weak coherent pulse (WCP) sources emit Poissonian photon numbers:

$$P(n) = \frac{\mu^n e^{-\mu}}{n!}$$

Multi-photon pulses allow Eve to split off one photon (retaining it) and forward the rest — gaining full information on multi-photon pulses without introducing errors. The fraction of multi-photon pulses scales as $\mu^2/2$, limiting the secure key rate.

**Decoy state method:** Alice randomly sends different intensity levels (signal, decoy$_1$, decoy$_2$). By comparing statistics across intensities, she can detect PNS attacks and bound Eve's information. Decoy-state BB84 achieves a key rate:

$$R \geq q\left[-Q_\mu h(E_\mu) + Q_1[1 - h(e_1)]\right]$$

where $Q_\mu, E_\mu$ are observed gain and QBER, $Q_1, e_1$ are estimated single-photon gain and error rate, and $q = 1/2$ is the sifting efficiency.

**Channel loss and distance limits:**

| Distance | Fibre loss (0.2 dB/km) | Transmission | Key rate |
|---|---|---|---|
| 50 km | 10 dB | $10^{-1}$ | $\sim$ Mbps |
| 100 km | 20 dB | $10^{-2}$ | $\sim$ kbps |
| 200 km | 40 dB | $10^{-4}$ | $\sim$ bps |
| $> 300$ km | $> 60$ dB | $< 10^{-6}$ | Impractical |

The **PLOB bound** (Pirandola, Laurenza, Ottaviani, Banchi 2017) gives the fundamental key-rate capacity of a lossy channel $\eta$:

$$R \leq -\log_2(1-\eta) \approx \eta/\ln 2 \quad (\eta \ll 1)$$

## MDI-QKD and Twin-Field QKD

**Measurement-Device-Independent QKD (MDI-QKD):** Removes all detector side-channel attacks by having both Alice and Bob send states to an untrusted relay Charlie who performs a Bell measurement:

$$|\Psi^-\rangle_{A'B'} \longrightarrow \text{Charlie announces Bell outcome} \longrightarrow \text{Alice and Bob correlate}$$

Security is maintained even if Charlie is Eve. MDI-QKD is practical with current technology and has been demonstrated over metropolitan-scale networks.

**Twin-Field QKD (TF-QKD):** Extends distance by having Alice and Bob send coherent states that interfere at a central relay, using single-photon interference rather than coincidence detection. The key rate scales as $O(\sqrt{\eta})$ rather than $O(\eta)$, overcoming the PLOB bound for point-to-point with a relay:

$$R_{\text{TF}} \sim O(\sqrt{\eta}), \quad R_{\text{BB84}} \sim O(\eta)$$

This enables secure key distribution over $\sim 500$ km of optical fibre.

## QKD Network Deployments

Commercial and governmental QKD networks have been deployed worldwide:

| Network | Location | Year | Technology |
|---|---|---|---|
| SECOQC | Vienna | 2008 | Multi-node, 200 km |
| Tokyo QKD Network | Japan | 2010 | 4-node metropolitan |
| Jiuquan-Beijing | China | 2017 | Satellite + ground, 2000 km |
| Cambridge QN | UK | 2019 | Metropolitan ring |
| EuroQCI | Europe | 2023+ | EU quantum internet initiative |

Satellite QKD (Micius satellite, China 2017) demonstrated $\sim 1200$ km ground-to-ground QKD using satellite relay with a key rate of $\sim 1$ kbps in a 275-second window — the first intercontinental QKD demonstration.
