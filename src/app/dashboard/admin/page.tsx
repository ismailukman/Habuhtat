"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  CheckCircle,
  Clock,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { Timestamp } from "firebase/firestore"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { MotionButton } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllAIContent, getAllHeroes, getDashboardStats, AIContent, HeroProfile } from "@/lib/firebase"

type AdminStats = {
  pendingReview: number
  aiGenerated: number
  approved: number
  scheduled: number
  published: number
  totalUsers: number
  ambassadors: number
  journalists: number
}

const formatDate = (timestamp?: Timestamp) => {
  if (!timestamp) return "Unknown date"
  return timestamp.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const getPriority = (timestamp?: Timestamp) => {
  if (!timestamp) return "medium"
  const daysAgo = (Date.now() - timestamp.toDate().getTime()) / (1000 * 60 * 60 * 24)
  if (daysAgo > 7) return "high"
  if (daysAgo > 2) return "medium"
  return "low"
}

export default function AdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState<AdminStats | null>(null)
  const [reviewQueue, setReviewQueue] = useState<HeroProfile[]>([])
  const [aiContent, setAiContent] = useState<AIContent[]>([])
  const [upcomingPublish, setUpcomingPublish] = useState<HeroProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      try {
        const [statsData, heroes, content] = await Promise.all([
          getDashboardStats("admin"),
          getAllHeroes(),
          getAllAIContent(),
        ])

        const reviewItems = heroes.filter((hero) =>
          ["story_submitted", "review"].includes(hero.status)
        )
        const scheduledItems = heroes.filter((hero) => hero.status === "scheduled")

        setDashboardStats(statsData as AdminStats)
        setReviewQueue(reviewItems.slice(0, 3))
        setAiContent(content.slice(0, 3))
        setUpcomingPublish(scheduledItems.slice(0, 3))
      } catch (err) {
        console.error("Failed to load admin dashboard", err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const stats = [
    {
      title: "Pending Review",
      value: dashboardStats?.pendingReview ?? 0,
      icon: Clock,
      color: "amber" as const,
    },
    {
      title: "AI Generated",
      value: dashboardStats?.aiGenerated ?? 0,
      icon: Sparkles,
      color: "purple" as const,
    },
    {
      title: "Approved",
      value: dashboardStats?.approved ?? 0,
      icon: CheckCircle,
      color: "emerald" as const,
    },
    {
      title: "Scheduled",
      value: dashboardStats?.scheduled ?? 0,
      icon: Calendar,
      color: "blue" as const,
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Review, approve, and schedule content for publication.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.06 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              initial="hidden"
              animate="show"
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Review Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-white/50 border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-slate-900">Review Queue</h2>
                <Badge variant="warning">{reviewQueue.length} pending</Badge>
              </div>
              <Link href="/dashboard/admin/review">
                <MotionButton variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </Link>
            </div>
            <div className="divide-y divide-slate-700">
              {loading && (
                <div className="p-4 text-sm text-slate-600">Loading review queue...</div>
              )}
              {!loading && reviewQueue.length === 0 && (
                <div className="p-4 text-sm text-slate-600">No items awaiting review.</div>
              )}
              {reviewQueue.map((item) => {
                const submittedAt = item.storySubmittedAt || item.updatedAt
                const priority = getPriority(submittedAt)
                const type = item.status === "story_submitted" ? "Full Story" : "Profile Review"
                return (
                  <div key={item.id} className="p-4 hover:bg-white/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">{item.heroName}</h3>
                      <Badge
                        variant={
                          priority === "high"
                            ? "danger"
                            : priority === "medium"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">by {item.journalistName || "Unassigned"}</span>
                      <span className="text-slate-500">{formatDate(submittedAt)}</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant="secondary">{type}</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* AI Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-white/50 border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-slate-900">Ama AI Content</h2>
              </div>
              <Link href="/dashboard/admin/ai-content">
                <MotionButton variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </Link>
            </div>
            <div className="divide-y divide-slate-700">
              {loading && (
                <div className="p-4 text-sm text-slate-600">Loading AI content...</div>
              )}
              {!loading && aiContent.length === 0 && (
                <div className="p-4 text-sm text-slate-600">No AI content yet.</div>
              )}
              {aiContent.map((item) => {
                const statusVariant =
                  item.status === "approved"
                    ? "approved"
                    : item.status === "rejected"
                    ? "danger"
                    : "review"
                return (
                  <div key={item.id} className="p-4 hover:bg-white/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">{item.heroName}</h3>
                      <Badge variant={statusVariant}>{item.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-indigo-600">{item.platform}</span>
                      <span className="text-slate-600">{item.contentType}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Publications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-white/50 border border-slate-200 overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Publications</h2>
            </div>
            <Link href="/dashboard/admin/schedule">
              <MotionButton variant="ghost" size="sm">
                View Calendar
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </Link>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loading && (
                <div className="text-sm text-slate-600">Loading schedule...</div>
              )}
              {!loading && upcomingPublish.length === 0 && (
                <div className="text-sm text-slate-600">No scheduled publications yet.</div>
              )}
              {upcomingPublish.map((item, index) => {
                const scheduledDate = item.scheduledFor || item.updatedAt
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 rounded-lg bg-white/50 border border-slate-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">{item.heroName}</h3>
                      <Badge variant="approved">scheduled</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{item.category}</p>
                    <p className="text-sm text-sky-600">{formatDate(scheduledDate)}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{dashboardStats?.totalUsers ?? 0}</div>
                <div className="text-sm text-slate-600">Total Users</div>
              </div>
            </div>
            <div className="text-sky-600 text-sm">All active roles</div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{dashboardStats?.ambassadors ?? 0}</div>
                <div className="text-sm text-slate-600">Ambassadors</div>
              </div>
            </div>
            <div className="text-sky-600 text-sm">Field submissions</div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{dashboardStats?.journalists ?? 0}</div>
                <div className="text-sm text-slate-600">Journalists</div>
              </div>
            </div>
            <div className="text-indigo-600 text-sm">Active storytellers</div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

