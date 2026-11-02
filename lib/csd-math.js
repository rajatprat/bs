import katex from 'katex';
const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₙ':'n','ₖ':'k','ᵢ':'i','ⱼ':'j'};
const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','ⁿ':'n','ᵐ':'m','⁻':'-'};
export function booleanTex(raw){
 const s=raw.normalize('NFD');let i=0;
 function sequence(close=''){
  let out=[];
  while(i<s.length){
   let c=s[i]; if(c===close){i++;break;}
   let atom='';
   if(c==='('||c==='['){i++;atom='\\left'+c+sequence(c==='('?')':']')+'\\right'+(c==='('?')':']');}
   else if(/\s/.test(c)){i++;continue;}
   else {i++;atom=({'·':'\\cdot ','×':'\\times ','⊕':'\\oplus ','⊙':'\\odot ','Σ':'\\Sigma ','Π':'\\Pi ','→':'\\to ','↔':'\\leftrightarrow ','≤':'\\le ','≥':'\\ge ','≠':'\\ne ','−':'-','…':'\\ldots '}[c]||c);}
   // A complemented subscripted input is overline(I_2), not overline(I)_2.
   let bar=false,sub='',sup='';
   while(i<s.length){const m=s[i];if(m==='\u0305'||m==='\u0304'||m==='′'||m==="'"){bar=true;i++;}else if(subs[m]){sub+=subs[m];i++;}else if(supers[m]){sup+=supers[m];i++;}else break;}
   if(sub)atom+='_{'+sub+'}';if(sup)atom+='^{'+sup+'}';if(bar)atom='\\overline{'+atom+'}';out.push(atom);
  }
  return out.join(' ');
 }
 return sequence().replace(/l o g/g,'\\log').replace(/\b(?:A N D|O R|N O T|N A N D|N O R|X O R|X N O R|M U X)\b/g, name => '\\operatorname{'+name.replace(/ /g,'')+'}');
}
const marks = String.raw`[\u0304\u0305₀-₉ₙₖᵢⱼ⁰¹²³⁴⁵⁶⁷⁸⁹ⁿᵐ⁻′']*`;
const word = String.raw`(?!(?:and|or|for|in|is|as|an|can|of|to|when|not|the|one|no)\b)(?:Σm|ΠM|log|(?:[0-9]+)?(?:[A-ZabcdfmnxyzwĀ-ŽȲȳā-ž]${marks}){1,12}|[0-9]+)${marks}(?![\p{L}\p{N}_])`;
const token = String.raw`(?:${word}|[()\[\]]${marks}|[+=·×⊕⊙ΣΠ→↔≤≥≠−…,:/])`;
const pattern = new RegExp(String.raw`(?<![\p{L}\p{N}_])(?:${word}|[([])(?:\s*${token})*`, 'gu');
export function mathParts(text){
 let parts=[],last=0;
 for(const match of text.matchAll(pattern)){
  let value=match[0].trimEnd();
  // Avoid capturing sentence punctuation and unmatched surrounding parentheses.
  value=value.replace(/[,/:]+$/,'').trimEnd();
  while(/[([]$/.test(value))value=value.slice(0,-1).trimEnd();
  while(value.endsWith(')')&&(value.match(/\)/g)||[]).length>(value.match(/\(/g)||[]).length)value=value.slice(0,-1).trimEnd();
  while(value.startsWith('(')&&(value.match(/\(/g)||[]).length>(value.match(/\)/g)||[]).length)value=value.slice(1).trimStart();
  const start=match.index+match[0].indexOf(value);
  if(!value||!/[=+·×⊕⊙ΣΠ\u0304\u0305Ā-ŽȲ₀-₉⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]/.test(value))continue;
  if(!/[A-Za-zĀ-ŽȲΣΠ]/.test(value))continue;
  let stack=[];for(let k=0;k<value.length;k++){if(value[k]==='(')stack.push(k);else if(value[k]===')')stack.pop();}
  if(stack.length)value=value.slice(0,stack[0]).trimEnd().replace(/[+=·×⊕⊙]+$/,'').trimEnd();
  if(!value)continue;
  const opens=(value.match(/\(/g)||[]).length,closes=(value.match(/\)/g)||[]).length;if(opens!==closes)continue;
  const tex=booleanTex(value);let html;
  try{html=katex.renderToString(tex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});}catch{continue;}
  parts.push({start,end:start+value.length,raw:value,tex,html});last=start+value.length;
 }
 return parts;
}
export function renderBooleanHtml(html){return html.split(/(<[^>]*>)/g).map((text,i)=>{if(i%2)return text;const parts=mathParts(text);let out='',last=0;for(const p of parts){out+=text.slice(last,p.start)+p.html;last=p.end;}return out+text.slice(last);}).join('');}
