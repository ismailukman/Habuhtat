"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Habuhtat helped us share Maria's incredible reforestation story with the world. Within weeks, she received support from organizations across three continents.",
    author: "James Okonkwo",
    role: "Ambassador, Nigeria",
    avatar: "JO",
  },
  {
    quote: "As a journalist, finding impactful environmental stories used to take months. Now I discover and claim compelling profiles in minutes.",
    author: "Sarah Chen",
    role: "Environmental Journalist",
    avatar: "SC",
  },
  {
    quote: "The AI-generated content variants save us hours of work while maintaining our editorial voice. It's like having an extra team member.",
    author: "Dr. Elena Rodriguez",
    role: "Global Admin",
    avatar: "ER",
  },
  {
    quote: "Being featured on Habuhtat brought volunteers, funding, and hope to our community. Our small river cleanup became a movement.",
    author: "Kofi Mensah",
    role: "Local Environmental Hero",
    avatar: "KM",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setAutoPlay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoPlay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold mb-6">
          Trusted by <span className="text-emerald-400">Storytellers</span>
        </h2>
        <p className="text-xl text-slate-300">
          Hear from ambassadors, journalists, and heroes using Habuhtat.
        </p>
      </motion.div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-emerald-400" />
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">
                    {testimonials[current].author}
                  </div>
                  <div className="text-sm text-slate-400">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoPlay(false)
                setCurrent(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current
                  ? "w-8 bg-emerald-500"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
