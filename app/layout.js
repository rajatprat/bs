import {siteUrl, jsonLd} from '../lib/seo';
import Analytics from '../components/Analytics';
import SiteHeader from '../components/SiteHeader';
import 'katex/dist/katex.min.css';
import './globals.css';
import './algorithms-katex.css';
import './student-ui.css';
export const metadata={verification:{google:'frNYoTBzLsN-ltVcjwE2Ok32k0_H71XmFmwthn2z4rY'},metadataBase:new URL(siteUrl),title:{default:'BSNotes.in — Your student learning library',template:'%s · BSNotes.in'},description:'Made by a student. For students. Illustrated course notes, worked examples and revision for IIT Madras BS students.'};
export default function Layout({children}){return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'WebSite',name:'BSNotes.in',url:siteUrl,description:'Independent student-made study notes for IIT Madras BS students.'})}}/><a className="skip" href="#main">Skip to content</a><SiteHeader/>{children}<footer className="site-footer"><div><a href="/" className="footer-brand">BS<span>Notes</span>.in</a><p>Independent student-made notes for IIT Madras BS students. Not affiliated with IIT Madras.</p></div><nav aria-label="Footer navigation"><a href="/#subjects">Browse subjects</a><a href="/search/">Search notes</a></nav><span>Keep learning, one idea at a time.</span></footer><Analytics/></body></html>;}
