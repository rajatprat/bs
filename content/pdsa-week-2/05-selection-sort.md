---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Searching and sorting
title: Selection Sort
slug: pdsa-week-2-selection-sort
---

# Selection Sort

> **Start here**
> Sorting makes many jobs easy: binary search, finding the median (the middle value), spotting duplicates (they sit next to each other), making a frequency table. Our first sorting method is the one you would invent yourself: **keep picking the smallest thing that is left**.

## The idea — a teaching assistant with exam papers

You are a TA. The teacher hands you a pile of checked exam papers in random order of marks. You must arrange them by marks.

**Strategy 1:**
1. Scan the **whole** pile and find the paper with the **minimum** marks.
2. Move it to a new pile.
3. Repeat with the papers that are left, each time adding the next minimum to the new pile.

Each new paper goes on top, so in the end the new pile, read from the top, is in **descending** order — highest marks on top, lowest at the bottom. That's selection sort: **repeatedly select the minimum**.

## Doing it in the same list (in place)

We don't need a second list. Instead:

- Find the minimum of the whole list and **swap** it into position 0.
- Find the minimum of the rest (positions 1 onward) and swap it into position 1.
- ... and so on.

After step i, the first i + 1 positions hold the smallest items, in order.

### Full trace — sort [74, 32, 89, 55, 21, 64]

The <b>sorted part</b> is on the left (before the bar |).

| Pass i | Look for minimum in | Minimum (position) | Swap | List after the pass |
|---|---|---|---|---|
| 0 | 74, 32, 89, 55, 21, 64 | 21 (pos 4) | L[0] ↔ L[4] | 21 \| 32, 89, 55, 74, 64 |
| 1 | 32, 89, 55, 74, 64 | 32 (pos 1) | no change (already in place) | 21, 32 \| 89, 55, 74, 64 |
| 2 | 89, 55, 74, 64 | 55 (pos 3) | L[2] ↔ L[3] | 21, 32, 55 \| 89, 74, 64 |
| 3 | 89, 74, 64 | 64 (pos 5) | L[3] ↔ L[5] | 21, 32, 55, 64 \| 74, 89 |
| 4 | 74, 89 | 74 (pos 4) | no change | 21, 32, 55, 64, 74 \| 89 |
| 5 | 89 | 89 (pos 5) | no change | 21, 32, 55, 64, 74, 89 |

Sorted: **21, 32, 55, 64, 74, 89** ✔

![Six rows showing the list after each pass of selection sort: the smallest remaining number is circled and swapped to the front; the sorted part on the left grows by one box each row](images/pdsa-week-2/img10-selection-sort-passes.webp)
*Each pass finds the smallest remaining number and swaps it to the front of the unsorted part.*

## The code

```python
def SelectionSort(L):
    n = len(L)
    if n < 1:
        return L
    for i in range(n):
        # Assume L[:i] is sorted
        mpos = i                      # mpos: position of minimum in L[i:]
        for j in range(i+1, n):
            if L[j] < L[mpos]:
                mpos = j
        # L[mpos] is the smallest value in L[i:]
        (L[i], L[mpos]) = (L[mpos], L[i])   # swap it into position i
        # Now L[:i+1] is sorted
    return L
```

| Line | Job |
|---|---|
| `mpos = i` | Start by guessing the minimum is at position i |
| inner `for j` | Scan the rest; if something smaller is found, remember its position |
| swap line | Put the minimum into position i |

### Why is it correct? — the invariant

An **invariant** is a statement that stays true every time the loop goes round. Here:

> **At the start of pass i, L[:i] holds the i smallest items, in sorted order.**

- It's true at the start (i = 0: L[:0] is empty).
- Each pass adds the next smallest item at position i, so it stays true.
- When the loop ends (i = n), L[:n] — the whole list — is sorted. ✔

## How long does it take?

In pass i, the inner loop scans positions i+1 to n−1: that's **n − 1 − i comparisons**.

For n = 6:

| Pass i | Comparisons |
|---|---|
| 0 | 5 |
| 1 | 4 |
| 2 | 3 |
| 3 | 2 |
| 4 | 1 |
| 5 | 0 |
| **Total** | **15 = 6 × 5 / 2** |

In general: (n − 1) + (n − 2) + ... + 1 + 0 = **n(n − 1)/2** comparisons. (The slide counts n − i steps per pass, giving n(n + 1)/2 — same order.)

**T(n) is O(n²).**

### Every input takes this long

Selection sort **always** scans the whole unsorted part, even if the list was already sorted. It never "notices" good order.

We counted comparisons for n = 1000:

| Input (n = 1000) | Comparisons |
|---|---|
| Already sorted | 4,99,500 |
| Reverse sorted | 4,99,500 |
| Random | 4,99,500 |

Exactly the same every time = 1000 × 999 / 2. So for selection sort, **best case = worst case = O(n²)**.

> **Tried it ourselves:** on random lists, doubling n made selection sort about **4 times slower** (n = 1000 → 0.02 s, 2000 → 0.09 s, 4000 → 0.41 s). That's the n² signature: (2n)² = 4n².

**In one line:** Selection sort repeatedly picks the minimum of the unsorted part and swaps it to the front; it always takes n(n−1)/2 comparisons → O(n²).

**Exam words:** selection sort, minimum, swap, in place, invariant, L[:i] sorted, n(n−1)/2, O(n²), best case = worst case.

## Quick check

<details><summary>1. Sort [5, 3, 8, 1] with selection sort. Show the list after each pass.</summary>Pass 0: min 1 → [1, 3, 8, 5]. Pass 1: min of [3, 8, 5] is 3 → no change [1, 3, 8, 5]. Pass 2: min of [8, 5] is 5 → [1, 3, 5, 8]. Pass 3: [1, 3, 5, 8].</details>

<details><summary>2. How many comparisons does selection sort make on a list of 10 items?</summary>10 × 9 / 2 = <b>45</b> — always, whatever the order.</details>

<details><summary>3. After 2 passes on [40, 10, 30, 20, 50], what does the list look like?</summary>Pass 0: min 10 → [10, 40, 30, 20, 50]. Pass 1: min of [40, 30, 20, 50] is 20 → [10, 20, 30, 40, 50].</details>

<details><summary>4. Does selection sort run faster on an already sorted list?</summary>No. It still scans every unsorted part fully: n(n−1)/2 comparisons.</details>

<details><summary>5. What is the maximum number of swaps selection sort does?</summary>One per pass, so at most n (n − 1 useful ones). Comparisons are O(n²), but swaps are only O(n).</details>
