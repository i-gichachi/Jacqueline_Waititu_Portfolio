import { routeMetadata } from '../../lib/route-guard.ts';
import { TrackRecordPage } from '../../components/c/TrackRecordPage.tsx';

export const metadata = routeMetadata('/track-record');

export default function Page() {
  return <TrackRecordPage />;
}
