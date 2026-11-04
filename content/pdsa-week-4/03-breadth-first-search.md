---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 4
section: Exploring graphs
title: Breadth First Search (BFS)
slug: pdsa-week-4-breadth-first-search
---

# Breadth First Search (BFS)

> **Start here**
> Breadth first search explores a graph **layer by layer**: first everything 1 step away, then everything 2 steps away, and so on — like ripples spreading out when you drop a stone in water. A bonus: BFS automatically finds the **shortest path** (fewest edges) to every reachable vertex.

## The idea

Start at a source vertex.
1. First **visit** all vertices **one step** away.
2. Then all vertices **two steps** away.
3. ... and so on.

Every visited vertex must be **explored** once: look at its neighbours and visit the ones not yet visited. **Never explore a vertex twice.**

So we keep track of two things:
- **Which vertices have been visited** (a `visited` dictionary: True / False).
- **Which visited vertices are still waiting to be explored** — kept in a **queue**.

**Everyday example:** News spreads in a class. You tell your friends (1 step). They tell their friends (2 steps). Nobody tells the same news twice to someone who already knows it.

## The queue — first in, first out

A **queue** is like a line at a ticket counter: whoever joins first is served first.

```python
class Queue:
    def __init__(self):
        self.queue = []
    def addq(self, v):              # join at the back
        self.queue.append(v)
    def delq(self):                 # leave from the front
        v = None
        if not self.isempty():
            v = self.queue[0]
            self.queue = self.queue[1:]
        return v
    def isempty(self):
        return self.queue == []
    def __str__(self):
        return str(self.queue)
```

```python
q = Queue()
for i in range(3):
    q.addq(i)
    print(q)            # [0]   then [0, 1]   then [0, 1, 2]
print(q.isempty())      # False
for j in range(3):
    print(q.delq(), q)  # 0 [1, 2]   then 1 [2]   then 2 []
print(q.isempty())      # True
```

(Note: `self.queue[1:]` copies the list, so this simple `delq` is O(n). Python's `collections.deque` has a truly O(1) `popleft()`. For learning, the simple class is fine.)

## The BFS algorithm

1. Set `visited[v] = False` for every vertex. Start with an empty queue.
2. **Visit** the start vertex: mark it True and add it to the queue.
3. While the queue is not empty:
   - Remove the vertex j at the **front** of the queue and **explore** it:
   - For each neighbour k of j: if k is not visited, mark it visited and add it to the queue.
4. Stop when the queue is empty.

```python
def BFSList(AList, v):
    visited = {}
    for i in AList.keys():
        visited[i] = False
    q = Queue()

    visited[v] = True
    q.addq(v)

    while (not q.isempty()):
        j = q.delq()
        for k in AList[j]:
            if (not visited[k]):
                visited[k] = True
                q.addq(k)

    return visited
```

## Full trace — BFS from vertex 7 (undirected airline graph)

Adjacency list: 0:[1, 2, 4], 1:[0, 2], 2:[0, 1], 3:[4, 5, 6], 4:[0, 3, 7], 5:[3, 6, 7, 8], 6:[3, 5], 7:[4, 5, 8], 8:[5, 7, 9], 9:[8].

| Step | Explore | Neighbours | Newly visited | Queue after |
|---|---|---|---|---|
| start | — | — | 7 | [7] |
| 1 | 7 | 4, 5, 8 | **4, 5, 8** | [4, 5, 8] |
| 2 | 4 | 0, 3, 7 | **0, 3** | [5, 8, 0, 3] |
| 3 | 5 | 3, 6, 7, 8 | **6** | [8, 0, 3, 6] |
| 4 | 8 | 5, 7, 9 | **9** | [0, 3, 6, 9] |
| 5 | 0 | 1, 2, 4 | **1, 2** | [3, 6, 9, 1, 2] |
| 6 | 3 | 4, 5, 6 | — | [6, 9, 1, 2] |
| 7 | 6 | 3, 5 | — | [9, 1, 2] |
| 8 | 9 | 8 | — | [1, 2] |
| 9 | 1 | 0, 2 | — | [2] |
| 10 | 2 | 0, 1 | — | [] → stop |

All 10 vertices are visited → every city is reachable from 7.

![BFS from vertex 7 drawn as rings: 7 at the centre (level 0), then 4, 5, 8 on the first ring (level 1), then 0, 3, 6, 9 on the second ring (level 2), then 1 and 2 on the third ring (level 3), with the BFS tree edges highlighted](images/pdsa-week-4/img05-bfs-layers.webp)
*BFS from 7 spreads in layers: level 1 = {4, 5, 8}, level 2 = {0, 3, 6, 9}, level 3 = {1, 2}.*

## How long does BFS take?

Let n = number of vertices and m = number of edges. Each reachable vertex is **visited once** (added to the queue) and **explored once** (removed from the queue). Exploring a vertex means checking all its edges.

| Representation | Exploring vertex i costs | Total |
|---|---|---|
| Adjacency matrix | Scan the whole row: n steps | n vertices × n = **O(n²)** |
| Adjacency list | degree(i) steps | n (setup) + sum of all degrees = n + 2m → **O(n + m)** |

**Why is the sum of degrees 2m?** In an undirected graph each edge (i, j) is counted twice: once in degree(i) and once in degree(j). (Check: the undirected airline graph has 13 edges; its degrees are 3, 2, 2, 3, 3, 4, 2, 3, 3, 1, which add up to 26 = 2 × 13 ✔.)

This "add up the cost over the whole run instead of per step" reasoning is another example of **amortised analysis**.

**Why we keep n and m separate:** a connected graph can have anywhere from n − 1 edges to n(n − 1)/2 edges. If m is much smaller than n², the adjacency list is much faster. **O(n + m)** — "linear time" — is the best possible for graphs, because you must look at every vertex and edge at least once.

## Recording paths — the parent

BFS tells us **whether** k is reachable. To get the actual **route**, remember **who discovered k**:

> When exploring j marks k as visited, set **parent[k] = j**.

Then from any vertex, follow parent links back to the start.

```python
def BFSListPath(AList, v):
    (visited, parent) = ({}, {})
    for i in AList.keys():
        visited[i] = False
        parent[i] = -1
    q = Queue()

    visited[v] = True
    q.addq(v)

    while (not q.isempty()):
        j = q.delq()
        for k in AList[j]:
            if (not visited[k]):
                visited[k] = True
                parent[k] = j
                q.addq(k)

    return (visited, parent)
```

## Recording distance — the level

Even better: instead of True/False, store each vertex's **level** (number of edges from the start). Use −1 for "not visited yet".

```python
def BFSListPathLevel(AList, v):
    (level, parent) = ({}, {})
    for i in AList.keys():
        level[i] = -1
        parent[i] = -1
    q = Queue()

    level[v] = 0
    q.addq(v)

    while (not q.isempty()):
        j = q.delq()
        for k in AList[j]:
            if (level[k] == -1):
                level[k] = level[j] + 1
                parent[k] = j
                q.addq(k)

    return (level, parent)
```

**Result of BFS from 7:**

| Vertex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| level | 2 | 3 | 3 | 2 | 1 | 1 | 2 | 0 | 1 | 2 |
| parent | 4 | 0 | 0 | 4 | 7 | 7 | 5 | −1 | 7 | 8 |

**Shortest path from 7 to 2:** start at 2 and follow parents: 2 → parent 0 → parent 4 → parent 7. Reverse it: **7 – 4 – 0 – 2** (3 edges, matches level[2] = 3).

> **level[k] is the length of the shortest path from the start to k, counted in number of edges.**

(Later in the course we'll see **weighted** graphs, where edges have costs like distance or ticket price; there "shortest" means least total cost, and BFS alone is not enough.)

**In one line:** BFS explores level by level using a queue, takes O(n + m) with adjacency lists (O(n²) with a matrix), and its parent/level records give shortest paths in number of edges.

**Exam words:** BFS, visited, explored, queue (FIFO), addq, delq, level, parent, shortest path (number of edges), O(n²) matrix, O(n + m) list, sum of degrees = 2m, amortised.

## Quick check

<details><summary>1. In BFS, which data structure holds the visited-but-not-yet-explored vertices?</summary>A queue (first in, first out).</details>

<details><summary>2. Run BFS from 9 on the undirected airline graph. Which vertices are at level 1 and level 2?</summary>Level 1: {8}. Level 2: {5, 7} (neighbours of 8). Level 3: {3, 6, 4}.</details>

<details><summary>3. Using the parent table above (BFS from 7), what is the shortest path from 7 to 1?</summary>1 → 0 → 4 → 7, reversed: <b>7 – 4 – 0 – 1</b>.</details>

<details><summary>4. A graph has n = 10⁴ vertices and m = 2 × 10⁴ edges. Compare BFS with a matrix vs a list.</summary>Matrix: n² = 10⁸ steps. List: n + m = 3 × 10⁴ steps — over 3000 times less work.</details>

<details><summary>5. In the directed airline graph, how many flights (edges) does the shortest route from Madurai (9) to Delhi (0) take?</summary>BFS from 9 gives level[0] = <b>5</b>: 9 → 8 → 5 → 3 → 4 → 0.</details>
