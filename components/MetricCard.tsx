type MetricCardProps = {
  label: string;
  value: string;
  tone?: "default" | "accent" | "muted";
  sublabel?: string;
};

const toneStyles = {
  default: "text-fg",
  accent: "text-accent",
  muted: "text-fg-muted",
};

export default function MetricCard({ label, value, tone = "default", sublabel }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-bg-card/60 p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-fg-subtle">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tracking-tight ${toneStyles[tone]}`}>{value}</p>
      {sublabel && <p className="mt-1 text-xs text-fg-subtle">{sublabel}</p>}
    </div>
  );
}
