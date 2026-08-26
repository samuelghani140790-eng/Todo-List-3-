"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password.length < 6) {
      setError("Password harus terdiri dari minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setIsSubmitting(true);
    localStorage.setItem("todo-app-user", JSON.stringify({ name, email, password }));
    router.push("/login?registered=true");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-foreground">Nama Lengkap</label>
        <input id="name" name="name" type="text" required placeholder="Masukkan nama" className="w-full rounded-md border border-border bg-white px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm font-semibold text-foreground">Email</label>
        <input id="register-email" name="email" type="email" required placeholder="Masukkan email" className="w-full rounded-md border border-border bg-white px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm font-semibold text-foreground">Password</label>
        <input id="register-password" name="password" type="password" required placeholder="Masukkan password" className="w-full rounded-md border border-border bg-white px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <div>
        <label htmlFor="confirm-password" className="mb-1 block text-sm font-semibold text-foreground">Konfirmasi Password</label>
        <input id="confirm-password" name="confirmPassword" type="password" required placeholder="Ulangi password" className="w-full rounded-md border border-border bg-white px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-primary-70 py-3 font-semibold text-white transition hover:bg-primary-80 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Menyimpan..." : "Register"}</button>
      {error && <p className="text-sm text-danger-90" role="alert">{error}</p>}
      <p className="text-center text-sm text-muted">Sudah punya akun? <Link href="/login" className="font-semibold text-accent hover:underline">Login di sini</Link></p>
    </form>
  );
}
