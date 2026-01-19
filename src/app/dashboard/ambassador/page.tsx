"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Upload, FileText, CheckCircle, Clock, Plus, ArrowRight } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { MotionButton } from "@/components/ui/button"

const stats = [
  { title: "Total Submissions", value: 12, icon: FileText, color: "emerald" as const, change: "+3 this week", changeType: "positive" as const },
  { title: "Under Review", value: 4, icon: Clock, color: "amber" as const },
  { title: "Approved", value: 6, icon: CheckCircle, color: "blue" as const },
  { title: "Published", value: 2, icon: Upload, color: "purple" as const },
]

const recentSubmissions = [
  {
    id: "1",
    heroName: "Maria Santos",
    location: "Amazon Rainforest, Brazil",
    category: "Reforestation",
    status: "review" as const,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    heroName: "Kofi Mensah",
    location: "Accra, Ghana",
    category: "Ocean Cleanup",
    status: "approved" as const,
    createdAt: "1 week ago",
  },
  {
    id: "3",
    heroName: "Priya Sharma",
    location: "Mumbai, India",
    category: "Air Quality",
    status: "published" as const,
    createdAt: "2 weeks ago",
  },
]

export default function AmbassadorDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar role="ambassador" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Ambassador!</h1>
          <p className="text-slate-400">Discover and share the stories of local environmental heroes.</p>
        </motion.div>

        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Link href="/dashboard/ambassador/upload">
            <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Plus className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Upload New Hero Profile</h3>
                    <p className="text-emerald-400/80">Share the story of an environmental hero you've discovered</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
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

        {/* Recent Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Submissions</h2>
            <Link href="/dashboard/ambassador/submissions">
              <MotionButton variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSubmissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ProfileCard
                  {...submission}
                  onAction={() => {}}
                  actionLabel="View"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 rounded-xl bg-slate-800/50 border border-slate-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Tips for Great Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Clear Photos", desc: "High-quality images of the hero and their work make a big impact." },
              { title: "Detailed Story", desc: "Include background, challenges faced, and achievements." },
              { title: "Contact Info", desc: "Ensure the hero can be reached for journalist interviews." },
            ].map((tip, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-900/50">
                <h4 className="font-medium text-emerald-400 mb-2">{tip.title}</h4>
                <p className="text-sm text-slate-400">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
