/*
  Minimal HTML scanner for the build checks (scripts/check-output.ts). No dependencies.

  It walks the emitted HTML once and separates:
  - visible text (text nodes outside <script>, <style>, <template> and comments)
  - the same text with every element marked data-testimonial-text removed (for the "letter" check)
  - attribute values (aria-label, alt, title, content, id, href ...) inside and outside that element
  - the text of every element marked data-testimonial-quote (each must be a substring of the testimonial)
  - the paragraphs of every element marked data-testimonial-full (joined, they must equal the testimonial)
  - JSON-LD script bodies and every <a href>
*/

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'template', 'textarea', 'title']);

export interface ScanResult {
  text: string;
  textOutsideTestimonial: string;
  attrs: { name: string; value: string; inTestimonial: boolean }[];
  quotes: string[];
  fullTexts: string[][];
  jsonLd: string[];
  anchors: string[];
  title: string;
  /** HTML with framework scripts removed (JSON-LD kept), for raw-string checks such as "{{". */
  htmlWithoutScripts: string;
}

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, body: string) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    const named: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '\u2014', ndash: '\u2013', copy: '©', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…' };
    return named[body.toLowerCase()] ?? m;
  });
}

function parseAttrs(src: string): { name: string; value: string }[] {
  const out: { name: string; value: string }[] = [];
  const re = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    out.push({ name: m[1].toLowerCase(), value: decodeEntities(m[2] ?? m[3] ?? m[4] ?? '') });
  }
  return out;
}

interface Frame {
  tag: string;
  testimonial: boolean;
  quote: number | null;
  full: number | null;
  para: boolean;
}

export function scanHtml(html: string): ScanResult {
  const res: ScanResult = { text: '', textOutsideTestimonial: '', attrs: [], quotes: [], fullTexts: [], jsonLd: [], anchors: [], title: '', htmlWithoutScripts: '' };
  const stack: Frame[] = [];
  const quoteBuf: string[] = [];
  const fullParas: string[][] = [];
  let paraBuf: string | null = null;
  let kept = '';
  let i = 0;

  const inTestimonial = () => stack.some((f) => f.testimonial);
  const openQuotes = () => stack.filter((f) => f.quote !== null).map((f) => f.quote as number);
  const openFull = () => {
    for (let k = stack.length - 1; k >= 0; k -= 1) if (stack[k].full !== null) return stack[k].full as number;
    return null;
  };

  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      i = end < 0 ? html.length : end + 3;
      continue;
    }
    if (html[i] === '<' && /[a-zA-Z!\/]/.test(html[i + 1] ?? '')) {
      const end = html.indexOf('>', i);
      if (end < 0) break;
      const rawTag = html.slice(i + 1, end);
      // Tags separate words with a newline, so "</h2><p>x" never glues two words together and a citation pattern cannot match across elements.
      res.text += '\n';
      if (!inTestimonial()) res.textOutsideTestimonial += '\n';
      if (rawTag.startsWith('!')) {
        kept += html.slice(i, end + 1);
        i = end + 1;
        continue;
      }
      if (rawTag.startsWith('/')) {
        const name = rawTag.slice(1).trim().toLowerCase();
        for (let k = stack.length - 1; k >= 0; k -= 1) {
          if (stack[k].tag === name) {
            if (stack[k].para && paraBuf !== null) {
              const f = openFull();
              if (f !== null) fullParas[f].push(paraBuf);
              paraBuf = null;
            }
            stack.length = k;
            break;
          }
        }
        kept += html.slice(i, end + 1);
        i = end + 1;
        continue;
      }
      const selfClosing = rawTag.endsWith('/');
      const nameMatch = rawTag.match(/^([a-zA-Z][a-zA-Z0-9-]*)/);
      const name = (nameMatch?.[1] ?? '').toLowerCase();
      const attrs = parseAttrs(rawTag.slice(name.length).replace(/\/$/, ''));
      const has = (n: string) => attrs.some((a) => a.name === n);
      const get = (n: string) => attrs.find((a) => a.name === n)?.value;

      if (RAW.has(name) && !selfClosing) {
        const close = html.toLowerCase().indexOf(`</${name}`, end + 1);
        const body = html.slice(end + 1, close < 0 ? html.length : close);
        const closeEnd = close < 0 ? html.length : html.indexOf('>', close) + 1;
        if (name === 'script') {
          if ((get('type') ?? '').toLowerCase() === 'application/ld+json') {
            res.jsonLd.push(body);
            kept += html.slice(i, closeEnd);
          }
        } else {
          if (name === 'title') res.title = decodeEntities(body);
          kept += html.slice(i, closeEnd);
        }
        i = closeEnd;
        continue;
      }

      const testimonialNow = inTestimonial() || has('data-testimonial-text');
      for (const a of attrs) {
        if (a.name === 'class' || a.name === 'style' || a.name.startsWith('data-testimonial')) continue;
        res.attrs.push({ name: a.name, value: a.value, inTestimonial: testimonialNow });
      }
      if (name === 'a' && has('href')) res.anchors.push(get('href') as string);

      if (!VOID.has(name) && !selfClosing) {
        const frame: Frame = { tag: name, testimonial: has('data-testimonial-text'), quote: null, full: null, para: false };
        if (has('data-testimonial-quote')) {
          frame.quote = quoteBuf.length;
          quoteBuf.push('');
        }
        if (has('data-testimonial-full')) {
          frame.full = fullParas.length;
          fullParas.push([]);
        }
        if (name === 'p' && openFull() !== null) {
          frame.para = true;
          paraBuf = '';
        }
        stack.push(frame);
      }
      kept += html.slice(i, end + 1);
      i = end + 1;
      continue;
    }
    const next = html.indexOf('<', i + 1);
    const chunk = html.slice(i, next < 0 ? html.length : next);
    const text = decodeEntities(chunk);
    res.text += text;
    if (!inTestimonial()) res.textOutsideTestimonial += text;
    for (const q of openQuotes()) quoteBuf[q] += text;
    if (paraBuf !== null) paraBuf += text;
    kept += chunk;
    i = next < 0 ? html.length : next;
  }
  res.quotes = quoteBuf;
  res.fullTexts = fullParas;
  res.htmlWithoutScripts = kept;
  return res;
}
