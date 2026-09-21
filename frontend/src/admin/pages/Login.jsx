import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LockKeyhole,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await login(email, password);

      navigate(location.state?.from || '/admin', {
        replace: true,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Invalid credentials'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4fb] text-[#18151f] overflow-hidden relative">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#d9c9f3]/50 blur-3xl" />

        <div className="absolute -bottom-48 -left-40 h-[520px] w-[520px] rounded-full bg-[#ebe1fa] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.035]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'linear-gradient(#4c3a68 1px, transparent 1px), linear-gradient(90deg, #4c3a68 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-5xl">

          {/* TOP BRAND */}
          <div className="mb-8 flex items-center justify-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7657b7] text-white shadow-[0_12px_30px_rgba(118,87,183,0.28)] transition-transform group-hover:-translate-y-0.5">
                <span className="font-serif text-xl font-bold">
                  OS
                </span>
              </div>

              <div className="text-left">
                <p className="font-serif text-xl font-bold tracking-tight text-[#18151f]">
                  OS Group
                </p>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#806d9e]">
                  Administration
                </p>
              </div>
            </Link>
          </div>

          {/* LOGIN CARD */}
          <div className="grid overflow-hidden rounded-[2rem] border border-[#e1d8ed] bg-white shadow-[0_30px_90px_rgba(69,48,99,0.13)] lg:grid-cols-[0.9fr_1.1fr]">

            {/* LEFT PANEL */}
            <div className="relative hidden overflow-hidden bg-[#241c31] p-10 text-white lg:flex lg:flex-col lg:justify-between">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8d6bc8]/25 blur-3xl" />

              <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#b99be7]/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
                  <Sparkles size={21} />
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#cdb8ed]">
                  OS Group
                </p>

                <h2 className="max-w-sm font-serif text-4xl font-semibold leading-[1.05] tracking-tight">
                  Manage the group
                  <span className="block text-[#cdb8ed]">
                    with clarity.
                  </span>
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                  Access your administration workspace to manage
                  content, companies, services, news and other
                  areas of the OS Group website.
                </p>
              </div>

              <div className="relative z-10 mt-12 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Secure access
                    </p>

                    <p className="text-xs text-white/45">
                      Protected administrator area
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <p className="text-[11px] leading-5 text-white/35">
                  Authorised users only. Keep your login
                  credentials private.
                </p>
              </div>
            </div>

            {/* RIGHT LOGIN FORM */}
            <div className="p-7 sm:p-10 lg:p-12">

              {/* MOBILE BRAND */}
              <div className="mb-8 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7657b7] text-white shadow-lg">
                  <span className="font-serif font-bold">
                    OS
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0eafa] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7657b7]">
                  <LockKeyhole size={12} />
                  Admin Portal
                </div>

                <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#18151f] sm:text-4xl">
                  Welcome back.
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#777184]">
                  Sign in to access your OS Group administration
                  panel.
                </p>
              </div>

              <form
                onSubmit={onSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#50485d]"
                  >
                    Email address
                  </label>

                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="admin@example.com"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#ddd4e8]
                      bg-[#fbfaff]
                      px-4
                      py-3.5
                      text-sm
                      text-[#18151f]
                      outline-none
                      transition-all
                      placeholder:text-[#aaa2b2]
                      focus:border-[#7657b7]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#7657b7]/10
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#50485d]"
                    >
                      Password
                    </label>

                    <Link
                      to="/admin/forgot-password"
                      className="text-xs font-semibold text-[#7657b7] transition-colors hover:text-[#5f4398] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="admin-password"
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#ddd4e8]
                        bg-[#fbfaff]
                        px-4
                        py-3.5
                        pr-12
                        text-sm
                        text-[#18151f]
                        outline-none
                        transition-all
                        placeholder:text-[#aaa2b2]
                        focus:border-[#7657b7]
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#7657b7]/10
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((v) => !v)
                      }
                      className="
                        absolute
                        inset-y-0
                        right-0
                        flex
                        items-center
                        px-4
                        text-[#9990a5]
                        transition-colors
                        hover:text-[#7657b7]
                      "
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* SIGN IN BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#7657b7]
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_12px_28px_rgba(118,87,183,0.25)]
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#6849a7]
                    hover:shadow-[0_16px_34px_rgba(118,87,183,0.3)]
                    focus:outline-none
                    focus:ring-4
                    focus:ring-[#7657b7]/20
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in to dashboard
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-8 border-t border-[#eee9f3] pt-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1ebf9] text-[#7657b7]">
                    <ShieldCheck size={15} />
                  </div>

                  <p className="text-xs leading-5 text-[#88808f]">
                    This area is restricted to authorised OS Group
                    administrators. Your account credentials should
                    never be shared with others.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-7 flex flex-col items-center justify-between gap-3 text-center text-[11px] text-[#9991a3] sm:flex-row sm:text-left">
            <span>
              © {new Date().getFullYear()} OS Group of Company.
              All rights reserved.
            </span>

            <Link
              to="/"
              className="font-semibold text-[#7657b7] transition-colors hover:text-[#5f4398]"
            >
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}