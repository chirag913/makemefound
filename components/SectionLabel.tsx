export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-strong bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
      {children}
    </span>
  );
}
