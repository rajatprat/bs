# PDSA — Week 2

Source: IIT Madras BS lectures by Madhavan Mukund, Week 2 (Lectures 2.1–2.8).
Course slug: `pdsa`. Images folder: `images/pdsa-week-2/`.

## Page order

| # | File | Section | Title | Lecture |
|---|---|---|---|---|
| 1 | 01-analysis-of-algorithms.md | Measuring efficiency | Analysis of Algorithms | 2.1 |
| 2 | 02-big-o-omega-theta.md | Measuring efficiency | Comparing Orders of Magnitude — Big O, Ω and Θ | 2.2 |
| 3 | 03-calculating-complexity.md | Measuring efficiency | Calculating Complexity — Worked Examples | 2.3 |
| 4 | 04-searching-in-a-list.md | Searching and sorting | Searching in a List — Linear and Binary Search | 2.4 |
| 5 | 05-selection-sort.md | Searching and sorting | Selection Sort | 2.5 |
| 6 | 06-insertion-sort.md | Searching and sorting | Insertion Sort | 2.6 |
| 7 | 07-merge-sort.md | Searching and sorting | Merge Sort | 2.7 |
| 8 | 08-analysis-of-merge-sort.md | Searching and sorting | Analysis of Merge Sort | 2.8 |
| 9 | 09-quick-revision.md | Revision and practice | Week 2 Quick Revision | all |

No "How to Solve" page yet — added when question papers arrive.

## Images (ChatGPT, 1536 × 1024, white or transparent background)

| File | Page | Shows |
|---|---|---|
| img01-time-vs-space | 01 | Time (main focus) vs space |
| img02-growth-race | 01 | Growth curves log n … 2ⁿ |
| img03-best-average-worst | 01 | Best / average / worst case searching a shelf |
| img04-big-o-graph | 02 | f(n) below c·g(n) after n₀ |
| img05-o-omega-theta | 02 | Ceiling / floor / sandwich |
| img06-pairs-triangle | 03 | Pairs i < j in a 5 × 5 grid = 10 |
| img07-towers-of-hanoi | 03 | 3-step recursive Hanoi idea |
| img08-binary-search-trace | 04 | Searching 60 in 8 sorted numbers |
| img09-linear-vs-binary | 04 | Linear scan vs halving |
| img10-selection-sort-passes | 05 | Passes of selection sort on 74 32 89 55 21 64 |
| img11-insertion-sort-cards | 06 | Sliding a card into a sorted hand |
| img12-selection-vs-insertion | 06 | Comparison counts for n = 1000 |
| img13-merging-two-lists | 07 | Merging 32 74 89 with 21 55 64 |
| img14-merge-sort-tree | 07 | Split and merge tree for 8 numbers |
| img15-merge-sort-levels | 08 | n work per level × log n levels |
| img16-week2-summary | 09 | Week 2 at a glance |

## Fact checks (all run in Python 3)

- All sorting code (fixed versions) checked against `sorted()` on 500 random lists.
- Slide 2.6 iterative insertion sort (no `j > 0`) raised IndexError on every list tested, including [1, 2, 3].
- Traces: selection/insertion on [74, 32, 89, 55, 21, 64]; merge [32, 74, 89] + [21, 55, 64] = 4 comparisons; mergesort [43, 32, 22, 78, 63, 57, 91, 13] → [13, 22, 32, 43, 57, 63, 78, 91]; binary search for 22, 60, 91, 43.
- Hanoi moves 1, 3, 7, 15, 1023 = 2ⁿ − 1; n = 3 move list checked.
- numberOfBits matches Python's bit_length; T(n) = 2T(n/2) + n equals n + n log n for n = 2 … 1024; binary search T(n) = 2 + ⌊log n⌋.
- Comparison counts at n = 1000: selection 499,500 always; insertion 999 / ~245,000 / 499,500 (sorted / random / reverse); merge ~4,900–8,700.
- Slide table typo: n log n at n = 100 is ≈ 664, not 66.
