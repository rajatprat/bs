import {chapters} from './genai-book';

const answerPage = chapters.find(topic => topic.slug === 'answers');
const answers = new Map(
  Array.from(answerPage.html.matchAll(/<p><span id="(sol-[\d-]+)"><\/span>\s*<strong>[\d.]+<\/strong>\s*([\s\S]*?)<\/p>/g),
    ([, id, solution]) => [id, solution])
);

export function showReviewAnswers(html) {
  return html.replace(/<a href="[^"]*\/book\/answers\/#(sol-[\d-]+)">Answer<\/a>/g, (link, id) => {
    const solution = answers.get(id);
    if (!solution) return link;
    return `<details class="genai-review-answer"><summary>Show answer</summary><div class="genai-review-solution">${solution}</div></details>`;
  });
}
