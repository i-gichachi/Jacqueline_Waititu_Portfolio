'use client';

/* Error boundary: the error-generic / error-offline microcopy (copied from site-inputs by sync-inputs). */

import copy from './generated/client-copy.json';

export default function Error() {
  const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
  return (
    <section className="band-light section">
      <div className="wrap">
        <p role="status" className="prose">
          {offline ? copy['error-offline'] : copy['error-generic']}
        </p>
      </div>
    </section>
  );
}
