import Link from 'next/link';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <header className="mb-6 border-b border-gray-100 pb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-sm text-gray-500 mt-1">Masuk ke akun Anda</p>
        </header>

        {/* Form Komponen */}
        <LoginForm />
      </div>
    </main>
  );
}