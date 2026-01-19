"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllAIContent, getAllHeroes, AIContent, HeroProfile } from "@/lib/firebase"

const PLATFORM_OPTIONS = [
  { value: "twitter", label: "Twitter/X" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "blog", label: "Blog" },
]

const CONTENT_OPTIONS = [
  { value: "thread", label: "Thread" },
  { value: "post", label: "Post" },
  { value: "carousel", label: "Carousel" },
  { value: "article", label: "Article" },
  { value: "summary", label: "Summary" },
]

const getFunctionUrl = () =>
  process.env.NEXT_PUBLIC_AI_FUNCTION_URL ||
  "https://us-central1-habuhtat.cloudfunctions.net/generateAiContent"

export default function AdminAIContentPage() {
  const [heroes, setHeroes] = useState<HeroProfile[]>([])
  const [contentItems, setContentItems] = useState<AIContent[]>([])
  const [selectedHero, setSelectedHero] = useState("")
  const [platform, setPlatform] = useState("twitter")
  const [contentType, setContentType] = useState("thread")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [heroData, aiData] = await Promise.all([getAllHeroes(), getAllAIContent()])
        setHeroes(heroData)
        setContentItems(aiData)
        if (!selectedHero && heroData.length > 0) {
          setSelectedHero(heroData[0].id)
        }
      } catch (err) {
        console.error("Failed to load AI content", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleGenerate = async () => {
    if (!selectedHero) {
      setError("Select a hero profile first.")
      return
    }

    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(getFunctionUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroProfileId: selectedHero,
          platform,
          contentType,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Generation failed.")
      }

      setSuccess("AI content generated and saved.")
      const updated = await getAllAIContent()
      setContentItems(updated)
    } catch (err: any) {
      console.error("AI generation failed", err)
      setError(err.message || "AI content generation failed.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Ama AI Content</h1>
          <p className="text-slate-600">Generate platform-ready content variants for hero stories.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Generate New Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 rounded-lg border border-sky-200 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-slate-700">Hero Profile</label>
                  <select
                    value={selectedHero}
                    onChange={(event) => setSelectedHero(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-50"
                    disabled={loading}
                  >
                    {heroes.map((hero) => (
                      <option key={hero.id} value={hero.id}>
                        {hero.heroName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-700">Platform</label>
                  <select
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-50"
                  >
                    {PLATFORM_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-700">Content Type</label>
                  <select
                    value={contentType}
                    onChange={(event) => setContentType(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-50"
                  >
                    {CONTENT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={handleGenerate} disabled={submitting || loading}>
                  {submitting ? "Generating..." : "Generate Content"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <div className="text-sm text-slate-600">Loading content...</div>}
              {!loading && contentItems.length === 0 && (
                <div className="text-sm text-slate-600">No AI content generated yet.</div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {contentItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="rounded-lg border border-slate-200 bg-white/60 p-4 transition-transform"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-slate-900 font-medium">{item.heroName}</div>
                        <div className="text-xs text-slate-600">
                          {item.platform} - {item.contentType}
                        </div>
                      </div>
                      <Badge variant={item.status === "approved" ? "approved" : "review"}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-line">
                      {item.content}
                    </p>
                    {item.hashtags?.length > 0 && (
                      <div className="mt-3 text-xs text-purple-300">
                        {item.hashtags.map((tag) => `#${tag.replace(/^#/, "")}`).join(" ")}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

