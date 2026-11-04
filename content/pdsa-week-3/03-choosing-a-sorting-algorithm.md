---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 3
section: Quicksort and sorting
title: Sorting — Stability, Hybrids and Choosing the Best Algorithm
slug: pdsa-week-3-choosing-a-sorting-algorithm
---

# Sorting — Stability, Hybrids and Choosing the Best Algorithm

> **Start here**
> Speed is not the only thing that matters when sorting. Sometimes we need the sort to be **stable** (not disturb an earlier order), sometimes we want to **move data as little as possible**, and sometimes the data is too big to fit in memory. This page wraps up sorting: which algorithm to use, when, and why real libraries mix two algorithms together.

## Stable sorting

Real data is often a list of **records** (tuples), like rows of a table:

| Roll no. | Name | Marks |
|---|---|---|
| 101 | Asha | 70 |
| 102 | Ravi | 85 |
| 103 | Asha | 90 |
| 104 | Meena | 60 |
| 105 | Ravi | 75 |

This list is already sorted by **roll number**. Now we sort it by **name**.

There are two Ashas (101 and 103) and two Ravis (102 and 105). After sorting by name, will each pair still be in roll-number order?

> **A sort is stable if items with equal keys stay in the same order as before.**

| Stable result (sort by name) | Unstable result (possible) |
|---|---|
| Asha 101, **Asha 103**, Meena 104, Ravi 102, **Ravi 105** | **Asha 103**, Asha 101, Meena 104, **Ravi 105**, Ravi 102 |
| Roll numbers within each name stay in order ✔ | The earlier roll-number order is lost ✘ |

**Why it matters:** sorting on column B should not disturb an earlier sort on column A. For example, in a spreadsheet you sort by roll number, then by name — you expect students with the same name to remain in roll-number order.

![Two copies of the same student table sorted by name: on the left, a stable sort keeps Asha 101 above Asha 103 and Ravi 102 above Ravi 105; on the right, an unstable sort flips them](images/pdsa-week-3/img04-stable-vs-unstable.webp)
*Stable sort: equal names keep their old (roll-number) order. Unstable sort: they may get flipped.*

### Which of our sorts are stable?

We tested each algorithm on thousands of random lists with repeated keys:

| Algorithm | Stable? | Why |
|---|---|---|
| Insertion sort | **Yes** | An item only slides past items that are strictly bigger, never past an equal one |
| Merge sort with `A[i] <= B[j]` | **Yes** | On a tie, it takes from the **left** list first |
| Merge sort with `A[i] < B[j]` (the Week 2 code) | **No** | On a tie, it takes from the **right** list first, so equal items swap order |
| Selection sort | **No** | The long-distance swap can jump an item over an equal one |
| Quicksort (lecture version) | **No** | Swaps during partitioning can disturb existing order |

> **Lecture point — making merge sort stable.** "Do not allow elements from the right to overtake elements on the left": while merging, **prefer the left list when breaking ties**. In code, change `if A[i] < B[j]:` to **`if A[i] <= B[j]:`**.

**Tried it ourselves** on the table above (sorting by name):
- Quicksort gave: Asha 103, Asha 101, Meena, Ravi 105, Ravi 102 — **order flipped**.
- Merge sort with `<=` gave: Asha 101, Asha 103, Meena, Ravi 102, Ravi 105 — **order kept**.

## Other criteria — minimizing data movement

Imagine every item is a **heavy carton**. Comparing two cartons (reading their labels) is easy; **moving** them is hard work. Then we want a sort that makes **few moves**.

| Algorithm | Moves (swaps) |
|---|---|
| Selection sort | At most n − 1 swaps — very few! (But always n²/2 comparisons) |
| Insertion sort | Up to n²/2 swaps in the worst case |
| Merge sort | Copies every item into a new list at every level: about n log n moves |

So "best" depends on what is expensive: comparing or moving.

## Which sorting algorithm is best?

There is no single winner:

| Algorithm | Worst case | Average | In place? | Stable? | Typical use |
|---|---|---|---|---|---|
| Selection sort | O(n²) | O(n²) | Yes | No | Teaching; when moves are very costly |
| Insertion sort | O(n²) | O(n²) | Yes | Yes | Small or nearly sorted lists |
| Merge sort | O(n log n) | O(n log n) | No | Yes (with `<=`) | **External sorting**, when stability is needed |
| Quicksort | O(n²) | O(n log n) | Yes | No | Usually the **fastest in practice**; default in many libraries |
| Heapsort (coming later) | O(n log n) | O(n log n) | Yes | No | Guaranteed n log n, in place |

- **Quicksort** is often the algorithm of choice, despite its O(n²) worst case.
- **Merge sort** is typically used for **external sorting**: when the data (for example, a huge database table) is too large to fit in memory. Parts are read from the disk, sorted, and merged back — merging works well when reading data in order.
- **Heapsort** is another O(n log n) algorithm (we will meet heaps later in the course).

## Hybrid sorting — quicksort + insertion sort

Divide and conquer is great for **large** n. But for a **tiny** list, all the recursive calls and partitioning cost more than they save. For small n, the simple **insertion sort** is actually faster.

**Hybrid strategy:**
- Use divide and conquer (quicksort or merge sort) while the part is large.
- When a part becomes small (for example, **n < 16**), switch to **insertion sort**.

```python
import random

def insertion_sort_range(L, l, r):        # sort L[l:r] in place
    for i in range(l+1, r):
        j = i
        while j > l and L[j] < L[j-1]:
            (L[j], L[j-1]) = (L[j-1], L[j])
            j = j - 1

def partition(L, l, r):                   # random pivot, returns its final position
    p = random.randrange(l, r)
    (L[l], L[p]) = (L[p], L[l])
    (pivot, lower, upper) = (L[l], l+1, l+1)
    for i in range(l+1, r):
        if L[i] > pivot:
            upper = upper + 1
        else:
            (L[i], L[lower]) = (L[lower], L[i])
            (lower, upper) = (lower+1, upper+1)
    (L[l], L[lower-1]) = (L[lower-1], L[l])
    return lower - 1

def hybrid_sort(L, l, r):
    if r - l < 16:                        # small part: insertion sort
        insertion_sort_range(L, l, r)
        return L
    m = partition(L, l, r)                # large part: quicksort step
    hybrid_sort(L, l, m)
    hybrid_sort(L, m+1, r)
    return L
```

Note `j > l` (not `j > 0`): insertion sort here works only inside the part L[l:r], so it must stop at position l.

> **Tried it ourselves:** sorting 2,00,000 random numbers, plain random-pivot quicksort took about **0.45 s**; the hybrid (insertion sort below 16) took about **0.36 s** — about 20% faster, from one small change.

**Real-world example:** Python's built-in `sorted()` uses **Timsort**, which is exactly this kind of hybrid — **merge sort for large runs, insertion sort for small pieces** — and it is stable.

![A large list being split by divide and conquer into smaller and smaller parts; once a part is smaller than 16 items, it is handed to a small insertion sort icon instead of being split further](images/pdsa-week-3/img05-hybrid-sort.webp)
*Hybrid sorting: divide and conquer for big parts, insertion sort once a part is small.*

**In one line:** A stable sort keeps equal items in their old order (insertion sort and merge sort with `<=` are stable; selection sort and quicksort are not); real libraries use hybrids that switch to insertion sort for small parts.

**Exam words:** stable sort, sort key, records/tuples, prefer left on ties (`<=`), data movement, external sorting, heapsort, hybrid sort, switch to insertion sort for n < 16, Timsort.

## Quick check

<details><summary>1. A list of (name, roll) is sorted by roll. You sort it by name with an unstable sort. What could go wrong?</summary>Students with the same name might no longer be in roll-number order.</details>

<details><summary>2. Which single change makes the Week 2 merge function stable?</summary>Change <code>A[i] &lt; B[j]</code> to <code>A[i] &lt;= B[j]</code>, so on a tie the item from the left list goes first.</details>

<details><summary>3. Why is selection sort not stable? Give a tiny example.</summary>Sorting [(2,a), (2,b), (1,c)] by the number: the minimum (1,c) is swapped with (2,a) → [(1,c), (2,b), (2,a)]. Now (2,b) is before (2,a) — order flipped.</details>

<details><summary>4. Which sort is used for data too large to fit in memory?</summary>Merge sort (external sorting).</details>

<details><summary>5. Why switch to insertion sort for small parts in a hybrid?</summary>For tiny lists, the overhead of recursion and partitioning is bigger than the work saved; insertion sort is simple and fast for small n.</details>

<details><summary>6. If moving items is very expensive, which simple sort makes the fewest swaps?</summary>Selection sort — at most n − 1 swaps.</details>
