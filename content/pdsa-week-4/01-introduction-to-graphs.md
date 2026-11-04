---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 4
section: Graphs
title: Introduction to Graphs
slug: pdsa-week-4-introduction-to-graphs
---

# Introduction to Graphs

> **Start here**
> Many real problems are about **relationships**: who is friends with whom, which cities have direct flights, which task must finish before another. A **graph** is the simple picture that captures all of these: dots for things, lines for relationships. Once a problem becomes a graph, we can use the same algorithms to solve very different problems.

## Relations as pictures

**Example 1 — teachers and courses.**
- T = the set of teachers in a college, C = the set of courses.
- A = {(t, c) | teacher t teaches course c}. This is a set of pairs.
- Draw each teacher and course as a dot; draw an **arrow** from t to c if t teaches c.

**Example 2 — friendships.**
- P = a set of students.
- F = {(p, q) | p and q are friends, p ≠ q}.
- Friendship works both ways: (p, q) is in F **if and only if** (q, p) is in F. So we draw a **line** (no arrow).

![Two small pictures: on the left, teachers on one side with arrows to the courses they teach; on the right, students as dots joined by plain lines showing friendships](images/pdsa-week-4/img01-graph-basics.webp)
*A directed graph uses arrows (teacher → course). An undirected graph uses plain lines (friendship goes both ways).*

## What is a graph?

> **Graph G = (V, E)**
> - **V** = a set of **vertices** (also called **nodes**). One vertex, many vertices.
> - **E** = a set of **edges**. Each edge is a pair of vertices: E ⊆ V × V.

| Type | Rule | Example |
|---|---|---|
| **Directed graph** | (v, v′) in E does **not** mean (v′, v) is in E. Edges are arrows. | Teacher → course; one-way flight routes; "A is a parent of B" |
| **Undirected graph** | (v, v′) in E **if and only if** (v′, v) is in E. Edges are plain lines. | Friendship; two-way roads; "A is a friend of B" |

In an undirected graph, (v, v′) and (v′, v) are really the **same** edge.

## Paths

> A **path** is a sequence of vertices v₁, v₂, ..., vₖ where each next pair is joined by an edge: (vᵢ, vᵢ₊₁) is in E for every 1 ≤ i < k.

- Normally a path does **not** visit any vertex twice.
- A sequence that re-visits a vertex is usually called a **walk**.

**Example (friendship graph):** Kumar — Feroze — Colin — Aziz — Priya is a path (no repeats). If it continued "— Feroze — Sheila", Feroze would appear twice, so the whole sequence is a **walk**.

## Reachability

In a directed graph, paths must follow the arrows.

**Example — airline routes.** Cities are vertices; a direct flight from city u to city v is an edge u → v. "How can I fly from Madurai to Delhi?" means: **find a path from the Madurai vertex to the Delhi vertex.**

> Vertex v is **reachable** from vertex u if there is a path from u to v.

Typical questions:
- Is v reachable from u?
- What is the **shortest** path from u to v?
- Which vertices are reachable from u?
- Is the graph **connected** — is every vertex reachable from every other?

We answer these with BFS and DFS later this week.

## Graphs solve many other problems

The magic of graphs: very different real-life problems become the **same** graph problem. Here are four from the lecture.

![Four small panels: a 5-vertex graph coloured with 3 colours so no edge joins the same colour; a path of 5 vertices with cameras on vertices 2 and 4 covering every edge; a path of 5 vertices with vertices 1, 3 and 5 chosen and no two joined; a graph with 3 highlighted edges that share no vertex](images/pdsa-week-4/img02-graph-problems.webp)
*Four classic graph problems: colouring, vertex cover, independent set and matching.*


### 1. Graph colouring

**Problem:** colour a map so that states sharing a border get different colours. How few colours do we need?

**As a graph:** each state is a vertex; join two states if they share a border. Give each vertex a colour so that **the two ends of every edge have different colours**.

> A **colouring** is a function c : V → C such that if (u, v) is in E, then c(u) ≠ c(v).

- Only the graph matters — you can stretch or bend the map; the problem is the same. That's the power of **abstraction**.
- **Four Colour Theorem:** for maps (planar graphs), **4 colours are always enough**.
- Not every graph is planar. For general graphs, finding the minimum number of colours is hard.

**Why care? — classrooms.** Courses are vertices; join two courses if their timetable slots overlap. Colours = classrooms. The minimum number of colours = the minimum number of classrooms needed.

### 2. Vertex cover

**Problem:** a hotel wants security cameras. Corridors are straight lines. A camera at an intersection watches **all corridors meeting there**. What is the minimum number of cameras?

**As a graph:** intersections are vertices, corridor segments are edges. Choose the **smallest set of vertices that touches every edge**.

### 3. Independent set

**Problem:** a dance school has several group dances; dancers may be in more than one dance. In a programme, each dancer performs **at most once**. What is the maximum number of dances we can include?

**As a graph:** each dance is a vertex; join two dances if they share a dancer. Choose the **largest set of vertices with no edge between any two of them**.

### 4. Matching

**Problem:** a class project is done alone or in pairs, and pairs must be friends. Make good groups.

**As a graph:** the friendship graph. A **matching** is a set of edges where **no two edges share a vertex** (each person is in at most one pair). Find a **maximal** matching. Is there a **perfect** matching — one that covers every vertex?

| Problem | Real question | Graph question |
|---|---|---|
| Colouring | Fewest colours / classrooms | Colour vertices so every edge has different-coloured ends |
| Vertex cover | Fewest cameras | Smallest set of vertices touching every edge |
| Independent set | Most dances | Largest set of vertices with no edges between them |
| Matching | Project pairs | Set of edges with no shared vertex |

**In one line:** A graph G = (V, E) has vertices (things) and edges (relationships), directed or undirected; paths and reachability are the basic questions, and colouring, vertex cover, independent set and matching are more examples.

**Exam words:** graph, vertex/node, edge, directed, undirected, path, walk, reachable, connected, graph colouring, Four Colour Theorem, vertex cover, independent set, matching, perfect matching.

## Quick check

<details><summary>1. "A is a parent of B" — directed or undirected graph? "A and B are classmates"?</summary>Parent: <b>directed</b> (it doesn't go both ways). Classmates: <b>undirected</b>.</details>

<details><summary>2. What is the difference between a path and a walk?</summary>A path doesn't repeat vertices; a walk may revisit a vertex.</details>

<details><summary>3. A triangle graph has edges 1–2, 2–3, 1–3. How many colours does it need?</summary><b>3</b> — every pair of vertices is joined, so all three must differ.</details>

<details><summary>4. For the path graph 1–2–3–4, give a smallest vertex cover.</summary>{2, 3} covers edges 1–2, 2–3 and 3–4. Size <b>2</b>. (One vertex can't cover all three edges.)</details>

<details><summary>5. For the path graph 1–2–3–4, give a largest independent set and a perfect matching.</summary>Independent set: {1, 3} or {2, 4} or {1, 4} — size <b>2</b>. Perfect matching: edges <b>1–2 and 3–4</b>.</details>
