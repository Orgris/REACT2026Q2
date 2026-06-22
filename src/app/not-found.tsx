import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="
        flex grow flex-col items-center justify-center gap-5 border border-y-0
        border-(--border) bg-(--bg) p-6
      "
    >
      <div className="flex items-end gap-2">
        <h2 className="m-0! text-9xl!">404</h2>
        <p className="mb-1.75!">Sorry we somehow lost you.</p>
      </div>
      <Link
        className={`
          inline-flex w-fit rounded-lg border-2 border-transparent
          bg-(--accent-bg) px-2 py-1 text-base font-(--mono) text-(--accent)
          transition ease-in
          hover:scale-105 hover:border-(--accent-border) hover:text-(--text-h)
          focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-(--accent)
          active:scale-95 active:border-(--accent)
        `}
        href="/"
      >
        Let&apos;s go home
      </Link>
    </section>
  );
}
