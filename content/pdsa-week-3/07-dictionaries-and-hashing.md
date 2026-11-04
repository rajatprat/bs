---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 3
section: Lists, arrays and dictionaries
title: How Dictionaries Work — Hash Tables
slug: pdsa-week-3-dictionaries-and-hashing
---

# How Dictionaries Work — Hash Tables

> **Start here**
> A list lets you find an item by its **position** (0, 1, 2, ...). A dictionary lets you find a value by **any key** — a name, a roll number, a word — and it is just as fast for every key. How? A dictionary is secretly an **array**, plus a clever function that turns any key into an array position. This is called a **hash table**.

## Lists vs dictionaries

| | List / array | Dictionary |
|---|---|---|
| Access by | Position: `l[3]` | Key: `d["Asha"]` |
| Keys are | 0, 1, ..., n − 1 | Almost anything immutable: strings, numbers, tuples |
| Speed | O(1) | O(1) on average — the same for all keys ("random access") |

A dictionary is a collection of **key–value pairs**, like `{"Asha": 85, "Ravi": 72}`.

## The idea: turn keys into positions

The storage underneath is an **array**. Given a position i, we can reach A[i] in constant time. So we only need a way to convert **any key** into a position in 0, 1, ..., n − 1.

That converter is a **hash function**.

> **Hash function** h : S → X maps a big set of possible keys S to a small range of integers X = {0, 1, ..., n − 1}.

### A toy hash function — worked example

Let's use a table of size **n = 10** and this hash function: **add up the character codes of the key, then take the remainder when divided by 10**.

(Each character has a number code: 'a' = 97, 'b' = 98, 'c' = 99, 'd' = 100, 'g' = 103, 'o' = 111, 't' = 116.)

| Key | Character codes | Sum | Sum % 10 = h(key) |
|---|---|---|---|
| "cat" | 99 + 97 + 116 | 312 | **2** |
| "dog" | 100 + 111 + 103 | 314 | **4** |
| "act" | 97 + 99 + 116 | 312 | **2** ← same as "cat"! |
| "bat" | 98 + 97 + 116 | 311 | **1** |
| "god" | 103 + 111 + 100 | 314 | **4** ← same as "dog"! |

So "cat" goes to slot 2, "dog" to slot 4, "bat" to slot 1. But "act" also wants slot 2, and "god" also wants slot 4.

## Collisions

There are far more possible keys than slots (|X| is much smaller than |S|), so two different keys will sometimes get the **same** position:

> **Collision:** h(s) = h(s′) even though s ≠ s′.

A **good hash function** spreads keys out evenly to make collisions rare. (Our toy function is bad: any two words with the same letters, like "cat" and "act", always collide.) Collisions can't be avoided completely, so we need a plan to handle them.

![Keys cat, dog, act, bat, god pass through a hash function machine and drop into numbered slots 0 to 9 of an array; cat and act both land on slot 2 and dog and god both land on slot 4, shown with collision sparks](images/pdsa-week-3/img13-hash-function.webp)
*A hash function turns each key into a slot number. Two keys landing on the same slot is a collision.*

## Two ways to handle collisions

### 1. Open addressing (also called closed hashing)

Everything stays **inside the same array**. If the slot is taken, **probe** (try) other slots in a fixed sequence until a free one is found. The simplest sequence is "try the next slot": h, h+1, h+2, ... (wrapping around at the end). This is called **linear probing**.

Inserting cat, dog, act, bat, god in that order:

| Key | h(key) | Slots tried | Stored at |
|---|---|---|---|
| cat | 2 | 2 | 2 |
| dog | 4 | 4 | 4 |
| act | 2 | 2 (taken), 3 | **3** |
| bat | 1 | 1 | 1 |
| god | 4 | 4 (taken), 5 | **5** |

Final array (slots 0–9): `[ —, bat, cat, act, dog, god, —, —, —, — ]`

### 2. Open hashing (also called chaining)

Each slot of the array points to a **list** of key–value pairs. On a collision, just **add to that slot's list**.

| Slot | List stored there |
|---|---|
| 1 | bat |
| 2 | cat → act |
| 4 | dog → god |
| others | (empty) |

![Two hash tables side by side: on the left open addressing, where act moves to slot 3 and god to slot 4's neighbour slot 5; on the right open hashing, where slot 2 holds a small chain cat then act and slot 4 holds dog then god](images/pdsa-week-3/img14-collision-handling.webp)
*Open addressing: find another free slot in the same array. Open hashing: keep a little list at each slot.*

(Yes, the names are confusing: **open addressing = closed hashing**; **open hashing = chaining**. Learn them as pairs.)

| | Open addressing (closed hashing) | Open hashing (chaining) |
|---|---|---|
| Where collided keys go | Another free slot in the same array | Into a list hanging off the same slot |
| Extra memory | None beyond the array | Lists at each slot |
| When the table gets full | Probing gets long; must grow the table | Lists get long; must grow the table |

## Why dictionary keys must be immutable

The position of a key is computed from the key itself. If a key could change after it was stored, its hash would change too — and the dictionary would look in the **wrong slot** and never find it.

So Python only allows **immutable** keys: numbers, strings, tuples. Lists can't be keys:

```python
d = {[1, 2]: 3}
# TypeError: unhashable type: 'list'

d = {(1, 2): 3}      # a tuple is fine
```

## Hashing in the real world — SHA-256

**SHA-256** is an industry-standard hash function. Its output is **256 bits** long (usually written as 64 hexadecimal characters). Even a tiny change in the input gives a completely different hash.

**Use:** cloud storage services hash large files to **avoid storing duplicates**. If the hash of your file matches a file already stored, there is no need to upload it again.

**In one line:** A dictionary is a hash table — an array plus a hash function that turns keys into positions; collisions are handled by probing for another slot (open addressing) or by keeping a list at each slot (chaining).

**Exam words:** dictionary, key–value pair, hash function, hash table, collision, open addressing (closed hashing), probing, linear probing, open hashing (chaining), immutable keys, unhashable, SHA-256.

## Quick check

<details><summary>1. Using the toy hash (sum of codes % 10), where does "tab" go? Does it collide with anything above?</summary>t + a + b = 116 + 97 + 98 = 311 → slot <b>1</b>. It collides with "bat" (same letters).</details>

<details><summary>2. With linear probing, the table has slots 3, 4 and 5 full. A new key hashes to 3. Where does it go?</summary>Try 3 (full), 4 (full), 5 (full), 6 → stored at <b>slot 6</b>.</details>

<details><summary>3. Which name means "each slot holds a list of key–value pairs"?</summary>Open hashing (chaining).</details>

<details><summary>4. Why can't a list be a dictionary key, but a tuple can?</summary>A list can change (mutable), which would change its hash and lose the entry. A tuple can't change (immutable), so its hash is stable.</details>

<details><summary>5. What makes a hash function "good"?</summary>It spreads keys evenly over the slots, so collisions are rare (and it's fast to compute).</details>
