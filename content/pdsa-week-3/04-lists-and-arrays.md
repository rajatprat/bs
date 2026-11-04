---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 3
section: Lists, arrays and dictionaries
title: Lists vs Arrays — Two Ways to Store a Sequence
slug: pdsa-week-3-lists-and-arrays
---

# Lists vs Arrays — Two Ways to Store a Sequence

> **Start here**
> Binary search assumed we can jump straight to the middle item in one step. Is that always true? It depends on **how the sequence is stored in memory**. There are two basic ways — **linked lists** and **arrays** — and each is fast at different things. Algorithm analysis must take this into account.

## Two ways to store a sequence

| | **(Linked) list** | **Array** |
|---|---|---|
| Size | Flexible — grows and shrinks easily | Fixed — decided in advance |
| Memory | Values **scattered** anywhere in memory, joined by links | One **contiguous** (continuous) block of memory |
| Jump to the i-th item | Slow: follow links one by one | Fast: compute its address directly |
| Insert / delete in the middle | Easy: change a couple of links | Expensive: shift many items |

## Linked lists

A linked list is a chain of **nodes**. Each node holds:
- a **value**, and
- a **link** (pointer) to the **next** node.

The first node is the **head**; the last node is the **tail**, whose link is `None` (the end).

```
 head                                      tail
 [ v0 | •]→[ v1 | •]→[ v2 | •]→ ... →[ vn−1 | None ]
```

![A chain of boxes, each split into a value part and an arrow part pointing to the next box: head v0, v1, v2, then dots, then tail with None; the boxes are drawn at scattered positions in memory](images/pdsa-week-3/img06-linked-list.webp)
*A linked list: each node holds a value and a link to the next node. Nodes can be anywhere in memory.*

**Everyday example:** A treasure hunt. Each clue tells you where the next clue is. To reach clue number 7, you must visit clues 1 to 6 first.

**Good:**
- **Flexible size.**
- **Inserting and deleting are easy** — just "re-plumb" the links locally. To insert X between A and B: make X point to B, then make A point to X.

**Bad:**
- To get A[i], you must **follow i links** from the head. That takes **O(i)** time.

![Inserting into a linked list: node A originally points to B; a new node X is created; X's link is set to B and A's link is changed to X; only two links change](images/pdsa-week-3/img07-linked-list-insert.webp)
*Inserting X between A and B in a linked list: just two links change. Nothing else moves.*

## Arrays

An array is **one continuous block** of memory with **n equal-sized slots**, declared in advance.

| Index | Value |
|---|---|
| A[0] | v₀ |
| A[1] | v₁ |
| ... | ... |
| A[i] | vᵢ |
| ... | ... |
| A[n−1] | vₙ₋₁ |

**Random access:** to find A[i], the computer calculates its address directly:

> address of A[i] = address of A[0] + i × (size of one slot)

**Example:** A[0] is at memory address 1000 and each slot is 8 bytes. Then A[5] is at 1000 + 5 × 8 = **1040**. One calculation — no need to visit A[0] to A[4].

So **accessing A[i] takes constant time, O(1)**, no matter how big i is. ("Random" access means any position is equally fast.)

**Everyday example:** Houses on a street numbered in order with equal plot sizes. To reach house 57, you don't knock on houses 1 to 56 — you calculate where it is and walk straight there.

**Bad:**
- **Fixed size.** Growing beyond the block means getting a new, bigger block and copying everything.
- **Inserting or deleting in the middle** means shifting all the items after it — **O(n)** in the worst case.

![An array of 6 boxes in one continuous row; to insert a new value at position 2, the boxes from position 2 onward each shift one step right, shown with arrows, before the new value drops in](images/pdsa-week-3/img08-array-insert-shift.webp)
*Inserting into an array: every item after the insert point must shift one place — O(n).*

## Comparing the operations

| Operation | Array | Linked list |
|---|---|---|
| Read A[i] | **O(1)** | O(i) — follow i links |
| Exchange A[i] and A[j] | **O(1)** | O(n) — must first walk to both |
| Insert v after A[i] (already at A[i]) | O(n) — shift items | **O(1)** — change two links |
| Delete A[i] (already there) | O(n) — shift items back | **O(1)** — bypass one node |
| Grow / shrink | Expensive (copy to a new block) | Easy |

## Why this matters — binary search insert

Can we use binary search to **insert** a value into a sorted sequence quickly?

| Stored as | Finding the position | Inserting there | Total |
|---|---|---|---|
| Array | Binary search: O(log n) ✔ | Shift items: O(n) ✘ | O(n) |
| Linked list | Can't jump to the middle: O(n) ✘ | Change links: O(1) ✔ | O(n) |

Either the search is slow or the insertion is slow — still **O(n)** either way.

**Lesson:** when analysing an algorithm, **keep the implementation of the data structure in mind**. "Binary search is O(log n)" is only true if you can reach the middle in O(1).

## Coming up

- How does Python store its built-in `list`? Is it really a linked list? (Spoiler: no — it's an array underneath.)
- The **NumPy** library provides arrays — are they faster than lists?

**In one line:** Arrays give O(1) access by index but costly insert/delete; linked lists give cheap insert/delete but O(i) access — choose based on which operations you need most.

**Exam words:** sequence, linked list, node, value, next pointer, head, tail, array, contiguous memory, random access, offset, O(1) access, O(n) insert/delete, local plumbing.

## Quick check

<details><summary>1. An array starts at address 2000 and each slot is 4 bytes. Where is A[10]?</summary>2000 + 10 × 4 = <b>2040</b>.</details>

<details><summary>2. How long does it take to read the 500th item of a linked list?</summary>You must follow about 500 links from the head: O(i) → here about 500 steps.</details>

<details><summary>3. You need to insert and delete items in the middle very often, and rarely read by position. Array or linked list?</summary>Linked list — insert/delete is O(1) once you are at the spot.</details>

<details><summary>4. You need to read items by position very often (like binary search). Array or linked list?</summary>Array — O(1) access to any position.</details>

<details><summary>5. Why is swapping A[i] and A[j] O(n) for a linked list?</summary>You first have to walk from the head to positions i and j, which can take up to n steps.</details>
