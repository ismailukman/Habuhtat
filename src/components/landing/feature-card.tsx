"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export function FeatureCard({ icon: Icon, title, description, gradient }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl overflow-hidden"
    >
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`} />

      {/* Icon */}
      <div className={`relative w-12 h-12 rounded-xl ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="relative text-xl font-semibold mb-2 text-white group-hover:text-emerald-400 transition-colors">
        {title}
      </h3>
      <p className="relative text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
