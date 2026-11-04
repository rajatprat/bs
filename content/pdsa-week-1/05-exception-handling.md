---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 1
section: Python recap
title: Exception Handling
slug: pdsa-week-1-exception-handling
---

# Exception Handling

> **Start here**
> Programs go wrong: someone divides by zero, a file is missing, a list index is too big. Without a plan, Python stops the whole program with a red error. **Exception handling** lets us expect such problems and recover calmly.

## Things that can go wrong while code runs

| Code | What goes wrong | Error Python shows |
|---|---|---|
| `y = x / z` | `z` is 0 | `ZeroDivisionError` |
| `y = int(s)` | `s` is `"abc"`, not a number | `ValueError` |
| `y = 5 * x` | `x` was never given a value | `NameError` |
| `y = l[i]` | `i` is not a valid index of list `l` | `IndexError` |
| `d[k]` | key `k` is not in dictionary `d` | `KeyError` |
| Open a file to read | The file does not exist | `FileNotFoundError` |
| Write to a file | The disk is full | `OSError` |

## Two kinds of errors

1. **Syntax error** — the code is written wrongly (like a missing `:`). Python refuses to even start. You can't "handle" this — just fix the code.
   `SyntaxError: invalid syntax`
2. **Run-time errors (exceptions)** — the code is written correctly but something goes wrong **while it runs**. These are the ones we handle.
   `NameError: name 'x' is not defined`
   `ZeroDivisionError: division by zero`
   `IndexError: list assignment index out of range`

## Two key words

- **Raise an exception** — when a run-time error happens, Python *raises* (signals) it, with its type and a message. Example: `NameError: name 'x' is not defined`.
- **Handle an exception** — your code *catches* it and takes corrective action based on its type.

If nobody handles it, the program **aborts** (stops).

**Everyday example:** A cricket ball is hit high (exception raised). If a fielder catches it (handled), the game goes on calmly. If nobody catches it, it falls to the ground (program aborts).

## The try–except structure

```python
try:
    ...                         # code where an error may happen
except IndexError:
    ...                         # runs only for IndexError
except (NameError, KeyError):
    ...                         # one block for two types
except:
    ...                         # any other error
else:
    ...                         # runs only if try had NO error
```

How Python reads this:

1. Run the `try` block.
2. If an error happens, **jump** out of `try` at once and look down the `except` lines **in order**. Run the **first** one that matches the error type.
3. If no error happened, skip all the `except` blocks and run `else`.

![Flowchart: run the try block; if no error go to else; if error, check each except block top to bottom and run the first match; if none match the program aborts](images/pdsa-week-1/img07-try-except-flow.webp)
*Error? Python checks the `except` blocks from top to bottom. No error? It runs `else`.*

A small working example:

```python
try:
    x = int(input("Enter a number: "))
    print(100 / x)
except ValueError:
    print("That was not a number.")
except ZeroDivisionError:
    print("Cannot divide by zero.")
else:
    print("All good!")
```

| User types | What prints |
|---|---|
| `4` | `25.0` then `All good!` |
| `0` | `Cannot divide by zero.` |
| `hello` | `That was not a number.` |

## Using exceptions "positively"

Exceptions are not only for disasters. Sometimes they make normal code simpler.

> **Lecture example — cricket scores**
> We keep each batter's scores in a dictionary:
> `scores = {"Shefali": [3, 22], "Harmanpreet": [200, 3]}`
> A new score `s` arrives for batter `b`.
> - If `b` is already in the dictionary → add to the list: `scores[b].append(s)`
> - If `b` is new → make a fresh list: `scores[b] = [s]`

**Traditional way — check first:**

```python
if b in scores.keys():
    scores[b].append(s)
else:
    scores[b] = [s]
```

**Exception way — just try it:**

```python
try:
    scores[b].append(s)
except KeyError:              # b was not there
    scores[b] = [s]
```

Both give the same result. The second one says: "Assume the batter exists; if not, Python tells us with a `KeyError`, and we create the entry."

## Where does an unhandled error go?

Functions call other functions. Suppose the main code calls `f()`, `f()` calls `g()`, and `g()` calls `h()`.

If an `IndexError` happens inside `h()` and `h()` does not handle it:

1. The error goes **back** to `g()` (the one that called `h()`).
2. If `g()` doesn't handle it, it goes back to `f()`.
3. If `f()` doesn't handle it, it goes back to the main code.
4. If the main code doesn't handle it — **the program aborts**.

So an error **travels back up the chain of calls** until someone catches it.

![Four stacked boxes main, f, g, h; an IndexError starts in h and an arrow carries it upward through g and f to main, where with no handler the program aborts](images/pdsa-week-1/img08-error-travels-up.webp)
*An error not caught in `h()` moves back to whoever called it — `g()`, then `f()`, then the main code. If no one catches it, the program stops.*

**In one line:** Put risky code in `try`, handle each error type in its own `except`, and remember an uncaught error travels back up to the caller.

**Exam words:** exception, raise, handle, try, except, else, `ZeroDivisionError`, `NameError`, `IndexError`, `KeyError`, `ValueError`, syntax error vs run-time error, abort.

## Quick check

<details><summary>1. Can try–except handle a <code>SyntaxError</code> in your own code?</summary>No. Python cannot even start a program with a syntax error. Fix the code instead.</details>

<details><summary>2. When does the <code>else</code> block of a try statement run?</summary>Only when the <code>try</code> block ran with no error at all.</details>

<details><summary>3. Which error does <code>d = {}; d["a"] += 1</code> raise?</summary><code>KeyError</code>, because the key "a" is not in the dictionary.</details>

<details><summary>4. <code>h()</code> raises an IndexError and does not handle it. <code>g()</code> called <code>h()</code> inside a try with <code>except IndexError</code>. What happens?</summary><code>g()</code> catches it and continues. The error never reaches <code>f()</code> or the main code.</details>

<details><summary>5. Two except blocks both match an error. Which runs?</summary>Only the first one (from top to bottom).</details>
