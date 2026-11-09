import { notFound } from 'next/navigation';
import { pageMetadata } from '../../../../lib/seo';
import data from '../../../../data/algorithms-week-4.json';
import Lesson from '../../../../components/Lesson';

export function generateStaticParams() {
  return data.sections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return pageMetadata(data.base + slug + '/');
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!data.sections.some(section => section.slug === slug)) notFound();
  return <Lesson data={data} slug={slug}/>;
}
