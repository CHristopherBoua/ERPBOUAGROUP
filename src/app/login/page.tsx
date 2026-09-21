"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, Globe, Fingerprint, QrCode } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex bg-[color:var(--color-sidebar-bg)]">
      {/* Panneau gauche — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Image de fond */}
        <Image
          src="/BG_3.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay fondant */}
        <div className="absolute inset-0 bg-[color:var(--color-sidebar-bg)] opacity-75" />
        {/* Motif décoratif */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[color:var(--color-accent)] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[color:var(--color-accent)] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative flex flex-col items-center text-center gap-8">
          <Image
            src="/logo-boua.svg"
            alt="BOUA Group"
            width={320}
            height={90}
            className="object-contain brightness-0 invert"
            priority
          />
          <h2 className="text-white text-5xl font-extrabold tracking-wide">
            Bienvenue
          </h2>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[color:var(--background)]">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="mb-8 lg:hidden">
            <Image
              src="/logo-boua.svg"
              alt="BOUA Group"
              width={160}
              height={44}
              className="object-contain object-left"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-[color:var(--color-foreground)] mb-1">
            Connexion
          </h1>
          <p className="text-[color:var(--color-muted)] text-sm mb-7">
            Accédez à votre espace de travail BOUA Group
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[color:var(--color-foreground)] mb-1.5">
                Adresse email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@bouagroup.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[color:var(--color-border)] bg-white text-[color:var(--color-foreground)] text-sm placeholder:text-[color:var(--color-muted)] outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[color:var(--color-foreground)] mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[color:var(--color-border)] bg-white text-[color:var(--color-foreground)] text-sm placeholder:text-[color:var(--color-muted)] outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded accent-[color:var(--color-primary)]" />
                <span className="text-sm text-[color:var(--color-muted)]">Se souvenir de moi</span>
              </label>
              <button type="button" className="text-sm text-[color:var(--color-primary)] font-medium hover:underline">
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-light)] text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[color:var(--color-border)]" />
              <span className="text-xs text-[color:var(--color-muted)]">ou</span>
              <div className="flex-1 h-px bg-[color:var(--color-border)]" />
            </div>

            {/* Connexion alternative */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] hover:bg-[#FFF0E8] transition-all text-[color:var(--color-muted)] hover:text-[color:var(--color-primary)]"
              >
                <Fingerprint size={22} />
                <span className="text-xs font-medium">Empreinte digitale</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] hover:bg-[#FFF0E8] transition-all text-[color:var(--color-muted)] hover:text-[color:var(--color-primary)]"
              >
                <QrCode size={22} />
                <span className="text-xs font-medium">Scanner QR code</span>
              </button>
            </div>
          </form>

          {/* Langue */}
          <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[color:var(--color-muted)]">
            <Globe size={13} />
            <button className="hover:text-[color:var(--color-foreground)] font-medium transition-colors">
              Français
            </button>
            <span>·</span>
            <button className="hover:text-[color:var(--color-foreground)] transition-colors">
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
