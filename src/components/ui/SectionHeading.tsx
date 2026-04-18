export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && (
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4">{eyebrow}</div>
      )}
      <h2 className="font-display text-3xl md:text-5xl text-balance">{title}</h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-pretty max-w-prose">{description}</p>
      )}
    </div>
  );
}
