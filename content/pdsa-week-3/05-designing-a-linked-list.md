---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 3
section: Lists, arrays and dictionaries
title: Designing a Flexible (Linked) List in Python
slug: pdsa-week-3-designing-a-linked-list
---

# Designing a Flexible (Linked) List in Python

> **Start here**
> Now we build our own linked list with a Python class called `Node`. We write four operations: check if empty, **append** at the end, **insert** at the start, and **delete** a value. Each one has a small trick — especially insert, because **we are not allowed to change where the head points**.

## The Node class

A list is a chain of nodes. Each node stores a value and a link to the next node.

```python
class Node:
    def __init__(self, v = None):
        self.value = v        # the stored value
        self.next = None      # link to the next node (None = no next node)
        return

    def isempty(self):
        if self.value == None:
            return True
        else:
            return False
```

**How we represent lists:**

| Code | What it creates |
|---|---|
| `l1 = Node()` | An **empty** list (one node with value None) |
| `l2 = Node(5)` | A **singleton** list holding just 5 |
| `l1.isempty()` | `True` |
| `l2.isempty()` | `False` |

**Design choice:** an empty list is **not** `None` — it is a node whose value is `None`. That way, every list (even an empty one) is a `Node` object, and we can always call methods on it.

## Append — add v at the end

**Idea:**
1. If the list is empty, just put v into the head node's value.
2. Otherwise, walk to the **last** node (the one whose `next` is None).
3. Make its `next` point to a **new node** holding v.

```python
    def appendi(self, v):        # append, iterative
        if self.isempty():
            self.value = v
            return
        temp = self
        while temp.next != None:  # walk to the last node
            temp = temp.next
        temp.next = Node(v)       # attach the new node
        return
```

**Trace:** start with `l = Node()`.

| Call | What happens | List |
|---|---|---|
| `l.appendi(1)` | List empty → value becomes 1 | 1 |
| `l.appendi(2)` | Walk to last (1), attach Node(2) | 1 → 2 |
| `l.appendi(3)` | Walk 1 → 2, attach Node(3) | 1 → 2 → 3 |

Append takes **O(n)** time here, because we walk to the end each time. (A recursive version works the same way: if this is the last node, attach; otherwise ask `self.next` to append.)

## Insert — add v at the start (the tricky one)

We want v to become the **first** value. The obvious idea — make a new node and point the head to it — **doesn't work**, because the variable `l` outside the method still points to the **old** head node. **We cannot change where the head points.**

**The trick:** keep the head node where it is, but **swap the values**:

1. Create a new node holding v.
2. **Exchange the values** of the head node and the new node. Now the head holds v, and the new node holds the old first value v₀.
3. **Re-link:** new node points to what the head pointed to; head points to the new node.

```python
    def insert(self, v):
        if self.isempty():
            self.value = v
            return
        newnode = Node(v)
        # Exchange values in self and newnode
        (self.value, newnode.value) = (newnode.value, self.value)
        # Switch links
        (self.next, newnode.next) = (newnode, self.next)
        return
```

**Trace:** l is 1 → 2 → 3. Call `l.insert(0)`.

| Step | Head node | New node | Chain |
|---|---|---|---|
| Create new node | 1 (→ 2) | 0 | — |
| Swap values | **0** (→ 2) | **1** | — |
| Switch links | 0 → new node | 1 → 2 | **0 → 1 → 2 → 3** ✔ |

The head node is the **same object** as before (so `l` still works), but now it holds 0. Insert at the start takes **O(1)** time.

![Three steps of inserting 0 at the start of the list 1, 2, 3: a new node with 0 is created beside the head; the values 0 and 1 are swapped between the head and the new node; the links are switched so the chain reads 0, 1, 2, 3 with the head node unchanged](images/pdsa-week-3/img09-insert-at-head.webp)
*Insert at the start: swap the values of the head and the new node, then switch the links. The head node itself never moves.*

## Delete — remove the first occurrence of v

**Idea:** scan the list and **look one step ahead**. If the **next** node holds v, bypass it: point the current node's `next` to the node after it.

**Problem:** we can't bypass the **first** node (the head can't move). **Fix:** copy the second node's value into the head, then bypass the second node.

```python
    def delete(self, v):          # delete, recursive
        if self.isempty():
            return
        if self.value == v:
            self.value = None
            if self.next != None:
                self.value = self.next.value   # copy the 2nd value into the head
                self.next = self.next.next     # bypass the 2nd node
            return
        else:
            if self.next != None:
                self.next.delete(v)            # delete from the rest of the list
                if self.next.value == None:    # the next node became empty
                    self.next = None           #   → cut it off
            return
```

### Traces (all checked by running the code)

| List before | delete(v) | What happens | List after |
|---|---|---|---|
| 1 → 2 → 3 | delete(2) | head ≠ 2; recurse into node 2; it holds 2, so it copies 3 into itself and bypasses node 3 | 1 → 3 |
| 1 → 2 → 3 | delete(1) | head holds 1: copy 2 into the head, bypass node 2 | 2 → 3 |
| 1 → 2 → 3 | delete(3) | recurse to node 3; it holds 3 and has no next, so its value becomes None; node 2 sees this and cuts it off | 1 → 2 |
| 1 | delete(1) | head holds 1 and has no next → value becomes None | empty |
| 5 → 5 → 6 | delete(5) | only the **first** 5 is removed | 5 → 6 |
| 1 → 2 → 3 | delete(9) | 9 not found, nothing changes | 1 → 2 → 3 |

![Deleting 2 from the list 1, 2, 3: the node holding 2 copies the value 3 from its next node, then links past that next node, so the chain becomes 1, 3](images/pdsa-week-3/img10-delete-bypass.webp)
*Deleting: copy the next value forward and bypass the next node — the "look ahead and bypass" trick.*

(Exercise from the lecture: write an **iterative** version of delete.)

## Summary of operations

| Operation | Trick | Time |
|---|---|---|
| `isempty()` | Empty list = node with value None | O(1) |
| `appendi(v)` | Walk to the last node, attach a new node | O(n) |
| `insert(v)` | Swap values with a new node, switch links (head can't move) | O(1) |
| `delete(v)` | Look ahead and bypass; for the head, copy the next value in | O(n) |

**In one line:** A linked list is a chain of `Node` objects; append walks to the end, insert swaps values so the head stays put, and delete looks one step ahead to bypass the node.

**Exam words:** Node, value, next, empty list (value None), singleton, appendi, insert at head, swap values, switch links, delete first occurrence, look ahead, bypass.

## Quick check

<details><summary>1. What does <code>Node().isempty()</code> return? And <code>Node(7).isempty()</code>?</summary><code>True</code> and <code>False</code>.</details>

<details><summary>2. l is 4 → 5. After <code>l.insert(3)</code> and then <code>l.appendi(6)</code>, what is l?</summary>Insert at start: 3 → 4 → 5. Append: <b>3 → 4 → 5 → 6</b>.</details>

<details><summary>3. Why can't insert just create a new node and make it the head?</summary>The variable holding the list still points to the old head node. A method can't change what that outside variable points to, so the new node would be lost. Swapping values keeps the same head node.</details>

<details><summary>4. l is 7 → 8 → 7. What is l after <code>l.delete(7)</code>?</summary>Only the first 7 is removed: <b>8 → 7</b>.</details>

<details><summary>5. What is the time complexity of inserting at the start? Of appending at the end?</summary>Insert at start: O(1). Append at end: O(n) (walk to the last node).</details>
