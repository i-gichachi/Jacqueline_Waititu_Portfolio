import { routeMetadata } from '../../../lib/route-guard.ts';
import { CasePage } from '../../../components/c/CasePage.tsx';

export const metadata = routeMetadata('/track-record/office-projects');

export default function Page() {
  return <CasePage path="/track-record/office-projects" />;
}
