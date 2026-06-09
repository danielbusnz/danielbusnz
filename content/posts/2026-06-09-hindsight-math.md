---
date: 2026-06-09
title: hindsight math
---

here's some quick findings from my recent backtesting project.

Can an LLM trade. Grade it only on data after its training cutoff, where it can't be remembering.

**Setup.** Prices $p_t$, position $x_t \in \{-1, 0, +1\}$ (short, flat, long). The position is held one bar before it earns, so returns are:

$$
r_t = x_{t-1}\left(\frac{p_t}{p_{t-1}} - 1\right)
$$

That one-bar shift blocks look-ahead. Period returns compound into total return:

$$
\text{Total} = \prod_t (1 + r_t) - 1
$$

Sharpe is mean return divided by volatility:

$$
S = \frac{\bar r}{\sigma}
$$

**Leakage test.** Compare the candidate's Sharpe before and after the training cutoff. A model with edge should maintain it; a model that was memorizing should collapse. Subtract out regime drift (using momentum as control):

$$
L = (S^{\text{cand}}_{\text{pre}} - S^{\text{cand}}_{\text{post}}) - (S^{\text{ctrl}}_{\text{pre}} - S^{\text{ctrl}}_{\text{post}})
$$

If $L > 0$ and the 95% bootstrap CI excludes zero, the drop is real leakage, not market regime.

**Significance.** Permutation test: flip sign of each return at random $P = 2000$ times, count how many have Sharpe as high as the real one:

$$
p = \frac{k + 1}{P + 1}
$$

Bonferroni-adjust for multiple candidates: $p_{\text{adj}} = \min(1, p \cdot N)$.

## Results

### gpt-4o-mini (real model)

Weekly direction, five assets (AAPL, MSFT, NVDA, SPY, TSLA), split at Oct 2023 cutoff.

| strategy | sharpe_pre | sharpe_post | leakage | 95% CI |
| --- | --- | --- | --- | --- |
| gpt-4o-mini | 0.197 | 0.101 | +0.029 | [-0.19, +0.28] |
| momentum (control) | 0.103 | 0.036 | (control) | |

No edge post-cutoff (0.101 barely beats control at 0.036). No leakage (CI contains zero).

### Synthetic controls (method check)

| strategy | sharpe_pre | sharpe_post | 95% CI | p(adj) |
| --- | --- | --- | --- | --- |
| memorizer | 1.318 | 0.112 | [+0.07, +0.16] | 0.001 |
| momentum | 0.131 | 0.112 | [+0.07, +0.16] | 0.001 |
| noise | 0.019 | 0.010 | [-0.04, +0.06] | 1.000 |

The memorizer collapses after cutoff. The method catches it. Momentum and noise don't. The leakage test works.

**One sentence.** The method detects memory, a real model shows no trade edge once it can't cheat.
