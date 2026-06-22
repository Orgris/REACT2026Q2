import Image from 'next/image';

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
      className={`
        flex w-fit items-center gap-3 rounded-lg border-2 border-(--border) p-4
        transition-all duration-300
        hover:bg-(--accent)/5!
        ${className}
        ${variant === 'personal' ? `flex-col justify-center text-center` : ''}
      `}
    >
      <Image
        className="size-10 object-contain"
        src={imageSrc}
        width={10}
        height={10}
        alt={imageAlt}
      />

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="text-sm opacity-70">{description}</p>
      </div>
    </a>
  );
}
