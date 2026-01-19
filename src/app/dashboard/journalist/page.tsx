"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, CheckCircle, Clock, Send, Search, ArrowRight, TrendingUp } from "lucide-react"
import { Timestamp } from "firebase/firestore"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { MotionButton, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import {
  claimHeroProfile,
  getAvailableHeroes,
  getClaimedHeroesByJournalist,
  getDashboardStats,
  HeroProfile,
} from "@/lib/firebase"

type JournalistStats = {
  availableProfiles: number
  myClaims: number
  storiesSubmitted: number
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

export default function JournalistDashboard() {
  const { profile } = useAuth()
  const [dashboardStats, setDashboardStats] = useState<JournalistStats | null>(null)
  const [availableProfiles, setAvailableProfiles] = useState<HeroProfile[]>([])
  const [myClaims, setMyClaims] = useState<HeroProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [claimingId, setClaimingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!profile) {
      setLoading(false)
      return
    }

    const loadDashboard = async () => {
      setLoading(true)
      try {
        const [statsData, available, claims] = await Promise.all([
          getDashboardStats("journalist", profile.uid),
          getAvailableHeroes(),
          getClaimedHeroesByJournalist(profile.uid),
        ])
        setDashboardStats(statsData as JournalistStats)
        setAvailableProfiles(available)
        setMyClaims(claims)
      } catch (err) {
        console.error("Failed to load journalist dashboard", err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [profile])

  const handleClaim = async (heroId: string) => {
    if (!profile) return
    setClaimingId(heroId)
    try {
      await claimHeroProfile(heroId, profile.uid, profile.name || profile.email || "Journalist")
      const [available, claims, statsData] = await Promise.all([
        getAvailableHeroes(),
        getClaimedHeroesByJournalist(profile.uid),
        getDashboardStats("journalist", profile.uid),
      ])
      setAvailableProfiles(available)
      setMyClaims(claims)
      setDashboardStats(statsData as JournalistStats)
    } catch (err) {
      console.error("Failed to claim hero profile", err)
    } finally {
      setClaimingId(null)
    }
  }

  const stats = [
    {
      title: "Available Profiles",
      value: dashboardStats?.availableProfiles ?? 0,
      icon: FileText,
      color: "emerald" as const,
    },
    {
      title: "My Claims",
      value: dashboardStats?.myClaims ?? 0,
      icon: Clock,
      color: "blue" as const,
    },
    {
      title: "Stories Submitted",
      value: dashboardStats?.storiesSubmitted ?? 0,
      icon: Send,
      color: "purple" as const,
    },
    {
      title: "Published",
      value: dashboardStats?.published ?? 0,
      icon: CheckCircle,
      color: "amber" as const,
    },
  ]

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProfiles = availableProfiles.filter((profile) => {
    if (!normalizedQuery) return true
    return (
      profile.heroName.toLowerCase().includes(normalizedQuery) ||
      profile.location.toLowerCase().includes(normalizedQuery) ||
      profile.category.toLowerCase().includes(normalizedQuery)
    )
  })

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="journalist" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Journalist!</h1>
          <p className="text-slate-600">Discover stories waiting to be told.</p>
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
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
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
                <h2 className="text-xl font-semibold text-slate-900">My Active Claims</h2>
                <span className="px-2 py-1 rounded-full bg-blue-500/20 text-sky-600 text-sm font-medium">
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
              {loading && (
                <div className="text-slate-600 text-sm">Loading your claims...</div>
              )}
              {!loading && myClaims.length === 0 && (
                <div className="text-slate-600 text-sm">You have no active claims yet.</div>
              )}
              {myClaims.map((claim, index) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <ProfileCard
                    id={claim.id}
                  heroName={claim.heroName}
                  location={claim.location}
                  country={claim.country}
                  category={claim.category}
                  status={claim.status}
                  createdAt={formatDate(claim.createdAt)}
                  imageUrl={claim.imageUrl}
                  summary={claim.summary}
                  impact={claim.impact}
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
              <h2 className="text-xl font-semibold text-slate-900">Available Profiles</h2>
              <div className="flex items-center gap-1 text-sky-600 text-sm">
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
            {loading && (
              <div className="text-slate-600 text-sm">Loading available profiles...</div>
            )}
            {!loading && filteredProfiles.length === 0 && (
              <div className="text-slate-600 text-sm">No profiles match your search.</div>
            )}
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <ProfileCard
                  id={profile.id}
                  heroName={profile.heroName}
                  location={profile.location}
                  country={profile.country}
                  category={profile.category}
                  status={profile.status}
                  createdAt={formatDate(profile.createdAt)}
                  imageUrl={profile.imageUrl}
                  summary={profile.summary}
                  impact={profile.impact}
                  onAction={() => handleClaim(profile.id)}
                  actionLabel={claimingId === profile.id ? "Claiming..." : "Claim"}
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
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Story Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Interview First", desc: "Connect with the hero before writing" },
              { title: "Human Focus", desc: "Center the story on personal journey" },
              { title: "Impact Data", desc: "Include measurable achievements" },
              { title: "Visuals Matter", desc: "Request or capture quality photos" },
            ].map((tip, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-sky-600 flex items-center justify-center mx-auto mb-2 font-bold">
                  {i + 1}
                </div>
                <h4 className="font-medium text-slate-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-slate-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

