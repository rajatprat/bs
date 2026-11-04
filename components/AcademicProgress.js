'use client';
import {useEffect,useState} from 'react';
import {readStudy} from './StudyTools';
import Icon from './Icon';
export default function AcademicProgress({total}){
 const [study,setStudy]=useState({lessons:{}});
 useEffect(()=>{const sync=()=>setStudy(readStudy());sync();window.addEventListener('bsnotes-study',sync);window.addEventListener('storage',sync);return()=>{window.removeEventListener('bsnotes-study',sync);window.removeEventListener('storage',sync);};},[]);
 const lessons=Object.values(study.lessons||{}).filter(x=>!x.resource);const done=Math.min(total,lessons.filter(x=>x.completed).length);const active=lessons.filter(x=>!x.completed).length;const percent=Math.round(done/total*100);const last=study.lessons?.[study.last];
 return <section className="academic-progress" aria-labelledby="progress-title"><div className="progress-books" aria-hidden="true"><span/><span/><span/><i/></div><div className="progress-content"><span className="eyebrow">YOUR OWN LEARNING JOURNEY</span><h2 id="progress-title">Your Learning at a Glance</h2><div className="progress-details"><div className="progress-ring" style={{'--progress':percent+'%'}} role="progressbar" aria-label="Sections completed" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span><strong>{percent}%</strong><small>Complete</small></span></div><ul><li><i className="done"/>{done} {done===1?'section':'sections'} completed</li><li><i className="active"/>{active} {active===1?'section':'sections'} in progress</li><li><i/>{Math.max(0,total-done-active)} sections to discover</li></ul><a className="progress-resume" href={last?.url||'/software-engineering/'}><Icon name="book" size={27}/><span><strong>{last?'Continue Learning':'Begin Your Journey'}</strong><small>{last?.title||'Explore Software Engineering'}</small></span><Icon name="arrow" size={19}/></a></div><p className="progress-privacy">Saved in this browser. No account needed.</p></div></section>;
}
