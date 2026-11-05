import type { MetadataRoute } from 'next';
import { cases } from '../content/cases.ts';
import { site } from '../content/site.ts';

const lastModified = new Date('2026-11-05');

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/leadership', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/capabilities', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/track-record', priority: 0.9, changeFrequency: 'monthly' },
    ...cases.map((c) => ({ path: `/track-record/${c.slug}`, priority: 0.7, changeFrequency: 'monthly' as const })),
    { path: '/advisory', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/connect', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];
  return pages.map((p) => ({
    url: p.path === '/' ? site.url : `${site.url}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
