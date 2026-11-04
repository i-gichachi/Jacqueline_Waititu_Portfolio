/*
  <Gate id="Q10.philosophy-line">...</Gate>
  Renders its children only when the gate ships (answered, or "as written"); otherwise the fallback,
  or nothing. Ids are typed (lib/gates.ts), so an unknown id is a type error. Server only.

  <GateFallbackText id="Q10.capabilities-h2" /> renders the copy-supplied fallback text.
*/

import type { ReactNode } from 'react';
import { gateFallbackText, ships, type GateId } from '../lib/gates.ts';

export function Gate({ id, fallback = null, children }: { id: GateId; fallback?: ReactNode; children: ReactNode }) {
  return <>{ships(id) ? children : fallback}</>;
}

export function GateFallbackText({ id }: { id: GateId }) {
  return <>{gateFallbackText(id)}</>;
}
