"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Habuhtat helped us share Maria's reforestation story with the world. Within weeks, she received support from organizations across three continents.",
    author: "James Okonkwo",
    role: "Ambassador, Nigeria",
    avatar: "JO",
  },
  {
    quote: "As a journalist, finding impactful health and social stories used to take months. Now I discover and claim compelling profiles in minutes.",
    author: "Sarah Chen",
    role: "Environmental Journalist",
    avatar: "SC",
  },
  {
    quote: "The AI-generated content variants save us hours of work while maintaining our editorial voice. It's like adding a full-time teammate.",
    author: "Dr. Elena Rodriguez",
    role: "Global Admin, Health Stories",
    avatar: "ER",
  },
  {
    quote: "Being featured on Habuhtat brought volunteers, funding, and hope to our community. Our small health clinic became a movement.",
    author: "Kofi Mensah",
    role: "Community Health Hero",
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
        <h2 className="text-5xl font-bold mb-6 text-slate-900">
          Trusted by <span className="text-sky-600">Storytellers</span>
        </h2>
        <p className="text-xl text-slate-600">
          Hear from ambassadors, journalists, and heroes using Habuhtat.
        </p>
      </motion.div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 md:p-12 shadow-lg">
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
                <div className="w-12 h-12 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-sky-600" />
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900">
                    {testimonials[current].author}
                  </div>
                  <div className="text-sm text-slate-500">
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
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 transition-all shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 transition-all shadow-md"
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
                  ? "w-8 bg-sky-500"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
