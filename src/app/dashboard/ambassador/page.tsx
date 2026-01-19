"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Upload, FileText, CheckCircle, Clock, Plus, ArrowRight } from "lucide-react"
import { Timestamp } from "firebase/firestore"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { MotionButton } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { getDashboardStats, getHeroesByAmbassador, HeroProfile } from "@/lib/firebase"

type AmbassadorStats = {
  totalSubmissions: number
  underReview: number
  claimed: number
  approved: number
  published: number
}

const formatDate = (timestamp?: Timestamp) => {
  if (!timestamp) return "Unknown date"
  return timestamp.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function AmbassadorDashboard() {
  const { profile } = useAuth()
  const [dashboardStats, setDashboardStats] = useState<AmbassadorStats | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<HeroProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!profile) {
      setLoading(false)
      return
    }

    const loadDashboard = async () => {
      setLoading(true)
      setError(null)
      try {
        const [statsData, heroes] = await Promise.all([
          getDashboardStats("ambassador", profile.uid),
          getHeroesByAmbassador(profile.uid),
        ])
        setDashboardStats(statsData as AmbassadorStats)
        setRecentSubmissions(heroes.slice(0, 3))
      } catch (err) {
        console.error("Failed to load ambassador dashboard", err)
        setError("Unable to load your dashboard data right now.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [profile])

  const stats = [
    {
      title: "Total Submissions",
      value: dashboardStats?.totalSubmissions ?? 0,
      icon: FileText,
      color: "emerald" as const,
    },
    {
      title: "Under Review",
      value: dashboardStats?.underReview ?? 0,
      icon: Clock,
      color: "amber" as const,
    },
    {
      title: "Approved",
      value: dashboardStats?.approved ?? 0,
      icon: CheckCircle,
      color: "blue" as const,
    },
    {
      title: "Published",
      value: dashboardStats?.published ?? 0,
      icon: Upload,
      color: "purple" as const,
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ambassador" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back{profile?.name ? `, ${profile.name}` : ", Ambassador"}!
          </h1>
          <p className="text-slate-600">
            Discover and share the stories of local heroes across health, culture, environment, and entrepreneurship.
          </p>
        </motion.div>

        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Link href="/dashboard/ambassador/upload">
            <div className="p-6 rounded-xl bg-gradient-to-r from-sky-100 to-emerald-100 border border-sky-200 hover:border-emerald-500/50 transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-sky-200/60">
                    <Plus className="w-7 h-7 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Upload New Hero Profile</h3>
                    <p className="text-sky-600/80">Share the story of a local hero you've discovered</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-sky-600 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

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
            <h2 className="text-xl font-semibold text-slate-900">Recent Submissions</h2>
            <Link href="/dashboard/ambassador/submissions">
              <MotionButton variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <div className="text-slate-600 text-sm">Loading recent submissions...</div>
            )}
            {!loading && recentSubmissions.length === 0 && (
              <div className="text-slate-600 text-sm">
                No submissions yet. Upload your first hero profile to get started.
              </div>
            )}
            {recentSubmissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ProfileCard
                  id={submission.id}
                  heroName={submission.heroName}
                  location={submission.location}
                  country={submission.country}
                  category={submission.category}
                  status={submission.status}
                  createdAt={formatDate(submission.createdAt)}
                  imageUrl={submission.imageUrl}
                  summary={submission.summary}
                  impact={submission.impact}
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
          className="mt-8 p-6 rounded-xl bg-white/50 border border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tips for Great Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Clear Photos", desc: "High-quality images of the hero and their work make a big impact." },
              { title: "Detailed Story", desc: "Include background, challenges faced, and achievements." },
              { title: "Contact Info", desc: "Ensure the hero can be reached for journalist interviews." },
            ].map((tip, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/50">
                <h4 className="font-medium text-sky-600 mb-2">{tip.title}</h4>
                <p className="text-sm text-slate-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

