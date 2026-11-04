import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const pdsaSections = [
  ['jupyter-notebooks-and-colab', 'Jupyter Notebooks and Google Colab', '01-jupyter-notebooks-and-colab.md', 'Getting started'],
  ['python-recap-gcd', 'Python Recap I — Computing the GCD', '02-python-recap-gcd.md', 'Python recap'],
  ['python-recap-primes', 'Python Recap II — Prime Numbers', '03-python-recap-primes.md', 'Python recap'],
  ['python-recap-euclid', "Python Recap III — Euclid's Algorithm", '04-python-recap-euclid.md', 'Python recap'],
  ['exception-handling', 'Exception Handling', '05-exception-handling.md', 'Python recap'],
  ['classes-and-objects', 'Classes and Objects', '06-classes-and-objects.md', 'Python recap'],
  ['timing-our-code', 'Timing Our Code', '07-timing-our-code.md', 'Efficiency'],
  ['why-efficiency-matters', 'Why Efficiency Matters', '08-why-efficiency-matters.md', 'Efficiency'],
  ['quick-revision', 'Week 1 Quick Revision', '09-quick-revision.md', 'Revision and practice'],
].map(([slug,title,file,section]) => ({slug,title,file,section}));

export const pdsaWeek2Sections = [
  ['analysis-of-algorithms', 'Analysis of Algorithms', '01-analysis-of-algorithms.md', 'Measuring efficiency'],
  ['big-o-omega-theta', 'Comparing Orders of Magnitude — Big O, Ω and Θ', '02-big-o-omega-theta.md', 'Measuring efficiency'],
  ['calculating-complexity', 'Calculating Complexity — Worked Examples', '03-calculating-complexity.md', 'Measuring efficiency'],
  ['searching-in-a-list', 'Searching in a List — Linear and Binary Search', '04-searching-in-a-list.md', 'Searching and sorting'],
  ['selection-sort', 'Selection Sort', '05-selection-sort.md', 'Searching and sorting'],
  ['insertion-sort', 'Insertion Sort', '06-insertion-sort.md', 'Searching and sorting'],
  ['merge-sort', 'Merge Sort', '07-merge-sort.md', 'Searching and sorting'],
  ['analysis-of-merge-sort', 'Analysis of Merge Sort — Why It Is O(n log n)', '08-analysis-of-merge-sort.md', 'Searching and sorting'],
  ['quick-revision', 'Week 2 Quick Revision', '09-quick-revision.md', 'Revision and practice'],
].map(([slug,title,file,section]) => ({slug,title,file,section}));

export const pdsaWeek3Sections = [
  ['quicksort', 'Quicksort', '01-quicksort.md', 'Quicksort and sorting'],
  ['analysis-of-quicksort', 'Analysis of Quicksort', '02-analysis-of-quicksort.md', 'Quicksort and sorting'],
  ['choosing-a-sorting-algorithm', 'Sorting — Stability, Hybrids and Choosing the Best Algorithm', '03-choosing-a-sorting-algorithm.md', 'Quicksort and sorting'],
  ['lists-and-arrays', 'Lists vs Arrays', '04-lists-and-arrays.md', 'Lists, arrays and dictionaries'],
  ['designing-a-linked-list', 'Designing a Flexible (Linked) List in Python', '05-designing-a-linked-list.md', 'Lists, arrays and dictionaries'],
  ['python-lists-and-numpy', 'Lists and Arrays in Python — and NumPy', '06-python-lists-and-numpy.md', 'Lists, arrays and dictionaries'],
  ['dictionaries-and-hashing', 'How Dictionaries Work — Hash Tables', '07-dictionaries-and-hashing.md', 'Lists, arrays and dictionaries'],
  ['quick-revision', 'Week 3 Quick Revision', '08-quick-revision.md', 'Revision and practice'],
].map(([slug,title,file,section]) => ({slug,title,file,section}));

export const pdsaWeek4Sections = [
  ['introduction-to-graphs', 'Introduction to Graphs', '01-introduction-to-graphs.md', 'Graphs'],
  ['representing-graphs', 'Representing Graphs — Adjacency Matrix and Adjacency List', '02-representing-graphs.md', 'Graphs'],
  ['breadth-first-search', 'Breadth First Search (BFS)', '03-breadth-first-search.md', 'Exploring graphs'],
  ['depth-first-search', 'Depth First Search (DFS)', '04-depth-first-search.md', 'Exploring graphs'],
  ['applications-of-bfs-and-dfs', 'Applications of BFS and DFS', '05-applications-of-bfs-and-dfs.md', 'Exploring graphs'],
  ['directed-acyclic-graphs', 'Directed Acyclic Graphs (DAGs)', '06-directed-acyclic-graphs.md', 'Directed acyclic graphs'],
  ['topological-sorting', 'Topological Sorting', '07-topological-sorting.md', 'Directed acyclic graphs'],
  ['longest-path-in-dags', 'Longest Path in a DAG', '08-longest-path-in-dags.md', 'Directed acyclic graphs'],
  ['quick-revision', 'Week 4 Quick Revision', '09-quick-revision.md', 'Revision and practice'],
].map(([slug,title,file,section]) => ({slug,title,file,section}));

export function pdsaSource(slug) {
  const page = pdsaSections.find(section => section.slug === slug);
  return page ? pdsaWeekSource(1, page.file) : null;
}

export function pdsaWeekSource(week, file) {
  return readFileSync(join(process.cwd(), 'content', `pdsa-week-${week}`, file), 'utf8').replace(/^---[\s\S]*?---\s*/, '');
}
