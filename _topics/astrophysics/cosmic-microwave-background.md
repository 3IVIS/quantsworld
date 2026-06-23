---
title: "Cosmic Microwave Background"
field: astrophysics
description: The thermal radiation relic of the hot Big Bang, encoding the state of the universe 380,000 years after its formation.
intro: >
  The cosmic microwave background (CMB) is a nearly perfect blackbody at $T = 2.725\ \text{K}$, permeating the universe in every direction. Its tiny temperature fluctuations ($\Delta T/T \sim 10^{-5}$) are the imprint of acoustic oscillations in the primordial plasma, seeded by quantum fluctuations from inflation. Decomposed into spherical harmonics, the angular power spectrum encodes six cosmological parameters to sub-percent precision, making the CMB the most powerful probe of early-universe physics.
math_concepts:
  - spectral-analysis
  - probability-theory
  - fourier-transform
difficulty: advanced
difficulty_level: 4
read_time: 13
---

## Recombination and the Surface of Last Scattering

In the first 380,000 years, the universe was a hot, opaque plasma: protons, electrons, and photons tightly coupled by Thomson scattering. As the universe expanded and cooled to $T \approx 3000\ \text{K}$ (redshift $z \approx 1100$), protons and electrons recombined to form neutral hydrogen:

$$p + e^- \to H + \gamma$$

The **Saha equation** gives the ionization fraction $x_e = n_e / (n_e + n_H)$:

$$\frac{x_e^2}{1 - x_e} = \frac{1}{n_b}\left(\frac{m_e k_B T}{2\pi\hbar^2}\right)^{3/2} e^{-B_H/k_B T}$$

where $B_H = 13.6\ \text{eV}$ is the hydrogen binding energy and $n_b$ is the baryon number density. The ionization fraction drops from $x_e \approx 1$ to $x_e < 10^{-3}$ over a redshift interval $\Delta z \approx 200$.

The photon mean free path $\lambda_\text{mfp} = (n_e \sigma_T)^{-1}$ diverges as $x_e \to 0$, producing a **surface of last scattering**—the CMB photosphere. The thickness of this surface is $\Delta z \approx 80$ ($\Delta t \approx 50{,}000\ \text{yr}$), which causes diffusion damping (Silk damping) on small angular scales.

The **CMB blackbody spectrum** was measured by the COBE FIRAS instrument:

$$B_\nu(T) = \frac{2h\nu^3}{c^2}\frac{1}{e^{h\nu/k_B T} - 1}$$

with $T = 2.7255 \pm 0.0006\ \text{K}$. The spectral distortion from a perfect blackbody is $|\Delta I/I| < 10^{-4}$—the most perfect blackbody ever observed.

## Temperature Anisotropies

The CMB temperature varies across the sky with amplitude

$$\frac{\Delta T}{T}(\hat{n}) \sim 10^{-5}$$

(after subtracting the dipole anisotropy $\Delta T/T \approx 1.2 \times 10^{-3}$ from our peculiar velocity $v = 369\ \text{km/s}$ relative to the CMB rest frame). These fluctuations are decomposed in spherical harmonics:

$$\frac{\Delta T}{T}(\theta, \phi) = \sum_{\ell=0}^{\infty} \sum_{m=-\ell}^{\ell} a_{\ell m}\, Y_\ell^m(\theta, \phi)$$

The spherical harmonic $Y_\ell^m$ oscillates on angular scale $\theta \approx \pi/\ell$. Multipole $\ell = 1$ is the dipole, $\ell = 2$ the quadrupole, and the acoustic peaks appear near $\ell \approx 200, 500, 800, \ldots$

## Angular Power Spectrum

Statistical isotropy (no preferred direction) implies $\langle a_{\ell m} a^*_{\ell' m'}\rangle = C_\ell\, \delta_{\ell\ell'}\delta_{mm'}$. The **angular power spectrum** $C_\ell$ contains all the statistical information for a Gaussian field:

$$C_\ell = \frac{1}{2\ell+1}\sum_{m=-\ell}^\ell |a_{\ell m}|^2$$

The plot of $\mathcal{D}_\ell \equiv \ell(\ell+1)C_\ell / 2\pi$ versus $\ell$ is the "CMB power spectrum"—a compressed summary of cosmological structure.

**Primary acoustic peaks** arise from modes that have undergone a half-integer number of oscillations at last scattering. The first peak at $\ell_1 \approx 220$ corresponds to the **sound horizon** at recombination:

$$r_s = \int_0^{t_\text{rec}} \frac{c_s\, dt}{a(t)} = \int_0^{z_\text{rec}} \frac{c_s\, dz}{H(z)}$$

where the sound speed in the baryon-photon fluid is $c_s = c/\sqrt{3(1 + R_b)}$, with $R_b = 3\rho_b/4\rho_\gamma$ the baryon loading ratio. Numerically, $r_s \approx 147\ \text{Mpc}$.

| Peak | $\ell$ | Physical origin |
|---|---|---|
| 1st | $\sim 220$ | First compression (sound horizon) |
| 2nd | $\sim 540$ | First rarefaction (dark matter gravity wins) |
| 3rd | $\sim 800$ | Second compression |
| 4th+ | $\sim 1100+$ | Successively Silk-damped |

## Acoustic Oscillations and Physical Parameters

The primordial photon-baryon fluid oscillates as a driven harmonic oscillator. In Fourier space, the temperature perturbation $\Theta_k$ for wavenumber $k$ satisfies:

$$\ddot{\Theta}_k + \frac{\dot{R}_b}{1+R_b}\dot{\Theta}_k + k^2 c_s^2 \Theta_k = F_k$$

where $F_k$ is the gravitational forcing term. Solving this with initial conditions set by inflation (nearly scale-invariant $\Theta_k \propto k^{(n_s-1)/2}$, $n_s \approx 0.965$):

$$\Theta_k(\eta_\text{rec}) \propto \cos(k r_s) \times e^{-(k/k_D)^2}$$

The **Silk damping scale** $k_D$ arises from photon diffusion during the finite thickness of last scattering. This exponential suppression gives the characteristic "damping tail" in the observed CMB power spectrum for $\ell \gtrsim 1000$.

**Cosmological parameter extraction** from peak positions and heights:

| Observable | Sensitive to |
|---|---|
| Peak 1 angular scale | Angular diameter distance $d_A(z_\text{rec})$, hence $H_0$, $\Omega_\Lambda$ |
| Odd/even peak height ratio | Baryon density $\Omega_b h^2$ |
| Peak 1–3 amplitude ratio | Dark matter density $\Omega_c h^2$ |
| Peak phase | Neutrino density, early dark energy |
| Damping tail slope | Spectral index $n_s$ |

## Sachs-Wolfe Effect

Temperature fluctuations at last scattering have two contributions:

**Intrinsic** (photon density fluctuation): $\Delta T/T = \delta_\gamma/4$

**Gravitational redshift** (Sachs-Wolfe effect): photons must climb out of potential wells $\Phi$, gaining or losing energy $\Delta T/T = \Phi/3$

Combined: $\frac{\Delta T}{T}\bigg|_\text{SW} = \frac{\Phi}{3} + \frac{\delta_\gamma}{4} = \frac{1}{3}\Phi$ (on superhorizon scales, using adiabatic initial conditions where $\delta_\gamma = -2\Phi/3$)

The **Integrated Sachs-Wolfe (ISW) effect** occurs as photons traverse evolving potential wells along the line of sight:

$$\frac{\Delta T}{T}\bigg|_\text{ISW} = -2\int_{\eta_\text{rec}}^{\eta_0} \dot{\Phi}\, d\eta$$

In a matter-dominated universe $\dot{\Phi} = 0$. The ISW effect contributes at low $\ell$ (large scales) during the dark energy dominated epoch ($z \lesssim 1$), producing a positive correlation between the CMB and large-scale structure.

## CMB Polarization

Thomson scattering of anisotropic radiation produces **linear polarization**. The polarization pattern on the sky decomposes into **E-modes** (curl-free, even parity) and **B-modes** (divergence-free, odd parity):

- **E-modes**: sourced by scalar (density) perturbations; anti-correlated with temperature on large scales (confirmed by DASI 2002)
- **B-modes**: sourced by tensor perturbations (primordial gravitational waves) or by lensing of E-modes

The tensor-to-scalar ratio $r = P_T/P_S$ measures the amplitude of primordial gravitational waves. Detection of primordial B-modes would confirm inflation at energy scale

$$E_\text{inf} = 1.06 \times 10^{16}\ \text{GeV} \times \left(\frac{r}{0.01}\right)^{1/4}$$

Current upper limit (BICEP/Keck 2021): $r < 0.036$ at $95\%$ CL.

## Planck Results and the Concordance Model

The Planck satellite (2009–2018) measured CMB temperature and polarization over 70 GHz to 857 GHz. Best-fit $\Lambda$CDM parameters from Planck 2018:

| Parameter | Symbol | Value |
|---|---|---|
| Hubble constant | $H_0$ | $67.36 \pm 0.54$ km/s/Mpc |
| Baryon density | $\Omega_b h^2$ | $0.02237 \pm 0.00015$ |
| CDM density | $\Omega_c h^2$ | $0.1200 \pm 0.0012$ |
| Optical depth | $\tau$ | $0.0544 \pm 0.0073$ |
| Spectral index | $n_s$ | $0.9649 \pm 0.0042$ |
| Amplitude | $\ln(10^{10}A_s)$ | $3.044 \pm 0.014$ |

The $\chi^2$/dof for the $\Lambda$CDM fit to the Planck TT spectrum is remarkably close to 1, with no significant deviations except at low $\ell$ (the CMB "quadrupole anomaly" and alignment with the ecliptic plane—possibly a statistical fluke).
