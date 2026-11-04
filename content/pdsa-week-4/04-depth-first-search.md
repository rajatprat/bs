---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 4
section: Exploring graphs
title: Depth First Search (DFS)
slug: pdsa-week-4-depth-first-search
---

# Depth First Search (DFS)

> **Start here**
> BFS spreads out carefully, layer by layer. **Depth first search** is the adventurous explorer: it rushes down one path as far as it can, and only when it hits a dead end does it **backtrack** to the last place where it had another choice. It's like exploring a maze by always taking the next unexplored turn.

## The idea

1. Start from vertex i. Pick an **unexplored neighbour** j.
2. **Suspend** (pause) the exploration of i and explore j instead.
3. Keep going deeper until you reach a vertex with **no unexplored neighbours**.
4. **Backtrack** to the most recently suspended vertex that still has an unexplored neighbour, and continue from there.

Suspended vertices are kept on a **stack** — **last in, first out**. The most recently suspended vertex is checked first.

| | BFS | DFS |
|---|---|---|
| Order | Level by level | One path as deep as possible, then backtrack |
| Waiting vertices kept in | **Queue** (first in, first out) | **Stack** (last in, first out) |
| Paths found | **Shortest** (fewest edges) | Not necessarily shortest |

**Everyday example:** Exploring a maze. At every junction you take the first passage you haven't tried. At a dead end, you walk back to the last junction with an untried passage. The trail of junctions you walked back through is your "stack".

![A queue drawn as a line of people where the first to join leaves first, next to a stack drawn as a pile of plates where the last plate added is taken first](images/pdsa-week-4/img06-queue-vs-stack.webp)
*BFS uses a queue (first in, first out). DFS uses a stack (last in, first out).*

## Full trace — DFS from vertex 4 (undirected airline graph)

Adjacency list (neighbours tried in this order): 0:[1, 2, 4], 1:[0, 2], 2:[0, 1], 3:[4, 5, 6], 4:[0, 3, 7], 5:[3, 6, 7, 8], 6:[3, 5], 7:[4, 5, 8], 8:[5, 7, 9], 9:[8].

| Step | What happens | Stack of suspended vertices |
|---|---|---|
| 1 | Mark 4. Suspend 4, explore its first unvisited neighbour **0** | 4 |
| 2 | Suspend 0, explore **1** | 4, 0 |
| 3 | Suspend 1, explore **2** | 4, 0, 1 |
| 4 | 2 has no unvisited neighbours (0, 1 done). Backtrack to 1, then 0, then 4 — none of 1, 0 have unvisited neighbours left | 4 |
| 5 | 4 still has unvisited neighbour 3. Suspend 4, explore **3** | 4 |
| 6 | Suspend 3, explore **5** | 4, 3 |
| 7 | Suspend 5, explore **6** | 4, 3, 5 |
| 8 | 6 is a dead end. Backtrack to 5; 5 still has unvisited 7. Explore **7** | 4, 3, 5 |
| 9 | Suspend 7, explore **8** | 4, 3, 5, 7 |
| 10 | Suspend 8, explore **9** | 4, 3, 5, 7, 8 |
| 11 | 9 is a dead end. Backtrack to 8, 7, 5, 3, 4 — nothing left. Done. | (empty) |

**Order in which DFS visits vertices:** 4, 0, 1, 2, 3, 5, 6, 7, 8, 9.

![DFS from vertex 4 on the airline graph: a highlighted path goes 4 to 0 to 1 to 2, dashed arrows show backtracking to 4, then a second highlighted path 4 to 3 to 5 to 6, a backtrack to 5, then 5 to 7 to 8 to 9](images/pdsa-week-4/img07-dfs-path.webp)
*DFS dives deep (4 → 0 → 1 → 2), backtracks, then dives again (4 → 3 → 5 → 6), backtracks to 5, and continues 5 → 7 → 8 → 9.*

Notice: DFS reached 2 by the path 4 – 0 – 1 – 2 (3 edges), but the shortest path is 4 – 0 – 2 (2 edges). **DFS paths are not necessarily shortest.**

## Implementing DFS — recursion does the stack for us

DFS is most natural as a **recursive** function: for each unvisited neighbour k of v, call DFS(k). The **recursion itself keeps the stack** of suspended calls — we don't need to manage a stack ourselves.

```python
(visited, parent) = ({}, {})            # global dictionaries

def DFSInitListGlobal(AList):
    # Initialization
    for i in AList.keys():
        visited[i] = False
        parent[i] = -1
    return

def DFSListGlobal(AList, v):
    visited[v] = True
    for k in AList[v]:
        if (not visited[k]):
            parent[k] = v
            DFSListGlobal(AList, k)
    return
```

Usage:
```python
DFSInitListGlobal(AList)
DFSListGlobal(AList, 4)
```

- `visited` and `parent` are **global**, so every recursive call updates the same dictionaries.
- We still need a separate **initialization** step to set them up for the size of the graph.

Result for DFS from 4: parent = {0: 4, 1: 0, 2: 1, 3: 4, 4: −1, 5: 3, 6: 5, 7: 5, 8: 7, 9: 8}.

## How long does DFS take?

Like BFS, each vertex is **marked once** and **explored once**. Exploring v means scanning all its neighbours.

| Representation | Time to explore v | Total |
|---|---|---|
| Adjacency matrix | n (whole row) | **O(n²)** |
| Adjacency list | degree(v) | O(n) setup + O(m) for all edges = **O(n + m)** |

Same as BFS.

## Why DFS is still useful

DFS doesn't give shortest paths, but the **order** in which it visits and finishes vertices reveals a lot about the graph's structure — cycles, connected pieces, and more. That's the next page.

**In one line:** DFS goes as deep as possible and backtracks using a stack (or recursion), takes O(n + m) with adjacency lists, but its paths are not necessarily shortest.

**Exam words:** DFS, suspend, backtrack, stack (LIFO), recursion keeps the stack, global visited/parent, O(n²) matrix, O(n + m) list, not shortest paths.

## Quick check

<details><summary>1. Which data structure does DFS use (explicitly or through recursion)?</summary>A stack — last in, first out.</details>

<details><summary>2. Run DFS from 9 on the undirected airline graph (neighbours in increasing order). In what order are vertices visited?</summary>9 → 8 → 5 → 3 → 4 → 0 → 1 → 2, backtrack to 4 → 7, backtrack to 3 → 6. Order: <b>9, 8, 5, 3, 4, 0, 1, 2, 7, 6</b>.</details>

<details><summary>3. Does DFS always find the shortest path? Give an example from the trace above.</summary>No. DFS from 4 reaches 2 via 4 – 0 – 1 – 2 (3 edges), but 4 – 0 – 2 has only 2 edges.</details>

<details><summary>4. Why don't we need an explicit stack in the recursive DFS?</summary>Each recursive call waits (is suspended) until its inner call finishes — Python's call stack keeps track of the suspended vertices for us.</details>

<details><summary>5. What is the complexity of DFS with an adjacency list?</summary>O(n + m).</details>
