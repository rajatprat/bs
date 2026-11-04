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

export function pdsaSource(slug) {
  const page = pdsaSections.find(section => section.slug === slug);
  return page ? pdsaWeekSource(1, page.file) : null;
}

export function pdsaWeekSource(week, file) {
  return readFileSync(join(process.cwd(), 'content', `pdsa-week-${week}`, file), 'utf8').replace(/^---[\s\S]*?---\s*/, '');
}
