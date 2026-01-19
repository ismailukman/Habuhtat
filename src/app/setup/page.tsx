"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Loader2, Users, Shield } from "lucide-react"
import { MotionButton } from "@/components/ui/button"
import {
  registerWithEmail,
  createUserProfile,
  createHeroProfile,
  UserRole
} from "@/lib/firebase"

const DEMO_USERS = [
  {
    email: "admin@habuhtat.com",
    password: "Admin@123",
    name: "Global Admin",
    role: "admin" as UserRole,
  },
  {
    email: "ambassador@habuhtat.com",
    password: "Ambassador@123",
    name: "Demo Ambassador",
    role: "ambassador" as UserRole,
  },
  {
    email: "journalist@habuhtat.com",
    password: "Journalist@123",
    name: "Demo Journalist",
    role: "journalist" as UserRole,
  },
]

const SAMPLE_HEROES = [
  {
    heroName: "Maria Santos",
    location: "Amazon Rainforest",
    country: "Brazil",
    category: "Reforestation",
    summary: "Maria has planted over 50,000 trees in the Amazon rainforest over the past decade.",
    impact: "50,000+ trees planted, 200 hectares restored",
    status: "review" as const,
  },
  {
    heroName: "Kofi Mensah",
    location: "Accra",
    country: "Ghana",
    category: "Ocean Cleanup",
    summary: "Kofi organizes weekly beach cleanups and has removed tons of plastic from Ghana's coastline.",
    impact: "15 tons of plastic removed, 500+ volunteers engaged",
    status: "review" as const,
  },
  {
    heroName: "Priya Sharma",
    location: "Mumbai",
    country: "India",
    category: "Air Quality",
    summary: "Priya developed a low-cost air purifier for slum communities.",
    impact: "10,000 families with cleaner air, 30% reduction in respiratory issues",
    status: "published" as const,
  },
  {
    heroName: "Ahmed Hassan",
    location: "Cairo",
    country: "Egypt",
    category: "Solar Energy",
    summary: "Ahmed brings solar power to rural Egyptian villages without electricity.",
    impact: "25 villages electrified, 5,000 people with access to clean energy",
    status: "review" as const,
  },
]

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [logs, setLogs] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState("")

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message])
  }

  const setupDemoData = async () => {
    setStatus("loading")
    setLogs([])

    try {
      // Create demo users
      let ambassadorId = ""
      let ambassadorName = ""

      for (const user of DEMO_USERS) {
        setCurrentStep(`Creating ${user.role} user...`)
        addLog(`Creating ${user.role}: ${user.email}`)

        try {
          const userCredential = await registerWithEmail(user.email, user.password)
          await createUserProfile(userCredential.user.uid, {
            email: user.email,
            name: user.name,
            role: user.role,
          })

          if (user.role === "ambassador") {
            ambassadorId = userCredential.user.uid
            ambassadorName = user.name
          }

          addLog(`✓ Created ${user.role} successfully`)
        } catch (err: any) {
          if (err.code === "auth/email-already-in-use") {
            addLog(`⚠ ${user.role} already exists, skipping...`)
          } else {
            throw err
          }
        }
      }

      // Create sample hero profiles
      if (ambassadorId) {
        setCurrentStep("Creating sample hero profiles...")
        for (const hero of SAMPLE_HEROES) {
          addLog(`Creating hero profile: ${hero.heroName}`)
          await createHeroProfile({
            ...hero,
            ambassadorId,
            ambassadorName,
          })
          addLog(`✓ Created ${hero.heroName}`)
        }
      } else {
        addLog("⚠ Ambassador not created, skipping hero profiles")
      }

      setCurrentStep("Setup complete!")
      addLog("✓ All demo data created successfully!")
      setStatus("success")
    } catch (err: any) {
      console.error("Setup error:", err)
      addLog(`✗ Error: ${err.message}`)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Setup Demo Data</h1>
          <p className="text-slate-400">
            Create demo users and sample data for testing the platform.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            Demo Accounts to Create
          </h2>
          <div className="space-y-3">
            {DEMO_USERS.map((user) => (
              <div key={user.email} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <div>
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="text-sm text-slate-400">{user.email}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === "admin" ? "bg-purple-500/20 text-purple-400" :
                  user.role === "ambassador" ? "bg-emerald-500/20 text-emerald-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {status === "idle" && (
          <MotionButton
            onClick={setupDemoData}
            className="w-full"
            size="lg"
          >
            Create Demo Data
          </MotionButton>
        )}

        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">{currentStep}</p>
          </div>
        )}

        {logs.length > 0 && (
          <div className="mt-6 bg-slate-900 border border-slate-700 rounded-xl p-4 max-h-64 overflow-auto">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Setup Log</h3>
            <div className="space-y-1 font-mono text-sm">
              {logs.map((log, i) => (
                <div key={i} className={`${
                  log.startsWith("✓") ? "text-emerald-400" :
                  log.startsWith("✗") ? "text-red-400" :
                  log.startsWith("⚠") ? "text-amber-400" :
                  "text-slate-300"
                }`}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-emerald-400 font-medium">Setup Complete!</p>
              <p className="text-emerald-400/70 text-sm">
                You can now <a href="/login" className="underline">login</a> with the demo accounts.
              </p>
            </div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Setup Failed</p>
              <p className="text-red-400/70 text-sm">Check the logs above for details.</p>
            </div>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <a href="/login" className="text-emerald-400 hover:text-emerald-300 text-sm">
            Go to Login Page →
          </a>
        </div>
      </motion.div>
    </div>
  )
}
