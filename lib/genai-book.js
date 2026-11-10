import chapters from '../data/genai-book.json';

export {chapters};
export const bookBase = '/mathematical-foundation-of-generative-ai/';
export const subject = 'Mathematical Foundation of Generative AI';
export const chapterUrl = slug => bookBase + 'book/' + slug + '/';

export const units = {
  foundations: {
    label: 'Optional foundations',
    title: 'Math foundations',
    description: 'Refresh the ideas the course builds on, from reading vectors to taking expectations and understanding convexity.',
    groups: [['Data and probability', 6], ['Functions and optimization', 4]],
  },
  'week-1': {
    label: 'Week 1',
    title: 'From distributions to the variational bound',
    description: 'Follow two coins from the problem of comparing distributions to a bound you can estimate using samples.',
    groups: [['Make and count tosses', 4], ['Compare the two coins', 2], ['Build the variational bound', 2]],
    primers: ['probability', 'density', 'expectation', 'convex'],
  },
  'week-2': {
    label: 'Week 2',
    title: 'Teach the coin machine with a judge',
    description: 'Pick up the coin machine from Week 1. Give it a judge that learns to tell real tosses from pretend ones, then use the judge’s feedback to improve the machine.',
    groups: [['Meet the judge and learn how to adjust a dial', 3], ['Turn scores into chances and train a GAN', 4]],
    primers: ['max', 'nn'],
  },
  'week-3': {
    label: 'Week 3',
    title: 'Classifier-guided and conditional GANs',
    description: 'Use likelihood to motivate a classifier, then build up to image generation and class-conditional sampling.',
    groups: [['Connect classifiers and generators', 2], ['Generate and condition images', 3]],
  },
  'week-4': {
    label: 'Week 4',
    title: 'Wasserstein GANs, inversion and evaluation',
    description: 'Understand saturation and Wasserstein distance, then study GAN inversion, domain adaptation, and FID.',
    groups: [['Understand saturation and Wasserstein GANs', 3], ['Recover a generator input', 3], ['Adapt a classifier to a new domain', 1], ['Evaluate generated samples', 1]],
  },
  reference: {
    label: 'Course resources',
    title: 'Course resources',
    description: 'Look up symbols and check answers to the topic questions.',
  },
};

export const weekKeys = ['week-1', 'week-2', 'week-3', 'week-4'];
export const unitUrl = unit => unit === 'reference' ? bookBase + '#book-resources' : bookBase + unit + '/';

export function bookMetadata(title, description, path) {
  return {title, description, alternates: {canonical: 'https://bsnotes.in' + path}};
}
