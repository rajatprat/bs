import {pageMetadata} from '../../../../lib/seo';
import data from '../../../../data/spg-week-7.json';
import Lesson from '../../../../components/Lesson';
import { notFound } from 'next/navigation';
export function generateStaticParams() { return data.sections.map(s => ({ slug: s.slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; return pageMetadata("/spg/week-7/" + slug + '/'); }
export default async function Page({ params }) { const { slug } = await params; if (!data.sections.some(s => s.slug === slug)) notFound(); return <Lesson data={data} slug={slug}/>; }
