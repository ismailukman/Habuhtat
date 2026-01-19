"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ImagePlus, UploadCloud } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { createHeroProfile, uploadFile } from "@/lib/firebase"

type UploadFormState = {
  heroName: string
  location: string
  country: string
  category: string
  summary: string
  impact: string
  contactEmail: string
  contactPhone: string
}

const initialFormState: UploadFormState = {
  heroName: "",
  location: "",
  country: "",
  category: "",
  summary: "",
  impact: "",
  contactEmail: "",
  contactPhone: "",
}

const CATEGORY_OPTIONS = [
  "Clean Water",
  "Reforestation",
  "Wildlife Conservation",
  "Waste Reduction",
  "Renewable Energy",
  "Air Quality",
  "Sustainable Agriculture",
  "Ocean Cleanup",
  "Climate Education",
  "Public Health",
  "Community Medicine",
  "Social Innovation",
  "Cultural Preservation",
  "Entrepreneurship",
  "Other",
]

export default function AmbassadorHeroUploadPage() {
  const { profile } = useAuth()
  const [formState, setFormState] = useState<UploadFormState>(initialFormState)
  const [heroImage, setHeroImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (field: keyof UploadFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!profile) {
      setError("You must be signed in as an ambassador to submit profiles.")
      return
    }

    if (!formState.heroName || !formState.location || !formState.country || !formState.category) {
      setError("Please fill in all required fields.")
      return
    }

    setSubmitting(true)
    try {
      let imageUrl: string | undefined
      if (heroImage) {
        imageUrl = await uploadFile(
          heroImage,
          `heroes/${profile.uid}/${Date.now()}-${heroImage.name}`
        )
      }

      let additionalImageUrls: string[] | undefined
      if (additionalImages.length > 0) {
        additionalImageUrls = await Promise.all(
          additionalImages.map((file) =>
            uploadFile(file, `heroes/${profile.uid}/${Date.now()}-${file.name}`)
          )
        )
      }

      await createHeroProfile({
        heroName: formState.heroName,
        location: formState.location,
        country: formState.country,
        category: formState.category,
        summary: formState.summary,
        impact: formState.impact,
        contactEmail: formState.contactEmail || undefined,
        contactPhone: formState.contactPhone || undefined,
        imageUrl,
        additionalImages: additionalImageUrls,
        status: "review",
        ambassadorId: profile.uid,
        ambassadorName: profile.name || profile.email || "Ambassador",
      })

      setSuccess("Hero profile submitted for review.")
      setFormState(initialFormState)
      setHeroImage(null)
      setAdditionalImages([])
    } catch (submitError) {
      console.error("Failed to submit hero profile", submitError)
      setError("Unable to submit profile right now. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ambassador" />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Hero Profile</h1>
          <p className="text-slate-600">
            Share a new local hero story with the Habuhtat team.
          </p>
        </motion.div>

        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Hero Details</CardTitle>
            <CardDescription>Tell us about the hero and their impact.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg border border-sky-200 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-700">Hero Name *</label>
                  <Input
                    value={formState.heroName}
                    onChange={(event) => handleChange("heroName", event.target.value)}
                    placeholder="Enter hero name"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Category *</label>
                  <select
                    value={formState.category}
                    onChange={(event) => handleChange("category", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-50"
                  >
                    <option value="">Select a category</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-700">Location *</label>
                  <Input
                    value={formState.location}
                    onChange={(event) => handleChange("location", event.target.value)}
                    placeholder="City or region"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Country *</label>
                  <Input
                    value={formState.country}
                    onChange={(event) => handleChange("country", event.target.value)}
                    placeholder="Country"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-700">Summary</label>
                <textarea
                  value={formState.summary}
                  onChange={(event) => handleChange("summary", event.target.value)}
                  placeholder="Short summary of the hero's story"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm text-slate-700">Impact</label>
                <textarea
                  value={formState.impact}
                  onChange={(event) => handleChange("impact", event.target.value)}
                  placeholder="Key outcomes or measurable impact"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-700">Contact Email</label>
                  <Input
                    type="email"
                    value={formState.contactEmail}
                    onChange={(event) => handleChange("contactEmail", event.target.value)}
                    placeholder="hero@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Contact Phone</label>
                  <Input
                    value={formState.contactPhone}
                    onChange={(event) => handleChange("contactPhone", event.target.value)}
                    placeholder="+1 555 123 4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-dashed border-slate-200 bg-white/40 p-4">
                  <div className="flex items-center gap-3 text-slate-700 mb-3">
                    <ImagePlus className="w-5 h-5 text-sky-600" />
                    <span>Main Hero Image</span>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setHeroImage(event.target.files?.[0] ?? null)}
                  />
                  {heroImage && (
                    <p className="mt-2 text-xs text-slate-600">{heroImage.name}</p>
                  )}
                </div>
                <div className="rounded-lg border border-dashed border-slate-200 bg-white/40 p-4">
                  <div className="flex items-center gap-3 text-slate-700 mb-3">
                    <UploadCloud className="w-5 h-5 text-sky-600" />
                    <span>Additional Images</span>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) =>
                      setAdditionalImages(Array.from(event.target.files ?? []))
                    }
                  />
                  {additionalImages.length > 0 && (
                    <p className="mt-2 text-xs text-slate-600">
                      {additionalImages.length} image(s) selected
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit for Review"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

