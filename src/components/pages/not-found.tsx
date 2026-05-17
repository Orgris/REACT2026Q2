import { Link } from 'react-router';

export function NotFound() {
  return (
    <section className="flex grow flex-col items-center justify-center gap-5 border border-t-0 border-b-0 border-[var(--border)] bg-[var(--bg)] p-6">
      <div className="flex items-end gap-2">
        <h2 className="!m-0 !text-9xl">404</h2>
        <p className="!mb-1.75">Sorry we somehow lost you.</p>
      </div>
      <Link
        className={`inline-flex w-fit rounded-lg border-2 border-transparent bg-[var(--accent-bg)] px-2 py-1 text-base font-[var(--mono)] text-[var(--accent)] transition ease-in hover:scale-105 hover:border-[var(--accent-border)] hover:text-[var(--text-h)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-95 active:border-[var(--accent)]`}
        to={'/'}
      >
        Let&apos;s go home
      </Link>
    </section>
  );
}

export default NotFound;
