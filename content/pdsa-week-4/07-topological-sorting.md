---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 4
section: Directed acyclic graphs
title: Topological Sorting
slug: pdsa-week-4-topological-sorting
---

# Topological Sorting

> **Start here**
> A topological sort lists the vertices of a DAG so that **every arrow points forward** — each task comes after everything it depends on. The method is simple and natural: **first do a task with no pending dependencies, cross it off, and repeat.**

## What we want

> **Topological sort:** list the vertices of a DAG so that for every edge (i, j), **i appears before j**.

This list is a **feasible schedule**.

**A graph with a directed cycle can't be topologically sorted.** If there are paths i ⇝ j and j ⇝ i (a cycle), then i must come before j **and** j before i — impossible.

> **Claim: every DAG can be topologically sorted.**

## The example DAG (from the lecture)

8 vertices, 11 edges:
0 → 2, 0 → 3, 0 → 4, 1 → 2, 1 → 7, 2 → 5, 3 → 5, 3 → 7, 4 → 7, 5 → 6, 6 → 7.

![A DAG with vertices 0 and 1 at the top; 0 points to 2, 3 and 4; 1 points to 2 and 7; 2 and 3 point to 5; 3 and 4 point to 7; 5 points to 6; 6 points to 7. Each vertex shows its indegree in red: 0, 0, 2, 1, 1, 2, 1, 4](images/pdsa-week-4/img11-topo-dag.webp)
*The lecture's DAG. Red numbers are indegrees (how many arrows come in).*

## The strategy

1. First list the vertices with **no dependencies**.
2. Then keep listing vertices whose dependencies have **all been listed already**.

"No dependencies" = no incoming edges = **indegree 0**.

Two questions:
- **Why must there be a starting vertex with indegree 0?**
- **How do we know we can always keep going?**

### Why every DAG has a vertex with indegree 0

Suppose every vertex had indegree > 0. Start anywhere and keep walking **backwards** along an incoming edge to a predecessor. You can always take another step back (every vertex has an incoming edge). After n steps you've visited n + 1 vertices — but there are only n, so some vertex repeats. That means there's a **cycle** — impossible in a DAG. So some vertex must have indegree 0. ✔

### Why we can keep going

List a vertex j with indegree 0, then **delete j and all its outgoing edges**. Deleting things can't create a cycle, so **what remains is still a DAG** — and so it again has a vertex with indegree 0. Repeat until every vertex is listed. ✔

## The algorithm

1. Compute the **indegree** of every vertex.
2. Pick a vertex with indegree 0, list it, and "remove" it: **subtract 1 from the indegree of each of its out-neighbours**.
3. Repeat until all vertices are listed.

### Full trace on the example DAG

Starting indegrees:

| Vertex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| Indegree | 0 | 0 | 2 | 1 | 1 | 2 | 1 | 4 |

Here we always pick the **smallest** vertex with indegree 0 (that's what the lecture's code does):

| Step | Indegree-0 choices | List | Update indegrees of its out-neighbours |
|---|---|---|---|
| 1 | 0, 1 | **0** | 2: 2→1, 3: 1→0, 4: 1→0 |
| 2 | 1, 3, 4 | **1** | 2: 1→0, 7: 4→3 |
| 3 | 2, 3, 4 | **2** | 5: 2→1 |
| 4 | 3, 4 | **3** | 5: 1→0, 7: 3→2 |
| 5 | 4, 5 | **4** | 7: 2→1 |
| 6 | 5 | **5** | 6: 1→0 |
| 7 | 6 | **6** | 7: 1→0 |
| 8 | 7 | **7** | — |

Topological order: **0, 1, 2, 3, 4, 5, 6, 7**.

The lecture's animation picks differently at each step and gets **1, 0, 3, 2, 5, 6, 4, 7**. That is also correct — we checked every edge goes forward in it. **More than one topological sort is possible**, depending on which indegree-0 vertex you choose next.

![A table showing the indegrees of vertices 0 to 7 after each step of topological sort: each step lists one indegree-0 vertex, marks it done, and lowers its neighbours, giving the order 0, 1, 2, 3, 4, 5, 6, 7](images/pdsa-week-4/img12-topo-peeling.webp)
*The trace as a table: each step lists an indegree-0 vertex and lowers its neighbours' indegrees.*


## Code — with an adjacency matrix

```python
def toposort(AMat):
    (rows, cols) = AMat.shape
    indegree = {}
    toposortlist = []

    for c in range(cols):                  # indegree = number of 1s in column c
        indegree[c] = 0
        for r in range(rows):
            if AMat[r, c] == 1:
                indegree[c] = indegree[c] + 1

    for i in range(rows):
        j = min([k for k in range(cols) if indegree[k] == 0])
        toposortlist.append(j)
        indegree[j] = indegree[j] - 1      # becomes -1, so j is never picked again
        for k in range(cols):
            if AMat[j, k] == 1:
                indegree[k] = indegree[k] - 1

    return toposortlist
```

Note the trick: setting `indegree[j]` to −1 marks j as "already listed", so `indegree[k] == 0` never picks it again.

**Analysis:**
- Computing indegrees (scan the whole matrix): **O(n²)**.
- The main loop runs **n** times. Each time: finding the next vertex O(n) + updating indegrees (scan row j) O(n).
- **Total: O(n²).**

## Code — with an adjacency list (faster)

Keep a **queue of vertices whose indegree is 0**, so we never have to search for the next one.

```python
def toposortlist(AList):
    (indegree, toposortlist) = ({}, [])
    for u in AList.keys():
        indegree[u] = 0
    for u in AList.keys():
        for v in AList[u]:
            indegree[v] = indegree[v] + 1

    zerodegreeq = Queue()
    for u in AList.keys():
        if indegree[u] == 0:
            zerodegreeq.addq(u)

    while (not zerodegreeq.isempty()):
        j = zerodegreeq.delq()
        toposortlist.append(j)
        indegree[j] = indegree[j] - 1
        for k in AList[j]:
            indegree[k] = indegree[k] - 1
            if indegree[k] == 0:
                zerodegreeq.addq(k)

    return toposortlist
```

On the example DAG this gives **0, 1, 3, 4, 2, 5, 6, 7** (another valid order — the queue decides).

**Analysis:**
- Computing indegrees: O(m + n).
- Each vertex enters and leaves the queue once: O(n).
- Each edge's indegree update happens once overall: amortised O(m).
- **Total: O(m + n).**

| Representation | Time |
|---|---|
| Adjacency matrix | O(n²) |
| Adjacency list (with queue) | O(m + n) |

**Everyday example:** Planning your semester. First take courses with no prerequisites. Once you've done them, new courses become available (their prerequisites are now complete). Keep going until you've planned every course.

**In one line:** Repeatedly list a vertex with indegree 0 and reduce its neighbours' indegrees; it works for every DAG, gives O(n²) with a matrix and O(m + n) with lists, and there can be many valid orders.

**Exam words:** topological sort, feasible schedule, indegree 0, every DAG has a source, remove vertex and update indegrees, queue of indegree-0 vertices, O(n²), O(m + n), more than one topological order.

## Quick check

<details><summary>1. In the example DAG, after listing 0 and 1, which vertices have indegree 0?</summary>2, 3 and 4.</details>

<details><summary>2. Is 1, 0, 4, 3, 2, 5, 6, 7 a valid topological order for the example DAG?</summary>Check every edge goes forward: 0→2, 0→3, 0→4 ✔ (0 before them); 1→2, 1→7 ✔; 2→5 ✔; 3→5, 3→7 ✔; 4→7 ✔; 5→6 ✔; 6→7 ✔. <b>Yes</b>.</details>

<details><summary>3. Topologically sort: edges A → B, A → C, B → D, C → D.</summary>Indegrees: A 0, B 1, C 1, D 2. List A → B, C both drop to 0 → list B, C → D drops to 0 → list D. <b>A, B, C, D</b> (A, C, B, D is also valid).</details>

<details><summary>4. What happens if you run topological sort on a graph with a cycle?</summary>At some point no vertex has indegree 0 (the cycle's vertices keep each other above 0), so the cycle's vertices can never be listed. (The matrix code would crash: <code>min([])</code> of an empty list.)</details>

<details><summary>5. Why is the adjacency-list version O(m + n)?</summary>Each vertex enters/leaves the queue once (O(n)) and each edge reduces one indegree exactly once (O(m)).</details>
