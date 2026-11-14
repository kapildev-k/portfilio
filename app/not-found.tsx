import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-text">
      <div className="max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-slate-300">
          The page you were looking for does not exist or has moved.
        </p>
        <Link href="/" className="mt-7 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
          Return home
        </Link>
      </div>
    </main>
  );
}
