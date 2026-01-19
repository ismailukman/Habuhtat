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
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  blue: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-200",
  },
  purple: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  pink: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    border: "border-rose-200",
  },
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon, color }: StatsCardProps) {
  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className="p-6 rounded-xl bg-white border border-slate-200 hover:border-sky-200 transition-all shadow-sm"
  >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.bg, colors.border, "border")}>
          <Icon className={cn("w-6 h-6", colors.text)} />
        </div>
        {change && (
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            changeType === "positive" && "bg-emerald-100 text-emerald-700",
            changeType === "negative" && "bg-red-100 text-red-700",
            changeType === "neutral" && "bg-slate-100 text-slate-500"
          )}>
            {change}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{title}</div>
    </motion.div>
  )
}
