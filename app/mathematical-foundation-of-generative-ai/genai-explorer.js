'use client';

import {useId, useState} from 'react';

const ink = '#19324c';
const real = '#236d60';
const model = '#a45b24';
const axis = '#8ba0ac';
const round = (n, digits = 2) => Number(n.toFixed(digits)).toString();

function Plot({label, children}) {
  return <svg className="genai-plot" viewBox="0 0 420 180" role="img" aria-label={label}>
    {children}
  </svg>;
}

function Slider({label, value, min, max, step = 1, onChange, display = value}) {
  return <label className="genai-slider">
    <span>{label} <strong>{display}</strong></span>
    <input type="range" value={value} min={min} max={max} step={step}
      onChange={event => onChange(Number(event.target.value))}/>
  </label>;
}

function LogExplorer() {
  const [base, setBase] = useState(Math.E);
  const [power, setPower] = useState(1);
  const id = useId();
  const x = n => 42 + n / base ** 2 * 340;
  const y = n => 123 - n * 43;
  const value = base ** power;
  const name = base === Math.E ? 'e' : String(base);
  const path = Array.from({length: 81}, (_, i) => {
    const exponent = -1 + 3 * i / 80;
    return (i === 0 ? 'M' : 'L') + x(base ** exponent) + ' ' + y(exponent);
  }).join(' ');
  return <>
    <label htmlFor={id}>Base </label>
    <select id={id} value={base} onChange={event => setBase(Number(event.target.value))}>
      <option value={Math.E}>e ≈ 2.718</option><option value={2}>2</option><option value={10}>10</option>
    </select>
    <Slider label="Exponent" value={power} min={-1} max={2} step={.25} onChange={setPower}/>
    <Plot label={`Logarithm to base ${name}, with selected point ${round(value)}, ${power}`}>
      <path d="M42 19V173 M42 123H390" stroke={axis} fill="none"/>
      <path d={path} stroke={real} strokeWidth="3" fill="none"/>
      <path d={`M42 ${y(power)}H${x(value)}V123`} stroke={model} strokeDasharray="4 4" fill="none"/>
      <circle cx={x(value)} cy={y(power)} r="5" fill={model}/>
      <text x="12" y="29" fill={ink}>log</text><text x="396" y="128" fill={ink}>x</text>
      <text x="24" y="128" fill={ink}>0</text><text x="24" y="85" fill={ink}>1</text>
      <text x="24" y="42" fill={ink}>2</text>
    </Plot>
    <p aria-live="polite"><strong>{name}<sup>{power}</sup> ≈ {round(value)}.</strong> The logarithm of the exact result returns {power}. The horizontal coordinate is the result of the power, and the vertical coordinate gives the exponent back.</p>
  </>;
}

function Bars({rows, label}) {
  return <Plot label={label}>
    {rows.map(({name, value, color}, i) => {
      const y = 22 + 50 * i;
      return <g key={name}>
        <text x="12" y={y + 16} fill={ink}>{name}</text>
        <rect x="154" y={y} width="182" height="22" rx="4" fill="#e6edf0"/>
        <rect x="154" y={y} width={182 * value} height="22" rx="4" fill={color}/>
        <text x="350" y={y + 16} fill={ink}>{Math.round(100 * value)}%</text>
      </g>;
    })}
  </Plot>;
}

function CoinCritic() {
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(2);
  const reward = (heads + tails) / 2;
  const penalty = .9 * Math.exp(heads - 1) + .1 * Math.exp(tails - 1);
  const best = .5 * Math.log(.5 / .9) + .5 * Math.log(.5 / .1);
  const score = reward - penalty;
  const min = Math.min(-.6, Math.floor(score * 2) / 2);
  const x = n => 34 + (n - min) / (.65 - min) * 352;
  return <>
    <Slider label="Score for heads" value={heads} min={-1} max={3} step={.1} onChange={setHeads}/>
    <Slider label="Score for tails" value={tails} min={-1} max={3} step={.1} onChange={setTails}/>
    <Plot label={`Critic score ${round(score, 3)} and true KL ${round(best, 3)}`}>
      <text x="20" y="32" fill={ink}>Population critic score</text>
      <path d="M34 90H386" stroke={axis} strokeWidth="2"/>
      <path d={`M${x(0)} 83v14`} stroke={axis}/>
      <text x={x(0)} y="120" fill={ink} textAnchor="middle">0</text>
      <circle cx={x(score)} cy="90" r="7" fill={model}/>
      <path d={`M${x(best)} 64v52`} stroke={real} strokeWidth="3" strokeDasharray="4 3"/>
      <text x="20" y="153" fill={model}>● Your critic</text>
      <text x="220" y="153" fill={real}>┆ True KL</text>
    </Plot>
    <p aria-live="polite">Real average {round(reward, 3)} − model penalty {round(penalty, 3)} = <strong>{round(score, 3)}</strong>. The true KL is {round(best, 3)}. Try giving both outcomes a score of 1, then try 0.4 for heads and 2.6 for tails.</p>
  </>;
}

function CoinJudge() {
  const [tails, setTails] = useState(10);
  const probability = 50 / (50 + tails);
  return <>
    <Slider label="Generated tails" value={tails} min={0} max={100} onChange={setTails} display={tails + '%'}/>
    <Bars label={`Real tails 50%, generated tails ${tails}%, judge says tails is real ${Math.round(probability * 100)}%`} rows={[
      {name:'Real tails', value:.5, color:real},
      {name:'Generated tails', value:tails / 100, color:model},
      {name:'Judge says real', value:probability, color:ink},
    ]}/>
    <p aria-live="polite">With 100 tosses from each source, expect 50 real tails and {tails} generated tails. The best judge’s real score for tails is <strong>50 ÷ (50 + {tails}) ≈ {round(probability, 3)}</strong>. Set generated tails to 50% and see what happens.</p>
  </>;
}

const strokes = {
  1: 'M-19 -19 Q-8 -24 0 -36 V34 M-17 34 H18',
  3: 'M-20 -31 C13 -43 32 -16 0 -4 C35 -7 30 37 -22 32',
  7: 'M-25 -33 H25 Q5 -12 -9 33',
};

function ConditionalDigits() {
  const [digit, setDigit] = useState(3);
  const [noise, setNoise] = useState(3);
  const id = useId();
  return <>
    <label htmlFor={id}>Requested digit </label>
    <select id={id} value={digit} onChange={event => setDigit(Number(event.target.value))}>
      {[1,3,7].map(value => <option key={value}>{value}</option>)}
    </select>
    <Slider label="Style input" value={noise} min={0} max={8} onChange={setNoise}/>
    <Plot label={`Illustrative digit ${digit} in style ${noise}, with the same label in both tiles`}>
      {[{x:119, style:3, label:'Reference style'},{x:301, style:noise, label:'Selected style'}].map(tile =>
        <g key={tile.x}>
          <rect x={tile.x - 59} y="16" width="118" height="118" rx="13" fill="#e6efee"/>
          <path d={strokes[digit]} transform={`translate(${tile.x} 75) rotate(${(tile.style - 3) * 4}) scale(${.86 + tile.style * .055} 1)`}
            stroke={real} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <text x={tile.x} y="160" textAnchor="middle" fill={ink}>{tile.label}</text>
        </g>)}
    </Plot>
    <p>Changing the style input changes the shape while keeping the requested class fixed. These drawings illustrate the roles of label and noise using preset strokes.</p>
  </>;
}

function TransportExplorer() {
  const [distance, setDistance] = useState(4);
  const fake = 44 + 55 * distance;
  return <>
    <Slider label="Generated point" value={distance} min={0} max={6} step={.25} onChange={setDistance}/>
    <Plot label={`Real point at zero and generated point at ${distance}`}>
      <path d="M44 94H374" stroke={axis} strokeWidth="2"/>
      {Array.from({length:7},(_, i) => <g key={i}>
        <path d={`M${44 + 55 * i} 87v14`} stroke={axis}/>
        <text x={44 + 55 * i} y="125" fill={ink} textAnchor="middle">{i}</text>
      </g>)}
      <path d={`M44 58H${fake}`} stroke={model} strokeWidth="3" strokeDasharray="5 3"/>
      <path d={`M44 58V84 M${fake} 58V84`} stroke={axis} strokeDasharray="3 3"/>
      <circle cx="44" cy="94" r="8" fill={real}/>
      <circle cx={fake} cy="94" r="6" fill={model}/>
      <text x="22" y="159" fill={real}>● Real at 0</text>
      <text x="220" y="159" fill={model}>● Generated at {distance}</text>
    </Plot>
    <p aria-live="polite">Wasserstein-1 is <strong>{distance}</strong>. Jensen–Shannon is <strong>{distance === 0 ? '0' : 'log 2 ≈ 0.693'}</strong>. Move the generated point closer to 0 and compare when each score changes.</p>
  </>;
}

const explorers = {
  log: ['See how a logarithm reverses a power', LogExplorer],
  'week-1': ['Try scoring the two coins', CoinCritic],
  'week-2': ['See how the best judge responds', CoinJudge],
  'week-3': ['Change the style or the requested digit', ConditionalDigits],
  'week-4': ['Move probability mass along a line', TransportExplorer],
};

export default function GenAIExplorer({kind}) {
  const id = useId();
  const [title, Explorer] = explorers[kind];
  return <section className="genai-explorer" aria-labelledby={id}>
    <div className="eyebrow">Explore the idea</div>
    <h2 id={id}>{title}</h2>
    <Explorer/>
  </section>;
}
