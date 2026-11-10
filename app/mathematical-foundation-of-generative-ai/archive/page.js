import {bookBase} from '../../../lib/genai-book';
import {BookBreadcrumbs} from '../book-ui';

export const metadata = {title: 'Original GenAI course notes', robots: {index: false, follow: true}};

export default function Archive() {
  return <main id="main" className="week-page">
    <BookBreadcrumbs archive/>
    <div className="eyebrow">Illustrated course notes</div>
    <h1>Original GenAI notes</h1>
    <p className="lead">Study the original illustrated lessons, worked examples, and practice for Weeks 1 and 2.</p>
    <ul className="genai-chapter-links">
      <li><a href={bookBase + 'archive/week-1/'}>Week 1 · Foundations and variational optimization</a></li>
      <li><a href={bookBase + 'archive/week-2/'}>Week 2 · Realization of variational divergence minimization</a></li>
    </ul>
    <p><a href={bookBase}>← Back to the four-week study plan</a></p>
  </main>;
}
