"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, User, ArrowRight, Globe, Users, PenTool, Shield } from "lucide-react"
import { MotionButton, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const roles = [
  {
    id: "ambassador",
    title: "Ambassador",
    description: "Discover and upload profiles of local environmental heroes.",
    icon: Globe,
    color: "emerald",
  },
  {
    id: "journalist",
    title: "Journalist",
    description: "Claim profiles and develop them into full stories.",
    icon: PenTool,
    color: "blue",
  },
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1 && name && email) {
      setStep(2)
      return
    }
    if (step === 2 && selectedRole) {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsLoading(false)
      setIsSent(true)
    }
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
              {/* Progress Steps */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    1
                  </div>
                  <span className="text-sm font-medium">Details</span>
                </div>
                <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    2
                  </div>
                  <span className="text-sm font-medium">Role</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">
                {step === 1 ? "Create your account" : "Choose your role"}
              </h1>
              <p className="text-slate-400 mb-8">
                {step === 1
                  ? "Join the movement to amplify environmental heroes."
                  : "How would you like to contribute?"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-12"
                          required
                        />
                      </div>
                    </div>

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
                  </>
                ) : (
                  <div className="space-y-4">
                    {roles.map((role) => {
                      const Icon = role.icon
                      const isSelected = selectedRole === role.id
                      return (
                        <motion.button
                          key={role.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedRole(role.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? role.color === "emerald"
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-blue-500 bg-blue-500/10"
                              : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              role.color === "emerald"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{role.title}</h3>
                              <p className="text-sm text-slate-400 mt-1">{role.description}</p>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                )}

                <div className="flex gap-4">
                  {step === 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  <MotionButton
                    type="submit"
                    className="flex-1"
                    size="lg"
                    disabled={isLoading || (step === 2 && !selectedRole)}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        {step === 1 ? "Continue" : "Create Account"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </MotionButton>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                    Sign in
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
                We sent a verification link to <span className="text-white font-medium">{email}</span>
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSent(false)
                  setStep(1)
                }}
              >
                Use a different email
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center p-12 relative overflow-hidden">
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
          className="relative z-10 max-w-lg"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Join the storytelling movement
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: Globe,
                title: "Discover Heroes",
                description: "Find and document environmental changemakers in your community.",
                color: "emerald",
              },
              {
                icon: PenTool,
                title: "Tell Their Stories",
                description: "Transform profiles into compelling narratives that inspire action.",
                color: "blue",
              },
              {
                icon: Users,
                title: "Global Impact",
                description: "Connect local heroes with worldwide audiences and support.",
                color: "purple",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.color === "emerald"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : item.color === "blue"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
