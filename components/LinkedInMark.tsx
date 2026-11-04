/* The one icon on the site: the inline LinkedIn mark (DESIGN-DIRECTION section 7). Decorative; the link carries the label. */
export function LinkedInMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="8" width="2" height="7" fill="currentColor" />
      <circle cx="6" cy="5.5" r="1.2" fill="currentColor" />
      <path d="M9.5 8h2v1.1c.4-.7 1.2-1.3 2.4-1.3 1.8 0 2.6 1.1 2.6 3V15h-2v-3.7c0-1-.4-1.6-1.3-1.6s-1.7.7-1.7 1.8V15h-2z" fill="currentColor" />
    </svg>
  );
}
