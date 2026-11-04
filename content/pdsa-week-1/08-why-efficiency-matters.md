---
course: Programming, Data Structures and Algorithms using Python (PDSA)
week: 1
section: Efficiency
title: Why Efficiency Matters
slug: pdsa-week-1-why-efficiency-matters
---

# Why Efficiency Matters

> **Start here**
> Does it really matter if a program is a little slow? This page answers with a real Indian problem: linking every SIM card to an Aadhaar card. A simple program would take **about 3200 years**. A smarter one takes **about 50 minutes**. Same computer, same data — only the method changes. That is why this course exists.

## The problem

Every SIM card must be linked to an Aadhaar card. For each SIM card, we must check its Aadhaar details against the Aadhaar database.

- **M** = number of SIM cards
- **N** = number of Aadhaar cards

How big are these? Almost everyone in India has an Aadhaar card, and the number of SIM cards is similar:

- N > 10⁹ (more than 100 crore)
- M > 10⁹

## The simple method — a nested loop

```
for each SIM card S:
    for each Aadhaar number A:
        check if Aadhaar details of S match A
```

For **each** SIM card, the inner loop goes through **all** Aadhaar cards. So the total number of checks is **M × N**.

### Let us calculate (take M = N = 10⁹)

| Step | Calculation | Result |
|---|---|---|
| Total checks | 10⁹ × 10⁹ | **10¹⁸** checks |
| Seconds (Python ≈ 10⁷ per second) | 10¹⁸ ÷ 10⁷ | **10¹¹ seconds** |
| Minutes | 10¹¹ ÷ 60 | ≈ 1.67 × 10⁹ minutes |
| Hours | 1.67 × 10⁹ ÷ 60 | ≈ 2.8 × 10⁷ hours |
| Days | 2.8 × 10⁷ ÷ 24 | ≈ 1.17 × 10⁶ days |
| Years | 1.17 × 10⁶ ÷ 365 | **≈ 3200 years!** |

(Exact value: about 3170 years. Either way — useless.) How can we fix this?

## A game: guess my birthday

I think of a date. You guess. I only answer **Yes**, **Earlier** or **Later**.

Say my birthday is **12 April**.

**Random guessing:** September 12? Earlier. February 23? Later. July 2? Earlier. ... This could go on for a long time.

**Smart guessing:** keep an **interval** of possible dates, and always guess the **middle**. Each answer throws away half the interval.

| Guess (the middle) | Answer | Dates still possible |
|---|---|---|
| (start) | — | 365 |
| June 30 | Earlier | 182 |
| March 31 | Later | 91 |
| May 15 | Earlier | 45 |
| April 22 | Earlier | 22 |
| April 11 | Later | 11 |
| April 16 | Earlier | 5 |
| April 13 | Earlier | 2 |
| April 12 | **Yes!** | 1 |

Found in **8 guesses** — always **under 10 questions** for any date in the year!

![A long bar of 365 days that gets halved again and again: 365, 182, 91, 45, 22, 11, 5, 2, 1, with an arrow pointing to 12 April at the end](images/pdsa-week-1/img12-birthday-halving.webp)
*Guess the middle every time and the possible dates halve: 365 → 182 → 91 → 45 → 22 → 11 → 5 → 2 → 1.*

This "guess the middle" trick is called **binary search**. We will study it properly in Week 2. It needs one thing: the data must be in **order** (dates in a year are already in order).

## The smart method — sort first, then halve

**Step 1:** Arrange (sort) the Aadhaar details in order of Aadhaar number.
**Step 2:** For each SIM card, use the halving trick on the sorted list.

```
for each SIM card S:
    probe the sorted Aadhaar list (halving) to check Aadhaar details of S
```

### How many halvings for 10⁹ cards?

Key fact: **2¹⁰ = 1024 ≈ 1000 = 10³.** So **10 halvings cut the list down about 1000 times**.

| Number of halvings | Cards still possible |
|---|---|
| 0 | 10⁹ |
| 10 | 10⁹ ÷ 10³ = 10⁶ |
| 20 | 10⁶ ÷ 10³ = 10³ |
| 30 | 10³ ÷ 10³ = **1** |

So about **30 checks** find any one card among 10⁹.

### Total time

| Step | Calculation | Result |
|---|---|---|
| Total checks | 10⁹ SIM cards × 30 | 3 × 10¹⁰ |
| Seconds | 3 × 10¹⁰ ÷ 10⁷ | **3000 seconds** |
| Minutes | 3000 ÷ 60 | **50 minutes** |

## From 3200 years to 50 minutes!

![Two lanes side by side: a nested-loop snail taking about 3200 years, and a binary-search rocket on a sorted list taking about 50 minutes](images/pdsa-week-1/img13-3200-years-vs-50-minutes.webp)
*Same data, same computer. Changing the method changed 3200 years into 50 minutes.*

| | Simple nested loop | Sort + halving |
|---|---|---|
| Checks per SIM card | 10⁹ (every Aadhaar) | about 30 |
| Total checks | 10¹⁸ | 3 × 10¹⁰ |
| Time in Python | ≈ 3200 years | ≈ 50 minutes |

**The catch:** we first have to **sort** the Aadhaar list. Sorting also takes time — but it is done **once**, and good sorting methods (coming in Week 2) are fast enough.

**The big lesson:**

1. **Algorithms matter** — a clever method (halving) beats a brute-force method (checking everything).
2. **Data structures matter** — **arranging the data** (keeping it sorted) is what makes the clever method possible.

Both together are what this course is about: **Programming, Data Structures and Algorithms**.

**In one line:** Nested loops over 10⁹ × 10⁹ items take ~3200 years; sorting once and then halving takes ~50 minutes — good algorithms plus good data arrangement make the difference.

**Exam words:** efficiency, nested loop (M × N), interval halving, binary search, sorted data, 2¹⁰ ≈ 10³, 10⁷ operations per second.

## Quick check

<details><summary>1. A nested loop runs over 10⁴ items inside 10⁵ items. Roughly how long in Python?</summary>10⁴ × 10⁵ = 10⁹ operations. 10⁹ ÷ 10⁷ = <b>100 seconds</b>.</details>

<details><summary>2. About how many halvings are needed to find one item among 10⁶ sorted items?</summary>10⁶ = 10³ × 10³ ≈ 2¹⁰ × 2¹⁰ = 2²⁰, so about <b>20</b>.</details>

<details><summary>3. What must be true about the data for the halving trick to work?</summary>It must be sorted (in order).</details>

<details><summary>4. Why is 2¹⁰ a handy number to remember?</summary>2¹⁰ = 1024 ≈ 1000, so every 10 halvings divide the size by about 1000.</details>

<details><summary>5. In the birthday game, what is the most number of questions needed for any date in a year?</summary>Under 10 (365 → 1 needs at most 9 halvings, since 2⁹ = 512 > 365).</details>
