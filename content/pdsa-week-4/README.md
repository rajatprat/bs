# PDSA — Week 4 (Graphs)

Source: IIT Madras BS lectures by Madhavan Mukund, Week 4 (Lectures 4.1–4.8).
Course slug: `pdsa`. Images folder: `images/pdsa-week-4/`.

## Page order

| # | File | Section | Title | Lecture |
|---|---|---|---|---|
| 1 | 01-introduction-to-graphs.md | Graphs | Introduction to Graphs | 4.1 |
| 2 | 02-representing-graphs.md | Graphs | Representing Graphs — Adjacency Matrix and Adjacency List | 4.2 |
| 3 | 03-breadth-first-search.md | Exploring graphs | Breadth First Search (BFS) | 4.3 |
| 4 | 04-depth-first-search.md | Exploring graphs | Depth First Search (DFS) | 4.4 |
| 5 | 05-applications-of-bfs-and-dfs.md | Exploring graphs | Applications of BFS and DFS | 4.5 |
| 6 | 06-directed-acyclic-graphs.md | Directed acyclic graphs | Directed Acyclic Graphs (DAGs) | 4.6 |
| 7 | 07-topological-sorting.md | Directed acyclic graphs | Topological Sorting | 4.7 |
| 8 | 08-longest-path-in-dags.md | Directed acyclic graphs | Longest Path in a DAG | 4.8 |
| 9 | 09-quick-revision.md | Revision and practice | Week 4 Quick Revision | all |

## Images (ChatGPT, 1536 × 1024, white background)

| File | Page | Shows |
|---|---|---|
| img01-graph-basics | 01 | Directed (teacher → course) vs undirected (friendship) |
| img02-graph-problems | 01 | Colouring, vertex cover, independent set, matching |
| img03-airline-graph | 02 | Undirected airline graph, 10 vertices, 13 edges |
| img04-matrix-vs-list | 02 | Adjacency matrix vs adjacency list |
| img05-bfs-layers | 03 | BFS from 7 in rings by level |
| img06-queue-vs-stack | 04 | Queue (FIFO) vs stack (LIFO) |
| img07-dfs-path | 04 | DFS from 4 with backtracking |
| img08-components | 05 | Four connected components |
| img09-edge-types | 05 | Tree / forward / back / cross edges with pre/post |
| img10-office-tasks-dag | 06 | Office interior tasks DAG |
| img11-topo-dag | 07 | Lecture DAG with indegrees |
| img12-topo-peeling | 07 | Removing indegree-0 vertices step by step |
| img13-longest-path | 08 | Lecture DAG labelled with longest-path-to values |
| img14-week4-summary | 09 | Week 4 at a glance |

## Fact checks (all run in Python 3)

- Directed and undirected airline adjacency matrices rebuilt from the edge list and matched to slides 4.2 (p9, p10); adjacency list matches slide p35.
- neighbours(A, 7) = [4, 5, 8]; neighbours(A, 6) = [3, 5]; directed out(6) = [5], in(6) = 1.
- Queue class output matches slide 4.3.
- BFS from 7: order/levels/parents match slide 4.3 (path 7–4–0–2). Directed BFS 9 → 0 = 5 edges (9–8–5–3–4–0).
- DFS from 4 matches slide 4.4 (4, 0, 1, 2, 3, 5, 6, 7, 8, 9); pre/post table computed by code.
- Components example, square-cycle example, and directed tree/forward/back/cross example all computed by code.
- Topological sort DAG edges read from slide 4.7 picture; indegrees 0,0,2,1,1,2,1,4 match. Matrix code → 0..7; list code → 0,1,3,4,2,5,6,7; slide order 1,0,3,2,5,6,4,7 verified valid.
- Longest paths 0,0,1,1,1,2,3,4 match slide 4.8.
- All Quick check / practice answers run in code.
