---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Searching and sorting
title: Merge Sort
slug: pdsa-week-2-merge-sort
---

# Merge Sort

> **Start here**
> Selection sort and insertion sort both take O(n²). For n = 10⁵, that's 10¹⁰ steps — about 16 minutes in Python. Too slow for big data. **Merge sort** breaks this barrier with a powerful idea called **divide and conquer**: split the list in half, sort each half, then **merge** the two sorted halves.

## Why we need something better

| n | n² steps | Time in Python (10⁷ steps/s) |
|---|---|---|
| 10⁴ | 10⁸ | 10 seconds |
| 10⁵ | 10¹⁰ | about 17 minutes |
| 10⁶ | 10¹² | about 28 hours |

O(n²) sorting becomes painful beyond about n = 10,000.

## Strategy 3 — Divide and Conquer

1. **Divide** the list into two halves.
2. **Conquer:** sort the left half and the right half **separately**.
3. **Combine:** **merge** the two sorted halves into one sorted list.

But how do we sort each half? **The same way — recursively!** Keep splitting until the pieces have just 1 item. A list of 1 item is already sorted.

## Step 1 — Merging two sorted lists

**Problem:** A and B are already sorted. Make one sorted list C.

**Method:**
1. Compare the **first** (smallest remaining) items of A and B.
2. Move the **smaller** one to C.
3. Repeat. When one list runs out, copy the rest of the other list to C.

**Everyday example:** Two queues of students, each already arranged by height. To make one line by height, keep calling forward the shorter of the two students at the front of the queues.

### Trace — merge A = [32, 74, 89] and B = [21, 55, 64]

| Step | Front of A | Front of B | Smaller → C | C so far |
|---|---|---|---|---|
| 1 | 32 | 21 | 21 (from B) | [21] |
| 2 | 32 | 55 | 32 (from A) | [21, 32] |
| 3 | 74 | 55 | 55 (from B) | [21, 32, 55] |
| 4 | 74 | 64 | 64 (from B) | [21, 32, 55, 64] |
| 5 | 74 | (B empty) | copy rest of A | [21, 32, 55, 64, 74, 89] |

Only **4 comparisons** to merge 6 items. Every comparison puts one item into its final place in C.

![Five steps of merging A = 32 74 89 with B = 21 55 64: each row shows what is left in A and B, which two front items are compared, and C growing to 21 32 55 64 74 89](images/pdsa-week-2/img13-merging-two-lists.webp)
*Merging step by step: compare the two front items, move the smaller to C. When B is empty, copy the rest of A.*

### The merge code

```python
def merge(A, B):
    (m, n) = (len(A), len(B))
    (C, i, j, k) = ([], 0, 0, 0)
    while k < m + n:
        if i == m:                 # A is used up
            C.extend(B[j:])        # copy the rest of B
            k = k + (n - j)
        elif j == n:               # B is used up
            C.extend(A[i:])        # copy the rest of A
            k = k + (m - i)
        elif A[i] < B[j]:
            C.append(A[i])
            (i, k) = (i + 1, k + 1)
        else:
            C.append(B[j])
            (j, k) = (j + 1, k + 1)
    return C
```

| Variable | Meaning |
|---|---|
| i | Position of the next unused item in A |
| j | Position of the next unused item in B |
| k | How many items are already in C |
| `extend` | Adds a whole list to the end of C at once |

## Step 2 — Merge sort itself

```python
def mergesort(A):
    n = len(A)
    if n <= 1:
        return A                       # 0 or 1 item: already sorted
    L = mergesort(A[:n//2])            # sort the left half
    R = mergesort(A[n//2:])            # sort the right half
    B = merge(L, R)                    # merge the two sorted halves
    return B
```

### Full example — sort [43, 32, 22, 78, 63, 57, 91, 13]

**Going down (divide):**

```
                 [43, 32, 22, 78, 63, 57, 91, 13]
                /                                \
      [43, 32, 22, 78]                    [63, 57, 91, 13]
       /          \                         /          \
   [43, 32]     [22, 78]               [63, 57]     [91, 13]
   /    \        /    \                 /    \        /    \
 [43]  [32]   [22]  [78]             [63]  [57]   [91]  [13]
```

**Coming back up (merge):**

| Level | Merges done | Result |
|---|---|---|
| Pairs | [43] + [32] → [32, 43]; [22] + [78] → [22, 78]; [63] + [57] → [57, 63]; [91] + [13] → [13, 91] | [32, 43] [22, 78] [57, 63] [13, 91] |
| Fours | [32, 43] + [22, 78] → [22, 32, 43, 78]; [57, 63] + [13, 91] → [13, 57, 63, 91] | [22, 32, 43, 78] [13, 57, 63, 91] |
| Whole | [22, 32, 43, 78] + [13, 57, 63, 91] | **[13, 22, 32, 43, 57, 63, 78, 91]** |

![A tree of boxes: the 8-number list splits into halves, quarters and single numbers going down, then pairs, fours and the full sorted list merge back up on the other side](images/pdsa-week-2/img14-merge-sort-tree.webp)
*Split all the way down to single items, then merge back up level by level.*

## Divide and conquer — the general pattern

| Step | In merge sort |
|---|---|
| Break the problem into **disjoint** (non-overlapping) parts | Left half and right half |
| Solve each part **separately** | Recursively sort each half |
| **Combine** the solutions efficiently | Merge the two sorted halves |

You will meet this pattern again (quicksort next week, and many more).

## Bonus: variations of merge (from the lecture)

The same "two pointers walking along two sorted lists" idea solves other problems.

Let A = [1, 3, 5, 7] and B = [3, 4, 5, 8].

| Variation | Rule when A[i] == B[j] | Result |
|---|---|---|
| **Union** (no duplicates) | Move only one copy to C, advance both i and j | [1, 3, 4, 5, 7, 8] |
| **Intersection** | Move one copy to C; otherwise just skip the smaller item | [3, 5] |
| **List difference** A − B | Items in A but not in B | [1, 7] |

**In one line:** Merge sort splits the list in half, sorts each half recursively, and merges the sorted halves by repeatedly taking the smaller front item.

**Exam words:** merge sort, divide and conquer, merge, two sorted lists, `A[:n//2]`, `A[n//2:]`, base case n ≤ 1, extend, union, intersection, list difference.

## Quick check

<details><summary>1. Merge [5, 9, 12] and [3, 10]. Show C after each step.</summary>3 → [3]; 5 → [3, 5]; 9 → [3, 5, 9]; 10 → [3, 5, 9, 10]; B empty, copy 12 → <b>[3, 5, 9, 10, 12]</b>.</details>

<details><summary>2. What is the base case of mergesort?</summary>A list of length 0 or 1 — it is already sorted, so return it as it is.</details>

<details><summary>3. Sort [6, 2, 8, 4] with merge sort. Show the merges.</summary>[6] + [2] → [2, 6]; [8] + [4] → [4, 8]; [2, 6] + [4, 8] → <b>[2, 4, 6, 8]</b>.</details>

<details><summary>4. At most how many comparisons does merging two lists of total length m + n need?</summary>At most m + n − 1, because every comparison places one item, and the last item needs no comparison.</details>

<details><summary>5. Find the intersection of [2, 4, 6, 8] and [1, 2, 3, 6, 9] using the merge idea.</summary><b>[2, 6]</b>.</details>
