type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-bg-card/40 p-6 transition-colors duration-300 hover:border-border-strong hover:bg-bg-card/70">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
    </div>
  );
}
