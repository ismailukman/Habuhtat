"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  color: "emerald" | "blue" | "purple" | "amber" | "pink"
}

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  purple: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/30",
  },
  amber: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  pink: {
    bg: "bg-pink-500/20",
    text: "text-pink-400",
    border: "border-pink-500/30",
  },
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon, color }: StatsCardProps) {
  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.bg, colors.border, "border")}>
          <Icon className={cn("w-6 h-6", colors.text)} />
        </div>
        {change && (
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            changeType === "positive" && "bg-emerald-500/20 text-emerald-400",
            changeType === "negative" && "bg-red-500/20 text-red-400",
            changeType === "neutral" && "bg-slate-700 text-slate-400"
          )}>
            {change}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{title}</div>
    </motion.div>
  )
}
