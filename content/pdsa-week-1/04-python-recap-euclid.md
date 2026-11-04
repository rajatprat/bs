---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 1
section: Python recap
title: Python Recap III — Euclid's Algorithm for GCD
slug: pdsa-week-1-python-recap-euclid
---

# Python Recap III — Euclid's Algorithm for GCD

> **Start here**
> In Recap I, our GCD program checked every number up to `min(m, n)`. For big numbers that is slow. Here we find a clever trick that is more than 2000 years old — **Euclid's algorithm** — and also revise **recursion** (a function calling itself).

## Idea 1 — a common factor also divides the difference

Suppose `d` divides both `m` and `n`. Then:

- `m = a × d` and `n = b × d` (for some whole numbers `a`, `b`)
- So `m − n = a×d − b×d = (a − b) × d`
- So **`d` also divides `m − n`**.

**Number example:** 4 divides 20 and 12. And 20 − 12 = 8 — yes, 4 divides 8 too.

This means: **gcd(m, n) = gcd(n, m − n)** (with m the bigger one). The numbers get smaller, but the answer stays the same!

### Recursive version (subtraction)

A **recursive** function calls itself on a smaller problem. It needs:

- a **base case** — when to stop: if `n` divides `m`, the answer is `n`.
- a **reduction step** — otherwise solve the smaller problem `gcd(n, m − n)`.

```python
def gcd(m, n):
    (a, b) = (max(m, n), min(m, n))   # a = bigger, b = smaller
    if a % b == 0:
        return b                      # base case
    else:
        return gcd(b, a - b)          # smaller problem
```

Trace `gcd(48, 18)`:

| Call | a (bigger) | b (smaller) | a % b | Next |
|---|---|---|---|---|
| gcd(48, 18) | 48 | 18 | 12 | gcd(18, 48 − 18) = gcd(18, 30) |
| gcd(18, 30) | 30 | 18 | 12 | gcd(18, 30 − 18) = gcd(18, 12) |
| gcd(18, 12) | 18 | 12 | 6 | gcd(12, 18 − 12) = gcd(12, 6) |
| gcd(12, 6) | 12 | 6 | **0** | return **6** |

### The problem: it can be very slow

> **Lecture example — gcd(2, 9999)**
> gcd(2, 9999) → gcd(2, 9997) → gcd(2, 9995) → ... → gcd(2, 3) → gcd(2, 1) → 1.
> Each step takes away only 2. That is about **5000 steps**!

So this version takes time proportional to **max(m, n)** — even worse than Recap I in this case.

> **Tried it ourselves:** running this exact code for gcd(2, 9999) in normal Python **crashes** with `RecursionError: maximum recursion depth exceeded`. Python allows only about 1000 nested calls by default, and this needs 5000. One more reason we need a better method.

## Idea 2 — use the remainder instead (Euclid's algorithm)

Why subtract 2 again and again, 5000 times? Subtracting `n` from `m` as many times as possible is exactly what **division** does. What is left over is the **remainder**, `m % n`.

When `n` does not divide `m`, write `m = q × n + r` (q = quotient, r = remainder).

If `d` divides both `m` and `n`:

- `m = a×d` and `n = b×d`
- `a×d = q × (b×d) + r`
- so `r = a×d − q×b×d = (a − q×b) × d`
- so **`d` also divides `r`**.

So **gcd(m, n) = gcd(n, m % n)**. This is **Euclid's algorithm**:

1. If `n` divides `m`, then gcd(m, n) = `n`.
2. Otherwise, find gcd(n, m % n).

```python
def gcd(m, n):
    (a, b) = (max(m, n), min(m, n))
    if a % b == 0:
        return b
    else:
        return gcd(b, a % b)          # only change: a - b  →  a % b
```

(The lecture slides miss the `:` after `else` — in real Python you must write `else:`.)

Trace `gcd(48, 18)` again:

| Call | a | b | a % b | Next |
|---|---|---|---|---|
| gcd(48, 18) | 48 | 18 | 48 = 2×18 + **12** | gcd(18, 12) |
| gcd(18, 12) | 18 | 12 | 18 = 1×12 + **6** | gcd(12, 6) |
| gcd(12, 6) | 12 | 6 | 12 = 2×6 + **0** | return **6** |

3 calls instead of 4. And for gcd(2, 9999): 9999 % 2 = 1, so gcd(2, 9999) → gcd(2, 1) → **1**. Just **2 calls instead of 5000!**

![Left: a long staircase of 5000 small subtraction steps from 9999 down to 1. Right: one big jump using the remainder, 9999 mod 2 equals 1, finishing in 2 steps](images/pdsa-week-1/img06-subtraction-vs-remainder.webp)
*Subtracting 2 again and again takes about 5000 steps. One remainder (%) does it in one jump.*

## How fast is Euclid's algorithm?

It takes time proportional to the **number of digits** in max(m, n) — not to the number itself.

| max(m, n) | Number of digits | Simple method (≈ min(m, n) rounds) can be up to | Euclid (grows with digits) |
|---|---|---|---|
| 9,999 | 4 | about 10,000 rounds | a handful of steps |
| 1,000,000,000 | 10 | about 1,000,000,000 rounds | a few dozen steps at most |

That is a huge difference. Euclid's algorithm is one of the **first non-trivial algorithms** ever written down.

**In one line:** gcd(m, n) = gcd(n, m % n); replacing subtraction with remainder makes the GCD take time proportional to the number of digits.

**Exam words:** recursion, base case, gcd(m, n) = gcd(n, m − n), Euclid's algorithm, gcd(m, n) = gcd(n, m % n), proportional to number of digits.

## Quick check

<details><summary>1. Use Euclid's algorithm to find gcd(101, 85).</summary>101 % 85 = 16 → gcd(85, 16). 85 % 16 = 5 → gcd(16, 5). 16 % 5 = 1 → gcd(5, 1). 5 % 1 = 0 → answer <b>1</b>.</details>

<details><summary>2. What are the two parts every recursive function needs?</summary>A base case (when to stop) and a step that calls itself on a smaller problem.</details>

<details><summary>3. The subtraction version takes time proportional to what?</summary>max(m, n) in the worst case (for example gcd(2, 9999) needs about 5000 steps).</details>

<details><summary>4. If d divides 50 and 15, must it divide 50 % 15?</summary>Yes. 50 % 15 = 5, and any common divisor of 50 and 15 divides 5. (Indeed gcd = 5.)</details>
