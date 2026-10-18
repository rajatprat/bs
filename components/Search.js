'use client';
import { useEffect, useMemo, useState } from 'react';
const normalize = text => text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
export default function Search({ entries }) {
  const [query, setQuery] = useState('');
  const [week, setWeek] = useState('all');
  const [subject, setSubject] = useState('all');
  const subjects = [...new Map(entries.map(entry => [entry.subjectSlug, entry.subject])).entries()];
  const weeks = [...new Set(entries.filter(entry => subject === 'all' || entry.subjectSlug === subject).map(entry => entry.week))].sort((a,b)=>a-b);
  useEffect(() => { const params = new URLSearchParams(window.location.search); setQuery(params.get('q') || ''); if (subjects.some(([slug]) => slug === params.get('subject'))) setSubject(params.get('subject')); if ([...new Set(entries.map(entry => String(entry.week)))].includes(params.get('week'))) setWeek(params.get('week')); }, []);
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    if (!terms.length) return [];
    return entries.filter(entry => (subject === 'all' || entry.subjectSlug === subject) && (week === 'all' || entry.week === Number(week))).map(entry => {
      const title = normalize(entry.title), lesson = normalize(entry.lesson), body = normalize(entry.text);
      if (!terms.every(term => `${title} ${lesson} ${body}`.includes(term))) return null;
      const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 5 : 0) + (lesson.includes(term) ? 2 : 0) + (body.includes(term) ? 1 : 0), 0);
      const position = Math.max(0, body.indexOf(terms.find(term => body.includes(term)) || ''));
      const start = Math.max(0, position - 70);
      const snippet = entry.text.trim().slice(start, start + 230);
      return { ...entry, score, snippet: `${start ? '…' : ''}${snippet}${entry.text.length > start + 230 ? '…' : ''}` };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.week - b.week);
  }, [query, week, subject, entries]);
  function saveQuery() {
    const url = new URL(window.location.href);
    query.trim() ? url.searchParams.set('q', query.trim()) : url.searchParams.delete('q');
    week === 'all' ? url.searchParams.delete('week') : url.searchParams.set('week', week);
    subject === 'all' ? url.searchParams.delete('subject') : url.searchParams.set('subject', subject);
    window.history.replaceState(null, '', url);
  }
  return <><form className="course-search-form" role="search" onSubmit={event => { event.preventDefault(); saveQuery(); }}>
    <div><label htmlFor="course-query">Search lessons</label><input id="course-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try convexity, KL divergence, or Git" autoFocus/></div>
    <div><label htmlFor="search-subject">Subject</label><select id="search-subject" value={subject} onChange={event => { setSubject(event.target.value); setWeek('all'); }}><option value="all">All subjects</option>{subjects.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></div><div><label htmlFor="search-week">Week</label><select id="search-week" value={week} onChange={event => setWeek(event.target.value)}><option value="all">All weeks</option>{weeks.map(value => <option key={value} value={value}>Week {value}</option>)}</select></div>
    <button type="submit">Search</button>
  </form><p className="search-status" role="status">{!terms.length ? 'Enter a topic or phrase to search the course.' : `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${query.trim()}”`}</p>
  {terms.length > 0 && results.length === 0 && <p>Try fewer words, a different spelling, or select all weeks.</p>}
  <div className="search-results">{results.map(entry => <a className="search-result" key={entry.url} href={entry.url} onClick={saveQuery}><span className="eyebrow">{entry.subject} · WEEK {entry.week}{entry.part ? ` · PART ${entry.part}` : ''} · {entry.lesson}</span><h2>{entry.title}</h2><p>{entry.snippet || 'Open this lesson to explore the topic.'}</p><span className="open-label">Read section →</span></a>)}</div></>;
}
