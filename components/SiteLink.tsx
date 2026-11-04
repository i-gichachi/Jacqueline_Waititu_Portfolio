/*
  SiteLink: every link on the site goes through here (server and client components alike).

  - Internal route that is live            -> next/link
  - Internal route that is not live (draft) -> renders nothing (whenHidden="nothing", the default),
                                              or its children as plain text (whenHidden="text", used for
                                              links inside a sentence so the sentence still reads; the
                                              content stage asked for this on /leadership)
  - Internal path not in lib/routes.ts     -> throws, so a dead link fails the build
  - mailto:, tel:, #hash, assets           -> plain <a>
  - External                               -> <a target="_blank" rel="noopener noreferrer">
*/

import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { classifyHref } from '../lib/routes.ts';

export type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  whenHidden?: 'nothing' | 'text';
};

export function SiteLink({ href, children, whenHidden = 'nothing', ...rest }: SiteLinkProps) {
  const k = classifyHref(href);
  if (k.kind === 'route') {
    if (!k.known) throw new Error(`SiteLink: "${href}" is not a route in lib/routes.ts`);
    if (!k.live) return whenHidden === 'text' ? <>{children}</> : null;
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (k.kind === 'external') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

/** True when SiteLink would render a link for this href (for hiding wrappers such as list items). */
export { isLinkable } from './linkable.ts';
