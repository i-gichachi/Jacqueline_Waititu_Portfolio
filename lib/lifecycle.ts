/*
  Lifecycle Rule data (DESIGN-DIRECTION section 9). The stage labels and details are visible copy, so they
  come from the site-wide microcopy, never from code. Expected keys (to be supplied by the content stage):

    lifecycle-label: <aria-label of the list>
    lifecycle-stage-1 .. lifecycle-stage-5: <stage name>
    lifecycle-detail-1 .. lifecycle-detail-5: <figure or date line>   (optional per stage)

  Q7: the Start-up and Scale years are not known; those segments carry no date line until Q7 answers.
  The rule ends at integration (Ian, C2); the closure never appears (Q8).
*/

import { optionalMicrocopy } from './content.ts';

export type StageNumber = 1 | 2 | 3 | 4 | 5;

export interface Stage {
  n: StageNumber;
  label: string;
  detail?: string;
}

export interface LifecycleData {
  label: string;
  stages: Stage[];
}

/** Null when the copy does not supply the keys yet (the component then renders nothing). */
export function lifecycleFromCopy(): LifecycleData | null {
  const label = optionalMicrocopy('lifecycle-label');
  const stages: Stage[] = [];
  for (const n of [1, 2, 3, 4, 5] as StageNumber[]) {
    const stageLabel = optionalMicrocopy(`lifecycle-stage-${n}`);
    if (!stageLabel) return null;
    const detail = optionalMicrocopy(`lifecycle-detail-${n}`);
    stages.push({ n, label: stageLabel, detail: detail || undefined });
  }
  if (!label) return null;
  return { label, stages };
}

export function stageLabel(data: LifecycleData, n: StageNumber): string {
  return data.stages.find((s) => s.n === n)?.label ?? '';
}
