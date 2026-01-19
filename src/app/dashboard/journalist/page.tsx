"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, CheckCircle, Clock, Send, Search, ArrowRight, TrendingUp } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { MotionButton, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const stats = [
  { title: "Available Profiles", value: 28, icon: FileText, color: "emerald" as const, change: "+5 new", changeType: "positive" as const },
  { title: "My Claims", value: 4, icon: Clock, color: "blue" as const },
  { title: "Stories Submitted", value: 8, icon: Send, color: "purple" as const },
  { title: "Published", value: 6, icon: CheckCircle, color: "amber" as const },
]

const availableProfiles = [
  {
    id: "1",
    heroName: "Elena Rodriguez",
    location: "Costa Rica",
    category: "Wildlife Conservation",
    status: "review" as const,
    createdAt: "1 day ago",
  },
  {
    id: "2",
    heroName: "Ahmed Hassan",
    location: "Cairo, Egypt",
    category: "Solar Energy",
    status: "review" as const,
    createdAt: "2 days ago",
  },
  {
    id: "3",
    heroName: "Yuki Tanaka",
    location: "Tokyo, Japan",
    category: "Urban Farming",
    status: "review" as const,
    createdAt: "3 days ago",
  },
]

const myClaims = [
  {
    id: "4",
    heroName: "Maria Santos",
    location: "Amazon Rainforest, Brazil",
    category: "Reforestation",
    status: "claimed" as const,
    createdAt: "5 days ago",
  },
  {
    id: "5",
    heroName: "John Okafor",
    location: "Lagos, Nigeria",
    category: "Plastic Recycling",
    status: "claimed" as const,
    createdAt: "1 week ago",
  },
]

export default function JournalistDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar role="journalist" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Journalist!</h1>
          <p className="text-slate-400">Discover stories waiting to be told.</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                placeholder="Search profiles by name, location, or category..."
                className="pl-12 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              Filters
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* My Claims */}
        {myClaims.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-white">My Active Claims</h2>
                <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                  {myClaims.length} in progress
                </span>
              </div>
              <Link href="/dashboard/journalist/claims">
                <MotionButton variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myClaims.map((claim, index) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <ProfileCard
                    {...claim}
                    onAction={() => {}}
                    actionLabel="Continue"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Available Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-white">Available Profiles</h2>
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>5 new this week</span>
              </div>
            </div>
            <Link href="/dashboard/journalist/profiles">
              <MotionButton variant="ghost" size="sm">
                Browse All
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <ProfileCard
                  {...profile}
                  onAction={() => {}}
                  actionLabel="Claim"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Writing Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Story Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Interview First", desc: "Connect with the hero before writing" },
              { title: "Human Focus", desc: "Center the story on personal journey" },
              { title: "Impact Data", desc: "Include measurable achievements" },
              { title: "Visuals Matter", desc: "Request or capture quality photos" },
            ].map((tip, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-2 font-bold">
                  {i + 1}
                </div>
                <h4 className="font-medium text-white mb-1">{tip.title}</h4>
                <p className="text-sm text-slate-400">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
