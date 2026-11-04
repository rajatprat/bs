---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 2
section: Searching and sorting
title: Insertion Sort
slug: pdsa-week-2-insertion-sort
---

# Insertion Sort

> **Start here**
> Insertion sort is how most people arrange playing cards in their hand: pick up one card at a time and slide it into the right place among the cards you already hold. It is also O(n²) in the worst case — but unlike selection sort, it becomes **very fast when the list is already almost sorted**.

## The idea — the TA again, Strategy 2

1. Move the **first** paper to a new pile.
2. Take the **second** paper. Lower marks than the first? Put it below. Higher? Put it above.
3. Take the **third** paper and **insert** it in the correct position among the first two.
4. Keep going: insert each new paper into its correct position in the new pile.

The new pile is **always sorted**; it just keeps getting bigger.

**Everyday example:** Arranging cards in your hand. You never re-check the whole hand — you just slide each new card left until the card before it is smaller.

![A hand holding sorted cards 32, 55, 74, 89 and a new card 21 being slid in at the far left; arrows show the new card moving left past bigger cards](images/pdsa-week-2/img11-insertion-sort-cards.webp)
*Insertion sort: take the next card and slide it left past every bigger card.*

## Doing it in the same list

Think of the list as two parts: a **sorted part** L[:i] on the left and the rest on the right.
For each i, take L[i] and **swap it leftwards** while the item before it is bigger.

### Full trace — sort [74, 32, 89, 55, 21, 64]

| i | Item to insert | What happens | List after (sorted part \| rest) |
|---|---|---|---|
| 0 | 74 | Nothing before it | 74 \| 32, 89, 55, 21, 64 |
| 1 | 32 | 32 < 74 → swap. Reached the front. | 32, 74 \| 89, 55, 21, 64 |
| 2 | 89 | 89 > 74 → stop at once (0 swaps) | 32, 74, 89 \| 55, 21, 64 |
| 3 | 55 | 55 < 89 swap; 55 < 74 swap; 55 > 32 stop | 32, 55, 74, 89 \| 21, 64 |
| 4 | 21 | smaller than 89, 74, 55, 32 → 4 swaps to the front | 21, 32, 55, 74, 89 \| 64 |
| 5 | 64 | 64 < 89 swap; 64 < 74 swap; 64 > 55 stop | 21, 32, 55, 64, 74, 89 |

Sorted: **21, 32, 55, 64, 74, 89** ✔

## The code (iterative)

```python
def InsertionSort(L):
    n = len(L)
    if n < 1:
        return L
    for i in range(n):
        # Assume L[:i] is sorted
        # Move L[i] to its correct position in L[:i+1]
        j = i
        while j > 0 and L[j] < L[j-1]:
            (L[j], L[j-1]) = (L[j-1], L[j])
            j = j - 1
        # Now L[:i+1] is sorted
    return L
```

> **Careful — bug in the lecture slide.** The slide writes `while(L[j] < L[j-1]):` **without `j > 0`**. When j reaches 0, Python reads `L[j-1]` = `L[-1]` — the **last** item of the list! The swaps then wrap around the end and keep going, until j becomes so negative that Python stops with `IndexError`. We ran the slide's code: it **crashed on every list we tried**, even `[1, 2, 3]`. Always write **`while j > 0 and L[j] < L[j-1]:`**. The `j > 0` must come **first**, so Python stops before reading `L[j-1]`.

### Why is it correct? — the invariant

> **At the start of step i, L[:i] is sorted.**

Inserting L[i] into its correct place keeps L[:i+1] sorted. When i reaches n, the whole list is sorted.

## A recursive version

Another way to think:
1. **Recursively sort** everything except the last item: L[:-1].
2. **Insert** the last item L[-1] into that sorted list.

```python
def Insert(L, v):
    # L is sorted; return a sorted list with v added
    n = len(L)
    if n == 0:
        return [v]
    if v >= L[-1]:
        return L + [v]                       # v belongs at the end
    else:
        return Insert(L[:-1], v) + L[-1:]    # insert v into the rest, then put L[-1] back

def ISort(L):
    n = len(L)
    if n < 1:
        return L
    L = Insert(ISort(L[:-1]), L[-1])
    return L
```

(One lecture slide shows `l[-1:]` with a small L and `else` without a colon — both are typos. It must be `L[-1:]` and `else:`.)

**Trace of Insert([32, 55, 74], 50):**
- 50 ≥ 74? No → Insert([32, 55], 50) + [74]
- 50 ≥ 55? No → Insert([32], 50) + [55]
- 50 ≥ 32? Yes → [32] + [50] = [32, 50]
- Build back up: [32, 50] + [55] = [32, 50, 55]; then + [74] = **[32, 50, 55, 74]** ✔

## How long does it take?

### Worst case — the list is in reverse order

Every new item must slide all the way to the front. Step i makes i swaps.

0 + 1 + 2 + ... + (n − 1) = **n(n − 1)/2** → **O(n²)**.

For n = 6: 0 + 1 + 2 + 3 + 4 + 5 = 15.

### Best case — the list is already sorted

Each new item is compared once with the item before it, sees it is bigger, and stops at once. Only about **n** comparisons → close to **O(n)**!

### Analysis of the recursive version (from the lecture)

Let T_I(n) = time for Insert on a list of size n, and T_S(n) = time for ISort.

- **Insert:** T_I(0) = 1, T_I(n) = T_I(n − 1) + 1. Unwinding: **T_I(n) = n** (it may walk the whole list).
- **ISort:** T_S(0) = 1, T_S(n) = T_S(n − 1) + T_I(n − 1).
 Unwinding: T_S(n) ≈ 1 + 2 + ... + (n − 1) → **O(n²)**.

## Selection sort vs insertion sort — real counts

We counted comparisons on lists of 1000 numbers:

| Input (n = 1000) | Selection sort | Insertion sort |
|---|---|---|
| Already sorted | 4,99,500 | **999** |
| Random | 4,99,500 | about 2,45,000 |
| Reverse sorted | 4,99,500 | 4,99,500 |

- Selection sort: same work every time.
- Insertion sort: **depends on the input** — great for almost-sorted lists, about half the work on random lists, same as selection sort on reverse-sorted lists.

![A bar chart comparing comparisons for 1000 items: selection sort has three equal tall bars for sorted, random and reverse input; insertion sort has a tiny bar for sorted, a medium bar for random and a tall bar for reverse](images/pdsa-week-2/img12-selection-vs-insertion.webp)
*Selection sort always does the full work. Insertion sort is quick on sorted input and slow only on reverse-sorted input.*

| | Selection sort | Insertion sort |
|---|---|---|
| Idea | Pick the minimum of the rest, swap to the front | Take the next item, slide it into the sorted part |
| Worst case | O(n²) | O(n²) |
| Best case | O(n²) | O(n) (already sorted) |
| Notices existing order? | No | Yes |

**In one line:** Insertion sort slides each item left into the sorted part; worst case n(n−1)/2 = O(n²), but on an already sorted list only about n steps.

**Exam words:** insertion sort, sorted prefix L[:i], invariant, `j > 0`, Insert, ISort, recurrence T_S(n) = T_S(n−1) + T_I(n−1), best case O(n), worst case O(n²).

## Quick check

<details><summary>1. Sort [4, 2, 5, 1] with insertion sort. Show the list after each i.</summary>i=0: [4, 2, 5, 1]. i=1: 2 slides past 4 → [2, 4, 5, 1]. i=2: 5 stays → [2, 4, 5, 1]. i=3: 1 slides to the front → [1, 2, 4, 5].</details>

<details><summary>2. How many swaps does insertion sort make on [5, 4, 3, 2, 1]?</summary>0 + 1 + 2 + 3 + 4 = <b>10</b> (reverse order = worst case).</details>

<details><summary>3. How many comparisons on the already sorted list [1, 2, 3, 4, 5]?</summary>For i = 1 to 4, one comparison each: <b>4</b> (n − 1). No swaps.</details>

<details><summary>4. Why must <code>j > 0</code> come before <code>L[j] < L[j-1]</code>?</summary>So the loop stops at the front. Without it, at j = 0 Python compares L[0] with L[-1] (the last item) and keeps swapping around the list until it crashes.</details>

<details><summary>5. Which sort would you pick for a list that is already nearly sorted? Why?</summary>Insertion sort — each item moves only a little, so it runs close to O(n). Selection sort would still take n(n−1)/2 comparisons.</details>
