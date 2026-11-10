import {chapterUrl} from '../../lib/genai-book';

const refreshers = {
  pushforward: 'Apply the rule to each possible input. When two inputs produce the same output, add their probabilities.',
  convex: 'For a convex curve, the straight line between two points lies on or above the curve. This lets you compare the average of the heights with the height at the average input.',
  log: 'A ratio below 1 has a negative natural logarithm because raising e to a negative power gives a number below 1.',
  expectation: 'If you have four scores, add them and divide by four. To work out a long-run score from known chances, multiply each possible score by its chance, then add those amounts.',
  max: 'A slope tells you which way a value changes. A maximum is the largest value reached. A supremum is the smallest upper bound, even when no input reaches it.',
  activation: 'The raw score can be any real number. Sigmoid makes it a probability. Taking the log of that probability produces a negative critic score.',
  gd: 'For descent, subtract the step size times the slope. For ascent, add it. Holding a setting fixed leaves its value unchanged during the update.',
};

export default function MasteryPractice({lesson, figure, activity, questions}) {
  const {example, steps, words, guided, independent, refresher} = lesson;
  return (
    <section className="genai-group genai-mastery" id="try-it" aria-labelledby="genai-mastery-title">
      <h2 id="genai-mastery-title">Try it with a small example</h2>
      {refresher && <details className="genai-mastery-refresh">
        <summary>Quick refresher · {refresher[1]}</summary>
        <p>{refreshers[refresher[0]]}</p>
        <a href={chapterUrl(refresher[0])}>Open the refresher lesson →</a>
      </details>}
      <div className="genai-mastery-step">
        <h3>1. See one worked example</h3>
        <p>{example}</p>
        {figure}
        {steps && <ol className="genai-simple-steps">{steps.map(step => <li key={step}>{step}</li>)}</ol>}
        {words && <details><summary>What the lecture calls this</summary><p>{words}</p></details>}
      </div>
      {activity}
      <div className="genai-mastery-step">
        <h3>2. Finish one with a hint</h3>
        <p>{guided[0]}</p>
        <details><summary>Check the worked solution</summary><p>{guided[1]}</p></details>
      </div>
      <div className="genai-mastery-step" id="independent-check">
        <h3>3. Try a fresh problem</h3>
        <p>{independent[0]}</p>
        <details><summary>Show answer and reasoning</summary><p>{independent[1]}</p></details>
      </div>
      {questions?.length > 0 && <div className="genai-extra-practice">
        <h3>Practise a little more</h3>
        <ol>{questions.map(([question, answer]) => <li key={question}>
          <p>{question}</p>
          <details><summary>Show answer</summary><p>{answer}</p></details>
        </li>)}</ol>
      </div>}
      <p className="genai-mastery-ready">Try explaining how you got your answer. The full lesson below shows how the same idea appears in the lecture.</p>
    </section>
  );
}
