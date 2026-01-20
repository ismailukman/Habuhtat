"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Upload,
  Users,
  Sparkles,
  Shield,
  Globe,
  BarChart3,
  Zap,
  Heart,
  Stethoscope,
  Briefcase,
  Palette,
  ArrowRight,
} from "lucide-react"
import { ParticleBackground } from "@/components/landing/particle-background"
import { TypewriterEffect } from "@/components/landing/typewriter-effect"
import { ProcessFlow } from "@/components/landing/process-flow"
import { FeatureCard } from "@/components/landing/feature-card"
import { TestimonialCarousel } from "@/components/landing/testimonial-carousel"
import { MotionButton } from "@/components/ui/button"

const features = [
  {
    icon: Upload,
    title: "Easy Profile Upload",
    description: "Ambassadors can quickly upload hero profiles with photos, stories, and location data.",
    gradient: "bg-gradient-to-br from-sky-500 to-sky-600",
  },
  {
    icon: Users,
    title: "Journalist Network",
    description: "Connect with verified journalists who transform profiles into compelling stories.",
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Curation",
    description: "Ama AI generates platform-optimized content variants for maximum reach.",
    gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
  {
    icon: Stethoscope,
    title: "Health & Medicine",
    description: "Highlight community healthcare breakthroughs and life-saving innovations.",
    gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
  },
  {
    icon: Palette,
    title: "Culture & Heritage",
    description: "Document cultural preservation, education, and social impact stories.",
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    icon: Briefcase,
    title: "Entrepreneurship",
    description: "Share stories of resilient founders building local economies.",
    gradient: "bg-gradient-to-br from-emerald-600 to-emerald-700",
  },
  {
    icon: Shield,
    title: "Editorial Control",
    description: "Admins review, edit, and approve all content before publication.",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
  },
  {
    icon: Globe,
    title: "Global Distribution",
    description: "Stories reach audiences across social media, news outlets, and partner platforms.",
    gradient: "bg-gradient-to-br from-sky-400 to-sky-500",
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description: "Track engagement, reach, and real-world impact of every story published.",
    gradient: "bg-gradient-to-br from-rose-500 to-rose-600",
  },
]

const localImpactCards = [
  {
    title: "Community Medicine",
    body: "2,300 residents reached with free screenings and follow-up care.",
    tags: ["Health", "Care"],
    tone: "sky",
  },
  {
    title: "Heritage Archive",
    body: "120 oral histories preserved for schools and community museums.",
    tags: ["Culture", "Legacy"],
    tone: "indigo",
  },
  {
    title: "Youth Enterprise",
    body: "180 apprentices placed into paid roles with local businesses.",
    tags: ["Business", "Opportunity"],
    tone: "emerald",
  },
  {
    title: "Food Resilience",
    body: "900 households supported through coastal food networks.",
    tags: ["Community", "Resilience"],
    tone: "sky",
  },
  {
    title: "Climate Learning",
    body: "8,500 students completed climate action projects.",
    tags: ["Education", "Youth"],
    tone: "indigo",
  },
]

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const [localCard, setLocalCard] = useState(0)

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalCard((prev) => (prev + 1) % localImpactCards.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative bg-slate-50 text-slate-900 overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center shadow-md shadow-sky-200/70">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Habuhtat Media</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#how-it-works" className="text-slate-600 hover:text-sky-600 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-slate-600 hover:text-sky-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-slate-600 hover:text-sky-600 transition-colors">
              Stories
            </a>
            <Link href="/login">
              <MotionButton variant="outline" size="sm">
                Sign In
              </MotionButton>
            </Link>
            <Link href="/signup">
              <MotionButton size="sm">
                Get Started
              </MotionButton>
            </Link>
          </motion.div>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-slate-50 to-white" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center"
        >
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 bg-sky-100 border border-sky-200 rounded-full"
            >
              <span className="text-sky-700 font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Amplifying Impact Heroes
              </span>
            </motion.div>

            <TypewriterEffect
              words={[
                { text: "Every", className: "text-5xl md:text-6xl lg:text-7xl font-bold" },
                { text: "Hero", className: "text-5xl md:text-6xl lg:text-7xl font-bold text-sky-600" },
                { text: "Has", className: "text-5xl md:text-6xl lg:text-7xl font-bold" },
                { text: "a", className: "text-5xl md:text-6xl lg:text-7xl font-bold" },
                { text: "Story.", className: "text-5xl md:text-6xl lg:text-7xl font-bold text-sky-600" },
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mt-6"
            >
              Connecting grassroots leaders across environment, health, medicine, culture, social impact,
              and entrepreneurship with global audiences through AI-powered storytelling and human curation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/signup">
                <MotionButton size="xl" className="group">
                  Start Sharing Stories
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </MotionButton>
              </Link>

              <Link href="#how-it-works">
                <MotionButton variant="outline" size="xl">
                  Learn More
                </MotionButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span>500+ Heroes Featured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>50+ Journalists</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>1M+ Global Reach</span>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-slate-200 bg-white/80 shadow-xl p-6 backdrop-blur"
            >
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-200/70 flex items-center justify-center text-white font-semibold">
                H
              </div>
              <div className="pt-6">
                <p className="text-xs uppercase tracking-widest text-slate-500">Featured Story</p>
                <h3 className="text-2xl font-semibold text-slate-900 mt-3">Community Health Hero</h3>
                <p className="text-slate-600 mt-4">
                  Dr. Laila brought mobile care to rural families, boosting vaccination coverage across 16 villages.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700">Health</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Impact</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-white border border-slate-200 shadow-lg p-4 w-44"
            >
              <p className="text-xs text-slate-500">Next Up</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">Culture & Heritage</p>
              <p className="text-xs text-slate-500 mt-2">120 stories preserved</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute -top-6 right-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg p-4 w-40"
            >
              <p className="text-xs uppercase tracking-widest text-emerald-50">Live Reach</p>
              <p className="text-2xl font-semibold mt-2">1.2M</p>
              <p className="text-xs text-emerald-50 mt-2">views this month</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-slate-300 rounded-full p-1"
          >
            <motion.div
              className="w-1.5 h-3 bg-sky-500 rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Local Heroes.
              <span className="text-sky-600"> Global Impact.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              Community leaders across health, environment, culture, and entrepreneurship
              create real impact, but their stories remain untold. We are changing that.
            </p>

            <div className="space-y-6">
              {[
                { stat: "50,000+", label: "Unheard Local Heroes" },
                { stat: "85%", label: "Lack Media Coverage" },
                { stat: "3x", label: "Impact with Global Visibility" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-3xl md:text-4xl font-bold text-sky-600">
                    {item.stat}
                  </div>
                  <div className="text-slate-600">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={localCard}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-slate-500">Local Impact</span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          localImpactCards[localCard].tone === "emerald"
                            ? "bg-emerald-500"
                            : localImpactCards[localCard].tone === "indigo"
                            ? "bg-indigo-500"
                            : "bg-sky-500"
                        }`}
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mt-4">
                      {localImpactCards[localCard].title}
                    </h3>
                    <p className="text-slate-600 mt-3">{localImpactCards[localCard].body}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      {localImpactCards[localCard].tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full ${
                            localImpactCards[localCard].tone === "emerald"
                              ? "bg-emerald-100 text-emerald-700"
                              : localImpactCards[localCard].tone === "indigo"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
                {localImpactCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setLocalCard(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === localCard ? "w-10 bg-sky-500" : "w-3 bg-slate-300"
                    }`}
                    aria-label={`View impact card ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 md:py-32 px-6">
        <ProcessFlow />
      </section>

      <section id="features" className="py-24 md:py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Powerful Features for
              <span className="text-sky-600"> Every Storyteller</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              From discovery to publication, every step is designed for
              maximum impact and minimum friction across health, culture, and environmental stories.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 md:py-32 px-6">
        <TestimonialCarousel />
      </section>

      <section className="py-24 md:py-32 px-6 bg-gradient-to-r from-sky-500 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <Heart className="w-12 h-12 mx-auto text-white/80" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Ready to Amplify Your Impact?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-10"
          >
            Join hundreds of ambassadors, journalists, and storytellers
            making local heroes visible to the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <MotionButton
                size="xl"
                className="bg-white text-sky-700 hover:bg-slate-50 shadow-xl"
              >
                Get Started Free
                <Zap className="w-5 h-5" />
              </MotionButton>
            </Link>
            <Link href="/login">
              <MotionButton
                variant="outline"
                size="xl"
                className="border-white/50 text-white hover:bg-white/10"
              >
                Sign In
              </MotionButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-emerald-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">H</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Habuhtat</span>
            </div>
            <p className="text-slate-500 text-sm">
              Amplifying local heroes through storytelling.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Platform</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><a href="#how-it-works" className="hover:text-sky-600 transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-sky-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Resources</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-sky-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-sky-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            Ac 2026 Habuhtat Media. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sky-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-sky-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
