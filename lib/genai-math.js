// Explicit source expressions keep prose and mathematical semantics separate.
export const displayMath = {
  'θ* ∈ argmin_θ D(P_X ∥ P_θ)': String.raw`\theta^* \in \operatorname*{arg\,min}_{\theta} D(P_X\,\|\,P_\theta)`,
  'x̃ = g_θ(z),       z ∼ N(0,I)': String.raw`\tilde{x}=g_\theta(z),\qquad z\sim\mathcal{N}(0,I)`,
  'f(λa + (1−λ)b) ≤ λf(a) + (1−λ)f(b)': String.raw`f\bigl(\lambda a+(1-\lambda)b\bigr)\leq\lambda f(a)+(1-\lambda)f(b)`,
  'D_f(P ∥ Q) = ∫ q(x) f(p(x)/q(x)) dx': String.raw`D_f(P\,\|\,Q)=\int q(x)\,f\!\left(\frac{p(x)}{q(x)}\right)\,dx`,
};
export const inlineMath = {
  ...displayMath,
  'D = {x₁, …, xₙ}': String.raw`D=\{x_1,\ldots,x_n\}`,
  'D = {x₁,…,xₙ}': String.raw`D=\{x_1,\ldots,x_n\}`,
  'xᵢ i.i.d. ∼ P_X': String.raw`x_i\overset{\mathrm{i.i.d.}}{\sim}P_X`,
  'z ∼ N(0,I)': String.raw`z\sim\mathcal{N}(0,I)`,
  'z ∼ N(0,1)': String.raw`z\sim\mathcal{N}(0,1)`,
  'x̃ ∼ N(θ,1)': String.raw`\tilde{x}\sim\mathcal{N}(\theta,1)`,
  'g_θ(z) = θ + z': String.raw`g_\theta(z)=\theta+z`,
  'g_θ(z) = θ + 2z': String.raw`g_\theta(z)=\theta+2z`,
  'x̃=g_θ(z)': String.raw`\tilde{x}=g_\theta(z)`,
  'L(θ) = (θ − 2)² + 1': String.raw`L(\theta)=(\theta-2)^2+1`,
  'min_θ L(θ) = 1': String.raw`\min_\theta L(\theta)=1`,
  'argmin_θ L(θ) = {2}': String.raw`\operatorname*{arg\,min}_\theta L(\theta)=\{2\}`,
  'L(t) = (t + 4)² + 7': String.raw`L(t)=(t+4)^2+7`,
  'L(t) = (t + 1)² + 4': String.raw`L(t)=(t+1)^2+4`,
  'L(t) = (t² − 1)²': String.raw`L(t)=(t^2-1)^2`,
  'λa²+(1−λ)b² − (λa+(1−λ)b)² = λ(1−λ)(a−b)² ≥ 0': String.raw`\lambda a^2+(1-\lambda)b^2-(\lambda a+(1-\lambda)b)^2=\lambda(1-\lambda)(a-b)^2\geq0`,
  'f″(x) ≥ 0': String.raw`f''(x)\geq0`,
  'f(x)=x²': String.raw`f(x)=x^2`,
  'f(x) = x²': String.raw`f(x)=x^2`,
  'f(x)=−x²': String.raw`f(x)=-x^2`,
  '0 ≤ λ ≤ 1': String.raw`0\leq\lambda\leq1`,
  'E_Q[R] = ∫p(x)dx = 1': String.raw`\mathbb{E}_Q[R]=\int p(x)\,dx=1`,
  'E_Q[f(R)] ≥ f(E_Q[R]) = f(1) = 0': String.raw`\mathbb{E}_Q[f(R)]\geq f\!\left(\mathbb{E}_Q[R]\right)=f(1)=0`,
  'D_f(P ∥ Q) ≥ 0': String.raw`D_f(P\,\|\,Q)\geq0`,
  'D_f(P∥Q) = Σᵢ qᵢ f(pᵢ/qᵢ)': String.raw`D_f(P\,\|\,Q)=\sum_i q_i f\!\left(\frac{p_i}{q_i}\right)`,
  'D_f(P∥P)=Σᵢ pᵢ f(1)=0': String.raw`D_f(P\,\|\,P)=\sum_i p_i f(1)=0`,
  'D_KL(P∥Q)=∫p ln(p/q)': String.raw`D_{\mathrm{KL}}(P\,\|\,Q)=\int p\ln\!\left(\frac{p}{q}\right)`,
  'JS(P,Q) = 1/2 KL(P∥M) + 1/2 KL(Q∥M)': String.raw`\operatorname{JS}(P,Q)=\frac12\operatorname{KL}(P\|M)+\frac12\operatorname{KL}(Q\|M)`,
  'f(u)=1/2[u ln(2u/(1+u)) + ln(2/(1+u))]': String.raw`f(u)=\frac12\left[u\ln\frac{2u}{1+u}+\ln\frac{2}{1+u}\right]`,
  'TV(P,Q)=1/2∫|p−q|': String.raw`\operatorname{TV}(P,Q)=\frac12\int|p-q|`,
  'f(u)=|u−1|/2': String.raw`f(u)=\frac{|u-1|}{2}`,
  'f(u) = u ln u': String.raw`f(u)=u\ln u`,
  'f(u)=u ln u': String.raw`f(u)=u\ln u`,
  'f(u) = (u−1)²': String.raw`f(u)=(u-1)^2`,
  'mᵢ=(pᵢ+qᵢ)/2': String.raw`m_i=\frac{p_i+q_i}{2}`,
  'M=(P+Q)/2': String.raw`M=\frac{P+Q}{2}`,
  'pᵢ ln(pᵢ/qᵢ)': String.raw`p_i\ln\frac{p_i}{q_i}`,
  'pᵢ/qᵢ': String.raw`\frac{p_i}{q_i}`,
  'p(X)/q(X)': String.raw`\frac{p(X)}{q(X)}`,
  '|pᵢ−qᵢ|': String.raw`|p_i-q_i|`,
};
// Complete worked expressions, rather than isolated mathematical characters.
for (const expression of [
  'D(P_X ∥ P_θ)', 'N(3,1)', 'θ = 3', 'θ = 10', 'θ = 2', 'θ − 2 = 0', 'L(θ) ≥ 1',
  'min L = 4', 'argmin L = {−1}', 'argmin L = {−1,1}', 'argmin L = 4',
  'a = −2', 'b = 2', 'λ = 1/2', 'a=−1', 'b=1', 'λ=1/2', 'a = 1', 'b = 3', 'λ = 1/4',
  'f(0) = 0', '0.5 f(−2) + 0.5 f(2) = 4', '0 ≤ 4', '0≤−1',
  '(1/4)·1 + (3/4)·3 = 2.5', 'f(2.5) = 6.25', '(1/4)f(1) + (3/4)f(3) = 0.25 + 6.75 = 7',
  '6.25 ≤ 7', 'f(0)=0', '[f(−1)+f(1)]/2=−1', '0 ≤ −1',
  'f(1)=0', 'P = Q', 'P=Q', 'R = p(X)/q(X)', 'P = (3/4, 1/4)', 'Q = (1/2, 1/2)',
  'D_f(P∥Q) = (3/4)ln(3/2) + (1/4)ln(1/2)', 'P=(3/4,1/4)', 'Q=(1/2,1/2)',
  '(0.5)²=0.25', '(−0.5)²=0.25', '(1/2)(0.25)+(1/2)(0.25)=0.25', 'q(x)=0',
  'f(0)=0', 'P=(0.9,0.1)', 'Q=(0.5,0.5)',
  'KL(P∥Q)=0.9 ln(1.8)+0.1 ln(0.2) ≈ 0.3681',
  'KL(Q∥P)=0.5 ln(0.5/0.9)+0.5 ln(0.5/0.1) ≈ 0.5108',
  'P=(0.8,0.2)', 'KL(P∥Q)=0.8 ln(0.8/0.5)+0.2 ln(0.2/0.5)=0.8 ln(1.6)+0.2 ln(0.4)≈0.1927',
  'KL(Q∥P)=0.5 ln(0.5/0.8)+0.5 ln(0.5/0.2)=0.5 ln(0.625)+0.5 ln(2.5)≈0.2231',
  'M=(P+Q)/2=(0.65,0.35)', 'KL(P∥M)=0.8 ln(0.8/0.65)+0.2 ln(0.2/0.35)≈0.0542',
  'KL(Q∥M)=0.5 ln(0.5/0.65)+0.5 ln(0.5/0.35)≈0.0472', 'JS(P,Q)=(0.0542+0.0472)/2≈0.0507',
  'TV(P,Q)=1/2 (|0.8−0.5|+|0.2−0.5|)=1/2 (0.3+0.3)=0.3',
  'P=(0.6,0.4)', 'Q=(0.4,0.6)', 'TV=1/2(|0.6−0.4|+|0.4−0.6|)=0.2',
  '0.6 ln(1.5)+0.4 ln(2/3)≈0.0811', 'M=(0.5,0.5)',
  'KL(P∥M)=0.6 ln(1.2)+0.4 ln(0.8)≈0.02014', 'JS≈0.02014', 'pᵢ=0', 'qᵢ>0', 'pᵢ>0', 'qᵢ=0', 'ln(0)',
  'P=(0.75,0.25)', 'Q=(0.25,0.75)', 'KL(P∥Q)', 'KL(Q∥P)', 'JS(P,Q)', 'TV(P,Q)',
  'KL(P∥Q)=0.75 ln(3)+0.25 ln(1/3)=(0.75−0.25)ln 3=0.5 ln 3≈0.5493',
  'KL(Q∥P)=0.25 ln(1/3)+0.75 ln 3=0.5 ln 3≈0.5493',
  'KL(P∥M)=0.75 ln(1.5)+0.25 ln(0.5)≈0.1308', 'JS(P,Q)≈0.1308',
  'TV(P,Q)=1/2(|0.75−0.25|+|0.25−0.75|)=1/2(0.5+0.5)=0.5',
  'n = 1,000', 'd = 20×20×3 = 1,200', '1,000×1,200', 'n = 600', 'd = 28 × 28 = 784',
  '100×100×3 = 30,000', '20×20', '28 × 28',
]) inlineMath[expression] = toTex(expression);
// Supplementary notation found during the complete Part 1 audit.
for (const expression of ['1/2', '(3/2, 1/2)', 't = −1', 't = 1', '{−4}', '{1,5}', '{1, 5}', 'z ∈ {−1,+1}', 'ln(P/Q)', 'KL(P∥M)', 'KL(Q∥M)', '−1', '+1', 'ℝ', 'N(0,I)', 'N(0,1)', '≤', 'ℝᵈ', '100×100']) inlineMath[expression] = toTex(expression);
inlineMath['R = p(X)/q(X)'] = String.raw`R=\frac{p(X)}{q(X)}`;
inlineMath['z ∈ {−1,+1}'] = String.raw`z\in\{-1,+1\}`;
inlineMath['≤'] = String.raw`\leq`;
inlineMath['[f(−1)+f(1)]/2=−1'] = String.raw`\frac{f(-1)+f(1)}{2}=-1`;
inlineMath['ln(P/Q)'] = String.raw`\ln\frac{P}{Q}`;
// Approved Week 1 continuation: explicit conjugate and variational notation.
Object.assign(inlineMath, {
  "E_P[h(X)] = ∫ h(x)p(x) dx": "\\mathbb{E}_P[h(X)]=\\int h(x)p(x)\\,dx",
  "(1/n) Σᵢ h(Xᵢ)": "\\frac1n\\sum_i h(X_i)",
  "E_P[h(X)]": "\\mathbb{E}_P[h(X)]",
  "X₁,…,Xₙ": "X_1,\\ldots,X_n",
  "(2+4+3+5+6)/5 = 4": "\\frac{2+4+3+5+6}{5}=4",
  "A=[0,1]": "A=[0,1]",
  "max A=1": "\\max A=1",
  "sup A=1": "\\sup A=1",
  "B=(0,1)": "B=(0,1)",
  "sup B=1": "\\sup B=1",
  "C=(2,5)": "C=(2,5)",
  "inf C=2": "\\inf C=2",
  "f*(t) = supᵤ {t u − f(u)}": "f^*(t)=\\sup_{u}\\{tu-f(u)\\}",
  "f(u)=u²/2": "f(u)=\\frac{u^2}{2}",
  "f*(t)=supᵤ (t u−u²/2)": "f^*(t)=\\sup_u\\left(tu-\\frac{u^2}{2}\\right)",
  "d/du(tu−u²/2)=t−u": "\\frac{d}{du}\\left(tu-\\frac{u^2}{2}\\right)=t-u",
  "u=t": "u=t",
  "f*(t)=t²−t²/2=t²/2": "f^*(t)=t^2-\\frac{t^2}{2}=\\frac{t^2}{2}",
  "t=2": "t=2",
  "u=2": "u=2",
  "f*(2)=2": "f^*(2)=2",
  "y=t u−f*(t)": "y=tu-f^*(t)",
  "−f*(t)": "-f^*(t)",
  "u>0": "u>0",
  "u≥0": "u\\geq0",
  "t u−u ln u": "tu-u\\ln u",
  "t−(ln u+1)": "t-(\\ln u+1)",
  "ln u=t−1": "\\ln u=t-1",
  "u=e^(t−1)": "u=e^{t-1}",
  "−1/u": "-\\frac1u",
  "f*(t)=e^(t−1)": "f^*(t)=e^{t-1}",
  "f(u)=supₜ {t u−f*(t)}": "f(u)=\\sup_t\\{tu-f^*(t)\\}",
  "f*(t)=t²/2": "f^*(t)=\\frac{t^2}{2}",
  "t u−t²/2": "tu-\\frac{t^2}{2}",
  "u−t": "u-t",
  "t=u": "t=u",
  "u²−u²/2=u²/2=f(u)": "u^2-\\frac{u^2}{2}=\\frac{u^2}{2}=f(u)",
  "p(x)/q(x)": "\\frac{p(x)}{q(x)}",
  "t=T(x)": "t=T(x)",
  "T(x₁)": "T(x_1)",
  "T(x₂)": "T(x_2)",
  "T(x₃)": "T(x_3)",
  "𝒯": "\\mathcal{T}",
  "D_f(P∥Q) = sup_T { E_P[T(X)] − E_Q[f*(T(X))] }": "D_f(P\\|Q)=\\sup_T\\left\\{\\mathbb{E}_P[T(X)]-\\mathbb{E}_Q[f^*(T(X))]\\right\\}",
  "f*(T(X))": "f^*(T(X))",
  "D_f(P∥Q)=∫q(x)f(p(x)/q(x))dx": "D_f(P\\|Q)=\\int q(x)f\\!\\left(\\frac{p(x)}{q(x)}\\right)\\,dx",
  "supₜ {tr−f*(t)}": "\\sup_t\\{tr-f^*(t)\\}",
  "r=p(x)/q(x)": "r=\\frac{p(x)}{q(x)}",
  "sup_T ∫[p(x)T(x)−q(x)f*(T(x))]dx": "\\sup_T\\int\\left[p(x)T(x)-q(x)f^*(T(x))\\right]\\,dx",
  "sup_{T∈𝒯} J(T) ≤ D_f(P∥Q)": "\\sup_{T\\in\\mathcal{T}} J(T)\\leq D_f(P\\|Q)",
  "J(T)=E_P[T]−E_Q[f*(T)]": "J(T)=\\mathbb{E}_P[T]-\\mathbb{E}_Q[f^*(T)]",
  "KL(P∥Q)=sup_T { E_P[T(X)]−E_Q[e^(T(X)−1)] }": "\\operatorname{KL}(P\\|Q)=\\sup_T\\left\\{\\mathbb{E}_P[T(X)]-\\mathbb{E}_Q[e^{T(X)-1}]\\right\\}",
  "x₁,…,xₙ": "x_1,\\ldots,x_n",
  "x̃₁,…,x̃ₘ": "\\tilde{x}_1,\\ldots,\\tilde{x}_m",
  "Ĵ(T)=(1/n)ΣᵢT(xᵢ)−(1/m)Σⱼf*(T(x̃ⱼ))": "\\widehat{J}(T)=\\frac1n\\sum_i T(x_i)-\\frac1m\\sum_j f^*(T(\\tilde{x}_j))",
  "(1+3)/2=2": "\\frac{1+3}{2}=2",
  "(0.8+1.2)/2=1": "\\frac{0.8+1.2}{2}=1",
  "Ĵ(T)=2−1=1": "\\widehat{J}(T)=2-1=1",
  "E_{P_θ}[f*(T(X))]": "\\mathbb{E}_{P_\\theta}[f^*(T(X))]",
  "f*(t)": "f^*(t)",
  "f*": "f^*",
  "T(x)": "T(x)"
});
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const expressions = Object.keys(inlineMath).sort((a,b)=>b.length-a.length).map(escape).join('|');
// Match only explicit source expressions and unmistakable notation. Arbitrary
// single ASCII letters followed by operators can consume the ends of prose words.
const fallback = String.raw`[A-Za-z]+_[A-Za-zθ]+|[xpq][₀-₉ᵢₙ]+|ℝᵈ|θ\*|[θλ]|x̃`;
export function mathSegments(text) {
  const pattern = new RegExp(`${expressions}|${fallback}`,'g');
  const result=[]; let end=0;
  for (const match of text.matchAll(pattern)) {
    if(match.index>end) result.push({text:text.slice(end,match.index)});
    result.push({text:match[0],tex:inlineMath[match[0]] || toTex(match[0])}); end=match.index+match[0].length;
  }
  if(end<text.length) result.push({text:text.slice(end)});
  return result;
}
export function toTex(text) {
  const symbols={'θ':'\\theta ','λ':'\\lambda ','ℝ':'\\mathbb{R}','∼':'\\sim ','≈':'\\approx ','≥':'\\geq ','≤':'\\leq ','∈':'\\in ','∥':'\\|','×':'\\times ','−':'-','∫':'\\int ','Σ':'\\sum '};
  const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ᵢ':'i','ₙ':'n'};
  return text.replace(/\(([^()]*)\)\/(\d+(?:\.\d+)?)/g,'FRACSTART$1FRACMID$2FRACEND').replace(/(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g,'FRACSTART$1FRACMID$2FRACEND').replace(/\{/g,'\\{').replace(/\}/g,'\\}').replace(/·/g,'\\cdot ').replace(/x̃/g,'\\tilde{x}').replace(/[₀-₉ᵢₙ]+/g,s=>'_{'+[...s].map(c=>subs[c]).join('')+'}').replace(/²/g,'^{2}').replace(/³/g,'^{3}').replace(/ᵈ/g,'^{d}').replace(/θ\*/g,'θ^{*}').replace(/[θλℝ∼≈≥≤∈∥×−∫Σ]/g,c=>symbols[c]).replace(/\b(KL|JS|TV|ln|argmin)\b/g,(_,word)=>word==='ln'?'\\ln ':`\\operatorname{${word}}`).replace(/([A-Za-z]+)_([A-Za-z]+)/g,'$1_{$2}').replace(/FRACSTART(.*?)FRACMID(.*?)FRACEND/g,'\\frac{$1}{$2}');
}

// Break chains at top-level equals signs, keeping fractions and function
// arguments intact. This produces vertically aligned derivations.
export function displayTex(tex) {
  if(tex.startsWith('D_f') && tex.includes('\\sup_T')) return String.raw`\begin{aligned}&D_f(P\|Q)\\&=\sup_T\bigl\{\mathbb{E}_P[T(X)]\\&\qquad-\mathbb{E}_Q[f^*(T(X))]\bigr\}\end{aligned}`;
  if(tex.startsWith('\\operatorname{KL}') && tex.includes('\\sup_T')) return String.raw`\begin{aligned}&\operatorname{KL}(P\|Q)\\&=\sup_T\bigl\{\mathbb{E}_P[T(X)]\\&\qquad-\mathbb{E}_Q[e^{T(X)-1}]\bigr\}\end{aligned}`;
  if(tex.startsWith('\\widehat{J}') && tex.includes('\\sum')) return String.raw`\begin{aligned}&\widehat{J}(T)\\&=\frac1n\sum_i T(x_i)\\&\quad-\frac1m\sum_j f^*(T(\tilde{x}_j))\end{aligned}`;
  if (tex.startsWith('\\lambda a^2') && tex.includes('-(\\lambda a+')) return String.raw`\begin{aligned}&\lambda a^2+(1-\lambda)b^2\\&\quad-(\lambda a+(1-\lambda)b)^2\\&=\lambda(1-\lambda)(a-b)^2\\&\geq0\end{aligned}`;
  if (tex.startsWith('\\operatorname{TV}') && tex.includes('|0.75-0.25|')) return String.raw`\begin{aligned}&\operatorname{TV}(P,Q)\\&=\frac12\bigl(|0.75-0.25|\\&\qquad+|0.25-0.75|\bigr)\\&=\frac12(0.5+0.5)\\&=0.5\end{aligned}`;
  if (tex.includes('\\begin{') || tex.length<55) return tex;
  let depth=0, parens=0, start=0; const rows=[];
  for(let i=0;i<tex.length;i++) {
    const char=tex[i],escaped=tex[i-1]==='\\';
    if(char==='{'&&!escaped)depth++;
    if(char==='}'&&!escaped)depth--;
    if(depth===0&&(char==='('||char==='['))parens++;
    if(depth===0&&(char===')'||char===']'))parens--;
    if(depth!==0||parens!==0)continue;
    const command=tex.slice(i).match(/^\\(?:approx|geq|leq)\b/);
    const relation=char==='='||command;
    if((relation||char==='+')&&i>start) {
      rows.push(tex.slice(start,i));start=i;
      if(command)i+=command[0].length-1;
    }
  }
  rows.push(tex.slice(start));
  return rows.length>1 ? String.raw`\begin{aligned}`+rows.map(row=>'&'+row.trim()).join(String.raw`\\`)+String.raw`\end{aligned}` : tex;
}
