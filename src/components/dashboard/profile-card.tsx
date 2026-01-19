"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MotionButton } from "@/components/ui/button"

interface ProfileCardProps {
  id: string
  heroName: string
  location: string
  category: string
  status: "review" | "claimed" | "approved" | "scheduled" | "published"
  createdAt: string
  imageUrl?: string
  onAction?: () => void
  actionLabel?: string
}

export function ProfileCard({
  heroName,
  location,
  category,
  status,
  createdAt,
  imageUrl,
  onAction,
  actionLabel = "View Details",
}: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden hover:border-slate-600 transition-all"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={heroName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🌱</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {heroName}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>{createdAt}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary">{category}</Badge>
          {onAction && (
            <MotionButton size="sm" variant="ghost" onClick={onAction}>
              {actionLabel}
              <ArrowRight className="w-4 h-4" />
            </MotionButton>
          )}
        </div>
      </div>
    </motion.div>
  )
}
