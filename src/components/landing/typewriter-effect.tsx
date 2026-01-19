"use client"

import { motion, useAnimation, Variants } from "framer-motion"
import { useEffect } from "react"

interface Word {
  text: string
  className?: string
}

interface TypewriterEffectProps {
  words: Word[]
  className?: string
}

export function TypewriterEffect({ words, className }: TypewriterEffectProps) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.h1
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2 ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={child}
          className={word.className}
        >
          {word.text}
        </motion.span>
      ))}
    </motion.h1>
  )
}
