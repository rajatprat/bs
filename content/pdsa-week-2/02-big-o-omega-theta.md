---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Measuring efficiency
title: Comparing Orders of Magnitude — Big O, Ω and Θ
slug: pdsa-week-2-big-o-omega-theta
---

# Comparing Orders of Magnitude — Big O, Ω and Θ

> **Start here**
> We said "ignore constants and look at large n". Now we make that idea exact with three symbols: **O** (upper bound), **Ω** (lower bound) and **Θ** (tight bound). Exam questions love these — so we will practise finding the constants step by step.

## Big O — an upper bound (a ceiling)

**Definition.** f(n) is **O(g(n))** if we can find two constants **c** and **n₀** such that

> **f(n) ≤ c · g(n) for every n ≥ n₀**

In words: after some point n₀, f(n) never goes above c times g(n). The function g, stretched by c, is a **ceiling** for f.

![A graph with n on the x-axis: a curve f(n) and a higher curve c times g(n); a vertical dashed line at n0; to the right of n0, f always stays below c g(n)](images/pdsa-week-2/img04-big-o-graph.webp)
*After n₀, f(n) stays below c·g(n) forever. That is what "f is O(g)" means.*

**What n₀ and c mean:**

| Constant | Meaning |
|---|---|
| **n₀** | "From this n onward" — we don't care what happens for small n. |
| **c** | "Stretch g by this much" — this is how we ignore constant factors. |

You only need to find **one** pair (c, n₀) that works. There are usually many.

### How to prove f is O(g) — the recipe

1. Write down f(n).
2. Replace every smaller term by something with the **highest power** (this only makes it bigger, so ≤ still holds), for n ≥ some n₀.
3. Add up the coefficients → that's your c.

> **Lecture example — 100n + 5 is O(n²)**
> **Way 1:** For n ≥ 5, we have 5 ≤ n. So
> 100n + 5 ≤ 100n + n = 101n.
> And 101n ≤ 101n² (because n ≤ n² for n ≥ 1).
> So **c = 101, n₀ = 5** works.
>
> **Way 2:** For n ≥ 1, we have 5 ≤ 5n. So
> 100n + 5 ≤ 100n + 5n = 105n ≤ 105n².
> So **c = 105, n₀ = 1** also works.
>
> Both are correct — **the choice of c and n₀ is not unique.**

(Notice: 100n + 5 is also O(n). Big O is just a ceiling; a higher ceiling is still a ceiling. But we usually give the **smallest** simple ceiling, here O(n).)

> **Lecture example — 100n² + 20n + 5 is O(n²)**
> For n ≥ 1: 20n ≤ 20n² and 5 ≤ 5n².
> So 100n² + 20n + 5 ≤ 100n² + 20n² + 5n² = **125n²**.
> Choose **c = 125, n₀ = 1**.

**Lesson: only the highest term matters.** 20n + 5 is "swallowed" by 100n² when n is large.

### Extra worked examples

**Example A: 3n³ + 7n + 2 is O(n³).**
For n ≥ 1: 7n ≤ 7n³ and 2 ≤ 2n³.
So 3n³ + 7n + 2 ≤ 3n³ + 7n³ + 2n³ = 12n³. → **c = 12, n₀ = 1.**

**Example B: 5n + 3 log n is O(n).**
For n ≥ 1: log n ≤ n. So 5n + 3 log n ≤ 5n + 3n = 8n. → **c = 8, n₀ = 1.**

**Example C: n² + 1000 is O(n²) — check with numbers.**
Take c = 2. We need n² + 1000 ≤ 2n², i.e. 1000 ≤ n², i.e. n ≥ 32 (since 31² = 961 and 32² = 1024).
→ **c = 2, n₀ = 32.** Check n = 32: 1024 + 1000 = 2024 ≤ 2 × 1024 = 2048 ✔

### When f is NOT O(g)

> **Lecture example — n³ is not O(n²)**
> Suppose someone claims n³ ≤ c·n² for all large n. Divide both sides by n²: n ≤ c.
> But n keeps growing and c is fixed. As soon as n > c, the claim breaks.
> So **no** c can work → n³ is **not** O(n²).

## A useful rule: the slowest phase decides

**Rule.** If f₁(n) is O(g₁(n)) and f₂(n) is O(g₂(n)), then
> **f₁(n) + f₂(n) is O(max(g₁(n), g₂(n)))**

**Why (the proof, step by step):**
1. f₁(n) ≤ c₁·g₁(n) for n ≥ n₁, and f₂(n) ≤ c₂·g₂(n) for n ≥ n₂.
2. Let c₃ = max(c₁, c₂) and n₃ = max(n₁, n₂). For n ≥ n₃ both lines above are true.
3. f₁(n) + f₂(n) ≤ c₁g₁(n) + c₂g₂(n) ≤ c₃(g₁(n) + g₂(n)).
4. g₁(n) + g₂(n) ≤ 2·max(g₁(n), g₂(n)).
5. So f₁(n) + f₂(n) ≤ 2c₃ · max(g₁(n), g₂(n)). Done — with c = 2c₃, n₀ = n₃.

**What it means for programs:** if an algorithm has two phases,
- Phase A takes O(n log n) (say, sorting), and
- Phase B takes O(n) (say, one scan),

then the whole algorithm is **O(n log n)**. The **least efficient phase** sets the speed of the whole algorithm.

**Everyday example:** A relay race team's total time is mostly decided by its slowest runner.

## Ω (Omega) — a lower bound (a floor)

**Definition.** f(n) is **Ω(g(n))** if there are constants c and n₀ such that

> **f(n) ≥ c · g(n) for every n ≥ n₀**

**Example:** n³ is Ω(n²), because n³ ≥ n² for all n ≥ 1. Choose c = 1, n₀ = 1.

**Where is Ω used?** Usually for a **whole problem**, not one algorithm. It says: "**no** algorithm can do better than this".

> **Famous fact.** Any algorithm that sorts by **comparing** and **swapping** elements needs **Ω(n log n)** comparisons in the worst case. It doesn't matter how clever the algorithm is.

So when merge sort (later this week) achieves O(n log n), we know it is as good as possible for comparison-based sorting.

## Θ (Theta) — a tight bound (a sandwich)

**Definition.** f(n) is **Θ(g(n))** if it is **both** O(g(n)) and Ω(g(n)). That means there are constants c₁, c₂ and n₀ with

> **c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for every n ≥ n₀**

f is sandwiched between two stretched copies of g.

> **Lecture example — n(n − 1)/2 is Θ(n²)**
> First write it out: n(n − 1)/2 = n²/2 − n/2.
>
> **Upper bound:** n²/2 − n/2 ≤ n²/2 for all n ≥ 0 (we removed a minus). So **c₂ = 1/2**.
>
> **Lower bound:** For n ≥ 2, we have n/2 ≤ (n/2) × (n/2) (because n/2 ≥ 1). So
> n²/2 − n/2 ≥ n²/2 − n²/4 = n²/4. So **c₁ = 1/4**.
>
> Choose **n₀ = 2, c₁ = 1/4, c₂ = 1/2**.
>
> **Check with n = 10:** n(n−1)/2 = 10 × 9 / 2 = 45. Lower: 100/4 = 25. Upper: 100/2 = 50. And 25 ≤ 45 ≤ 50 ✔

(You will see n(n − 1)/2 again and again — it's the number of steps of selection sort and insertion sort.)

![Three panels: Big O as a ceiling above a curve, Omega as a floor below a curve, Theta as a sandwich with the curve squeezed between a ceiling and a floor](images/pdsa-week-2/img05-o-omega-theta.webp)
*O = ceiling (at most). Ω = floor (at least). Θ = both (exactly this order).*

## Summary table

| Symbol | Read as | Means | Inequality (for n ≥ n₀) | Typical use |
|---|---|---|---|---|
| O(g) | "Big O of g" | g is an **upper bound** | f(n) ≤ c·g(n) | Worst-case running time of an algorithm |
| Ω(g) | "Omega of g" | g is a **lower bound** | f(n) ≥ c·g(n) | Minimum time any algorithm needs for a problem |
| Θ(g) | "Theta of g" | g is a **tight bound** | c₁g(n) ≤ f(n) ≤ c₂g(n) | When upper and lower bounds match |

**When the upper bound of your algorithm matches the lower bound of the problem, you have found an optimal algorithm.**

**In one line:** O = at most (ceiling), Ω = at least (floor), Θ = exactly this order (both); to prove O, push every term up to the highest power and add the coefficients.

**Exam words:** Big O, Omega (Ω), Theta (Θ), upper bound, lower bound, tight bound, constants c and n₀, asymptotic, dominant (highest) term, optimal algorithm.

## Quick check

<details><summary>1. Show 4n² + 3n + 10 is O(n²). Give c and n₀.</summary>For n ≥ 1: 3n ≤ 3n² and 10 ≤ 10n². So 4n² + 3n + 10 ≤ 17n². <b>c = 17, n₀ = 1</b>.</details>

<details><summary>2. Is 2n + 7 O(n²)? Is it O(n)? Is it O(log n)?</summary>O(n²): yes (a high ceiling is still a ceiling). O(n): yes (2n + 7 ≤ 9n for n ≥ 1). O(log n): <b>no</b> — n grows faster than any c·log n.</details>

<details><summary>3. Is n² Ω(n)? Is n Ω(n²)?</summary>n² ≥ n for n ≥ 1, so n² is Ω(n): <b>yes</b>. n ≥ c·n² would need n ≤ 1/c, which fails for big n: <b>no</b>.</details>

<details><summary>4. An algorithm sorts the list in O(n log n), then does a nested loop costing O(n²). What is the total?</summary>O(max(n log n, n²)) = <b>O(n²)</b>. The slowest phase decides.</details>

<details><summary>5. Is 5n³ + 2n Θ(n³)?</summary>Yes. Lower: 5n³ + 2n ≥ 5n³ (c₁ = 5). Upper: ≤ 7n³ for n ≥ 1 (c₂ = 7). n₀ = 1.</details>

<details><summary>6. Which bound do we usually prove for a problem (like sorting) rather than for one algorithm?</summary>The lower bound, Ω. Example: comparison-based sorting needs Ω(n log n).</details>
