// Tokenize complete mathematical expressions without consuming English prose.
const token = String.raw`(?:X̄|\b(?:exp|log|Var|Cov|min|sqrt)\b|(?<![A-Za-z])(?:Ru|Mu|nt|[A-Za-z])(?:_[A-Za-z0-9]+)?(?![A-Za-z])|\d+(?:[.,]\d+)*|[₀-₉ᵢⱼₙₖ]+|[²³ᵀᵈᵏ⁻]+|[μσεℝ]|X̄|[+−=<>≥≤≈×·∪∩√∥‖|/()[\]{}^…⋯~,;%→≠]|[−-](?=\d))`;
const pattern = new RegExp(`${token}(?:\\s*${token})*`,'gu');
export function toAlgorithmTex(text) {
  const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ᵢ':'i','ⱼ':'j','ₙ':'n','ₖ':'k'};
  const symbols={'μ':'\\mu ','σ':'\\sigma ','ε':'\\varepsilon ','ℝ':'\\mathbb{R}','≥':'\\geq ','≤':'\\leq ','≈':'\\approx ','×':'\\times ','·':'\\cdot ','∪':'\\cup ','∩':'\\cap ','∥':'\\|','‖':'\\|','−':'-','…':'\\ldots ','⋯':'\\cdots ','~':'\\sim ','→':'\\to ','≠':'\\neq ','%':'\\%' };
  let t=text.replace(/X̄/g,'\\bar{X}').replace(/[₀-₉ᵢⱼₙₖ]+/g,s=>'_{'+[...s].map(c=>subs[c]).join('')+'}').replace(/⁻²/g,'^{-2}').replace(/²/g,'^{2}').replace(/³/g,'^{3}').replace(/ᵀ/g,'^{\\mathsf{T}}').replace(/ᵈ/g,'^{d}').replace(/ᵏ/g,'^{k}').replace(/[μσεℝ≥≤≈×·∪∩∥‖−…⋯~→≠%]/g,c=>symbols[c]);
  t=t.replace(/\b(Var|Cov)\b/g,'\\operatorname{$1}').replace(/\b(exp|log|min)\b/g,'\\$1 ').replace(/\bE\[/g,'\\mathbb{E}[').replace(/\bP\(/g,'\\mathbb{P}(').replace(/\bN\(/g,'\\mathcal{N}(');
  t=t.replace(/\^\(([^()]*)\)/g,'^{$1}').replace(/√([A-Za-z]|\d+(?:\.\d+)?)/g,'\\sqrt{$1}');
  // Common fractions have unambiguous numerator and denominator scope.
  t=t.replace(/1\s*\/\s*\\sqrt\{k\}/g,'\\frac{1}{\\sqrt{k}}').replace(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g,'\\frac{$1}{$2}').replace(/1\s*\/\s*([A-Za-z])\^\{2\}/g,'\\frac{1}{$1^2}');
  return t;
}
export function algorithmSegments(text='') {
  if (equations[text]) return [{text,tex:equations[text]}];
  const result=[];let end=0;
  for(const match of text.matchAll(pattern)) {
    const value=match[0].trim().replace(/^[,;]\s*|\s*[,;]$/g,'');
    if(!/[=<>≥≤≈²³μσε₁₂ᵢ√∥‖|∪∩^~]|\b(?:Var|Cov|exp|log)\b/.test(value) && !/^\d+(?:\.\d+)?\s*[/×+−]\s*\d/.test(value))continue;
    const offset=match.index+match[0].indexOf(value);
    if(offset>end)result.push({text:text.slice(end,offset)});
    result.push({text:value,tex:toAlgorithmTex(value)});end=offset+value.length;
  }
  if(end<text.length)result.push({text:text.slice(end)});
  return result;
}

const equations = {
 'P(X ≥ a) ≤ E[X] / a      (X ≥ 0, a > 0)': String.raw`\mathbb{P}(X\ge a)\le\frac{\mathbb{E}[X]}{a}\qquad(X\ge0,\ a>0)`,
 'P(|X − μ| ≥ Rσ) ≤ 1 / R²': String.raw`\mathbb{P}(|X-\mu|\ge R\sigma)\le\frac{1}{R^2}`,
 'P((X − μ)² ≥ t²) ≤ E[(X − μ)²] / t²': String.raw`\mathbb{P}((X-\mu)^2\ge t^2)\le\frac{\mathbb{E}[(X-\mu)^2]}{t^2}`,
 'P(|X − μ| ≥ t) ≤ σ² / t²': String.raw`\mathbb{P}(|X-\mu|\ge t)\le\frac{\sigma^2}{t^2}`,
 'P(|X̄ − E[X̄]| ≥ t) ≤ 2 exp(−2nt²)': String.raw`\mathbb{P}(|\bar X-\mathbb{E}[\bar X]|\ge t)\le2\exp(-2nt^2)`,
 'f : ℝᵈ → ℝᵏ,       k = O(log n / ε²)': String.raw`f:\mathbb{R}^{d}\to\mathbb{R}^{k},\qquad k=O\!\left(\frac{\log n}{\varepsilon^2}\right)`,
 '0.8 × 25 ≤ new squared distance ≤ 1.2 × 25': String.raw`0.8\times25\le\text{new squared distance}\le1.2\times25`,
 '20 ≤ new squared distance ≤ 30': String.raw`20\le\text{new squared distance}\le30`,
 'R has shape k × d;    u has shape d × 1;    Ru has shape k × 1': String.raw`R:k\times d,\qquad u:d\times1,\qquad Ru:k\times1`,
 'M = R/√k;     v = Mu = Ru/√k': String.raw`M=\frac{R}{\sqrt{k}},\qquad v=Mu=\frac{Ru}{\sqrt{k}}`,
 'E[||Mu||²] = (1/k) E[||Ru||²] = ||u||²': String.raw`\mathbb{E}[\|Mu\|^2]=\frac1k\mathbb{E}[\|Ru\|^2]=\|u\|^2`,
 'v = (1/√k) Ru': String.raw`v=\frac{1}{\sqrt{k}}Ru`,
 'x = (√k v)/||u|| = Ru/||u||     (for u ≠ 0)': String.raw`x=\frac{\sqrt{k}v}{\|u\|}=\frac{Ru}{\|u\|}\qquad(u\ne0)`,
 '||x||² = (k/||u||²)||v||²': String.raw`\|x\|^2=\frac{k}{\|u\|^2}\|v\|^2`,
 'x ~ N(0, I_k)': String.raw`x\sim\mathcal{N}(0,I_k)`,
};
