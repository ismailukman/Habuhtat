"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react"
import { MotionButton, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginWithEmail, getUserProfile } from "@/lib/firebase"

// Demo credentials
const DEMO_USERS = [
  { role: "Admin", email: "admin@habuhtat.com", password: "Abc54321" },
  { role: "Ambassador", email: "ambassador@habuhtat.com", password: "Abc54321" },
  { role: "Journalist", email: "journalist@habuhtat.com", password: "Abc54321" },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const userCredential = await loginWithEmail(email, password)
      const profile = await getUserProfile(userCredential.user.uid)

      if (profile) {
        router.push(`/dashboard/${profile.role}`)
      } else {
        setError("User profile not found. Please contact support.")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password")
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid credentials. Please check your email and password.")
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoFill = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-200/70">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Habuhtat Media</span>
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-600 mb-8">
            Sign in to continue your journey.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <MotionButton
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </MotionButton>
          </form>

          {/* Demo Login Section */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-50 text-slate-600">Demo Autofill</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => handleDemoFill(demo.email, demo.password)}
                  disabled={isLoading}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white/50 hover:bg-white hover:border-slate-600 transition-all text-left disabled:opacity-50"
                >
                  <div>
                    <div className="font-medium text-slate-900">{demo.role}</div>
                    <div className="text-xs text-slate-600">Fill credentials</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-sky-600 hover:text-sky-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-50 to-white items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.2) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 max-w-lg text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mb-8"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center mx-auto shadow-2xl shadow-sky-200/70">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Every Hero Has a Story
          </h2>
          <p className="text-lg text-slate-700">
            Join the movement to amplify health, cultural, and environmental change-makers worldwide.
            Your stories create ripples of impact across the globe.
          </p>

          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-600">500+</div>
              <div className="text-sm text-slate-600">Heroes Featured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">50+</div>
              <div className="text-sm text-slate-600">Journalists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">1M+</div>
              <div className="text-sm text-slate-600">Global Reach</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

