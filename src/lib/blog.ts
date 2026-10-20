import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const DIR = path.join(process.cwd(), 'content', 'blog');

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  tags: string[];
  cover?: string; // optional custom cover; otherwise the generated share image is used
  readingMinutes: number;
  html: string;
};

function load(file: string): Post {
  const slug = file.replace(/\.md$/, '');
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
    author: String(data.author ?? 'Shedfactory Team'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map(load)
    .filter((p) => !p.date || p.date <= new Date().toISOString().slice(0, 10)) // future dates = scheduled
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export const coverFor = (p: Post) => p.cover || `/blog/${p.slug}/opengraph-image`;

export const formatDate = (d: string) =>
  d ? new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
