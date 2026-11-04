# PDSA — Week 3

Source: IIT Madras BS lectures by Madhavan Mukund, Week 3 — Lectures 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.8 (3.3 was not supplied; page 3 covers lecture 3.4 plus hybrid sorting with insertion sort, randomized and iterative quicksort are on page 2).
Course slug: `pdsa`. Images folder: `images/pdsa-week-3/`.

## Page order

| # | File | Section | Title | Lecture |
|---|---|---|---|---|
| 1 | 01-quicksort.md | Quicksort and sorting | Quicksort | 3.1 |
| 2 | 02-analysis-of-quicksort.md | Quicksort and sorting | Analysis of Quicksort | 3.2 |
| 3 | 03-choosing-a-sorting-algorithm.md | Quicksort and sorting | Sorting — Stability, Hybrids and Choosing the Best Algorithm | 3.4 |
| 4 | 04-lists-and-arrays.md | Lists, arrays and dictionaries | Lists vs Arrays | 3.5 |
| 5 | 05-designing-a-linked-list.md | Lists, arrays and dictionaries | Designing a Flexible (Linked) List in Python | 3.6 |
| 6 | 06-python-lists-and-numpy.md | Lists, arrays and dictionaries | Lists and Arrays in Python — and NumPy | 3.7 |
| 7 | 07-dictionaries-and-hashing.md | Lists, arrays and dictionaries | How Dictionaries Work — Hash Tables | 3.8 |
| 8 | 08-quick-revision.md | Revision and practice | Week 3 Quick Revision | all |

## Images (ChatGPT, 1536 × 1024, white background)

| File | Page | Shows |
|---|---|---|
| img01-quicksort-idea | 01 | Pivot 43 splits 43 32 22 78 63 57 91 13 into Lower / pivot / Upper |
| img02-four-segments | 01 | Pivot, Lower, Upper, Unclassified with lower/upper markers |
| img03-quicksort-best-vs-worst | 02 | Balanced vs one-sided recursion trees |
| img04-stable-vs-unstable | 03 | Student table sorted by name, stable vs unstable |
| img05-hybrid-sort | 03 | Divide and conquer, insertion sort below 16 items |
| img06-linked-list | 04 | Nodes with value + next, head to tail None |
| img07-linked-list-insert | 04 | Inserting X between A and B (2 links change) |
| img08-array-insert-shift | 04 | Array insert shifts items right |
| img09-insert-at-head | 05 | Insert 0 at the head by swapping values |
| img10-delete-bypass | 05 | Delete 2 from 1 → 2 → 3 by copying and bypassing |
| img11-python-list-growth | 06 | List as array with spare slots, copying to a bigger block |
| img12-aliasing-trap | 06 | Three names for one row vs three separate rows |
| img13-hash-function | 07 | cat/dog/act/bat/god hashed to slots, collisions at 2 and 4 |
| img14-collision-handling | 07 | Open addressing vs chaining |
| img15-week3-summary | 08 | Week 3 at a glance |

## Fact checks (all run in Python 3)

- quicksort, random-pivot, iterative and hybrid versions checked against sorted() on hundreds of random lists.
- Partition traces: [43, 32, 22, 78, 63, 57, 91, 13] → [13, 32, 22, 43, 63, 57, 91, 78]; [5, 8, 2, 9, 1] → [1, 2, 5, 9, 8]; [6, 3, 9, 1, 7, 2] → [2, 3, 1, 6, 7, 9].
- Comparisons, n = 1000: first-pivot sorted 499,500; random ≈ 10,600; random pivot on sorted ≈ 11,300. Time for 5000 sorted items: 0.66 s vs 0.007 s (random pivot).
- Recursive first-pivot quicksort on a sorted list of 1000 items raises RecursionError at Python's default limit.
- Hybrid (insertion sort below 16) ≈ 20% faster than plain quicksort on 200,000 random numbers.
- Stability tested on 2000 random lists: insertion yes, merge with <= yes, merge with < no, selection no, quicksort no.
- Linked list (lecture Node class): insert/append/delete traces all run; delete removes only the first occurrence.
- Aliasing: [zerolist]*3 style and [[0]*3]*3 both give [[0,1,0],[0,1,0],[0,1,0]].
- CPython list capacities measured: 4, 8, 16, 24, 32, 40, 52, 64, 76 (not exact doubling).
- NumPy: 3*A+B, matmul, A*B values checked. Hash examples (sum of codes % 10) and linear probing tables checked.
