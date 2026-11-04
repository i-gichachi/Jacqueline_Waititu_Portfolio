/*
  Site header (server part): reads every label from the site-wide microcopy and passes plain props to
  the client part. The Advisory item goes through the route flag: while /advisory is not live it is
  dropped from the list entirely (no gap, no greyed item).
*/

import { microcopy, optionalMicrocopy } from '../lib/content.ts';
import { isLive } from '../lib/routes.ts';
import { ctaTarget, linkedInUrl, navItems } from '../lib/site.ts';
import { HeaderClient } from './HeaderClient.tsx';

export function Header() {
  const buttonLabel = microcopy('nav-button');
  return (
    <HeaderClient
      brand={microcopy('nav-brand')}
      items={navItems().filter((i) => isLive(i.href))}
      button={{ label: buttonLabel, href: ctaTarget(buttonLabel) }}
      linkedIn={{ href: linkedInUrl(), label: microcopy('nav-linkedin-label') }}
      menu={{
        // The visible label: a short "nav-menu-label" key if the copy adds one (the direction's "Menu"),
        // else the open label itself. The long label does not fit beside the LinkedIn icon at 390, so
        // without the short key the icon moves into the sheet below 1024px (compactBar).
        label: optionalMicrocopy('nav-menu-label') ?? microcopy('nav-menu-open'),
        compactBar: optionalMicrocopy('nav-menu-label') === undefined,
        open: microcopy('nav-menu-open'),
        close: microcopy('nav-menu-close'),
      }}
    />
  );
}
