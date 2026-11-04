---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 4
section: Directed acyclic graphs
title: Longest Path in a DAG
slug: pdsa-week-4-longest-path-in-dags
---

# Longest Path in a DAG

> **Start here**
> Suppose the DAG shows prerequisites between courses, and each course takes one semester. You can take many courses in the same semester, as long as their prerequisites are done. **What is the minimum number of semesters to finish?** The answer is the **longest chain** of prerequisites — the longest path in the DAG. And we can compute it at the same time as topological sorting.

## The question

- The DAG represents prerequisites between courses.
- Each course takes one semester.
- Courses with no pending prerequisites can be taken together.
- **Minimum number of semesters to complete the programme?**

The bottleneck is the longest chain A → B → C → ... — you must take them one after another. So we need the **longest path**.

## The rule

Let **longest-path-to(i)** = the number of edges in the longest path ending at vertex i.

- If **indegree(i) = 0** (no prerequisites): longest-path-to(i) = **0**.
- Otherwise, the longest path to i is **one more** than the longest path to any vertex that points to i:

> **longest-path-to(i) = 1 + max { longest-path-to(j) | (j, i) is an edge }**

**Everyday example:** You can't start Course C until you've finished every prerequisite. So C's earliest semester is one more than the **latest** of its prerequisites' semesters.

## Compute in topological order

To compute longest-path-to(i), we need the values for all its incoming neighbours first. In a **topological order**, every incoming neighbour of i appears **before** i. So:

> Go through the vertices in topological order, left to right, computing each longest-path-to(i) from the values already known.

Even better, do it **during** the topological sort itself.

## Full trace — the lecture's DAG

Edges: 0 → 2, 0 → 3, 0 → 4, 1 → 2, 1 → 7, 2 → 5, 3 → 5, 3 → 7, 4 → 7, 5 → 6, 6 → 7.

Using the lecture's order **1, 0, 3, 2, 5, 6, 4, 7**:

| Vertex (in topological order) | Incoming from | Calculation | longest-path-to |
|---|---|---|---|
| 1 | — | indegree 0 | **0** |
| 0 | — | indegree 0 | **0** |
| 3 | 0 | 1 + 0 | **1** |
| 2 | 0, 1 | 1 + max(0, 0) | **1** |
| 5 | 2, 3 | 1 + max(1, 1) | **2** |
| 6 | 5 | 1 + 2 | **3** |
| 4 | 0 | 1 + 0 | **1** |
| 7 | 1, 3, 4, 6 | 1 + max(0, 1, 1, 3) | **4** |

The longest path has **4 edges**, ending at 7. One such path: **0 → 3 → 5 → 6 → 7** (or 0 → 2 → 5 → 6 → 7, or 1 → 2 → 5 → 6 → 7).

So if each vertex is a one-semester course, the programme takes **4 + 1 = 5 semesters** (a path with 4 edges has 5 courses).

| Semester | Courses that can be taken (longest-path-to = semester − 1) |
|---|---|
| 1 | 0, 1 |
| 2 | 2, 3, 4 |
| 3 | 5 |
| 4 | 6 |
| 5 | 7 |

![The lecture DAG with each vertex labelled with its longest-path-to value: 0 and 1 show 0; 2, 3 and 4 show 1; 5 shows 2; 6 shows 3; 7 shows 4; the path 0 to 3 to 5 to 6 to 7 is highlighted](images/pdsa-week-4/img13-longest-path.webp)
*Each vertex is labelled with the longest path ending there. The highlighted chain 0 → 3 → 5 → 6 → 7 has length 4.*

## The code — topological sort + longest path together

```python
def longestpathlist(AList):
    (indegree, lpath) = ({}, {})
    for u in AList.keys():
        (indegree[u], lpath[u]) = (0, 0)
    for u in AList.keys():
        for v in AList[u]:
            indegree[v] = indegree[v] + 1

    zerodegreeq = Queue()
    for u in AList.keys():
        if indegree[u] == 0:
            zerodegreeq.addq(u)

    while (not zerodegreeq.isempty()):
        j = zerodegreeq.delq()
        indegree[j] = indegree[j] - 1
        for k in AList[j]:
            indegree[k] = indegree[k] - 1
            lpath[k] = max(lpath[k], lpath[j] + 1)    # the only new line
            if indegree[k] == 0:
                zerodegreeq.addq(k)

    return lpath
```

It's the topological-sort code with **one extra line**: when we remove edge j → k, update `lpath[k] = max(lpath[k], lpath[j] + 1)`. By the time k's indegree reaches 0, every incoming neighbour has been processed, so lpath[k] is final.

Running it on the example gives: {0: 0, 1: 0, 2: 1, 3: 1, 4: 1, 5: 2, 6: 3, 7: 4} ✔ (same as the table).

**Analysis:** same as topological sort with lists:
- Indegrees: O(m + n). Each vertex processed once: O(n). Each edge updated once: amortised O(m).
- **Total: O(m + n).** (With an adjacency matrix: O(n²).)

## Longest paths in general graphs — much harder!

- The idea of a longest path also makes sense in graphs **with** cycles. Since a path doesn't repeat vertices, it has at most n − 1 edges.
- But for general graphs, **no efficient method is known**. The best known strategy is basically to try all paths — exponentially many.
- In a **DAG**, it's easy (O(m + n)) because topological order lets us build answers step by step.

## Back to the office example

Each task takes a day: Conduits = 0, Tiling/Plastering = 1, Painting = 2, Wiring (E)/Cabling (T) = 3, Fittings (E) = 4. Longest path = 4 edges → **5 days** minimum.

**In one line:** longest-path-to(i) = 0 for sources, else 1 + max over incoming neighbours; compute it in topological order (one extra line in toposort), O(m + n) — easy for DAGs, hard for general graphs.

**Exam words:** longest path, longest-path-to(i), 1 + max over incoming neighbours, topological order, lpath, minimum number of semesters, O(m + n), hard for general graphs.

## Quick check

<details><summary>1. Edges A → B, A → C, B → D, C → D, D → E. Find longest-path-to for each vertex.</summary>A 0; B 1; C 1; D 1 + max(1, 1) = 2; E 3.</details>

<details><summary>2. With those courses (each one semester), how many semesters are needed?</summary>Longest path has 3 edges → 3 + 1 = <b>4 semesters</b> (A; B and C together; D; E).</details>

<details><summary>3. Why must we process vertices in topological order?</summary>longest-path-to(i) needs the values of all its incoming neighbours first; in topological order they all come before i.</details>

<details><summary>4. What is the one line added to the topological-sort code to get longest paths?</summary><code>lpath[k] = max(lpath[k], lpath[j] + 1)</code></details>

<details><summary>5. Is finding the longest path easy in a graph with cycles?</summary>No — no efficient method is known; it's essentially try-all-paths. It is easy only for DAGs.</details>
