import CopyProtection from '../components/CopyProtection';
import 'katex/dist/katex.min.css';
import './globals.css';
import './algorithms-katex.css';
export const metadata = { title: { default: 'BS Course Notes', template: '%s · BS Course Notes' }, description: 'Illustrated learning notes for Software Engineering, Mathematical Foundation of Generative AI, and Algorithms in Data Science.' };
export default function Layout({ children }) { return <html lang="en"><body><CopyProtection/><a className="skip" href="#main">Skip to content</a><header><a className="brand" href="/"><span className="mark">bs<span>.</span></span><span>Course notes</span></a><span className="header-note">A place to understand.</span><a className="header-search" href="/search/">Search notes</a><a className="header-link" href="/">Subjects</a></header>{children}<footer><span>BS Course Notes</span><span>Software Engineering · Generative AI · Algorithms</span></footer></body></html>; }
