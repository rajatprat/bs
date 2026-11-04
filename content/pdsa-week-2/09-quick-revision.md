---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Revision and practice
title: Week 2 Quick Revision
slug: pdsa-week-2-quick-revision
---

# Week 2 Quick Revision

> **Start here**
> All of Week 2 on one page: how to measure algorithms, Big O / Ω / Θ, how to count steps in loops and recursion, searching, and three sorting methods. Read this before a quiz; open the topic page if anything is unclear.

![Week 2 at a glance: growth rates from log n to 2 to the n, Big O as a ceiling, binary search halving, selection sort picking the minimum, insertion sort sliding a card, merge sort splitting and merging](images/pdsa-week-2/img16-week2-summary.webp)
*The whole of Week 2 in one picture.*

## 1. Measuring algorithms

- Two resources: **time** (main focus) and **space**.
- Running time **t(n)** is a function of the **input size n**.
- **log n = log₂ n** = number of halvings from n to 1. log₂ 10³ ≈ 10, log₂ 10⁶ ≈ 20, log₂ 10⁹ ≈ 30.
- Ignore constants; look at large n (**asymptotic complexity**).
- Growth order: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!
- Count **basic operations**, not seconds. A swap = 1 or 3 operations? Doesn't matter.
- For number problems, input size = **number of digits** (≈ log n), not n.
- We use the **worst case**: easier to calculate, and it's a guarantee.
- Python ≈ 10⁷ steps/second. In 1 second: n log n handles ~10⁶, n² ~3000, n³ ~200, 2ⁿ ~23.

## 2. Big O, Ω, Θ

| | Definition (for n ≥ n₀) | Picture |
|---|---|---|
| f is **O(g)** | f(n) ≤ c·g(n) | ceiling |
| f is **Ω(g)** | f(n) ≥ c·g(n) | floor |
| f is **Θ(g)** | c₁·g(n) ≤ f(n) ≤ c₂·g(n) | sandwich |

- To prove O: push every term up to the highest power, add the coefficients. 100n² + 20n + 5 ≤ 125n² for n ≥ 1.
- c and n₀ are **not unique**.
- n³ is **not** O(n²) (would need n ≤ c forever).
- f₁ + f₂ is O(max(g₁, g₂)) → **the slowest phase decides**.
- n(n−1)/2 is Θ(n²) with c₁ = 1/4, c₂ = 1/2, n₀ = 2.
- Comparison sorting needs **Ω(n log n)** — a lower bound for the problem.

## 3. Counting steps

| Code | Big O |
|---|---|
| One loop | O(n) |
| Nested loops (n × n), or all pairs i < j | O(n²) — pairs = n(n−1)/2 |
| Three nested loops (matrix multiply) | O(mnp) → O(n³) |
| Halving loop | O(log n) |
| T(n) = T(n−1) + 1 | O(n) |
| T(n) = T(n/2) + 1 | O(log n) |
| T(n) = 2T(n/2) + n | O(n log n) |
| M(n) = 2M(n−1) + 1 (Hanoi) | 2ⁿ − 1 → O(2ⁿ) |

## 4. Searching

- **Linear search:** O(n). Worst case = value not present.
- **Binary search** (sorted list only): check the middle, keep one half. O(log n). T(n) = T(n//2) + 1 = 2 + log n.
- Proving a value is absent in a sorted list needs only about log n looks.
- The slicing version (`l[:m]`) copies the list — use `lo`/`hi` positions for true O(log n) time.

## 5. Sorting

| | Selection sort | Insertion sort | Merge sort |
|---|---|---|---|
| Idea | Pick the min of the rest, swap to front | Slide the next item into the sorted part | Split, sort halves, merge |
| Worst case | O(n²) | O(n²) | O(n log n) |
| Best case | O(n²) | O(n) (already sorted) | O(n log n) |
| In place? | Yes | Yes | No (needs a new list) |
| Invariant / key | L[:i] sorted | L[:i] sorted | merge is O(n) |

## Watch out — mistakes in the slides

| Slide | What's wrong | Correct |
|---|---|---|
| 2.1 orders-of-magnitude table | n log n for n = 100 shown as 66 | 100 × 6.64 ≈ **664** |
| 2.6 iterative insertion sort | `while(L[j] < L[j-1]):` — no `j > 0`; crashes with IndexError | `while j > 0 and L[j] < L[j-1]:` |
| 2.6 recursive Insert | `l[-1:]` (small L) and `else` without `:` | `L[-1:]`, `else:` |
| 2.4 binary search | slicing copies the list (not mentioned) | comparisons are O(log n), but slicing makes the time O(n); use lo/hi |

## Practice questions

<details><summary>1. Arrange in increasing order of growth: n log n, 2ⁿ, log n, n², n, n!</summary>log n < n < n log n < n² < 2ⁿ < n!</details>

<details><summary>2. Prove 6n² + 4n + 9 is O(n²). Give c and n₀.</summary>For n ≥ 1: 4n ≤ 4n², 9 ≤ 9n². So 6n² + 4n + 9 ≤ 19n². <b>c = 19, n₀ = 1</b>.</details>

<details><summary>3. What is the time complexity?
<pre>for i in range(n):
    for j in range(i, n):
        count += 1</pre></summary>n + (n−1) + ... + 1 = n(n+1)/2 → <b>O(n²)</b>.</details>

<details><summary>4. What is the time complexity?
<pre>i = n
while i > 0:
    i = i // 3</pre></summary>i is divided by 3 each time → about log₃ n rounds → <b>O(log n)</b>.</details>

<details><summary>5. Binary search for 43 in [13, 22, 32, 43, 57, 63, 78, 91]. Which middle values are checked?</summary>57 (43 &lt; 57 → left [13, 22, 32, 43]), 32 (43 &gt; 32 → right [43]), 43 → found. Checked: <b>57, 32, 43</b>.</details>

<details><summary>6. Selection sort on [3, 1, 2]: show the list after each pass and count comparisons.</summary>Pass 0: min 1 → [1, 3, 2] (2 comparisons). Pass 1: min of [3, 2] is 2 → [1, 2, 3] (1 comparison). Pass 2: nothing (0). Total <b>3 = 3 × 2 / 2</b>.</details>

<details><summary>7. Insertion sort on [3, 1, 2]: how many swaps?</summary>i=1: 1 slides past 3 → [1, 3, 2] (1 swap). i=2: 2 slides past 3, stops at 1 → [1, 2, 3] (1 swap). Total <b>2</b>.</details>

<details><summary>8. Merge [1, 4, 7] and [2, 3, 8, 9]. How many comparisons?</summary>1 vs 2 → 1; 4 vs 2 → 2; 4 vs 3 → 3; 4 vs 8 → 4; 7 vs 8 → 7; A empty → copy 8, 9. <b>5 comparisons</b>, result [1, 2, 3, 4, 7, 8, 9].</details>

<details><summary>9. How many moves to solve Towers of Hanoi with 6 disks?</summary>2⁶ − 1 = <b>63</b>.</details>

<details><summary>10. An algorithm first sorts with merge sort and then does binary search for each of n queries. Total complexity?</summary>Sorting O(n log n) + n searches × O(log n) = O(n log n) + O(n log n) = <b>O(n log n)</b>.</details>

<details><summary>11. Which sort is best for a list that is already sorted except for 2 items? Why?</summary>Insertion sort — almost every item stops after one comparison, so it runs close to O(n).</details>

<details><summary>12. True or false: merge sort runs faster on an already sorted list.</summary><b>False</b> (essentially). It still splits all the way down and merges every level — about n log n work. Merging may finish each step with slightly fewer comparisons, but the order is still O(n log n).</details>
