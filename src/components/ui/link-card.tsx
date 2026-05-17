type LinkCardProps = {
  variant?: LinkCardVariant;
  className?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

type LinkCardVariant = 'default' | 'personal';

export function LinkCard({
  variant = 'default',
  className = '',
  href,
  imageSrc,
  imageAlt,
  title,
  description,
}: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex w-fit items-center gap-3 rounded-lg border-2 border-[var(--border)] p-4 transition-all duration-200 hover:bg-white/5 ${className} ${variant === 'personal' ? 'flex-col items-center justify-center text-center' : ''}`}
    >
      <img src={imageSrc} alt={imageAlt} className="h-10 w-10 object-contain" />

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="text-sm opacity-70">{description}</p>
      </div>
    </a>
  );
}
