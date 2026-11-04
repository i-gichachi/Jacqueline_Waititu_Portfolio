import { routeMetadata } from '../../../lib/route-guard.ts';
import { CasePage } from '../../../components/c/CasePage.tsx';

export const metadata = routeMetadata('/track-record/pandemic-remote-transition');

export default function Page() {
  return <CasePage path="/track-record/pandemic-remote-transition" />;
}
