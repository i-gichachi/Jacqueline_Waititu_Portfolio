import {
  Building2, FileCheck, FileText, FolderOpen, Gauge, Handshake, HeartHandshake, Laptop, Layers, MessagesSquare,
  Network, PackageCheck, ShieldCheck, Target, TrendingUp, Users, Wrench, type LucideIcon,
} from 'lucide-react';

/** Icons for each case's approach steps, in step order. Icons replace step numbers. */
const BY_CASE: Record<string, LucideIcon[]> = {
  'kenya-office-integration': [Network, Users, MessagesSquare],
  'sale-due-diligence': [FolderOpen, FileCheck, MessagesSquare],
  'pandemic-remote-transition': [ShieldCheck, Laptop, PackageCheck],
  'office-projects': [Handshake, Building2, Wrench],
  'hr-function': [FileText, TrendingUp, HeartHandshake],
};

const FALLBACK: LucideIcon[] = [Layers, Gauge, Target];

export function ApproachIcon({ slug, index }: { slug: string; index: number }) {
  const set = BY_CASE[slug] ?? FALLBACK;
  const C = set[index] ?? FALLBACK[index % FALLBACK.length];
  return <C aria-hidden="true" className="size-5" strokeWidth={1.5} />;
}
