---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 4
section: Revision and practice
title: Week 4 Quick Revision
slug: pdsa-week-4-quick-revision
---

# Week 4 Quick Revision

> **Start here**
> Week 4 in one page: what graphs are, how to store them, BFS and DFS, what they reveal (components, cycles, edge types), and DAGs with topological sort and longest paths.

![Week 4 at a glance: a small graph, an adjacency matrix and list, BFS rings, a DFS path with backtracking, a DAG of tasks, and a longest path highlighted](images/pdsa-week-4/img14-week4-summary.webp)
*The whole of Week 4 in one picture.*

## 1. Graph basics

- G = (V, E): vertices (nodes) and edges.
- **Directed** (arrows, one way) vs **undirected** (lines, both ways).
- **Path** = no repeated vertex; **walk** may repeat.
- v is **reachable** from u if there's a path u ⇝ v.
- Other graph problems: **colouring** (4 colours suffice for maps), **vertex cover**, **independent set**, **matching**.

## 2. Representations (n vertices, m edges)

| | Adjacency matrix | Adjacency list |
|---|---|---|
| Storage | n × n, A[i, j] = 1 if edge | Dictionary: vertex → list of neighbours |
| Space | n² | about n + m |
| Is (i, j) an edge? | O(1) | O(degree(i)) |
| All neighbours of i | O(n) | O(degree(i)) |

- Undirected matrix is **symmetric**. Directed: row = outgoing, column = incoming.
- degree / indegree / outdegree. Sum of degrees = 2m.

## 3. BFS and DFS

| | BFS | DFS |
|---|---|---|
| Explores | Level by level | Deep first, then backtrack |
| Uses | Queue (FIFO) | Stack (LIFO) / recursion |
| Shortest paths? | **Yes** (fewest edges, via `level`) | No |
| Time (matrix / list) | O(n²) / O(n + m) | O(n²) / O(n + m) |

- BFS from 7 (airline graph): levels 1 = {4, 5, 8}, 2 = {0, 3, 6, 9}, 3 = {1, 2}. Path 7–4–0–2 via parents.
- DFS from 4: visits 4, 0, 1, 2, 3, 5, 6, 7, 8, 9.
- `parent[k] = j` lets you trace the path back.

## 4. Applications

- **Connected components:** BFS from the smallest unassigned vertex, give a new component number each time.
- **Cycles (undirected):** a **non-tree edge** in the BFS/DFS tree means a cycle.
- **DFS numbering:** pre[v] on entry, post[v] on exit (one counter).
- **Directed edge types** using intervals [pre, post]:
 - Tree / forward: [pre(u), post(u)] contains [pre(v), post(v)].
 - **Back**: [pre(v), post(v)] contains [pre(u), post(u)] → **cycle**.
 - Cross: intervals disjoint.
- **Strongly connected:** paths both ways. Graph splits into SCCs.

## 5. DAGs, topological sort, longest path

- **DAG** = directed graph with no directed cycles → models dependencies.
- **Topological sort:** for every edge (i, j), i before j. Every DAG has one; usually many.
- Every DAG has an **indegree-0** vertex; remove it, the rest is still a DAG.
- Algorithm: compute indegrees → repeatedly list an indegree-0 vertex, decrement its neighbours. Matrix O(n²), list + queue **O(m + n)**.
- **Longest path:** longest-path-to(i) = 0 if indegree 0, else 1 + max over incoming neighbours. Compute in topological order; one extra line `lpath[k] = max(lpath[k], lpath[j]+1)`. O(m + n).
- Lecture DAG: longest-path-to = 0, 0, 1, 1, 1, 2, 3, 4 for vertices 0–7 → 5 semesters.
- Longest path in general graphs: no efficient method known.

## Watch out — slide points to know

| Slide | Point |
|---|---|
| 4.2 directed adjacency matrix | Side note "Neighbours of 6 are [3, 5]" is from the undirected graph; in the directed graph 6's only out-neighbour is 5 |
| 4.5 DFSInitPrePost | `pre[i],post[i]) = (-1,-1)` is missing a bracket → `(pre[i], post[i]) = (-1, -1)` |
| 4.7 topological sort | The animation lists 1, 0, 3, 2, 5, 6, 4, 7; the matrix code (always the smallest indegree-0 vertex) outputs 0, 1, 2, 3, 4, 5, 6, 7 — both valid |
| 4.3 Queue class | `delq` copies the list (`queue[1:]`), so it's O(n); `collections.deque` gives O(1) |

## Practice questions

<details><summary>1. An undirected graph has 6 vertices with degrees 3, 2, 2, 1, 1, 1. How many edges?</summary>Sum of degrees = 10 = 2m → <b>m = 5</b>.</details>

<details><summary>2. Write the adjacency list for the undirected graph with edges 0–1, 0–2, 1–3.</summary><code>{0: [1, 2], 1: [0, 3], 2: [0], 3: [1]}</code></details>

<details><summary>3. BFS from 0 on the graph in Q2: give level and parent of every vertex.</summary>level: 0→0, 1→1, 2→1, 3→2. parent: 0→−1, 1→0, 2→0, 3→1.</details>

<details><summary>4. DFS from 0 on the graph in Q2 (neighbours in increasing order). Give pre and post numbers.</summary>Enter 0 (pre 0), enter 1 (1), enter 3 (2), leave 3 (3), leave 1 (4), enter 2 (5), leave 2 (6), leave 0 (7). pre = {0: 0, 1: 1, 3: 2, 2: 5}; post = {3: 3, 1: 4, 2: 6, 0: 7}.</details>

<details><summary>5. A directed graph's DFS gives pre(a) = 1, post(a) = 8, pre(b) = 3, post(b) = 4. There is an edge b → a. Does the graph have a cycle?</summary>[1, 8] contains [3, 4], and the edge goes b → a (to an ancestor) → back edge → <b>yes, a cycle</b>.</details>

<details><summary>6. How many connected components: vertices 0–6, edges 0–1, 1–2, 3–4, 5–6?</summary>{0, 1, 2}, {3, 4}, {5, 6} → <b>3</b>.</details>

<details><summary>7. Topologically sort: edges 5 → 2, 5 → 0, 4 → 0, 4 → 1, 2 → 3, 3 → 1 (always pick the smallest indegree-0 vertex).</summary>Indegrees: 0:2, 1:2, 2:1, 3:1, 4:0, 5:0. List 4 (0:1, 1:1) → 5 (2:0, 0:0) → 0 → 2 (3:0) → 3 (1:0) → 1. Order: <b>4, 5, 0, 2, 3, 1</b>.</details>

<details><summary>8. For the DAG in Q7, what is longest-path-to(1)?</summary>Path 5 → 2 → 3 → 1 has 3 edges; via 4 → 1 only 1. longest-path-to(1) = <b>3</b>.</details>

<details><summary>9. BFS on a graph with n = 1000 and m = 999 (a tree). Matrix or list — roughly how many steps each?</summary>Matrix: n² = 10,00,000. List: n + m ≈ 2000.</details>

<details><summary>10. Which of BFS or DFS would you use to find the minimum number of flights between two cities?</summary><b>BFS</b> — level = shortest path in number of edges.</details>
