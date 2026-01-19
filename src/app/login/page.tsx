"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, ArrowRight, Sparkles } from "lucide-react"
import { MotionButton, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSent(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <span className="text-xl font-bold text-white">Habuhtat Media</span>
          </Link>

          {!isSent ? (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
              <p className="text-slate-400 mb-8">
                Sign in with your email to continue your journey.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
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
                      Send Magic Link
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </MotionButton>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
              <p className="text-slate-400 mb-8">
                We sent a magic link to <span className="text-white font-medium">{email}</span>
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSent(false)}
              >
                Try a different email
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
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
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Every Hero Has a Story
          </h2>
          <p className="text-lg text-slate-300">
            Join the movement to amplify environmental changemakers worldwide.
            Your stories create ripples of impact across the globe.
          </p>

          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">500+</div>
              <div className="text-sm text-slate-400">Heroes Featured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-slate-400">Journalists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">1M+</div>
              <div className="text-sm text-slate-400">Global Reach</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
