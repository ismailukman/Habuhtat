"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
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
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "Journalist Network",
    description: "Connect with verified journalists who transform profiles into compelling stories.",
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Curation",
    description: "Ama AI generates platform-optimized content variants for maximum reach.",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
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
    gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description: "Track engagement, reach, and real-world impact of every story published.",
    gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
  },
]

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-xl font-bold">H</span>
            </div>
            <span className="text-xl font-bold">Habuhtat Media</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#how-it-works" className="text-slate-300 hover:text-emerald-400 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-slate-300 hover:text-emerald-400 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-slate-300 hover:text-emerald-400 transition-colors">
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <ParticleBackground />

        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-slate-950 to-slate-950" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full"
          >
            <span className="text-emerald-400 font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Amplifying Environmental Heroes
            </span>
          </motion.div>

          <TypewriterEffect
            words={[
              { text: "Every", className: "text-5xl md:text-6xl lg:text-7xl font-bold" },
              { text: "Hero", className: "text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-400" },
              { text: "Has", className: "text-5xl md:text-6xl lg:text-7xl font-bold" },
              { text: "a", className: "text-5xl md:text-6xl lg:text-7xl font-bold" },
              { text: "Story.", className: "text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-400" },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto mt-6"
          >
            Connecting grassroots environmental changemakers with global audiences
            through AI-powered storytelling and human curation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>500+ Heroes Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>50+ Journalists</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>1M+ Global Reach</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-slate-600 rounded-full p-1"
          >
            <motion.div
              className="w-1.5 h-3 bg-emerald-500 rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem / Value Section */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Local Heroes.
              <span className="text-emerald-400"> Global Impact.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Thousands of environmental changemakers work tirelessly in their
              communities, but their stories remain untold. We're changing that.
            </p>

            <div className="space-y-6">
              {[
                { stat: "50,000+", label: "Unheard Environmental Heroes" },
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
                  <div className="text-3xl md:text-4xl font-bold text-emerald-400">
                    {item.stat}
                  </div>
                  <div className="text-slate-300">{item.label}</div>
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
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-8xl"
                >
                  🌱
                </motion.div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -left-4 w-44 h-28 bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl"
            >
              <div className="text-xs text-slate-400 mb-1">Success Story</div>
              <div className="text-base font-semibold text-white">Maria's Forest</div>
              <div className="text-sm text-emerald-400 mt-1">+50k Trees Planted</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -bottom-4 -right-4 w-44 h-28 bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl"
            >
              <div className="text-xs text-slate-400 mb-1">Impact</div>
              <div className="text-base font-semibold text-white">Clean Water</div>
              <div className="text-sm text-blue-400 mt-1">10k Lives Changed</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 md:py-32 px-6">
        <ProcessFlow />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 md:py-32 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for
              <span className="text-emerald-400"> Every Storyteller</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              From discovery to publication, every step is designed for
              maximum impact and minimum friction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 px-6">
        <TestimonialCarousel />
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 relative overflow-hidden">
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
            className="text-lg md:text-xl text-emerald-50 mb-10"
          >
            Join hundreds of ambassadors, journalists, and storytellers
            making environmental heroes visible to the world.
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
                className="bg-white text-emerald-600 hover:bg-slate-50 shadow-xl"
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

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                <span className="text-xl font-bold">H</span>
              </div>
              <span className="text-xl font-bold">Habuhtat</span>
            </div>
            <p className="text-slate-400 text-sm">
              Amplifying environmental heroes through storytelling.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div>
            © 2026 Habuhtat Media. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
