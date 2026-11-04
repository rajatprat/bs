---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 4
section: Directed acyclic graphs
title: Directed Acyclic Graphs (DAGs) — Tasks and Dependencies
slug: pdsa-week-4-directed-acyclic-graphs
---

# Directed Acyclic Graphs (DAGs) — Tasks and Dependencies

> **Start here**
> Some jobs must happen in a certain order: you can't paint a wall before plastering it, and you can't take Advanced Python before Basic Python. We draw such "this before that" rules as arrows. Because nothing can depend on itself (directly or in a loop), the arrows never form a cycle. That kind of graph is a **DAG** — and it lets us answer: **in what order should we do things, and how long will it all take?**

## Example — a startup's new office

A startup is doing the interiors of its new office. The tasks:

- Lay conduits (pipes) for electrical wires — **Conduits (E)**
- Lay telecom conduits — **Conduits (T)**
- Lay floor tiles — **Tiling**
- Plaster the walls — **Plastering**
- Paint the walls — **Painting**
- Do electrical wiring — **Wiring (E)**
- Do phone and network cabling — **Cabling (T)**
- Install electrical fittings — **Fittings (E)**

The rules (constraints):
1. Lay conduits **before** tiles and plastering.
2. Tiles and plastering **before** painting.
3. Finish painting **before** any cabling or wiring work.
4. Electrical wiring **before** installing fittings.

## Turning it into a graph

- **Vertices** are tasks.
- **Edge (t, u)** if task t must be completed **before** task u.

| From | To |
|---|---|
| Conduits (E) | Tiling, Plastering |
| Conduits (T) | Tiling, Plastering |
| Tiling | Painting |
| Plastering | Painting |
| Painting | Wiring (E), Cabling (T) |
| Wiring (E) | Fittings (E) |

![A DAG of eight office tasks: Conduits E and Conduits T at the top each pointing to Tiling and Plastering; both point to Painting; Painting points to Wiring E and Cabling T; Wiring E points to Fittings E](images/pdsa-week-4/img10-office-tasks-dag.webp)
*The office-interior tasks as a DAG: an arrow means "must be done before".*

## Typical questions

**1. In what order can we do the tasks?** Any order that respects all the arrows. There can be **many** valid orders, for example:
- Conduits (E) – Conduits (T) – Tiling – Plastering – Painting – Wiring (E) – Cabling (T) – Fittings (E)
- Conduits (T) – Conduits (E) – Plastering – Tiling – Painting – Wiring (E) – Fittings (E) – Cabling (T)

**2. How long will the work take?** If each task takes one day and independent tasks can happen at the same time, what is the minimum number of days?

## What exactly is a DAG?

> A **directed acyclic graph (DAG)** is a directed graph G = (V, E) **with no directed cycles**.

Why "no cycles"? A cycle like A → B → C → A would mean A must come before B, B before C, and C before A — impossible to schedule.

## Two problems we solve on DAGs

| Problem | Question | In the office example |
|---|---|---|
| **Topological sorting** | List V = {0, 1, ..., n − 1} so that for every edge (i, j), **i appears before j** | A valid order of tasks — a feasible schedule |
| **Longest path** | What is the longest chain of dependencies? | The minimum time to finish everything |

For the office: the longest chain is Conduits → Tiling (or Plastering) → Painting → Wiring (E) → Fittings (E): **5 tasks in a row**. So even with plenty of workers, it takes at least **5 days** (if each task takes a day).

## DAGs are everywhere

- **Prerequisites between courses** for completing a degree.
- **Recipes** — chop before frying, boil before mashing.
- **Construction projects.**
- Software builds (compile files before linking them), spreadsheet formulas (a cell is computed after the cells it uses), and more.

**In one line:** A DAG is a directed graph with no directed cycles, ideal for dependencies; we use it to find a valid order (topological sort) and the minimum time (longest path).

**Exam words:** dependency, constraint, DAG, directed acyclic graph, no directed cycles, feasible schedule, topological sorting, longest path.

## Quick check

<details><summary>1. Why can't a dependency graph have a directed cycle?</summary>A cycle A → B → ... → A would require A to finish before itself — impossible to schedule.</details>

<details><summary>2. In the office DAG, which tasks can start on day 1?</summary>Those with no arrows coming in: <b>Conduits (E) and Conduits (T)</b>.</details>

<details><summary>3. Is "Tiling – Conduits (E) – Conduits (T) – ..." a valid order?</summary>No — the edge Conduits (E) → Tiling says Conduits (E) must come before Tiling.</details>

<details><summary>4. Name two real-life situations that form a DAG.</summary>Any two of: course prerequisites, recipe steps, construction tasks, software build steps, spreadsheet formulas.</details>
