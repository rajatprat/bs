# PDSA — Week 1 (Programming, Data Structures and Algorithms using Python)

Source: IIT Madras BS lectures by Madhavan Mukund, Week 1 (Lectures 1.1, 1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 1.11).
Course slug for the site: `pdsa`. Images folder: `images/pdsa-week-1/`.

## Page order

| # | File | Section | Title | Lecture |
|---|---|---|---|---|
| 1 | 01-jupyter-notebooks-and-colab.md | Getting started | Jupyter Notebooks and Google Colab | 1.1 |
| 2 | 02-python-recap-gcd.md | Python recap | Python Recap I — Computing the GCD | 1.3 |
| 3 | 03-python-recap-primes.md | Python recap | Python Recap II — Prime Numbers | 1.4 |
| 4 | 04-python-recap-euclid.md | Python recap | Python Recap III — Euclid's Algorithm | 1.5 |
| 5 | 05-exception-handling.md | Python recap | Exception Handling | 1.6 |
| 6 | 06-classes-and-objects.md | Python recap | Classes and Objects | 1.7 |
| 7 | 07-timing-our-code.md | Efficiency | Timing Our Code | 1.9 |
| 8 | 08-why-efficiency-matters.md | Efficiency | Why Efficiency Matters | 1.11 |
| 9 | 09-quick-revision.md | Revision and practice | Week 1 Quick Revision | all |

No "How to Solve" page yet — it will be added when the question papers arrive.

## Images (all ChatGPT, transparent background, ≥1536 px wide)

| File | Page | Shows |
|---|---|---|
| img01-notebook-cells | 01 | Notebook as a column of text cell / code cell / output |
| img02-gcd-common-factors | 02 | Factors of 8 and 12 overlapping; GCD 4 |
| img03-for-vs-while | 03 | for = fixed laps; while = run until condition |
| img04-factor-pairs | 03 | Factor pairs of 36 with √36 = 6 line |
| img05-twin-primes | 03 | Number line 1–31 with twin prime pairs |
| img06-subtraction-vs-remainder | 04 | 5000 small steps vs one remainder jump |
| img07-try-except-flow | 05 | try / except / else flowchart |
| img08-error-travels-up | 05 | Uncaught error moving h → g → f → main → abort |
| img09-class-vs-object | 06 | Cookie cutter (class) and cookies (objects) |
| img10-xy-vs-polar | 06 | Same point as (x, y) and (r, θ), same interface |
| img11-perf-counter-stopwatch | 07 | elapsed = end − start |
| img12-birthday-halving | 08 | 365 → 182 → ... → 1 |
| img13-3200-years-vs-50-minutes | 08 | Nested loop vs sort + halving |
| img14-week1-summary | 09 | Week 1 at a glance |

## Fact checks done (all code run in Python 3)

- gcd(8,12)=4, gcd(18,25)=1, gcd(48,18)=6, gcd(101,85)=1, gcd(252,105)=21.
- Subtraction gcd(2, 9999): 5000 calls → real Python raises RecursionError (default limit 1000). Euclid: 2 calls.
- primesupto(30), firstprimes(10) = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]; primediffs(30) = {1:1, 2:4, 4:3, 6:1}.
- √n prime check agrees with the factor-list check for all n from 2 to 1999.
- prime(1): factor-list version → False (correct); direct and √n versions → True (bug in slides).
- Polar Point with math.atan: (−3, 4) is stored as (3, −4); (0, −5) as (0, 5). Fix: math.atan2.
- Efficiency numbers: 10¹⁸/10⁷ = 10¹¹ s ≈ 3171 years (slide rounds to 3200); log₂(10⁹) ≈ 29.9; 10⁹ × 30 / 10⁷ = 3000 s = 50 min.
- Birthday halving 365 → 182 → 91 → 45 → 22 → 11 → 5 → 2 → 1.
- A 10⁷-round Python loop took ≈ 0.6 s on our machine (matches the 10⁷ ops/s estimate).

## Slide errors noted on the pages
`else` missing `:` (Recap III), `while` line missing `):` (Recap II), prime(1) bug, RecursionError for gcd(2, 9999), atan vs atan2, `mult` vs `__mul__`, "perf time()" vs `perf_counter()`, kaggle.org vs kaggle.com.
