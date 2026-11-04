---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 1
section: Python recap
title: Python Recap I — Computing the GCD
slug: pdsa-week-1-python-recap-gcd
---

# Python Recap I — Computing the GCD

> **Start here**
> You learnt Python before. This page refreshes the basics — lists, loops, `if`, `range()` — using one small problem: finding the **greatest common divisor** of two numbers. The same problem will later show us why some programs are fast and others are slow.

## What is the GCD?

The **GCD** (greatest common divisor) of two numbers `m` and `n` is the **largest number that divides both of them exactly** (no remainder). It is also called the **HCF** (highest common factor).

| Numbers | Factors of first | Factors of second | Common factors | GCD |
|---|---|---|---|---|
| 8, 12 | 1, 2, 4, 8 | 1, 2, 3, 4, 6, 12 | 1, 2, 4 | **4** |
| 18, 25 | 1, 2, 3, 6, 9, 18 | 1, 5, 25 | 1 | **1** |

![Two circles of factors for 8 and 12 overlapping; the shared part holds 1, 2, 4 and the largest, 4, is the GCD](images/pdsa-week-1/img02-gcd-common-factors.webp)
*List the factors of both numbers. The common ones sit in the middle. The biggest common one is the GCD.*

Two facts help us write the program:

1. **The GCD always exists.** `1` divides every number, so there is always at least one common factor.
2. **The GCD can never be bigger than the smaller number.** A factor of 8 cannot be bigger than 8. So we only need to check `1, 2, ..., min(m, n)`.

## Version 1 — keep a list of common factors

**Idea:** check every number from `1` to `min(m, n)`. If it divides both, add it to a list. The last item in the list is the largest, so that is the GCD.

```python
def gcd(m, n):
    cf = []                              # list of common factors
    for i in range(1, min(m, n) + 1):
        if (m % i) == 0 and (n % i) == 0:
            cf.append(i)
    return cf[-1]                        # last (largest) common factor
```

Let us trace `gcd(8, 12)`. Here `min(8, 12) = 8`, so `i` goes from 1 to 8.

| i | 8 % i | 12 % i | Both 0? | cf after this step |
|---|---|---|---|---|
| 1 | 0 | 0 | Yes | [1] |
| 2 | 0 | 0 | Yes | [1, 2] |
| 3 | 2 | 0 | No | [1, 2] |
| 4 | 0 | 0 | Yes | [1, 2, 4] |
| 5 | 3 | 2 | No | [1, 2, 4] |
| 6 | 2 | 0 | No | [1, 2, 4] |
| 7 | 1 | 5 | No | [1, 2, 4] |
| 8 | 0 | 4 | No | [1, 2, 4] |

`cf[-1]` = last item = **4**. ✔

### Python points to remember from this code

| Point | What it means |
|---|---|
| `cf = []` must come first | You cannot `.append()` to a list that does not exist yet. |
| Names get their type from their value | `cf` is a list because we put `[]` in it. No need to declare types like in C. |
| `%` is the remainder | `12 % 5` = 2, because 12 = 2 × 5 + 2. "Divides exactly" means `% == 0`. |
| `range(i, j)` stops at `j - 1` | `range(1, 9)` gives 1, 2, ..., 8. That is why we write `min(m, n) + 1`. |
| List indexes | Forward: `0` to `len(l) - 1`. Backward: `-1` (last) to `-len(l)` (first). So `cf[-1]` is the last item. |
| Control flow | `if` = decide, `for` = repeat. |

## Version 2 — no list needed

We only ever use the **last** common factor. So why store all of them? Just remember the **most recent common factor** (`mrcf`).

```python
def gcd(m, n):
    for i in range(1, min(m, n) + 1):
        if (m % i) == 0 and (n % i) == 0:
            mrcf = i                     # overwrite with the newest common factor
    return mrcf
```

**Why don't we need `mrcf = 0` at the start?** Because when `i = 1`, the `if` is always true (1 divides everything). So `mrcf` always gets a value in the very first round.

## How fast are these versions?

Both versions run the loop `min(m, n)` times. So the time taken grows **in proportion to `min(m, n)`**.

- `gcd(8, 12)` → 8 rounds. Tiny.
- `gcd(1000000, 2000000)` → 10,00,000 rounds. Slow!

Can we do better? Yes — see **Python Recap III (Euclid's algorithm)**.

**In one line:** GCD = largest common factor; the simple method checks every number up to `min(m, n)`, so it takes time proportional to `min(m, n)`.

**Exam words:** GCD, HCF, `%` (remainder), `range(i, j)`, `l[-1]`, `append()`, `mrcf`.

## Quick check

<details><summary>1. What does <code>range(3, 7)</code> give?</summary>3, 4, 5, 6 — it stops one before 7.</details>

<details><summary>2. For <code>l = [5, 9, 2, 7]</code>, what is <code>l[-1]</code> and <code>l[-4]</code>?</summary><code>l[-1]</code> = 7 (last item). <code>l[-4]</code> = 5 (first item, because len(l) = 4).</details>

<details><summary>3. Find gcd(18, 24) the slow way.</summary>Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Common: 1, 2, 3, 6. GCD = <b>6</b>.</details>

<details><summary>4. How many times does the loop run for gcd(15, 100)?</summary>min(15, 100) = 15, so <b>15 times</b>.</details>

<details><summary>5. Why can Version 2 skip <code>mrcf = 0</code>?</summary>Because i = 1 always divides both numbers, so <code>mrcf</code> is set in the first round itself.</details>
