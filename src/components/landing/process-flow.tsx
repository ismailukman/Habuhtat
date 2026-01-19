"use client"

import { motion } from "framer-motion"
import { Upload, Search, Sparkles, CheckCircle, Globe } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Ambassador Uploads",
    description: "Local ambassadors discover environmental heroes and upload their profiles with photos and stories.",
    color: "emerald",
  },
  {
    icon: Search,
    title: "Journalist Claims",
    description: "Professional journalists browse profiles, claim stories they want to develop, and conduct interviews.",
    color: "blue",
  },
  {
    icon: Sparkles,
    title: "Ama AI Curates",
    description: "Our AI assistant generates optimized content for different platforms - social media, articles, and more.",
    color: "purple",
  },
  {
    icon: CheckCircle,
    title: "Admin Reviews",
    description: "Global admins review, edit, and approve content ensuring quality and consistency across all channels.",
    color: "amber",
  },
  {
    icon: Globe,
    title: "World Discovers",
    description: "Stories reach global audiences, amplifying the impact of local environmental heroes worldwide.",
    color: "emerald",
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "group-hover:shadow-emerald-500/20",
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/30",
    glow: "group-hover:shadow-blue-500/20",
  },
  purple: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/30",
    glow: "group-hover:shadow-purple-500/20",
  },
  amber: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/30",
    glow: "group-hover:shadow-amber-500/20",
  },
}

export function ProcessFlow() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-6">
          How It <span className="text-emerald-400">Works</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          From discovery to global impact - a seamless journey for every environmental story.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 hidden lg:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const colors = colorClasses[step.color]
            const Icon = step.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className={`relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700 transition-all duration-300 hover:bg-slate-800 hover:border-slate-600 hover:shadow-xl ${colors.glow}`}>
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-400">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 transform translate-x-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-emerald-500"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
