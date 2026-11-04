---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 3
section: Revision and practice
title: Week 3 Quick Revision
slug: pdsa-week-3-quick-revision
---

# Week 3 Quick Revision

> **Start here**
> Week 3 in one page: quicksort and its analysis, stable sorting and hybrids, lists vs arrays, building a linked list, how Python lists really work, and how dictionaries use hash tables.

![Week 3 at a glance: quicksort pivot splitting a list, best versus worst case, stable sorting, linked list versus array, Python list with spare slots, and a hash table with slots](images/pdsa-week-3/img15-week3-summary.webp)
*The whole of Week 3 in one picture.*

## 1. Quicksort

- Pick a **pivot** (first element), **partition** into Lower (≤ pivot) and Upper (> pivot), put the pivot between them, recursively sort both sides.
- **No merge step** → sorts **in place**.
- Partition = one left-to-right pass with 4 segments: Pivot | Lower | Upper | Unclassified.
 - L[i] > pivot → Upper grows (`upper += 1`).
 - L[i] ≤ pivot → swap L[i] with the first item of Upper; both markers move.
 - At the end: swap the pivot with the last item of Lower.
- Example: [43, 32, 22, 78, 63, 57, 91, 13] → **[13, 32, 22, 43, 63, 57, 91, 78]** after one partition.

## 2. Analysis of quicksort

| Case | Recurrence | Time |
|---|---|---|
| Pivot = median | T(n) = 2T(n/2) + n | O(n log n) |
| Pivot = min or max (sorted / reverse-sorted input!) | T(n) = T(n−1) + n | O(n²) |
| Average over all input orders | — | O(n log n) |
| Random pivot | — | O(n log n) expected for any input |

- Already sorted list = **worst case** for first-element pivot (we measured 4,99,500 comparisons for n = 1000).
- Iterative version: keep a to-do list of (l, r) ranges — the two parts are disjoint.
- Very fast in practice; common default library sort. (Python itself uses **Timsort**.)

## 3. Stability and choosing a sort

- **Stable** = equal keys keep their earlier order.
- Stable: insertion sort, merge sort **with `<=`**. Not stable: selection sort, quicksort, merge sort with `<`.
- Merge sort → external sorting (data on disk). Quicksort → usual default. Heapsort → another O(n log n).
- **Hybrid:** divide and conquer for big parts, **insertion sort for small parts (n < 16)**.
- If moves are costly, selection sort does at most n − 1 swaps.

## 4. Lists vs arrays

| Operation | Array | Linked list |
|---|---|---|
| Access A[i] | O(1) | O(i) |
| Swap A[i], A[j] | O(1) | O(n) |
| Insert / delete at a known spot | O(n) | O(1) |
| Size | Fixed | Flexible |

- Array address: A[i] = start + i × slot size.
- Binary-search insert into a sorted sequence is O(n) either way.

## 5. Linked list in Python (class Node)

- Empty list = `Node()` (value None). `isempty()` checks `value == None`.
- `appendi(v)`: walk to the last node, attach `Node(v)` — O(n).
- `insert(v)` at the start: **swap values** with a new node, then switch links (the head can't move) — O(1).
- `delete(v)`: look ahead and bypass; to delete the head's value, copy the next value in — removes the **first** occurrence.

## 6. Python lists and NumPy

- Python list = **array** underneath, with spare room; grows by reserving a bigger block.
- `append`, `pop()` = O(1) amortised; `insert`, `pop(0)`, `del l[i]` = O(n).
- **Aliasing trap:** `[row, row, row]` or `[[0]*3]*3` share one row. Use `[[0 for i in range(3)] for j in range(3)]`.
- NumPy: `np.zeros(shape=(3,3))`, `np.array(...)`, `np.arange(5)`, `3*A + B`, `np.matmul(A, B)`. `A * B` is entry-by-entry, not matrix multiplication.

## 7. Dictionaries = hash tables

- Array + **hash function** h: keys → {0, ..., n − 1}.
- **Collision**: two keys, same slot. A good hash function makes them rare.
- **Open addressing (closed hashing)**: probe other slots in the same array.
- **Open hashing (chaining)**: each slot holds a list.
- Keys must be **immutable** (list → TypeError: unhashable type).
- SHA-256: 256-bit industry hash, used to detect duplicate files.

## Watch out — slide points to know

| Slide | Point |
|---|---|
| 3.1 partition picture | Shows Upper as 78 63 57 91; the code actually gives 63 57 91 78 — any order inside Upper is fine |
| 3.2 "quicksort is the default built-in sort" | True for many languages, but **Python uses Timsort** (merge + insertion hybrid, stable) |
| 3.7 "Python doubles the list size" | Good mental model; CPython actually grows by roughly 12% each time — append is still O(1) amortised |
| Week 2 merge (`A[i] < B[j]`) | Not stable; use `<=` as lecture 3.4 recommends |

## Practice questions

<details><summary>1. Partition [6, 3, 9, 1, 7, 2] with pivot 6 (lecture method). What is the list afterwards and where is 6?</summary>i=1: 3 ≤ 6 → Lower [3]. i=2: 9 → Upper [9]. i=3: 1 ≤ 6 → swap with 9 → [6, 3, 1, 9, 7, 2]. i=4: 7 → Upper [9, 7]. i=5: 2 ≤ 6 → swap with 9 → [6, 3, 1, 2, 7, 9]. Swap pivot with last of Lower (2): <b>[2, 3, 1, 6, 7, 9]</b>, 6 at position 3.</details>

<details><summary>2. How many comparisons does first-element quicksort make on a sorted list of 8 items?</summary>7 + 6 + 5 + 4 + 3 + 2 + 1 = <b>28</b> = 8 × 7 / 2.</details>

<details><summary>3. Which of these are stable: selection, insertion, quicksort, merge sort with <code>&lt;=</code>?</summary><b>Insertion sort and merge sort with <code>&lt;=</code></b>.</details>

<details><summary>4. Time to read the 1000th element: array vs linked list?</summary>Array: O(1). Linked list: about 1000 link-follows, O(i).</details>

<details><summary>5. l is a Node list 2 → 4. After <code>l.insert(1)</code>, <code>l.appendi(5)</code>, <code>l.delete(4)</code>, what is l?</summary>1 → 2 → 4, then 1 → 2 → 4 → 5, then <b>1 → 2 → 5</b>.</details>

<details><summary>6. What does this print?
<pre>m = [[0]*2]*2
m[0][1] = 5
print(m)</pre></summary><b>[[0, 5], [0, 5]]</b> — both rows are the same list (aliasing).</details>

<details><summary>7. Which is O(n) on a Python list: append, pop(), insert(0, v), l[i]?</summary><b>insert(0, v)</b>.</details>

<details><summary>8. A hash table of size 7 uses h(k) = k % 7 and linear probing. Insert 10, 3, 17, 24. Where does each go?</summary>10 → 3. 3 → 3 is taken → 4. 17 → 3 taken, 4 taken → 5. 24 → 3, 4, 5 taken → <b>6</b>. Final: 10@3, 3@4, 17@5, 24@6.</details>

<details><summary>9. Same keys 10, 3, 17, 24 with chaining (h(k) = k % 7). What does slot 3 hold?</summary>All four keys hash to 3, so slot 3 holds the list <b>10 → 3 → 17 → 24</b>. (A terrible hash for these keys!)</details>

<details><summary>10. Can <code>{(1,2): "a"}</code> be a dictionary? What about <code>{[1,2]: "a"}</code>?</summary>Tuple key: yes. List key: no — TypeError: unhashable type: 'list'.</details>

<details><summary>11. Why does a random pivot make quicksort's expected time O(n log n) for every input?</summary>Bad splits need the pivot to be (near) the smallest or largest; with a random pivot that is unlikely at every step, whatever the input order.</details>
