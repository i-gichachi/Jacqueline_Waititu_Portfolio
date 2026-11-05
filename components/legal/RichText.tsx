import Link from 'next/link';
import type { ReactNode } from 'react';

/** Renders a string with inline [label](href) links. Internal links use next/link; external ones open in a new tab. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    if (href.startsWith('/')) {
      out.push(
        <Link key={m.index} href={href}>
          {label}
        </Link>,
      );
    } else if (href.startsWith('http')) {
      out.push(
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>,
      );
    } else {
      out.push(
        <a key={m.index} href={href}>
          {label}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
