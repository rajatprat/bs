'use client';

import {useId, useState} from 'react';

const rounded = value => Number(value.toFixed(3));
const drawHeads = cutoff => Array.from({length:100}, () => Math.random() * 100 < cutoff)
  .filter(Boolean).length;
const cases = {
  recipe: {
    title: 'Make a coin from a number',
    problem: 'We need a generator we can adjust. Draw a number z evenly between 0 and 1. The generator says heads when z is below its setting θ, and tails otherwise.',
    question: 'If θ is 0.9, what share of tosses should be heads in the long run?',
    options: ['About 10%', 'About 50%', 'About 90%'],
    correct: 2,
    feedback: 'The heads region fills 90% of the line. A uniform draw lands there with probability 0.9.',
    notation: 'The lecture writes x̂ = gθ(z) for one generated outcome and pθ for its distribution. Here θ is one adjustable number. In a neural network it represents many parameters.',
    next: 'We can produce tosses now. How can we tell whether our generator’s tosses resemble the real coin?',
  },
  'week-1': {
    title: 'Give the coin generator a score',
    problem: 'The real coin is fair. Our generator makes heads 90% of the time. We want to compare them using averages we can estimate from tosses.',
    question: 'With θ = 0.9, which critic gets the higher score?',
    options: ['Give both outcomes 1', 'Give heads 0 and tails 2', 'They tie'],
    correct: 1,
    feedback: 'Scoring heads and tails differently exposes a mismatch that the constant critic misses.',
    notation: 'The critic is T. For this KL example, the population score is E_P[T] − E_Q[exp(T−1)], where P is the real distribution and Q is the model distribution. Replacing each expectation with an observed average gives a sample estimate.',
    next: 'We found a critic that can expose the mismatch. What happens when we let both the critic and the generator adjust?',
  },
  'week-2': {
    title: 'Let the judge respond',
    problem: 'The real coin is fair and our generator initially makes heads 90% of the time. Show the judge equally many real and generated tosses. It only sees the outcome, so it uses the relative counts to guess the source.',
    question: 'When a toss is tails, is it more likely to come from the real coin or the generator?',
    options: ['The real coin', 'The generator', 'Equally likely'],
    correct: 0,
    feedback: 'Tails is more common for the real coin. With equal source sizes, tails is more likely to come from that source.',
    notation: 'The ideal judge is D*(x) = P(x)/(P(x) + Q(x)) for equally weighted real and generated sources. A learned judge is trained to approximate the best scoring rule it can represent.',
    next: 'The judge can compare two sources. What if the user gets to choose which kind of sample the generator should make?',
  },
  'week-3': {
    title: 'Give the generator a request',
    problem: 'There are now two coin styles. A real coin from group A has 50% heads. A real coin from group B has 75% heads. The label tells the generator which style to imitate. The seed still varies each toss.',
    question: 'To make another group B toss, which input should change?',
    options: ['Only the label', 'Only the random seed', 'Both'],
    correct: 1,
    feedback: 'Keep label B to request the same group. Draw another seed to get another outcome from that group.',
    notation: 'Write x̂ = gθ(z, y), where y is the requested label and z is the random seed. During training the judge receives pairs (x, y), so it can check whether the sample fits the request.',
    next: 'We know how to ask for a particular distribution. What if the judge can tell real and fake apart but gives the generator no clue how far it is from the target?',
  },
  'week-4': {
    title: 'Put a speed limit on the critic',
    problem: 'Put heads at position 0 and tails at position 1. The fair real coin has half its mass at each point. The model starts with 90% of its mass at heads. Compare how much work it takes to move the extra mass with the critic’s score gap.',
    question: 'The points are one unit apart. Can a 1-Lipschitz critic score them 0 and 2?',
    options: ['Yes, both scores are allowed', 'No, the gap is too large'],
    correct: 1,
    feedback: 'A difference of 2 across a distance of 1 exceeds the speed limit. The maximum allowed gap between the two scores is 1.',
    notation: 'Wasserstein-1 is the best value of E_P[T] − E_Q[T] over 1-Lipschitz critics. On this two-point line the largest allowed score difference is 1, so the best gap equals the excess mass moved one unit.',
    next: 'The critic can measure a mismatch. A different problem comes next: given an output, can we recover an input that would have produced it?',
  },
};

function Reading({stage, theta, seed, label, slope}) {
  const p = theta / 100;
  const tails = 100 - theta;
  const heads = seed < theta;
  const score = 1 - (p * Math.exp(-1) + (1 - p) * Math.exp(1));
  if (stage === 'recipe' || stage === 'week-3') return <>
    <p><strong>Seed {(seed / 100).toFixed(2)} → {heads ? 'heads' : 'tails'}.</strong> The heads region covers {theta}% of the line{stage === 'week-3' && ' for group ' + label}.</p>
    <ol><li>Compare the seed with the cutoff {(theta / 100).toFixed(2)}. The seed is {heads ? 'below' : 'at or above'} the cutoff.</li>
      <li>That makes this toss {heads ? 'heads' : 'tails'}. Across many uniform seeds, expect about {theta} heads per 100 tosses.</li></ol>
  </>;
  if (stage === 'week-1') return <>
    <p><strong>Two-score critic {rounded(score)}.</strong> The constant critic scores 0.</p>
    <ol><li>The real average is 0.5 × 0 + 0.5 × 2 = 1.</li>
      <li>The model penalty is {p} × exp(−1) + {rounded(1 - p)} × exp(1) = {rounded(1 - score)}.</li>
      <li>Subtract the penalty from 1 to get {rounded(score)}.</li></ol>
  </>;
  if (stage === 'week-2') return <>
    <p><strong>The best judge’s real score for tails is {rounded(50 / (50 + tails))}.</strong></p>
    <ol><li>From 100 tosses of each source, expect 50 real tails and {tails} generated tails.</li>
      <li>Of the {50 + tails} tails expected across both groups, 50 come from the real coin. Divide 50 by {50 + tails}.</li></ol>
  </>;
  const realMean = .5 * slope;
  const modelMean = (1 - p) * slope;
  return <>
    <p><strong>Critic gap {rounded(realMean - modelMean)}. Moving cost {rounded(Math.abs(p - .5))}.</strong></p>
    <ol><li>Give heads score 0 and tails score {slope}. The real average is 0.5 × {slope} = {rounded(realMean)}.</li>
      <li>The model average is {rounded(1 - p)} × {slope} = {rounded(modelMean)}. Subtract it from the real average.</li>
      <li>Move {rounded(Math.abs(p - .5))} units of excess mass one unit to match the fair coin. Set the slope to {p >= .5 ? '1' : '−1'} to reach that cost with the critic.</li></ol>
  </>;
}

export default function GenAIStoryLab({stage}) {
  const lesson = cases[stage];
  const titleId = useId();
  const [choice, setChoice] = useState(null);
  const [theta, setTheta] = useState(90);
  const [seed, setSeed] = useState(37);
  const [label, setLabel] = useState('A');
  const [slope, setSlope] = useState(.5);
  const [batch, setBatch] = useState(null);
  const seeded = stage === 'recipe' || stage === 'week-3';
  const cutoff = stage === 'week-3' ? (label === 'A' ? 50 : 75) : theta;
  return (
    <section className="genai-group genai-story-lab" id="coin-lab" aria-labelledby={titleId}>
      <div className="eyebrow">The adjustable coin</div>
      <h2 id={titleId}>{lesson.title}</h2>
      <p>{lesson.problem}</p>
      <h3>Make a prediction</h3>
      <p>{lesson.question}</p>
      <div className="genai-quiz-options" role="group" aria-label="Choose a prediction">
        {lesson.options.map((option, i) => <button key={option} type="button" aria-pressed={choice === i} onClick={() => setChoice(i)}>{option}</button>)}
      </div>
      <p aria-live="polite">{choice !== null && (choice === lesson.correct ? 'Yes. ' : 'Here’s what to look at. ') + lesson.feedback}</p>
      <h3>Test it</h3>
      {stage === 'week-3' ? <label>Requested group <select value={label} onChange={event => {setLabel(event.target.value); setBatch(null);}}>
        <option value="A">A · fair coin</option><option value="B">B · 75% heads</option>
      </select></label> : <label className="genai-slider">
        <span>Generator’s heads setting <strong>{theta}%</strong></span>
        <input type="range" min="0" max="100" value={theta} onChange={event => {setTheta(Number(event.target.value)); setBatch(null);}}/>
      </label>}
      {seeded && <>
        <div className="genai-coin-scale" aria-hidden="true">
          <div style={{width: cutoff + '%'}}/>
          <span style={{left: seed + '%'}}/>
        </div>
        <div className="genai-quiz-options">
          <button type="button" onClick={() => setSeed(Math.floor(Math.random() * 100))}>Draw a new seed</button>
          <button type="button" onClick={() => setBatch({model: drawHeads(cutoff)})}>Generate 100 tosses</button>
        </div>
        {batch && <p role="status">This batch had {batch.model} heads out of 100. The long-run chance is {cutoff}%. Try another batch and compare.</p>}
      </>}
      {stage === 'week-1' && <button type="button" onClick={() => setBatch({real:drawHeads(50),model:drawHeads(cutoff)})}>Draw 100 tosses from each source</button>}
      {stage === 'week-4' && <label className="genai-slider">
        <span>Critic slope <strong>{slope}</strong></span>
        <input type="range" min="-2" max="2" step=".25" value={slope} onChange={event => setSlope(Number(event.target.value))}/>
      </label>}
      {stage === 'week-4' && <svg className="genai-plot" viewBox="0 0 420 155" role="img" aria-label={`Heads score zero, tails score ${slope}`}>
        <path d="M48 68H373" stroke="#8ba0ac" strokeDasharray="4 4"/>
        <path d={`M72 68L345 ${68 - slope * 27}`} stroke="#236d60" strokeWidth="3"/>
        <circle cx="72" cy="68" r="6" fill="#236d60"/>
        <circle cx="345" cy={68 - slope * 27} r="6" fill="#a45b24"/>
        <text x="72" y="136" textAnchor="middle">Heads at 0</text>
        <text x="345" y="136" textAnchor="middle">Tails at 1</text>
      </svg>}
      {stage === 'week-4' && <p role="status">{Math.abs(slope) <= 1
        ? 'This slope stays within the speed limit.'
        : 'This slope breaks the speed limit. Its score is outside the allowed critic family.'}</p>}
      <h3>Work out the same result by hand</h3>
      <Reading stage={stage} theta={cutoff} seed={seed} label={label} slope={slope}/>
      {stage === 'week-1' && batch && <p role="status">
        This batch had {batch.real} real heads and {batch.model} generated heads.
        The real average is (100 − {batch.real}) × 2 ÷ 100.
        The model penalty is [{batch.model} × exp(−1) + (100 − {batch.model}) × exp(1)] ÷ 100.
        Subtract to get <strong>{rounded((100 - batch.real) * .02 - (batch.model * Math.exp(-1) + (100 - batch.model) * Math.exp(1)) / 100)}</strong>.
        Another batch can give another estimate.
      </p>}
      <details><summary>How the lecture writes it</summary><p>{lesson.notation}</p></details>
      <p className="genai-story-next"><strong>What we still need to solve.</strong> {lesson.next}</p>
    </section>
  );
}
