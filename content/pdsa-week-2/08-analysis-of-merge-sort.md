---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Searching and sorting
title: Analysis of Merge Sort — Why It Is O(n log n)
slug: pdsa-week-2-analysis-of-merge-sort
---

# Analysis of Merge Sort — Why It Is O(n log n)

> **Start here**
> We built merge sort. Now we prove it is really faster than O(n²). We do it in two steps: first find the cost of one **merge**, then write a **recurrence** for merge sort and unwind it. The answer is **O(n log n)** — which is as good as any comparison-based sort can ever be.

## Step 1 — Cost of merge

Merging A (length m) and B (length n) into C:

- C ends up with **m + n** items.
- Every round of the loop puts **at least one** item into C.
- So there are at most m + n rounds → **merge takes O(m + n)**.

Since m + n ≤ 2 · max(m, n), when the two halves are about the same size (m ≈ n), merge is just **O(n)** — linear.

## Step 2 — The recurrence for merge sort

Let **T(n)** = time for mergesort on n items. To keep the maths clean, assume **n = 2ᵏ** (a power of 2), so it always splits evenly.

- **Base case:** T(0) = T(1) = 1.
- **Recurrence:** T(n) = 2T(n/2) + n

Where does each part come from?

| Part | Meaning |
|---|---|
| **2T(n/2)** | Two recursive calls, each sorting n/2 items |
| **+ n** | Merging the two halves: n/2 + n/2 = n items |

## Step 3 — Unwind the recurrence

```
T(n) = 2T(n/2) + n
     = 2[2T(n/4) + n/2] + n          = 2²T(n/2²) + 2n
     = 2²[2T(n/2³) + n/2²] + 2n      = 2³T(n/2³) + 3n
     ...
     = 2ᵏ T(n/2ᵏ) + k·n
```

Each unwinding step adds one more **n**. Stop when n/2ᵏ = 1, i.e. **k = log n**:

```
T(n) = 2^(log n) · T(1) + (log n) · n
     = n · 1 + n log n
     = n + n log n
```

(Here 2^(log n) = n, because log n is exactly the power you raise 2 to, to get n.)

**So T(n) is O(n log n).** ✔

### Check with real numbers

Using T(1) = 1 and T(n) = 2T(n/2) + n:

| n | T(n) worked out | n + n log n |
|---|---|---|
| 2 | 2·T(1) + 2 = 2 + 2 = 4 | 2 + 2×1 = 4 ✔ |
| 4 | 2·T(2) + 4 = 8 + 4 = 12 | 4 + 4×2 = 12 ✔ |
| 8 | 2·T(4) + 8 = 24 + 8 = 32 | 8 + 8×3 = 32 ✔ |
| 16 | 2·T(8) + 16 = 64 + 16 = 80 | 16 + 16×4 = 80 ✔ |

## The picture — n work per level, log n levels

Draw the recursive calls as a tree:

| Level | Number of pieces | Size of each piece | Merge work at this level |
|---|---|---|---|
| 0 | 1 | n | n |
| 1 | 2 | n/2 | 2 × n/2 = n |
| 2 | 4 | n/4 | 4 × n/4 = n |
| ... | ... | ... | n |
| log n | n | 1 | (single items, nothing to merge) |

Every level does about **n** work in total, and there are **log n** levels. Total ≈ **n × log n**.

![A recursion tree for merge sort: the top box holds n items, the next row two boxes of n/2, then four of n/4, down to n boxes of 1; on the right each row is labelled with n work, and a brace says log n levels; total n log n](images/pdsa-week-2/img15-merge-sort-levels.webp)
*Each level merges n items in total. There are log n levels. So merge sort takes n log n.*

## How much faster is it really?

| n | n² (selection / insertion, worst) | n log n (merge sort) | Merge sort is about ... times faster |
|---|---|---|---|
| 1,000 | 10⁶ | 10⁴ | 100× |
| 10⁶ | 10¹² (about 28 hours) | 2 × 10⁷ (about 2 seconds) | 50,000× |

> **Tried it ourselves (n = 1000, counting comparisons):** selection sort 4,99,500; insertion sort about 2,45,000 on random input; **merge sort under 9,000**. In time: on 4000 random numbers, selection sort took about 0.41 s and merge sort about 0.008 s. Doubling n made merge sort only about **2 times slower**, not 4.

## The catches (from the lecture)

Merge sort is fast, but not perfect:

1. **Needs extra memory.** Merge builds a **new** list C. There is no easy way to merge two halves "in place" efficiently. For huge data, this extra storage can be costly.
2. **Inherently recursive.** Recursive calls and returns take extra time and memory compared to a simple loop.

(Next week's **quicksort** tries to fix the extra-memory problem.)

## Merge sort is optimal (for comparison sorting)

Recall from the Big O page: any algorithm that sorts by **comparing and swapping** needs **Ω(n log n)** comparisons in the worst case. Merge sort takes **O(n log n)**. Upper bound = lower bound → **merge sort is asymptotically optimal** among comparison-based sorts.

## All Week 2 algorithms at a glance

| Algorithm | Best case | Worst case | Extra memory |
|---|---|---|---|
| Linear search | O(1) | O(n) | none |
| Binary search (sorted list) | O(1) | O(log n) | none (lo/hi version) |
| Selection sort | O(n²) | O(n²) | none (in place) |
| Insertion sort | O(n) | O(n²) | none (in place) |
| Merge sort | O(n log n) | O(n log n) | O(n) — new list for merging |

**In one line:** Merge costs O(n); merge sort satisfies T(n) = 2T(n/2) + n, which unwinds to n + n log n = O(n log n), at the price of extra memory.

**Exam words:** merge is O(m + n), recurrence T(n) = 2T(n/2) + n, unwinding, k = log n, 2^(log n) = n, recursion tree, n log n, extra storage, not in place, optimal.

## Quick check

<details><summary>1. Using T(1) = 1 and T(n) = 2T(n/2) + n, find T(32).</summary>T(n) = n + n log n = 32 + 32 × 5 = <b>192</b>.</details>

<details><summary>2. How many levels does the merge sort tree have for n = 1024?</summary>log₂ 1024 = <b>10</b> levels of merging.</details>

<details><summary>3. Why is merging two halves of total size n O(n)?</summary>Each loop round puts at least one item into C, and C ends with n items, so there are at most n rounds.</details>

<details><summary>4. Give one disadvantage of merge sort compared to insertion sort.</summary>It needs an extra list to merge into (not in place) — and it's recursive. Also, it doesn't speed up on already-sorted input, while insertion sort becomes O(n).</details>

<details><summary>5. Solve T(n) = 2T(n/2) + 1 with T(1) = 1 (n a power of 2).</summary>Unwind: 2ᵏT(n/2ᵏ) + (2ᵏ − 1). At k = log n: n + n − 1 = 2n − 1 → <b>O(n)</b>. (Only the "+ n" made merge sort n log n.)</details>
