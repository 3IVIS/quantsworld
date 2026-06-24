---
title: "Nucleosynthesis"
field: astrophysics
description: The nuclear processes that forge every element from hydrogen to uranium inside stars, supernovae, and the Big Bang.
intro: >
  Every atom heavier than hydrogen was either created in the first three minutes of the universe or forged in the nuclear furnaces of stars and their explosive deaths. Big Bang nucleosynthesis set the primordial abundances of hydrogen, helium, and trace lithium, while stellar nucleosynthesis has been enriching the cosmos ever since. Understanding which nuclear burning channel produces which element requires tracking reaction rates, quantum tunneling probabilities, and the thermodynamic conditions inside each stellar site.
math_concepts:
  - quantum-mechanics
  - probability-theory
  - differential-equations
  - numerical-methods
difficulty: advanced
difficulty_level: 4
read_time: 12
---

## Big Bang Nucleosynthesis

During the first $\sim 20$ minutes after the Big Bang, temperatures fell from $\sim 10^{10}\ \text{K}$ to $\sim 10^9\ \text{K}$, allowing protons and neutrons to fuse into light nuclei. The neutron-to-proton ratio at freeze-out ($T \approx 8 \times 10^9\ \text{K}$) is set by the weak interaction rates:

$$\frac{n}{p} = \exp\!\left(-\frac{\Delta m c^2}{k_B T_f}\right) \approx \frac{1}{7}$$

where $\Delta m c^2 = 1.293\ \text{MeV}$ is the neutron-proton mass difference. This ratio, combined with the baryon-to-photon ratio $\eta = n_b/n_\gamma \approx 6 \times 10^{-10}$, predicts primordial mass fractions:

| Nucleus | Predicted mass fraction | Observed |
|---|---|---|
| ${}^1$H | $\approx 0.752$ | $0.752 \pm 0.002$ |
| ${}^4$He | $\approx 0.247$ | $0.245 \pm 0.003$ |
| ${}^2$H | $\approx 2.6 \times 10^{-5}$ | $\sim 2.5 \times 10^{-5}$ |
| ${}^7$Li | $\approx 5 \times 10^{-10}$ | $\sim 1.6 \times 10^{-10}$ (lithium problem) |

The remarkable agreement for H and He is a pillar of standard cosmology.

## The Gamow Peak and Stellar Reaction Rates

Thermonuclear reactions inside stars require nuclei to tunnel through the Coulomb barrier. The quantum tunneling probability falls exponentially with energy, while the Maxwell-Boltzmann thermal distribution cuts off at high energies. The product defines the **Gamow peak**: a narrow window of energies where reactions actually occur.

The Gamow peak energy for charges $Z_1$ and $Z_2$ with reduced mass $\mu$ is:

$$E_G = \left(\frac{b}{2}\right)^{2/3}(k_B T)^{2/3}, \qquad b = \pi \alpha Z_1 Z_2 \sqrt{2\mu c^2}$$

where $\alpha \approx 1/137$ is the fine-structure constant. The thermonuclear reaction rate per particle pair is:

$$\langle \sigma v \rangle = \sqrt{\frac{8}{\pi \mu}} \frac{1}{(k_B T)^{3/2}} \int_0^\infty E\,\sigma(E)\,e^{-E/k_B T}\,dE$$

The integrand is sharply peaked around $E_G$, allowing a Gaussian approximation. For the $pp$ reaction at the solar core temperature $T \approx 1.5 \times 10^7\ \text{K}$, $E_G \approx 6\ \text{keV}$—far above the thermal mean but far below the barrier height $\sim 1\ \text{MeV}$.

## Hydrogen Burning: pp Chain and CNO Cycle

Two pathways fuse four protons into one ${}^4$He nucleus releasing $Q_\text{eff} \approx 26.7\ \text{MeV}$ (minus neutrino losses):

**pp chain** (dominates for $M \lesssim 1.5\,M_\odot$, $T_c \lesssim 1.7 \times 10^7\ \text{K}$):

$${}^1\text{H} + {}^1\text{H} \to {}^2\text{H} + e^+ + \nu_e, \quad {}^2\text{H} + {}^1\text{H} \to {}^3\text{He} + \gamma, \quad {}^3\text{He} + {}^3\text{He} \to {}^4\text{He} + 2\,{}^1\text{H}$$

Energy generation scales as $\varepsilon_{pp} \propto \rho X^2 T^4$ (weak temperature dependence).

**CNO cycle** (dominates for $M \gtrsim 1.5\,M_\odot$): carbon, nitrogen, and oxygen act as catalysts. The rate-limiting step is ${}^{14}\text{N}(p,\gamma){}^{15}\text{O}$, giving $\varepsilon_\text{CNO} \propto \rho X X_\text{CNO} T^{18}$—a steep temperature sensitivity that drives convective cores in massive stars.

## s-Process and r-Process Nucleosynthesis

Elements heavier than iron cannot be made by fusion (net endothermic). They are built by **neutron capture** followed by $\beta^-$ decay:

$${}^A_Z X + n \to {}^{A+1}_Z X \xrightarrow{\beta^-} {}^{A+1}_{Z+1} Y$$

The two channels differ in neutron flux:

**s-process** (slow): $\tau_\text{capture} \gg \tau_\beta$. Occurs in AGB star thermal pulses. Builds elements along the valley of stability up to ${}^{209}\text{Bi}$. The abundance equation along an s-process path is:

$$\frac{d N_A}{dt} = -\langle \sigma v \rangle_A n_n N_A + \langle \sigma v \rangle_{A-1} n_n N_{A-1}$$

At steady state, $\sigma_A N_A = \text{const}$ (the **sigma-N product** is nearly constant along the s-process path).

**r-process** (rapid): $\tau_\text{capture} \ll \tau_\beta$. Requires extreme neutron densities ($n_n \gtrsim 10^{20}\ \text{cm}^{-3}$). Nuclei are driven far from stability into neutron-rich territory, then $\beta$-decay back to stability when the neutron flux ends. Sites: neutron star mergers (confirmed via gravitational wave event GW170817 / kilonova AT2017gfo) and possibly collapsars. Produces the heaviest elements: Au, Pt, Th, U.
