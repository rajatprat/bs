import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const contentDir = join(process.cwd(), 'content', 'pdsa-week-1');
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

export function pdsaSource(slug) {
  const page = pdsaSections.find(section => section.slug === slug);
  return page ? readFileSync(join(contentDir, page.file), 'utf8').replace(/^---[\s\S]*?---\s*/, '') : null;
}
