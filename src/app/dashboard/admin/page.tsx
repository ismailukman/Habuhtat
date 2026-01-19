"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FileText,
  CheckCircle,
  Clock,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Eye,
  Share2,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { MotionButton } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  { title: "Pending Review", value: 12, icon: Clock, color: "amber" as const, change: "+4 today", changeType: "neutral" as const },
  { title: "AI Generated", value: 8, icon: Sparkles, color: "purple" as const },
  { title: "Approved", value: 24, icon: CheckCircle, color: "emerald" as const },
  { title: "Scheduled", value: 6, icon: Calendar, color: "blue" as const },
]

const reviewQueue = [
  {
    id: "1",
    heroName: "Maria Santos",
    journalist: "Sarah Chen",
    type: "Full Story",
    submittedAt: "2 hours ago",
    priority: "high",
  },
  {
    id: "2",
    heroName: "Ahmed Hassan",
    journalist: "James Okonkwo",
    type: "Full Story",
    submittedAt: "5 hours ago",
    priority: "medium",
  },
  {
    id: "3",
    heroName: "Yuki Tanaka",
    journalist: "Elena Rodriguez",
    type: "Profile Update",
    submittedAt: "1 day ago",
    priority: "low",
  },
]

const aiContent = [
  {
    id: "1",
    heroName: "Maria Santos",
    platform: "Twitter",
    variant: "Thread (5 tweets)",
    status: "pending",
  },
  {
    id: "2",
    heroName: "Maria Santos",
    platform: "Instagram",
    variant: "Carousel Caption",
    status: "approved",
  },
  {
    id: "3",
    heroName: "Ahmed Hassan",
    platform: "LinkedIn",
    variant: "Article Summary",
    status: "pending",
  },
]

const upcomingPublish = [
  { heroName: "Kofi Mensah", platform: "All Platforms", date: "Today, 2:00 PM", status: "ready" },
  { heroName: "Priya Sharma", platform: "Twitter, Instagram", date: "Tomorrow, 10:00 AM", status: "ready" },
  { heroName: "John Okafor", platform: "LinkedIn", date: "Jan 22, 9:00 AM", status: "pending" },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Review, approve, and schedule content for publication.</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Review Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">Review Queue</h2>
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
              {reviewQueue.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{item.heroName}</h3>
                    <Badge
                      variant={
                        item.priority === "high"
                          ? "danger"
                          : item.priority === "medium"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">by {item.journalist}</span>
                    <span className="text-slate-500">{item.submittedAt}</span>
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary">{item.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Ama AI Content</h2>
              </div>
              <Link href="/dashboard/admin/ai-content">
                <MotionButton variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </Link>
            </div>
            <div className="divide-y divide-slate-700">
              {aiContent.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{item.heroName}</h3>
                    <Badge variant={item.status === "approved" ? "approved" : "review"}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-purple-400">{item.platform}</span>
                    <span className="text-slate-400">{item.variant}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Publications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Upcoming Publications</h2>
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
              {upcomingPublish.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 rounded-lg bg-slate-900/50 border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{item.heroName}</h3>
                    <Badge variant={item.status === "ready" ? "approved" : "warning"}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-1">{item.platform}</p>
                  <p className="text-sm text-blue-400">{item.date}</p>
                </motion.div>
              ))}
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
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1.2M</div>
                <div className="text-sm text-slate-400">Total Reach This Month</div>
              </div>
            </div>
            <div className="text-emerald-400 text-sm">+24% from last month</div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">45K</div>
                <div className="text-sm text-slate-400">Story Views Today</div>
              </div>
            </div>
            <div className="text-blue-400 text-sm">Peak hour: 2:00 PM</div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">892</div>
                <div className="text-sm text-slate-400">Social Shares Today</div>
              </div>
            </div>
            <div className="text-purple-400 text-sm">Top: Maria Santos story</div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
