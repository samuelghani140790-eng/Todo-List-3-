"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const storedUser = localStorage.getItem("todo-app-user");

    if (!storedUser) {
      setError("Akun belum terdaftar. Silakan register terlebih dahulu.");
      setIsSubmitting(false);
      return;
    }

    const user = JSON.parse(storedUser) as { email: string; password: string; name: string };
    if (user.email !== email || user.password !== password) {
      setError("Email atau password tidak sesuai.");
      setIsSubmitting(false);
      return;
    }

    sessionStorage.setItem("todo-app-session", JSON.stringify({ email: user.email, name: user.name }));
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-foreground">Email / Username</label>
        <input id="email" name="email" type="email" required placeholder="Masukkan email" className="w-full rounded-md border border-border bg-white px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-foreground">Password</label>
        <input id="password" name="password" type="password" required placeholder="Masukkan password" className="w-full rounded-md border border-border bg-white px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-primary-70 py-3 font-semibold text-white transition hover:bg-primary-80 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Memproses..." : "Login"}</button>
      {error && <p className="text-sm text-danger-90" role="alert">{error}</p>}
      <p className="text-center text-sm text-muted">Belum punya akun? <Link href="/register" className="font-semibold text-accent hover:underline">Daftar di sini</Link></p>
    </form>
  );
}
