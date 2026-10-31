'use client';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import Icon from './Icon';
export default function SiteHeader(){
 const pathname=usePathname();const [open,setOpen]=useState(false);
 useEffect(()=>{const key=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();window.location.assign('/search/');}if(e.key==='Escape')setOpen(false);};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
 useEffect(()=>setOpen(false),[pathname]);
 return <header className="site-header"><div className="header-inner"><a className="brand" href="/" aria-label="BSNotes.in home"><img src="/images/brand/bsnotes-logo.png" alt="BSNotes.in — Notes for IIT Madras BS Students" width="2172" height="724"/></a><nav className="header-nav" aria-label="Main navigation"><a href="/" aria-current={pathname==='/'?'page':undefined}>My library</a><a href="/#subjects">Subjects</a></nav><a className="header-search" href="/search/" aria-label="Search notes"><Icon name="search" size={18}/><span>Search your notes</span><kbd>⌘ K</kbd></a><button className="mobile-menu-toggle" aria-expanded={open} aria-controls="main-mobile-menu" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}><Icon name={open?'close':'menu'}/></button></div>{open&&<nav id="main-mobile-menu" className="header-mobile-nav" aria-label="Mobile navigation"><a href="/">My library</a><a href="/#subjects">Browse subjects</a><a href="/search/">Search notes</a></nav>}</header>;
}
