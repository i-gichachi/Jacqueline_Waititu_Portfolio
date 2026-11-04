import { routeMetadata } from '../../../lib/route-guard.ts';
import { CasePage } from '../../../components/c/CasePage.tsx';

export const metadata = routeMetadata('/track-record/hr-function');

export default function Page() {
  return <CasePage path="/track-record/hr-function" />;
}
