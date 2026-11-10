'use client';

import {useId, useRef, useState} from 'react';

const situations = [
  {
    input: 'A photo of a bicycle',
    output: 'The label “bicycle”',
    generates: false,
    explanation: 'The system labels a picture that already exists. It is classifying.',
  },
  {
    input: 'The request “draw a blue bicycle”',
    output: 'A new picture of a blue bicycle',
    generates: true,
    explanation: 'The system creates a new picture in response to the request. It is generating.',
  },
  {
    input: 'A few notes about a school event',
    output: 'A new invitation written from those notes',
    generates: true,
    explanation: 'The input guides the system, and the system creates a new piece of text.',
  },
];

export default function GenAIIntroQuiz() {
  const heading = useId();
  const firstChoice = useRef(null);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const situation = situations[index];
  const correct = choice === situation.generates;
  const last = index === situations.length - 1;

  return <section className="genai-intro-quiz" aria-labelledby={heading}>
    <p className="eyebrow">Quick activity · {index + 1} of {situations.length}</p>
    <h3 id={heading}>Generating or classifying?</h3>
    <dl>
      <div><dt>What goes in</dt><dd>{situation.input}</dd></div>
      <div><dt>What comes out</dt><dd>{situation.output}</dd></div>
    </dl>
    <div className="genai-quiz-options" role="group" aria-label="Choose what the system is doing">
      <button ref={firstChoice} type="button" aria-pressed={choice === true} onClick={() => setChoice(true)}>Generating</button>
      <button type="button" aria-pressed={choice === false} onClick={() => setChoice(false)}>Classifying</button>
    </div>
    <p className="genai-quiz-feedback" aria-live="polite">
      {choice !== null && (correct ? 'Yes. ' : 'Look at what comes out. ') + situation.explanation}
    </p>
    {correct && <button type="button" onClick={() => {
      setIndex(last ? 0 : index + 1);
      setChoice(null);
      firstChoice.current?.focus();
    }}>{last ? 'Play again' : 'Next example →'}</button>}
  </section>;
}
