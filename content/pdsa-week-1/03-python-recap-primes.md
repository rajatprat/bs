---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 1
section: Python recap
title: Python Recap II — Prime Numbers
slug: pdsa-week-1-python-recap-primes
---

# Python Recap II — Prime Numbers

> **Start here**
> Prime numbers are a great playground for Python. With them we revise functions, `for` and `while` loops, `break`, multiple assignment and dictionaries. We also see how one small idea (checking only up to √n) makes a program much faster.

## What is a prime?

A **prime number** has **exactly two factors: 1 and itself**.

| n | Factors | Exactly two? | Prime? |
|---|---|---|---|
| 1 | 1 | No (only one factor) | **No** — 1 is NOT prime |
| 2 | 1, 2 | Yes | Yes (the only even prime) |
| 7 | 1, 7 | Yes | Yes |
| 12 | 1, 2, 3, 4, 6, 12 | No | No |

## Method 1 — make the list of factors

**Step 1:** write a function that returns all factors of `n`.

```python
def factors(n):
    fl = []                          # factor list
    for i in range(1, n + 1):
        if (n % i) == 0:
            fl.append(i)
    return fl
```

`factors(12)` → `[1, 2, 3, 4, 6, 12]`

**Step 2:** `n` is prime if its factor list is exactly `[1, n]`.

```python
def prime(n):
    return factors(n) == [1, n]
```

- `prime(7)` → `factors(7)` is `[1, 7]` → equals `[1, 7]` → **True**
- `prime(1)` → `factors(1)` is `[1]` → not equal to `[1, 1]` → **False** ✔ (so 1 is correctly not prime)

## Listing primes

### All primes up to m — use `for`

We know exactly how many numbers to check (1 to m), so a `for` loop fits.

```python
def primesupto(m):
    pl = []                          # prime list
    for i in range(1, m + 1):
        if prime(i):
            pl.append(i)
    return pl
```

`primesupto(30)` → `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`

### The first m primes — use `while`

Now we don't know how far to go. To get the first 10 primes, do we check up to 30? 50? We can't say in advance. So we use `while` and **keep going until we have collected m primes**.

```python
def firstprimes(m):
    (count, i, pl) = (0, 1, [])      # three assignments in one line
    while (count < m):
        if prime(i):
            (count, pl) = (count + 1, pl + [i])
        i = i + 1                    # move to the next number — never forget!
    return pl
```

`firstprimes(10)` → `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`

**Multiple (simultaneous) assignment:** `(count, i, pl) = (0, 1, [])` sets `count = 0`, `i = 1`, `pl = []` all at once.

### for or while? — the rule

| Use | When | Example |
|---|---|---|
| `for` | You **know** how many rounds in advance | Check every number from 1 to m |
| `while` | You **don't know**; you stop when a condition becomes false | Keep going till you find m primes |

**Big danger with `while`:** something inside the loop must **make progress** towards stopping. In `firstprimes`, `i = i + 1` moves us forward. Remove it, and the loop runs forever.

![A for loop shown as a fixed track with numbered laps; a while loop shown as a runner who keeps going until a finish flag condition is met](images/pdsa-week-1/img03-for-vs-while.webp)
*`for` = you know the number of laps. `while` = you keep running until a condition says stop.*

## Method 2 — look for a factor directly

We don't need the whole factor list. `n` is prime if **no number from 2 to n − 1 divides it**.

```python
def prime(n):
    result = True
    for i in range(2, n):
        if (n % i) == 0:
            result = False
            break                    # found a factor — stop checking
    return result
```

**`break`** jumps out of the loop at once. If 2 divides 1000, why check 3, 4, ..., 999? Stop immediately.

The same thing using `while` (the condition itself stops the loop when `result` becomes False):

```python
def prime(n):
    (result, i) = (True, 2)
    while (result and (i < n)):
        if (n % i) == 0:
            result = False
        i = i + 1
    return result
```

## Method 3 — check only up to √n (faster)

**Key idea: factors come in pairs.** If `a × b = n`, then one of `a`, `b` is at most √n and the other is at least √n.

Look at n = 36 (√36 = 6):

| Pair | Small one (≤ 6) | Big one (≥ 6) |
|---|---|---|
| 1 × 36 | 1 | 36 |
| 2 × 18 | 2 | 18 |
| 3 × 12 | 3 | 12 |
| 4 × 9 | 4 | 9 |
| 6 × 6 | 6 | 6 |

So if `n` has any factor other than 1 and itself, it has one that is **≤ √n**. We can stop checking at √n.

![Factor pairs of 36 drawn as rectangles: 1×36, 2×18, 3×12, 4×9, 6×6; a dashed line at 6 shows every pair has one side at or below the square root](images/pdsa-week-1/img04-factor-pairs.webp)
*Every factor pair of 36 has one number at or below √36 = 6. So we only need to check up to √n.*

```python
import math

def prime(n):
    (result, i) = (True, 2)
    while (result and (i <= math.sqrt(n))):
        if (n % i) == 0:
            result = False
        i = i + 1
    return result
```

**How much faster?** For n = 97: Method 2 checks 2, 3, ..., 96 → **95 numbers**. Method 3 checks only 2 to 9 (√97 ≈ 9.85) → **8 numbers**.

> **Careful — a small bug in Methods 2 and 3.** For `n = 1`, the loop never runs (there is no number from 2 to 0, and 2 > √1), so they return **True** — saying 1 is prime, which is wrong! Method 1 gets it right. A safe fix is to add this line at the start: `if n < 2: return False`.

## How are primes spread out?

- **There are infinitely many primes.** (Proved over 2000 years ago by Euclid.)
- **Twin primes** are two primes with a gap of 2: (3, 5), (5, 7), (11, 13), (17, 19), (29, 31)...
- **Twin prime conjecture:** there are infinitely many twin primes. Nobody has proved it yet — it is still an open problem!

![A number line from 1 to 31 with primes highlighted and twin prime pairs joined by small arcs labelled gap 2](images/pdsa-week-1/img05-twin-primes.webp)
*Twin primes are prime pairs just 2 apart, like 11 and 13.*

### Counting the gaps between primes — using a dictionary

Let us count how often each gap appears. We start from 3, because 2 is the smallest prime and we use it as the first `lastprime`.

```python
def primediffs(n):
    lastprime = 2
    pd = {}                          # dictionary: gap -> how many times
    for i in range(3, n + 1):
        if prime(i):
            d = i - lastprime
            lastprime = i
            if d in pd.keys():
                pd[d] = pd[d] + 1    # seen this gap before: add 1
            else:
                pd[d] = 1            # new gap: start counting at 1
    return pd
```

Trace for `primediffs(30)` (primes 2, 3, 5, 7, 11, 13, 17, 19, 23, 29):

| Prime | Gap from last prime | pd after this step |
|---|---|---|
| 3 | 3 − 2 = 1 | {1: 1} |
| 5 | 5 − 3 = 2 | {1: 1, 2: 1} |
| 7 | 2 | {1: 1, 2: 2} |
| 11 | 4 | {1: 1, 2: 2, 4: 1} |
| 13 | 2 | {1: 1, 2: 3, 4: 1} |
| 17 | 4 | {1: 1, 2: 3, 4: 2} |
| 19 | 2 | {1: 1, 2: 4, 4: 2} |
| 23 | 4 | {1: 1, 2: 4, 4: 3} |
| 29 | 6 | {1: 1, 2: 4, 4: 3, 6: 1} |

Answer: `{1: 1, 2: 4, 4: 3, 6: 1}` — the gap 2 (twin primes) appeared 4 times.

**In one line:** A prime has exactly two factors; check for a factor only up to √n, use `for` when the count is known and `while` when it isn't.

**Exam words:** prime, factor, `break`, `for` vs `while`, multiple assignment, √n check, twin primes, dictionary (`d in pd.keys()`).

## Quick check

<details><summary>1. Is 1 a prime? Why?</summary>No. A prime needs exactly two factors; 1 has only one factor.</details>

<details><summary>2. To test if 101 is prime using the √n method, up to which number do we check?</summary>√101 ≈ 10.05, so we check 2 to 10.</details>

<details><summary>3. What happens if you forget <code>i = i + 1</code> in <code>firstprimes</code>?</summary><code>i</code> never changes, so the loop never ends (infinite loop).</details>

<details><summary>4. What does <code>(a, b) = (b, a)</code> do?</summary>Swaps the values of a and b in one step.</details>

<details><summary>5. What does the Method 2 code (with <code>range(2, n)</code>) return for n = 1? Is that right?</summary>It returns True, because the loop never runs. That is wrong — 1 is not prime. Add <code>if n < 2: return False</code>.</details>
