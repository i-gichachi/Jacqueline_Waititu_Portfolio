import {
  Award, BarChart3, Briefcase, Building2, Calendar, CalendarDays, CheckCircle2, Clock, FileCheck, Gauge, Globe,
  GraduationCap, Hammer, Handshake, Headset, KeyRound, Landmark, Languages, Layers, LayoutGrid, LifeBuoy, Map,
  Merge, MessagesSquare, Network, Radio, Search, Shield, ShieldCheck, Bot, Target, Users, Workflow,
  type LucideIcon,
} from 'lucide-react';

/** Content files name icons by string; this maps them to Lucide icons. */
const ICONS: Record<string, LucideIcon> = {
  award: Award,
  'bar-chart-3': BarChart3,
  briefcase: Briefcase,
  building: Building2,
  calendar: Calendar,
  'calendar-days': CalendarDays,
  check: CheckCircle2,
  clock: Clock,
  'file-check': FileCheck,
  gauge: Gauge,
  globe: Globe,
  'graduation-cap': GraduationCap,
  hammer: Hammer,
  handshake: Handshake,
  headset: Headset,
  key: KeyRound,
  landmark: Landmark,
  languages: Languages,
  layers: Layers,
  'layout-grid': LayoutGrid,
  'life-buoy': LifeBuoy,
  map: Map,
  merge: Merge,
  'messages-square': MessagesSquare,
  network: Network,
  radio: Radio,
  search: Search,
  shield: Shield,
  'shield-check': ShieldCheck,
  bot: Bot,
  target: Target,
  users: Users,
  workflow: Workflow,
};

export function Icon({ name, className = 'size-5', strokeWidth = 1.5 }: { name: string; className?: string; strokeWidth?: number }) {
  const C = ICONS[name] ?? Target;
  return <C aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}

/** Icon in a soft tile, used at the top of cards. */
export function IconTile({ name, tone = 'olive' }: { name: string; tone?: 'olive' | 'brick' | 'ink' }) {
  const tones = {
    olive: 'bg-olive-soft text-olive',
    brick: 'bg-olive-soft text-brick',
    ink: 'bg-ink-3 text-olive-light',
  } as const;
  return (
    <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
      <Icon name={name} className="size-5" />
    </span>
  );
}
