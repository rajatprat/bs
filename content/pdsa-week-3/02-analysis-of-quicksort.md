---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 3
section: Quicksort and sorting
title: Analysis of Quicksort
slug: pdsa-week-3-analysis-of-quicksort
---

# Analysis of Quicksort

> **Start here**
> Quicksort's speed depends entirely on the pivot. A pivot near the middle → O(n log n). A pivot at the extreme → O(n²). Surprisingly, the worst case happens on an **already sorted list**! On this page we see why, and how a little **randomness** fixes it.

## Cost of one partition

Partitioning n items looks at each item once → **O(n)**.

## Best case — the pivot is the median

The pivot splits the list into two equal halves:

> T(n) = 2T(n/2) + n → **O(n log n)**

(the same recurrence as merge sort, which we solved in Week 2).

## Worst case — the pivot is the smallest (or largest)

Then one side is **empty** and the other side has **n − 1** items:

> T(n) = T(n − 1) + n

Unwind it:
```
T(n) = n + T(n−1)
     = n + (n−1) + T(n−2)
     = n + (n−1) + (n−2) + ... + 1
     = n(n+1)/2
```
→ **O(n²)**.

### When does this happen? On a sorted list!

The pivot is the **first** element. In an already sorted list, the first element is the **smallest**. Every partition is lopsided.

**Trace on [1, 2, 3, 4, 5]:**

| Call | Pivot | Lower | Upper | Comparisons |
|---|---|---|---|---|
| 1 | 1 | (empty) | 2, 3, 4, 5 | 4 |
| 2 | 2 | (empty) | 3, 4, 5 | 3 |
| 3 | 3 | (empty) | 4, 5 | 2 |
| 4 | 4 | (empty) | 5 | 1 |
| | | | **Total** | **10 = 5 × 4 / 2** |

Each call removes only **one** item (the pivot). That's n levels instead of log n levels.

![Two recursion trees side by side: on the left a balanced tree where each pivot splits the list into halves, only log n levels deep; on the right a long one-sided chain where each pivot removes just one item, n levels deep](images/pdsa-week-3/img03-quicksort-best-vs-worst.webp)
*Good pivot → balanced splits, log n levels → n log n. Bad pivot (sorted input) → one-sided splits, n levels → n².*

### Tried it ourselves (n = 1000, counting comparisons)

| Input | First element as pivot | Random pivot |
|---|---|---|
| Already sorted | **4,99,500** (= 1000 × 999 / 2, worst case!) | about 11,300 |
| Random order | about 10,600 | about 10,700 |

For 5000 sorted numbers (with Python's recursion limit raised so it would not crash), first-element quicksort took **0.66 s**; random-pivot quicksort took **0.007 s** — about 90 times faster.

(A reverse-sorted list is also a worst case: the first element is then the **largest**, so Lower gets everything and Upper is empty.)

## Average case — O(n log n)

The worst case looks bad, but it is **rare**. Quicksort is one of the few algorithms where we can actually compute the **average** case:

- For sorting, the actual values don't matter — only their **relative order**.
- So we can think of every input as an arrangement (**permutation**) of 1, 2, ..., n.
- Assume every permutation is **equally likely**.
- Averaged over all of them, the expected running time is **O(n log n)**.

(For example, averaged over 300 random lists of 100 numbers, quicksort made about 640 comparisons — close to 100 × log₂ 100 ≈ 664, and nowhere near the worst case 4950.)

## Randomization — beating the worst case

**Problem:** with **any fixed** rule for choosing the pivot (first element, last element, middle element, ...), someone can build a nasty input that always gives bad splits.

**Fix:** choose the pivot position **at random** each time. Then no particular input is always bad. The **expected** running time is again **O(n log n)**, for **every** input.

```python
import random

def quicksort_random(L, l, r):
    if r - l <= 1:
        return L
    p = random.randrange(l, r)        # random position in L[l:r]
    (L[l], L[p]) = (L[p], L[l])       # move it to the front, then same as before
    (pivot, lower, upper) = (L[l], l+1, l+1)
    for i in range(l+1, r):
        if L[i] > pivot:
            upper = upper + 1
        else:
            (L[i], L[lower]) = (L[lower], L[i])
            (lower, upper) = (lower+1, upper+1)
    (L[l], L[lower-1]) = (L[lower-1], L[l])
    lower = lower - 1
    quicksort_random(L, l, lower)
    quicksort_random(L, lower+1, upper)
    return L
```

Only two lines are new: pick a random position and swap it to the front.

## Iterative quicksort — no recursion needed

The two recursive calls work on **separate (disjoint)** parts of the list, and their results never need to be combined. So instead of recursion, we can keep a **to-do list of (left, right) ranges**:

```python
def partition(L, l, r):
    (pivot, lower, upper) = (L[l], l+1, l+1)
    for i in range(l+1, r):
        if L[i] > pivot:
            upper = upper + 1
        else:
            (L[i], L[lower]) = (L[lower], L[i])
            (lower, upper) = (lower+1, upper+1)
    (L[l], L[lower-1]) = (L[lower-1], L[l])
    return lower - 1                     # final position of the pivot

def quicksort_iterative(L):
    todo = [(0, len(L))]                  # ranges still to be sorted
    while todo:
        (l, r) = todo.pop()
        if r - l <= 1:
            continue
        m = partition(L, l, r)
        todo.append((l, m))               # Lower part
        todo.append((m+1, r))             # Upper part
    return L
```

This avoids the cost of recursive calls and returns (and Python's recursion limit — the recursive version crashes with RecursionError on an already sorted list of just about 1000 items, because the calls go n deep and Python allows only about 1000).

## Quicksort in practice

- In practice quicksort is **very fast** — its inner loop is simple and it works in place.
- It is very often the default for **built-in sort functions**: sorting a column in a spreadsheet, the library sort in many programming languages.
- Its O(n²) worst case is a good example of a **pessimistic** worst-case bound: it almost never happens with random pivots.

> **Careful — Python is an exception.** Python's own `sorted()` and `list.sort()` do **not** use quicksort. They use **Timsort**, a hybrid of merge sort and insertion sort, which is **stable** and very fast on partly sorted data. (Languages like C and C++ commonly use quicksort-based library sorts.)

## Summary table

| Case | When | Recurrence | Time |
|---|---|---|---|
| Best | Pivot is (close to) the median | T(n) = 2T(n/2) + n | O(n log n) |
| Worst | Pivot is min or max (e.g. sorted input, first-element pivot) | T(n) = T(n−1) + n | O(n²) |
| Average | Random input order | — | O(n log n) |
| Randomized pivot | Any input | — | O(n log n) expected |

**In one line:** Quicksort is O(n log n) on average and with random pivots, but O(n²) in the worst case — which, with a first-element pivot, is an already sorted list.

**Exam words:** best case, worst case T(n) = T(n−1) + n, average case over permutations, randomized pivot, expected running time, iterative quicksort, disjoint segments, in place, pessimistic worst case, Timsort.

## Quick check

<details><summary>1. How many comparisons does first-element quicksort make on [1, 2, 3, 4, 5, 6]?</summary>5 + 4 + 3 + 2 + 1 = <b>15</b> = 6 × 5 / 2 (worst case).</details>

<details><summary>2. Is a reverse-sorted list also a worst case? Why?</summary>Yes. The first element is the largest, so Upper is empty and Lower has n − 1 items every time.</details>

<details><summary>3. Why does choosing the pivot randomly help?</summary>With any fixed pivot rule, there is an input that always gives bad splits. Random pivots make bad splits unlikely for every input, so the expected time is O(n log n).</details>

<details><summary>4. Why can quicksort be written iteratively easily, but merge sort less so?</summary>Quicksort's two sub-problems are disjoint and need no combining, so we can just keep a list of ranges to process. Merge sort must merge results after both halves are done.</details>

<details><summary>5. Solve T(n) = T(n − 1) + n with T(1) = 1.</summary>T(n) = n + (n−1) + ... + 1 = n(n+1)/2 → <b>O(n²)</b>.</details>

<details><summary>6. Which algorithm does Python's built-in <code>sorted()</code> use?</summary>Timsort — a merge sort + insertion sort hybrid. Not quicksort.</details>
