import Link from "next/link";

type TaskNotFoundProps = {
  id: string;
};

export default function TaskNotFound({ id }: TaskNotFoundProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-alt px-5 py-12">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-white p-10 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-danger-70">404</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">Tugas Tidak Ditemukan</h1>
        <p className="mt-3 text-muted">Tugas dengan ID #{id} tidak ada dalam daftar data.</p>
        <Link href="/" className="mt-7 inline-flex rounded-md bg-primary-70 px-5 py-3 font-semibold text-white transition hover:bg-primary-80">Kembali ke Daftar Tugas</Link>
      </div>
    </main>
  );
}
