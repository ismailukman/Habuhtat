"use client"

import { motion } from "framer-motion"
import { Upload, Search, Sparkles, CheckCircle, Globe } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Ambassador Uploads",
    description: "Ambassadors discover local heroes across health, culture, business, and environmental impact.",
    color: "emerald",
  },
  {
    icon: Search,
    title: "Journalist Claims",
    description: "Journalists claim stories, conduct interviews, and gather the human details behind impact.",
    color: "blue",
  },
  {
    icon: Sparkles,
    title: "Ama AI Curates",
    description: "Ama AI creates platform-ready drafts for social, editorial, and community newsletters.",
    color: "purple",
  },
  {
    icon: CheckCircle,
    title: "Admin Reviews",
    description: "Admins review and approve each story to maintain trust, clarity, and accuracy.",
    color: "amber",
  },
  {
    icon: Globe,
    title: "World Discovers",
    description: "Stories reach global audiences and inspire action across sectors.",
    color: "emerald",
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    glow: "group-hover:shadow-emerald-200/40",
  },
  blue: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-200",
    glow: "group-hover:shadow-sky-200/40",
  },
  purple: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-200",
    glow: "group-hover:shadow-indigo-200/40",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    glow: "group-hover:shadow-amber-200/40",
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
        <h2 className="text-5xl font-bold mb-6 text-slate-900">
          How It <span className="text-sky-600">Works</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          From discovery to global impact - a seamless journey for every local story.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-300/0 via-sky-300/60 to-sky-300/0 hidden lg:block" />

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
                <div className={`relative p-6 rounded-2xl bg-white border border-slate-200 transition-all duration-300 hover:border-sky-200 hover:shadow-xl ${colors.glow}`}>
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 transform translate-x-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-sky-500"
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
