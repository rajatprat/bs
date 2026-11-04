---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Measuring efficiency
title: Calculating Complexity — Worked Examples
slug: pdsa-week-2-calculating-complexity
---

# Calculating Complexity — Worked Examples

> **Start here**
> Now we apply Big O to real code. There are only two kinds of programs to handle:
> - **Iterative programs (loops):** count how many times the loops run.
> - **Recursive programs (a function calling itself):** write a **recurrence** and solve it by **unwinding**.
>
> We go through five examples from the lecture, plus a few extra ones for practice.

## The quick rules for loops

| Code shape | Steps | Big O |
|---|---|---|
| One loop over n items | n | O(n) |
| Two loops one after the other (each n) | n + n = 2n | O(n) |
| One loop inside another (each n) | n × n | O(n²) |
| Inner loop starts at i + 1 (all pairs) | (n−1) + (n−2) + ... + 1 = n(n−1)/2 | O(n²) |
| Three nested loops | n × n × n | O(n³) |
| Loop that halves n each time | log n | O(log n) |

## Example 1 — Find the maximum in a list

```python
def maxElement(L):
    maxval = L[0]
    for i in range(len(L)):
        if L[i] > maxval:
            maxval = L[i]
    return maxval
```

- Input size: n = length of L.
- One loop, runs exactly n times for **every** input (there's no early exit).
- **Time: O(n).** (Here best case = worst case = n.)

## Example 2 — Does a list have duplicates?

```python
def noDuplicates(L):
    for i in range(len(L)):
        for j in range(i+1, len(L)):
            if L[i] == L[j]:
                return False
    return True
```

- The nested loops check **every pair** (i, j) with i < j.
- **Best case:** L[0] == L[1] → found in the very first check, return at once.
- **Worst case:** **no duplicates** → both loops run fully.

Count the worst case for n = 5 (positions 0 to 4):

| i | j goes over | Checks |
|---|---|---|
| 0 | 1, 2, 3, 4 | 4 |
| 1 | 2, 3, 4 | 3 |
| 2 | 3, 4 | 2 |
| 3 | 4 | 1 |
| 4 | (none) | 0 |
| | **Total** | **4 + 3 + 2 + 1 = 10** |

In general: (n − 1) + (n − 2) + ... + 1 = **n(n − 1)/2**. Check: 5 × 4 / 2 = 10 ✔

**Time: O(n²).**

![A 5 by 5 grid of positions where only the cells above the diagonal are coloured, showing the 10 pairs (i, j) with i less than j that the nested loop checks](images/pdsa-week-2/img06-pairs-triangle.webp)
*The nested loop checks only pairs with i < j — a triangle, about half of n × n. That's n(n−1)/2.*

**Why is 1 + 2 + ... + (n−1) = n(n−1)/2?** Write the sum forwards and backwards and add:
```
  1   +   2   + ... + (n-1)
(n-1) + (n-2) + ... +   1
-----------------------------
  n   +   n   + ... +   n      ← (n-1) times
```
Twice the sum = n(n − 1), so the sum = n(n − 1)/2.

## Example 3 — Matrix multiplication

A matrix is stored as a **list of lists**. The matrix

| 1 | 2 | 3 |
|---|---|---|
| 4 | 5 | 6 |

is stored as `[[1, 2, 3], [4, 5, 6]]` (2 rows, 3 columns).

```python
def matrixMultiply(A, B):
    (m, n, p) = (len(A), len(B), len(B[0]))
    C = [[0 for i in range(p)] for j in range(m)]
    for i in range(m):
        for j in range(p):
            for k in range(n):
                C[i][j] = C[i][j] + A[i][k] * B[k][j]
    return C
```

- A is m × n, B is n × p, answer C is m × p.
- Each entry C[i][j] needs n multiplications (the k loop).
- There are m × p entries.
- **Time: O(m · n · p)**. If both are n × n square matrices: **O(n³)**.

Small check: A = 2 × 3 and B = 3 × 2 → 2 × 3 × 2 = 12 multiplications.

## Example 4 — Number of bits of n

```python
def numberOfBits(n):
    count = 1
    while n > 1:
        count = count + 1
        n = n // 2
    return count
```

Trace for n = 13 (13 in binary is 1101, which has 4 bits):

| n before | n > 1? | count after | n after (n // 2) |
|---|---|---|---|
| 13 | yes | 2 | 6 |
| 6 | yes | 3 | 3 |
| 3 | yes | 4 | 1 |
| 1 | no — stop | **4** | |

- The loop halves n each time → runs about **log n** times.
- **But careful:** for number problems, input size = **number of digits** d ≈ log n.
- So this algorithm takes about d steps → **linear in the input size**.

## Example 5 — Towers of Hanoi (a recursive program)

**The puzzle:**
- Three pegs: A, B, C. There are n disks on peg A, biggest at the bottom.
- Goal: move all n disks from A to B, using C as a helper ("transit") peg.
- Rules: move one disk at a time, and **never put a bigger disk on a smaller one**.

**The recursive solution:**
1. Move the top **n − 1** disks from A to C (using B as helper).
2. Move the **biggest** disk from A to B.
3. Move the **n − 1** disks from C to B (using A as helper).

![Three snapshots of three pegs A, B, C: step 1 the top n minus 1 disks moved to C, step 2 the largest disk moved from A to B, step 3 the n minus 1 disks moved from C onto B](images/pdsa-week-2/img07-towers-of-hanoi.webp)
*To move n disks: move n−1 out of the way, move the biggest, then put the n−1 back on top.*

**All 7 moves for n = 3** (A → B, helper C):

| Move | Disk moved from → to |
|---|---|
| 1 | A → B |
| 2 | A → C |
| 3 | B → C |
| 4 | A → B (the biggest disk) |
| 5 | C → A |
| 6 | C → B |
| 7 | A → B |

### Counting moves with a recurrence

Let **M(n)** = number of moves for n disks.

- **Base case:** M(1) = 1 (just move the disk).
- **Recurrence:** M(n) = M(n − 1) + 1 + M(n − 1) = **2M(n − 1) + 1**.

**Solve by unwinding** (keep substituting the formula into itself):

```
M(n) = 2M(n−1) + 1
     = 2[2M(n−2) + 1] + 1          = 2²M(n−2) + (2 + 1)
     = 2²[2M(n−3) + 1] + (2 + 1)   = 2³M(n−3) + (4 + 2 + 1)
     ...
     = 2ᵏ M(n−k) + (2ᵏ − 1)
```

Stop when n − k = 1, i.e. k = n − 1:

```
M(n) = 2ⁿ⁻¹ M(1) + (2ⁿ⁻¹ − 1)
     = 2ⁿ⁻¹ + 2ⁿ⁻¹ − 1
     = 2ⁿ − 1
```

**Check with small n:** M(1) = 2 − 1 = 1 ✔. M(2) = 4 − 1 = 3 ✔. M(3) = 8 − 1 = 7 ✔ (the table above has 7 moves).

**Time: O(2ⁿ) — exponential!** For 64 disks: 2⁶⁴ − 1 ≈ 1.8 × 10¹⁹ moves. At one move per second, that is about 58,000 crore (580 billion) years.

## Extra practice — find the Big O

**A.**
```python
for i in range(n):
    print(i)
for j in range(n):
    print(j)
```
Two separate loops: n + n = 2n → **O(n)**.

**B.**
```python
for i in range(n):
    for j in range(n):
        print(i, j)
```
n × n → **O(n²)**.

**C.**
```python
i = 1
while i < n:
    i = i * 2
```
i goes 1, 2, 4, 8, ... until ≥ n → about log n rounds → **O(log n)**.

**D.**
```python
for i in range(n):
    j = 1
    while j < n:
        j = j * 2
```
Outer n times, inner log n times → **O(n log n)**.

**E.** A recursive function with T(n) = T(n − 1) + 1, T(0) = 1.
Unwind: T(n) = T(n−1) + 1 = T(n−2) + 2 = ... = T(0) + n = n + 1 → **O(n)**.

**In one line:** For loops, count iterations (nested → multiply, in a row → add, halving → log n); for recursion, write a recurrence and unwind it.

**Exam words:** iterative, recursive, recurrence, base case, unwinding, n(n−1)/2, O(mnp), Towers of Hanoi, 2ⁿ − 1.

## Quick check

<details><summary>1. How many comparisons does noDuplicates make in the worst case for n = 6?</summary>5 + 4 + 3 + 2 + 1 = 15 = 6 × 5 / 2. <b>15</b>.</details>

<details><summary>2. Multiplying a 3 × 4 matrix by a 4 × 5 matrix — how many multiplications?</summary>m × n × p = 3 × 4 × 5 = <b>60</b>.</details>

<details><summary>3. What does numberOfBits(32) return? How many loop rounds?</summary>32 → 16 → 8 → 4 → 2 → 1: 5 rounds, count = 1 + 5 = <b>6</b> (32 = 100000 in binary, 6 bits).</details>

<details><summary>4. How many moves for Towers of Hanoi with 5 disks?</summary>2⁵ − 1 = <b>31</b>.</details>

<details><summary>5. Solve T(n) = 2T(n − 1), T(0) = 1.</summary>T(n) = 2T(n−1) = 2²T(n−2) = ... = 2ⁿT(0) = <b>2ⁿ</b>. Exponential.</details>

<details><summary>6. What is the Big O of: <code>for i in range(n): for j in range(i): ...</code></summary>0 + 1 + 2 + ... + (n−1) = n(n−1)/2 → <b>O(n²)</b>.</details>
