import {BookUnit} from '../book-ui';
import {bookMetadata, units, unitUrl} from '../../../lib/genai-book';

const unit = 'week-3';
export const metadata = bookMetadata(units[unit].title, units[unit].description, unitUrl(unit));
export default function Page() {
  return <BookUnit unit={unit}/>;
}
