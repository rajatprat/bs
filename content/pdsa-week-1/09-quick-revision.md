---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 1
section: Revision and practice
title: Week 1 Quick Revision
slug: pdsa-week-1-quick-revision
---

# Week 1 Quick Revision

> **Start here**
> Everything from Week 1 on one page. Read it the night before a quiz. If any line feels unclear, go back to that topic's page.

![Week 1 at a glance: notebooks, GCD from slow to Euclid, primes up to square root n, exceptions travelling up, classes as templates, timing with perf_counter, and 3200 years versus 50 minutes](images/pdsa-week-1/img14-week1-summary.webp)
*The whole of Week 1 in one picture.*

## 1. Notebooks

- Notebook = cells. **Code cell** (Python + output) and **text cell** (Markdown).
- Python remembers what you **ran last**, not what is lowest on the page. `In [3]` = run order.
- **Kernel** = the engine that runs the code (we use Python). Jupyter = **Ju**lia + **Pyt**hon + **R**.
- **Google Colab** = free online Jupyter: no install, ML packages ready, GPU access.

## 2. GCD

| Method | Rule | Time grows with |
|---|---|---|
| Check every number | Largest i ≤ min(m, n) dividing both | min(m, n) |
| Subtraction (recursive) | gcd(m, n) = gcd(n, m − n) | max(m, n) in worst case — e.g. gcd(2, 9999) ≈ 5000 steps |
| **Euclid** | gcd(m, n) = gcd(n, m % n) | **number of digits** of max(m, n) |

- Base case: if n divides m, answer is n.
- Example: gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → **6**.

## 3. Primes

- Prime = **exactly two factors**, 1 and itself. **1 is not prime.** 2 is the only even prime.
- Factors come in pairs → only check up to **√n**.
- `break` = leave the loop at once.
- `for` when the number of rounds is known; `while` when it isn't — and make sure the `while` loop makes **progress** (else it never ends).
- `(a, b) = (b, a)` → multiple assignment (swap).
- Twin primes: (p, p + 2). Infinitely many? **Unproved conjecture.**

## 4. Exceptions

- Syntax error → can't run at all. Run-time error → an **exception**; can be handled.
- Common ones: `ZeroDivisionError`, `NameError`, `IndexError`, `KeyError`, `ValueError`.
- `try` → `except Type` (first match wins) → `except` (anything else) → `else` (only if no error).
- Uncaught error travels **back up** to the caller: h → g → f → main → abort.
- "Positive" use: `try: scores[b].append(s)` `except KeyError: scores[b] = [s]`.

## 5. Classes and objects

- **ADT** = data + allowed functions. Keep **public interface** separate from **private implementation**.
- **Class** = template; **object** = instance.
- `__init__` = constructor; `self` = this object, always the first parameter.
- (x, y) and (r, θ) Point classes have the **same interface** — users don't need to know which one is inside.
- `__str__` → `print()` / `str()`; `__add__` → `+`; `__mul__` → `*`; `__lt__` → `<`; `__ge__` → `>=`.

## 6. Timing and efficiency

- `time.perf_counter()`: take two readings, subtract → seconds.
- **Python ≈ 10⁷ operations per second** (rough estimate).
- 2¹⁰ = 1024 ≈ 10³ → 10 halvings ÷ 1000. About 30 halvings for 10⁹ items.
- SIM–Aadhaar: nested loop 10¹⁸ checks ≈ **3200 years**; sort + halving 3 × 10¹⁰ checks ≈ **50 minutes**.
- **Both algorithms and data structures matter.**

## Watch out — mistakes in the slides

| Slide | What's wrong | Correct |
|---|---|---|
| Recap III gcd code | `else` without `:` | `else:` |
| Recap II √n code | `while` line is missing `):` at the end | `while (result and (i <= math.sqrt(n))):` |
| Recap II, Methods 2 and 3 | `prime(1)` returns True | add `if n < 2: return False` |
| Recap III subtraction gcd | gcd(2, 9999) needs 5000 nested calls | real Python stops with `RecursionError` (limit ≈ 1000) |
| Classes — polar Point | `math.atan(y/x)` gives wrong angle when x < 0 (and for straight-down points) | use `math.atan2(y, x)` |
| Classes — special functions | `mult` | `__mul__` |
| Timing slides | "perf time()" | `perf_counter()` |
| Jupyter slides | Kaggle at kaggle.org | kaggle.com |

## Practice questions

<details><summary>1. What does this print? <code>l = [4, 8, 15, 16, 23, 42]; print(l[-2], l[1:3])</code></summary><code>23 [8, 15]</code>. l[-2] is the second-last item; l[1:3] takes positions 1 and 2.</details>

<details><summary>2. Using Euclid's algorithm, find gcd(252, 105). Show the steps.</summary>252 % 105 = 42 → gcd(105, 42). 105 % 42 = 21 → gcd(42, 21). 42 % 21 = 0 → <b>21</b>.</details>

<details><summary>3. To check whether 221 is prime with the √n method, which numbers do you test? Is it prime?</summary>√221 ≈ 14.9, so test 2 to 14. 221 = 13 × 17, so 13 divides it. <b>Not prime.</b></details>

<details><summary>4. What does this print?
<pre>try:
    x = [1, 2, 3]
    print(x[5])
except KeyError:
    print("A")
except IndexError:
    print("B")
else:
    print("C")</pre></summary><b>B</b>. x[5] is an invalid list index → IndexError. KeyError doesn't match, so the IndexError block runs. else is skipped because an error happened.</details>

<details><summary>5. What does this print?
<pre>class Box:
    def __init__(self, v=1):
        self.v = v
    def __add__(self, other):
        return Box(self.v * other.v)
    def __str__(self):
        return "Box" + str(self.v)

print(Box(3) + Box())</pre></summary><b>Box3</b>. Box() has v = 1 (default). <code>+</code> calls __add__, which (surprise!) multiplies: 3 × 1 = 3. print calls __str__ → "Box3". The operator name tells Python <i>when</i> to call the method, not <i>what</i> it does.</details>

<details><summary>6. A program has 3 nested loops, each running 1000 times. Roughly how long in Python?</summary>1000 × 1000 × 1000 = 10⁹ operations. 10⁹ ÷ 10⁷ = <b>100 seconds</b>.</details>

<details><summary>7. How many halvings to find one name among 10¹² sorted names?</summary>10¹² = (10³)⁴ ≈ (2¹⁰)⁴ = 2⁴⁰, so about <b>40</b>.</details>

<details><summary>8. Will this loop end? <code>i = 1</code> / <code>while i != 10: i = i + 2</code></summary><b>No.</b> i takes values 1, 3, 5, 7, 9, 11, ... — it is always odd, so it never equals 10. Use <code>i &lt; 10</code> instead.</details>

<details><summary>9. Fill in the dictionary after <code>primediffs(20)</code>.</summary>Primes 2, 3, 5, 7, 11, 13, 17, 19 → gaps 1, 2, 2, 4, 2, 4, 2 → <b>{1: 1, 2: 4, 4: 2}</b>.</details>

<details><summary>10. Why does the subtraction gcd become slow for gcd(2, 9999), but Euclid's version doesn't?</summary>Subtraction removes only 2 each step (about 5000 steps). Euclid uses the remainder: 9999 % 2 = 1 in one step, so gcd(2, 9999) → gcd(2, 1) → 1.</details>
