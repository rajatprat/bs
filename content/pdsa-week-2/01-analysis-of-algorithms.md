---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Measuring efficiency
title: Analysis of Algorithms
slug: pdsa-week-2-analysis-of-algorithms
---

# Analysis of Algorithms

> **Start here**
> In Week 1, one method took 3200 years and another took 50 minutes for the same job. This week we learn how to **measure** an algorithm's speed properly — without a stopwatch, and without caring which computer we use. This is the language you will use for the rest of the course.

## What do we measure?

Two things decide how "good" an algorithm is:

| Resource | Question | Can we fix it by buying better hardware? |
|---|---|---|
| **Time** (running time) | How long does it take? | Only a little. A computer twice as fast saves half the time — but 3200 years becomes 1600 years. Still useless. |
| **Space** (memory) | How much memory does it need? | Easier. Memory is cheaper and easier to add. |

So in this course we **mainly focus on time**.

![Two gauges side by side: a clock labelled Time - main focus, hard to fix with hardware; and a memory chip labelled Space - easier to add more](images/pdsa-week-2/img01-time-vs-space.webp)
*We care about time more, because faster hardware helps only a little; memory is easier to add.*

## Running time depends on input size

Sorting 10 numbers is quick. Sorting 10 crore numbers is not. So we always describe running time **as a function of the input size `n`**:

> **t(n)** = time taken by the algorithm on an input of size n.

### Example 1 — SIM cards and Aadhaar (from Week 1)

n ≈ 10⁹ cards.

| Algorithm | t(n) | Steps for n = 10⁹ | Time at 10⁷ steps/second |
|---|---|---|---|
| Naive (check every pair) | n² | 10¹⁸ | ≈ 3200 years |
| Clever (sort + halve) | n log n | 10⁹ × 30 = 3 × 10¹⁰ | ≈ 50 minutes |

### What is log n?

**log₂ n** = how many times you divide n by 2 to reach 1.

- log₂ 8 = 3, because 8 → 4 → 2 → 1 (3 halvings).
- log₂ 1024 = 10, because 2¹⁰ = 1024.
- In general: **log₂ n = k means n = 2ᵏ**.

In this course, **log n always means log₂ n** unless said otherwise.

| n | log₂ n (about) |
|---|---|
| 1,000 | 10 |
| 1,00,000 (10⁵) | 17 |
| 10,00,000 (10⁶) | 20 |
| 10⁹ | 30 |

So log n grows **very** slowly. Even for 100 crore items, it is only 30.

### Example 2 — a video game

A game screen has many objects. Every frame, the game must find the **two objects closest to each other**.

- Naive way: check the distance between **every pair** → about n² steps.
- Suppose n = 1,00,000 = 10⁵ objects.
- n² = 10¹⁰ steps → 10¹⁰ ÷ 10⁷ = **1000 seconds ≈ 16.7 minutes** in Python. For ONE frame! A game needs many frames per second. Unacceptable.
- A clever algorithm takes n log n: log₂ 10⁵ ≈ 17, so 10⁵ × 17 ≈ 1.7 × 10⁶ steps → **a fraction of a second**.

(For scale: a high-resolution screen of 4000 × 2000 pixels has 8 × 10⁶ = 80 lakh points.)

## Orders of magnitude — ignore the small stuff

When comparing two running times, we care about **how fast they grow**, not exact numbers. So we **ignore constant factors**.

> **Lecture example — n³ vs 5000n²**
> f(n) = n³ and g(n) = 5000n².
> For small n, f is smaller: at n = 10, f = 1000 but g = 5,00,000.
> At n = 5000 they are equal: 5000³ = 5000 × 5000² = 1.25 × 10¹¹.
> After n = 5000, **n³ is always bigger**, and the gap keeps growing.
> So n³ is the "slower" algorithm in the long run, even though it starts out faster.

This "what happens when n becomes very large" view is called **asymptotic complexity**.

### Typical growth functions (from slow-growing to fast-growing)

| Name | Function | Example |
|---|---|---|
| Constant | 1 | Read the first item of a list |
| Logarithmic | log n | Binary search |
| Linear | n | Find the maximum of a list |
| "n log n" | n log n | Merge sort |
| Quadratic | n² | Selection sort, insertion sort |
| Cubic | n³ | Matrix multiplication |
| Exponential | 2ⁿ | Towers of Hanoi |
| Factorial | n! | Trying every arrangement of n items |

Polynomial = n, n², n³, ... (manageable). Exponential and factorial = hopeless for big n.

### The table that explains everything

Values of t(n) for different input sizes (rounded; "—" means astronomically large):

| n | log n | n | n log n | n² | n³ | 2ⁿ | n! |
|---|---|---|---|---|---|---|---|
| 10 | 3.3 | 10 | 33 | 100 | 1000 | 1000 | 10⁶ |
| 100 | 6.6 | 100 | 664 | 10⁴ | 10⁶ | 10³⁰ | 10¹⁵⁷ |
| 1000 | 10 | 1000 | 10⁴ | 10⁶ | 10⁹ | — | — |
| 10⁴ | 13 | 10⁴ | 10⁵ | 10⁸ | 10¹² | — | — |
| 10⁵ | 17 | 10⁵ | 10⁶ | 10¹⁰ | — | — | — |
| 10⁶ | 20 | 10⁶ | 10⁷ | 10¹² | — | — | — |
| 10⁹ | 30 | 10⁹ | 10¹⁰ | — | — | — | — |

(Small rounding: 2¹⁰ = 1024 ≈ 1000, and 10! = 36,28,800 ≈ 10⁶. The lecture slide writes 66 for n log n at n = 100; the correct value is 100 × 6.64 ≈ 664.)

**How to use this table:** Python does about 10⁷ steps per second. If you have **one second**, look for the biggest n where t(n) is around 10⁷:

| Algorithm type | Biggest n you can handle in about 1 second |
|---|---|
| n log n | about 10⁶ (10 lakh) |
| n² | about 3000 (because 3000² ≈ 10⁷) |
| n³ | about 200 (because 200³ ≈ 10⁷) |
| 2ⁿ | about 23 (because 2²³ ≈ 10⁷) |

![A race of growth curves: log n almost flat, n a gentle slope, n log n a bit steeper, n squared curving up, 2 to the n shooting almost straight up](images/pdsa-week-2/img02-growth-race.webp)
*As n grows, 2ⁿ and n² shoot up; n log n and log n stay calm.*

## Count steps, not seconds

Seconds depend on the computer. So we count **basic operations** instead:

- Comparing two values (`x < y`)
- Assigning a value to a variable (`x = 5`)
- ...

**Do we have to be very exact?** No. Look at swapping two values:

```python
(x, y) = (y, x)        # 1 line — call it 1 operation?
```
```python
t = x                  # or 3 assignments?
x = y
y = t
```

Is a swap 1 operation or 3? **It doesn't matter.** They differ by a constant factor (3), and we ignore constant factors anyway.

## What exactly is "input size"?

Usually it is obvious:

| Problem | Input size n |
|---|---|
| Search or sort a list | Length of the list |
| Rearrange objects | Number of objects |
| A graph (later weeks) | Number of vertices AND number of edges (two separate numbers) |

**Careful with number problems.** For "Is n prime?", the input size is **not** n itself. It is the **number of digits** of n.

Why? We do arithmetic digit by digit — addition with carry, subtraction with borrow, long multiplication, long division. A 10-digit number is "size 10", not "size 10 crore".

- Number of digits of n in base 10 ≈ log₁₀ n.
- Number of bits of n in binary ≈ log₂ n.

> **Example.** Checking primes by trying all divisors up to n takes about n steps. If n has d digits, n ≈ 10ᵈ. So the time is about 10ᵈ — **exponential in the input size d**. That's why "try every divisor" is slow for big numbers, even though "n steps" sounds small.

## Which input do we measure? Worst case!

Different inputs of the same size can take different times.

**Example:** search for a value in an unsorted list of 1000 items.
- **Best case:** it's the very first item → 1 step. (Lucky!)
- **Worst case:** it's not in the list at all → must check all 1000 items.
- **Average case:** would need to know how likely each input is — hard to calculate.

| Case | Meaning | Used? |
|---|---|---|
| Best case | The luckiest input | Rarely — it promises nothing |
| Average case | Typical behaviour | Ideal, but needs probabilities; hard to compute |
| **Worst case** | The input that makes the algorithm work the longest | **Yes — this is what we use** |

Worst case is **pessimistic** (the worst input may be rare), but it is easier to calculate and gives a **guarantee**: "it will never be slower than this".

![A librarian searching a shelf of 1000 books: best case the book is first, worst case she checks every book and it isn't there, average case somewhere in the middle](images/pdsa-week-2/img03-best-average-worst.webp)
*Best case = lucky. Worst case = must check everything. We plan for the worst case.*

**Everyday example:** When you leave for an exam, you plan for the worst traffic, not the best. If you arrive early, good. But you are never late.

**In one line:** Measure time as a function t(n) of input size, ignore constants, look at large n, and plan for the worst case.

**Exam words:** running time, space, input size, t(n), log₂ n, orders of magnitude, asymptotic complexity, basic operation, worst case, best case, average case.

## Quick check

<details><summary>1. What is log₂ 64?</summary>64 → 32 → 16 → 8 → 4 → 2 → 1 is 6 halvings. So log₂ 64 = <b>6</b> (2⁶ = 64).</details>

<details><summary>2. An algorithm takes n² steps. About how long for n = 10⁵ in Python?</summary>n² = 10¹⁰ steps. 10¹⁰ ÷ 10⁷ = 1000 seconds ≈ <b>16.7 minutes</b>.</details>

<details><summary>3. f(n) = n³ and g(n) = 100n². From which n onward is f bigger?</summary>n³ > 100n² means n > 100. So from <b>n = 101</b> onward.</details>

<details><summary>4. For "is n a prime?", what is the input size?</summary>The number of digits of n (about log n), not n itself.</details>

<details><summary>5. Why do we use the worst case instead of the average case?</summary>It is easier to calculate (no probabilities needed) and gives a guarantee that the algorithm is never slower than that.</details>

<details><summary>6. You have 1 second. Roughly what is the largest list an n² algorithm can handle in Python?</summary>n² ≈ 10⁷ → n ≈ √10⁷ ≈ <b>3000</b>.</details>
